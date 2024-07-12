class Sectionwidget extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.data = null;
        this.toggleState = false; // this state is for opening the modal
        this.selectedView = this.getAttribute('selectedCard') || 'verscroll';
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
    connectedCallback() {
        this.sectionid = this.getAttribute('section-id'); 
        this.render()
    }

    render(){
        let view;

        switch (this.selectedView) {
            case 'horscroll':
                view = 'horizontalscroll-view';
                break;
            case 'verscroll':
                view = 'verticalscroll-view';
                break;
            case 'hero':
                view = 'hero-banner';
                break;
            default:
                view = 'carousel-view';
        }
        let isPromotedEvent = false
        if(this.data?.top_3?.length > 0){
            isPromotedEvent = true;
        }
        this.shadowRoot.innerHTML = `
        <style>
            .verscrollbody{
                background-color : black;
                padding : 20px;
                width : fit-content;
            }
            .horscrollbody{
                background-color : black;
                padding : 20px;
            }
            .carouselbody{
                background-color : black;
                padding : 20px;
            }
            .herobannerbody{
                background-color : black;
                padding : 20px;
            }
            .heading{
                font-size : 25px;
                color : white;
                margin-bottom : 20px;
            }
        </style>
        <div class="${this.selectedView === "verscroll" ? "verscrollbody" : this.selectedView === "horscroll" ? "horscrollbody" : this.selectedView === "carousel" ? "carouselbody": this.selectedView === "hero" ? "herobannerbody" : ""}">
            <div class="heading">Meet us here</div>
            <div class="view-container"></div>
        </div>
        `;

        const viewContainer = this.shadowRoot.querySelector('.view-container');
        const viewElement = document.createElement(view);
        viewContainer.appendChild(viewElement);
    }
}
customElements.define('section-widget', Sectionwidget);