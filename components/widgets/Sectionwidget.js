class Sectionwidget extends HTMLElement{
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
        this.sectionquery = ""
        this.sectionid = ""
    }

    async fetchData() {
        try {
            const pageIdResponse = await fetch(`https://api.eventgeni.com/widgets/${this.sectionid}?type=page`);
            const pageIdData = await pageIdResponse.json();
            // To get the active state of widget. If active is false, we will not fetch the data.
            const formData = JSON.parse(pageIdData.data.body)
            console.log("section final data", pageIdData.data)
            const activeState = formData.active;
            this.sectionquery = pageIdData.data.query;
            if (activeState) {
                const mainDataResponse = await fetch(`https://api.eventgeni.com/es/find?company=104&${this.sectionquery}`);
                this.data = await mainDataResponse.json();
            } else {
                console.log("Widget is inactive. Skipping data fetch.");
                this.data = null; // Set data to null or an empty object/array as needed
            }
            this.render();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    connectedCallback() {
        this.sectionid = this.getAttribute('section-id'); 
        this.fetchData();
        this.observeAttributes(); 
        this.addEventListener('modal-open', this.handleModalOpen.bind(this))
        // this.addEventListener('close-form', this.handleModalClose.bind(this))
        this.render()
    }
    observeAttributes() {
        // Create a new MutationObserver instance
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'section-id') {
                    // When 'sticky-id' attribute changes, update the stickyid and fetch new data
                    this.sectionid = mutation.target.getAttribute('section-id');
                    console.log("widget app , section id is ", this.sectionid)
                    this.fetchData();
                }
            });
        });
        // Observe changes to attributes
        this.observer.observe(this, { attributes: true });
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
        let isPromotedEvent = false
        if(this.data?.top_3?.length > 0){
            isPromotedEvent = true;
        }
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
             ${isPromotedEvent ? `<promoted-event data='${JSON.stringify(this.data)}'></promoted-event>` : ''}
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