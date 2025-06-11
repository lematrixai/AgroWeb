'use server'

import { cookies } from "next/headers"
import { db } from "@/lib/firebase"
import { collection, addDoc, query, where, orderBy, getDocs } from "firebase/firestore"
import { getUserEmail } from "./action.auth"

export interface DetectionResult {
  imageUrl: string
  predictions: Array<{
    label: string
    score: number
  }>
  topPrediction: {
    label: string
    confidence: string
  }
  message: string
  location?: {
    latitude: number
    longitude: number
  }
  timestamp?: string
}

export async function saveDetectionResult(data: Omit<DetectionResult, 'timestamp'>) {
  try {
    const email = await getUserEmail()
    if (!email) {
      return { success: false, error: "Not authenticated" }
    }

    const detectionsRef = collection(db, "detections")
    const docRef = await addDoc(detectionsRef, {
      ...data,
      userEmail: email,
      timestamp: new Date().toISOString()
    })

    return { success: true, id: docRef.id }
  } catch (error) {
    console.error("Error saving detection result:", error)
    return { success: false, error: "Failed to save detection result" }
  }
}

export async function getUserDetections() {
  try {
    const email = await getUserEmail()
    if (!email) {
      return { success: false, error: "Not authenticated" }
    }

    const detectionsRef = collection(db, "detections")
    const q = query(
      detectionsRef,
      where("userEmail", "==", email),
      orderBy("timestamp", "desc")
    )

    const querySnapshot = await getDocs(q)
    const detections = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return { success: true, detections }
  } catch (error) {
    console.error("Error getting user detections:", error)
    return { success: false, error: "Failed to get detection history" }
  }
} 