class Pagewidget extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.fetchData()
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
            const response = await fetch("http://127.0.0.1:8080/configurationsPage.json");
            this.data = await response.json();
            this.render();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    connectedCallback() {
        this.addEventListener('modal-open', this.handleModalOpen.bind(this))
        this.render();
    }
    handleModalOpen(event) {
        this.toggleState = true
        this.formData = event.detail;
        this.render();
    }
    render() {
        let isPromotedEvent = false
        if(this.data.promotedData.length > 0){
            isPromotedEvent = true;
        }
        this.shadowRoot.innerHTML = `
        <style>
            .container{
                height : fit-content;
            }
            .blur {
                height: 100vh;
                overflow: hidden;
                filter: blur(2px);
            }
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
              }
        </style>
        <div class="body">
            <div class="container ${this.toggleState ? 'blur' : ''}">
                ${isPromotedEvent ? `<promoted-event data='${JSON.stringify(this.data)}'></promoted-event>` : ''}
                <multiple-data data='${JSON.stringify(this.data)}'></multiple-data>
            </div>
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

`

    }

}
customElements.define('page-widget', Pagewidget);