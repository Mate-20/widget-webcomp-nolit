class PromotedEvent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.data = JSON.parse(this.getAttribute('data'));
        this.render()
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
                display:flex;
                flex-direction:column;
                align-items:center;
              }
              .eventContainer {
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
          <div class="body" style="background-color: ${this.data.layoutBgColor}">
                <div class="heading">Highlighted Events</div>  
                <div class="container">
                    ${this.data.promotedData.map(event => `
                        <div class="eventContainer">
                            <div class="eventDetails">
                                <div class="date">${event.startDate}</div>
                                <div class="name">${event.name}</div>
                                <div class="location">${event.location}</div>
                                <div class="desc">${event.description}</div>
                            </div>
                            <div class="eventImg">
                                <img src="${event.imageUrl}" width="350" height="300" alt="Pictureauthor" style="border-radius: 10px;">
                            </div>
                        </div>
              `).join('')}
                </div>
          </div>
      `;
    }
}
customElements.define('promoted-event', PromotedEvent);