class Sectionwidget extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.data = JSON.parse(this.getAttribute('data'));
        this.render()
    }
    render(){
        this.shadowRoot.innerHTML = `
        <section-data data='${JSON.stringify(this.data)}'></section-data>
        `;
    }
}
customElements.define('section-widget', Sectionwidget);