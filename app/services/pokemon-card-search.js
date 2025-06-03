import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class PokemonCardSearchService extends Service {
  @tracked setsCache = null;

  async fetchAllSets() {
    if (this.setsCache) {
      console.log('✅ Using cached sets');
      return this.setsCache;
    }

    try {
      console.log('📁 Fetching sets from local JSON');
      const response = await fetch('data/sets.json');
      const data = await response.json();
      this.setsCache = data.data.sort((a, b) => a.name.localeCompare(b.name));
      return this.setsCache;
    } catch (e) {
      console.error('Failed to load sets:', e);
      return [];
    }
  }


  async searchCardsByName(name, setId = '', sortBy = '') {
    let query = `name:"${name}"`;
    if (setId) {
      query += ` AND set.id:"${setId}"`;
    }

    let url = `https://api.pokemontcg.io/v2/cards?q=${encodeURIComponent(query)}`;
    if (sortBy) {
      url += `&orderBy=${encodeURIComponent(sortBy)}`;
    }

    try {
      const result = await fetch(url);
      const json = await result.json();
      return json.data;
    } catch (e) {
      console.error('Search failed:', e);
      return [];
    }
  }

}
