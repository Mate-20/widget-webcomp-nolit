class ScrollViewVertical extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.selectedCard = this.getAttribute('selectedCard') || 'card2';
        this.image = this.getAttribute('image') || 'https://designshack.net/wp-content/uploads/placeholder-image.png';
        this.date = this.getAttribute('date') || '';
        this.eventname = this.getAttribute('eventname') || '';
        this.location = this.getAttribute('location') || '';
        this.description = this.getAttribute('description') || '';
        this.typeEvent = this.getAttribute('type') || '';
        this.cardCount = 5; // Initial number of cards
        this.totalCards = 20; // Total number of cards available, you can change this as needed
    }

    static get observedAttributes() {
        return ['type', 'selectedCard', 'image', 'date', 'eventname', 'location', 'description', 'typeEvent'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[name] = newValue;
            this.render();
        }
    }

    connectedCallback() {
        this.render();
        this.observeLastCard();
    }

    fetchMoreCards() {
        // Simulate fetching more data
        return new Promise((resolve) => {
            setTimeout(() => {
                const newCards = Array.from({ length: 5 }).map(() => {
                    return {
                        image: this.image,
                        date: this.date,
                        eventname: this.eventname,
                        location: this.location,
                        description: this.description,
                        typeEvent: this.typeEvent
                    };
                });
                resolve(newCards);
            }, 1000);
        });
    }

    async loadMoreCards() {
        if (this.cardCount >= this.totalCards) return; // Stop loading if all cards are loaded

        const newCardsData = await this.fetchMoreCards();
        this.cardCount += newCardsData.length;
        this.appendCards(newCardsData);
        this.observeLastCard(); // Reattach observer to the new last card
    }

    appendCards(cardsData) {
        const scrollContainer = this.shadowRoot.querySelector('.verticalScroll');
        const EventCard = this.getCardViewType();

        cardsData.forEach(data => {
            const card = document.createElement(EventCard);
            card.setAttribute('image', data.image);
            card.setAttribute('date', data.date);
            card.setAttribute('eventname', data.eventname);
            card.setAttribute('location', data.location);
            card.setAttribute('description', data.description);
            card.setAttribute('type', data.typeEvent);
            const cardContainer = document.createElement('div');
            cardContainer.appendChild(card);
            scrollContainer.appendChild(cardContainer);
        });
    }

    getCardViewType() {
        switch (this.selectedCard) {
            case 'card1':
                return 'card-view1';
            case 'card2':
                return 'card-view2';
            default:
                return 'card-view3';
        }
    }

    observeLastCard() {
        const scrollContainer = this.shadowRoot.querySelector('.verticalScroll');
        const lastCard = scrollContainer.lastElementChild;
        if (!lastCard) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadMoreCards();
                    observer.unobserve(lastCard); // Stop observing the current last card
                }
            });
        });
        observer.observe(lastCard);
    }

    render() {
        const initialCards = Array.from({ length: this.cardCount }).map(() => {
            return {
                image: this.image,
                date: this.date,
                eventname: this.eventname,
                location: this.location,
                description: this.description,
                typeEvent: this.typeEvent
            };
        });

        const EventCard = this.getCardViewType();
        const cardHTML = initialCards.map(data => {
            const card = document.createElement(EventCard);
            card.setAttribute('image', data.image);
            card.setAttribute('date', data.date);
            card.setAttribute('eventname', data.eventname);
            card.setAttribute('location', data.location);
            card.setAttribute('description', data.description);
            card.setAttribute('type', data.typeEvent);
            const cardContainer = document.createElement('div');
            cardContainer.appendChild(card);
            return cardContainer.outerHTML;
        }).join('');

        this.shadowRoot.innerHTML = `
            <style>
                .topBody {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: flex-start;
                }
                .verticalScroll {
                    padding: 10px;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    gap: 20px;
                    overflow-y: auto;
                    overflow-x: hidden;
                }
            </style>

            <div class='topBody'>
                <div class='verticalScroll'>
                    ${cardHTML}
                </div>
            </div>
        `;
    }
}

customElements.define('verticalscroll-view', ScrollViewVertical);
