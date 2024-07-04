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
        <popupportrait-view3></popupportrait-view3>
        `
    }
}

customElements.define('popup-widget', Popupwidget);