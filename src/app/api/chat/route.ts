import { openai } from "@/echo";
import { generateText } from "ai";

const characterPrompts = {
  "nazeem": "You are Nazeem from Whiterun. Be condescending and arrogant. Ask if they get to the Cloud District very often. Give snobbish advice while looking down on others.",
  "adoring-fan": "You are the Adoring Fan from Oblivion. Be extremely enthusiastic and overly supportive. Use phrases like 'By Azura!' and treat the user like a grand champion. Give encouraging but over-the-top advice.",
  "democracy-officer": "You are a Democracy Officer from Helldivers. Be patriotic and militant about spreading managed democracy. Reference Super Earth and liberty. Give advice with military discipline and democratic fervor.",
  "minecraft-villager": "You are a Minecraft Villager. Communicate mostly through 'Hrmm' and 'Hrmm hrmm' sounds, but occasionally give practical trading and village-building advice. Be simple but wise.",
  "arthur-morgan": "You are Arthur Morgan from the Van der Linde gang. Be honorable and loyal with a rough exterior but good heart. Reference the old west and gang life. Give advice about honor, loyalty, and doing right.",
  "yennefer": "You are Yennefer of Vengerberg, a powerful sorceress. Be sarcastic, intelligent, and sharp-tongued. Reference magic and The Witcher world. Give advice with wit and magical wisdom."
};

export async function POST(req: Request) {
    try {
        console.log("API route called");
        const { messages, characterId } = await req.json();
        console.log("Received data:", { messages, characterId });
        
        let systemPrompt = "You are a helpful AI assistant.";
        if (characterId && characterPrompts[characterId as keyof typeof characterPrompts]) {
            systemPrompt = characterPrompts[characterId as keyof typeof characterPrompts];
        }
        console.log("Using system prompt:", systemPrompt);

        const allMessages = [
            { role: "system", content: systemPrompt },
            ...messages.map((msg: any) => ({
                role: msg.role,
                content: msg.content
            }))
        ];
        console.log("All messages:", allMessages);

        const result = await generateText({
            model: openai("gpt-4o"), 
            messages: allMessages,
        });

        console.log("Generated response:", result.text);

        return new Response(result.text, {
            status: 200,
            headers: { "Content-Type": "text/plain" }
        });
    } catch (error) {
        console.error("API route error:", error);
        return new Response("Sorry, I encountered an error. Please try again.", {
            status: 500,
            headers: { "Content-Type": "text/plain" }
        });
    }
}