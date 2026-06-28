import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export function getGeminiModel(modelName = "gemini-2.0-flash") {
  return genAI.getGenerativeModel({ model: modelName });
}

export async function generateAnalysis(text: string) {
  const model = getGeminiModel();

  const prompt = `You are an expert Indian legal analyst. Analyze the following court judgment and extract structured information.

Return your analysis as a JSON object with these exact keys:
{
  "caseName": "Full case name",
  "court": "Name of the court",
  "year": 2024,
  "dateOfJudgment": "DD/MM/YYYY",
  "judges": ["Judge Name 1", "Judge Name 2"],
  "summary": "A comprehensive 3-4 sentence summary of the case",
  "facts": ["Fact 1", "Fact 2", "Fact 3"],
  "issues": ["Legal issue 1", "Legal issue 2"],
  "provisions": [{"name": "Act Name", "section": "Section X", "description": "Brief description"}],
  "reasoning": "Detailed reasoning of the court in 2-3 paragraphs",
  "holding": "The final holding/decision of the court",
  "keyTakeaways": ["Takeaway 1", "Takeaway 2", "Takeaway 3"],
  "precedents": [{"caseName": "Case Name", "court": "Court", "year": 2020, "citation": "Citation", "similarityScore": 0.85, "keyHolding": "Key holding", "relevance": "Why this precedent is relevant"}]
}

JUDGMENT TEXT:
${text.substring(0, 30000)}

Return ONLY valid JSON, no markdown formatting or code blocks.`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const responseText = response.text();

  try {
    // Try to parse as JSON directly
    return JSON.parse(responseText);
  } catch {
    // Try to extract JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error("Failed to parse AI response as JSON");
  }
}

export async function generateChatResponse(
  question: string,
  caseContext: string,
  chatHistory: Array<{ role: string; content: string }>
) {
  const model = getGeminiModel();

  const historyText = chatHistory
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n");

  const prompt = `You are an expert Indian legal assistant helping a lawyer understand a court judgment. Be precise, cite specific parts of the judgment, and use proper legal terminology.

CASE CONTEXT:
${caseContext.substring(0, 20000)}

CONVERSATION HISTORY:
${historyText}

USER QUESTION: ${question}

Provide a detailed, well-structured answer. If referencing specific parts of the judgment, indicate the section. Format your response in clear paragraphs.`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function generateBrief(analysisData: Record<string, unknown>) {
  const model = getGeminiModel();

  const prompt = `You are an expert Indian legal brief writer. Based on the following case analysis data, generate a comprehensive legal brief.

CASE ANALYSIS:
${JSON.stringify(analysisData, null, 2)}

Generate a structured legal brief with these sections:
{
  "facts": "Detailed statement of facts (2-3 paragraphs)",
  "issues": "Legal issues framed (numbered list format)",
  "arguments": "Key arguments made by both sides (structured paragraphs)",
  "relevantLaws": "Relevant statutory provisions and their applicability",
  "precedents": "Analysis of relevant precedents and their application",
  "conclusion": "Summary and final analysis (1-2 paragraphs)"
}

Return ONLY valid JSON.`;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();

  try {
    return JSON.parse(responseText);
  } catch {
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error("Failed to parse brief response");
  }
}
