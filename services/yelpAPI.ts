import { YELP_API_KEY } from '@env';

export type YelpPlace = {
  name: string;
  rating: number;
  review_count: number;
  address: string;
  image_url: string;
  url: string;
};

export async function getYelpDetailsByName(name: string, location: string): Promise<YelpPlace | null> {
  try {
    const res = await fetch(
      `https://api.yelp.com/v3/businesses/search?location=${encodeURIComponent(location)}&term=${encodeURIComponent(name)}&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${YELP_API_KEY}`,
        },
      }
    );

    const data = await res.json();
    const b = data?.businesses?.[0];

    if (!b) return null;

    return {
      name: b.name,
      rating: b.rating,
      review_count: b.review_count,
      address: b.location?.address1 ?? 'Unknown address',
      image_url: b.image_url,
      url: b.url,
    };
  } catch (err) {
    console.error(`Yelp fetch error for ${name}:`, err);
    return null;
  }
}
