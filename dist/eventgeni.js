(()=>{var n={88:()=>{class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.render()}connectedCallback(){const n={eventname:this.eventname,eventlocation:this.location,eventimage:this.image,eventdate:this.date,eventdescription:this.description},t=new CustomEvent("modal-open",{detail:n,bubbles:!0,composed:!0});this.shadowRoot.querySelectorAll(".card").forEach((n=>{n.addEventListener("click",(()=>{this.dispatchEvent(t)}))}))}static get observedAttributes(){return["image","eventname","date","location","cardcolor","cardradius","description"]}attributeChangedCallback(n,t,e){this[n]=e,this.render()}render(){this.shadowRoot.innerHTML=`\n      <style>\n      .card{\n        width:330px;\n        cursor: pointer;\n    }\n    .img img{\n      width:330px;\n      height:200px;\n    }\n    .card:hover{\n        transition-duration: .2s;\n        filter: drop-shadow(1px 1px 5px rgb(245, 245, 245));\n    }\n    .content{\n        padding: 20px;\n    }\n    .tag{\n        background-color: rgb(253, 219, 109);\n        border-radius: 30px;\n        width: fit-content;\n        padding: 5px 20px;\n        font-weight: bold;\n        color: rgb(39, 39, 39);\n        font-size: 20px;\n    }\n    .date{\n        margin-top: 20px;\n        color: rgb(39, 39, 39);\n        font-size: 20px;\n        \n    }\n    .eventName{\n        font-size: 25px;\n        font-weight: bold;\n        color: rgb(96, 63, 240);\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n    }\n    .location{\n        font-size: 20px;\n        margin-top: 60px;\n        display: flex;\n    }\n    .location div{\n        margin-right: 10px;\n    }\n    .btn{\n        margin-top: 10px;\n        display: flex;\n        border: 2px solid rgb(96, 63, 240);\n        border-radius: 20px;\n        width: fit-content;\n        padding: 5px 20px;\n        align-items: center;\n    }\n    .btn div{\n        color: rgb(96, 63, 240);\n        margin-right: 10px;\n    }\n    .btn:hover{\n        transition-duration: .3s;\n        background-color:rgb(96, 63, 240) ;\n    }\n    .btn:hover div{\n        transition-duration: .3s;\n        color: white;\n    }\n    \n      </style>\n      <div class="card" style="background-color: ${this.cardcolor}; border-radius:${this.cardradius}">\n        <div class="img">\n          <img src="${this.image}" alt="author" style="border-top-left-radius:${this.cardradius}; border-top-right-radius: ${this.cardradius};">\n        </div>\n        <div class="content">\n          <div class="tag">Events</div>\n          <div class="date">${this.date}</div>\n          <div class="eventName">${this.eventname}</div>\n          <div class="location">\n            <div>Location Icon</div>\n            <div>${this.location}</div>\n          </div>\n          <div class="btn" @click="${this.handlemodal}">\n            <div>Register</div>\n          </div>\n        </div>\n      </div>\n    `}}customElements.define("card-component",n)},80:()=>{class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.data=null,this.fetchData()}async fetchData(){try{const n=await fetch("http://127.0.0.1:8080/configurationsSection.json");this.data=await n.json(),this.render()}catch(n){console.error("Error fetching data:",n)}}render(){if(!this.data)return void(this.shadowRoot.innerHTML="<div>Loading...</div>");const n=this.data.widget;this.shadowRoot.innerHTML=`\n            ${"page"===n?`<page-widget data='${JSON.stringify(this.data)}'></page-widget>`:"section"===n?`<section-widget data='${JSON.stringify(this.data)}'></section-widget>`:`<sticky-widget data='${JSON.stringify(this.data)}'></sticky-widget>`}\n        `}}customElements.define("event-geni",n)},416:()=>{class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.data=JSON.parse(this.getAttribute("data")),this.render()}render(){this.shadowRoot.innerHTML=`\n          <style>\n              .container {\n                height:100%;\n                padding: 50px;\n              }\n              .heading {\n                  font-size: 35px;\n                  color: white;\n                  font-weight: 900;\n              }\n              .cardContainer {\n                height:100%;\n                display: grid;  \n                row-gap:30px;\n                margin-top: 30px;\n                grid-template-columns: repeat(3, 1fr);\n                justify-items: center;\n              }\n            }\n            \n              @media screen and (max-width: 1560px) {\n                .cardContainer {\n                    grid-template-columns: repeat(3, 1fr); /* Two columns in each row when screen width is at most 1200px */\n                }\n            }\n            \n              @media screen and (max-width: 1200px) {\n                .cardContainer {\n                    grid-template-columns: repeat(2, 1fr); /* Two columns in each row when screen width is at most 1200px */\n                }\n            }        \n          </style>\n\n          <div class="container" style="background-color: ${this.data.layoutBgColor};">\n              <div class="heading">Your Events</div>\n              <div class="cardContainer">\n                  ${this.data.eventData.map(((n,t)=>`\n                      <card-component\n                          image="${n.imageUrl}"\n                          date="${n.startDate}"\n                          eventname="${n.name}"\n                          location="${n.location}"\n                          description="${n.description}"\n                          key="${t}"\n                          cardcolor = "${this.data.cardBgColor}"\n                          cardradius = "${this.data.cardRadius}"\n                      ></card-component>\n                  `)).join("")}\n              </div>    \n          </div>  \n        \n      `}}customElements.define("multiple-data",n)},672:()=>{class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.data=JSON.parse(this.getAttribute("data")),this.render(),this.updateLayout(),this.observer=new ResizeObserver((()=>{this.updateLayout()})),this.observer.observe(this.shadowRoot.querySelector(".container"))}updateLayout(){const n=this.shadowRoot.querySelector(".cardContainer"),t=n.offsetWidth;let e=Math.floor(t/330);e=Math.max(e,1),n.style.gridTemplateColumns=`repeat(${e}, 1fr)`}disconnectedCallback(){window.removeEventListener("resize",this.updateLayout.bind(this))}render(){this.shadowRoot.innerHTML=`\n          <style>\n              .container {\n                position:relative;\n                padding: 50px;\n              }\n              .blur {\n                  height: 100vh;\n                  overflow: hidden;\n                  filter: blur(3px);\n              }\n              .heading {\n                  font-size: 35px;\n                  color: white;\n                  font-weight: 900;\n              }\n              .cardContainer {\n                height:100%;\n                display: grid;  \n                row-gap:30px;\n                margin-top: 30px;\n                justify-items: center;\n\n              }\n              .modal {\n                  width : 90%;  \n                  position: absolute;\n                  left: 50%;\n                  top: 100px;\n                  transform: translate(-50%, 0%);\n              }\n            \n              @media screen and (max-width: 1560px) {\n                .cardContainer {\n                    grid-template-columns: repeat(3, 1fr); /* Two columns in each row when screen width is at most 1200px */\n                }\n            }\n            \n              @media screen and (max-width: 1200px) {\n                .cardContainer {\n                    grid-template-columns: repeat(2, 1fr); /* Two columns in each row when screen width is at most 1200px */\n                }\n            }        \n          </style>\n\n          <div class="container" style="background-color: ${this.data.layoutBgColor};">\n              <div class="heading">Your Events</div>\n              <div class="cardContainer">\n                  ${this.data.eventData.map(((n,t)=>`\n                      <card-component\n                          image="${n.imageUrl}"\n                          date="${n.startDate}"\n                          eventName="${n.name}"\n                          location="${n.location}"\n                          key="${t}"\n                          cardcolor = "${this.data.cardBgColor}"\n                          cardradius = "${this.data.cardRadius}"\n                          @modal-open="${this.handlemodal}"\n                      ></card-component>\n                  `)).join("")}\n              </div>    \n          </div>  \n      `}}customElements.define("section-data",n)},520:()=>{class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.data=JSON.parse(this.getAttribute("data")),this.render()}render(){this.shadowRoot.innerHTML=`\n          <style>\n              .container {\n                display:flex;\n                flex-direction:column;\n                align-items:center;\n                  padding: 50px;\n              }\n              .eventContainer {\n                  display: flex;\n                  align-items:center;\n                  justify-content: center;\n              }\n              .eventDetails {\n                  width: 30%;\n              }\n              .name {\n                  font-size: 50px;\n                  color: rgb(96, 63, 240);\n                  margin-top: 20px;\n                  font-weight: 800;\n              }\n              .date {\n                  background-color: rgb(253, 219, 109);\n                  width: fit-content;\n                  padding: 5px 10px;\n                  border-radius: 20px;\n                  margin-top: 20px;\n                  color: rgb(39, 39, 39);\n                  font-size: 20px;\n              }\n              .location {\n                  font-size: 20px;\n                  margin-top: 60px;\n                  margin-bottom: 10px;\n                  display: flex;\n                  color:white;\n              }\n              .desc{\n                color:white;\n              }\n              .heading {\n                  font-size: 35px;\n                  color: white;\n                  font-weight: 900; \n              }\n              .eventImg {\n                margin-top:10px;\n                  filter: drop-shadow(1px 1px 6px rgb(65, 65, 65));\n              }\n              .schedule {\n                  color: rgb(96, 63, 240);\n                  font-size: 30px;\n                  font-weight: bold;\n                  margin-bottom: 10px;\n              }\n              .modal {\n                  width: 50vw;\n                  margin-top: 100px;\n              }\n              @media screen and (max-width: 960px) {\n                .eventDetails {\n                    width: 100%; /* Adjust the width of event details for smaller screens */\n                  }\n                  .eventContainer {\n                    flex-direction: column; /* Change flex direction for smaller screens */\n                  }\n                  .modal {\n                    width: fit-content;\n                    margin-top: 100px;\n                }\n            }\n          </style>\n          <div class="body">\n          <div class="container" style="background-color: ${this.data.layoutBgColor};">\n                      <div class="eventContainer">\n                          <div class="eventDetails">\n                              <div class="date">${this.data.promotedData[0].startDate}</div>\n                              <div class="name">${this.data.promotedData[0].name}</div>\n                              <div class="location">\n                                  <div style="margin-top: 2px;"><io-location-outline></io-location-outline></div>\n                                  <div>${this.data.promotedData[0].location}</div>\n                              </div>\n                              <div class="desc">${this.data.promotedData[0].description}</div>\n                          </div>\n                          <div class="eventImg">\n                              <img src="${this.data.promotedData[0].imageUrl}" width="350" height="300" alt="Pictureauthor" style="border-radius: 10px;">\n                          </div>\n                      </div>\n              </div>\n          </div>\n      `}}customElements.define("promoted-event",n)},204:()=>{class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.render()}connectedCallback(){this.eventname=this.getAttribute("eventname"),this.eventlocation=this.getAttribute("eventlocation"),this.eventimage=this.getAttribute("eventimage"),this.eventdate=this.getAttribute("eventdate"),this.eventdescription=this.getAttribute("eventdescription"),this.render()}render(){this.shadowRoot.innerHTML=`\n          <style>\n              /* Add your CSS styles here */\n              .backBtn {\n                  background-color: rgb(216, 216, 216);\n                  width: fit-content;\n                  padding: 10px;\n                  border-radius: 40%;\n                  cursor: pointer;\n              }\n              .container {\n                  display: flex;\n                  justify-content: center;\n                  margin-top: 40px;\n              }\n              .content {\n                  width: 100%;\n              }\n              .img img{\n                width : 300px;\n                height: 250px;\n              }\n              .date {\n                  font-size: 20px;\n                  background-color: rgb(253, 219, 109);\n                  padding: 5px 10px;\n                  width: fit-content;\n                  border-radius: 30px;\n              }\n              .eventName {\n                  font-size: 50px;\n                  color: rgb(96, 63, 240);\n                  margin-top: 20px;\n                  font-weight: 800;\n              }\n              .location {\n                  margin-top: 20px;\n                  font-size: 20px;\n              }\n              .desc {\n                  margin-top: 10px;\n              }\n              .formHeading {\n                  margin-top: 50px;\n                  font-size: 40px;\n                  color: rgb(96, 63, 240);\n              }\n              .form {\n                  margin-top: 20px;\n              }\n              .input {\n                  margin-top: 10px;\n                  border: none;\n                  background-color: rgb(212, 212, 212);\n                  font-size: 25px;\n                  width: 80%;\n                  border-radius: 10px;\n                  padding: 5px 10px;\n              }\n              .email {\n                  margin-top: 20px;\n              }\n              .submitBtn {\n                  font-size: 20px;\n                  margin-top: 20px;\n                  border: 2px solid rgb(96, 63, 240);\n                  border-radius: 20px;\n                  width: fit-content;\n                  padding: 5px 20px;\n                  background-color: transparent;\n                  cursor: pointer;\n                  color: rgb(96, 63, 240);\n              }\n              .submitBtn:hover {\n                  transition-duration: .3s;\n                  color: white;\n                  background-color: rgb(96, 63, 240);\n              }\n          </style>\n          <div>\n              <div class="backBtn">\n                  <fa-arrow-left-long></fa-arrow-left-long>\n              </div>\n              <div class="container">\n                  <div class="details">\n                      <div class="content">\n                          <div class="date">February 7, 2024</div>\n                              <div class="eventName">${this.eventname}</div>\n                              <div class="location">${this.eventlocation}</div>\n                          <div class="desc">${this.eventdescription}</div>\n                      </div>\n                      <h1 class="formHeading">Register Yourself</h1>\n                      <form class="form">\n                          <div class="name">Name</div>\n                          <input class="input"></input>\n                          <div class="email">Email</div>\n                          <input class="input"></input>\n                          <div>\n                              <button type="submit" class="submitBtn">Register</button>\n                          </div>\n                      </form>\n                  </div>\n                      <div class="img">\n                          <img\n                              src=${this.eventimage}\n                              alt="Author"\n                              style="border-radius: 20px;"\n                          />\n                      </div>\n              </div>\n          </div>\n      `}}customElements.define("register-form",n)},104:()=>{class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.fetchData(),this.toggleState=!1,this.formData={eventname:"demoevent",eventlocation:"demolocation",eventimage:"https://designshack.net/wp-content/uploads/placeholder-image.png",eventdate:"1/1/1",eventdescription:"demo description"}}async fetchData(){try{const n=await fetch("http://127.0.0.1:8080/configurationsPage.json");this.data=await n.json(),this.render()}catch(n){console.error("Error fetching data:",n)}}connectedCallback(){this.addEventListener("modal-open",this.handleModalOpen.bind(this)),this.render()}handleModalOpen(n){this.toggleState=!0,this.formData=n.detail,this.render()}render(){let n=!1;this.data.promotedData.length>0&&(n=!0),this.shadowRoot.innerHTML=`\n        <style>\n            .container{\n                height : fit-content;\n            }\n            .blur {\n                height: 100vh;\n                overflow: hidden;\n                filter: blur(2px);\n            }\n            .modal{\n                padding : 20px;\n                border-radius:10px;\n                position : absolute;\n                background : white;\n                height: fit-content;\n                width: fit-content;\n                top : 50%;\n                left : 50%;\n                transform: translate(-50%, -50%);\n              }\n        </style>\n        <div class="body">\n            <div class="container ${this.toggleState?"blur":""}">\n                ${n?`<promoted-event data='${JSON.stringify(this.data)}'></promoted-event>`:""}\n                <multiple-data data='${JSON.stringify(this.data)}'></multiple-data>\n            </div>\n            ${this.toggleState?`<div class="modal">\n             <register-form \n             eventname="${this.formData.eventname}"\n             eventlocation="${this.formData.eventlocation}"\n             eventimage="${this.formData.eventimage}"\n             eventdate="${this.formData.eventdate}"\n             eventdescription="${this.formData.eventdescription}"\n             ></register-form>\n            </div>`:""}\n        </div>\n\n`}}customElements.define("page-widget",n)},172:()=>{class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.data=null,this.fetchData()}async fetchData(){try{const n=await fetch("http://127.0.0.1:8080/configurationsSection.json");this.data=await n.json(),this.render()}catch(n){console.error("Error fetching data:",n)}}connectedCallback(){this.data=JSON.parse(this.getAttribute("data")),this.render()}render(){this.shadowRoot.innerHTML=`\n        <style>\n            .container{\n            }\n        </style>\n        <div class="container">\n        <section-data data='${JSON.stringify(this.data)}'></section-data>\n        </div>\n        `}}customElements.define("section-widget",n)},692:()=>{class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.data=null,this.fetchData()}async fetchData(){try{const n=await fetch("http://127.0.0.1:8080/configurationsSticky.json");this.data=await n.json(),this.render()}catch(n){console.error("Error fetching data:",n)}}connectedCallback(){this.data=JSON.parse(this.getAttribute("data")),console.log(this.data),this.render()}render(){this.shadowRoot.innerHTML=`\n        <style>\n            .navbar{\n                position: sticky;\n                top: 0;\n                width:100%;\n                display:flex;\n                align-items:center;\n                justify-content:center;\n                background-color: ${this.data.layoutBgColor};\n                color:${this.data.fontColor};\n                height:${this.data.height}; \n                font-size:${this.data.fontSize};\n                \n            }\n        </style>\n            <div class="navbar">\n                <div>${this.data.eventData[0].name}</div>\n            </div>\n        `}}customElements.define("sticky-widget",n)}},t={};function e(i){var a=t[i];if(void 0!==a)return a.exports;var o=t[i]={exports:{}};return n[i](o,o.exports,e),o.exports}e.n=n=>{var t=n&&n.__esModule?()=>n.default:()=>n;return e.d(t,{a:t}),t},e.d=(n,t)=>{for(var i in t)e.o(t,i)&&!e.o(n,i)&&Object.defineProperty(n,i,{enumerable:!0,get:t[i]})},e.o=(n,t)=>Object.prototype.hasOwnProperty.call(n,t),(()=>{"use strict";e(88),e(416),e(204),e(520),e(80),e(104),e(172),e(692),e(672)})()})();