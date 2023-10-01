import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import OpenAI from 'openai';
import FieldOfStudy from "./FieldOfStudy";
import { getOpenAIKey } from "./secrets";




async function askChat(prompt: string): Promise<string> {
  const openai = new OpenAI({
    apiKey: await getOpenAIKey(), // defaults to process.env["OPENAI_API_KEY"]
    dangerouslyAllowBrowser: true
  });
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-3.5-turbo',
  });

  return chatCompletion.choices[0].message.content!;
}

async function getPossibleJobs(fieldOfStudy: FieldOfStudy): Promise<string[]> {
  const prompt = `Podaj nazwy zawodów jakie mogę wykonywać po` +
    `${fieldOfStudy.facultyName}: ${fieldOfStudy.type}, ${fieldOfStudy.universityId}? ` +
    `Podaj wynik w JSON {jobs: [...]}.`;
  const response = await askChat(prompt);
  return JSON.parse(response)["jobs"];
}

async function getSubjects(fieldOfStudy: FieldOfStudy): Promise<string[]> {
  const prompt = `Podaj nazwy przedmiotów jakie mogę studiować na` +
    `${fieldOfStudy.facultyName}: ${fieldOfStudy.type}, ${fieldOfStudy.universityId}? ` +
    `Podaj wynik w JSON {subjects: [...]}.`;
  const response = await askChat(prompt);
  return JSON.parse(response)["subjects"];

}

export { askChat, getPossibleJobs, getSubjects };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
