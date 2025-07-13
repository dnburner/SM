# 1st Grade Math Quiz with ChatGPT Explanations

This is a Netlify-ready web app that quizzes students on 1st grade math. If the student gets a question wrong, the app uses a Netlify serverless function to call the ChatGPT API and return an age-appropriate explanation.

## How to Deploy

1. Push this folder to a GitHub repository.
2. In Netlify, click "Add new site" → "Import from GitHub"
3. Select this repo and confirm:
   - Build command: *(leave blank)*
   - Publish directory: `.`
4. In Netlify → Site Settings → Environment Variables:
   - Add: `OPENAI_API_KEY = sk-...` (your actual OpenAI API key)
5. Deploy the site. You should now see explanations appear for incorrect answers.
