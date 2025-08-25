// # call OpenAI, persist result

// loads the OPENAI API from .env 
const apiKey = process.env.OPENAI_API_KEY;

function validateData(body) {
    return {
        ageGroup: body.ageGroup,     // e.g. 'under-12' | '13-17' | '18-29' | ...
        mood: body.mood,             // e.g. 'happy', 'chill', 'sad'
        activity: body.activity,     // e.g. 'studying', 'working', 'workout'
        energy: body.energy,         // 'low', 'medium', 'high'
        // only keep up to 8 genres, in case user sends too many
        genres: Array.isArray(body.genres) ? body.genres.slice(0, 8) : [],
        // default to any language if not set 
        language: body.language || 'any',
        // tracks between 3 and 20 
        count: Math.max(3, Math.min(20, Number(body.count) || 10))
    };
}

// Ask OpenAI to generate a playlist based on the validateData preferences
async function getPlaylist(prefs) {
    // Prompt that tells the AI exactly how to behave
    const prompt = `You are a music recommendation engine. You only produce music recommendations.

Output strictly as a single JSON object with the keys:
- "title"
- "explanation"
- "tracks": array of { "title", "artist", "why" }
- "metadata": { "ageGroup", "mood", "activity", "energy", "language", "genres": [] }

Rules:
- If ageGroup is "under-12" or "13-17", avoid explicit content; prefer clean/radio edits.
- Match energy to tempo/intensity.
- Align tracks to activity.
- Prefer requested genres/language; mix compatible styles if "any".
- Keep number of tracks <= requested "count".
- Return valid JSON only.`;

// User prompt: inserts the actual answers from the form
const user = `Please generate a playlist using these preferences:
ageGroup: ${prefs.ageGroup}
mood: ${prefs.mood}
activity: ${prefs.activity}
energy: ${prefs.energy}
genres: ${prefs.genres?.length ? prefs.genres.join(", ") : "[]"}
language: ${prefs.language}
count: ${prefs.count}

Return only the JSON object as specified in the system instructions.`;

// Call the OpenAI Chat Completions API
const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
        "Authorization": `Bearer ${apiKey}`, // pulls the key from the .env
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        model: "gpt-4o-mini",   
        temperature: 0.6,     
        messages: [
            { role: "system", content: prompt }, // AI behavior
            { role: "user", content: user }      // user input
        ]
    })
});

  // Convert response to JSON
  const data = await response.json();

  // If API returned an error, throw it
  if (!response.ok) {
    throw new Error(data?.error?.message || 'OpenAI request failed');
  }

  // Parse the text returned into JSON
  let json;
  try {
    json = JSON.parse(data.choices[0].message.content);
  } catch (e) {
    console.error("OpenAI returned non-JSON:", data.choices?.[0]?.message?.content);
    throw e;
  }
  return json;
}

// Controller that Express route will call: POST /api/ai/recommend
export async function recommend(req, res) {
  try {
    // 1) Clean form data
    const prefs = validateData(req.body);
    // 2) Get playlist from OpenAI
    const playlist = await getPlaylist(prefs);
    // 3) Send playlist back to frontend
    res.json(playlist);
  } catch (err) {
    console.error("recommend error:", err);
    res.status(500).json({ error: "recommendation_failed" });
  }
}