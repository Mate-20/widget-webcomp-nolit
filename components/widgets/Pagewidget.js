class Pagewidget extends HTMLElement {
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
        this.participationFilter = "All"
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
        this.shadowRoot.querySelectorAll('.filterOption').forEach(option => {
            option.addEventListener('click', this.handleFilterChange.bind(this));
        });
    }
    handleFilterChange(event) {
        this.participationFilter = event.target.getAttribute('data-filter');
    }

    render() {
        let activeContent;
        switch (this.activeView) {
            case 'Your View':
                activeContent = `<grid-view data='${JSON.stringify(this.data)}'></grid-view>`;
                break;
            case 'Map':
                activeContent = `<map-view></map-view>`;
                break;
            case 'Calendar':
                activeContent = `<calendar-container></calendar-container>`;
                break;
            default:
                activeContent = `<grid-view data='${JSON.stringify(this.data)}'></grid-view>`;
        }
        this.shadowRoot.innerHTML = `
        <style>
            .body{
                display : flex;
                flex-direction : column;
                align-items: center;
                background-color : #1a1a1a;
                padding : 10px;
                min-height : 100vh; 
            }
            .ownerEditBtn{
                position : absolute;
                left : 0;
                
            }
            .ownerEditBtn div{
                color : white;
                font-size : 10px;
            }
            .editBtn{
                padding : 5px 10px;
                font-size : 12px;
                background-color : red;
                border-radius : 5px;
                color : white;
            }
            
            .navbarBtns{
                width : 100%;
                display : flex;
                justify-content : space-evenly;
            }
            .dropdown {
                position : relative;
            }
            .dropbtn{
                background-color : black;
                border-radius : 4px;
                padding : 5px 24px;
                color : white;
                cursor : pointer;
                border : none;
                width : 100%;

            }
            .dropdown-content {
                display: none;
                position: absolute;
                background-color: white;
                box-shadow: 0px 8px 16px rgba(0,0,0,0.2);
                z-index: 1;
                width : 100%;
            }
            .dropdown:hover .dropdown-content {
                display: block;
            }
            .dropdown-content div {
                padding: 8px 16px;
                cursor: pointer;
            }
            .dropdown-content div:hover {
                background-color: #f1f1f1;
            }
            .viewBtns{
                display : flex;
                align-items : center;
                gap : 8px;
                background-color : black;
                padding : 5px;
                border-radius : 5px;
                width : fit-content;
            }
            .viewBtn{
                border-radius : 4px;
                padding : 5px 12px;
                color : white;
                cursor : pointer;
            }
            .active{
                background-color : #6750a4;
            }
            .view{
                margin-top : 20px;
                width : 100%;
                height : fit-content;
            }
            .heading{
                font-size : 25px;
                margin-top : 25px;
                margin-bottom : 20px;
                color : white;
            }
        </style>
        <div class="body">
            <div class="ownerEditBtn">
                <div>This pannel is only visible to the owner</div>
                <a class="editBtn" href="https://console.eventgeni.com/templates/edit/3763g?preview=sehb" target="_blank">Edit</a>
            </div>
            <div class="navbarBtns">
                <div class="dropdown">
                    <button class="dropbtn">Participation Filter</button>
                    <div class="dropdown-content">
                        <div class="filterOption" data-filter="Speaking">Speaking</div>
                        <div class="filterOption" data-filter="Exhibiting">Exhibiting</div>
                        <div class="filterOption" data-filter="Sponsoring">Sponsoring</div>
                        <div class="filterOption" data-filter="Attending">Attending</div>
                        <div class="filterOption" data-filter="All">All</div>
                    </div>
                </div>
                <div class="viewBtns">
                    <div class="viewBtn ${this.activeView === 'Your View' ? 'active' : ''}">Your View</div>
                    <div class="viewBtn ${this.activeView === 'Map' ? 'active' : ''}">Map</div>
                    <div class="viewBtn ${this.activeView === 'Calendar' ? 'active' : ''}">Calendar</div>
                </div>
                <div class="sortContainer">
                    <input type="date"/>
                </div>
            </div>

            <div class="heading">Meet us here</div>

            <div class="view">
                ${activeContent}
            </div>
        </div>

`
    }

}
customElements.define('page-widget', Pagewidget);