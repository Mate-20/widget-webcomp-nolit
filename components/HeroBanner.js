class HeroBanner extends HTMLElement {
  constructor() {
    super();
    this.imageurl = "https://designshack.net/wp-content/uploads/placeholder-image.png"
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.data = JSON.parse(this.getAttribute('data'));
    this.render()
    this.observer = new ResizeObserver(() => {
      this.updateLayout();
    });
    this.observer.observe(this.shadowRoot.querySelector('.body')); // Observe changes to the container's size
  }
  updateLayout() {
    const eventContainers = this.shadowRoot.querySelectorAll('.eventContainer');
    eventContainers.forEach(eventContainer => {
      const containerWidth = eventContainer.offsetWidth;
      console.log(containerWidth);

      if (containerWidth <= 600) {
        eventContainer.style.flexDirection = 'column';
        eventContainer.style.alignItems = 'start';
        const image = eventContainer.querySelector('.eventImg');
        const details = eventContainer.querySelector('.eventDetails')
        details.style.width = '100%';
        if (image) {
          image.style.width = '100%';
        }
      } else {
        eventContainer.style.flexDirection = 'row';
        const image = eventContainer.querySelector('.eventImg');
        if (image) {
          image.style.width = '350px';
        }
      }
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
          <style>
            .body{
            padding: 50px;
              }
              .heading{
                font-size: 35px;
                color: white;
                font-weight: 900;
              }
              .container {
                margin-top:30px;
                display:flex;
                flex-direction:column;
                align-items:center;
              }
              .eventContainer {
                min-width : 300px;
                width : 50%;
                padding : 20px;
                border-radius : 10px;
                background-color: #9c9c9c;
                  display: flex;
                  align-items:center;
                  justify-content: space-between;
                  margin-bottom : 30px
              }
              .eventDetails {
                  width: 50%;
              }
              .name {
                  font-size: 50px;
                  color: rgb(96, 63, 240);
                  margin-top: 20px;
                  font-weight: 800;
              }
              .date {
                  background-color: rgb(253, 219, 109);
                  width: fit-content;
                  padding: 5px 10px;
                  border-radius: 20px;
                  color: rgb(39, 39, 39);
                  font-size: 20px;
              }
              .location {
                  font-size: 20px;
                  margin-top: 60px;
                  margin-bottom: 10px;
                  display: flex;
                  color:white;
              }
              .desc{
                color:white;
              }
              .eventImg {
                margin-top:10px;
                filter: drop-shadow(1px 1px 6px rgb(65, 65, 65));
                height : 300px;
              }
              .schedule {
                  color: rgb(96, 63, 240);
                  font-size: 30px;
                  font-weight: bold;
                  margin-bottom: 10px;
              }
              .modal {
                  width: 50vw;
                  margin-top: 100px;
              }
              @media screen and (max-width: 1241px) {
                .eventDetails {
                    width: 100%; /* Adjust the width of event details for smaller screens */
                  }
                  .eventContainer {
                    flex-direction: column; /* Change flex direction for smaller screens */
                  }
                  .modal {
                    width: fit-content;
                    margin-top: 100px;
                }
            }
          </style>
          <div class="body" style="background-color: ${this.data.layoutBgColor}">
                <div class="heading">Highlighted Events</div>  
                <div class="container">
                    ${this.data.top_3.map(event => `
                        <div class="eventContainer">
                            <div class="eventDetails">
                                <div class="date">${event._source.start_date}</div>
                                <div class="name">${event._source.name}</div>
                                <div class="location">${event._source.country_name}</div>
                                <div class="desc">${event._source.description}</div>
                            </div>
                            <img class="eventImg" src="${this.imageurl}" alt="Pictureauthor" style="border-radius: 10px;">
                        </div>
              `).join('')}
                </div>
          </div>
      `;
  }
}
customElements.define('hero-banner', HeroBanner);