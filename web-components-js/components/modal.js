class Modal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                header {
                    padding: 1rem;
                    border-bottom: 1px solid #ccc;
                }

                header h1 {
                    font-size: 1.25rem;
                }

                #backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: rgba(0,0,0,0.75);
                    z-index: 10;
                    opacity: 0;
                    pointer-events: none;
                }

                :host([opened]) #backdrop,
                :host([opened]) #modal {
                    opacity: 1;
                    pointer-events: all;
                }

                :host([opened]) #modal {
                    top: 15vh;
                }

                #modal {
                    z-index: 100;
                    position: fixed;
                    top: 10vh;
                    left: 25%;
                    width: 50%;
                    background: white;
                    border-radius: 3px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.25);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    opacity: 0;
                    transition: all 0.3s ease-out;
                }

                #main {
                    padding: 1rem;
                }

                #actions {
                    border-top: 1px solid #ccc;
                    padding: 1rem;
                    display: flex;
                    justify-content: flex-end;
                }

                #actions button {
                    margin: 0 .25rem;
                }

                ::slotted(h1) {
                    font-size: 1.25rem;
                    margin: 0;
                }
            </style>
            <div id="backdrop"></div>
            <div id="modal">
                <header>
                   <slot name="title"></slot>
                </header>
                <section id="main">
                    <slot></slot>
                </section>
                <section id="actions">
                    <button id="cancel-btn">Cancel</button>
                    <button id="confirm-btn">Ok</button>
                </section>
            </div>
        `;

        this.initListeners();
    }

    initListeners() {
        const cancelBtn = this.shadowRoot.querySelector('#cancel-btn');
        const confirmBtn = this.shadowRoot.querySelector('#confirm-btn');
        const backdrop = this.shadowRoot.querySelector('#backdrop');

        cancelBtn.addEventListener('click', this._cancel.bind(this));
        confirmBtn.addEventListener('click', this._confirm.bind(this));
        backdrop.addEventListener('click', this._confirm.bind(this));
    }

    open() {
        this.setAttribute('opened', '');
    }

    hide() {
        if (this.hasAttribute('opened')) {
            this.removeAttribute('opened');
        }
    }

    _cancel() {
        this.hide();
        const cancelEvent = new Event('cancel', { composed: true });
        this.dispatchEvent(cancelEvent);
    }

    _confirm() {
        this.hide();
        const confirmEvent = new Event('confirm', { composed: true });
        this.dispatchEvent(confirmEvent);
    }

}

customElements.define('sk-modal', Modal)