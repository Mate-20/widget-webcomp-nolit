class HeroBanner extends HTMLElement {
  constructor() {
    super();
    this.imageurl = "https://designshack.net/wp-content/uploads/placeholder-image.png"
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.render()
  }


  render() {
    this.shadowRoot.innerHTML = `
        <style>
            .body{
                background-color : #1a1a1a;
            }
        </style>
        <div class="body"><hero-banner3></hero-banner3></div>
        
    `;  
  }
}
customElements.define('hero-banner', HeroBanner);