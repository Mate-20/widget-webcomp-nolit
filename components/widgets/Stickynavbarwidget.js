class Stickynavbarwidget extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.data = null;
        this.fetchData();
    }

    async fetchData() {
        try {
            const response = await fetch("http://127.0.0.1:8080/configurationsSticky.json");
            this.data = await response.json();
            this.render();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    connectedCallback() {
        this.data = JSON.parse(this.getAttribute('data'));
        console.log(this.data)
        this.render()
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