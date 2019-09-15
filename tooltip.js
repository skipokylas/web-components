class Tooltip extends HTMLElement {
    constructor() {
        super()
        this._tooltipText = 'Default tooltip text';
        this._tooltipIcon;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `  
            <style>
                    div {
                        position: absolute;
                        background-color: black;
                        color: white;
                        z-index: 10;
                        min-width: 150px;
                        top: 1.5rem;
                        left: 1.5rem;
                        padding: 0.15rem;
                        border-radius: 3px;
                        font-weight: normal;
                    }

                    :host {
                        background-color: #ccc;
                        position: relative;
                    }

                    :host(.important) {
                        background-color: red;
                    }

                    :host-context(.some-color) {
                        color: blue;
                    }

                    ::slotted(.highlight) {
                       border-bottom: 1px solid blue;
                    }
            </style>
            <slot>
                Some default
            </slot>
            <span> (?)</span>
        `
    }

    connectedCallback() {
        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }
        this._tooltipIcon = this.shadowRoot.querySelector('span');
        this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));

        this.shadowRoot.appendChild(this._tooltipIcon);
    }

    disconnectedCallBack() {
        this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
        this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) { return }
        if (name === 'text') { this._tooltipText = newValue }
    }

    static get observedAttributes() {
        return ['text']
    }

    _render(isTooltipVisible) {
        let tooltipContainer = this.shadowRoot.querySelector('div');
        if (isTooltipVisible) {
            tooltipContainer = document.createElement('div');
            tooltipContainer.textContent = this._tooltipText;
            this.shadowRoot.appendChild(tooltipContainer);
        } else {
            if (tooltipContainer) {
                this.shadowRoot.removeChild(tooltipContainer)
            }
        }
    }

    _showTooltip() {
        this._render(true);
    }

    _hideTooltip() {
        this._render(false);
    }
}

customElements.define('sk-tooltip', Tooltip);