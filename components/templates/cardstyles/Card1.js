class Card1 extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // Initialize properties if needed
    this.render();
  }

  connectedCallback() {
    // For getting the passed call back function
  //   const eventdata = {
  //     eventname: this.eventname,
  //     eventlocation: this.location,
  //     eventimage: this.image,
  //     eventdate: this.date,
  //     eventdescription: this.description,
  // };
  //   const openModalEvent = new CustomEvent('modal-open', {
  //     detail:eventdata ,
  //     bubbles: true, // Allow event to bubble up
  //     composed: true, // Allow event to cross shadow DOM boundaries
  //   });
  //   const cards = this.shadowRoot.querySelectorAll('.card');
  //   cards.forEach(card => {
  //     card.addEventListener('click', () => {
  //       this.dispatchEvent(openModalEvent);
  //     });
  //   });
  }

  static get observedAttributes() {
    return ['image', 'eventname', 'date', 'location', 'cardcolor', 'cardradius','description','cardwidth','imageheight','cardheight','type'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>
                .card {
                    min-width: 305px;
                    min-height: 337px;
                    border-radius: 25px;
                    background-color: white;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    overflow: hidden;
                    text-decoration : none;
                }
                .banner {
                    width: 291px;
                    height: 185px;
                    border-bottom-left-radius: 50px;
                    border-bottom-right-radius: 50px;
                    filter: drop-shadow(1px 1px 4px rgb(111, 111, 111));
                }
                .date_location_nameContainer {
                    padding: 20px 14px 0px 14px;
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
                    font-size: 17px;
                    color: black;
                }
                .dividerLine {
                    margin-top: 12px;
                    width: 100%;
                    border-top: 1px solid #E8EAF1;
                }
                .dateRange_typeContainer {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    justify-content: space-between;
                    padding : 10px;
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
        <img src=${this.image} alt="placeholder" class="banner"/>
                <div class="date_location_nameContainer">
                    <div class="dateContainer">
                        <span class="date">29</span>
                        <span class="month">Jan</span>
                    </div>
                    <div class="line"></div>
                    <div class="name_locationContainer">
                        <div class="locationContainer">
                            <img src="path/to/locationIcon.png" alt="location"/>
                            <div class="location">Corpus Christi, USA</div>
                        </div>
                        <div class="eventName">Join Gifts World Expo 2024</div>
                    </div>
                </div>
                <div class="dividerLine"></div>
                <div class="dateRange_typeContainer">
                    <div class="pill dateRange">29 Jan - 5 Feb</div>
                    <div class="pill type1">Tradeshow</div>
                    <div class="pill type2">Attending</div>
                </div>
      </a>
    `;
  }
}

customElements.define('card-view1', Card1);
