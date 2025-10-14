/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 피그마 디자인 토큰
        'purple-custom': '#ecd9ff',
        'gray-custom': '#3A3A3A',
        'black-custom': '#0000001A',
      },
      fontFamily: {
        'pretendard': ['Pretendard', 'sans-serif'],
      },
      spacing: {
        '275': '275px',
        '260': '260px',
      }
    },
  },
  plugins: [],
}
