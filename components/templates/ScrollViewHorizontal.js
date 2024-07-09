class ScrollViewHorizontal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.type = this.getAttribute('type') || 'top';
        this.selectedCard = this.getAttribute('selectedCard') || 'card2';
        this.image = this.getAttribute('image') || 'https://designshack.net/wp-content/uploads/placeholder-image.png';
        this.date = this.getAttribute('date') || '';
        this.eventname = this.getAttribute('eventname') || '';
        this.location = this.getAttribute('location') || '';
        this.description = this.getAttribute('description') || '';
        this.typeEvent = this.getAttribute('type') || '';
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
    }

    render() {
        let EventCard;

        switch (this.selectedCard) {
            case 'card1':
                EventCard = 'card-view1';
                break;
            case 'card2':
                EventCard = 'card-view2';
                break;
            default:
                EventCard = 'card-view3';
        }

        // Create card elements
        const cards = Array.from({ length: 5 }).map(() => {
            const card = document.createElement(EventCard);
            card.setAttribute('image', this.image);
            card.setAttribute('date', this.date);
            card.setAttribute('eventname', this.eventname);
            card.setAttribute('location', this.location);
            card.setAttribute('description', this.description);
            card.setAttribute('type', this.typeEvent);
            return card;
        });

        this.shadowRoot.innerHTML = `
            <style>
                .topBody{
                    width: 100%;
                }
                .horizontalScroll{
                    padding: 10px;
                    display: flex;
                    overflow-x: auto;
                    gap: 20px;
                }
            </style>

            <div class='topBody'">
                <div class='horizontalScroll'>
                    ${cards.map(card => `<div>${card.outerHTML}</div>`).join('')}
                </div>
            </div>
        `;
    }
}

customElements.define('horizontalscroll-view', ScrollViewHorizontal);
