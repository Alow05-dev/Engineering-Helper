export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { subject = "General", mode = "solve", problem = "" } = req.body || {};
    if (!problem.trim()) return res.status(400).json({ error: "Problem text is required." });
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "OPENAI_API_KEY is not configured on the server." });
    const system = `You are Engineering Copilot, a rigorous engineering tutor.\nDiscipline: ${subject}\nMode: ${mode}\n\nSolve engineering homework accurately and teach the reasoning. Do not invent missing values. Start with: 1. Given 2. Find 3. Assumptions 4. Governing equations 5. Step-by-step calculation 6. Final answer with units 7. Verification / reasonableness check. If the problem is ambiguous, explicitly identify what is missing instead of guessing. Keep equations readable in plain text/LaTeX-style notation. For code or programming questions, provide runnable code and explain it.`;
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: process.env.OPENAI_MODEL || "gpt-5.6-luna", input: [{ role: "system", content: system }, { role: "user", content: problem }], max_output_tokens: 5000 })
    });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data?.error?.message || "OpenAI API request failed." });
    return res.status(200).json({ answer: data.output_text || "The model returned no text." });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Server error." });
  }
}
