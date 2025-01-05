# Vite

Website: [https://vite.dev/](https://vite.dev/)

Vite has gained popularity as a modern build tool for web development because of several key advantages over older tools like Webpack. Here’s why we choose Vite:

- **Instant Hot Module Replacement (HMR):** Vite provides fast HMR, allowing updates to be reflected in the browser almost instantly. This makes development faster and more efficient, especially in large projects.
- **ESModules:** Vite uses native ES modules in the browser, allowing for faster module resolution and the use of modern JavaScript features like import/export.
- **No bundling in development:** Unlike Webpack, Vite doesn’t bundle your code in development, which eliminates the need for a slow bundling process during development. It only bundles when preparing for production.
- **Vite uses Rollup:** under the hood for production builds, which provides highly optimized, tree-shaken, and minified bundles for the best performance.
- **Code Splitting and Lazy Loading:** are supported out of the box, enabling efficient production builds that load faster.
- **Vite provides built-in support for TypeScript:** so you don’t need to configure separate loaders or plugins as you do with Webpack.
- **Vite is optimized for modern browsers that support ES Modules:** This enables faster development and production builds, as the browser can load and execute JavaScript directly without needing to transform it for older environments.
- **Code Splitting and Tree Shaking:** Vite is focused on optimizing your bundle size with efficient code splitting and tree-shaking, ensuring you only ship the code that is actually needed.
