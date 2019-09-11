class Tooltip extends HTMLElement {
    constructor() {
        super()
        this._tooltipContainer;
        this._tooltipText = 'Default tooltip text';
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `  
            <style>
                    div {
                        position: absolute;
                        background-color: black;
                        color: white;
                        z-index: 10;
                        min-width: 150px;
                        top: -20px;
                    }
            </style>
            <slot>
                Some default
            </slot>
            <span> (?)</span>
        `
    }

    connectedCallback() {
        this.style.display = 'block';
        this.style.position = 'relative';
        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }
        const tooltipIcon = this.shadowRoot.querySelector('span');
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));

        this.shadowRoot.appendChild(tooltipIcon);
    }

    _showTooltip() {
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText;
        this.shadowRoot.appendChild(this._tooltipContainer);
    }

    _hideTooltip() {
        this.shadowRoot.removeChild(this._tooltipContainer)
    }
}

customElements.define('sk-tooltip', Tooltip);