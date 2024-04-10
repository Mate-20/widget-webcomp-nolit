class Stickynavbarwidget extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.data = null;
        this.fetchData();
        this.stickyid = "";
    }
    async fetchData() {
        try {
            const response = await fetch(`https://api.eventgeni.com/stickey/${this.stickyid}`);
            this.data = await response.json();
            console.log(this.data)
            this.render();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    connectedCallback() {
        this.stickyid = this.getAttribute('sticky-id'); // Set initial stickyid
        this.observeAttributes(); // Start observing attribute changes
        this.render(); // Initial render
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

    disconnectedCallback() {
        // Disconnect the observer when the element is removed from the DOM
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            .navbar{
                position: sticky;
                top: 0;
                width:100%;
                display:flex;
                align-items:center;
                justify-content:center;
                background-color: ${this.data.layoutBgColor};
                color:${this.data.fontColor};
                height:${this.data.height}; 
              
            }
            .eventname{
                font-size:${this.data.fontSize};
            }
        </style>
            <div class="navbar">
                <div class="eventname">${this.data.eventData[0].name}</div>
            </div>
        `
    }
}

customElements.define('sticky-widget', Stickynavbarwidget);