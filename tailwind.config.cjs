/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{svelte,ts,js}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#2E7D32', 700: '#2E7D32', 600: '#2E7D32', 500: '#3DA442' },
        mint: { DEFAULT: '#A5D6A7', 400: '#A5D6A7' },
        neutral: {
          25:'#F9FAFB', 50:'#F3F4F6', 100:'#E5E7EB', 300:'#D1D5DB',
          600:'#374151', 900:'#111827'
        },
        success:{ DEFAULT:'#16A34A' }, warn:{ DEFAULT:'#D97706' }, error:{ DEFAULT:'#DC2626' }
      },
      fontFamily: {
        heading: ['Poppins','ui-sans-serif','system-ui'],
        body: ['Inter','ui-sans-serif','system-ui']
      },
      borderRadius: { xl: '1rem', '2xl': '1.25rem' }
    }
  },
  plugins: []
};
