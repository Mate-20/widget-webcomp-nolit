class Sectionwidget extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.fetchData();
        this.toggleState = false; // this state is for opening the modal
        this.formData = {
            eventname: "demoevent",
            eventlocation: "demolocation",
            eventimage: "https://designshack.net/wp-content/uploads/placeholder-image.png",
            eventdate: "1/1/1",
            eventdescription: "demo description",
        };
    }

    async fetchData() {
        try {
            const response = await fetch("http://127.0.0.1:8080/configurationsSection.json");
            this.data = await response.json();
            this.render();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    connectedCallback() {
        this.addEventListener('modal-open', this.handleModalOpen.bind(this))
        this.addEventListener('close-form', this.handleModalClose.bind(this))
        this.render()
    }
    handleModalClose(){
        this.toggleState = false
    }
    handleModalOpen(event) {
        this.toggleState = true
        this.formData = event.detail;
        console.log(this.formData)
        this.render();
    }
    render(){
        this.shadowRoot.innerHTML = `
        <style>
        .modal{
            padding : 20px;
            border-radius:10px;
            position : absolute;
            background : white;
            height: fit-content;
            width: fit-content;
            top : 50%;
            left : 50%;
            transform: translate(-50%, -50%);
            filter : drop-shadow(1px 1px 6px black);
          }
        </style>
        <div class="body">
            <section-data data='${JSON.stringify(this.data)}'></section-data>
            ${this.toggleState ? `<div class="modal">
            <register-form 
            eventname="${this.formData.eventname}"
            eventlocation="${this.formData.eventlocation}"
            eventimage="${this.formData.eventimage}"
            eventdate="${this.formData.eventdate}"
            eventdescription="${this.formData.eventdescription}"
            ></register-form>
           </div>` : ''}
        </div>
        `;
    }
}
customElements.define('section-widget', Sectionwidget);