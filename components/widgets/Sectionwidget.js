class Sectionwidget extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        // this.fetchData()
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

    // async fetchData() {
    //     try {
    //         const pageIdResponse = await fetch(`https://api.eventgeni.com/widgets/${this.sectionid}?type=page`);
    //         const pageIdData = await pageIdResponse.json();
    //         // To get the active state of widget. If active is false, we will not fetch the data.
    //         const formData = JSON.parse(pageIdData.data.body)
    //         console.log("Section Data posted", pageIdData.data)
    //         const activeState = formData.active;
    //         this.sectionquery = pageIdData.data.query;
    //         if (activeState) {
    //             const mainDataResponse = await fetch(`https://api.eventgeni.com/es/find?company=104&${this.sectionquery}`);
    //             this.data = await mainDataResponse.json();
    //         } else {
    //             console.log("Widget is inactive. Skipping data fetch.");
    //             this.data = null; // Set data to null or an empty object/array as needed
    //         }
    //         this.render();
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // }
    connectedCallback() {
        this.sectionid = this.getAttribute('section-id'); 
        // this.fetchData();
        // this.observeAttributes(); 
        // this.addEventListener('close-form', this.handleModalClose.bind(this))
        this.render()
    }
    // observeAttributes() {
    //     // Create a new MutationObserver instance
    //     this.observer = new MutationObserver((mutations) => {
    //         mutations.forEach((mutation) => {
    //             if (mutation.type === 'attributes' && mutation.attributeName === 'section-id') {
    //                 // When 'sticky-id' attribute changes, update the stickyid and fetch new data
    //                 this.sectionid = mutation.target.getAttribute('section-id');
    //                 this.fetchData();
    //             }
    //         });
    //     });
    //     // Observe changes to attributes
    //     this.observer.observe(this, { attributes: true });
    // }

    render(){
        let isPromotedEvent = false
        if(this.data?.top_3?.length > 0){
            isPromotedEvent = true;
        }
        this.shadowRoot.innerHTML = `
        <style>
            .body{
                width : 100%;
                background-color : #1a1a1a;
            }
        </style>
        <div class="body">
            <carousel-view><carousel-view/>
        </div>
        `;
    }
}
customElements.define('section-widget', Sectionwidget);