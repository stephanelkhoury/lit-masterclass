import { LitElement, html, css } from 'lit';

/**
 * A demonstration component showing different slot types and behaviors
 * 
 * @slot - Default slot
 * @slot header - Header slot
 * @slot footer - Footer slot
 * @slot custom - A custom named slot
 */
export class SlotDemo extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin: 1rem 0;
    }
    
    .slot-container {
      border: 2px solid var(--primary-color, #7e57c2);
      border-radius: 8px;
      overflow: hidden;
    }
    
    .slot-section {
      padding: 1rem;
      position: relative;
    }
    
    .slot-label {
      position: absolute;
      top: 0;
      right: 0;
      background-color: var(--primary-color, #7e57c2);
      color: white;
      font-size: 0.8rem;
      padding: 0.2rem 0.5rem;
      border-bottom-left-radius: 4px;
    }
    
    .header-section {
      background-color: rgba(126, 87, 194, 0.1);
      border-bottom: 1px solid var(--primary-color, #7e57c2);
    }
    
    .footer-section {
      background-color: rgba(126, 87, 194, 0.1);
      border-top: 1px solid var(--primary-color, #7e57c2);
    }
    
    .main-section {
      min-height: 100px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .custom-slot-section {
      background-color: rgba(38, 166, 154, 0.1);
      border-top: 1px dashed var(--secondary-color, #26a69a);
      border-bottom: 1px dashed var(--secondary-color, #26a69a);
    }
  `;

  render() {
    return html`
      <div class="slot-container">
        <div class="slot-section header-section">
          <div class="slot-label">header</div>
          <slot name="header">
            <h3>Default Header Content</h3>
            <p><i>This content shows when no header slot is provided</i></p>
          </slot>
        </div>
        
        <div class="slot-section main-section">
          <div class="slot-label">default</div>
          <slot>
            <p>Default content for the unnamed slot.</p>
            <p>This will be displayed if no children are passed to the component.</p>
          </slot>
          
          <div class="custom-slot-section">
            <div class="slot-label">custom</div>
            <slot name="custom">
              <p>This is a named slot called "custom".</p>
              <p>Pass elements with attribute slot="custom" to replace this.</p>
            </slot>
          </div>
        </div>
        
        <div class="slot-section footer-section">
          <div class="slot-label">footer</div>
          <slot name="footer">
            <p><i>Default footer content</i></p>
          </slot>
        </div>
      </div>
    `;
  }
}

customElements.define('slot-demo', SlotDemo);
