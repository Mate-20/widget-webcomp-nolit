class MultipleData extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.data = JSON.parse(this.getAttribute('data'));
        this.render();
        this.updateLayout(); // Initial layout update
        this.observer = new ResizeObserver(() => {
            this.updateLayout();
        }); // Create a ResizeObserver
        this.observer.observe(this.shadowRoot.querySelector('.container')); // Observe changes to the container's size

    }
    updateLayout() {
        const container = this.shadowRoot.querySelector('.cardContainer');
        const containerWidth = container.offsetWidth;
        console.log(containerWidth)
        if(containerWidth<=900){
            container.style.gridTemplateColumns = `repeat(2,1fr)`
        }
    }
    render() {
        this.shadowRoot.innerHTML = `
          <style>
              .container {
                height:100%;
                padding: 50px;
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
            @media screen and (max-width: 800px) {
                .cardContainer {
                    grid-template-columns: repeat(1, 1fr); /* Two columns in each row when screen width is at most 1200px */
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
                          eventname="${item.name}"
                          location="${item.location}"
                          description="${item.description}"
                          key="${key}"
                          cardcolor = "${this.data.cardBgColor}"
                          cardradius = "${this.data.cardRadius}"
                          cardwidth ="${this.data.cardWidth}"
                          imageheight ="${this.data.imageHeight}"
                          cardheight = "${this.data.cardHeight}"
                      ></card-component>
                  `).join('')}
              </div>    
          </div>  
        
      `;
    }
}

customElements.define('multiple-data', MultipleData);
