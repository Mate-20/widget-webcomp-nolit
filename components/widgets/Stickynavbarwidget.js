class Stickynavbarwidget extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        console.log("sticky widget")
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
                font-size:${this.data.fontSize};
                
            }
        </style>
            <div class="navbar">
                <div>${this.data.eventData[0].name}</div>
            </div>
        `
    }
}

customElements.define('sticky-widget', Stickynavbarwidget);