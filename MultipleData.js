class MultipleData extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.cardData = [
            { image: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_SS.width-1300.jpg", eventname: "Bhramak", date: "February 3 - 8, 2024", location: "Berlin, Germany" },
            { image: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_SS.width-1300.jpg", eventname: "Pune Highway", date: "February 3 - 7, 2024", location: "Tokyo, Japan" },
            { image: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_SS.width-1300.jpg", eventname: "TED x", date: "February 3 - 7, 2024", location: "Delhi, India" },
            { image: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_SS.width-1300.jpg", eventname: "Marathon", date: "February 3 - 7, 2024", location: "Delhi, India" },
            { image: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_SS.width-1300.jpg", eventname: "Marathon", date: "February 3 - 7, 2024", location: "Delhi, India" },
            { image: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_SS.width-1300.jpg", eventname: "Marathon", date: "February 3 - 7, 2024", location: "Berlin, Germany" },
            { image: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_SS.width-1300.jpg", eventname: "Marathon", date: "February 3 - 7, 2024", location: "Berlin, Germany" },
            { image: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_SS.width-1300.jpg", eventname: "Marathon", date: "February 3 - 7, 2024", location: "Berlin, Germany" },
            { image: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_SS.width-1300.jpg", eventname: "Marathon", date: "February 3 - 7, 2024", location: "Berlin, Germany" }
        ];
        this.IsModalOpen = false;
        this.handlemodal = this.handlemodal.bind(this); // Ensure proper context
        this.render();
    }

    connectedCallback() {
        // for passing the call back function
        this.shadowRoot.addEventListener('modal-open', (event) => {
            this.handlemodal(event.detail.open); // Access additional data if passed

            // Doing this again, because after clicking the card it was setting the template columns to 1
            this.updateLayout();
            window.addEventListener('resize', this.updateLayout.bind(this));
          });
          this.updateLayout();
          window.addEventListener('resize', this.updateLayout.bind(this));
    }
    updateLayout() {
        const cardContainer = this.shadowRoot.querySelector('.cardContainer');
        const containerWidth = cardContainer.offsetWidth;
        let columns = Math.floor(containerWidth / 330); // Assuming each card has a fixed width of 330px
        columns = Math.max(columns, 1); // Ensure there is at least one column
        cardContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    }

    handlemodal(value) {
        this.IsModalOpen = value
        this.render()
    }

    render() {
        this.shadowRoot.innerHTML = `
          <style>
              .container {
                height:100%;
                overflow:scroll;
                position:relative;
                  padding: 50px;
                  background: linear-gradient(118deg, rgba(36,36,36,1) 0%, rgba(0,0,0,1) 100%);
              }
              .blur {
                  height: 100vh;
                  overflow: hidden;
                  filter: blur(3px);
              }
              .heading {
                  font-size: 35px;
                  color: white;
                  font-weight: 900;
              }
              .cardContainer {
                height:100%;
                display: grid;  
                row-gap:30px;
                margin-top: 30px;
                justify-items:center;
              }
              .modal {
                  width : 90%;  
                  position: absolute;
                  left: 50%;
                  top: 100px;
                  transform: translate(-50%, 0%);
              }
            
              @media screen and (max-width: 1560px) {
                .cardContainer {
                    grid-template-columns: repeat(3, 1fr); /* Two columns in each row when screen width is at most 1200px */
                }
            }
            
              @media screen and (max-width: 1200px) {
                .cardContainer {
                    grid-template-columns: repeat(2, 1fr); /* Two columns in each row when screen width is at most 1200px */
                }
            }        
          </style>

          <div class="container">
              <div class="heading">Your Events</div>
              <div class="cardContainer">
                  ${this.cardData.map((item, key) => `
                      <card-component
                          image="${item.image}"
                          date="${item.date}"
                          eventName="${item.eventname}"
                          location="${item.location}"
                          key="${key}"
                          @modal-open="${this.handlemodal}"
                      ></card-component>
                  `).join('')}
              </div>    
              ${this.IsModalOpen ? `
              <div class="modal">
              <modal-component  @modal-open="${this.handlemodal}" datanumber="${2}"></modal-component>
              </div>
          ` : ``}
          </div>  
      `;
    }
}

customElements.define('multiple-data', MultipleData);
