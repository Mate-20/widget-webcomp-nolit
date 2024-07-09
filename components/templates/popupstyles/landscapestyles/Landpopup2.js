class Landpopup2 extends HTMLElement{
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
    gap: 16px;
    padding: 12px;
    background-color: white;
    border-radius: 8px;
}
.details{
    display: flex;
    flex-direction: column;
    gap: 21px;
}
.banner{
    width: 350px;
    height: 100%;
    border-radius: 15px;
    filter: drop-shadow(1px 1px 4px rgb(109, 109, 109));
}
.eventName {
    font-size: 30px;
    font-weight: 700;
    color: black;
}
.location_dateContainer {
    margin-top: 8px;
    display: flex;
    flex-direction: column;
}

.locationContainer {
    display: flex;
    align-items: center;
    gap: 8px;
}

.location {
    color: #6E6F89;
    /* font-size: 12px; */
    font-weight: 500;
}

.dateContainer {
    margin-top: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.date {
    /* font-size: 10px; */
    color: #6E6F89;
    font-weight: 400;
}
.description{
    /* font-size: 10px; */
    color: #6E6F89;
    font-weight: 500;
    line-height: 20px;
}
.type_peopleContainer {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
}

.typeContainer {
    display: flex;
    align-items: center;
    gap: 8px;
}

.pill {
    border-radius: 6px;
    padding: 4px 8px;
    /* font-size: 12px; */
    font-weight: 500;
}

.type1 {
    background-color: #FFF8E6;
    color: #CE9921;
}

.type2 {
    background-color: #F7E5EE;
    color: #8C1D47;
}

.circles {
    display: flex;
}

.circle:hover {
    transform: scale(1.05);
    z-index: 1;
}
.image{
    width: 22px;
    height: 22px;
}
.circle {
    position: relative;
    cursor: pointer;
    /* width: 45px; */
    display: flex;
    padding : 5px;
    color: black;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    /* height: 45px; */
    border-radius: 50%;
    background-color: #fff;
    box-shadow: -2px -1px 7px rgba(0, 0, 0, 0.7), 2px 1px 7px rgba(0, 0, 0, 0.7);
    transition: transform 0.2s ease;
}

.circle::before {
    content: attr(data-name);
    position: absolute;
    bottom: 120%;
    left: 50%;
    white-space: nowrap;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 14px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
}

.circle:hover::before {
    opacity: 1;
}
.btn{
    margin-top: 20px;
    background-color: #6750A4;
    border-radius: 3px;
    color: white;
    border : none;
    padding: 10px 20px;
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
        <div class="details">
            <div class="eventName">Hampton Jazz Festival 2024</div>
          <div class="location_dateContainer">
            <div class="locationContainer">
                <img src="path/to/locationIcon" alt="location" />
                <div class="location">Corpus Christi, USA</div>
            </div>
            <div class="dateContainer">
                ${this.dateIcon()}
                <div class="date">1st Apr 2024 - 20th Apr 2024</div>
            </div>
          </div>
          <div class="type_peopleContainer">
            <div class="typeContainer">
              <div class="pill type1">Tradeshow</div>
              <div class="pill type2">Attending</div>
            </div>
            <div class="circles">
              <div class="circle" data-name="John Doe">
                JD
              </div>
              <div class="circle" style="margin-left: -5px;" data-name="Jane Smith">
                JD
              </div>
              <div class="circle" data-name="John Doe" style="margin-left: -5px;">
                JD
              </div>
              <div class="circle" style="margin-left: -5px;" data-name="Jane Smith">
                JD
              </div>
            </div>
          </div>
          <div class="desc">Amidst this gathering, immerse yourself in an atmosphere of collaboration and creative energy, as manufacturers, retailers, and distributors unite...</div>
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

customElements.define('popuplandscape-view2', Landpopup2);