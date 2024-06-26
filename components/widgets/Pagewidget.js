class Pagewidget extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        // this.fetchData()
        this.data = null;
        this.toggleState = false;
        this.formData = {
            eventname: "demoevent",
            eventlocation: "demolocation",
            eventimage: "https://designshack.net/wp-content/uploads/placeholder-image.png",
            eventdate: "1/1/1",
            eventdescription: "demo description",
        };
        this.pagequery = ""
        this.pageid = ""
        this.activeView = 'Your View'; // Default active view
    }
    // async fetchData() {
    //     try {
    //         const pageIdResponse = await fetch(`https://api.eventgeni.com/widgets/${this.pageid}?type=page`);
    //         const pageIdData = await pageIdResponse.json();
    //         // To get the active state of widget. If active is false, we will not fetch the data.
    //         const formData = JSON.parse(pageIdData.data.body)
    //         console.log("Page Data posted", pageIdData.data)
    //         const activeState = formData.active;
    //         this.pagequery = pageIdData.data.query;
    //         if (activeState) {
    //             const mainDataResponse = await fetch(`https://api.eventgeni.com/es/find?company=104&${this.pagequery}`);
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
        // this.pageid = this.getAttribute('page-id'); 
        // this.fetchData();
        // this.observeAttributes(); 
        // this.addEventListener('modal-open', this.handleModalOpen.bind(this))
        this.render();
        this.addEventListeners();
    }
    // observeAttributes() {
    //     // Create a new MutationObserver instance
    //     this.observer = new MutationObserver((mutations) => {
    //         mutations.forEach((mutation) => {
    //             if (mutation.type === 'attributes' && mutation.attributeName === 'page-id') {
    //                 // When 'sticky-id' attribute changes, update the stickyid and fetch new data
    //                 this.pageid = mutation.target.getAttribute('page-id');
    //                 this.fetchData();
    //             }
    //         });
    //     });
    //     // Observe changes to attributes
    //     this.observer.observe(this, { attributes: true });
    // }
    // handleModalOpen(event) {
    //     this.toggleState = true
    //     this.formData = event.detail;
    //     this.render();
    // }
    addEventListeners() {
        const buttons = this.shadowRoot.querySelectorAll('.viewBtn');
        buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                this.activeView = event.target.textContent;
                this.render();
                this.addEventListeners(); // Re-attach event listeners after rendering
            });
        });
    }

    render() {
        let isPromotedEvent = false
        if(this.data?.top_3?.length > 0){
            isPromotedEvent = true;
        }
        let activeContent;
        switch (this.activeView) {
            case 'Your View':
                activeContent = `<grid-view data='${JSON.stringify(this.data)}'></grid-view>`;
                break;
            case 'Map':
                activeContent = `<map-view></map-view>`;
                break;
            case 'Calendar':
                activeContent = `<herobannerlist-view></herobannerlist-view>`;
                break;
            default:
                activeContent = `<grid-view data='${JSON.stringify(this.data)}'></grid-view>`;
        }
        this.shadowRoot.innerHTML = `
        <style>
            .viewBtns{
                display : flex;
                align-items : center;
                gap : 8px;
                background-color : #1a1a1a;
                padding : 5px;
                border-radius : 5px;
                width : fit-content;
            }
            .viewBtn{
                background-color : black;
                border-radius : 4px;
                padding : 5px 12px;
                color : white;
                cursor : pointer;
            }
            .active{
                background-color : #6750a4;
            }
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
            <div class="viewBtns">
                <div class="viewBtn ${this.activeView === 'Your View' ? 'active' : ''}">Your View</div>
                <div class="viewBtn ${this.activeView === 'Map' ? 'active' : ''}">Map</div>
                <div class="viewBtn ${this.activeView === 'Calendar' ? 'active' : ''}">Calendar</div>
            </div>
            <div class="container ${this.toggleState ? 'blur' : ''}">
                ${isPromotedEvent ? `<hero-banner data='${JSON.stringify(this.data)}'></hero-banner>` : ''}
                 ${activeContent}
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