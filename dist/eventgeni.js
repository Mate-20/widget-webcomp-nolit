(()=>{var t={88:()=>{class t extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.render()}connectedCallback(){const t={eventname:this.eventname,eventlocation:this.location,eventimage:this.image,eventdate:this.date,eventdescription:this.description},n=new CustomEvent("modal-open",{detail:t,bubbles:!0,composed:!0});this.shadowRoot.querySelectorAll(".card").forEach((t=>{t.addEventListener("click",(()=>{this.dispatchEvent(n)}))}))}static get observedAttributes(){return["image","eventname","date","location","cardcolor","cardradius","description","cardwidth","imageheight","cardheight","type"]}attributeChangedCallback(t,n,e){this[t]=e,this.render()}render(){this.shadowRoot.innerHTML=`\n      <style>\n      .card{\n        display: flex;\n        flex-direction : column;\n        width:300px;\n        height : 450px;\n        cursor: pointer;\n    }\n    .img {\n      height:40%;\n    }\n    .img img{\n      height:100%;\n      width:300px;\n    }\n    .card:hover{\n        transition-duration: .2s;\n        filter: drop-shadow(1px 1px 5px rgb(245, 245, 245));\n    }\n    .content{\n      height:50%;\n      display: flex;\n      flex-direction : column;\n      justify-content:space-evenly;\n        padding: 20px;\n    }\n    .tag{\n        background-color: rgb(253, 219, 109);\n        border-radius: 30px;\n        width: fit-content;\n        padding: 5px 20px;\n        font-weight: bold;\n        color: rgb(39, 39, 39);\n        font-size: 20px;\n    }\n    .date{\n        margin-top: 20px;\n        color: rgb(39, 39, 39);\n        font-size: 20px;\n        \n    }\n    .eventName{\n        font-size: 25px;\n        font-weight: bold;\n        color: rgb(96, 63, 240);\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n    }\n    .location{\n        font-size: 20px;\n        display: flex;\n        color:black;\n    }\n    .location div{\n        margin-right: 10px;\n    }\n    .btn{\n        margin-top: 10px;\n        display: flex;\n        border: 2px solid rgb(96, 63, 240);\n        border-radius: 20px;\n        width: fit-content;\n        padding: 5px 20px;\n        align-items: center;\n    }\n    .btn div{\n        color: rgb(96, 63, 240);\n        margin-right: 10px;\n    }\n    .btn:hover{\n        transition-duration: .3s;\n        background-color:rgb(96, 63, 240) ;\n    }\n    .btn:hover div{\n        transition-duration: .3s;\n        color: white;\n    }\n    \n      </style>\n      <div class="card" style="background-color:#e6e6e6; border-radius:10px">\n        <div class="img">\n          <img src="${this.image}" alt="author" style="border-top-left-radius:10px; border-top-right-radius:10px;">\n        </div>\n        <div class="content">\n          <div class="tag">${this.type}</div>\n          <div class="date">${this.date}</div>\n          <div class="eventName">${this.eventname}</div>\n          <div class="location">${this.location}</div>\n          <div class="btn" @click="${this.handlemodal}">\n            <div>Register</div>\n          </div>\n        </div>\n      </div>\n    `}}customElements.define("card-component",t)},80:()=>{class t extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.data=null,this.fetchData()}async fetchData(){try{const t=await fetch("http://127.0.0.1:8080/configurationsSection.json");this.data=await t.json(),this.render()}catch(t){console.error("Error fetching data:",t)}}render(){if(!this.data)return void(this.shadowRoot.innerHTML="<div>Loading...</div>");const t=this.data.widget;this.shadowRoot.innerHTML=`\n            ${"page"===t?`<page-widget data='${JSON.stringify(this.data)}'></page-widget>`:"section"===t?`<section-widget data='${JSON.stringify(this.data)}'></section-widget>`:`<sticky-widget data='${JSON.stringify(this.data)}'></sticky-widget>`}\n        `}}customElements.define("event-geni",t)},416:()=>{class t extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.imageurl="https://designshack.net/wp-content/uploads/placeholder-image.png"}connectedCallback(){this.data=JSON.parse(this.getAttribute("data")),console.log("page data in multiple data ",this.data),this.render(),this.updateLayout(),this.observer=new ResizeObserver((()=>{this.updateLayout()})),this.observer.observe(this.shadowRoot.querySelector(".container"))}updateLayout(){const t=this.shadowRoot.querySelector(".cardContainer"),n=t.offsetWidth;t.style.gridTemplateColumns=n>640&&n<=940?"repeat(2,1fr)":n<=640?"repeat(1,1fr)":"repeat(3,1fr)"}render(){this.shadowRoot.innerHTML=`\n          <style>\n              .container {\n                height:100%;\n                padding: 50px;\n              }\n              .heading {\n                  font-size: 35px;\n                  color: white;\n                  font-weight: 900;\n              }\n              .cardContainer {\n                height:100%;\n                display: grid;  \n                row-gap:30px;\n                margin-top: 30px;\n                grid-template-columns: repeat(3, 1fr);\n                justify-items: center;\n              }\n            }\n            \n              @media screen and (max-width: 1560px) {\n                .cardContainer {\n                    grid-template-columns: repeat(3, 1fr); /* Two columns in each row when screen width is at most 1200px */\n                }\n            }\n            \n              @media screen and (max-width: 1200px) {\n                .cardContainer {\n                    grid-template-columns: repeat(2, 1fr); /* Two columns in each row when screen width is at most 1200px */\n                }\n            }       \n            @media screen and (max-width: 800px) {\n                .cardContainer {\n                    grid-template-columns: repeat(1, 1fr); /* Two columns in each row when screen width is at most 1200px */\n                }\n            }   \n          </style>\n\n          <div class="container" style="background-color: ${this.data.layoutBgColor};">\n              <div class="heading">Your Events</div>\n              <div class="cardContainer">\n                  ${this.data.eventData.map(((t,n)=>`\n                      <card-component\n                          image="${this.imageurl}"\n                          date="${t._source.start_date}"\n                          eventname="${t._source.name}"\n                          location="${t._source.country_name}"\n                          description="${t._source.description}"\n                          key="${n}"\n                          type="${t._source.event_type}"\n                      ></card-component>\n                  `)).join("")}\n              </div>    \n          </div>  \n        \n      `}}customElements.define("multiple-data",t)},672:()=>{class t extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.data=JSON.parse(this.getAttribute("data")),this.render(),this.updateLayout(),this.observer=new ResizeObserver((()=>{this.updateLayout()})),this.observer.observe(this.shadowRoot.querySelector(".container"))}updateLayout(){const t=this.shadowRoot.querySelector(".cardContainer"),n=t.offsetWidth;let e=Math.floor(n/330);e=Math.max(e,1),t.style.gridTemplateColumns=`repeat(${e}, 1fr)`}disconnectedCallback(){window.removeEventListener("resize",this.updateLayout.bind(this))}render(){this.shadowRoot.innerHTML=`\n          <style>\n              .container {\n                position:relative;\n                padding: 50px;\n              }\n              .blur {\n                  height: 100vh;\n                  overflow: hidden;\n                  filter: blur(3px);\n              }\n              .heading {\n                  font-size: 35px;\n                  color: white;\n                  font-weight: 900;\n              }\n              .cardContainer {\n                height:100%;\n                display: grid;  \n                row-gap:30px;\n                margin-top: 30px;\n                justify-items: center;\n              }\n              .modal {\n                  width : 90%;  \n                  position: absolute;\n                  left: 50%;\n                  top: 100px;\n                  transform: translate(-50%, 0%);\n              }\n            \n              @media screen and (max-width: 1560px) {\n                .cardContainer {\n                    grid-template-columns: repeat(3, 1fr); /* Two columns in each row when screen width is at most 1200px */\n                }\n            }\n            \n              @media screen and (max-width: 1200px) {\n                .cardContainer {\n                    grid-template-columns: repeat(2, 1fr); /* Two columns in each row when screen width is at most 1200px */\n                }\n            }        \n          </style>\n\n          <div class="container" style="background-color: ${this.data.layoutBgColor};">\n              <div class="heading">Your Events</div>\n              <div class="cardContainer">\n                  ${this.data.eventData.map(((t,n)=>`\n                  <card-component\n                  image="${t.imageUrl}"\n                  date="${t.startDate}"\n                  eventname="${t.name}"\n                  location="${t.location}"\n                  description="${t.description}"\n                  key="${n}"\n                  cardcolor = "${this.data.cardBgColor}"\n                  cardradius = "${this.data.cardRadius}"\n                  cardwidth ="${this.data.cardWidth}"\n                  imageheight ="${this.data.imageHeight}"\n                  cardheight = "${this.data.cardHeight}"\n              ></card-component>\n                  `)).join("")}\n              </div>    \n          </div>  \n      `}}customElements.define("section-data",t)},520:()=>{class t extends HTMLElement{constructor(){super(),this.imageurl="https://designshack.net/wp-content/uploads/placeholder-image.png",this.attachShadow({mode:"open"})}connectedCallback(){this.data=JSON.parse(this.getAttribute("data")),this.render(),this.observer=new ResizeObserver((()=>{this.updateLayout()})),this.observer.observe(this.shadowRoot.querySelector(".body"))}updateLayout(){this.shadowRoot.querySelectorAll(".eventContainer").forEach((t=>{const n=t.offsetWidth;if(console.log(n),n<=600){t.style.flexDirection="column",t.style.alignItems="start";const n=t.querySelector(".eventImg");n&&(n.style.width="100%")}else{t.style.flexDirection="row";const n=t.querySelector(".eventImg");n&&(n.style.width="350px")}}))}render(){this.shadowRoot.innerHTML=`\n          <style>\n            .body{\n            padding: 50px;\n              }\n              .heading{\n                font-size: 35px;\n                color: white;\n                font-weight: 900;\n              }\n              .container {\n                margin-top:30px;\n                display:flex;\n                flex-direction:column;\n                align-items:center;\n              }\n              .eventContainer {\n                min-width : 300px;\n                width : 50%;\n                padding : 20px;\n                border-radius : 10px;\n                background-color: #9c9c9c;\n                  display: flex;\n                  align-items:center;\n                  justify-content: space-between;\n                  margin-bottom : 30px\n              }\n              .eventDetails {\n                  width: 50%;\n              }\n              .name {\n                  font-size: 50px;\n                  color: rgb(96, 63, 240);\n                  margin-top: 20px;\n                  font-weight: 800;\n              }\n              .date {\n                  background-color: rgb(253, 219, 109);\n                  width: fit-content;\n                  padding: 5px 10px;\n                  border-radius: 20px;\n                  color: rgb(39, 39, 39);\n                  font-size: 20px;\n              }\n              .location {\n                  font-size: 20px;\n                  margin-top: 60px;\n                  margin-bottom: 10px;\n                  display: flex;\n                  color:white;\n              }\n              .desc{\n                color:white;\n              }\n              .eventImg {\n                margin-top:10px;\n                filter: drop-shadow(1px 1px 6px rgb(65, 65, 65));\n                height : 300px;\n              }\n              .schedule {\n                  color: rgb(96, 63, 240);\n                  font-size: 30px;\n                  font-weight: bold;\n                  margin-bottom: 10px;\n              }\n              .modal {\n                  width: 50vw;\n                  margin-top: 100px;\n              }\n              @media screen and (max-width: 1241px) {\n                .eventDetails {\n                    width: 100%; /* Adjust the width of event details for smaller screens */\n                  }\n                  .eventContainer {\n                    flex-direction: column; /* Change flex direction for smaller screens */\n                  }\n                  .modal {\n                    width: fit-content;\n                    margin-top: 100px;\n                }\n            }\n          </style>\n          <div class="body" style="background-color: ${this.data.layoutBgColor}">\n                <div class="heading">Highlighted Events</div>  \n                <div class="container">\n                    ${this.data.top_3.map((t=>`\n                        <div class="eventContainer">\n                            <div class="eventDetails">\n                                <div class="date">${t._source.start_date}</div>\n                                <div class="name">${t._source.name}</div>\n                                <div class="location">${t._source.country_name}</div>\n                                <div class="desc">${t._source.description}</div>\n                            </div>\n                            <img class="eventImg" src="${this.imageurl}" alt="Pictureauthor" style="border-radius: 10px;">\n                        </div>\n              `)).join("")}\n                </div>\n          </div>\n      `}}customElements.define("promoted-event",t)},204:()=>{class t extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.render()}connectedCallback(){this.eventname=this.getAttribute("eventname"),this.eventlocation=this.getAttribute("eventlocation"),this.eventimage=this.getAttribute("eventimage"),this.eventdate=this.getAttribute("eventdate"),this.eventdescription=this.getAttribute("eventdescription"),this.shadowRoot.querySelector(".backbtn").addEventListener("click",(()=>{console.log("clicked")})),this.render()}handleClose(){console.log("cliked")}render(){this.shadowRoot.innerHTML=`\n          <style>\n              /* Add your CSS styles here */\n              .backbtn {\n                  background-color: rgb(216, 216, 216);\n                  width: fit-content;\n                  padding: 10px;\n                  border-radius: 40%;\n                  cursor: pointer;\n              }\n              .container {\n                  display: flex;\n                  justify-content: center;\n                  margin-top: 40px;\n              }\n              .content {\n                  width: 100%;\n              }\n              .img img{\n                width : 300px;\n                height: 250px;\n              }\n              .date {\n                  font-size: 20px;\n                  background-color: rgb(253, 219, 109);\n                  padding: 5px 10px;\n                  width: fit-content;\n                  border-radius: 30px;\n              }\n              .eventName {\n                  font-size: 50px;\n                  color: rgb(96, 63, 240);\n                  margin-top: 20px;\n                  font-weight: 800;\n              }\n              .location {\n                  margin-top: 20px;\n                  font-size: 20px;\n              }\n              .desc {\n                  margin-top: 10px;\n              }\n              .formHeading {\n                  margin-top: 50px;\n                  font-size: 40px;\n                  color: rgb(96, 63, 240);\n              }\n              .form {\n                  margin-top: 20px;\n              }\n              .input {\n                  margin-top: 10px;\n                  border: none;\n                  background-color: rgb(212, 212, 212);\n                  font-size: 25px;\n                  width: 80%;\n                  border-radius: 10px;\n                  padding: 5px 10px;\n              }\n              .email {\n                  margin-top: 20px;\n              }\n              .submitBtn {\n                  font-size: 20px;\n                  margin-top: 20px;\n                  border: 2px solid rgb(96, 63, 240);\n                  border-radius: 20px;\n                  width: fit-content;\n                  padding: 5px 20px;\n                  background-color: transparent;\n                  cursor: pointer;\n                  color: rgb(96, 63, 240);\n              }\n              .submitBtn:hover {\n                  transition-duration: .3s;\n                  color: white;\n                  background-color: rgb(96, 63, 240);\n              }\n          </style>\n          <div>\n              <div class="backbtn" @click=${this.handleClose}>\n                  <\n              </div>\n              <div class="container">\n                  <div class="details">\n                      <div class="content">\n                          <div class="date">${this.eventdate}</div>\n                              <div class="eventName">${this.eventname}</div>\n                              <div class="location">${this.eventlocation}</div>\n                          <div class="desc">${this.eventdescription}</div>\n                      </div>\n                      <h1 class="formHeading">Register Yourself</h1>\n                      <form class="form">\n                          <div class="name">Name</div>\n                          <input class="input"></input>\n                          <div class="email">Email</div>\n                          <input class="input"></input>\n                          <div>\n                              <button type="submit" class="submitBtn">Register</button>\n                          </div>\n                      </form>\n                  </div>\n                      <div class="img">\n                          <img\n                              src=${this.eventimage}\n                              alt="Author"\n                              style="border-radius: 20px;"\n                          />\n                      </div>\n              </div>\n          </div>\n      `}}customElements.define("register-form",t)},104:()=>{class t extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.fetchData(),this.data=null,this.toggleState=!1,this.formData={eventname:"demoevent",eventlocation:"demolocation",eventimage:"https://designshack.net/wp-content/uploads/placeholder-image.png",eventdate:"1/1/1",eventdescription:"demo description"},this.pagequery=""}async fetchData(){try{const t=await fetch(`https://api.eventgeni.com/es/find?company=104&${this.pagequery}`);this.data=await t.json(),console.log("Data is this",this.data),this.render()}catch(t){console.error("Error fetching data:",t)}}connectedCallback(){this.pagequery=this.getAttribute("page-query"),this.fetchData(),this.observeAttributes(),this.addEventListener("modal-open",this.handleModalOpen.bind(this)),this.render()}observeAttributes(){this.observer=new MutationObserver((t=>{t.forEach((t=>{"attributes"===t.type&&"page-query"===t.attributeName&&(this.pagequery=t.target.getAttribute("page-query"),this.fetchData())}))})),this.observer.observe(this,{attributes:!0})}handleModalOpen(t){this.toggleState=!0,this.formData=t.detail,this.render()}render(){let t=!1;this.data?.top_3?.length>0&&(t=!0),this.shadowRoot.innerHTML=`\n        <style>\n            .container{\n                height : fit-content;\n            }\n            .blur {\n                height: 100vh;\n                overflow: hidden;\n                filter: blur(2px);\n            }\n            .modal{\n                padding : 20px;\n                border-radius:10px;\n                position : absolute;\n                background : white;\n                height: fit-content;\n                width: fit-content;\n                top : 50%;\n                left : 50%;\n                transform: translate(-50%, -50%);\n              }\n        </style>\n        <div class="body">\n            <div class="container ${this.toggleState?"blur":""}">\n                ${t?`<promoted-event data='${JSON.stringify(this.data)}'></promoted-event>`:""}\n                <multiple-data data='${JSON.stringify(this.data)}'></multiple-data>\n            </div>\n            ${this.toggleState?`<div class="modal">\n             <register-form \n             eventname="${this.formData.eventname}"\n             eventlocation="${this.formData.eventlocation}"\n             eventimage="${this.formData.eventimage}"\n             eventdate="${this.formData.eventdate}"\n             eventdescription="${this.formData.eventdescription}"\n             ></register-form>\n            </div>`:""}\n        </div>\n\n`}}customElements.define("page-widget",t)},172:()=>{class t extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.fetchData(),this.toggleState=!1,this.formData={eventname:"demoevent",eventlocation:"demolocation",eventimage:"https://designshack.net/wp-content/uploads/placeholder-image.png",eventdate:"1/1/1",eventdescription:"demo description"}}async fetchData(){try{const t=await fetch("http://127.0.0.1:8080/configurationsSection.json");this.data=await t.json(),this.render()}catch(t){console.error("Error fetching data:",t)}}connectedCallback(){this.addEventListener("modal-open",this.handleModalOpen.bind(this)),this.addEventListener("close-form",this.handleModalClose.bind(this)),this.render()}handleModalClose(){this.toggleState=!1}handleModalOpen(t){this.toggleState=!0,this.formData=t.detail,console.log(this.formData),this.render()}render(){this.shadowRoot.innerHTML=`\n        <style>\n        .modal{\n            padding : 20px;\n            border-radius:10px;\n            position : absolute;\n            background : white;\n            height: fit-content;\n            width: fit-content;\n            top : 50%;\n            left : 50%;\n            transform: translate(-50%, -50%);\n            filter : drop-shadow(1px 1px 6px black);\n          }\n        </style>\n        <div class="body">\n            <section-data data='${JSON.stringify(this.data)}'></section-data>\n            ${this.toggleState?`<div class="modal">\n            <register-form \n            eventname="${this.formData.eventname}"\n            eventlocation="${this.formData.eventlocation}"\n            eventimage="${this.formData.eventimage}"\n            eventdate="${this.formData.eventdate}"\n            eventdescription="${this.formData.eventdescription}"\n            ></register-form>\n           </div>`:""}\n        </div>\n        `}}customElements.define("section-widget",t)},692:()=>{class t extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.data=null,this.fetchData(),this.stickyid=""}async fetchData(){try{const t=await fetch(`https://api.eventgeni.com/widgets/${this.stickyid}?type=stickey`);this.data=await t.json(),console.log(this.data),this.render()}catch(t){console.error("Error fetching data:",t)}}connectedCallback(){this.stickyid=this.getAttribute("sticky-id"),this.fetchData(),this.observeAttributes(),this.render()}observeAttributes(){this.observer=new MutationObserver((t=>{t.forEach((t=>{"attributes"===t.type&&"sticky-id"===t.attributeName&&(this.stickyid=t.target.getAttribute("sticky-id"),this.fetchData())}))})),this.observer.observe(this,{attributes:!0})}disconnectedCallback(){this.observer&&this.observer.disconnect()}render(){this.shadowRoot.innerHTML=`\n        <style>\n            .navbar{\n                position: sticky;\n                top: 0;\n                width:100%;\n                display:flex;\n                align-items:center;\n                justify-content:center;\n                background-color: ${this.data.bgColor};\n                color:${this.data.fgColor};\n                height:${this.data.height}px; \n              \n            }\n            .eventname{\n                font-size:${this.data.fontSize}px;\n            }\n        </style>\n            <div class="navbar">\n                <div class="eventname">${this.data.event}</div>\n            </div>\n        `}}customElements.define("sticky-widget",t)}},n={};function e(i){var a=n[i];if(void 0!==a)return a.exports;var o=n[i]={exports:{}};return t[i](o,o.exports,e),o.exports}e.n=t=>{var n=t&&t.__esModule?()=>t.default:()=>t;return e.d(n,{a:n}),n},e.d=(t,n)=>{for(var i in n)e.o(n,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:n[i]})},e.o=(t,n)=>Object.prototype.hasOwnProperty.call(t,n),(()=>{"use strict";e(88),e(416),e(204),e(520),e(80),e(104),e(172),e(692),e(672)})()})();