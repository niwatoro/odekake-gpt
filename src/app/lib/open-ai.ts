import { Configuration, OpenAIApi } from "openai";
import { Place } from "../types/trip";

const configuration: Configuration = {
  apiKey: process.env.OPENAI_API_KEY,
  isJsonMime: (mime: string) => mime.includes("application/json"),
};

const openaiApi = new OpenAIApi(configuration);

export async function generateTripPlan(places: Place[], period: string, participants: string): Promise<String> {
  const prompt = `Choose a few destinations from the following places and create a trip plan in ${period}\n\nplaces:\n${places.map((place) => `${place.name}\n${place.address}\n\n`)}\n\nResponse should be in the following JSON format\n{\n  destinations:string[]\n  trip_plan:string\n}\n\nlang: ja`;
  const response = await openaiApi.createCompletion({
    model: "gpt-3.5-turbo",
    prompt: prompt,
  });
  const plan = response.data.choices[0].text!;
  return plan;
}
