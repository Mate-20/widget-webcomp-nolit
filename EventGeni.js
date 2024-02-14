class EventGeni extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({ mode: 'open' });
        const randomNumber = Math.floor(Math.random() * 2); // 0 or 1
        this.dataNumber = randomNumber === 0 ? 1 : 2;
        this.render()
    }
    connectedCallback(){
        this.render()
    }

    render(){
        this.shadowRoot.innerHTML = `
        ${this.dataNumber > 1 ? `<multiple-data></multiple-data>` : `<single-data></single-data>`}   `
    }
}

customElements.define('event-geni', EventGeni);