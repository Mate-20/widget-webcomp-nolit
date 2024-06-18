class ListViewCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.render();
    }

    render() {
        // Get attributes
        const cardRadius = this.getAttribute('card-radius') || '10';
        const cardBgColor = this.getAttribute('card-bg-color') || '#ffffff';
        const eventNameColor = this.getAttribute('event-name-color') || '#000000';
        const eventNameSize = this.getAttribute('event-name-size') || '20';
        const locationFontSize = this.getAttribute('location-font-size') || '14';
        const dateFontSize = this.getAttribute('date-font-size') || '14';
        const btnBgColor = this.getAttribute('btn-bg-color') || '#000000';
        const btnFontColor = this.getAttribute('btn-font-color') || '#ffffff';
        const btnBorderWidth = this.getAttribute('btn-border-width') || '1';
        const btnBorderColor = this.getAttribute('btn-border-color') || '#000000';
        const btnRadius = this.getAttribute('btn-radius') || '5';
        const btnFontSize = this.getAttribute('btn-font-size') || '14';

        this.shadowRoot.innerHTML = `
          <style>
            .card {
                border-radius: ${cardRadius}px;
                background-color: ${cardBgColor};
                padding: 16px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                max-width: 300px;
                margin: auto;
                font-family: Arial, sans-serif;
            }
            .cardImg_container {
                text-align: center;
            }
            .cardImg {
                width: 100%;
                height: auto;
                border-top-left-radius: ${cardRadius}px;
                border-top-right-radius: ${cardRadius}px;
            }
            .cardDetails {
                padding: 16px;
            }
            .eventHeader {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .eventName {
                color: ${eventNameColor};
                font-size: ${eventNameSize}px;
            }
            .eventDesc {
                margin-top: 8px;
                color: #777;
                font-size: 14px;
            }
            .location_date_btnContainer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 16px;
            }
            .location_dateContainer {
                display: flex;
                flex-direction: column;
            }
            .eventLocation, .eventDate {
                display: flex;
                align-items: center;
                margin-top: 8px;
                color: #555;
            }
            .eventLocation img, .eventDate img {
                margin-right: 8px;
            }
            .registerBtn {
                background-color: ${btnBgColor};
                color: ${btnFontColor};
                border-width: ${btnBorderWidth}px;
                border-style: solid;
                border-color: ${btnBorderColor};
                border-radius: ${btnRadius}px;
                font-size: ${btnFontSize}px;
                padding: 8px 16px;
                cursor: pointer;
                text-align: center;
            }
          </style>
          <div class="card">
            <div class="cardImg_container">
              <img src="https://via.placeholder.com/238x192" alt="eventImage" class="cardImg"/>
            </div>
            <div class="cardDetails">
              <div class="eventHeader">
                <div class="eventName">Event Name</div>
              </div>
              <div class="eventDesc">Event Description</div>
              <div class="location_date_btnContainer">
                <div class="location_dateContainer">
                  <div class="eventLocation">
                    <img src="location-icon-url" alt="locationIcon" width="24" height="24"/>
                    <div style="font-size: ${locationFontSize}px">Location</div>
                  </div>
                  <div class="eventDate">
                    <img src="calendar-icon-url" alt="calendarIcon" width="14" height="14"/>
                    <div style="font-size: ${dateFontSize}px">Date</div>
                  </div>
                </div>
                <div class="registerBtn">Register</div>
              </div>
            </div>
          </div>
        `;
    }


}

customElements.define('listview-card', ListViewCard);