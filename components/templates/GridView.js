class GridView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.imageurl = "https://designshack.net/wp-content/uploads/placeholder-image.png"
    }
    connectedCallback() {
        this.data = JSON.parse(this.getAttribute('data'));
        // console.log("page data in multiple data ",this.data)
        this.render();
        // this.updateLayout(); 
        // this.observer = new ResizeObserver(() => {
        //     this.updateLayout();
        // });
        // this.observer.observe(this.shadowRoot.querySelector('.container')); // Observe changes to the container's size
    }

    updateLayout() {
        const container = this.shadowRoot.querySelector('.cardContainer');

        const containerWidth = container.offsetWidth;

        if( containerWidth > 640 && containerWidth <=940){
            container.style.gridTemplateColumns = `repeat(2,1fr)`
        }
        else if(containerWidth <= 640 ){
            container.style.gridTemplateColumns = `repeat(1,1fr)`
        }else{
            container.style.gridTemplateColumns = `repeat(3,1fr)`
        }
    }
    render() {
        this.shadowRoot.innerHTML = `
          <style>
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

              <div class="cardContainer">
                      <card-view2
                          image="${this.imageurl}"
                          date="1/1/1"
                          eventname="Cinema"
                          location="Mandi House"
                          description="Acting and Learning"
                          type="Workshop"
                      ></card-view2>
                        <card-view2
                          image="${this.imageurl}"
                          date="1/1/1"
                          eventname="Cinema"
                          location="Mandi House"
                          description="Acting and Learning"
                          type="Workshop"
                      ></card-view2>
                        <card-view2
                          image="${this.imageurl}"
                          date="1/1/1"
                          eventname="Cinema"
                          location="Mandi House"
                          description="Acting and Learning"
                          type="Workshop"
                      ></card-view2>
                        <card-view2
                          image="${this.imageurl}"
                          date="1/1/1"
                          eventname="Cinema"
                          location="Mandi House"
                          description="Acting and Learning"
                          type="Workshop"
                      ></card-view2>
          </div>  
        
      `;
    }
}

customElements.define('grid-view', GridView);

{/* <card-view
image="${this.imageurl}"
date="${item._source.start_date}"
eventname="${item._source.name}"
location="${item._source.country_name}"
description="${item._source.description}"
key="${key}"
type="${item._source.event_type}"
></card-view> */}