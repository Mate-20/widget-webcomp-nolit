class SingleData extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.getData = [];
      this.cardData = [
          { image: "https://media.licdn.com/dms/image/C4D12AQGFCeWmvrviVA/article-cover_image-shrink_600_2000/0/1635965553910?e=2147483647&v=beta&t=WP5YW7PcD57xmcjDQ4Fse6NR3xaO8XZxWwuyDdyDvmU", eventName: "Marathon", date: "February 3 - 7, 2024", location: "Berlin, Germany" },
      ];
      this.isModalOpen = false;
      this.render();
  }

  connectedCallback() {
      this.render();
  }

  render() {
      this.shadowRoot.innerHTML = `
          <style>
              /* Add your CSS styles here */
              .container {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  padding: 50px;
                  background: linear-gradient(118deg, rgba(236,235,255,1) 0%, rgba(68,99,190,1) 100%);
              }
              .eventContainer {
                  display: flex;
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
                  display: flex;
              }
              .heading {
                  font-size: 35px;
                  color: white;
                  font-weight: 900; 
              }
              .eventImg {
                  filter: drop-shadow(1px 1px 6px rgb(65, 65, 65));
              }
              .schedule {
                  color: rgb(96, 63, 240);
                  font-size: 30px;
                  font-weight: bold;
                  margin-bottom: 10px;
              }
              .modal {
                  width: fit-content;
                  margin-top: 100px;
              }
          </style>
          <div class="body">
              <div class="container">
                  ${this.cardData.map(item => `
                      <div class="eventContainer">
                          <div class="eventDetails">
                              <div class="date">${item.date}</div>
                              <div class="name">${item.eventName}</div>
                              <div class="location">
                                  <div style="margin-top: 2px;"><io-location-outline></io-location-outline></div>
                                  <div>${item.location}</div>
                              </div>
                              <div class="desc">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam assumenda rem tempore pariatur enim molestias! Nisi doloribus sint laborum fugiat quia fugit mollitia, odit nemo optio voluptas sit ea explicabo!</div>
                          </div>
                          <div class="eventImg">
                              <img src="${item.image}" width="350" height="300" alt="Pictureauthor" style="border-radius: 10px;">
                          </div>
                      </div>
                  `).join('')}
                  <div class="modal">
                    <div class="schedule">Schedule</div>
                    <modal-component handlemodal="${this.handlemodal}" datanumber="${1}"></modal-component>
                </div>
              </div>
          </div>
      `;
  }
}

customElements.define('single-data', SingleData);
