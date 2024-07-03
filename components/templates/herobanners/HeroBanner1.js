class HeroBanner1 extends HTMLElement {
    static get observedAttributes() {
        return ['image', 'location', 'eventname', 'date', 'month', 'type', 'buttontext'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    attributeChangedCallback() {
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const image = this.getAttribute('image') || 'https://14068d66ba387efac9ce5e4b1741bcf2.r2.cloudflarestorage.com/sls/07-24/sync-295dafef-c41a-4f5f-85a4-fcefbf02da97-e1/3f9ed4d8.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=0f059df39ab45a0cdab74b629b7951a5%2F20240703%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240703T104236Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=f933cca453a5ba84757c2d5af98bd5b3ac2c74ba52cde8db8319c47f321401c8';
        const location = this.getAttribute('location') || 'Corpus Christi, USA';
        const eventName = this.getAttribute('eventname') || 'Join Gifts World Expo 2024';
        const date = this.getAttribute('date') || '29';
        const month = this.getAttribute('month') || 'Jan';
        const type = this.getAttribute('type') || 'Tradeshow';
        const buttonText = this.getAttribute('buttontext') || 'Register';

        this.shadowRoot.innerHTML = `
            <style>
                .card {
                    width: 90%;
                    height: 50%;
                    display: flex;
                    gap: 25px;
                    align-items: center;
                    padding: 0px 12px 12px 10px;
                    background-color: white;
                    border-radius: 10px;
                }
                .banner {
                    width: 40%;
                    height: 100%;
                    border-bottom-left-radius: 50px;
                    border-bottom-right-radius: 50px;
                    filter: drop-shadow(1px 1px 4px rgb(109, 109, 109));
                }
                .detailsContainer {
                    width: 60%;
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                }
                .date_type_btnContainer {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .dateTypeContainer {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .dateContainer {
                    background-color: #F6F6F6;
                    border-radius: 9px;
                    width: 50px;
                    height: 68px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                .date {
                    color: black;
                    font-size: 1vw;
                    font-weight: 600;
                }
                .month {
                    color: black;
                    font-size: .9vw;
                    font-weight: 400;
                }
                .line {
                    height: 60px;
                    border-left: 1px solid #F6F6F6;
                }
                .name_locationContainer {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    width: 100%;
                }
                .locationContainer {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .location {
                    font-size: .9vw;
                    color: #6E6F89;
                    font-weight: 500;
                }
                .eventName {
                    font-weight: 700;
                    font-size: 2.3vw;
                    color: black;
                }
                .typeContainer {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    gap: 7px;
                }
                .pill {
                    border-radius: 6px;
                    padding: 4px 8px;
                    font-size: .9vw;
                    font-weight: 500;
                }
                .type1 {
                    background-color: #FFF8E6;
                    color: #CE9921;
                }
                .registerBtn {
                    color: white;
                    background-color: #6750A4;
                    border-radius: 6px;
                    padding: 4px 8px;
                    font-size: 1.2vw;
                    font-weight: 500;
                }
            </style>
            <div class="card">
                <img src="${image}" alt="banner" class="banner" />
                <div class="detailsContainer">
                    <div class="name_locationContainer">
                        <div class="locationContainer">
                            <img src="path/to/location-icon.png" alt="location" />
                            <div class="location">${location}</div>
                        </div>
                        <div class="eventName">${eventName}</div>
                    </div>
                    <div class="date_type_btnContainer">
                        <div class="dateTypeContainer">
                            <div class="dateContainer">
                                <span class="date">${date}</span>
                                <span class="month">${month}</span>
                            </div>
                            <div class="typeContainer">
                                <div class="pill type1">${type}</div>
                            </div>
                        </div>
                        <button class="registerBtn">${buttonText}</button>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('hero-banner1', HeroBanner1);
