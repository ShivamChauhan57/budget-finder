import axios from 'axios';
import {OPENAI_API_KEY} from '@env'; // Adjusted the path to match the correct location of the env file

export async function getOpenAIRecommendations(category: string, budget: string, location: string): Promise<string> {
  const prompt = `Suggest 3 budget-friendly ${category.toLowerCase()} options in ${location} under $${budget}. 
Each should include:
- Name
- Estimated Price
- Rating out of 5
- A short reason why it's budget-friendly.`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    return reply || 'No suggestions found.';
  } catch (error: any) {
    console.error('OpenAI error:', error.response?.data || error.message);
    return 'Sorry, we couldn’t fetch suggestions at the moment.';
  }
}
