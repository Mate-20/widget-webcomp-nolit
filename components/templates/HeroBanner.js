class HeroBanner extends HTMLElement {
  constructor() {
    super();
    this.imageurl = "https://designshack.net/wp-content/uploads/placeholder-image.png"
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    // this.data = JSON.parse(this.getAttribute('data'));
    this.render()
    // this.observer = new ResizeObserver(() => {
    //   this.updateLayout();
    // });
    // this.observer.observe(this.shadowRoot.querySelector('.body')); // Observe changes to the container's size
  }
  // updateLayout() {
  //   const eventContainers = this.shadowRoot.querySelectorAll('.eventContainer');
  //   eventContainers.forEach(eventContainer => {
  //     const containerWidth = eventContainer.offsetWidth;
  //     console.log(containerWidth);

  //     if (containerWidth <= 600) {
  //       eventContainer.style.flexDirection = 'column';
  //       eventContainer.style.alignItems = 'start';
  //       const image = eventContainer.querySelector('.eventImg');
  //       const details = eventContainer.querySelector('.eventDetails')
  //       details.style.width = '100%';
  //       if (image) {
  //         image.style.width = '100%';
  //       }
  //     } else {
  //       eventContainer.style.flexDirection = 'row';
  //       const image = eventContainer.querySelector('.eventImg');
  //       if (image) {
  //         image.style.width = '350px';
  //       }
  //     }
  //   });
  // }

  render() {
    // Get attributes for styling
    const cardRadius = this.getAttribute('card-radius') || '10';
    const cardBgColor = this.getAttribute('card-bg-color') || '#1a1a1a';
    const dateFontSize = this.getAttribute('date-font-size') || '16';
    const eventNameColor = this.getAttribute('event-name-color') || '#ffffff';
    const eventNameSize = this.getAttribute('event-name-size') || '24';
    const locationFontSize = this.getAttribute('location-font-size') || '14';
    const btnBgColor = this.getAttribute('btn-bg-color') || '#007bff';
    const btnFontColor = this.getAttribute('btn-font-color') || '#ffffff';
    const btnBorderWidth = this.getAttribute('btn-border-width') || '1';
    const btnBorderColor = this.getAttribute('btn-border-color') || '#007bff';
    const btnRadius = this.getAttribute('btn-radius') || '5';
    const btnFontSize = this.getAttribute('btn-font-size') || '14';

    this.shadowRoot.innerHTML = `
        <style>
            .heroBanner {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: ${cardBgColor};
                padding: 20px;
                border-radius: ${cardRadius}px;
            }
            .eventDetails {
                width: 70%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
            }
            .name {
                font-weight: 800;
                color: ${eventNameColor};
                font-size: ${eventNameSize}px;
            }
            .date {
                background-color: rgb(253, 219, 109);
                width: fit-content;
                padding: 5px 10px;
                border-radius: 20px;
                font-size: ${dateFontSize}px;
            }
            .location {
                display: flex;
                font-size: ${locationFontSize}px;
            }
            .desc {
                color: white;
            }
            .detail_btnContainer {
                display: flex;
                justify-content: space-between;
            }
            .btn {
                padding: 5px 10px;
                width: fit-content;
                height: fit-content;
                background-color: ${btnBgColor};
                color: ${btnFontColor};
                border-width: ${btnBorderWidth}px;
                border-color: ${btnBorderColor};
                border-radius: ${btnRadius}px;
                font-size: ${btnFontSize}px;
                border-style: solid;
                cursor: pointer;
            }
            .eventImg {
                filter: drop-shadow(1px 1px 6px rgb(65, 65, 65));
                width: 100px;
                height: 100px;
            }
        </style>
        <div class="heroBanner">
            <div class="eventDetails">
                <div class="date">Date</div>
                <div class="name">Name Of Event</div>
                <div class="detail_btnContainer">
                    <div class="location_descContainer">
                        <div class="location">Country</div>
                        <div class="desc">Your Description</div>
                    </div>
                    <div class="btn">Register</div>
                </div>
            </div>
            <img class="eventImg" src=${this.imageurl} alt="Event"/>
        </div>
    `;
  }
}
customElements.define('hero-banner', HeroBanner);