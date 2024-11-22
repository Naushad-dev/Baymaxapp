import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "./API";


const genAI= new GoogleGenerativeAI(GEMINI_API_KEY)

export const AskAI= async(prompt)=>{

    try {
        const model= genAI.getGenerativeModel({model:'gemini-pro'})
        const result= await model.generateContent(prompt)
        const response= result.response.text()
        return response
        
    } catch (error) {
        throw error
    }

}