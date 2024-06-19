class CaraouselAndListView extends HTMLElement {
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
            <list-view></list-view>
        `;
    }
}
customElements.define('caraousellist-view', CaraouselAndListView);