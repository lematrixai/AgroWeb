"use server"
import { client } from "@gradio/client";

interface Prediction {
  label: string;
  score: number;
}

interface ModelResponse {
  predictions: Prediction[];
  top_prediction: {
    label: string;
    score: number;
  };
}

export async function detectDisease(file: File) {
  try {
    console.log('Initializing Gradio client...');
    const app = await client("Lematrixai/corn-model-disease-detection");
    
    console.log('Making prediction...');
    const result = await app.predict("/predict", [
      file, // File in 'img' Image component
    ]);

    console.log('Prediction result:', result.data);
    
    // Extract the top prediction
    const predictionData = result.data as ModelResponse[];
    const topPrediction = predictionData[0].top_prediction;
    const confidence = (topPrediction.score * 100).toFixed(2);
    
    // Return the prediction data and formatted message
    return {
      predictions: predictionData[0].predictions,
      topPrediction: {
        label: topPrediction.label,
        confidence: confidence
      },
      message: `I've analyzed your corn plant image and found that it is ${topPrediction.label} with ${confidence}% confidence.`
    };
  } catch (error) {
    console.error('Full error:', error);
    if (error instanceof Error) {
      if (error.message.includes('404')) {
        throw new Error("Model not found. Please check the model ID.");
      }
      if (error.message.includes('401')) {
        throw new Error("Invalid API key. Please check your Hugging Face API key.");
      }
      if (error.message.includes('timeout')) {
        throw new Error("Request timed out. Please try again.");
      }
      throw new Error(`API Error: ${error.message}`);
    }
    throw new Error("Failed to process image");
  }
} 