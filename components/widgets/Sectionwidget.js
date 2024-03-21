class Sectionwidget extends HTMLElement{
    constructor() {
        super();
    }
    connectedCallback() {
        const data = JSON.parse(this.getAttribute('data'));
        console.log(data)
    }
}
customElements.define('section-widget', Sectionwidget);