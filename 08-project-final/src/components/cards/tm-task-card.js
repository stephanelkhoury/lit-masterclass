import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

/**
 * Task card component for displaying a list of tasks
 * 
 * @element tm-task-card
 * @csspart card - The card container
 * @csspart header - The card header
 * @csspart title - The card title
 * @fires task-selected - Fired when a task is clicked with the task details
 */
export class TmTaskCard extends LitElement {
  static properties = {
    tasks: { type: Array },
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

    .tasks-list {
      list-style: none;
      margin: 0;
      padding: 0;
      flex: 1;
    }

    .task-item {
      padding: var(--spacing-md, 16px) var(--spacing-lg, 24px);
      border-bottom: 1px solid var(--border-default, #e5e7eb);
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .task-item:hover {
      background-color: var(--bg-surface-hover, #f9fafb);
    }

    .task-item:last-child {
      border-bottom: none;
    }

    .task-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--spacing-xs, 4px);
    }

    .task-title {
      font-weight: var(--font-weight-medium, 500);
      font-size: var(--font-size-sm, 0.875rem);
      color: var(--text-primary, #111827);
      margin: 0;
      margin-bottom: var(--spacing-xs, 4px);
    }

    .task-priority {
      font-size: var(--font-size-xs, 0.75rem);
      padding: 2px 8px;
      border-radius: var(--border-radius-full, 9999px);
      font-weight: var(--font-weight-medium, 500);
    }

    .priority-high {
      background-color: rgba(239, 68, 68, 0.1);
      color: var(--color-danger, #ef4444);
    }

    .priority-medium {
      background-color: rgba(245, 158, 11, 0.1);
      color: var(--color-warning, #f59e0b);
    }

    .priority-low {
      background-color: rgba(16, 185, 129, 0.1);
      color: var(--color-success, #10b981);
    }

    .task-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: var(--spacing-sm, 8px);
      font-size: var(--font-size-xs, 0.75rem);
      color: var(--text-secondary, #6b7280);
    }

    .task-due {
      display: flex;
      align-items: center;
    }

    .task-due-icon {
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }

    .task-progress {
      margin-top: var(--spacing-sm, 8px);
    }

    .progress-bar {
      height: 6px;
      background-color: var(--border-default, #e5e7eb);
      border-radius: var(--border-radius-full, 9999px);
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      border-radius: var(--border-radius-full, 9999px);
      transition: width 0.3s ease;
    }

    .status-not-started .progress-fill {
      background-color: var(--color-info, #3b82f6);
      width: 0%;
    }

    .status-in-progress .progress-fill {
      background-color: var(--color-primary, #4f46e5);
    }

    .status-completed .progress-fill {
      background-color: var(--color-success, #10b981);
      width: 100%;
    }

    .status-overdue .progress-fill {
      background-color: var(--color-danger, #ef4444);
    }

    .progress-text {
      font-size: var(--font-size-xs, 0.75rem);
      display: flex;
      justify-content: space-between;
      color: var(--text-secondary, #6b7280);
      margin-top: 4px;
    }

    .task-assignee {
      display: flex;
      align-items: center;
    }

    .assignee-avatar {
      width: 24px;
      height: 24px;
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

  _handleTaskClick(task) {
    this.dispatchEvent(new CustomEvent('task-selected', {
      detail: { task },
      bubbles: true,
      composed: true
    }));
  }

  _formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  _getDaysRemaining(dateString) {
    const dueDate = new Date(dateString);
    const today = new Date();
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''} overdue`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} left`;
    }
  }

  _renderTasks() {
    if (!this.tasks || this.tasks.length === 0) {
      return html`
        <div class="empty-state">
          <p>No tasks available</p>
        </div>
      `;
    }

    return html`
      <ul class="tasks-list">
        ${this.tasks.map(task => html`
          <li class="task-item" @click=${() => this._handleTaskClick(task)}>
            <div class="task-header">
              <h4 class="task-title">${task.title}</h4>
              <span class="task-priority priority-${task.priority}">${task.priority}</span>
            </div>
            
            <div class="task-progress status-${task.status}">
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${task.progress}%"></div>
              </div>
              <div class="progress-text">
                <span>${task.status === 'not-started' ? 'Not started' : 
                       task.status === 'in-progress' ? 'In progress' : 
                       task.status === 'completed' ? 'Completed' : 'Overdue'}</span>
                <span>${task.progress}%</span>
              </div>
            </div>
            
            <div class="task-meta">
              <div class="task-due">
                <svg class="task-due-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>${this._formatDate(task.dueDate)} (${this._getDaysRemaining(task.dueDate)})</span>
              </div>
              
              <div class="task-assignee">
                <div class="assignee-avatar">${task.assignee.initials}</div>
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
        
        ${this._renderTasks()}
        
        <div class="card-footer">
          <a class="view-all" href="#">View all tasks</a>
        </div>
      </div>
    `;
  }
}

customElements.define('tm-task-card', TmTaskCard);
