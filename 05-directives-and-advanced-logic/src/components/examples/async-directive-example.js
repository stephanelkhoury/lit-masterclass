import { LitElement, html, css } from 'lit';
import { asyncLoad } from '../../directives/async-load-directive.js';

/**
 * Component demonstrating the custom async directive
 */
export class AsyncDirectiveExample extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    
    .info {
      background-color: #e3f2fd;
      padding: 1rem;
      border-radius: var(--border-radius);
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }
    
    .example-card {
      background-color: white;
      border-radius: var(--border-radius);
      padding: 1.5rem;
      margin-bottom: 1rem;
    }
    
    .controls {
      margin-bottom: 1.5rem;
    }
    
    .loading {
      display: flex;
      align-items: center;
      color: var(--primary-color);
      height: 100px;
      justify-content: center;
    }
    
    .loading::after {
      content: "";
      width: 20px;
      height: 20px;
      border: 3px solid #ddd;
      border-top-color: var(--primary-color);
      border-radius: 50%;
      margin-left: 10px;
      animation: spin 1s linear infinite;
    }
    
    .error {
      background-color: #ffebee;
      padding: 1rem;
      color: #c62828;
      border-radius: var(--border-radius);
    }
    
    .user-card {
      display: grid;
      grid-template-columns: 80px 1fr;
      gap: 1rem;
    }
    
    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background-color: #f5f5f5;
    }
    
    .user-info h3 {
      margin-top: 0;
      color: var(--primary-color);
    }
    
    .user-detail {
      display: flex;
      align-items: center;
      margin-bottom: 0.25rem;
      font-size: 0.9rem;
    }
    
    .user-detail span {
      margin-right: 0.5rem;
      color: #666;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;

  static properties = {
    loadType: { type: String },
    userId: { type: Number }
  };

  constructor() {
    super();
    this.loadType = 'success'; // 'success', 'error', 'delay'
    this.userId = 1;
  }

  // Simulated user data fetch function
  fetchUserData() {
    return new Promise((resolve, reject) => {
      const delay = this.loadType === 'delay' ? 3000 : 1000;
      
      setTimeout(() => {
        if (this.loadType === 'error') {
          reject(new Error('Failed to load user data'));
          return;
        }
        
        resolve({
          id: this.userId,
          name: `User ${this.userId}`,
          email: `user${this.userId}@example.com`,
          avatar: `https://i.pravatar.cc/200?u=${this.userId}`,
          location: 'New York, USA',
          joinDate: '2025-01-15'
        });
      }, delay);
    });
  }

  // Set the load type
  setLoadType(type) {
    this.loadType = type;
  }

  // Change the user ID
  changeUser() {
    this.userId = Math.floor(Math.random() * 100) + 1;
  }

  render() {
    // Loading template
    const loadingTemplate = html`
      <div class="loading">Loading user data...</div>
    `;
    
    // Error template
    const errorTemplate = (error) => html`
      <div class="error">
        <p>${error.message}</p>
        <button @click=${() => this.requestUpdate()}>Retry</button>
      </div>
    `;
    
    // Success template is handled by the directive itself
    
    return html`
      <div class="info">
        This example demonstrates a custom async directive that handles loading states,
        errors, and successful data fetching. The directive automatically updates the DOM
        when the asynchronous operation completes.
      </div>
      
      <div class="controls">
        <button @click=${() => this.setLoadType('success')}>
          Simulate Success
        </button>
        <button @click=${() => this.setLoadType('error')}>
          Simulate Error
        </button>
        <button @click=${() => this.setLoadType('delay')}>
          Simulate Long Delay
        </button>
        <button @click=${this.changeUser}>
          Change User
        </button>
      </div>
      
      <div class="example-card">
        ${asyncLoad(
          () => this.fetchUserData(),
          loadingTemplate,
          errorTemplate
        )}
      </div>
    `;
  }
  
  // Custom renderer for user data
  renderUserData(user) {
    if (!user) return null;
    
    return html`
      <div class="user-card">
        <img class="avatar" src=${user.avatar} alt="User avatar">
        <div class="user-info">
          <h3>${user.name}</h3>
          <div class="user-detail">
            <span>Email:</span> ${user.email}
          </div>
          <div class="user-detail">
            <span>Location:</span> ${user.location}
          </div>
          <div class="user-detail">
            <span>Joined:</span> ${new Date(user.joinDate).toLocaleDateString()}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('async-directive-example', AsyncDirectiveExample);
