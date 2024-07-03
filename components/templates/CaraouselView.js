class CarouselView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentIndex = 0;
        this.bannersPerPage = 1;
        this.carouselRef = document.createElement('div');
        this.carouselRef.className = 'carousel';
        this.handleResize = this.handleResize.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.selectedCard = this.getAttribute('selectedCard') || 'card1';
    }

    static get observedAttributes() {
        return ['selectedCard', 'image', 'date', 'eventname', 'location', 'description', 'type'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    connectedCallback() {
        this.render();
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    }

    disconnectedCallback() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize() {
        const containerWidth = this.carouselRef.offsetWidth;
        const cardWidth = 300; // Adjust based on your card's width
        const newBannersPerPage = Math.floor(containerWidth / cardWidth);
        this.bannersPerPage = newBannersPerPage > 0 ? newBannersPerPage : 1;
        this.render();
    }

    handleNext() {
        if (this.currentIndex < this.maxIndex()) {
            this.currentIndex += 1;
            this.updateSlider();
        }
    }

    handlePrev() {
        if (this.currentIndex > 0) {
            this.currentIndex -= 1;
            this.updateSlider();
        }
    }

    maxIndex() {
        return Math.max(0, this.banners.length - this.bannersPerPage);
    }

    createBanner(key) {
        let element;
        switch (this.selectedCard) {
            case 'card1':
                element = document.createElement('card-view1');
                break;
            case 'card2':
                element = document.createElement('card-view2');
                break;
            default:
                element = document.createElement('card-view3');
        }

        // Set attributes for the card
        element.setAttribute('image', this.getAttribute('image') || 'https://designshack.net/wp-content/uploads/placeholder-image.png');
        element.setAttribute('date', this.getAttribute('date') || '');
        element.setAttribute('eventname', this.getAttribute('eventname') || '');
        element.setAttribute('location', this.getAttribute('location') || '');
        element.setAttribute('description', this.getAttribute('description') || '');
        element.setAttribute('type', this.getAttribute('type') || '');

        return element;
    }

    updateSlider() {
        const innerSlider = this.shadowRoot.querySelector('.innerSlider');
        innerSlider.style.transform = `translateX(-${this.currentIndex * (100 / this.bannersPerPage)}%)`;
    }

    render() {
        this.banners = [
            this.createBanner('1'),
            this.createBanner('2'),
            this.createBanner('3'),
            this.createBanner('4'),
            this.createBanner('5'),
            this.createBanner('6'),
            this.createBanner('7'),
        ];

        this.shadowRoot.innerHTML = `
            <style>
                .carousel {
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                }
                .innerSlider {
                    display: flex;
                    transition: transform 0.5s ease-in-out;
                }
                .banner {
                    flex: 0 0 200px; /* Adjust based on your card's width */
                    box-sizing: border-box;
                    padding: 12px;
                }
                .navButton {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 1;
                    height: 55px;
                    width: 55px;
                    background-color: white;
                    border-radius: 50px;
                    filter: drop-shadow(1px 1px 3px rgb(83, 83, 83));
                    font-size: 20px;
                    color: black;
                    cursor: pointer;
                    border: none;
                }
                .navButton:disabled {
                    background-color: #ccc;
                    cursor: not-allowed;
                }
                .navButton.prevButton {
                    left: 0;
                }
                .navButton.nextButton {
                    right: 0;
                }
            </style>

            <div class="carousel" ref="carouselRef">
                <button class="navButton prevButton" ${this.currentIndex === 0 ? 'disabled' : ''}>&lt;</button>
                <div class="innerSlider">
                    ${this.banners.map(banner => `<div class="banner">${banner.outerHTML}</div>`).join('')}
                </div>
                <button
                    class="navButton nextButton"
                    ${this.currentIndex === this.maxIndex() ? 'disabled' : ''}
                >
                    &gt;
                </button>
            </div>
        `;

        this.shadowRoot.querySelector('.prevButton').addEventListener('click', this.handlePrev);
        this.shadowRoot.querySelector('.nextButton').addEventListener('click', this.handleNext);

        this.updateSlider();
    }
}

customElements.define('carousel-view', CarouselView);
