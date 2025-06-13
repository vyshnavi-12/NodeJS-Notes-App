const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Debug: Check if API key exists
console.log("🔍 Checking GEMINI_API_KEY:", process.env.GEMINI_API_KEY ? "✅ Found" : "❌ Missing");

// Ensure the API key exists
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is not set in your environment variables.");
  throw new Error("GEMINI_API_KEY is not set in your environment variables.");
}

// Instantiate Gemini AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// System prompt to define the chatbot's role and scope
const SYSTEM_PROMPT = `You are "Noto Assistant", a helpful AI assistant specifically designed for a notes application called "NodeJS Notes". 

Your primary role is to help users with:
- Note-taking strategies and techniques
- Organizing and categorizing notes
- Study tips and methods
- Productivity advice for note management
- How to use note-taking features effectively
- Best practices for digital note-taking
- Search and retrieval tips for notes
- Collaboration on notes
- Note formatting and structure
- Study schedules and planning

IMPORTANT GUIDELINES:
1. ONLY answer questions related to note-taking, studying, productivity, and the notes application
2. If someone asks about topics unrelated to notes/studying (like weather, news, cooking, etc.), politely redirect them back to note-related topics
3. Keep responses helpful, concise, and focused on improving their note-taking experience
4. Use a friendly, encouraging tone
5. Include practical tips and actionable advice
6. If asked about features your app doesn't have, suggest general note-taking alternatives

ALWAYS stay within the scope of note-taking and studying assistance. Do not answer questions about other topics.`;

// Function to create context-aware prompt
function createContextualPrompt(userQuestion) {
  return `${SYSTEM_PROMPT}

User Question: "${userQuestion}"

Please provide a helpful response focused on note-taking and studying. If the question is not related to notes, studying, or productivity, politely redirect the user back to note-related topics.`;
}

// 🧪 TEST ROUTE - Add this to test your API key
router.get("/test", async (req, res) => {
  console.log("🧪 Testing Gemini API...");
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const testPrompt = createContextualPrompt("Hello, can you help me with my notes?");
    const result = await model.generateContent(testPrompt);
    const response = result.response.text();
    
    console.log("✅ Test successful:", response);
    res.json({ 
      success: true, 
      message: "API key is working!", 
      response: response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("❌ Test failed:", error);
    res.json({ 
      success: false, 
      error: error.message,
      details: error.status || "Unknown error",
      timestamp: new Date().toISOString()
    });
  }
});

// Main chatbot route - Now context-aware for notes application
router.post("/ask", async (req, res) => {
  console.log("📥 Received chatbot request:", req.body);
  
  try {
    const question = req.body.question;
    if (!question) {
      console.log("❌ No question provided");
      return res.status(400).json({ error: "Missing question in request body." });
    }

    console.log("🤖 Processing question:", question);

    // Create contextual prompt for notes application
    const contextualPrompt = createContextualPrompt(question);
    
    // Use gemini-1.5-flash
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    console.log("🚀 Sending request to Gemini API...");
    
    // Generate the response from Gemini with context
    const result = await model.generateContent(contextualPrompt);
    
    console.log("📤 Gemini API response received");

    // Safely extract the text
    let responseText = "";
    try {
      if (result && result.response && typeof result.response.text === "function") {
        responseText = result.response.text();
      } else if (result && result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
        responseText = result.candidates[0].content.parts[0].text;
      } else {
        console.log("⚠️ Unexpected response structure:", JSON.stringify(result, null, 2));
        responseText = "Sorry, I couldn't get a response. Please try asking about note-taking or studying!";
      }
    } catch (textError) {
      console.error("❌ Error extracting text:", textError);
      responseText = "Sorry, there was an error. Please try asking about note-taking tips!";
    }

    console.log("✅ Sending response:", responseText.substring(0, 100) + "...");
    res.json({ answer: responseText });

  } catch (error) {
    console.error("❌ Full error details:", error);
    
    // Handle different types of errors
    if (error.status === 429) {
      console.log("⚠️ Quota exceeded error");
      return res.status(429).json({ error: "Too many requests! Please wait a moment and ask me about your notes again." });
    }
    
    if (error.status === 403) {
      console.log("⚠️ API key permission error");
      return res.status(403).json({ error: "I'm having trouble connecting. Please try asking about note-taking tips later!" });
    }
    
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      console.log("⚠️ Network connectivity error");
      return res.status(500).json({ error: "Connection issue. Please check your internet and ask me about notes again!" });
    }

    // Generic error response
    console.log("❌ Generic server error");
    res.status(500).json({ 
      error: "I'm having trouble right now. Please try asking about note-taking or studying tips!", 
      details: error.message
    });
  }
});

module.exports = router;