class Stickynavbarwidget extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.data = null;
        this.customizationData = null;
    }

    async fetchData() {
        try {
            const response = await fetch(`https://api.dev.eventgeni.com/public/widget/${this.stickyid}`);
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
                gap:5px;
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
            .tags{
                display : flex;
                align-items : center;
                gap : 5px;
            }
            .pill {
                border-radius: 6px;
                padding: 4px 8px;
                line-height : ${this.customizationData.fontSettings?.body?.fontSize}px;
                font-size:${this.customizationData.fontSettings?.body?.fontSize}px;
                font-weight: ${this.customizationData.fontSettings?.body?.fontWeight};
            }
            .type1 {
                background-color: #FFF8E6;
                color: #CE9921;
            }
            .type2 {
                background-color: #F7E5EE;
                color: #8C1D47;
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
                <div class="tags">
                    ${this.data.type === "SUB" ? this.partyPopIcon() : this.data.type === "MAIN" && this.data.event_type === "Tradeshow" ? this.tradeshowIcon() : this.data.type === "MAIN" && this.data.event_type === "Conference" ? this.conferenceIcon() : this.data.type === "MAIN" && this.data.event_type === "Workshop" ? this.workshopIcon() : this.widgetDefaultIcon()}
                    <div class="pill type1">${this.data.event_type}</div>
                    <div class="pill type2">${this.data.format}</div>
                </div>
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
    tradeshowIcon() {
        return `
        <svg width="30" height="30" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.25131 0.649108C1.6079 0.846754 1.02622 1.33967 0.699119 1.96443C0.522279 2.30224 0.517578 2.36173 0.517578 4.27608C0.517578 6.19043 0.522279 6.24991 0.699119 6.58772C1.08663 7.32791 1.81834 7.86275 2.56431 7.95113L2.94234 7.9959L2.96284 16.9814L2.98333 25.967L3.16487 26.3137C3.41222 26.7862 3.83147 27.211 4.29326 27.4569L4.67854 27.6622H18.9722H33.2659L33.6511 27.4569C34.1129 27.211 34.5322 26.7862 34.7795 26.3137L34.9611 25.967L34.9816 16.9814L35.0021 7.9959L35.3809 7.95105C36.1207 7.86336 36.8373 7.34764 37.2216 6.62625L37.4268 6.24097V4.27608V2.31118L37.2216 1.92591C36.9756 1.46412 36.5508 1.04486 36.0784 0.797516L35.7316 0.615975L19.0878 0.602953C9.93367 0.595864 2.35726 0.616591 2.25131 0.649108ZM7.87631 15.372V22.7692H18.9722H30.0681V15.372V7.97471H18.9722H7.87631V15.372ZM13.0775 31.9447C11.6032 34.2067 11.5372 34.3435 11.5368 35.1365C11.5365 35.6551 11.5704 35.8222 11.7506 36.1892C11.9859 36.6681 12.3906 37.0761 12.9007 37.3485C13.1824 37.4989 13.3463 37.5252 14.0022 37.5251C14.6938 37.5251 14.8139 37.5034 15.1747 37.3132C15.3958 37.1967 15.6905 36.9875 15.8297 36.8481C15.9688 36.7087 16.7241 35.6168 17.5082 34.4215C18.2922 33.2263 18.951 32.2484 18.9722 32.2485C18.9934 32.2486 19.684 33.274 20.5068 34.5271C22.1106 36.9699 22.3136 37.2016 23.0704 37.4529C23.6757 37.654 24.595 37.5814 25.1297 37.2904C25.5975 37.0358 26.0646 36.4774 26.2585 35.9408C26.4422 35.4326 26.43 34.6013 26.2323 34.1548C26.1434 33.954 25.5081 32.9744 24.8207 31.978L23.5709 30.1665L18.9022 30.1689L14.2333 30.1713L13.0775 31.9447Z" fill="#5055A3"/>
</svg>
`
    }
    workshopIcon() {
        return `<svg width="30" height="30" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.3744 0.937224C16.8377 1.40031 17.0039 1.84365 17.0039 2.61546C17.0039 4.05882 16.1395 4.9232 14.6962 4.9232C13.2528 4.9232 12.3884 4.05882 12.3884 2.61546C12.3884 1.84365 12.5546 1.40031 13.0179 0.937224C13.8926 0.062592 15.4998 0.062592 16.3744 0.937224ZM7.68014 1.46159C7.78835 1.74339 8.2322 1.84622 9.33889 1.84622C10.8469 1.84622 10.8499 1.84775 10.8499 2.61546V3.38471H6.23447H1.619V7.23093V11.0772H6.23447H10.8499V11.8464C10.8499 12.4844 10.7464 12.6157 10.243 12.6157H9.63607L10.2871 15.2649C10.972 18.0527 10.9346 18.7696 10.1038 18.7696C9.42043 18.7696 9.33504 18.5873 8.55041 15.4606L7.86886 12.7439H7.00372H6.13857L5.45702 15.4606C4.67239 18.5873 4.587 18.7696 3.90366 18.7696C3.07339 18.7696 3.03544 18.0529 3.71801 15.2747L4.36649 12.6351L2.28747 12.5613L0.208715 12.4874V7.23093V1.97442L3.15236 1.90134C5.41471 1.84519 6.14447 1.74134 6.30601 1.45262C6.58037 0.962609 7.49116 0.968507 7.68014 1.46159ZM16.6001 6.86375C16.9601 7.22375 17.0047 8.01326 16.9447 12.9592C16.8765 18.5799 16.8695 18.6422 16.3162 18.7212C15.5205 18.8342 15.3008 18.2319 15.1303 15.4724C14.9882 13.169 14.8634 12.6192 14.5531 12.9298C14.4744 13.0082 14.3433 14.1526 14.2621 15.4724C14.0915 18.2319 13.8718 18.8342 13.0761 18.7212C12.5277 18.6429 12.5141 18.5409 12.3884 13.598C12.3179 10.8238 12.1646 8.45839 12.0477 8.34147C11.931 8.22429 10.7771 8.07069 9.48351 8.00018C7.18039 7.87454 7.13192 7.85889 7.13192 7.23093V6.5899L11.6592 6.51989C15.5446 6.45989 16.2449 6.50861 16.6001 6.86375Z" fill="#5055A3"/>
</svg>
`
    }
    conferenceIcon() {
        return `<svg width="30" height="30" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.2318 12.1952L18.1934 5.46434H15.3087C15.3087 4.67907 15.0923 3.96592 14.6596 3.32488C14.2269 2.68384 13.642 2.21108 12.9048 1.90658C12.8567 1.40978 12.6484 0.997271 12.2798 0.66906C11.9112 0.340848 11.4785 0.176422 10.9817 0.175781C10.4528 0.175781 9.99994 0.364246 9.623 0.741177C9.24607 1.11811 9.05793 1.57068 9.05857 2.09889C9.05921 2.62711 9.24736 3.08 9.623 3.45757C9.99865 3.83515 10.4515 4.02329 10.9817 4.02201C11.19 4.02201 11.3823 3.9938 11.5586 3.93739C11.7349 3.88098 11.9112 3.78899 12.0875 3.66142C12.4721 3.78963 12.7804 4.02201 13.0125 4.35855C13.2445 4.6951 13.3609 5.06369 13.3615 5.46434H0.88534L1.8469 12.1952H4.41906L4.25079 10.5366C4.17066 9.75128 4.39085 9.07018 4.91138 8.49325C5.4319 7.91631 6.08512 7.62785 6.87103 7.62785H12.2077C12.9929 7.62785 13.6458 7.91631 14.1664 8.49325C14.6869 9.07018 14.9074 9.75128 14.8279 10.5366L14.6596 12.1952H17.2318ZM12.7365 17.2434L13.3856 10.3923C13.4176 10.0398 13.3215 9.73141 13.0971 9.4673C12.8727 9.2032 12.5763 9.07082 12.2077 9.07018H6.87103C6.50243 9.07018 6.20595 9.20255 5.98159 9.4673C5.75723 9.73205 5.66107 10.0404 5.69312 10.3923L6.34217 17.2434H12.7365Z" fill="#5055A3"/>
</svg>
`
    }
    partyPopIcon() {
        return `<svg width="30" height="30" viewBox="0 0 52 51" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M28.2682 41.7517L15.5957 45.9742C8.68317 48.2792 5.22567 49.4317 3.40067 47.6067C1.57567 45.7817 2.72817 42.3242 5.03317 35.4117L9.25817 22.7392C11.1732 16.9942 12.1307 14.1217 14.3957 13.5892C16.6607 13.0517 18.8032 15.1942 23.0832 19.4767L31.5332 27.9242C35.8132 32.2067 37.9557 34.3467 37.4207 36.6117" stroke="#6750A4" stroke-width="3.75" stroke-linecap="round"/>
<path d="M25.6006 41.8511C25.6006 41.8511 23.7056 36.1486 23.7056 32.3761C23.7056 28.6011 25.6006 22.8961 25.6006 22.8961M15.1756 44.6961C15.1756 44.6961 13.5756 37.8136 13.2806 33.3211C12.7931 25.8986 15.1756 14.3686 15.1756 14.3686M31.2881 21.0011L31.6456 19.2011C32.0106 17.3836 33.3206 15.9011 35.0781 15.3161C35.9412 15.027 36.7128 14.5154 37.315 13.8328C37.9172 13.1503 38.3288 12.321 38.5081 11.4286L38.8681 9.62859M38.9381 29.1186L39.4681 29.4261C41.1106 30.3761 43.1756 30.1661 44.5956 28.9086C45.2245 28.3492 46.0006 27.982 46.8319 27.8504C47.6631 27.7188 48.5147 27.8283 49.2856 28.1661L50.0131 28.4861M19.5006 2.93359C19.0905 3.60414 18.9181 4.3932 19.011 5.17368C19.104 5.95417 19.457 6.68065 20.0131 7.23609L20.2581 7.48109C21.2406 8.46359 21.6031 9.90609 21.2006 11.2386" stroke="#6750A4" stroke-width="3.75" stroke-linecap="round"/>
<path d="M12.3356 5.84486C12.4604 5.72043 12.6084 5.6218 12.7713 5.55458C12.9342 5.48737 13.1087 5.45289 13.2849 5.45313C13.4611 5.45336 13.6355 5.48829 13.7982 5.55594C13.9609 5.62358 14.1087 5.72261 14.2331 5.84736C14.3576 5.97212 14.4562 6.12016 14.5234 6.28303C14.5906 6.44591 14.6251 6.62043 14.6249 6.79663C14.6246 6.97283 14.5897 7.14726 14.5221 7.30995C14.4544 7.47265 14.3554 7.62043 14.2306 7.74486C13.9787 7.99615 13.6372 8.13707 13.2814 8.1366C12.9255 8.13613 12.5844 7.99432 12.3331 7.74236C12.0818 7.49041 11.9409 7.14894 11.9414 6.79309C11.9419 6.43724 12.0837 6.09615 12.3356 5.84486ZM25.4081 13.8874C25.5327 13.7628 25.6806 13.6639 25.8434 13.5965C26.0062 13.5291 26.1807 13.4944 26.3569 13.4944C26.5331 13.4944 26.7076 13.5291 26.8704 13.5965C27.0331 13.6639 27.1811 13.7628 27.3056 13.8874C27.4302 14.012 27.5291 14.1599 27.5965 14.3227C27.6639 14.4854 27.6986 14.6599 27.6986 14.8361C27.6986 15.0123 27.6639 15.1868 27.5965 15.3496C27.5291 15.5124 27.4302 15.6603 27.3056 15.7849C27.054 16.0365 26.7127 16.1778 26.3569 16.1778C26.001 16.1778 25.6598 16.0365 25.4081 15.7849C25.1565 15.5332 25.0152 15.192 25.0152 14.8361C25.0152 14.4803 25.1565 14.139 25.4081 13.8874ZM37.9081 21.3874C38.0327 21.2628 38.1806 21.1639 38.3434 21.0965C38.5062 21.0291 38.6807 20.9944 38.8569 20.9944C39.0331 20.9944 39.2076 21.0291 39.3704 21.0965C39.5331 21.1639 39.6811 21.2628 39.8056 21.3874C39.9302 21.512 40.0291 21.6599 40.0965 21.8227C40.1639 21.9854 40.1986 22.1599 40.1986 22.3361C40.1986 22.5123 40.1639 22.6868 40.0965 22.8496C40.0291 23.0124 39.9302 23.1603 39.8056 23.2849C39.554 23.5365 39.2127 23.6778 38.8569 23.6778C38.501 23.6778 38.1598 23.5365 37.9081 23.2849C37.6565 23.0332 37.5152 22.692 37.5152 22.3361C37.5152 21.9803 37.6565 21.639 37.9081 21.3874ZM42.6606 34.2774C42.7852 34.1528 42.9331 34.0539 43.0959 33.9865C43.2587 33.9191 43.4332 33.8844 43.6094 33.8844C43.7856 33.8844 43.9601 33.9191 44.1229 33.9865C44.2856 34.0539 44.4336 34.1528 44.5581 34.2774C44.6827 34.402 44.7816 34.5499 44.849 34.7127C44.9164 34.8754 44.9511 35.0499 44.9511 35.2261C44.9511 35.4023 44.9164 35.5768 44.849 35.7396C44.7816 35.9024 44.6827 36.0503 44.5581 36.1749C44.3065 36.4265 43.9652 36.5678 43.6094 36.5678C43.2535 36.5678 42.9123 36.4265 42.6606 36.1749C42.409 35.9232 42.2677 35.582 42.2677 35.2261C42.2677 34.8703 42.409 34.529 42.6606 34.2774Z" fill="#6750A4"/>
<path d="M43.403 15.2705C41.728 16.9455 42.928 21.8055 42.928 21.8055C42.928 21.8055 47.788 23.008 49.463 21.3305C51.238 19.5555 50.233 17.2305 47.498 17.2355C47.5055 14.5005 45.178 13.4955 43.403 15.2705Z" stroke="#6750A4" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M32.9626 4.53014L32.8951 4.77514C32.8201 5.04014 32.7801 5.17514 32.8001 5.30514C32.8176 5.43514 32.8876 5.55014 33.0326 5.77764L33.1626 5.98264C33.6676 6.78264 33.9201 7.18264 33.7476 7.51014C33.5751 7.83764 33.0926 7.87514 32.1276 7.95014L31.8776 7.97014C31.6026 7.99264 31.4676 8.00264 31.3476 8.06514C31.2276 8.12764 31.1401 8.23514 30.9601 8.45264L30.8001 8.65014C30.1726 9.41014 29.8601 9.79014 29.5001 9.74264C29.1451 9.69264 28.9801 9.24764 28.6501 8.35514L28.5651 8.12514C28.4726 7.87014 28.4251 7.74514 28.3326 7.65014C28.2401 7.56014 28.1151 7.51264 27.8601 7.42014L27.6301 7.33514C26.7376 7.00514 26.2926 6.84014 26.2426 6.48514C26.1926 6.12514 26.5751 5.81014 27.3351 5.18514L27.5326 5.02264C27.7476 4.84764 27.8576 4.75764 27.9201 4.63764C27.9826 4.51764 27.9951 4.38014 28.0151 4.10514L28.0351 3.85514C28.1101 2.89264 28.1476 2.41014 28.4751 2.23764C28.8001 2.06514 29.2001 2.31764 30.0001 2.82264L30.2076 2.95264C30.4351 3.09764 30.5501 3.16764 30.6801 3.18514C30.8101 3.20264 30.9451 3.16514 31.2101 3.09014L31.4551 3.02264C32.3926 2.75514 32.8626 2.62264 33.1126 2.87264C33.3626 3.12264 33.2301 3.59264 32.9626 4.53014Z" stroke="#6750A4" stroke-width="2.5"/>
</svg>
`
    }
    widgetDefaultIcon() {
        return `<svg width="30" height="30" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.66797 13.3333C6.66797 13.687 6.80844 14.0261 7.05849 14.2761C7.30854 14.5262 7.64768 14.6667 8.0013 14.6667C8.35492 14.6667 8.69406 14.5262 8.94411 14.2761C9.19416 14.0261 9.33464 13.687 9.33464 13.3333M6.66797 13.3333C6.66797 12.9797 6.80844 12.6406 7.05849 12.3905C7.30854 12.1405 7.64768 12 8.0013 12C8.35492 12 8.69406 12.1405 8.94411 12.3905C9.19416 12.6406 9.33464 12.9797 9.33464 13.3333M6.66797 13.3333H2.66797M9.33464 13.3333H13.3346M8.0013 10L6.66797 8.66667H4.66797C4.49116 8.66667 4.32159 8.59643 4.19656 8.4714C4.07154 8.34638 4.0013 8.17681 4.0013 8V2.66667C4.0013 2.48986 4.07154 2.32029 4.19656 2.19526C4.32159 2.07024 4.49116 2 4.66797 2H11.3346C11.5114 2 11.681 2.07024 11.806 2.19526C11.9311 2.32029 12.0013 2.48986 12.0013 2.66667V8C12.0013 8.17681 11.9311 8.34638 11.806 8.4714C11.681 8.59643 11.5114 8.66667 11.3346 8.66667H9.33464L8.0013 10Z" stroke="#8F8F8F" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`
    }
}

customElements.define('sticky-widget', Stickynavbarwidget);
