import { LitElement, html, css } from 'lit';

/**
 * A responsive grid component
 *
 * @element responsive-grid
 * @csspart grid - The grid container
 * @slot - Grid items
 */
export class ResponsiveGrid extends LitElement {
  static properties = {
    columns: { type: Object },
    gap: { type: String }
  };

  static styles = css`
    :host {
      display: block;
    }

    .grid {
      display: grid;
      gap: var(--grid-gap, 1rem);
      width: 100%;
    }

    /* Default responsive behavior */
    .grid {
      grid-template-columns: repeat(1, 1fr);
    }

    @media (min-width: 640px) {
      .grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 768px) {
      .grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (min-width: 1024px) {
      .grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    /* Slotted grid items styling */
    ::slotted(*) {
      background-color: var(--grid-item-bg, #f8fafc);
      padding: var(--grid-item-padding, 1.5rem);
      border-radius: var(--grid-item-radius, 8px);
      box-shadow: var(--grid-item-shadow, 0 1px 3px rgba(0,0,0,0.1));
      transition: all 0.2s;
    }

    ::slotted(*:hover) {
      transform: translateY(-2px);
      box-shadow: var(--grid-item-hover-shadow, 0 4px 6px rgba(0,0,0,0.1));
    }
  `;

  constructor() {
    super();
    this.columns = {
      default: 1,
      sm: 2,
      md: 3,
      lg: 4
    };
    this.gap = '1rem';
  }

  updated(changedProperties) {
    if (changedProperties.has('columns') || changedProperties.has('gap')) {
      this._updateGridStyles();
    }
  }

  render() {
    return html`
      <div class="grid" part="grid">
        <slot></slot>
      </div>
    `;
  }

  _updateGridStyles() {
    const gridElement = this.shadowRoot.querySelector('.grid');
    
    if (gridElement) {
      gridElement.style.gap = this.gap;
      
      // Apply custom column settings if provided
      if (this.columns) {
        const customStyles = document.createElement('style');
        
        let styleContent = '';
        if (this.columns.default) {
          styleContent += `
            .grid {
              grid-template-columns: repeat(${this.columns.default}, 1fr);
            }
          `;
        }
        
        if (this.columns.sm) {
          styleContent += `
            @media (min-width: 640px) {
              .grid {
                grid-template-columns: repeat(${this.columns.sm}, 1fr);
              }
            }
          `;
        }
        
        if (this.columns.md) {
          styleContent += `
            @media (min-width: 768px) {
              .grid {
                grid-template-columns: repeat(${this.columns.md}, 1fr);
              }
            }
          `;
        }
        
        if (this.columns.lg) {
          styleContent += `
            @media (min-width: 1024px) {
              .grid {
                grid-template-columns: repeat(${this.columns.lg}, 1fr);
              }
            }
          `;
        }
        
        customStyles.textContent = styleContent;
        
        // Remove any previous custom styles
        const oldStyles = this.shadowRoot.querySelector('style[data-custom]');
        if (oldStyles) {
          this.shadowRoot.removeChild(oldStyles);
        }
        
        customStyles.setAttribute('data-custom', true);
        this.shadowRoot.appendChild(customStyles);
      }
    }
  }
}

customElements.define('responsive-grid', ResponsiveGrid);
