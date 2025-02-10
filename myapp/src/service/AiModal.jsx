import { GoogleGenerativeAI } from "@google/generative-ai";
  
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate recipe which can be made from bread. The recipe should be easy to make. Give each and every step to make the food item in points. Also give the estimated time that will be consumed to make the recipe. Give the recipe in  about 5 to 6 points in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"recipeName\": \"Quick & Easy Bread Pizza Toast\",\n  \"estimatedTime\": \"10-15 minutes\",\n  \"ingredients\": [\n    \"2 slices of bread (any type)\",\n    \"2 tablespoons of tomato sauce or pizza sauce\",\n    \"1/4 cup of shredded cheese (mozzarella, cheddar, or your choice)\",\n    \"Optional toppings: chopped vegetables like bell peppers, onions, mushrooms, or olives; pepperoni or cooked sausage pieces; herbs like dried oregano or basil.\"\n  ],\n  \"instructions\": [\n    \"Preheat your oven's broiler or a toaster oven to a medium-high setting.\",\n    \"Place the bread slices on a baking sheet or toaster oven tray.\",\n    \"Spread the tomato or pizza sauce evenly over the bread slices.\",\n     \"Sprinkle the shredded cheese over the sauce. \",\n    \"Add any optional toppings you like on top of the cheese.\",\n    \"Place the tray under the broiler or in the toaster oven. Broil or toast for 2-5 minutes or until the cheese is melted, bubbly, and lightly browned. Keep a close watch to prevent burning. Remove from oven carefully and let it cool down a bit before eating.\"\n  ]\n}\n```\n"},
          ],
        },
      ],
    });
  