import { LitElement, html, css } from 'lit';

/**
 * Activity card component for displaying recent activities
 * 
 * @element tm-activity-card
 * @csspart card - The card container
 * @csspart header - The card header
 * @csspart title - The card title
 */
export class TmActivityCard extends LitElement {
  static properties = {
    activities: { type: Array },
    title: { type: String }
  };

  static styles = css`
    :host {
      display: block;
    }

    .card {
      background-color: var(--surface-color, white);
      border-radius: var(--border-radius-lg, 12px);
      box-shadow: var(--shadow-sm);
      overflow: hidden;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .card-header {
      padding: var(--spacing-lg, 24px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--border-default, #e5e7eb);
    }

    .card-title {
      font-size: var(--font-size-lg, 1.125rem);
      font-weight: var(--font-weight-bold, 600);
      color: var(--text-primary, #111827);
      margin: 0;
    }

    .activities-list {
      list-style: none;
      margin: 0;
      padding: 0;
      flex: 1;
      overflow-y: auto;
    }

    .activity-item {
      padding: var(--spacing-md, 16px) var(--spacing-lg, 24px);
      border-bottom: 1px solid var(--border-default, #e5e7eb);
      display: flex;
    }

    .activity-item:last-child {
      border-bottom: none;
    }

    .activity-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: var(--spacing-md, 16px);
      flex-shrink: 0;
    }

    .icon-task-created {
      background-color: rgba(79, 70, 229, 0.1);
      color: var(--color-primary, #4f46e5);
    }

    .icon-task-completed {
      background-color: rgba(16, 185, 129, 0.1);
      color: var(--color-success, #10b981);
    }

    .icon-comment {
      background-color: rgba(59, 130, 246, 0.1);
      color: var(--color-info, #3b82f6);
    }

    .icon-status-changed {
      background-color: rgba(245, 158, 11, 0.1);
      color: var(--color-warning, #f59e0b);
    }

    .icon-task-assigned {
      background-color: rgba(99, 102, 241, 0.1);
      color: var(--color-primary-light, #818cf8);
    }

    .activity-icon svg {
      width: 18px;
      height: 18px;
    }

    .activity-content {
      flex: 1;
      min-width: 0;
    }

    .activity-text {
      font-size: var(--font-size-sm, 0.875rem);
      color: var(--text-primary, #111827);
      margin: 0 0 var(--spacing-xs, 4px) 0;
    }

    .activity-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: var(--font-size-xs, 0.75rem);
      color: var(--text-secondary, #6b7280);
    }

    .activity-time {
      white-space: nowrap;
    }

    .activity-user {
      display: flex;
      align-items: center;
    }

    .user-avatar {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: var(--color-primary-light, #818cf8);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: var(--font-weight-medium, 500);
      font-size: var(--font-size-xs, 0.75rem);
      margin-right: var(--spacing-xs, 4px);
    }

    .card-footer {
      padding: var(--spacing-md, 16px) var(--spacing-lg, 24px);
      border-top: 1px solid var(--border-default, #e5e7eb);
      text-align: center;
    }

    .view-all {
      font-size: var(--font-size-sm, 0.875rem);
      color: var(--color-primary, #4f46e5);
      text-decoration: none;
      font-weight: var(--font-weight-medium, 500);
      cursor: pointer;
    }

    .view-all:hover {
      text-decoration: underline;
    }

    .empty-state {
      padding: var(--spacing-xl, 32px) var(--spacing-lg, 24px);
      text-align: center;
      color: var(--text-secondary, #6b7280);
      font-size: var(--font-size-sm, 0.875rem);
    }
  `;

  _formatTimeAgo(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffMinutes < 1) {
      return 'Just now';
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffMinutes < 1440) {
      const hours = Math.floor(diffMinutes / 60);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffMinutes / 1440);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  }

  _getActivityIcon(type) {
    switch (type) {
      case 'task-created':
        return html`
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        `;
      case 'task-completed':
        return html`
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        `;
      case 'comment':
        return html`
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
        `;
      case 'status-changed':
        return html`
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        `;
      case 'task-assigned':
        return html`
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        `;
      default:
        return html`
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        `;
    }
  }

  _renderActivities() {
    if (!this.activities || this.activities.length === 0) {
      return html`
        <div class="empty-state">
          <p>No recent activities</p>
        </div>
      `;
    }

    return html`
      <ul class="activities-list">
        ${this.activities.map(activity => html`
          <li class="activity-item">
            <div class="activity-icon icon-${activity.type}">
              ${this._getActivityIcon(activity.type)}
            </div>
            <div class="activity-content">
              <p class="activity-text">${activity.content}</p>
              <div class="activity-meta">
                <span class="activity-time">${this._formatTimeAgo(activity.timestamp)}</span>
                <div class="activity-user">
                  <div class="user-avatar">${activity.user.initials}</div>
                </div>
              </div>
            </div>
          </li>
        `)}
      </ul>
    `;
  }

  render() {
    return html`
      <div class="card" part="card">
        <div class="card-header" part="header">
          <h3 class="card-title" part="title">${this.title}</h3>
        </div>
        
        ${this._renderActivities()}
        
        <div class="card-footer">
          <a class="view-all" href="#">View all activities</a>
        </div>
      </div>
    `;
  }
}

customElements.define('tm-activity-card', TmActivityCard);
