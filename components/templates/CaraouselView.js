class CaraouselView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentIndex = 0;
        this.banners = [
            `<hero-banner></hero-banner>`,
            `<hero-banner></hero-banner>`,
            `<hero-banner></hero-banner>`
        ];
    }
    connectedCallback() {
        this.render();
        this.updateView();
    }
    updateView() {
        const innerSlider = this.shadowRoot.querySelector('.innerSlider');
        innerSlider.style.transform = `translateX(-${this.currentIndex * 100}%)`;

        this.shadowRoot.querySelectorAll('.banner').forEach((banner, index) => {
            banner.classList.toggle('active', index === this.currentIndex);
            banner.classList.toggle('inactive', index !== this.currentIndex);
        });

        this.shadowRoot.querySelector('.prev').disabled = this.currentIndex === 0;
        this.shadowRoot.querySelector('.next').disabled = this.currentIndex === this.banners.length - 1;
    }
    handleNext() {
        if (this.currentIndex < this.banners.length - 1) {
            this.currentIndex += 1;
            this.updateView();
        }
    }

    handlePrev() {
        if (this.currentIndex > 0) {
            this.currentIndex -= 1;
            this.updateView();
        }
    }
    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .carousel {
                    position: relative;
                }
                .innerSlider {
                    display: flex;
                    width: 100%;
                    transition: transform 0.5s ease-in-out;
                }
                .banner {
                    width: 100%;
                    flex-shrink: 0;
                    opacity: 0.5;
                    transition: opacity 0.5s ease-in-out;
                }
                .banner.active {
                    opacity: 1;
                }
                .banner.inactive {
                    opacity: 0.5;
                }
                .navButton {
                    background-color: #007bff;
                    border: none;
                    color: white;
                    padding: 10px;
                    cursor: pointer;
                    font-size: 18px;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 1;
                    border-radius: 5px;
                }
                .navButton:disabled {
                    background-color: #ccc;
                    cursor: not-allowed;
                }
                .navButton:first-of-type {
                    left: 0;
                }
                .navButton:last-of-type {
                    right: 0;
                }
            </style>
            <div class="carousel">
                <button class="navButton prev">&lt;</button>
                <div class="innerSlider">
                    ${this.banners.map((banner, index) => `
                        <div class="banner ${index === this.currentIndex ? 'active' : 'inactive'}" data-index="${index}">
                            ${banner}
                        </div>
                    `).join('')}
                </div>
                <button class="navButton next">&gt;</button>
            </div>
        `;

        this.shadowRoot.querySelector('.prev').addEventListener('click', () => this.handlePrev());
        this.shadowRoot.querySelector('.next').addEventListener('click', () => this.handleNext());
    }
}
customElements.define('caraousel-view', CaraouselView);