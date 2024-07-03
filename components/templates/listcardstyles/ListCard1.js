class ListCard1 extends HTMLElement {
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
                width: 629px;
                height: 211px;
                display: flex;
                gap: 25px;
                align-items: center;
                padding: 0px 12px 12px 10px;
                background-color: white;
                border-radius: 10px;
                text-decoration : none;
            }
            .banner {
                width: 282px;
                height: 211px;
                border-bottom-left-radius: 50px;
                border-bottom-right-radius: 50px;
                filter: drop-shadow(1px 1px 4px rgb(109, 109, 109));
            }
            .detailsContainer {
                display: flex;
                flex-direction: column;
                gap: 14px;
            }
            .date_location_nameContainer {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
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
                font-size: 15px;
                font-weight: 600;
            }
            .month {
                color: black;
                font-size: 10px;
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
                width: 70%;
            }
            .locationContainer {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .location {
                font-size: 12px;
                color: #6E6F89;
                font-weight: 500;
            }
            .eventName {
                font-weight: 700;
                font-size: 18px;
                color: black;
            }
            .description {
                font-size: 10px;
                color: #6E6F89;
                font-weight: 500;
                line-height: 14px;
            }
            .dateRange_typeContainer {
                margin-top: 20px;
                display: flex;
                align-items: center;
                width: 100%;
                gap: 7px;
            }
            .pill {
                border-radius: 6px;
                padding: 4px 8px;
                font-size: 12px;
                font-weight: 500;
            }
            .dateRange {
                background-color: #F5F5F5;
                color: #6A77A6;
            }
            .type1 {
                background-color: #FFF8E6;
                color: #CE9921;
            }
            .type2 {
                background-color: #F7E5EE;
                color: #6750A4;
            }
        </style>

        <a href="https://console.eventgeni.com/detailpage" target="_blank" class="card">
            <img src="https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/2018/03/16130738/pic41-1024x681.jpg" alt="banner" class="banner" />
            <div class="detailsContainer">
                <div class="date_location_nameContainer">
                    <div class="dateContainer">
                        <span class="date">29</span>
                        <span class="month">Jan</span>
                    </div>
                    <div class="line"></div>
                    <div class="name_locationContainer">
                        <div class="locationContainer">
                            <img src="path/to/locationIcon.png" alt="location" />
                            <div class="location">Corpus Christi, USA</div>
                        </div>
                        <div class="eventName">Join Gifts World Expo 2024</div>
                    </div>
                </div>
                <div class="description">Amidst this gathering, immerse yourself in an atmosphere of collaboration and creative energy, as manufacturers, retailers, and distributors unite.....</div>
                <div class="dateRange_typeContainer">
                    <div class="pill dateRange">29 Jan - 5 Feb</div>
                    <div class="pill type1">Tradeshow</div>
                    <div class="pill type2">Attending</div>
                </div>
            </div>
        </a>
    `;
}
}

customElements.define('listview-card1', ListCard1);