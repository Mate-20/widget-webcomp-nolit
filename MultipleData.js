class MultipleData extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.cardData = [
          { image: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_SS.width-1300.jpg", eventName: "Marathon", date: "February 3 - 7, 2024", location: "Berlin, Germany" },
          { image: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_SS.width-1300.jpg", eventName: "Marathon", date: "February 3 - 7, 2024", location: "Tokyo, Japan" },
          { image: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_SS.width-1300.jpg", eventName: "Marathon", date: "February 3 - 7, 2024", location: "Delhi, India" },
          { image: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_SS.width-1300.jpg", eventName: "Marathon", date: "February 3 - 7, 2024", location: "Delhi, India" },
          { image: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_SS.width-1300.jpg", eventName: "Marathon", date: "February 3 - 7, 2024", location: "Delhi, India" },
          { image: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_SS.width-1300.jpg", eventName: "Marathon", date: "February 3 - 7, 2024", location: "Berlin, Germany" },
          { image: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_SS.width-1300.jpg", eventName: "Marathon", date: "February 3 - 7, 2024", location: "Berlin, Germany" },
          { image: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_SS.width-1300.jpg", eventName: "Marathon", date: "February 3 - 7, 2024", location: "Berlin, Germany" },
          { image: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_SS.width-1300.jpg", eventName: "Marathon", date: "February 3 - 7, 2024", location: "Berlin, Germany" }
      ];
      // this.IsModalOpen = false;
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
                  margin-top: 30px;
                  display: grid;
                  grid-template-columns: repeat(3, 1fr); /* Three columns in each row */
                  justify-items: center;
                  row-gap: 30px;
              }
              .modal {
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  transform: translate(-50%, -50%);
              }
          </style>
          <div class="container">
              <div class="heading">Your Events</div>
              <div class="cardContainer">
                  ${this.cardData.map((item, key) => `
                      <card-component
                          .image="${item.image}"
                          .date="${item.date}"
                          .eventName="${item.eventName}"
                          .location="${item.location}"
                          key="${key}"
                      ></card-component>
                  `).join('')}
              </div>
          </div>
          ${this.IsModalOpen ? `
              <div class="modal">
                  <modal-component .handleModal="${this.handleModal}" .dataNumber="${3}"></modal-component>
              </div>
          ` : ''}
      `;
  }
}

customElements.define('multiple-data', MultipleData);
