class Map extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.render();
        this.initializeMap();
    }   

    initializeMap() {
        const script = document.createElement('script');
        script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.js';
        script.onload = () => {
            mapboxgl.accessToken = 'pk.eyJ1IjoiYWJoaWUiLCJhIjoiY2x0ODgycjA0MDV6czJrdDQzaWwwYmh6eCJ9.px6YQmrBFfxRPyhB1FqCkg';
            const map = new mapboxgl.Map({
                container: this.shadowRoot.getElementById('map'),
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [0, 0], // Starting position [lng, lat]
                zoom: 2 // Starting zoom level
            });

            // Add navigation control (the +/- zoom buttons)
            map.addControl(new mapboxgl.NavigationControl());

            // Example: Add a marker at the center
            new mapboxgl.Marker()
                .setLngLat([0, 0])
                .addTo(map);
        };
        this.shadowRoot.appendChild(script);
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                @import url('https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.css');
            </style>
            <div id="map" style='width: 400px; height: 300px;'></div>
        `;
    }

}
customElements.define('map-view', Map);