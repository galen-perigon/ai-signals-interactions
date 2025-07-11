# Google AI Setup Guide

## Overview
Your AI signal monitoring system is now configured to use Google AI (Gemini) models instead of OpenAI. This guide will help you set up and start using Google AI.

## Models Used
- **Gemini 1.5 Flash**: Used for chat and message enhancement (faster responses)
- **Gemini 1.5 Pro**: Used for signal generation and preview data (more comprehensive analysis)

## Prerequisites
- Google AI Studio account
- Google AI API key

## Step 1: Get Your Google AI API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

## Step 2: Set Up Environment Variables

Create a `.env` file in your project root (`ai-signals-interactions/.env`) with the following content:

```env
# Google AI API Configuration
GOOGLE_GENERATIVE_AI_API_KEY=your_actual_api_key_here

# Server Configuration
PORT=3001
```

**Important**: Replace `your_actual_api_key_here` with your actual Google AI API key from Step 1.

## Step 3: Add .env to .gitignore

Make sure your `.env` file is in your `.gitignore` to keep your API key secure:

```gitignore
# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

## Step 4: Install and Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev:full
   ```

This will start both the frontend (port 5173) and the AI API server (port 3001).

## Step 5: Test the Integration

1. Open your browser to `http://localhost:5173`
2. Try the chat functionality to test the AI integration
3. Create a signal to test the signal generation
4. Check the preview functionality

## API Endpoints

The following endpoints are available:

- `POST /api/chat` - Enhanced chat with AI streaming (Gemini 1.5 Flash)
- `POST /api/generate-signal` - AI-powered signal generation (Gemini 1.5 Pro)
- `POST /api/generate-preview` - AI-generated preview data (Gemini 1.5 Pro)
- `POST /api/enhance-message` - AI message enhancement (Gemini 1.5 Flash)

## Google AI vs OpenAI Comparison

### Advantages of Google AI:
- **Free tier**: Generous free tier with 15 requests per minute
- **Cost-effective**: Lower costs for paid usage
- **Latest models**: Access to cutting-edge Gemini models
- **Speed**: Gemini 1.5 Flash offers very fast responses

### Model Capabilities:
- **Gemini 1.5 Flash**: Optimized for speed, great for chat and quick tasks
- **Gemini 1.5 Pro**: More capable, better for complex analysis and generation

## Troubleshooting

### Common Issues:

1. **"API key required" error**:
   - Ensure your `.env` file exists and contains the correct API key
   - Check that the environment variable name matches: `GOOGLE_GENERATIVE_AI_API_KEY`

2. **"Invalid API key" error**:
   - Verify your API key is correct
   - Check if your API key has the necessary permissions

3. **Rate limiting**:
   - Google AI free tier has rate limits
   - Consider upgrading to paid tier for higher limits

4. **Connection errors**:
   - Ensure you have internet connectivity
   - Check if Google AI services are operational

## Rate Limits

### Free Tier:
- 15 requests per minute
- 1,500 requests per day
- 1 million tokens per day

### Paid Tier:
- Higher limits based on your plan
- More consistent performance

## Next Steps

1. Test all functionality with your Google AI setup
2. Monitor your usage in Google AI Studio
3. Consider upgrading to paid tier if needed
4. Customize model parameters for your specific use case

## Support

If you encounter issues:
1. Check the console logs for error messages
2. Verify your API key and environment setup
3. Review the Google AI documentation
4. Check your network connectivity

Your AI signal monitoring system is now ready to use Google AI! 🚀 