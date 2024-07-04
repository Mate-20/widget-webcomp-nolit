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
            .card {
                width: 453px;
                height: 530px;
                border-radius: 25px;
                background-color: white;
                display: flex;
                flex-direction: column;
                align-items: center;
                overflow: hidden;
            }
            .banner {
                width: 95%;
                height: 250px;
                border-bottom-left-radius: 50px;
                border-bottom-right-radius: 50px;
                filter: drop-shadow(1px 1px 4px rgb(111, 111, 111));
            }
            .date_location_nameContainer {
                padding: 10px 14px 0px 14px;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-evenly;
            }
            .dateContainer {
                background-color: #e3e2e1;
                border-radius: 9px;
                width: 60px;
                height: 78px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            .date {
                color: black;
                font-size: 20px;
                font-weight: 600;
            }
            .month {
                color: black;
                font-size: 16px;
                font-weight: 400;
            }
            .line {
                height: 60px;
                border-left: 1px solid #e3e2e1;
            }
            .name_locationContainer {
                display: flex;
                flex-direction: column;
                gap: 5px;
                width: 70%;
            }
            .locationContainer {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .location {
                font-size: 16px;
                color: #6E6F89;
                font-weight: 500;
            }
            .eventName {
                font-weight: 700;
                font-size: 25px;
                color: black;
            }
            .dividerLine {
                margin-top: 12px;
                width: 100%;
                border-top: 1px solid #E8EAF1;
            }
            .dateRange_typeContainer {
                display: flex;
                align-items: center;
                width: 95%;
                gap: 8px;
                padding: 10px;
            }
            .pill {
                border-radius: 6px;
                padding: 4px 8px;
                font-size: 14px;
                font-weight: 500;
            }
            .dateRange {
                background-color: #F5F5F5;
                color: #6A77A6;
            }
            .type1 {
                background-color: #FFF8E6;
                color: #CE9921;
            }
            .type2 {
                background-color: #F7E5EE;
                color: #6750A4;
            }
            .desc {
                width: 100%;
                color: #6E6F89;
                font-size: 13px;
                font-weight: 500;
                padding-left: 10px;
                margin-top :10px;
            }
.btnContainer{
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction : column;
   align-items : center;
   gap : 5px; 
}
.btn{
    background-color: #6750A4;
    border-radius: 3px;
    width : fit-content;
    color: white;
    padding: 10px 20px;
    border : none;
}
.closebtn{
    width : fit-content;
    background:none;
    color: black;
    border: none;
    cursor: pointer;
}
        </style>
        <div class="body">
        <div class="card">
            <img src="https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/2018/03/16130738/pic41-1024x681.jpg" alt="placeholder" class="banner" />
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
            <div class="dividerLine"></div>
            <div class="dateRange_typeContainer">
                <div class="pill dateRange">29 Jan - 5 Feb</div>
                <div class="pill type1">Tradeshow</div>
                <div class="pill type2">Attending</div>
            </div>
            <div class="desc">Amidst this gathering, immerse yourself in an atmosphere of collaboration and creative energy, as manufacturers, retailers, and distributors unite...</div>
            <div class="btnContainer">
                <button class="btn">Register</button>
                <button class="closebtn">Close</button>
            </div>
        </div>
        </div>
        `;
    }
}

customElements.define('popupportrait-view1', Popup1);