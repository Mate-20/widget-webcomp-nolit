class ListCard3 extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        // Initialize properties if needed
        this.event = JSON.parse(this.getAttribute('event'))
        this.customizedData = JSON.parse(this.getAttribute('customizedData'))
        this.widgetid = JSON.parse(this.getAttribute('widgetid'));
        console.log("card data : ", this.event)
        console.log("customized data : ", this.customizedData)
        this.render();
    }

    connectedCallback() {
        console.log("Card3")
    }

    formatDate(date) {
        const dateObj = new Date(date);
        const day = dateObj.getDate();
        const month = dateObj.toLocaleString('en-US', { month: 'long' });
        const year = dateObj.getFullYear();

        // Function to get the appropriate suffix for the day
        const getDayWithSuffix = (day) => {
            const suffixes = ['th', 'st', 'nd', 'rd'];
            const value = day % 100;
            return day + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]);
        };

        return `${getDayWithSuffix(day)} ${month} ${year}`;
    };

    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            .card {
                width: 588px;
                height: 228px;
                display: flex;
                gap: 22px;
                align-items: center;
                padding: 12px;
                border-radius:  ${this.customizedData.cardBorderRadius}px;
                background-color:${this.customizedData.cardBgColor};
                text-decoration : none;
            }

            .bannerContainer {
                height: 100%;
                width: 271px;
                position: relative;
            }
            .type {
                position: absolute;
                padding: 4px 8px;
                border-radius: 6px;
                font-size: 12px;
                color: #6750A4;
                background-color: #F7EFFF;
                bottom: 5px;
                right: 9px;
            }
            .typeTwo {
                position: absolute;
                padding: 4px 8px;
                border-radius: 6px;
                font-size: 12px;
                color: #6750A4;
                background-color: #F7EFFF;
                bottom: 5px;
                left: 9px;
            }
            .banner {
                height: 100%;
                width: 271px;
                border-radius: 8px;
            }
            .eventDetails {
                min-height: 100%;
                max-height: 100%;
                max-width: 50%;
                word-wrap: break-word;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            .eventName {
                font-size: ${this.customizedData.fontSettings?.heading?.fontSize}px;
                font-weight: ${this.customizedData.fontSettings?.heading?.fontWeight};
                line-height : ${this.customizedData.fontSettings?.heading?.fontSize}px;
                height: 52px;
                font-family : ${this.customizedData.fontSettings?.heading?.fontFamily};
                color:  ${this.customizedData.fontSettings?.heading?.fontColor};
                position: relative;
            }
            .eventName::before{
                content: attr(data-name);
                position: absolute;
                top: 60%;
                left: 30%;
                transform: translateX(-50%);
                background-color: rgba(0, 0, 0, 0.8);
                color: #fff;
                max-width : 200px;
                padding: 3px 5px;
                border-radius: 5px;
                font-size: 12px;
                opacity: 0;
                font-weight : 400;
                pointer-events: none;
                transition: opacity 0.2s ease;
            }
            .eventName:hover::before {
                opacity: 1;
            }
            .location_dateContainer{
                height: 50px;
            }
            .locationContainer {
                display: flex;
                align-items: center;
                gap: 8px;
                line-height : ${this.customizedData.fontSettings?.subheading?.fontSize}px;
                font-family : ${this.customizedData.fontSettings?.subheading?.fontFamily};
                color: ${this.customizedData.fontSettings?.subheading?.fontColor};
                font-size: ${this.customizedData.fontSettings?.subheading?.fontSize}px;
                font-weight: ${this.customizedData.fontSettings?.subheading?.fontWeight};
            }
            .dateContainer {
                margin-top: 6px;
                display: flex;
                align-items: center;
                gap: 8px;
                line-height : ${this.customizedData.fontSettings?.subheading?.fontSize}px;
                font-family : ${this.customizedData.fontSettings?.subheading?.fontFamily};
                color: ${this.customizedData.fontSettings?.subheading?.fontColor};
                font-size: ${this.customizedData.fontSettings?.subheading?.fontSize}px;
                font-weight: ${this.customizedData.fontSettings?.subheading?.fontWeight};
            }
            .description {
                line-height : ${this.customizedData.fontSettings?.body?.fontSize}px;
                font-family : ${this.customizedData.fontSettings?.body?.fontFamily};
                color: ${this.customizedData.fontSettings?.body?.fontColor};
                font-size: ${this.customizedData.fontSettings?.body?.fontSize}px;
                height: 92px;
                overflow: hidden;
                font-weight: ${this.customizedData.fontSettings?.body?.fontWeight};
                line-height: 19px;
            }
        </style>

      <a href=${`https://console.whr.ai/detailpage?widgetId=${this.customizedData.widgetId}&eventId=${this.event.id}`} target="_blank" class="card">
            <div class="bannerContainer">
                <img src=${this.event.logoUrl} alt="placeholder" class="banner" />
                <div class="type">${this.event.event_type}</div>
                <div class="typeTwo">${this.event.type === "MAIN" ? "Main Event" : "Side Event"}</div>
            </div>
            <div class="eventDetails">
                <div class="eventName" data-name="${this.event.name}">
                ${this.event.name.length > 25 ? `${this.event.name.substring(0, 25)}...`:this.event.name}
                </div>
                <div class="location_dateContainer">
                    <div class="locationContainer">
                        ${this.locationIcon(this.customizedData.fontSettings?.subheading?.fontColor)}
                        <div class="location">${this.event.location_city}</div>
                    </div>
                    <div class="dateContainer">
                        ${this.dateIcon(this.customizedData.fontSettings?.subheading?.fontColor)}
                        <div class="date">${this.formatDate(this.event.start_date)}-${this.formatDate(this.event.end_date)}</div>
                    </div>
                </div>
                <div class="description">${this.event.description}</div>
            </div>
        </a>
    `;
    }
    locationIcon(color) {
        return `
<svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill=${color}><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/></svg>
`
    }
    dateIcon(color) {
        return `
  <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 -960 960 960" width="15"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" fill=${color} /></svg>
`
    }
}

customElements.define('listview-card3', ListCard3);