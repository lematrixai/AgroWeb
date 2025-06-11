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

interface VerificationResponse {
  isCrop: boolean;
  confidence: string;
  message: string;
}

export async function verifyingcrop(file: File): Promise<VerificationResponse> {
  try {
    console.log('Initializing verification model...');
    const app = await client("Lematrixai/verify-crop-vs-non-crop");
    
    console.log('Verifying image...');
    const result = await app.predict("/predict", [
      file, // File in 'img' Image component
    ]);

    // Debug logging
    console.log('Raw result:', result);
    console.log('Result type:', typeof result);
    console.log('Result data type:', typeof result.data);
    console.log('Result data:', result.data);
    console.log('Result data[0] type:', typeof (result.data as any)[0]);
    console.log('Result data[0]:', (result.data as any)[0]);
    
    // The model returns a string with predictions
    const predictionText = (result.data as string[])[0];
    if (!predictionText) {
      throw new Error("No prediction result received");
    }

    // Debug the prediction text
    console.log('Prediction text:', predictionText);
    console.log('Prediction text type:', typeof predictionText);
    console.log('Prediction text length:', predictionText.length);
    
    // Split the text into lines and get the first line
    const lines = predictionText.split('\n');
    console.log('Lines:', lines);
    console.log('First line:', lines[0]);
    
    const primaryLine = lines[0];
    
    // Extract the primary prediction and confidence
    const primaryMatch = primaryLine.match(/Primary Prediction: (.*?) \((\d+\.\d+)%\)/);
    console.log('Primary match:', primaryMatch);
    
    if (!primaryMatch) {
      throw new Error("Could not parse prediction result");
    }

    const label = primaryMatch[1];
    const confidence = primaryMatch[2];
    
    console.log('Extracted label:', label);
    console.log('Extracted confidence:', confidence);
    
    // Check if the prediction is "Invalid"
    const isInvalid = label.toLowerCase() === 'invalid';
    console.log('Is invalid:', isInvalid);
    
    return {
      isCrop: !isInvalid,
      confidence,
      message: isInvalid 
        ? `Warning: This image appears to be invalid (${confidence}% confidence). Please upload a clear image of a maize/corn plant.`
        : `Verified: This appears to be a valid maize/corn plant image with ${confidence}% confidence.`
    };
  } catch (error) {
    console.error('Verification error:', error);
    if (error instanceof Error) {
      if (error.message.includes('404')) {
        throw new Error("Verification model not found. Please check the model ID.");
      }
      if (error.message.includes('401')) {
        throw new Error("Invalid API key. Please check your Hugging Face API key.");
      }
      if (error.message.includes('timeout')) {
        throw new Error("Request timed out. Please try again.");
      }
      throw new Error(`Verification Error: ${error.message}`);
    }
    throw new Error("Failed to verify image");
  }
}

export async function detectDisease(file: File) {
  try {
    // First verify if the image is a crop
    const verification = await verifyingcrop(file);
    
    if (!verification.isCrop) {
      return {
        error: true,
        message: verification.message,
        predictions: [],
        topPrediction: {
          label: 'Not a crop',
          confidence: verification.confidence
        }
      };
    }

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
      error: false,
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