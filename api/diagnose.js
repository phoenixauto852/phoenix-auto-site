export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY; // 在 Vercel Settings 設定此變數

    if (!apiKey) return res.status(500).json({ error: 'API Key is missing' });

    try {
        const response = await fetch(https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: You are a pro mechanic for Phoenix Auto.852. Suggest 2-3 causes for this problem: ${message}. Concise and professional. }] }]
            })
        });
        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I can't help with that right now.";
        return res.status(200).json({ reply });
    } catch (e) {
        return res.status(500).json({ error: 'Failed' });
    }
}
