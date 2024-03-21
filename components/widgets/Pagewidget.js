class Pagewidget extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.data = JSON.parse(this.getAttribute('data'));
        this.render();
    }
    render() {
        let isPromotedEvent = false
        if(this.data.promotedData.length > 0){
            isPromotedEvent = true;
        }
        this.shadowRoot.innerHTML = `${isPromotedEvent ? `<promoted-event data='${JSON.stringify(this.data)}'></promoted-event>` : ''}
        <multiple-data data='${JSON.stringify(this.data)}'></multiple-data>`

    }

}
customElements.define('page-widget', Pagewidget);