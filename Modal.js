class Modal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.timeData = ['10:00 am', '11:00 am', '2:00 pm'];
        this.IsTimeSelected = null;
        this.Time = '';
        this.IsFormOpen = false;
        this.render();
    }

    connectedCallback() {
        this.updateTime();
    }

    static get observedAttributes() {
        return ['dataNumber'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'dataNumber') {
            this.dataNumber = Number(newValue);
        }
    }

    updateTime() {
        const date = new Date();
        this.Time = date.toLocaleTimeString();
    }

    handleTime(time) {
        this.IsTimeSelected = time;
        this.render();
    }

    handleModal() {
        this.dispatchEvent(new CustomEvent('modal-closed', { bubbles: true, composed: true }));
    }

    handleFormModal(value) {
        this.IsFormOpen = value;
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                /* Add your CSS styles here */
                .container {
                    display: flex;
                    flex-direction: column;
                }

                .calendar {
                    display: flex;
                    justify-content: space-between;
                }

                .dateInput {
                    width: 200px;
                    height: 30px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    padding: 5px;
                }

                .timeSlots h1 {
                    font-size: 25px;
                    color: rgb(96, 63, 240);
                    font-weight: 700;
                }

                .timeSlots .time {
                    font-size: 15px;
                    border: 1px solid rgb(96, 63, 240);
                    border-radius: 5px;
                    padding: 10px 60px;
                    margin: 10px;
                    cursor: pointer;
                }

                .timeSlots .time:hover {
                    transition-duration: .3s;
                    background-color: rgb(96, 63, 240);
                    color: white;
                }

                .timeSlots .selectedTime {
                    background-color: rgb(96, 63, 240);
                    color: white;
                }

                .timeSlots .nextBtn {
                    background-color: silver;
                    width: fit-content;
                    padding: 5px 10px;
                    font-size: 20px;
                    border-radius: 5px;
                    margin-top: 30px;
                    margin-left: 10px;
                    border: none;
                    cursor: pointer;
                }

                .timeSlots .cancelBtn {
                    background-color: transparent;
                    border: 1px solid silver;
                    width: fit-content;
                    padding: 5px 10px;
                    font-size: 20px;
                    border-radius: 5px;
                    margin-top: 30px;
                    margin-left: 10px;
                    cursor: pointer;
                    color: grey;
                }

                .ist {
                    display: flex;
                    margin-top: 10px;
                }
            </style>
            <div class="container">
                <div class="calendar">
                    <input type="date" class="dateInput" />
                </div>
                <div class="timeSlots">
                    <h1>Time Slots</h1>
                    ${this.timeData.map(
                        (item) => `
                            <div class="time ${this.IsTimeSelected === item ? 'selectedTime' : ''}" 
                                onclick="this.parentNode.host.handleTime('${item}')">
                                ${item}
                            </div>
                        `
                    ).join('')}
                    <div class="btns">
                        <button class="nextBtn" onclick="this.parentNode.host.handleFormModal(true)">Next</button>
                        <button class="cancelBtn" onclick="this.parentNode.host.handleModal()">x</button>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('modal-component', Modal);
