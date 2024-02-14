class Cards extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // Initialize properties if needed
    this.image = 'https://media.licdn.com/dms/image/C4D12AQGFCeWmvrviVA/article-cover_image-shrink_600_2000/0/1635965553910?e=2147483647&v=beta&t=WP5YW7PcD57xmcjDQ4Fse6NR3xaO8XZxWwuyDdyDvmU';
    this.eventname = 'Theatre';
    this.date = '12-1-24';
    this.location = 'Berlin, Germany';
    this.render();
  }

  static get observedAttributes() {
    return ['image','eventname','date','location'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
    this.render();
  }

  handleModal() {
    // Implement your modal functionality here
    console.log('Modal clicked');
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
      .card{
        background-color: rgb(233, 233, 233);
        width: 350px;
        border-radius: 15px;
        cursor: pointer;
    }
    .card:hover{
        transition-duration: .2s;
        filter: drop-shadow(1px 1px 5px rgb(245, 245, 245));
    }
    .content{
        padding: 20px;
    }
    .tag{
        background-color: rgb(253, 219, 109);
        border-radius: 30px;
        width: fit-content;
        padding: 5px 20px;
        font-weight: bold;
        color: rgb(39, 39, 39);
        font-size: 20px;
    }
    .date{
        margin-top: 20px;
        color: rgb(39, 39, 39);
        font-size: 20px;
    }
    .eventName{
        font-size: 25px;
        font-weight: bold;
        color: rgb(96, 63, 240);
    }
    .location{
        font-size: 20px;
        margin-top: 60px;
        display: flex;
    }
    .location div{
        margin-right: 10px;
    }
    .btn{
        margin-top: 10px;
        display: flex;
        border: 2px solid rgb(96, 63, 240);
        border-radius: 20px;
        width: fit-content;
        padding: 5px 20px;
        align-items: center;
    }
    .btn div{
        color: rgb(96, 63, 240);
        margin-right: 10px;
    }
    .btn:hover{
        transition-duration: .3s;
        background-color:rgb(96, 63, 240) ;
    }
    .btn:hover div{
        transition-duration: .3s;
        color: white;
    }
      </style>
      <div class="card">
        <div class="img">
          <img src="${this.image}" width="350" height="200" alt="author" style="border-top-left-radius: 15px; border-top-right-radius: 15px;">
        </div>
        <div class="content">
          <div class="tag">Events</div>
          <div class="date">${this.date}</div>
          <div class="eventName">${this.eventname}</div>
          <div class="location">
            <div>Location Icon</div>
            <div>${this.location}</div>
          </div>
          <div class="btn" @click="${this.handleModal}">
            <div>Register</div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('card-component', Cards);
