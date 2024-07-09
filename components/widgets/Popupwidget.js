class Popupwidget extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.render();
        this.style.display = 'none'; // Start hidden
    }

    render() {
        const view = this.getAttribute('view') || 'popuplandscape-view1';
        this.shadowRoot.innerHTML = `
            <${view}></${view}>
        `
    }
}

customElements.define('popup-widget', Popupwidget);