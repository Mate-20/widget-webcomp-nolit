class Porpopup3 extends HTMLElement{
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
    width: 450px;
    height: 530px;
    border-radius: 8px;
    background-color: white;
    padding: 12px 14px 24px 12px;
}
.banner{
    height: 240px;
    width: 100%;
    border-radius: 8px;
}
.eventName{
    margin-top: 20px;
    color: #6750A4;
    font-size: 25px;
    font-weight: 700;
}
.location_dateContainer{
    margin-top: 12px;
}
.locationContainer{
    display: flex;
    align-items: center;
    gap: 8px;
    color: #6E6F89;
    font-size: 15px;
    font-weight: 500;
}
.dateContainer{
    margin-top: 6px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #6E6F89;
    font-weight: 400;
}
.desc{
    width: 100%;
    color: #6E6F89;
    font-weight: 500;
    margin-top: 20px;
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
        <div class="eventName">Join Gifts World Expo 2024</div>
        <div class="location_dateContainer">
          <div class="locationContainer">
            <div class="location">Corpus Christi, USA</div>
          </div>
          <div class="dateContainer">
            ${this.dateIcon()}
            <div class="date">1st Apr 2024 - 20th Apr 2024</div>
          </div>
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
    dateIcon(){
        return `
                <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 -960 960 960" width="15"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" fill="black" /></svg>
        `
    }
}

customElements.define('popupportrait-view3', Porpopup3);