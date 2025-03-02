import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

const assistantId = "asst_CsA1Zga8EZiFfp1lrByuCD0y"; 

export async function queryAssistant(message: string) {
  try {
    const thread = await openai.beta.threads.create();

    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: [{ type: "text", text: message }], 
    });

    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId,
    });

    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    while (runStatus.status === "queued" || runStatus.status === "in_progress") {
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    }

    const messages = await openai.beta.threads.messages.list(thread.id);
    const lastMessage = messages.data.reverse().find((msg) => msg.role === "assistant");

    if (lastMessage) {
      const textContent = lastMessage.content.find((c) => c.type === "text");
      return textContent ? textContent.text : "No text response found.";
    }

    return "No response from assistant.";
  } catch (error) {
    console.error("Error querying assistant:", error);
    throw error;
  }
}
