class Popupwidget extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.render(); // Initial render
    }
    addEventListeners() {
        this.shadowRoot.querySelector('.closebtn').addEventListener('click', () => this.closePopup());
    }
    closePopup() {
        this.remove(); // Remove the popup from the DOM
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
        .popup{
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            height: 500px;
            width: 400px;
            border-radius: 10px;
            background-color: #1a1a1a;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
        }
        .poster{
            width: 100%;
            height:200px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }
        .eventname{
            color: white;
            font-size: 35px;
            font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        }
        .description{
            color: white;
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
            text-align: center;
        }
        .registerbtn{
            padding: 5px 20px;
            font-size: 20px;
            background-color: #6750a4;
            color: white;
            border-radius: 4px;
            border: none;
            cursor: pointer;
        }
        .closebtn{
            background:none;
            color: white;
            border: none;
            cursor: pointer;
        }
        </style>
        <div class="popup">
            <img class="poster" src="https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/2018/03/16130738/pic41-1024x681.jpg" alt="">
            <div class="eventname">Theatre Festival</div>
            <div class="description">The Delhi Theatre scene is waiting in the wings for a renaissance, and we have taken the onus to make it happen.</div>
            <button class="registerbtn" type="button">Register</button>
            <button class="closebtn">Close</button>
        </div>
        `
    }
}

customElements.define('popup-widget', Popupwidget);