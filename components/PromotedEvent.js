class PromotedEvent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.data = JSON.parse(this.getAttribute('data'));
        const layoutBgColor = this.data.layoutBgColor;
        this.render()
    }
    render() {
        this.shadowRoot.innerHTML = `
          <style>
              .container {
                display:flex;
                flex-direction:column;
                align-items:center;
                  padding: 50px;
              }
              .eventContainer {
                  display: flex;
                  align-items:center;
                  justify-content: center;
              }
              .eventDetails {
                  width: 30%;
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
                  margin-top: 20px;
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
              .heading {
                  font-size: 35px;
                  color: white;
                  font-weight: 900; 
              }
              .eventImg {
                margin-top:10px;
                  filter: drop-shadow(1px 1px 6px rgb(65, 65, 65));
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
              @media screen and (max-width: 960px) {
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
          <div class="body">
          <div class="container" style="background-color: ${this.data.layoutBgColor};">
                      <div class="eventContainer">
                          <div class="eventDetails">
                              <div class="date">${this.data.promotedData[0].startDate}</div>
                              <div class="name">${this.data.promotedData[0].name}</div>
                              <div class="location">
                                  <div style="margin-top: 2px;"><io-location-outline></io-location-outline></div>
                                  <div>${this.data.promotedData[0].location}</div>
                              </div>
                              <div class="desc">${this.data.promotedData[0].description}</div>
                          </div>
                          <div class="eventImg">
                              <img src="${this.data.promotedData[0].imageUrl}" width="350" height="300" alt="Pictureauthor" style="border-radius: 10px;">
                          </div>
                      </div>
              </div>
          </div>
      `;
    }
}
customElements.define('promoted-event', PromotedEvent);