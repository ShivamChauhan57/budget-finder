import { GOOGLE_API_KEY } from '@env';

const TEXT_SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
const DETAILS_URL = 'https://maps.googleapis.com/maps/api/place/details/json';

export type PlaceDetails = {
  name: string;
  rating: number;
  userRatingsTotal: number;
  address: string;
  placeId: string;
  url: string;
};

export async function getPlaceDetails(placeName: string, location: string): Promise<PlaceDetails | null> {
  try {
    // 🧽 Clean up names (remove anything in parentheses)
    const formattedLocation = location.replace(/\s+/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').trim();
    const cleanedName = placeName.replace(/\s*\(.*?\)\s*/g, '').trim();
    const query = `${cleanedName} restaurant near ${formattedLocation}`;

    console.log('📡 Final Google Query:', query);

    const textSearchRes = await fetch(
      `${TEXT_SEARCH_URL}?query=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}`
    );
    const textSearchData = await textSearchRes.json();

    const place = textSearchData.results?.[0];
    if (!place || !place.place_id) {
      console.warn(`❌ No match found for: "${query}"`);
      return null;
    }

    const detailsRes = await fetch(
      `${DETAILS_URL}?place_id=${place.place_id}&fields=name,rating,user_ratings_total,formatted_address,url&key=${GOOGLE_API_KEY}`
    );
    const detailsData = await detailsRes.json();

    const result = detailsData.result;

    return {
      name: result.name,
      rating: result.rating,
      userRatingsTotal: result.user_ratings_total,
      address: result.formatted_address,
      placeId: place.place_id,
      url: result.url,
    };
  } catch (err) {
    console.error('Google API Error:', err);
    return null;
  }
}
