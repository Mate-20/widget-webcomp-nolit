class Stickynavbarwidget extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.data = null;
        this.customizationData = null;
    }

    async fetchData() {
        try {
            const response = await fetch(`https://api.dev.eventgeni.com/public/widget/cm24nbuxd000dzqieds9lqbr3`);
            const responseData = await response.json();
            console.log("Fetched data: ", responseData);

            const eventData = responseData.data.eventData[0];
            const customizationData = responseData.data.widgetData.customizationData;

            if (eventData && eventData.active === "false") {
                this.data = null;
            } else {
                this.data = eventData;
                this.customizationData = customizationData;
                this.render();
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    connectedCallback() {
        this.stickyid = this.getAttribute('sticky-id');
        this.fetchData();
        this.getUserLocation();
        this.observeAttributes(); 
        this.render(); 
    }

    observeAttributes() {
        // Create a new MutationObserver instance
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'sticky-id') {
                    // When 'sticky-id' attribute changes, update the stickyid and fetch new data
                    this.stickyid = mutation.target.getAttribute('sticky-id');
                    this.fetchData();
                }
            });
        });
        // Observe changes to attributes
        this.observer.observe(this, { attributes: true });
    }
    getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log('User position:', position);
                    console.log('Latitude:', position.coords.latitude);
                    console.log('Longitude:', position.coords.longitude);
                    const userLat = position.coords.latitude;
                    const userLong = position.coords.longitude;
                    this.nearestEvent = this.findClosestEvent(userLat, userLong);
                    if (this.nearestEvent) {
                        this.render();
                    }
                },
                (error) => {
                    console.warn('Geolocation failed or was denied:', error);
                    this.getLocationByIP(); // Fallback to IP-based location
                }
            );
        } else {
            console.warn('Geolocation is not supported by this browser.');
            this.getLocationByIP(); // Fallback to IP-based location
        }
    }

    async getLocationByIP() {
        try {
            const response = await fetch('https://ipinfo.io/json?token=74ad0ca9b6d5ad');
            const data = await response.json();
            console.log('User IP location:', data);
            const [lat, long] = data.loc.split(',').map(Number);
            this.findClosestEvent(lat, long);
        } catch (error) {
            console.error('Error fetching location by IP:', error);
        }
    }
    findClosestEvent(userLat, userLong) {
        let closestEvent = null;
        let shortestDistance = Infinity;

        this.data.forEach(event => {
            const distance = this.haversineDistance(userLat, userLong, event.latitude, event.longitude);
            if (distance < shortestDistance) {
                shortestDistance = distance;
                closestEvent = event;
            }
        });
        if (closestEvent) {
            console.log('Closest event:', closestEvent.name, `at ${shortestDistance.toFixed(2)} km away`);
            return closestEvent;
        } else {
            console.log('No events found');
            return null
        }
    }

    haversineDistance(lat1, lon1, lat2, lon2) {
        const toRad = (x) => x * Math.PI / 180;
        const R = 6371; // Earth radius in km
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
    formatDate(date) {
        const dateObj = new Date(date);
        const day = dateObj.getDate();
        const month = dateObj.toLocaleString('en-US', { month: 'short' });
        const year = dateObj.getFullYear();

        const getDayWithSuffix = (day) => {
            const suffixes = ['th', 'st', 'nd', 'rd'];
            const value = day % 100;
            return day + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]);
        };

        return `${getDayWithSuffix(day)} ${month} ${year}`;
    };

    disconnectedCallback() {
        // Disconnect the observer when the element is removed from the DOM
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    render() {
        if (!this.data) {
            this.shadowRoot.innerHTML = `<p>No event data available</p>`;
            return;
        }

        const buttonSettings = this.customizationData.selectedBtn === "primary" ?
            this.customizationData.buttonSettings.primary :
            this.customizationData.buttonSettings.secondary;

        this.shadowRoot.innerHTML = `
        <style>
            .navbar {
                position: relative;
                box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
                top: 0;
                width: 100%;
                display: flex;
                align-items: stretch;
                background-color:${this.customizationData.cardBgColor};; 
                height: 150px;
                padding: 20px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                box-sizing: border-box; 
                overflow-x: hidden;
            }
            .banner {
                flex-shrink: 0;
                width: 100px;
                height: 100%; 
                border-radius: 10px;
            }  
                
            .details {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                margin-left: 15px;
                overflow: hidden;
                flex-grow: 1;
                gap:10px;
            }
            .eventName {
                line-height : ${this.customizationData.fontSettings?.heading?.fontSize}px;
                font-family : ${this.customizationData.fontSettings?.heading?.fontFamily};
                font-weight: ${this.customizationData.fontSettings?.heading?.fontWeight};
                color: ${this.customizationData.fontSettings?.heading?.fontColor};
                font-size : ${this.customizationData.fontSettings?.heading?.fontSize}px;
            }
            .registerButton {
                position: absolute; 
                bottom: 20px;  
                font-size:${this.customizationData.fontSettings?.subheading?.fontSize}px;
                right: 20px;   
                padding: 10px 20px; 
                background-color: ${buttonSettings.buttonColor};
                color: ${buttonSettings.fontColor};
                color: white; 
                text-align: center; 
                border-radius: ${buttonSettings.borderRadius}px; 
                white-space: nowrap; 
                width : fit-content;
                border: 1px solid ${buttonSettings.borderColor};
                text-decoration:none;
                line-height : ${this.customizationData.fontSettings?.subheading?.fontSize}px;
            }
            .locationContainer {
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .dateContainer {
                margin-top: 8px;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .location {
                line-height: ${this.customizationData.fontSettings?.subheading?.fontSize}px;
                font-size: ${this.customizationData.fontSettings?.subheading?.fontSize}px;
                color: ${this.customizationData.fontSettings?.subheading?.fontColor};
                font-weight: ${this.customizationData.fontSettings?.subheading?.fontWeight};
                font-family: ${this.customizationData.fontSettings?.subheading?.fontFamily};
            }
           
             .eventdetails {
                font-size: ${this.customizationData.fontSettings.body.fontSize}px; 
                color: ${this.customizationData.fontSettings.body.fontColor}; 
                font-family: ${this.customizationData.fontSettings.body.fontFamily}; 
                font-weight: ${this.customizationData.fontSettings.body.fontWeight};
            }
            .name_locationContainer {
                display: flex;
                flex-direction: column;
                gap: 5px;
                width: 70%;
            }
        </style>
        <div class="navbar">
           <img src=${this.data.logoUrl} alt="placeholder" class="banner"/>

            <div class="details">
                <div class="eventName">${this.data.name}</div>
                <div class="locationContainer">
                    ${this.locationIcon(this.customizationData.fontSettings?.subheading?.fontColor)}
                    <div class="location">${this.data.location_city}</div>
                </div>
                 <div class="dateContainer">
                    ${this.dateIcon(this.customizationData.fontSettings?.subheading?.fontColor)}
                <div class="date">${this.formatDate(this.data.start_date)} - ${this.formatDate(this.data.end_date)}</div>
            </div>

            <div class="registerButton">
                <a class="btn">${buttonSettings.buttonText}</a>
            </div>
            </div>
        </div>
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

customElements.define('sticky-widget', Stickynavbarwidget);
