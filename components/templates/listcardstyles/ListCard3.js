class ListCard3 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>
            .card {
                width: 588px;
                height: 228px;
                display: flex;
                gap: 22px;
                align-items: center;
                padding: 12px;
                background-color: white;
                border-radius: 8px;
                text-decoration : none;
            }

            .bannerContainer {
                height: 100%;
                width: 271px;
                position: relative;
            }
            .type {
                position: absolute;
                padding: 4px 8px;
                border-radius: 6px;
                font-size: 12px;
                color: #6750A4;
                background-color: #F7EFFF;
                bottom: 5px;
                right: 9px;
            }
            .banner {
                height: 100%;
                width: 271px;
                border-radius: 8px;
            }
            .eventDetails {
                height: 100%;
                display: flex;
                flex-direction: column;
            }
            .eventName {
                color: #6750A4;
                font-size: 18px;
                font-weight: 700;
            }
            .location_dateContainer {
                margin-top: 12px;
            }
            .locationContainer {
                display: flex;
                align-items: center;
                gap: 8px;
                color: #6E6F89;
                font-size: 12px;
                font-weight: 500;
            }
            .dateContainer {
                margin-top: 6px;
                display: flex;
                align-items: center;
                gap: 8px;
                color: #6E6F89;
                font-size: 10px;
                font-weight: 400;
            }
            .description {
                margin-top: 30px;
                font-size: 12px;
                color: #6E6F89;
                font-weight: 500;
                line-height: 19px;
            }
        </style>

        <a href="https://console.eventgeni.com/detailpage" target="_blank" class="card">
            <div class="bannerContainer">
                 <img src="https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/2018/03/16130738/pic41-1024x681.jpg" alt="banner" class="banner" />
                <div class="type">Workshop</div>
            </div>
            <div class="eventDetails">
                <div class="eventName">East Midlands Young Planners</div>
                <div class="location_dateContainer">
                    <div class="locationContainer">
                        <img src="path/to/locationIcon.png" alt="location" />
                        <div class="location">Corpus Christi, USA</div>
                    </div>
                    <div class="dateContainer">
                        ${this.dateIcon()}
                        <div class="date">1st Apr 2024 - 20th Apr 2024</div>
                    </div>
                </div>
                <div class="description">Amidst this gathering, immerse yourself in an atmosphere of collaboration and creative energy, as manufacturers, retailers, and distributors unite.....</div>
            </div>
        </a>
    `;
}
dateIcon() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 -960 960 960" width="15">
            <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" fill="black" />
        </svg>
    `;
}
}

customElements.define('listview-card3', ListCard3);