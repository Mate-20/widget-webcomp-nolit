class Popupwidget extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <popup-view></popup-view>
        `
    }
}

customElements.define('popup-widget', Popupwidget);