# AI SDK Integration Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env` file in the project root:
```env
OPENAI_API_KEY=your_openai_api_key_here
VITE_API_URL=http://localhost:3001
```

### 3. Run the Application
```bash
# Start both the AI API server and the React app
npm run dev:full

# Or run them separately:
# Terminal 1: Start the AI API server
npm run dev:server

# Terminal 2: Start the React app
npm run dev
```

## 🎯 Features Implemented

### ✨ AI-Powered Streaming Chat
- **Real-time AI responses** instead of static messages
- **Streaming text** with natural typing animation
- **Enhanced update messages** with AI-powered improvements
- **Fallback system** for offline/error scenarios

### 🤖 Smart Signal Generation
- **AI-generated signal configurations** based on user input
- **Intelligent preview data** with realistic metrics and insights
- **Dynamic content creation** for monitoring signals

### ⚡ Enhanced User Experience
- **Lightning loader** with 5-second AI-powered preview generation
- **Smooth streaming animations** for all AI responses
- **Progressive enhancement** - works without AI as fallback

## 🔧 API Endpoints

The Express server provides these AI-powered endpoints:

- `POST /api/chat` - Enhanced chat with AI streaming
- `POST /api/generate-signal` - AI-powered signal generation
- `POST /api/generate-preview` - AI-generated preview data
- `POST /api/enhance-message` - AI message enhancement

## 🎮 How to Use

1. **Chat Enhancement**: Messages now use AI streaming for more natural responses
2. **Signal Generation**: Create new signals with AI assistance
3. **Preview Generation**: Click "Save + preview" to see AI-generated preview data
4. **Update Messages**: Automatic AI enhancement of system messages

## 🛠 Technical Implementation

### AI Chat Hook (`useAIChat`)
- Manages streaming connections to AI API
- Handles real-time text streaming
- Provides specialized functions for different AI operations

### Enhanced Components
- **UpdateMessage**: Now supports AI streaming mode
- **BuilderPreview**: Integrated with AI-generated loading states
- **MonitoringChatPane1**: Full AI chat integration

### Backend Integration
- **Express server** with AI SDK streaming
- **OpenAI GPT-4** for intelligent responses
- **Structured prompts** for consistent, high-quality outputs

## 🔍 Debugging

### Check Server Logs
The AI API server logs all operations:
```bash
🚀 AI API server running on http://localhost:3001
📋 Available endpoints:
   POST /api/chat - Enhanced chat with AI streaming
   POST /api/generate-signal - AI-powered signal generation
   POST /api/generate-preview - AI-generated preview data
   POST /api/enhance-message - AI message enhancement
```

### Verify Environment
Make sure your `.env` file has the correct OpenAI API key and the server URL is accessible.

### Fallback Mode
If AI features fail, the app gracefully falls back to the original static responses.

## 🚀 Next Steps

The foundation is now set for advanced AI features:
- Multiple parallel AI streams
- Dynamic UI component generation
- Real-time data analysis and insights
- Advanced signal refinement workflows

Happy coding! 🎉 