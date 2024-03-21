class Stickynavbarwidget extends HTMLElement{
    constructor() {
        super();
    }
    connectedCallback() {
        const data = JSON.parse(this.getAttribute('data'));
        console.log(data)
    }
}
customElements.define('sticky-widget', Stickynavbarwidget);