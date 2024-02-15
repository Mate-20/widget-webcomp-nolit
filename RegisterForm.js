class RegisterForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    connectedCallback() {
        this.render();
    }
    // To accept the incoming props
    get datanumber() {
        return this.getAttribute('datanumber');
    }
    set datanumber(value) {
        this.setAttribute('datanumber', value);
    }

    handleFormModal() {
        this.dispatchEvent(new CustomEvent('close-modal', { bubbles: true, composed: true }));
    }

    render() {
        this.shadowRoot.innerHTML = `
          <style>
              /* Add your CSS styles here */
              .backBtn {
                  background-color: rgb(216, 216, 216);
                  width: fit-content;
                  padding: 10px;
                  border-radius: 40%;
                  cursor: pointer;
              }
              .container {
                  display: flex;
                  justify-content: center;
                  margin-top: 40px;
              }
              .content {
                  width: 30vw;
              }
              .date {
                  font-size: 20px;
                  background-color: rgb(253, 219, 109);
                  padding: 5px 10px;
                  width: fit-content;
                  border-radius: 30px;
              }
              .eventName {
                  font-size: 50px;
                  color: rgb(96, 63, 240);
                  margin-top: 20px;
                  font-weight: 800;
              }
              .location {
                  margin-top: 20px;
                  font-size: 20px;
              }
              .desc {
                  margin-top: 10px;
              }
              .formHeading {
                  margin-top: 50px;
                  font-size: 40px;
                  color: rgb(96, 63, 240);
              }
              .form {
                  margin-top: 20px;
              }
              .input {
                  margin-top: 10px;
                  border: none;
                  background-color: rgb(212, 212, 212);
                  font-size: 25px;
                  width: 80%;
                  border-radius: 10px;
                  padding: 5px 10px;
              }
              .email {
                  margin-top: 20px;
              }
              .submitBtn {
                  font-size: 20px;
                  margin-top: 20px;
                  border: 2px solid rgb(96, 63, 240);
                  border-radius: 20px;
                  width: fit-content;
                  padding: 5px 20px;
                  background-color: transparent;
                  cursor: pointer;
                  color: rgb(96, 63, 240);
              }
              .submitBtn:hover {
                  transition-duration: .3s;
                  color: white;
                  background-color: rgb(96, 63, 240);
              }
          </style>
          <div>
              <div class="backBtn" @click=${this.handleFormModal}>
                  <fa-arrow-left-long></fa-arrow-left-long>
              </div>
              <div class="container">
                  <div class="details">
                      <div class="content">
                          <div class="date">February 7, 2024</div>
                          ${this.datanumber >= "2" ? `
                              <div class="eventName">Marathon</div>
                              <div class="location">Berlin, Germany</div>
                          ` : ''}
                          <div class="desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat delectus optio sequi perspiciatis, animi nulla architecto ipsam nisi deserunt, deleniti enim dolorum quam numquam in quasi blanditiis ipsum voluptas veniam?</div>
                      </div>
                      <h1 class="formHeading">Register Yourself</h1>
                      <form class="form">
                          <div class="name">Name</div>
                          <input class="input"></input>
                          <div class="email">Email</div>
                          <input class="input"></input>
                          <div>
                              <button type="submit" class="submitBtn">Register</button>
                          </div>
                      </form>
                  </div>
                  ${this.datanumber >= "2" ? `
                      <div class="img">
                          <img
                              src="https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_SS.width-1300.jpg"
                              width="500"
                              height="350"
                              alt="Author"
                              style="border-radius: 20px;"
                          />
                      </div>
                  ` : ''}
              </div>
          </div>
      `;
    }
}

customElements.define('register-form', RegisterForm);
