class CarouselView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentIndex = 0;
        this.bannersPerPage = 1;
        this.carouselRef = null;  // Will be assigned after rendering
        this.handleResize = this.handleResize.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.selectedCard = this.getAttribute('selectedCard') || 'card2';
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
        setTimeout(() => {
            this.handleResize();
            window.addEventListener('resize', this.handleResize);
        }, 0);
    }

    disconnectedCallback() {
        window.removeEventListener('resize', this.handleResize);
        this.shadowRoot.querySelector('.prevButton').removeEventListener('click', this.handlePrev);
        this.shadowRoot.querySelector('.nextButton').removeEventListener('click', this.handleNext);
    }

    handleResize() {
        const containerWidth = this.carouselRef.offsetWidth;
        console.log(containerWidth)
        const cardWidth = 300; // Adjust based on your card's width
        const newBannersPerPage = Math.floor(containerWidth / cardWidth);
        this.bannersPerPage = newBannersPerPage > 0 ? newBannersPerPage : 1;
        this.updateSlider();
        this.updateButtons();
    }

    handleNext() {
        if (this.currentIndex < this.maxIndex()) {
            this.currentIndex += 1;
            this.updateSlider();
            this.updateButtons();
        }
    }

    handlePrev() {
        if (this.currentIndex > 0) {
            this.currentIndex -= 1;
            this.updateSlider();
            this.updateButtons();
        }
    }

    maxIndex() {
        const maxIndex = Math.max(0, Math.ceil(this.banners.length / this.bannersPerPage) - 1);
        console.log(`Max Index: ${maxIndex}, Banners Length: ${this.banners.length}, Banners Per Page: ${this.bannersPerPage}`);
        return maxIndex;
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

    updateButtons() {
        const prevButton = this.shadowRoot.querySelector('.prevButton');
        const nextButton = this.shadowRoot.querySelector('.nextButton');
        
        prevButton.disabled = this.currentIndex === 0;
        nextButton.disabled = this.currentIndex >= this.maxIndex();
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
                    flex: 0 0 300px; /* Adjust based on your card's width */
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

            <div class="carousel">
                <button class="navButton prevButton">&lt;</button>
                <div class="innerSlider">
                    ${this.banners.map(banner => `<div class="banner">${banner.outerHTML}</div>`).join('')}
                </div>
                <button class="navButton nextButton">&gt;</button>
            </div>
        `;

        this.carouselRef = this.shadowRoot.querySelector('.carousel');
        this.shadowRoot.querySelector('.prevButton').addEventListener('click', this.handlePrev);
        this.shadowRoot.querySelector('.nextButton').addEventListener('click', this.handleNext);

        this.updateButtons();
        this.updateSlider();
    }
}

customElements.define('carousel-view', CarouselView);
