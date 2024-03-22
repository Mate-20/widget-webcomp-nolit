(()=>{var n={88:()=>{class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.image="https://media.licdn.com/dms/image/C4D12AQGFCeWmvrviVA/article-cover_image-shrink_600_2000/0/1635965553910?e=2147483647&v=beta&t=WP5YW7PcD57xmcjDQ4Fse6NR3xaO8XZxWwuyDdyDvmU",this.eventname="Theatre",this.date="12-1-24",this.location="Berlin, Germany",this.cardcolor="white",this.cardradius="0px",this.render()}connectedCallback(){const n=new CustomEvent("modal-open",{detail:{open:!0},bubbles:!0,composed:!0});this.shadowRoot.querySelectorAll(".card").forEach((t=>{t.addEventListener("click",(()=>{this.dispatchEvent(n)}))}))}static get observedAttributes(){return["image","eventname","date","location","cardcolor","cardradius"]}attributeChangedCallback(n,t,e){this[n]=e,this.render()}render(){this.shadowRoot.innerHTML=`\n      <style>\n      .card{\n        width:330px;\n        cursor: pointer;\n    }\n    .img img{\n      width:330px;\n      height:200px;\n    }\n    .card:hover{\n        transition-duration: .2s;\n        filter: drop-shadow(1px 1px 5px rgb(245, 245, 245));\n    }\n    .content{\n        padding: 20px;\n    }\n    .tag{\n        background-color: rgb(253, 219, 109);\n        border-radius: 30px;\n        width: fit-content;\n        padding: 5px 20px;\n        font-weight: bold;\n        color: rgb(39, 39, 39);\n        font-size: 20px;\n    }\n    .date{\n        margin-top: 20px;\n        color: rgb(39, 39, 39);\n        font-size: 20px;\n        \n    }\n    .eventName{\n        font-size: 25px;\n        font-weight: bold;\n        color: rgb(96, 63, 240);\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n    }\n    .location{\n        font-size: 20px;\n        margin-top: 60px;\n        display: flex;\n    }\n    .location div{\n        margin-right: 10px;\n    }\n    .btn{\n        margin-top: 10px;\n        display: flex;\n        border: 2px solid rgb(96, 63, 240);\n        border-radius: 20px;\n        width: fit-content;\n        padding: 5px 20px;\n        align-items: center;\n    }\n    .btn div{\n        color: rgb(96, 63, 240);\n        margin-right: 10px;\n    }\n    .btn:hover{\n        transition-duration: .3s;\n        background-color:rgb(96, 63, 240) ;\n    }\n    .btn:hover div{\n        transition-duration: .3s;\n        color: white;\n    }\n    \n      </style>\n      <div class="card" style="background-color: ${this.cardcolor}; border-radius:${this.cardradius}">\n        <div class="img">\n          <img src="${this.image}" alt="author" style="border-top-left-radius:${this.cardradius}; border-top-right-radius: ${this.cardradius};">\n        </div>\n        <div class="content">\n          <div class="tag">Events</div>\n          <div class="date">${this.date}</div>\n          <div class="eventName">${this.eventname}</div>\n          <div class="location">\n            <div>Location Icon</div>\n            <div>${this.location}</div>\n          </div>\n          <div class="btn" @click="${this.handlemodal}">\n            <div>Register</div>\n          </div>\n        </div>\n      </div>\n    `}}customElements.define("card-component",n)},80:()=>{class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.data=null,this.fetchData()}async fetchData(){try{const n=await fetch("http://127.0.0.1:8080/configurationsSection.json");this.data=await n.json(),this.render()}catch(n){console.error("Error fetching data:",n)}}render(){if(!this.data)return void(this.shadowRoot.innerHTML="<div>Loading...</div>");const n=this.data.widget;this.shadowRoot.innerHTML=`\n            ${"page"===n?`<page-widget data='${JSON.stringify(this.data)}'></page-widget>`:"section"===n?`<section-widget data='${JSON.stringify(this.data)}'></section-widget>`:`<sticky-widget data='${JSON.stringify(this.data)}'></sticky-widget>`}\n        `}}customElements.define("event-geni",n)},840:()=>{class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.timeData=["10:00 am","11:00 am","3:00 pm"],this.IsTimeSelected="",this.Time="",this.IsFormOpen=!1,this.render()}get datanumber(){return this.getAttribute("datanumber")}set datanumber(n){this.setAttribute("datanumber",n)}connectedCallback(){this.updateTime(),this.attachEventListeners()}attachEventListeners(){this.shadowRoot.addEventListener("click",(n=>{const t=n.target;if(t.classList.contains("time")){const n=t.textContent.trim();this.handleTime(n)}if(t.classList.contains("nextBtn")&&(this.IsFormOpen?this.handleFormModal(!1):this.handleFormModal(!0)),t.classList.contains("cancelBtn")){const n=new CustomEvent("modal-open",{detail:{open:!1},bubbles:!0,composed:!0});this.dispatchEvent(n)}}))}handleTime(n){this.IsTimeSelected=n,this.render()}handleFormModal(n){this.IsFormOpen=n,this.render()}updateTime(){const n=new Date;this.Time=n.toLocaleTimeString()}handleModal(){this.dispatchEvent(new CustomEvent("modal-closed",{bubbles:!0,composed:!0}))}render(){this.shadowRoot.innerHTML=`\n            <style>\n            .container {\n                width:80%;\n                display: flex;\n                justify-content: center;\n                background-color: rgb(238, 238, 238);\n                padding: 50px;\n                border-radius: 10px;\n            }\n                .calendar {\n                    display: flex;\n                    justify-content: space-between;\n                }\n\n                .dateInput {\n                    width: 200px;\n                    height: 30px;\n                    border: 1px solid #ccc;\n                    border-radius: 5px;\n                    padding: 5px;\n                }\n                .timeSlots h1 {\n                    font-size: 25px;\n                    color: rgb(96, 63, 240);\n                    font-weight: 700;\n                }\n\n                .timeSlots .time {\n                    font-size: 15px;\n                    border: 1px solid rgb(96, 63, 240);\n                    border-radius: 5px;\n                    padding: 10px 60px;\n                    margin: 10px;\n                    cursor: pointer;\n                }\n\n                .timeSlots .time:hover {\n                    transition-duration: .3s;\n                    background-color: rgb(96, 63, 240);\n                    color: white;\n                }\n\n                .timeSlots .selectedTime {\n                    background-color: rgb(96, 63, 240);\n                    color: white;\n                }\n\n                .timeSlots .nextBtn {\n                    background-color: silver;\n                    width: fit-content;\n                    padding: 5px 10px;\n                    font-size: 20px;\n                    border-radius: 5px;\n                    margin-top: 30px;\n                    margin-left: 10px;\n                    border: none;\n                    cursor: pointer;\n                }\n\n                .timeSlots .cancelBtn {\n                    background-color: transparent;\n                    border: 1px solid silver;\n                    width: fit-content;\n                    padding: 5px 10px;\n                    font-size: 20px;\n                    border-radius: 5px;\n                    margin-top: 30px;\n                    margin-left: 10px;\n                    cursor: pointer;\n                    color: grey;\n                }\n\n                .ist {\n                    display: flex;\n                    margin-top: 10px;\n                }\n            </style>\n            ${this.IsFormOpen?`<register-form datanumber="${this.datanumber}" class="container"></register-form>`:`\n                    <div class="container">\n                        <div class="calendar">\n                            <input type="date" class="dateInput" />\n                        </div>\n                        <div class="timeSlots">\n                            <h1>Time Slots</h1>\n                            ${this.timeData.map((n=>'<div class="time '+(this.IsTimeSelected===n?"selectedTime":"")+'">'+n+"</div>")).join("")}\n                            \n                            <div class="btns">\n                                <button class="nextBtn">Next</button>\n                                <button class="cancelBtn">x</button>\n                            </div>\n                        </div>\n                    </div>\n                `}\n        `}}customElements.define("modal-component",n)},416:()=>{class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.data=JSON.parse(this.getAttribute("data")),console.log(this.data),this.render()}handlemodal(n){this.IsModalOpen=n,this.render()}render(){this.shadowRoot.innerHTML=`\n          <style>\n              .container {\n                height:100%;\n                position:relative;\n                  padding: 50px;\n              }\n              .blur {\n                  height: 100vh;\n                  overflow: hidden;\n                  filter: blur(3px);\n              }\n              .heading {\n                  font-size: 35px;\n                  color: white;\n                  font-weight: 900;\n              }\n              .cardContainer {\n                height:100%;\n                display: grid;  \n                row-gap:30px;\n                margin-top: 30px;\n                grid-template-columns: repeat(3, 1fr);\n                justify-items: center;\n              }\n              .modal {\n                  width : 90%;  \n                  position: absolute;\n                  left: 50%;\n                  top: 100px;\n                  transform: translate(-50%, 0%);\n              }\n            \n              @media screen and (max-width: 1560px) {\n                .cardContainer {\n                    grid-template-columns: repeat(3, 1fr); /* Two columns in each row when screen width is at most 1200px */\n                }\n            }\n            \n              @media screen and (max-width: 1200px) {\n                .cardContainer {\n                    grid-template-columns: repeat(2, 1fr); /* Two columns in each row when screen width is at most 1200px */\n                }\n            }        \n          </style>\n\n          <div class="container" style="background-color: ${this.data.layoutBgColor};">\n              <div class="heading">Your Events</div>\n              <div class="cardContainer">\n                  ${this.data.eventData.map(((n,t)=>`\n                      <card-component\n                          image="${n.imageUrl}"\n                          date="${n.startDate}"\n                          eventName="${n.name}"\n                          location="${n.location}"\n                          key="${t}"\n                          cardcolor = "${this.data.cardBgColor}"\n                          cardradius = "${this.data.cardRadius}"\n                          @modal-open="${this.handlemodal}"\n                      ></card-component>\n                  `)).join("")}\n              </div>    \n          </div>  \n      `}}customElements.define("multiple-data",n)},520:()=>{class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.data=JSON.parse(this.getAttribute("data")),this.render()}render(){this.shadowRoot.innerHTML=`\n          <style>\n              .container {\n                display:flex;\n                flex-direction:column;\n                align-items:center;\n                  padding: 50px;\n              }\n              .eventContainer {\n                  display: flex;\n                  align-items:center;\n                  justify-content: center;\n              }\n              .eventDetails {\n                  width: 30%;\n              }\n              .name {\n                  font-size: 50px;\n                  color: rgb(96, 63, 240);\n                  margin-top: 20px;\n                  font-weight: 800;\n              }\n              .date {\n                  background-color: rgb(253, 219, 109);\n                  width: fit-content;\n                  padding: 5px 10px;\n                  border-radius: 20px;\n                  margin-top: 20px;\n                  color: rgb(39, 39, 39);\n                  font-size: 20px;\n              }\n              .location {\n                  font-size: 20px;\n                  margin-top: 60px;\n                  margin-bottom: 10px;\n                  display: flex;\n                  color:white;\n              }\n              .desc{\n                color:white;\n              }\n              .heading {\n                  font-size: 35px;\n                  color: white;\n                  font-weight: 900; \n              }\n              .eventImg {\n                margin-top:10px;\n                  filter: drop-shadow(1px 1px 6px rgb(65, 65, 65));\n              }\n              .schedule {\n                  color: rgb(96, 63, 240);\n                  font-size: 30px;\n                  font-weight: bold;\n                  margin-bottom: 10px;\n              }\n              .modal {\n                  width: 50vw;\n                  margin-top: 100px;\n              }\n              @media screen and (max-width: 960px) {\n                .eventDetails {\n                    width: 100%; /* Adjust the width of event details for smaller screens */\n                  }\n                  .eventContainer {\n                    flex-direction: column; /* Change flex direction for smaller screens */\n                  }\n                  .modal {\n                    width: fit-content;\n                    margin-top: 100px;\n                }\n            }\n          </style>\n          <div class="body">\n          <div class="container" style="background-color: ${this.data.layoutBgColor};">\n                      <div class="eventContainer">\n                          <div class="eventDetails">\n                              <div class="date">${this.data.promotedData[0].startDate}</div>\n                              <div class="name">${this.data.promotedData[0].name}</div>\n                              <div class="location">\n                                  <div style="margin-top: 2px;"><io-location-outline></io-location-outline></div>\n                                  <div>${this.data.promotedData[0].location}</div>\n                              </div>\n                              <div class="desc">${this.data.promotedData[0].description}</div>\n                          </div>\n                          <div class="eventImg">\n                              <img src="${this.data.promotedData[0].imageUrl}" width="350" height="300" alt="Pictureauthor" style="border-radius: 10px;">\n                          </div>\n                      </div>\n              </div>\n          </div>\n      `}}customElements.define("promoted-event",n)},204:()=>{class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.render()}connectedCallback(){this.render()}get datanumber(){return this.getAttribute("datanumber")}set datanumber(n){this.setAttribute("datanumber",n)}handleFormModal(){this.dispatchEvent(new CustomEvent("close-modal",{bubbles:!0,composed:!0}))}render(){this.shadowRoot.innerHTML=`\n          <style>\n              /* Add your CSS styles here */\n              .backBtn {\n                  background-color: rgb(216, 216, 216);\n                  width: fit-content;\n                  padding: 10px;\n                  border-radius: 40%;\n                  cursor: pointer;\n              }\n              .container {\n                  display: flex;\n                  justify-content: center;\n                  margin-top: 40px;\n              }\n              .content {\n                  width: 100%;\n              }\n              .img img{\n                width: 100%;\n                height: 40%;\n              }\n              .date {\n                  font-size: 20px;\n                  background-color: rgb(253, 219, 109);\n                  padding: 5px 10px;\n                  width: fit-content;\n                  border-radius: 30px;\n              }\n              .eventName {\n                  font-size: 50px;\n                  color: rgb(96, 63, 240);\n                  margin-top: 20px;\n                  font-weight: 800;\n              }\n              .location {\n                  margin-top: 20px;\n                  font-size: 20px;\n              }\n              .desc {\n                  margin-top: 10px;\n              }\n              .formHeading {\n                  margin-top: 50px;\n                  font-size: 40px;\n                  color: rgb(96, 63, 240);\n              }\n              .form {\n                  margin-top: 20px;\n              }\n              .input {\n                  margin-top: 10px;\n                  border: none;\n                  background-color: rgb(212, 212, 212);\n                  font-size: 25px;\n                  width: 80%;\n                  border-radius: 10px;\n                  padding: 5px 10px;\n              }\n              .email {\n                  margin-top: 20px;\n              }\n              .submitBtn {\n                  font-size: 20px;\n                  margin-top: 20px;\n                  border: 2px solid rgb(96, 63, 240);\n                  border-radius: 20px;\n                  width: fit-content;\n                  padding: 5px 20px;\n                  background-color: transparent;\n                  cursor: pointer;\n                  color: rgb(96, 63, 240);\n              }\n              .submitBtn:hover {\n                  transition-duration: .3s;\n                  color: white;\n                  background-color: rgb(96, 63, 240);\n              }\n          </style>\n          <div>\n              <div class="backBtn" @click=${this.handleFormModal}>\n                  <fa-arrow-left-long></fa-arrow-left-long>\n              </div>\n              <div class="container">\n                  <div class="details">\n                      <div class="content">\n                          <div class="date">February 7, 2024</div>\n                          ${this.datanumber>="2"?'\n                              <div class="eventName">Marathon</div>\n                              <div class="location">Berlin, Germany</div>\n                          ':""}\n                          <div class="desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat delectus optio sequi perspiciatis, animi nulla architecto ipsam nisi deserunt, deleniti enim dolorum quam numquam in quasi blanditiis ipsum voluptas veniam?</div>\n                      </div>\n                      <h1 class="formHeading">Register Yourself</h1>\n                      <form class="form">\n                          <div class="name">Name</div>\n                          <input class="input"></input>\n                          <div class="email">Email</div>\n                          <input class="input"></input>\n                          <div>\n                              <button type="submit" class="submitBtn">Register</button>\n                          </div>\n                      </form>\n                  </div>\n                  ${this.datanumber>="2"?'\n                      <div class="img">\n                          <img\n                              src="https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_SS.width-1300.jpg"\n                              alt="Author"\n                              style="border-radius: 20px;"\n                          />\n                      </div>\n                  ':""}\n              </div>\n          </div>\n      `}}customElements.define("register-form",n)},104:()=>{class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.data=JSON.parse(this.getAttribute("data")),this.render()}render(){let n=!1;this.data.promotedData.length>0&&(n=!0),this.shadowRoot.innerHTML=`${n?`<promoted-event data='${JSON.stringify(this.data)}'></promoted-event>`:""}\n        <multiple-data data='${JSON.stringify(this.data)}'></multiple-data>`}}customElements.define("page-widget",n)},172:()=>{class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.data=JSON.parse(this.getAttribute("data")),this.render()}render(){this.shadowRoot.innerHTML=`\n        <section-data data='${JSON.stringify(this.data)}'></section-data>\n        `}}customElements.define("section-widget",n)},692:()=>{class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),console.log("sticky widget")}connectedCallback(){this.data=JSON.parse(this.getAttribute("data")),console.log(this.data),this.render()}render(){this.shadowRoot.innerHTML=`\n        <style>\n            .navbar{\n                position: sticky;\n                top: 0;\n                width:100%;\n                display:flex;\n                align-items:center;\n                justify-content:center;\n                background-color: ${this.data.layoutBgColor};\n                color:${this.data.fontColor};\n                height:${this.data.height}; \n                font-size:${this.data.fontSize};\n                \n            }\n        </style>\n            <div class="navbar">\n                <div>${this.data.eventData[0].name}</div>\n            </div>\n        `}}customElements.define("sticky-widget",n)},888:n=>{n.exports={widget:"page",eventData:[{id:1,name:"HORN Ok Food Festival",description:"A food fest including a variety of drinks and food that you will savour for your entire life",location:"Delhi",startDate:"09/20/2024",endDate:"09/21/2024",tags:["food","festival","drinks","gathering","hornok","horn","fest"],logo:"https://1000logos.net/wp-content/uploads/2021/11/logo-Paramount.png",imageUrl:"https://i.pinimg.com/originals/0f/ab/ea/0fabead80613002cfed665309f3dd6cc.jpg"},{id:2,name:"Great Indian Food Festival",description:"A food fest including a variety of drinks and food that you will savour for your entire life",location:"Gurgaon",startDate:"06/14/2024",endDate:"06/17/2024",tags:["food","festival","drinks","gathering","great indian food festival","fest"],logo:"https://1000logos.net/wp-content/uploads/2021/11/logo-Paramount.png",imageUrl:"https://miro.medium.com/v2/resize:fit:1400/1*nmMagIDyextUFs5J9aGnPw.jpeg"},{id:3,name:"Painting Fest",description:"A area filled with people and canvas boards to paint on. Come and paint your imagination",location:"Ney York",startDate:"06/14/2024",endDate:"06/17/2024",tags:["paint","painting","colors","color","fest"],logo:"https://1000logos.net/wp-content/uploads/2021/11/logo-Paramount.png",imageUrl:"https://palmbeach.floridaweekly.com/wp-content/uploads/images/2023-02-23/27p1.jpg"},{id:4,name:"Tomartina Tomato Fest",description:"A annual tomato fest in which streets get filled with tomatoes and people throw tomatoes at each other for fun",location:"Italy",startDate:"06/14/2024",endDate:"06/17/2024",tags:["tomato","tomartina","holi","gathering","fight"],logo:"https://1000logos.net/wp-content/uploads/2021/11/logo-Paramount.png",imageUrl:"https://images.ladepeche.fr/api/v1/images/view/63106cfdef5bdc39f1680c68/large/image.jpg?v=1"},{id:5,name:"Film Festival",description:"A annual film festival where people from all over India send in there directed films and they are shown in this festival on the large screen",location:"Gurgaon",startDate:"06/14/2024",endDate:"06/17/2024",tags:["movie","films","movies","fest","festival","acting","direction","film"],logo:"https://1000logos.net/wp-content/uploads/2021/11/logo-Paramount.png",imageUrl:"https://cdn.choosechicago.com/uploads/2019/06/chicago-film-festival-1800x900.jpg"}],promotedData:[{id:5,name:"Film Festival",description:"A annual film festival where people from all over India send in there directed films and they are shown in this festival on the large screen",location:"Gurgaon",startDate:"06/14/2024",endDate:"06/17/2024",tags:["movie","films","movies","fest","festival","acting","direction","film"],logo:"https://1000logos.net/wp-content/uploads/2021/11/logo-Paramount.png",imageUrl:"https://cdn.choosechicago.com/uploads/2019/06/chicago-film-festival-1800x900.jpg"}],cardBgColor:"#e6e6e6",layoutBgColor:"#111010",cardRadius:"10px"}},392:n=>{n.exports={widget:"sticky",eventData:[{id:1,name:"HORN Ok Food Festival",description:"A food fest including a variety of drinks and food that you will savour for your entire life",location:"Delhi",startDate:"09/20/2024",endDate:"09/21/2024",tags:["food","festival","drinks","gathering","hornok","horn","fest"],logo:"https://1000logos.net/wp-content/uploads/2021/11/logo-Paramount.png",imageUrl:"https://i.pinimg.com/originals/0f/ab/ea/0fabead80613002cfed665309f3dd6cc.jpg"}],layoutBgColor:"#111010",height:"100px",fontColor:"white",fontSize:"30px"}}},t={};function e(i){var a=t[i];if(void 0!==a)return a.exports;var o=t[i]={exports:{}};return n[i](o,o.exports,e),o.exports}e.n=n=>{var t=n&&n.__esModule?()=>n.default:()=>n;return e.d(t,{a:t}),t},e.d=(n,t)=>{for(var i in t)e.o(t,i)&&!e.o(n,i)&&Object.defineProperty(n,i,{enumerable:!0,get:t[i]})},e.o=(n,t)=>Object.prototype.hasOwnProperty.call(n,t),(()=>{"use strict";e(88),e(416),e(204),e(840),e(520),e(80),e(104),e(172),e(692),e(888),e(392)})()})();