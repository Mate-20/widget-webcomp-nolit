class CaraouselAndGridView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.render();
    }
    render(){
        this.shadowRoot.innerHTML = `
            <caraousel-view></caraousel-view>
            <grid-view></grid-view>
        `;
    }
}
customElements.define('caraouselgrid-view', CaraouselAndGridView);