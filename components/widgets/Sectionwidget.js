class Sectionwidget extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.data = null;
        this.fetchData();
    }

    async fetchData() {
        try {
            const response = await fetch("http://127.0.0.1:8080/configurationsSection.json");
            this.data = await response.json();
            this.render();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    connectedCallback() {
        this.data = JSON.parse(this.getAttribute('data'));
        this.render()
    }
    render(){
        this.shadowRoot.innerHTML = `
        <style>
            .container{
            }
        </style>
        <div class="container">
        <section-data data='${JSON.stringify(this.data)}'></section-data>
        </div>
        `;
    }
}
customElements.define('section-widget', Sectionwidget);