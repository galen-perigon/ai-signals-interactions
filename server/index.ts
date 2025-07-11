import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { streamText, convertToCoreMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

const app = express();
const port = process.env.PORT || 3001;

// Ensure API key is available
if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
  console.error('❌ GOOGLE_GENERATIVE_AI_API_KEY environment variable is required');
  process.exit(1);
}

app.use(cors());
app.use(express.json());

// Enhanced chat endpoint with streaming
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, type = 'chat' } = req.body;

    const result = await streamText({
      model: google('gemini-1.5-flash'),
      messages: convertToCoreMessages(messages),
      system: `You are an AI assistant helping users create and manage monitoring signals for business intelligence. 
      You provide helpful, concise responses about signal configuration, data analysis, and monitoring setup.
      
      When users ask about signal updates or modifications, provide specific, actionable guidance.
      When discussing monitoring results, be analytical and insightful.`,
      maxTokens: 1000,
      temperature: 0.7,
    });

    // Set up streaming response
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Stream the response
    for await (const delta of result.textStream) {
      res.write(delta);
    }

    res.end();
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

// Signal generation endpoint
app.post('/api/generate-signal', async (req, res) => {
  try {
    const { topic, location, requirements } = req.body;

    const result = await streamText({
      model: google('gemini-1.5-pro'),
      system: `You are an expert at creating monitoring signals for business intelligence. 
      Generate detailed signal configurations based on user requirements.
      
      Respond with a structured format that includes:
      1. A clear signal title 
      2. A concise description
      3. Key metrics to monitor
      4. Data sources and filters
      5. Alert conditions
      
      Format your response as:
      TITLE: [Signal Title]
      DESCRIPTION: [Brief description]
      METRICS: [Key metrics to track]
      SOURCES: [Data sources]
      FILTERS: [Important filters]
      
      Be specific and actionable.`,
      prompt: `Create a monitoring signal for: ${topic}
      Location focus: ${location}
      Additional requirements: ${requirements}
      
      Please provide a comprehensive signal configuration following the structured format.`,
      maxTokens: 2000,
      temperature: 0.8,
    });

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for await (const delta of result.textStream) {
      res.write(delta);
    }

    res.end();
  } catch (error) {
    console.error('Signal generation error:', error);
    res.status(500).json({ error: 'Failed to generate signal' });
  }
});

// Preview data generation endpoint
app.post('/api/generate-preview', async (req, res) => {
  try {
    const { signalConfig } = req.body;

    const result = await streamText({
      model: google('gemini-1.5-pro'),
      system: `You are an expert data analyst. Generate realistic sample data and insights for monitoring signals.
      
      Provide:
      1. Sample metrics and KPIs
      2. Recent activity data
      3. Trend analysis
      4. Key findings
      
      Format as structured data that can be used to populate preview components.`,
      prompt: `Generate realistic preview data for this signal configuration:
      ${JSON.stringify(signalConfig, null, 2)}
      
      Include current metrics, recent activity, and trend insights.`,
      maxTokens: 1500,
      temperature: 0.9,
    });

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for await (const delta of result.textStream) {
      res.write(delta);
    }

    res.end();
  } catch (error) {
    console.error('Preview generation error:', error);
    res.status(500).json({ error: 'Failed to generate preview' });
  }
});

// Enhanced update message endpoint
app.post('/api/enhance-message', async (req, res) => {
  try {
    const { message, context } = req.body;

    const result = await streamText({
      model: google('gemini-1.5-flash'),
      system: `You are an expert at creating engaging, informative update messages for business monitoring systems.
      
      Transform user messages into professional, insightful updates that:
      1. Are clear and actionable
      2. Include relevant context and implications
      3. Maintain an optimistic but realistic tone
      4. Are concise but informative`,
      prompt: `Enhance this update message: "${message}"
      
      Context: ${context || 'Signal monitoring and business intelligence system'}
      
      Make it more engaging and informative while keeping the core meaning.`,
      maxTokens: 500,
      temperature: 0.7,
    });

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for await (const delta of result.textStream) {
      res.write(delta);
    }

    res.end();
  } catch (error) {
    console.error('Message enhancement error:', error);
    res.status(500).json({ error: 'Failed to enhance message' });
  }
});

app.listen(port, () => {
  console.log(`🚀 AI API server running on http://localhost:${port}`);
  console.log(`🤖 Using Google AI (Gemini) models`);
  console.log(`📋 Available endpoints:`);
  console.log(`   POST /api/chat - Enhanced chat with AI streaming (Gemini 1.5 Flash)`);
  console.log(`   POST /api/generate-signal - AI-powered signal generation (Gemini 1.5 Pro)`);
  console.log(`   POST /api/generate-preview - AI-generated preview data (Gemini 1.5 Pro)`);
  console.log(`   POST /api/enhance-message - AI message enhancement (Gemini 1.5 Flash)`);
}); 