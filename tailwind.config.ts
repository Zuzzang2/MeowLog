import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin"; //tailwind 커스터마이징 API

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "custom-gray": "#a9a9a9",
        "custom-blue": "#f0f8ff",
      },
    },
  },
  plugins: [
    //유틸리티 클래스 추가
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".flex-center": {
          display: "flex",
          "justify-content": "center",
          "align-items": "center",
        },
      });
    }),
  ],
} satisfies Config;
