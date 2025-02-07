import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Next.js와 TypeScript 관련 설정 가져오기
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Prettier와 통합
  {
    plugins: {
      prettier, // Prettier 플러그인 추가
    },
    rules: {
      "prettier/prettier": "error", // Prettier 규칙을 에러로 처리
    },
    extends: [prettierConfig], // Prettier와 ESLint 충돌 방지
  },
];

export default eslintConfig;
