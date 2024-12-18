class Porpopup2 extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        // Initialize properties if needed
        this.event = JSON.parse(this.getAttribute('event'))
        this.customizedData = JSON.parse(this.getAttribute('customizedData'))
        this.widgetid = JSON.parse(this.getAttribute('widgetid'));
        console.log("card data : ", this.event)
        console.log("customized data : ", this.customizedData)
        this.render();
    }
    connectedCallback() {
        // if (!localStorage.getItem('popupShown')) {
            this.render();
            this.addEventListeners(); // Add event listeners after rendering
        // }
    }
    addEventListeners() {
        this.shadowRoot.querySelector('.closebtn').addEventListener('click', () => this.closePopup());
    }
    closePopup() {
        // Setting it true so that it can know that popup was already shown once
        // localStorage.setItem('popupShown', 'true');
        this.remove(); // Remove the popup from the DOM
    }
    formatDate(date) {
        const dateObj = new Date(date);
        const day = dateObj.getDate();
        const month = dateObj.toLocaleString('en-US', { month: 'short' });
        const year = dateObj.getFullYear();

        // Function to get the appropriate suffix for the day
        const getDayWithSuffix = (day) => {
            const suffixes = ['th', 'st', 'nd', 'rd'];
            const value = day % 100;
            return day + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]);
        };

        return `${getDayWithSuffix(day)} ${month} ${year}`;
    };
    
    render() {
        const buttonSettings = this.customizedData.selectedBtn === "primary" ? 
        this.customizedData.buttonSettings.primary : 
        this.customizedData.buttonSettings.secondary;

        // const closeButtonSettings = this.customizedData.selectedBtn === "primary" ? 
        // this.customizedData.closeButtonSetting.primary : 
        // this.customizedData.closeButtonSetting.secondary;
        this.shadowRoot.innerHTML = `
        <style>
    .body {
        box-sizing :border-box;
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
        min-width: 450px;
        max-width: 450px;
        min-height: 500px;
        max-height: 500px;
        border-radius: ${this.customizedData.cardBorderRadius}px;
        background-color: ${this.customizedData.cardBgColor};
        padding: 22px 12px;
        display: flex;
        flex-direction: column;
        gap : 10px;
    }
    
    .eventName {
        line-height : ${this.customizedData.fontSettings?.heading?.fontSize}px;
        font-size: ${this.customizedData.fontSettings?.heading?.fontSize}px;
        font-weight: ${this.customizedData.fontSettings?.heading?.fontWeight};
        color: ${this.customizedData.fontSettings?.heading?.fontColor};
        font-family : ${this.customizedData.fontSettings?.heading?.fontFamily};
        min-height: 40px;
        max-height: 40px;
        position: relative;
    }
    .eventName::before{
        content: attr(data-name);
        position: absolute;
        top: 40%;
        left: 30%;
        transform: translateX(-50%);
        background-color: rgba(0, 0, 0, 0.8);
        color: #fff;
        max-width : 200px;
        padding: 3px 5px;
        border-radius: 5px;
        font-size: 12px;
        opacity: 0;
        font-weight : 400;
        pointer-events: none;
        transition: opacity 0.2s ease;
    }
    .eventName:hover::before {
        opacity: 1;
    }
    .banner {
        border-radius: 8px;
        width: 100%;
        height: 200px;
    }
    
    .location_dateContainer {
        min-height: 40px;
        max-height: 40px;
        display: flex;
        flex-direction: column;
    }
    
    .locationContainer {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .location {
        line-height : ${this.customizedData.fontSettings?.subheading?.fontSize}px;
        color: ${this.customizedData.fontSettings?.subheading?.fontColor};
        font-size: ${this.customizedData.fontSettings?.subheading?.fontSize}px;
        font-family : ${this.customizedData.fontSettings?.subheading?.fontFamily};
        font-weight: ${this.customizedData.fontSettings?.subheading?.fontWeight};
    }
    
    .dateContainer {
        margin-top: 8px;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .date {
        line-height : ${this.customizedData.fontSettings?.subheading?.fontSize}px;
        font-size: ${this.customizedData.fontSettings?.subheading?.fontSize}px;
        color: ${this.customizedData.fontSettings?.subheading?.fontColor};
        font-family : ${this.customizedData.fontSettings?.subheading?.fontFamily};
        font-weight: ${this.customizedData.fontSettings?.subheading?.fontWeight};
    }
    
    .dividerLine {
        width: 100%;
        border-top: 1px solid #E8EAF1;
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
        line-height : ${this.customizedData.fontSettings?.body?.fontSize}px;
        font-size:${this.customizedData.fontSettings?.body?.fontSize}px;
        font-weight: ${this.customizedData.fontSettings?.body?.fontWeight};
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
    
    .image {
        width: 25px;
        height: 25px;
    }
    
    .circle {
        position: relative;
        cursor: pointer;
        padding: 5px;
        display: flex;
        color: black;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
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
    .desc {
        width: 100%;
        line-height : ${this.customizedData.fontSettings?.body?.fontSize}px;
        color: ${this.customizedData.fontSettings?.body?.fontColor};
        font-size: ${this.customizedData.fontSettings?.body?.fontSize}px;
        font-weight: ${this.customizedData.fontSettings?.body?.fontWeight};
        font-family : ${this.customizedData.fontSettings?.body?.fontFamily};
        line-height : 10px;
        min-height: 70px;
        max-height: 70px;
        word-wrap: break-word;
        overflow: hidden;
    }
    .btnContainer {
        width: 100%;
        display: flex;
        flex-direction : row;
        justify-content:center;
        align-items: center;
        gap: 5px;
    }
    .btn{
    font-size:${this.customizedData.fontSettings?.subheading?.fontSize}px;
    line-height : ${this.customizedData.fontSettings?.subheading?.fontSize}px;
    background-color: ${buttonSettings.buttonColor};
    border-radius: ${buttonSettings.borderRadius}px;
    color: ${buttonSettings.fontColor};
    width : fit-content;
    border: 1px solid ${buttonSettings.borderColor};
    padding: 10px 20px;
    text-decoration:none;
}
    .closebtn {
    width : fit-content;
    background-color: #8F8F8F1F;
    color: #171717;
    border-radius: 4px;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    }
</style>

<div class="body">
    <div class="card">
        <div class="eventName" data-name="${this.event.name}">
        ${this.event.name.length > 35 ? `${this.event.name.substring(0, 35)}...`:this.event.name}
        </div>
        <div class="location_dateContainer">
            <div class="locationContainer">
                ${this.locationIcon(this.customizedData.fontSettings?.subheading?.fontColor)}
                <div class="location">${this.event.location_city}</div>
            </div>
            <div class="dateContainer">
                ${this.dateIcon(this.customizedData.fontSettings?.subheading?.fontColor)}
                <div class="date">${this.formatDate(this.event.start_date)}-${this.formatDate(this.event.end_date)}</div>
            </div>
        </div>
        <img src=${this.event.logoUrl} alt="placeholder" class="banner" />
        <div class="dividerLine"></div>
        <div class="type_peopleContainer">
            <div class="typeContainer">
                <div class="pill type1">${this.event.type === "MAIN" ? "Main Event" : "Side Event"}</div>  
                <div class="pill type1">${this.event.event_type}</div>
                <div class="pill type2">${this.event.format}</div>
            </div>

        </div>
         <div class="desc">${this.event.description.substring(0,250)}</div>
        <div class="btnContainer">
            <a class="btn" href=${`https://console.whr.ai/detailpage?widgetId=${this.customizedData.widgetId}&eventId=${this.event.id}`} target="_blank">${buttonSettings.buttonText}</a>
           <button class="closebtn">Close</button>
        </div>
    </div>
</div>

        `;
    }
    locationIcon(color) {
        return `
<svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill=${color}><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/></svg>
`
    }
    dateIcon(color) {
        return `
      <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 -960 960 960" width="15"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" fill=${color} /></svg>
`
    }
    
}

customElements.define('popupportrait-view2', Porpopup2);

{/* <div class="circles">
<div class="circle" data-name="John Doe">JD</div>
<div class="circle" data-name="Jane Smith" style="margin-left: -5px;">JD</div>
<div class="circle" data-name="John Doe" style="margin-left: -5px;">JD</div>
<div class="circle" data-name="Jane Smith" style="margin-left: -5px;">JD</div>
</div> */}