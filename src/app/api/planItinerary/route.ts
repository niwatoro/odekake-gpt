import { Place } from "@/app/types/place";
import { Configuration, OpenAIApi } from "openai";

export async function POST(request: Request) {
  const { places, area, purpose, period, participants, language } = await request.json();

  const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openaiApi = new OpenAIApi(configuration);

  const outputFormat = () => {
    switch (language) {
      case "ja":
        return '1日目\n午前：${午前の予定}"\n午後：${午後の予定}';
      case "en":
        return "Day 1\nMorning: ${morning}\nAfternoon: ${afternoon}";
      default:
        return "Day 1\nMorning: ${morning}\nAfternoon: ${afternoon}";
    }
  };
  try {
    const response = await openaiApi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `As a travel agent, create a customized itinerary for the customer based on their desired area, participants, period, and purpose. Strictly format the output as follows: "${outputFormat()}"`,
        },
        {
          role: "user",
          content: `Area: ${area}, Period: ${period}, Participants: ${participants} and me, Purpose: ${purpose}, Possible destinations: ${places.map((place: Place) => place.name).join(", ")}\nlang: ${language}`,
        },
      ],
    });
    const text = response.data.choices[0].message?.content!;
    return new Response(JSON.stringify({ itinerary: text, destinations: places.filter((place: Place) => text.includes(place.name)) }));
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e }));
  }
}
