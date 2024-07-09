export default class PopupController {
    constructor(widgetTag) {
        this.widget = document.querySelector(widgetTag);
        if (!this.widget) {
            console.error(`No element found with tag ${widgetTag}`);
        }
    }

    showPopup() {
        this.widget.style.display = 'block';
    }

    hidePopup() {
        this.widget.style.display = 'none';
    }
    showAfterScroll(scrollAmount) {
        window.addEventListener('scroll', () => {
            if (window.scrollY >= scrollAmount) {
                this.showPopup();
            }
        });
    }

    showAfterSection(sectionSelector) {
        const section = document.querySelector(sectionSelector);
        if (!section) {
            console.error(`No section found with selector ${sectionSelector}`);
            return;
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.showPopup();
                }
            });
        });
        observer.observe(section);
    }

    showAfterCTA(ctaSelector) {
        const cta = document.querySelector(ctaSelector);
        if (!cta) {
            console.error(`No CTA found with selector ${ctaSelector}`);
            return;
        }
        cta.addEventListener('click', () => {
            this.showPopup();
        });
    }
}
