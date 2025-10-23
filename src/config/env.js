// Environment configuration
export const config = {
  API_BASE_URL: import.meta.env.PROD 
    ? import.meta.env.VITE_API_BASE_URL_PROD || window.location.origin
    : import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001',
  
  MONGODB_URI: import.meta.env.VITE_MONGODB_URI,
  GOOGLE_SPREADSHEET_ID: import.meta.env.VITE_GOOGLE_SPREADSHEET_ID,
  ENROLLMENT_CSV_URL: import.meta.env.VITE_ENROLLMENT_CSV_URL,
  
  // Other API keys
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY,
  ANTHROPIC_API_KEY: import.meta.env.VITE_ANTHROPIC_API_KEY,
  GOOGLE_ANALYTICS_ID: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
  ADSENSE_ID: import.meta.env.VITE_ADSENSE_ID,
  PERPLEXITY_API_KEY: import.meta.env.VITE_PERPLEXITY_API_KEY,
  STRIPE_PUBLISHABLE_KEY: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
};

export default config;