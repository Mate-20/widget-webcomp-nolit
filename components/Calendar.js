class CalendarModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.data = null;
        this.fetchData();
        this.state = {
            calendarDate: new Date(),
            selectedTimeSlots: [],
            isDateClicked: false,
            selectedDate: "",
            selectedTimeSlot: "",
            isFormOpen: false,
            isDarkMode: false
        };
    }

    async fetchData() {
        try {
            const response = await fetch('../timeslots.json');
            this.data = await response.json();
            console.log(this.data)
            this.render();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    handleTimeSlot(slot) {
        this.state.selectedTimeSlot = slot;
        this.render();
    }

    handleFormModal(value) {
        this.state.isFormOpen = value;
        this.render();
    }

    daysInMonth(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    }

    getFirstDayOfMonth(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month, 1).getDay();
    }

    handlePrevMonth() {
        const prevMonth = new Date(this.state.calendarDate.getFullYear(), this.state.calendarDate.getMonth() - 1, this.state.calendarDate.getDate(), 1);
        this.state.calendarDate = prevMonth;
        this.render();
    }

    handleNextMonth() {
        const nextMonth = new Date(this.state.calendarDate.getFullYear(), this.state.calendarDate.getMonth() + 1, this.state.calendarDate.getDate(), 1);
        this.state.calendarDate = nextMonth;
        this.render();
    }

    handleThemeChange() {
        this.state.isDarkMode = !this.state.isDarkMode;
        this.render();
    }

    renderDays(){
        const daysContainer = document.createElement('div');
        const daysCount = this.daysInMonth(calendarDate);
        const firstDay = this.getFirstDayOfMonth(calendarDate);
    
        const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        dayNames.forEach((dayName, i) => {
            const dayNameElement = document.createElement('div');
            dayNameElement.textContent = dayName;
            dayNameElement.classList.add(styles.dayname, isDarkMode ? styles.daynameDark : "");
            dayNameElement.setAttribute('key', `dayName-${i}`);
            daysContainer.appendChild(dayNameElement);
        });
    
        const scheduledDates = this.data.MarchSchedule.map(entry => entry.date);
    
        for (let i = 0; i < firstDay; i++) {
            const emptyDayElement = document.createElement('div');
            emptyDayElement.classList.add(styles.emptyday);
            emptyDayElement.setAttribute('key', `empty-${i}`);
            daysContainer.appendChild(emptyDayElement);
        }
    
        for (let i = 1; i <= daysCount; i++) {
            const isTodaysDate = i === calendarDate.getDate() && calendarDate.getMonth() === new Date().getMonth();
            const isScheduledDate = scheduledDates.some(date => {
                const scheduledDate = new Date(date);
                return i === scheduledDate.getDate() && calendarDate.getMonth() === scheduledDate.getMonth() && calendarDate.getFullYear() === scheduledDate.getFullYear();
            });
    
            const todaysDateClass = isTodaysDate ? (isDarkMode ? styles.todaysDateDark : styles.todaysDateLight) : '';
            let classNames = `${styles.calendardatebox} ${todaysDateClass} ${isScheduledDate ? styles.scheduledDate : ''} `;
            
            const dayElement = document.createElement('div');
            dayElement.textContent = i;
            dayElement.classList.add(classNames);
            dayElement.setAttribute('key', `day-${i}`);
            dayElement.addEventListener('click', () => handleClick(i));
            daysContainer.appendChild(dayElement);
        }
    
        return daysContainer;
    };
    
    handleClick(day){
        const currentDateObject = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day);
        const matchingEntry = this.data.MarchSchedule.find(entry => {
            const entryDate = new Date(entry.date);
            return entryDate.getDate() === currentDateObject.getDate() && entryDate.getFullYear() === currentDateObject.getFullYear() && entryDate.getMonth() === currentDateObject.getMonth();
        });
        const timeSlots = matchingEntry ? matchingEntry.timeSlots : [];
        setSelectedDate(currentDateObject);
        setIsDateClicked(timeSlots.length > 0);
        setSelectedTimeSlots(timeSlots);
    };
    

    render() {
        this.shadowRoot.innerHTML = `
            <div>
                ${!this.state.isFormOpen && `
                    <div class="container ${this.state.isDarkMode ? 'dark' : ''}">
                        <div class="calendar">
                        <button @click="${this.handlePrevMonth}"><img src="PrevArrowIcon" alt="prev"/></button>
                        <h2 style="color: ${this.state.isDarkMode ? 'white' : 'black'}">${this.calendarDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                        <button @click="${this.handleNextMonth}"><img src="NextArrowIcon" alt="next"/></button>
                        </div>
                        ${this.state.isDateClicked ? `
                            <div class="timeSlotsContainer">
                                <!-- Time slots rendering logic goes here -->
                            </div>
                        ` : ''}
                        <div class="themeIcon" @click="${this.handleThemeChange}">

                        </div>
                    </div>
                `}
                ${this.state.isFormOpen && `
                    <div>
                        <!-- Render the RegisterForm component here -->
                    </div>
                `}
            </div>
        `;
    }
}

customElements.define('calendar-modal', CalendarModal);
