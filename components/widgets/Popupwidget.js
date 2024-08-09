class Popupwidget extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.fetchData();
        this.render();
        // this.style.display = 'none';
    }

     async fetchData() {
        try {
            const pageIdResponse = await fetch(`https://api.eventgeni.com/widget`);
            const pageIdData = await pageIdResponse.json();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    render() {
        const view = this.getAttribute('view') || 'popuplandscape-view1';
        this.shadowRoot.innerHTML = `
            <${view}></${view}>
        `
    }
}

customElements.define('popup-widget', Popupwidget);