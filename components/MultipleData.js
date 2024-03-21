class MultipleData extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        // this.IsModalOpen = false;
        // this.handlemodal = this.handlemodal.bind(this); // Ensure proper context
    }

    connectedCallback() {
        this.data = JSON.parse(this.getAttribute('data'));
        console.log(this.data)
        // for passing the call back function
        // this.shadowRoot.addEventListener('modal-open', (event) => {
        //     this.handlemodal(event.detail.open); // Access additional data if passed

        //     // Doing this again, because after clicking the card it was setting the template columns to 1
        //     this.updateLayout();
        //     window.addEventListener('resize', this.updateLayout.bind(this));
        //   });
        //   this.updateLayout();
        //   window.addEventListener('resize', this.updateLayout.bind(this));
          this.render();
    }
    // updateLayout() {
    //     const cardContainer = this.shadowRoot.querySelector('.cardContainer');
    //     const containerWidth = cardContainer.offsetWidth;
    //     let columns = Math.floor(containerWidth / 330); // Assuming each card has a fixed width of 330px
    //     columns = Math.max(columns, 1); // Ensure there is at least one column
    //     cardContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    // }

    handlemodal(value) {
        this.IsModalOpen = value
        this.render()
    }

    render() {
        this.shadowRoot.innerHTML = `
          <style>
              .container {
                height:100%;
                position:relative;
                  padding: 50px;
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
                grid-template-columns: repeat(3, 1fr);
                justify-items: center;
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

          <div class="container" style="background-color: ${this.data.layoutBgColor};">
              <div class="heading">Your Events</div>
              <div class="cardContainer">
                  ${this.data.eventData.map((item, key) => `
                      <card-component
                          image="${item.imageUrl}"
                          date="${item.startDate}"
                          eventName="${item.name}"
                          location="${item.location}"
                          key="${key}"
                          cardcolor = "${this.data.cardBgColor}"
                          cardradius = "${this.data.cardRadius}"
                          @modal-open="${this.handlemodal}"
                      ></card-component>
                  `).join('')}
              </div>    
          </div>  
      `;
    }
}

customElements.define('multiple-data', MultipleData);
