# AVI Nook — AI Interior Visualization

AI-powered interior visualization platform developed for Nook Decor Studio.

AVI Nook allows users to upload a photograph of an interior space, select products from a curated catalog, and generate an AI-assisted visualization showing how those products could look within the original environment.

The generation workflow is designed to preserve the original room composition and incorporate the selected catalog products while minimizing unrelated changes.
## 🚀 Live Demo

**Production:** https://visualizador.nookdecorstudio.com.mx/

## ✨ Key Features

* Upload an interior photograph.
* Select products from the available catalog.
* Generate AI-assisted visualizations using Google Gemini.
* Preserve the original room composition and visual context.
* Integrate selected catalog products into the visualization.
* Handle image generation and API errors gracefully.
* Responsive interface designed for desktop and mobile use.

## 🧠 AI Integration

AVI Nook uses the Google Gemini API for AI-assisted image analysis and visualization.

The application sends the user's selected products and the original interior image as context for the generation process.

The implementation is designed around a key product requirement:

> The AI should modify the original environment only when necessary to incorporate the selected products, rather than redesigning the room or introducing unrelated furniture.

This constraint is particularly important for interior visualization because the generated result must remain faithful to the customer's original space.

## 🏗️ Architecture

The application is built as a client-side React/TypeScript application with a modular structure.

```text
AVI Nook
│
├── React + TypeScript
│
├── components/
│   └── UI and application components
│
├── services/
│   └── Gemini API integration
│
├── constants/
│   └── Product and application configuration
│
├── types.ts
│   └── Shared TypeScript types
│
└── App.tsx
    └── Main application flow
```

### Main flow

```text
User uploads room image
        ↓
User selects catalog products
        ↓
Application builds AI request
        ↓
Google Gemini API
        ↓
Generated visualization
        ↓
Result displayed to user
```

## 🛠️ Technology Stack

* React
* TypeScript
* Vite
* Google Gemini API
* Google Gen AI SDK
* HTML5 / CSS
* JavaScript / TypeScript

## 🔐 API Key Security

The Gemini API key is provided through environment configuration and is not committed to the repository.

The production API key is restricted in Google Cloud to:

* Gemini API
* Authorized web origins

Production origins currently include:

* `https://visualizador.nookdecorstudio.com.mx/`
* `https://visualizador-nook.web.app/`

No API credentials are stored directly in the source code or repository.

> Note: Because this is a client-side application, browser-based API usage requires an application-restricted API key. The production key is configured with Google Cloud application and API restrictions to limit unauthorized use.

## 💻 Local Development

### Requirements

* Node.js
* npm

### Installation

```bash
git clone https://github.com/danielcisne/Fracta---AVI-Nook.git
cd Fracta---AVI-Nook
npm install
```

### Environment configuration

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Never commit `.env.local` or any file containing a real API key.

### Start development server

```bash
npm run dev
```

The application will be available at the local development URL provided by Vite.

## 📁 Project Structure

```text
Fracta---AVI-Nook/
│
├── components/
├── constants/
├── services/
├── App.tsx
├── index.tsx
├── types.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

## 🎯 Product Objective

The goal of AVI Nook is to provide customers with a practical way to visualize decorative products inside their own spaces before making a purchasing decision.

Instead of generating a completely new interior, the application focuses on contextual visualization:

**Original space + selected products → AI-assisted visualization**

This approach helps maintain a stronger connection between the generated result and the customer's actual environment.

## 🤖 AI-Assisted Development

AVI Nook was developed using AI-assisted programming workflows.

AI was used as a development accelerator for tasks such as:

* Component implementation
* API integration
* TypeScript development
* Debugging
* Iterative feature development
* Prompt refinement
* UI implementation

The resulting code was reviewed, tested, adapted, and deployed as a production application.

The development process focused on using AI as a coding and problem-solving tool while maintaining control over architecture, application behavior, security configuration, and deployment decisions.

## 🔎 What This Project Demonstrates

This project demonstrates the ability to:

* Turn a business requirement into a working AI product.
* Integrate a generative AI API into a real application.
* Work with multimodal image inputs.
* Build a React/TypeScript application around an AI workflow.
* Manage environment configuration and API restrictions.
* Iterate on AI prompts and application behavior.
* Deploy and maintain a production web application.
* Use AI-assisted development while validating and adapting the generated implementation.

## 📌 Project Status

**Production**

The application is currently deployed and accessible through the production URL above.

## 📄 License

This repository is provided for portfolio and demonstration purposes.
