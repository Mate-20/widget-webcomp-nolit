class Cards extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // Initialize properties if needed
    this.render();
  }

  connectedCallback() {
    // For getting the passed call back function
  //   const eventdata = {
  //     eventname: this.eventname,
  //     eventlocation: this.location,
  //     eventimage: this.image,
  //     eventdate: this.date,
  //     eventdescription: this.description,
  // };
  //   const openModalEvent = new CustomEvent('modal-open', {
  //     detail:eventdata ,
  //     bubbles: true, // Allow event to bubble up
  //     composed: true, // Allow event to cross shadow DOM boundaries
  //   });
  //   const cards = this.shadowRoot.querySelectorAll('.card');
  //   cards.forEach(card => {
  //     card.addEventListener('click', () => {
  //       this.dispatchEvent(openModalEvent);
  //     });
  //   });
  }

  static get observedAttributes() {
    return ['image', 'eventname', 'date', 'location', 'cardcolor', 'cardradius','description','cardwidth','imageheight','cardheight','type'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
      .card{
        display: flex;
        flex-direction : column;
        width:300px;
        height : 450px;
        cursor: pointer;
    }
    .img {
      height:40%;
    }
    .img img{
      height:100%;
      width:300px;
    }
    .card:hover{
        transition-duration: .2s;
        filter: drop-shadow(1px 1px 5px rgb(245, 245, 245));
    }
    .content{
      height:50%;
      display: flex;
      flex-direction : column;
      justify-content:space-evenly;
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
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .location{
        font-size: 20px;
        display: flex;
        color:black;
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
      <div class="card" style="background-color:#e6e6e6; border-radius:10px">
        <div class="img">
          <img src="${this.image}" alt="author" style="border-top-left-radius:10px; border-top-right-radius:10px;">
        </div>
        <div class="content">
          <div class="tag">${this.type}</div>
          <div class="date">${this.date}</div>
          <div class="eventName">${this.eventname}</div>
          <div class="location">${this.location}</div>
          <div class="btn" @click="${this.handlemodal}">
            <div>Register</div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('card-view', Cards);
