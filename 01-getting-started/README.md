# Module 1: Getting Started with Lit

Welcome to the first module of the Lit Masterclass! In this module, you'll learn the basics of Lit and create your first Web Component.

## What You'll Learn

- What are Web Components and why use them
- Introduction to Lit and its core concepts
- Setting up a development environment
- Creating your first Lit component
- Basic reactivity with properties

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown in the terminal (usually http://localhost:5173)

## Project Structure

```
01-getting-started/
├── index.html             # Main HTML entry point
├── src/
│   ├── index.js           # Main JavaScript entry point
│   └── components/        # Folder for our components
│       └── my-element.js  # Your first Lit component
├── package.json           # Project dependencies
└── vite.config.js         # Vite configuration
```

## Exercise

1. Explore the provided `my-element.js` component
2. Modify the component to display your name
3. Add a new property and display it in the template
4. Try adding a button that increments a counter

## Additional Resources

- [Lit Documentation](https://lit.dev/docs/)
- [Web Components on MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Vite Documentation](https://vitejs.dev/)
