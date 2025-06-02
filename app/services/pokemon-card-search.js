import Service from '@ember/service';
import axios from 'axios';

const API_BASE = 'https://api.pokemontcg.io/v2';

export default class PokemonCardSearchService extends Service {
    async searchCardsByName(name = '', setId = '', orderBy = '') {
        const queryParts = [];
      
        if (name.trim()) queryParts.push(`name:${name.trim()}`);
        if (setId.trim()) queryParts.push(`set.id:${setId.trim()}`);
      
        const params = {};
        if (queryParts.length > 0) {
          params.q = queryParts.join(' ');
        } else {
          return [];
        }
      
        if (orderBy) {
          params.orderBy = orderBy;
        }
      
        const res = await axios.get(`https://api.pokemontcg.io/v2/cards`, { params });
        return res.data.data;
      }
      

  async fetchAllSets() {
    const res = await axios.get(`${API_BASE}/sets`);
    return res.data.data;
  }
}
