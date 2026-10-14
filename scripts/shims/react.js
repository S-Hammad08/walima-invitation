// Maps `import ... from 'react'` onto the global React loaded from the CDN.
const R = window.React;
export default R;
export const {
  useState, useEffect, useRef, useMemo, useCallback, useReducer, useLayoutEffect,
  Fragment, createElement, StrictMode,
} = R;
