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
        <popup-view2></popup-view2>
        `
    }
}

customElements.define('popup-widget', Popupwidget);