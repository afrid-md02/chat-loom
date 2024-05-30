/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        VT323: ["VT323", "serif"],
        Raleway: ["Raleway", "sans"],
        BrunoAceSC: ["Bruno Ace SC", "italic"],
      },
      colors: {
        background: "rgba(var(--background))",
        foreground: "rgba(var(--foreground))",
        border: "rgba(var(--border))",
        copy: "rgba(var(--copy))",
        copylight: "rgba(var(--copylight))",
        copylighter: "rgba(var(--copylighter))",
        primary: "rgba(var(--primary))",
        primarycontent: "rgba(var(--primarycontent))",
        primarylight: "rgba(var(--primarylight))",
        primarydark: "rgba(var(--primarydark))",
        themebtnbg: "rgba(var(--themebtnbg))",
        custompink: "rgba(var(--custompink))",
      },
      dropShadow: {
        scollBtnDropShadowL: "0 20px 20px rgba(0, 0, 0, 0.25)",
        scollBtnDropShadowD: "0px 20px 20px rgba(251, 251, 251, 0.25)",
        "3xlLightMode": "0 20px 20px rgba(0, 0, 0, 0.25)",
        "3xlDarkMode": "0px 20px 20px rgba(251, 251, 251, 0.25)",
      },
    },
  },
  plugins: [],
};
