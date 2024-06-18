class ListViewCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.render();
  }

  render() {
    const cardRadius = this.getAttribute('card-radius') || '10';
    const cardBgColor = this.getAttribute('card-bg-color') || '#6750a4';
    const eventNameColor = this.getAttribute('event-name-color') || '#000';
    const eventNameSize = this.getAttribute('event-name-size') || '16';
    const dateFontSize = this.getAttribute('date-font-size') || '12';
    const locationFontSize = this.getAttribute('location-font-size') || '12';
    const btnBgColor = this.getAttribute('btn-bg-color') || '#007bff';
    const btnFontColor = this.getAttribute('btn-font-color') || '#fff';
    const btnBorderWidth = this.getAttribute('btn-border-width') || '1';
    const btnBorderColor = this.getAttribute('btn-border-color') || '#007bff';
    const btnRadius = this.getAttribute('btn-radius') || '5';
    const btnFontSize = this.getAttribute('btn-font-size') || '14';

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          height: 240px;
          width : 100%;
          border: 1px solid #6650a465;
          display: flex;
          margin-bottom: 25px;
          margin-top: 40px;
          padding: 25px;
          border-radius: ${cardRadius}px;
          background-color: ${cardBgColor};
        }
              .cardImg_container {
                  display: flex;
                  justify-content: center;
                  align-items: center;
              }

              .cardImg {
                  border-radius: 12px;
              }

              .cardDetails {
                  width: 100%;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  padding-left: 20px;
              }

              .eventHeader {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
              }

              .location_date_btnContainer {
                  display: flex;
                  justify-content: space-between;
              }

              .location_dateContainer {
                  display: flex;
              }

              .eventLocation {
                  display: flex;
                  align-items: center;
                  font-size: ${locationFontSize}px;
              }

              .eventLocation img {
                  background-color: #6650a452;
                  border-radius: 50%;
                  padding: 6px;
                  margin-right: 7px;
              }

              .eventDate {
                  display: flex;
                  align-items: center;
                  background-color: #313131;
                  padding: 3px 6px;
                  border-radius: 5px;
                  margin-left: 20px;
              }

              .eventDate img {
                  margin-right: 7px;
              }

              .registerBtn {
                  padding: 5px 10px;
                  background-color: ${btnBgColor};
                  color: ${btnFontColor};
                  border-width: ${btnBorderWidth}px;
                  border-color: ${btnBorderColor};
                  border-radius: ${btnRadius}px;
                  font-size: ${btnFontSize}px;
                  border-style: solid;
              }
          </style>
          <div class="card">
              <div class="cardImg_container">
                  <img
                    src="https://via.placeholder.com/238x192"
                    alt="eventImage"
                    class="cardImg"
                    width="238"
                    height="192"
                  />
              </div>
              <div class="cardDetails">
                  <div class="eventHeader">
                      <div class="eventName" style="color: ${eventNameColor}; font-size: ${eventNameSize}px;">
                          Event Name
                      </div>
                  </div>
                  <div class="eventDesc">Event Description</div>
                  <div class="location_date_btnContainer">
                      <div class="location_dateContainer">
                          <div class="eventLocation">
                              <img src="locationIcon.png" alt="locationIcon" width="24" height="24" />
                              <div>Location</div>
                          </div>
                          <div class="eventDate">
                              <img src="calendarIcon.png" alt="calendarIcon" width="14" height="14" />
                              <div>Date</div>
                          </div>
                      </div>
                      <div class="registerBtn">
                          Register
                      </div>
                  </div>
              </div>
          </div>
      `;
  }
}

customElements.define('listview-card', ListViewCard);