import { GoogleGenAI, Modality } from "@google/genai";
import type { UserImage, Product } from '../types';

// Utility to parse data URL
const parseDataUrl = (dataUrl: string) => {
  const match = dataUrl.match(/^data:(.+);base64,(.+)$/);
  if (!match) {
    throw new Error("Invalid data URL format");
  }
  return { mimeType: match[1], data: match[2] };
};

export const redesignRoom = async (
  baseImage: UserImage,
  selectedProducts: Product[],
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const baseImagePart = {
    inlineData: {
      data: baseImage.data,
      mimeType: baseImage.mimeType,
    },
  };
  
  const productParts = selectedProducts.map(product => {
    const { mimeType, data } = parseDataUrl(product.imageBase64);
    return {
      inlineData: { data, mimeType },
    };
  });

  const textPrompt = {
    text: `Eres un experto diseñador de interiores. Analiza la imagen de la habitación subida por el usuario. Luego, integra de manera fluida y realista las imágenes de los productos proporcionados en la habitación. Empareja la iluminación, las sombras, la perspectiva y el estilo general de la habitación original. El resultado final debe ser una única imagen fotorrealista de la habitación rediseñada. No añadas ningún artículo que no se haya proporcionado. No añadas texto ni anotaciones a la imagen final. Solo devuelve la imagen de la habitación rediseñada. Las siguientes imágenes son los productos que se deben añadir.`
  };

  const allParts = [
    textPrompt,
    baseImagePart,
    ...productParts
  ];

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
      console.error("Error en la llamada a la API de Gemini:", error);
      throw new Error("No se pudo conectar con el servicio de IA. Por favor, compruebe la configuración de su API Key y vuelva a intentarlo.");
  }
};
