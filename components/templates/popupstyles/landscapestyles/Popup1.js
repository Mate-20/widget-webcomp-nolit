class Popup1 extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        if (!localStorage.getItem('popupShown')) {
            this.render();
            this.addEventListeners(); // Add event listeners after rendering
        }
    }
    addEventListeners() {
        this.shadowRoot.querySelector('.closebtn').addEventListener('click', () => this.closePopup());
    }
    closePopup() {
        // Setting it true so that it can know that popup was already shown once
        localStorage.setItem('popupShown', 'true');
        this.remove(); // Remove the popup from the DOM
    }

    
    render() {
        this.shadowRoot.innerHTML = `
        <style>
            .body{
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999;
        }
.card{
    width: 800px;
    height:400px;
    display: flex;
    gap: 10px;
    align-items: flex-start;
    padding-left: 10px;
    /* padding: 0px 12px 12px 10px; */
    background-color: white;
    border-radius: 10px;
}
.banner{
    width: 380px;
    height: 385px;
    border-bottom-left-radius: 100px;
    border-bottom-right-radius: 100px;
    filter: drop-shadow(1px 1px 4px rgb(109, 109, 109));
}
.detailsContainer{
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 10px;
}
.date_location_nameContainer{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.dateContainer{
    background-color: #F6F6F6;
    border-radius: 9px;
    width: 60px;
    height: 78px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.date{
    color: black;
    font-size: 20px;
    font-weight: 600;
}
.month{
    color: black;
    font-weight: 400;
}
.line{
    height: 70px;
    border-left: 1px solid #F6F6F6;
}
.name_locationContainer{
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 70%;
}
.locationContainer{
    display: flex;
    align-items: center;
    gap: 8px;
}
.location{
    color: #6E6F89;
    font-weight: 500;
}
.eventName{
    font-weight: 700;
    font-size: 25px;
    color: black;
}
.description{
    /* font-size: 10px; */
    color: #6E6F89;
    font-weight: 500;
    line-height: 20px;
}
.dateRange_typeContainer{
    margin-top: 20px;
    display: flex;
    align-items: center;
    width: 100%;
    gap: 7px;
}
.pill{
    border-radius: 6px;
    padding: 4px 8px;
    font-weight: 500;
}
.dateRange{
    background-color: #F5F5F5;
    color: #6A77A6;
}
.type1{
    background-color: #FFF8E6;
    color: #CE9921;
}
.type2{
    background-color: #F7E5EE;
    color: #6750A4;
}
.btn{
    margin-top: 20px;
    background-color: #6750A4;
    border-radius: 3px;
    color: white;
    padding: 10px 20px;
    border : none;
}
    .closebtn{
    background:none;
    color: black;
    border: none;
    cursor: pointer;
}
        </style>
    <div class="body">
        <div class="card">
            <img src="https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/2018/03/16130738/pic41-1024x681.jpg" alt="banner" class="banner" />
            <div class="detailsContainer">
            <div class="date_location_nameContainer">
                <div class="dateContainer">
                    <span class="date">29</span>
                    <span class="month">Jan</span>
                </div>
                <div class="line"></div>
            <div class="name_locationContainer">
            <div class="locationContainer">
                <img src="https://via.placeholder.com/20" alt="location" />
                <div class="location">Corpus Christi, USA</div>
            </div>
            <div class="eventName">Join Gifts World Expo 2024</div>
            </div>
          </div>
          <div class="desc">Amidst this gathering, immerse yourself in an atmosphere of collaboration and creative energy, as manufacturers, retailers, and distributors unite...</div>
          <div class="dateRange_typeContainer">
            <div class="pill dateRange">29 Jan - 5 Feb</div>
            <div class="pill type1">Tradeshow</div>
            <div class="pill type2">Attending</div>
          </div>
          <button class="btn">Register</button>
          <button class="closebtn">Close</button>
        </div>
        </div>
    </div>
        `;
    }
}

customElements.define('popuplandscape-view1', Popup1);