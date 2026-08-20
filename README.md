# AVI Nook — AI Interior Visualization

AI-powered interior visualization platform developed for Nook Decor Studio.

AVI Nook allows users to upload a photograph of an interior space, select products from a curated catalog, and generate an AI-assisted visualization showing how those products could look within the original environment.

The generation workflow is designed to preserve the original room composition and incorporate the selected catalog products while minimizing unrelated changes.

## Live Demo

**Production:** https://visualizador.nookdecorstudio.com.mx/

## Key Features

- Upload an interior photograph.
- Select products from the available catalog.
- Analyze the original room using Google Gemini.
- Generate AI-assisted interior visualizations.
- Preserve the original room composition and visual context.
- Integrate selected catalog products into the visualization.
- Use selected catalog images as visual context for generation.
- Handle image generation and API errors gracefully.
- Responsive interface designed for desktop and mobile use.

## AI Integration

AVI Nook uses the Google Gemini API for multimodal image analysis and AI-assisted visualization.

The application first analyzes the user's original interior image to determine relevant room context. The resulting information is then used to build placement instructions for the selected catalog products before requesting the final visualization.

The generation workflow follows this general process:

```text
User uploads room image
        ↓
User selects catalog products
        ↓
Gemini analyzes the room context
        ↓
Room type + main furniture detected
        ↓
Dynamic placement instructions generated
        ↓
Selected catalog images added as context
        ↓
Gemini generates the visualization
        ↓
Result displayed to user
```

The implementation is designed around a key product requirement:

> The AI should modify the original environment only when necessary to incorporate the selected products, rather than redesigning the room or introducing unrelated furniture.

This constraint is particularly important for interior visualization because the generated result must remain faithful to the customer's original space.

## Architecture

The application is built as a client-side React/TypeScript application with a modular structure.

```text
AVI Nook
│
├── components/
│   └── UI and application components
│
├── services/
│   └── Gemini API integration
│
├── constants/
│   └── Product catalog configuration
│
├── types.ts
│   └── Shared TypeScript types
│
└── App.tsx
    └── Main application flow
```

### Main Responsibilities

**App.tsx**

- Manages application state.
- Coordinates image upload and product selection.
- Controls the generation workflow.
- Handles loading and error states.

**geminiService.ts**

- Handles communication with the Google Gemini API.
- Analyzes the original room.
- Builds dynamic placement instructions.
- Provides selected catalog images as generation context.
- Processes the generated image response.

**ProductCatalog.tsx**

- Displays available catalog products.
- Handles product selection and visual selection state.

**ImageUploader.tsx**

- Handles user image selection and preview.

**ResultDisplay.tsx**

- Displays loading, error, original image, and generated visualization states.

## Technology Stack

- React
- TypeScript
- Vite
- Google Gemini API
- Google Gen AI SDK
- Tailwind CSS

## API Key Security

AVI Nook uses a browser-based Gemini integration, with the API key provided through environment configuration during the build process.

Because the application calls the Gemini API from the client, the production API key is protected using Google Cloud API and application restrictions. The key is restricted to the intended Gemini API and authorized web origins.

No API credential values are committed to the repository.

For local development, use a local `.env` file and never commit it or any file containing a real API key.

## Local Development

### Requirements

- Node.js
- npm

### Installation

```bash
git clone https://github.com/danielcisne/Fracta---AVI-Nook.git
cd Fracta---AVI-Nook
npm install
```

### Environment Configuration

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Never commit `.env` or any file containing a real API key.

### Start Development Server

```bash
npm run dev
```

The application will be available at the local development URL provided by Vite.

## Project Structure

```text
Fracta---AVI-Nook/
│
├── components/
│   ├── Header.tsx
│   ├── ImageUploader.tsx
│   ├── ProductCatalog.tsx
│   ├── GenerationButton.tsx
│   ├── LoadingSpinner.tsx
│   └── ResultDisplay.tsx
│
├── constants/
│   └── products.ts
│
├── services/
│   └── geminiService.ts
│
├── App.tsx
├── index.tsx
├── types.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

## Product Objective

The goal of AVI Nook is to provide customers with a practical way to visualize decorative products inside their own spaces before making a purchasing decision.

Instead of generating a completely new interior, the application focuses on contextual visualization:

**Original space + selected products → AI-assisted visualization**

This approach helps maintain a stronger connection between the generated result and the customer's actual environment.

## AI-Assisted Development

AVI Nook was developed using AI-assisted programming workflows.

AI was used as a development accelerator for tasks such as:

- Component implementation
- API integration
- TypeScript development
- Debugging
- Iterative feature development
- Prompt refinement
- UI implementation

The resulting code was reviewed, tested, adapted, and deployed as a production application.

The development process focused on using AI as a coding and problem-solving accelerator while maintaining human control over architecture, application behavior, prompt design, security configuration, testing, and deployment decisions.

## What This Project Demonstrates

This project demonstrates the ability to:

- Turn a business requirement into a working AI product.
- Integrate a generative AI API into a real application.
- Work with multimodal image inputs.
- Build a React/TypeScript application around an AI workflow.
- Design an application workflow around a specific generative AI constraint.
- Manage environment configuration and API restrictions.
- Iterate on AI prompts and application behavior.
- Deploy and maintain a production web application.
- Use AI-assisted development while validating and adapting the generated implementation.

## Project Status

**Production**

The application is currently deployed and accessible through the production URL above.

## License

This repository is provided for portfolio and demonstration purposes.
