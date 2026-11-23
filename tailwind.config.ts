import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '90rem', // 1440px
      },
      borderWidth: {
        '3': '3px',
      },
      colors: {
        /* Open Heavens: Warm Cream Ground, Midnight Ink, Bright Amber, Sky Blue, Soft Peach, Mint */
        ground: "var(--ground)",
        paper: "var(--paper)",
        ink: "var(--ink)",
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          foreground: "var(--on-accent)",
        },
        "on-accent": "var(--on-accent)",
        surface: {
          DEFAULT: "var(--surface)",
          dark: "var(--surface-dark)",
        },
        "surface-dark": "var(--surface-dark)",
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted)",
        },
        line: "var(--line)",

        /* Palette Roles */
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--accent-hover)",
          foreground: "var(--on-accent)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--ink)",
        },
        tertiary: {
          DEFAULT: "var(--tertiary)",
          foreground: "var(--ink)",
        },
        support: {
          DEFAULT: "var(--support)",
          foreground: "var(--ink)",
        },

        /* Dark section tokens */
        "paper-on-dark": "var(--paper-on-dark)",
        "muted-on-dark": "var(--muted-on-dark)",
        "line-on-dark": "var(--line-on-dark)",

        /* Semantic Status Tokens */
        success: {
          DEFAULT: "var(--success)",
          surface: "var(--success-surface)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          surface: "var(--warning-surface)",
        },
        danger: {
          DEFAULT: "var(--danger)",
          surface: "var(--danger-surface)",
        },
        info: {
          DEFAULT: "var(--info)",
          surface: "var(--info-surface)",
        },

        /* Admin Secondary Accent */
        "admin-teal": {
          DEFAULT: "var(--admin-teal)",
          surface: "var(--admin-teal-surface)",
        },

        /* Bright Pop Colors (SpaceFM & Zayd.dev inspiration) */
        pop: {
          gold: "#FFC700",
          pink: "#FF2E93",
          blue: "#00D2FF",
          green: "#16D958",
          purple: "#796BFF",
        },

        /* Neo-Brutalist Colors */
        neo: {
          border: "var(--neo-border)",
          shadow: "transparent",
          yellow: "#FFC700",
          blue: "#00D2FF",
          mint: "#16D958",
          coral: "#FF2E93",
          lilac: "#796BFF",
          cream: "var(--ground)",
        },

        /* shadcn/ui Compatibility Mapping */
        background: "var(--paper)",
        foreground: "var(--ink)",
        card: {
          DEFAULT: "var(--surface)",
          foreground: "var(--ink)",
        },
        popover: {
          DEFAULT: "var(--paper)",
          foreground: "var(--ink)",
        },
        destructive: {
          DEFAULT: "var(--danger)",
          foreground: "var(--paper)",
        },
        border: "var(--line)",
        input: "var(--line)",
        ring: "var(--accent)",
      },
      fontFamily: {
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
        "serif-display": ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-manrope)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        DEFAULT: "12px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        '2xl': "24px",
        '3xl': "28px",
      },
      boxShadow: {
        'neo-xs': 'none',
        'neo-sm': 'none',
        'neo': 'none',
        'neo-md': 'none',
        'neo-lg': 'none',
        'neo-xl': 'none',
        'neo-2xl': 'none',
        'neo-reverse': 'none',
        'neo-accent': 'none',
        'neo-white': 'none',
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
