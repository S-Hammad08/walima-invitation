// Maps `import ... from 'react-dom/client'` onto the global ReactDOM loaded from the CDN.
const D = window.ReactDOM;
export default D;
export const createRoot = D.createRoot;
export const hydrateRoot = D.hydrateRoot;
