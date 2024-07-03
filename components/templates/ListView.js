class ListView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.imageurl = "https://designshack.net/wp-content/uploads/placeholder-image.png"
    }
    connectedCallback() {
        this.data = JSON.parse(this.getAttribute('data'));
        console.log("page data in multiple data ",this.data)
        this.render();
        this.updateLayout(); 
        this.observer = new ResizeObserver(() => {
            this.updateLayout();
        });
        this.observer.observe(this.shadowRoot.querySelector('.container')); // Observe changes to the container's size
    }
    render() {
        this.shadowRoot.innerHTML = `
          <style>
            .container{
                display: flex;
                flex-direction: column;
                align-items: center;
                gap:20px;
                width: 100%;
                height: 100%;
                background-color : #1a1a1a;
            }
          </style>
          <div class="container">   
            <listview-card3></listview-card3>
            <listview-card2></listview-card2>
            <listview-card2></listview-card2>
            <listview-card2></listview-card2>
          </div>  
        
      `;
    }


}

customElements.define('list-view', ListView);