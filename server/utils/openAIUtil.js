const { openai } = require("../config/openai");
const { openAIString } = require("./queryStringOpenAI");

const conversationHistory = [];

const addUserMessage = (conversationHistory, userMessage) => {
  conversationHistory.push({ role: "user", content: userMessage });
};

// Function to add an AI response to the conversation
const addAIResponse = (conversationHistory, aiResponse) => {
  conversationHistory.push({ role: "assistant", content: aiResponse });
};

const createResponseStringHandler = async (businessName, promotionDetails) => {
  return openAIString(businessName, promotionDetails);
};

// Function to add a user message to the conversation
const sendOpenAIMessage = async (userMessage) => {
  try {
    addUserMessage(conversationHistory, userMessage);

    let response;

    if (process.env.ENVIRONMENT === "production") {
      try {
        response = await openai.chat.completions.create({
          messages: conversationHistory,
          model: "gpt-3.5-turbo",
          max_tokens: 200,
        });
      } catch (error) {
        response = await error;
      }

      const aiResponse = response.error
        ? response.error.message
        : await response.choices[0].message.content;

      addAIResponse(conversationHistory, aiResponse);

      // You can handle or log the AI response as needed
      console.log("AI Response:", aiResponse);

      const openAIResponseFormatted = {
        message: aiResponse,
        usage: response.usage === undefined ? 0 : response.usage,
      };

      return openAIResponseFormatted;
    } else {
      return {
        message:
          "1. Feeling hungry? 🍂 Grab affordable autumn snacks!\n2. Craving seasonal flavors? 🎃 Discover cost-friendly fall treats!\n3. Want a taste of fall? 🍁 Check out our discounted autumn recipes!\n4. Need to stock your pantry? 🍂 Save on fall essentials!\n5. Searching for fall bargains? 🍁 Get great deals on seasonal goodies!\n6. Hungry for autumn savings? 🎃 Find unbeatable prices on fall favorites!\n7. Calling all snack lovers! 🍂 Enjoy pocket-friendly fall munchies!\n8. Looking for affordable fall flavors? 🍁 Shop our discounted seasonal selection!\n9. Fall into savings! 🍃 Get the best deals on autumn essentials!\n10. Craving fall comfort foods? 🍁 Discover budget-friendly options!",
        usage: {
          prompt_tokens: 131,
          completion_tokens: 167,
          total_tokens: 298,
        },
      };
    }
  } catch (error) {
    return error;
  }
};

module.exports = {
  sendOpenAIMessage,
  conversationHistory,
  createResponseStringHandler,
};
