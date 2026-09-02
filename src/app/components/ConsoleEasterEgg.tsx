// Show 2 logs in console coz of React Strict mode
// "use client";

// import { useEffect } from "react";

// export default function ConsoleEasterEgg() {
//   useEffect(() => {
//     const styles = [
//       "color: #a855f7",
//       "font-size: 14px",
//       "font-weight: bold",
//     ].join(";");

//     console.log("%cHey, curious developer", styles);
//     console.log(
//       "%cLooking for the code? → https://github.com/Ahmedwafy",
//       "color: #94a3b8; font-size: 12px;",
//     );
//     console.log(
//       "%cBuilt with Next.js + Tailwind + Framer Motion",
//       "color: #64748b; font-size: 11px;",
//     );
//   }, []);

//   return null;
// }

// useRef → for Dev Mode : Show only 1 log and not 2 logs in console
"use client";

import { useEffect, useRef } from "react";

export default function ConsoleEasterEgg() {
  const logged = useRef(false);

  useEffect(() => {
    if (logged.current) return;
    logged.current = true;

    console.log(
      "%cHey, curious developer 👋",
      "color: #a855f7; font-size: 14px; font-weight: bold;",
    );
    console.log(
      "%cLooking for the code? → https://github.com/Ahmedwafy",
      "color: #94a3b8; font-size: 12px;",
    );
    console.log(
      "%cBuilt with Next.js + Tailwind + Framer Motion",
      "color: #64748b; font-size: 11px;",
    );
  }, []);

  return null;
}
