import { LitElement, html, css } from 'lit';
import { cache } from 'lit/directives/cache.js';

/**
 * Component demonstrating the cache directive
 */
export class CacheDirectiveExample extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    
    .tab-bar {
      display: flex;
      border-bottom: 1px solid #ddd;
      margin-bottom: 1rem;
    }
    
    .tab {
      padding: 0.75rem 1.5rem;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: all 0.2s;
    }
    
    .tab.active {
      border-bottom-color: var(--primary-color);
      color: var(--primary-color);
      font-weight: 500;
    }
    
    .tab-content {
      padding: 1rem;
      border: 1px solid #eee;
      border-radius: 0 0 var(--border-radius) var(--border-radius);
      min-height: 200px;
    }
    
    .info {
      background-color: #e3f2fd;
      padding: 1rem;
      border-radius: var(--border-radius);
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }
    
    .counter {
      background-color: #f5f5f5;
      padding: 1rem;
      margin: 1rem 0;
      border-radius: var(--border-radius);
      text-align: center;
    }
    
    .counter button {
      margin: 0 0.5rem;
    }
    
    .counter-value {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--primary-color);
    }
    
    .cache-badge {
      background-color: #ffecb3;
      color: #ff6f00;
      padding: 0.25rem 0.5rem;
      border-radius: 12px;
      font-size: 0.8rem;
      margin-top: 1rem;
      display: inline-block;
    }
  `;

  static properties = {
    activeTab: { type: String },
    tabOneCounter: { type: Number },
    tabTwoCounter: { type: Number },
    tabThreeCounter: { type: Number },
    cacheEnabled: { type: Boolean },
  };

  constructor() {
    super();
    this.activeTab = 'tab1';
    this.tabOneCounter = 0;
    this.tabTwoCounter = 0;
    this.tabThreeCounter = 0;
    this.cacheEnabled = true;
  }

  // Set the active tab
  setActiveTab(tab) {
    this.activeTab = tab;
  }

  // Increment counter for a specific tab
  incrementCounter(tab) {
    switch(tab) {
      case 'tab1':
        this.tabOneCounter++;
        break;
      case 'tab2':
        this.tabTwoCounter++;
        break;
      case 'tab3':
        this.tabThreeCounter++;
        break;
    }
  }

  // Decrement counter for a specific tab
  decrementCounter(tab) {
    switch(tab) {
      case 'tab1':
        if (this.tabOneCounter > 0) this.tabOneCounter--;
        break;
      case 'tab2':
        if (this.tabTwoCounter > 0) this.tabTwoCounter--;
        break;
      case 'tab3':
        if (this.tabThreeCounter > 0) this.tabThreeCounter--;
        break;
    }
  }

  // Toggle cache
  toggleCache() {
    this.cacheEnabled = !this.cacheEnabled;
  }

  // Render content for Tab 1
  renderTabOne() {
    console.log('Rendering Tab 1 Content');
    return html`
      <div>
        <h3>Tab One Content</h3>
        <p>This tab maintains its state when switching between tabs with cache directive enabled.</p>
        
        <div class="counter">
          <div class="counter-value">${this.tabOneCounter}</div>
          <button @click=${() => this.decrementCounter('tab1')}>-</button>
          <button @click=${() => this.incrementCounter('tab1')}>+</button>
        </div>
        
        <div class="cache-badge">
          Tab created/updated at: ${new Date().toLocaleTimeString()}
        </div>
      </div>
    `;
  }

  // Render content for Tab 2
  renderTabTwo() {
    console.log('Rendering Tab 2 Content');
    return html`
      <div>
        <h3>Tab Two Content</h3>
        <p>Try toggling the cache option and switching between tabs to see the difference.</p>
        
        <div class="counter">
          <div class="counter-value">${this.tabTwoCounter}</div>
          <button @click=${() => this.decrementCounter('tab2')}>-</button>
          <button @click=${() => this.incrementCounter('tab2')}>+</button>
        </div>
        
        <div class="cache-badge">
          Tab created/updated at: ${new Date().toLocaleTimeString()}
        </div>
      </div>
    `;
  }

  // Render content for Tab 3
  renderTabThree() {
    console.log('Rendering Tab 3 Content');
    return html`
      <div>
        <h3>Tab Three Content</h3>
        <p>With cache disabled, the DOM is recreated every time you switch to this tab.</p>
        
        <div class="counter">
          <div class="counter-value">${this.tabThreeCounter}</div>
          <button @click=${() => this.decrementCounter('tab3')}>-</button>
          <button @click=${() => this.incrementCounter('tab3')}>+</button>
        </div>
        
        <div class="cache-badge">
          Tab created/updated at: ${new Date().toLocaleTimeString()}
        </div>
      </div>
    `;
  }

  render() {
    // Determine which tab content to render
    let activeTabContent;
    if (this.activeTab === 'tab1') {
      activeTabContent = this.renderTabOne;
    } else if (this.activeTab === 'tab2') {
      activeTabContent = this.renderTabTwo;
    } else {
      activeTabContent = this.renderTabThree;
    }

    return html`
      <div class="info">
        The <code>cache</code> directive caches DOM for templates that are conditionally rendered.
        Without caching, the DOM is recreated each time the template is rendered. With caching,
        the DOM is preserved between renders, maintaining state and avoiding expensive re-renders.
      </div>
      
      <div>
        <label>
          <input 
            type="checkbox" 
            ?checked=${this.cacheEnabled} 
            @change=${this.toggleCache}> 
          Enable template caching
        </label>
      </div>
      
      <div class="tab-bar">
        <div 
          class="tab ${this.activeTab === 'tab1' ? 'active' : ''}"
          @click=${() => this.setActiveTab('tab1')}>
          Tab One
        </div>
        <div 
          class="tab ${this.activeTab === 'tab2' ? 'active' : ''}"
          @click=${() => this.setActiveTab('tab2')}>
          Tab Two
        </div>
        <div 
          class="tab ${this.activeTab === 'tab3' ? 'active' : ''}"
          @click=${() => this.setActiveTab('tab3')}>
          Tab Three
        </div>
      </div>
      
      <div class="tab-content">
        ${this.cacheEnabled
          ? cache(activeTabContent())
          : activeTabContent()}
      </div>
    `;
  }
}

customElements.define('cache-directive-example', CacheDirectiveExample);
