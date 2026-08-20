import { GoogleGenAI, Modality, Type } from "@google/genai";
import type { UserImage, Product } from '../types';

// Fetches a catalog image and converts it to inline data for the Gemini API.
// The source server must allow cross-origin requests from the application.
const imageUrlToInlineData = async (url: string): Promise<{ data: string; mimeType: string }> => {
  try {
    // Add a cache-busting query parameter to bypass browser caches for CORS policies.
    const cacheBustedUrl = `${url}?t=${new Date().getTime()}`;
    const response = await fetch(cacheBustedUrl);
    
    if (!response.ok) {
      throw new Error(`Error al obtener la imagen desde ${url}. Estado: ${response.status}`);
    }

    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        const base64Data = dataUrl.split(',')[1];
        if (!base64Data) {
          return reject(new Error(`No se pudieron extraer los datos base64 de la imagen: ${url}`));
        }
        resolve({ data: base64Data, mimeType: blob.type });
      };
      reader.onerror = () => {
        reject(new Error(`Error al leer el blob de la imagen: ${url}`));
      };
      reader.readAsDataURL(blob);
    });

  } catch (error) {
    console.error(`Error en imageUrlToInlineData para ${url}:`, error);
    throw new Error(`No se pudo cargar la imagen del producto desde ${url}. Por favor, asegúrese de que la configuración CORS del servidor de imágenes permita solicitudes desde este origen.`);
  }
};


interface RoomAnalysis {
    roomType: 'habitacion' | 'sala' | 'otro';
    mainFurniture: 'cama' | 'sofa' | 'sillon' | 'otro';
}

const analyzeRoomType = async (ai: GoogleGenAI, baseImage: UserImage): Promise<RoomAnalysis> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: {
                parts: [
                    {
                        text: "Analiza esta imagen de una habitación. Identifica si es una 'habitacion' (con una cama) o una 'sala' (con un sofá o sillón). También identifica el mueble principal ('cama', 'sofa', 'sillon'). Si no puedes determinarlo con claridad, clasifícalo como 'otro'. Responde únicamente en formato JSON."
                    },
                    {
                        inlineData: {
                            data: baseImage.data,
                            mimeType: baseImage.mimeType,
                        },
                    },
                ],
            },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        roomType: {
                            type: Type.STRING,
                            enum: ['habitacion', 'sala', 'otro'],
                            description: 'El tipo de habitación detectado.'
                        },
                        mainFurniture: {
                            type: Type.STRING,
                            enum: ['cama', 'sofa', 'sillon', 'otro'],
                            description: 'El mueble principal para colocar cojines.'
                        }
                    }
                }
            }
        });

        const jsonString = response.text.trim();
        return JSON.parse(jsonString) as RoomAnalysis;
    } catch (error) {
        console.error("Error al analizar el tipo de habitación:", error);
        // Fallback in case of analysis error
        return { roomType: 'otro', mainFurniture: 'otro' };
    }
}


export const redesignRoom = async (
  baseImage: UserImage,
  selectedProducts: Product[],
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Analyze the room to determine placement context.
  const analysis = await analyzeRoomType(ai, baseImage);

  // Build placement instructions based on the detected room context.
  let promptInstructions = `Eres un experto diseñador de interiores. Tu tarea es integrar los productos proporcionados en la imagen de la habitación del usuario de manera fotorrealista.
  
  Reglas estrictas:
  1.  Mantén intactas todas las estructuras originales: muros, mobiliario existente, iluminación, perspectiva y proporciones.
  2.  NO alteres ningún objeto original de la imagen del usuario.
  3.  NO generes nuevos muebles, personas, ni fondos.
  4.  Integra los productos con precisión, respetando la escala real, la iluminación, las sombras y los ángulos de la habitación.
  5.  El resultado final debe ser una ÚNICA imagen fotorrealista de la habitación rediseñada. No añadas texto ni anotaciones.

  Instrucciones de colocación específicas basadas en el análisis de la habitación (${analysis.roomType}):
  `;

  selectedProducts.forEach(product => {
    const productName = product.name.toLowerCase();
    if (analysis.roomType === 'habitacion') {
        if (productName.includes('cabecera') || productName.includes('tríptico') || productName.includes('díptico') || productName.includes('piedra maya')) {
            promptInstructions += `- Coloca el producto "${product.name}" sobre el muro principal, generalmente encima de la cama.\n`;
        } else if (productName.includes('cojin')) {
            promptInstructions += `- Coloca el cojín "${product.name}" de forma natural sobre la cama.\n`;
        } else if (productName.includes('espejo')) {
            promptInstructions += `- Coloca el espejo "${product.name}" en un muro visible y apropiado.\n`;
        }
    } else if (analysis.roomType === 'sala') {
        if (productName.includes('tríptico') || productName.includes('díptico') || productName.includes('piedra maya')) {
            promptInstructions += `- Coloca el cuadro "${product.name}" en un muro visible, como detrás del sofá.\n`;
        } else if (productName.includes('cojin')) {
            promptInstructions += `- Coloca el cojín "${product.name}" de forma natural sobre el ${analysis.mainFurniture}.\n`;
        } else if (productName.includes('espejo')) {
            promptInstructions += `- Coloca el espejo "${product.name}" en un muro visible y apropiado.\n`;
        }
    } else { // Fallback for 'otro'
         promptInstructions += `- Coloca el producto "${product.name}" en un lugar lógico y estéticamente agradable dentro del espacio.\n`;
    }
  });
  
  promptInstructions += "\nA continuación se presentan la imagen de la habitación y las imágenes de los productos que debes integrar:"

  const textPrompt = { text: promptInstructions };

  const baseImagePart = {
    inlineData: {
      data: baseImage.data,
      mimeType: baseImage.mimeType,
    },
  };
  
  const productParts = await Promise.all(
    selectedProducts.map(async (product) => {
      const inlineData = await imageUrlToInlineData(product.imageUrl);
      return { inlineData };
    })
  );

  const allParts = [
    textPrompt,
    baseImagePart,
    ...productParts
  ];

  // Generate the final visualization using the original room and selected products.
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: allParts,
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });
    
    for (const candidate of response.candidates) {
      for (const part of candidate.content.parts) {
        if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("La IA no generó una imagen. Inténtelo de nuevo con una imagen o selección de productos diferente.");

  } catch (error) {
      console.error("Error en la llamada a la API de Gemini o al procesar la imagen:", error);
       if (error instanceof Error && error.message.includes('URL')) {
         throw new Error("No se pudo cargar una imagen de producto. Verifique que las URLs del catálogo sean correctas y públicamente accesibles.");
      }
      throw new Error("No se pudo conectar con el servicio de IA. Por favor, compruebe la configuración de su API Key y vuelva a intentarlo.");
  }
};
