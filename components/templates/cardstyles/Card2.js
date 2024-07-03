class Card2 extends HTMLElement {

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
                min-width: 300px;
                min-height: 330px;
                border-radius: 8px;
                background-color: white;
                padding: 22px 12px;
                display: flex;
                flex-direction: column;
                gap: 16px;
                text-decoration : none;
            }
            .eventName {
                font-size: 18px;
                font-weight: 700;
                color: black;
            }
            .banner {
                border-radius: 8px;
                width: 100%;
                height: 124px;
            }
            .location_dateContainer {
                margin-top: 8px;
                display: flex;
                flex-direction: column;
            }

            .locationContainer {
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .location {
                color: #6E6F89;
                font-size: 12px;
                font-weight: 500;
            }

            .dateContainer {
                margin-top: 8px;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .date {
                font-size: 10px;
                color: #6E6F89;
                font-weight: 400;
            }

            .dividerLine {
                width: 100%;
                border-top: 1px solid #E8EAF1;
            }

            .type_peopleContainer {
                display: flex;
                align-items: center;
                width: 100%;
                justify-content: space-between;
            }

            .typeContainer {
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .pill {
                border-radius: 6px;
                padding: 4px 8px;
                font-size: 12px;
                font-weight: 500;
            }

            .type1 {
                background-color: #FFF8E6;
                color: #CE9921;
            }

            .type2 {
                background-color: #F7E5EE;
                color: #8C1D47;
            }

            .circles {
                display: flex;
            }

            .circle:hover {
                transform: scale(1.05);
                z-index: 1;
            }

            .image {
                width: 22px;
                height: 22px;
            }

            .circle {
                position: relative;
                cursor: pointer;
                display: flex;
                color: black;
                flex-shrink: 0;
                align-items: center;
                justify-content: center;
                padding : 2px;
                border-radius: 50%;
                background-color: #fff;
                box-shadow: -2px -1px 7px rgba(0, 0, 0, 0.7), 2px 1px 7px rgba(0, 0, 0, 0.7);
                transition: transform 0.2s ease;
            }

            .circle::before {
                content: attr(data-name);
                position: absolute;
                bottom: 120%;
                left: 50%;
                white-space: nowrap;
                transform: translateX(-50%);
                background-color: rgba(0, 0, 0, 0.8);
                color: #fff;
                padding: 5px 10px;
                border-radius: 5px;
                font-size: 14px;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.2s ease;
            }

            .circle:hover::before {
                opacity: 1;
            }
        </style>

      <a href="https://console.eventgeni.com/detailpage" target="_blank" class="card">
            <div class="eventName">Hampton Jazz Festival 2024</div>
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
            <img src=${this.image} alt="placeholder" class="banner" />
            <div class="dividerLine"></div>
            <div class="type_peopleContainer">
                <div class="typeContainer">
                    <div class="pill type1">Tradeshow</div>
                    <div class="pill type2">Attending</div>
                </div>
                <div class="circles">
                    <div class="circle" data-name="John Doe">
                        JD
                    </div>
                     <div class="circle" data-name="Alvin Doe">
                        AD
                    </div>
                    <div class="circle" data-name="John Doe">
                        JD
                    </div>
                    <div class="circle" data-name="John Doe">
                        JD
                    </div>
                </div>
            </div>
        </a>
    `;
}
}

customElements.define('card-view2', Card2);
