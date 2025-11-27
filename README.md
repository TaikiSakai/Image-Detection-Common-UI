# CNN Tool Interface

A modern web-based user interface for CNN-based image detection applications. This flexible, model-agnostic platform works with various CNN architectures and provides powerful image preprocessing capabilities.

## Features

- **Universal CNN Support**: Works with any CNN model architecture regardless of input size requirements
- **Multi-Image Upload**: Upload multiple images at once in BMP, JPG, JPEG, or PNG format
- **Image Cropping**: Built-in image cropping tool with fixed 1:1 aspect ratio and 255x255 pixel output
- **Prediction Visualization**: View top 10 prediction results in an adaptive grid layout
- **Modern UI**: Responsive design built with React 19 and Tailwind CSS 4
- **Type-Safe Development**: Built entirely with TypeScript for reliability and maintainability

## Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd cnn_tool_interface

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Building for Production

```bash
# Create a production build
npm run build

# Preview the production build
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production (includes linting and type checking)
- `npm run preview` - Preview production build locally
- `npm run lint` - Check code for linting errors
- `npm run lint:fix` - Automatically fix linting errors
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI interface
- `npm run test:run` - Run tests once (for CI/CD)

## Technology Stack

- **React 19** - Modern UI library
- **TypeScript 5** - Type-safe JavaScript
- **Vite 7** - Fast build tool with hot module replacement
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router 7** - Client-side routing
- **react-image-crop** - Image cropping functionality
- **Vitest** - Fast unit testing framework

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── analysis/    # Image analysis components
│   ├── common/      # Shared components (buttons, etc.)
│   ├── layout/      # Layout components (header, sidebar)
│   └── prediction/  # Prediction result components
├── pages/           # Page components
├── hooks/           # Custom React hooks
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── router/          # Routing configuration

tests/               # Test files
```

## Usage

1. **Upload Images**: Click the upload button to select one or more images
2. **Select an Image**: Click on an image thumbnail in the sidebar
3. **Crop Image**: Use the cropping tool to select the area of interest
4. **View Results**: Prediction results will be displayed automatically

## Development Guidelines

- All new code must be written in TypeScript
- Use the `@/` path alias for imports from the `src/` directory
- Follow the existing code style (enforced by ESLint and Prettier)
- Write tests for custom hooks (UI component tests are optional)
- Avoid using `any` or `unknown` types

## Browser Support

This application works in all modern browsers that support ES2022 features:

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Contributing

Please ensure all tests pass and code is properly formatted before submitting changes:

```bash
npm run lint:fix
npm run format
npm run test:run
```
