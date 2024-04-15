class Pagewidget extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.fetchData()
        this.data = null;
        this.toggleState = false; // this state is for opening the modal
        this.formData = {
            eventname: "demoevent",
            eventlocation: "demolocation",
            eventimage: "https://designshack.net/wp-content/uploads/placeholder-image.png",
            eventdate: "1/1/1",
            eventdescription: "demo description",
        };
        this.pagequery = ""
        this.pageid = ""
    }
    async fetchData() {
        try {
            const pageIdResponse = await fetch(`https://api.eventgeni.com/widgets/${this.pageid}?type=page`);
            const pageIdData = await pageIdResponse.json();
            this.pagequery = pageIdData.query;
            const mainDataResponse = await fetch(`https://api.eventgeni.com/es/find?company=104&${this.pagequery}`);
            this.data = await mainDataResponse.json();
            console.log("Data is this", this.data);
            this.render();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    

    connectedCallback() {
        this.pagequery = this.getAttribute('page-id'); 
        this.fetchData();
        this.observeAttributes(); 
        this.addEventListener('modal-open', this.handleModalOpen.bind(this))
        this.render();
    }
    observeAttributes() {
        // Create a new MutationObserver instance
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'page-id') {
                    // When 'sticky-id' attribute changes, update the stickyid and fetch new data
                    this.pageid = mutation.target.getAttribute('page-id');
                    console.log("widget app , page id is ", this.pageid)
                    this.fetchData();
                }
            });
        });
        // Observe changes to attributes
        this.observer.observe(this, { attributes: true });
    }
    handleModalOpen(event) {
        this.toggleState = true
        this.formData = event.detail;
        this.render();
    }
    render() {
        let isPromotedEvent = false
        if(this.data?.top_3?.length > 0){
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