export default async function handler(req, res) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY; // 從 Vercel 環境變數讀取金鑰
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: req.body.message }] }],
        systemInstruction: { parts: [{ text: "You are a professional mobile mechanic for Phoenix Auto.852. Analyze car problems, explain 2-3 likely causes, and advise a professional inspection. Max 100 words." }] }
      })
    });

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "抱歉，我暫時無法分析，請聯絡技師。";
    
    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ error: 'AI 連線失敗' });
  }
}