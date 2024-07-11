// class PopupController {
//     constructor(popupSelector) {
//         this.popupSelector = popupSelector;
//         this.popupElement = document.querySelector(popupSelector);
//         this.timeoutId = null; // To store the timeout ID for clearing the timeout
//     }

//     showPopup() {
//         if (!this.popupElement) {
//             console.error(`No popup found with selector ${this.popupSelector}`);
//             return;
//         }
//         // Logic to show the popup
//         this.popupElement.style.display = 'block';
//     }

//     showAfterCTA(ctaSelector) {
//         const cta = document.querySelector(ctaSelector);
//         if (!cta) {
//             console.error(`No CTA found with selector ${ctaSelector}`);
//             return;
//         }
//         cta.addEventListener('click', () => {
//             this.showPopup();
//         });
//     }

//     showAfterScroll(scrollAmount) {
//         window.addEventListener('scroll', () => {
//             if (window.scrollY > scrollAmount) {
//                 this.showPopup();
//             }
//         });
//     }

//     showAfterSection(sectionSelector, delay = 200) {
//         const section = document.querySelector(sectionSelector);
//         if (!section) {
//             console.error(`No section found with selector ${sectionSelector}`);
//             return;
//         }
//         const observer = new IntersectionObserver((entries) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     if (this.timeoutId) {
//                         clearTimeout(this.timeoutId); // Clear previous timeout if the section is re-entered
//                     }
//                     this.timeoutId = setTimeout(() => this.showPopup(), delay);
//                 } else {
//                     // Clear the timeout if the section is no longer in view
//                     if (this.timeoutId) {
//                         clearTimeout(this.timeoutId);
//                         this.timeoutId = null;
//                     }
//                 }
//             });
//         }, {
//             threshold: 0.1 // Adjust this threshold as needed
//         });
//         observer.observe(section);
//     }

//     // Static method to initialize the PopupController and call methods based on parameters
//     static initialize(popupSelector) {
//         const instance = new PopupController(popupSelector);
//         const script = document.querySelector(`script[src="/components/templates/popupstyles/PopupController.js"]`);
//         const showAfterScroll = script.getAttribute('showAfterScroll');
//         const showAfterCTA = script.getAttribute('showAfterCTA');
//         const showAfterSection = script.getAttribute('showAfterSection');
//         const delay = script.getAttribute('delay') || 200; // Default delay of 1000ms if not provided

//         if (showAfterScroll) {
//             instance.showAfterScroll(Number(showAfterScroll));
//         }
//         if (showAfterCTA) {
//             instance.showAfterCTA(showAfterCTA);
//         }
//         if (showAfterSection) {
//             instance.showAfterSection(showAfterSection, Number(delay));
//         }
//     }
// }

// // Expose the `initialize` method globally
// window.PopupController = PopupController;

// // Automatically call `initialize` with the default selector
// window.addEventListener('load', () => {
//     const defaultPopupSelector = 'popup-widget';
//     PopupController.initialize(defaultPopupSelector);
// });

export function getScriptAttributes() {
  const scripts = document.getElementsByTagName('script');
  for (let script of scripts) {
      if (script.src.includes('eventgeni.js')) {
          return {
              showAfterScroll: script.getAttribute('showAfterScroll') || 'default',
          };
      }
  }
  return {
      showAfterScroll: 'default',
  };
}

export function showPopupAfterScroll(){
    document.addEventListener('DOMContentLoaded', () => {
        const config = getScriptAttributes();
        const popupWidget = document.querySelector('popup-widget');
        if (popupWidget) {
            popupWidget.style.display = 'none'; // Start hidden
        }

        if (config.showAfterScroll && popupWidget) {
            const showAfterScrollValue = parseInt(config.showAfterScroll, 10);
            window.addEventListener('scroll', () => {
                if (window.scrollY > showAfterScrollValue) {
                    popupWidget.style.display = 'block';
                }
            });
        }
    });
}