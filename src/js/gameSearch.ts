export interface GameSuggestion {
  id: string;
  title: string;
  bannerUrl: string;
}

export async function searchGames(
  query: string,
  signal?: AbortSignal,
): Promise<GameSuggestion[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) {
    return [];
  }

  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error('Supabase is not configured');
  }

  const response = await fetch(`${url}/functions/v1/search-games`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
      apikey: key,
    },
    body: JSON.stringify({ query: trimmed }),
    signal,
  });

  if (!response.ok) {
    throw new Error('Game search failed');
  }

  const payload = (await response.json()) as unknown;
  if (!Array.isArray(payload)) {
    throw new Error('Game search failed');
  }

  return payload.flatMap((item) => {
    if (!item || typeof item !== 'object') {
      return [];
    }

    const row = item as GameSuggestion;
    if (typeof row.id !== 'string' || typeof row.title !== 'string') {
      return [];
    }

    return [
      {
        id: row.id,
        title: row.title,
        bannerUrl: typeof row.bannerUrl === 'string' ? row.bannerUrl : '',
      },
    ];
  });
}
