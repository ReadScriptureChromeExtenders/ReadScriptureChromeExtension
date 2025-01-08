const fetchOptions = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  mode: 'cors',
  credentials: 'omit'
};

const MAX_RETRIES = 3;
const BASE_DELAY = 1000; // 1 second

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithRetry = async (url, options, retries = MAX_RETRIES, attempt = 1) => {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      // Handle rate limiting
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After') || 5;
        console.log(`Rate limited. Waiting ${retryAfter} seconds before retry...`);
        await sleep(retryAfter * 1000);
        return fetchWithRetry(url, options, retries, attempt);
      }
      
      // Handle server errors with exponential backoff
      if (retries > 0 && response.status >= 500) {
        const delay = BASE_DELAY * Math.pow(2, attempt - 1);
        console.log(`Retrying request to ${url}, ${retries} attempts remaining (waiting ${delay}ms)`);
        await sleep(delay);
        return fetchWithRetry(url, options, retries - 1, attempt + 1);
      }
      
      throw new Error(`Server returned ${response.status}: ${response.statusText}`);
    }
    
    return response;
  } catch (error) {
    if (retries > 0 && !error.message.includes('Server returned')) {
      const delay = BASE_DELAY * Math.pow(2, attempt - 1);
      console.log(`Retrying request to ${url}, ${retries} attempts remaining (waiting ${delay}ms)`);
      await sleep(delay);
      return fetchWithRetry(url, options, retries - 1, attempt + 1);
    }
    throw error;
  }
};

// Cache for API responses
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const getCachedOrFetch = async (key, fetchFn) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  
  const data = await fetchFn();
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
  return data;
};

export const scriptureApi = {
  calculateDayOfYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    return Math.floor(diff / 86400000);
  },

  async getPlan(day) {
    if (!day || day < 1 || day > 365) {
      throw new Error('Invalid day parameter. Please provide a number between 1 and 365.');
    }

    console.log(`Fetching plan for day: ${day}`);
    try {
      const cacheKey = `plan_${day}`;
      const data = await getCachedOrFetch(cacheKey, async () => {
        const response = await fetchWithRetry(
          `https://readscripture-api.herokuapp.com/api/v1/days/${day}`,
          fetchOptions
        );
        return response.json();
      });
      
      return data;
    } catch (error) {
      console.error('Error fetching plan:', error);
      throw new Error(`Failed to load reading plan for day ${day}. Please try again later.`);
    }
  },

  async getChapter(id) {
    if (!id) {
      throw new Error('Chapter ID is required.');
    }

    try {
      const cacheKey = `chapter_${id}`;
      return await getCachedOrFetch(cacheKey, async () => {
        const response = await fetchWithRetry(
          `https://readscripture-api.herokuapp.com/api/v1/chapters/${id}`,
          fetchOptions
        );
        return response.json();
      });
    } catch (error) {
      console.error('Error fetching chapter:', error);
      throw new Error(`Failed to load chapter ${id}. Please try again later.`);
    }
  },

  async getPassage(passage) {
    if (!passage) {
      throw new Error('Passage parameter is required.');
    }
    
    try {
      const cacheKey = `passage_${passage}`;
      return await getCachedOrFetch(cacheKey, async () => {
        console.log(`Fetching passage: ${passage}`);
        const response = await fetchWithRetry(
          `https://readscripture-api.herokuapp.com/api/v1/passage?search=${encodeURIComponent(passage)}`,
          fetchOptions
        );
        return response.json();
      });
    } catch (error) {
      console.error('Error fetching passage:', error);
      throw new Error(`Failed to load passage "${passage}". Please try again later.`);
    }
  }
}; 