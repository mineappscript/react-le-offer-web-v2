// import { useState, useLayoutEffect } from 'react';

// const useTheme = () => {
//   // Initialize theme from session storage or system preference
//   const [theme, setTheme] = useState(() => {
//     // Check for server-side rendering
//     if (typeof window !== 'undefined') {
//       // Check user's preference in session storage
//       const storedTheme = sessionStorage.getItem('theme');
//       if (storedTheme !== null) {
//         return storedTheme === 'true'; // Ensure we compare string to 'true' to get boolean
//       }

//       // If no stored preference, then check system preference
//       const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
//       return prefersDarkMode;
//     }

//     // Default theme if window is not available (e.g., server-side rendering)
//     return false;
//   });

//   // Update class on root element and store theme preference
//   useLayoutEffect(() => {
//     const root = window.document.documentElement;

//     if (theme) {
//       root.classList.add('dark');
//     } else {
//       root.classList.remove('dark');
//     }
//     // Store the current theme state in sessionStorage as a string
//     sessionStorage.setItem('theme', theme.toString());
//   }, [theme]);

//   return [theme, setTheme];
// };

// export default useTheme;

import { useState, Dispatch, SetStateAction, useEffect } from 'react';

type ThemeHookReturnType = [boolean, Dispatch<SetStateAction<boolean>>];

const useTheme = (): ThemeHookReturnType => {
  // Initialize theme from session storage or system preference
  const [theme, setTheme] = useState(() => {
    // Check for server-side rendering
    if (typeof window !== 'undefined') {
      // Check user's preference in session storage
      
      const storedTheme = sessionStorage.getItem('theme');
      
      if (storedTheme !== null) {
        return storedTheme === 'true'; // Ensure we compare string to 'true' to get boolean
      }

      // If no stored preference, then check system preference
      const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDarkMode;
    }

    // Default theme if window is not available (e.g., server-side rendering)
    return false;
  });

  // Update class on root element and store theme preference
  useEffect(() => {
    const root = window.document.documentElement;

    if (theme) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Store the current theme state in sessionStorage as a string
    sessionStorage.setItem('theme', theme.toString());
  }, [theme]);

  return [theme, setTheme];
};

export default useTheme;
