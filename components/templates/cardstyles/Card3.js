class Card3 extends HTMLElement {

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
                display : block;
                min-width: 300px;
                min-height: 340px;
                border-radius: 8px;
                background-color: white;
                padding: 12px 14px 24px 12px;
                text-decoration : none;
            }

            .banner {
                height: 192px;
                width: 100%;
                border-radius: 8px;
            }

            .eventName {
                margin-top: 22px;
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
        </style>

        <a href="https://console.eventgeni.com/detailpage" target="_blank" class="card">
            <img src=${this.image} alt="placeholder" class="banner" />
            <div class="eventName">East Midlands Young Planners</div>
            <div class="location_dateContainer">
                <div class="locationContainer">
                    <img src="path/to/locationIcon.png" alt="location" />
                    <div class="location">Corpus Christi, USA</div>
                </div>
                <div class="dateContainer">
                    <img src="path/to/dateIcon.png" alt="date" />
                    <div class="date">1st Apr 2024 - 20th Apr 2024</div>
                </div>
            </div>
        </a>
    `;
    }
}

customElements.define('card-view3', Card3);
