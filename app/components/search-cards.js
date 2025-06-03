import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default class SearchCardsComponent extends Component {
  @service('pokemon-card-search') cardSearch;
  @tracked sortBy = '';

  @tracked query = '';
  @tracked results = [];
  @tracked loading = false;
  @tracked selectedCard = null;
  @tracked selectedSet = '';
  @tracked availableSets = [];
  @tracked currentPage = 1;
  cardsPerPage = 10;
  constructor() {
    super(...arguments);
    this.loadSets();
  }

async loadSets() {
  this.availableSets = await this.cardSearch.fetchAllSets();
  console.log('✅ Loaded sets:', this.availableSets);
}

  get visibleResults() {
    return this.results.slice(0, this.currentPage * this.cardsPerPage);
  }

  @action loadMoreIfNeeded(element) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && this.hasMore) {
        this.currentPage++;
      }
    }, {
      rootMargin: '100px'
    });

    observer.observe(element);
  }

  get hasMore() {
    return this.visibleResults.length < this.results.length;
  }

  @action
  updateQuery(event) {
    this.query = event.target.value;
  }

  @action
  updateSelectedSet(event) {
    this.selectedSet = event.target.value;
  }

  @action
  async search() {
    
    if (!this.query && !this.selectedSet) return;
  
    this.loading = true;
  
    try {
        this.results = await this.cardSearch.searchCardsByName(
            this.query,
            this.selectedSet,
            this.sortBy
          );
              } finally {
      this.loading = false;
    }
  }
  
  @action
  updateSort(event) {
    this.sortBy = event.target.value;
    this.search();
  }
  
  @action
  searchCharizard() {
    this.query = 'charizard';
    this.search();
  }

  @action
  searchPikachu() {
    this.query = 'pikachu';
    this.search();
  }

  @action
  searchChikorita() {
    this.query = 'chikorita';
    this.search();
  }


  @action
  handleKeydown(event) {
    if (event.key === 'Enter') {
      this.search();
    }
  }

  @action
  openCardModal(card) {
    this.selectedCard = card;
  }

  @action
  closeModal() {
    this.selectedCard = null;
  }

  @action
  preventBackdropClose(event) {
    event.stopPropagation();
  }


cardStyle(card) {
  if (!card.types || card.types.length === 0) return htmlSafe('');
  const type = card.types[0].toLowerCase();
  const colors = {
    fire:     'linear-gradient(135deg, #ffe0e0, #ff8a65)',
    water:    'linear-gradient(135deg, #e0f7fa, #4fc3f7)',
    electric: 'linear-gradient(135deg, #fff9c4, #ffe082)',
    grass:    'linear-gradient(135deg, #e8f5e9, #81c784)',
    psychic:  'linear-gradient(135deg, #f3e5f5, #ba68c8)',
    fighting: 'linear-gradient(135deg, #efebe9, #a1887f)',
    dark:     'linear-gradient(135deg, #e0e0e0, #616161)',
    fairy:    'linear-gradient(135deg, #fce4ec, #f06292)',
    metal:    'linear-gradient(135deg, #eceff1, #90a4ae)',
    dragon:   'linear-gradient(135deg, #ede7f6, #9575cd)',
  };

  const style = `background: ${colors[type] || 'linear-gradient(135deg, #f5f5f5, #ddd)'}`;
  return htmlSafe(style);
}

}
