class Popupwidget extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.events = [
            { id: 1, name: 'gurugram event', latitude: 28.421851, longitude: 77.018721},
            { id: 2, name: 'Manesar Event', latitude: 28.357119, longitude: 76.951876}, 
            { id: 3, name: 'IGI Event', latitude: 28.573827, longitude: 77.122610 },  
        ];
    }
    connectedCallback() {
        this.fetchData();
        this.getUserLocation();
        this.render();
    }

     async fetchData() {
        try {
            const pageIdResponse = await fetch(`https://api.dev.eventgeni.com/public/widget/cm0payb1n0001u5kb6v45j7l4`);
            const pageIdData = await pageIdResponse.json();
            console.log(pageIdData)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
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
                    this.findClosestEvent(userLat, userLong);
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

        this.events.forEach(event => {
            const distance = this.haversineDistance(userLat, userLong, event.latitude, event.longitude);
            if (distance < shortestDistance) {
                shortestDistance = distance;
                closestEvent = event;
            }
        });

        if (closestEvent) {
            console.log('Closest event:', closestEvent.name, `at ${shortestDistance.toFixed(2)} km away`);
        } else {
            console.log('No events found');
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
    render() {
        const view = this.getAttribute('view') || 'popuplandscape-view1';
        this.shadowRoot.innerHTML = `
            <${view}></${view}>
        `
    }
}

customElements.define('popup-widget', Popupwidget);