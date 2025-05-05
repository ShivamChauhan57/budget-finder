import { GEMINI_API_KEY } from '@env';

export async function getBudgetRecommendations(
  category: string,
  budget: string,
  location: string,
  departure?: string,
  destination?: string,
  date?: string,
  people?: string,
  dietaryRestriction?: string
): Promise<string[]> {
  let prompt = '';
  const cat = category.toLowerCase();

  // 👇 Generate category-specific prompt
    // 👇 Generate category-specific prompt
    if (cat === 'travel bundle') {
      prompt = `List exactly 5 travel bundles from ${departure} to ${destination} on ${date} for ${people} people under $${budget}. 
  Each bundle must include:
  - A flight (airline name and price)
  - A hotel (name and price)
  - A total cost (flight + hotel)
  
  ⚠️ IMPORTANT: Do NOT include any explanations, disclaimers, or extra descriptions.
  
  ONLY return the results in this strict format:
  1. Flight: Airline XYZ - $250
     Hotel: Cozy Inn - $300
     Total: $550
  2. ...
  3. ...
  4. ...
  5. ...
  `;
    } else if (cat === 'hidden gems') {
      prompt = `List exactly 15 hidden gem travel spots in ${location} that are lesser-known, unique, and worth visiting. 
  ⚠️ Do NOT include any explanations, descriptions, or extra text.
  
  ONLY return the names in this strict numbered list format:
  1. Hidden Gem One
  2. Hidden Gem Two
  ...
  15. Hidden Gem Fifteen`;
    } else if (cat === 'travel') {
      prompt = `Suggest 10 budget-friendly travel activities or experiences in ${destination}, for a trip from ${departure} on ${date}, for ${people} person(s), under $${budget}.
  Only return the activity names as a numbered list:
  1. Activity One
  2. Activity Two
  ...`;
    } else if (cat === 'hotels') {
      prompt = `List 10 budget hotels in ${location} with prices under $${budget} per night.
  Only return hotel names as a numbered list:
  1. Hotel One
  2. Hotel Two
  ...`;
    } else if (cat === 'shopping') {
      prompt = `List 10 budget-friendly shopping locations or malls in ${location} where items can be found under $${budget}.
  Only return shop names as a numbered list:
  1. Shop One
  2. Shop Two
  ...`;
    } else {
      prompt = `List 10 budget-friendly ${cat} places in ${location}. I want to spend $${budget} with dietary restriction: ${dietaryRestriction}.
  Only return the place names as a numbered list:
  1. Place One
  2. Place Two
  ...`;
    }
  

  console.log('📤 Prompt sent to Gemini:\n', prompt);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const json = await response.json();
    const text = json?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    console.log('\n📥 Gemini raw response:\n', text);

    let lines: string[] = [];

    // 👇 Parse Travel Bundle format
    if (cat === 'travel bundle') {
      const rawLines = text.split('\n').map((line: string) => line.trim());

      // Try to find where the actual numbered list begins
      const startIndex = rawLines.findIndex((line: string) => /^\d+\.\s+Flight:/.test(line));
      const cleaned = rawLines.length > 0 && startIndex !== -1 ? rawLines.slice(startIndex) : [];

      let currentBundle = '';

      for (let line of cleaned) {
        if (/^\d+\.\s+Flight:/.test(line)) {
          if (currentBundle) lines.push(currentBundle.trim());
          currentBundle = line.replace(/^\d+\.\s*/, '') + '\n';
        } else if (line !== '') {
          currentBundle += line + '\n';
        }
      }
      if (currentBundle) lines.push(currentBundle.trim());

    } else {
      // 👇 Parse simple numbered lists
      lines = text
        .split('\n')
        .filter((line: string) => /^\d+\.\s+/.test(line))
        .map((line: string) => line.replace(/^\d+\.\s*/, '').trim());
    }

    if (lines.length === 0) {
      console.warn('⚠️ No lines matched expected format. Check Gemini output and prompt.');
    }

    console.log('\n✅ Parsed lines:\n', lines);
    return lines;

  } catch (error: any) {
    console.error('❌ Gemini fetch error:', error.message || error);
    return [];
  }
}
