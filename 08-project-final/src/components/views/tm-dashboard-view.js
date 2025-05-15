import { LitElement, html, css } from 'lit';
import '../cards/tm-stats-card.js';
import '../cards/tm-task-card.js';
import '../cards/tm-activity-card.js';
import '../charts/tm-task-chart.js';

/**
 * Dashboard view component
 * 
 * @element tm-dashboard-view
 */
export class TmDashboardView extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: var(--spacing-md, 16px);
    }

    .stats-container {
      grid-column: span 12;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--spacing-md, 16px);
      margin-bottom: var(--spacing-md, 16px);
    }

    .chart-container {
      grid-column: span 8;
    }

    .activity-container {
      grid-column: span 4;
    }

    .tasks-container {
      grid-column: span 12;
      margin-top: var(--spacing-md, 16px);
    }

    /* Responsive layout */
    @media (max-width: 1024px) {
      .stats-container {
        grid-template-columns: repeat(2, 1fr);
      }

      .chart-container,
      .activity-container {
        grid-column: span 12;
      }
    }

    @media (max-width: 640px) {
      .stats-container {
        grid-template-columns: repeat(1, 1fr);
      }
    }
  `;

  render() {
    // Example data - in a real app, this would come from a service
    const statsData = [
      { 
        title: 'Tasks', 
        value: 24, 
        change: 12, 
        trending: 'up', 
        color: 'primary',
        icon: 'task'
      },
      { 
        title: 'In Progress', 
        value: 8, 
        change: 2, 
        trending: 'up', 
        color: 'info',
        icon: 'progress'
      },
      { 
        title: 'Completed', 
        value: 16, 
        change: 23, 
        trending: 'up', 
        color: 'success',
        icon: 'check'
      },
      { 
        title: 'Overdue', 
        value: 3, 
        change: -5, 
        trending: 'down', 
        color: 'danger',
        icon: 'time' 
      }
    ];

    const tasks = [
      {
        id: 'task1',
        title: 'Create new homepage design',
        priority: 'high',
        dueDate: '2025-05-20',
        status: 'in-progress',
        progress: 60,
        assignee: { name: 'Stephan El Khoury', initials: 'SE' }
      },
      {
        id: 'task2',
        title: 'Write API documentation',
        priority: 'medium',
        dueDate: '2025-05-18',
        status: 'not-started',
        progress: 0,
        assignee: { name: 'Stephan El Khoury', initials: 'SE' }
      },
      {
        id: 'task3',
        title: 'Fix navigation responsive issues',
        priority: 'high',
        dueDate: '2025-05-16',
        status: 'in-progress',
        progress: 30,
        assignee: { name: 'Stephan El Khoury', initials: 'SE' }
      },
      {
        id: 'task4',
        title: 'Implement authentication flow',
        priority: 'high',
        dueDate: '2025-05-17',
        status: 'in-progress',
        progress: 45,
        assignee: { name: 'Stephan El Khoury', initials: 'SE' }
      },
      {
        id: 'task5',
        title: 'Update dependencies',
        priority: 'low',
        dueDate: '2025-05-25',
        status: 'not-started',
        progress: 0,
        assignee: { name: 'Stephan El Khoury', initials: 'SE' }
      }
    ];

    const activities = [
      {
        id: 'act1',
        type: 'task-created',
        content: 'New task created: Homepage design',
        timestamp: '2025-05-15T09:23:00',
        user: { name: 'Stephan El Khoury', initials: 'SE' }
      },
      {
        id: 'act2',
        type: 'task-completed',
        content: 'Task completed: User research',
        timestamp: '2025-05-15T08:15:00',
        user: { name: 'Stephan El Khoury', initials: 'SE' }
      },
      {
        id: 'act3',
        type: 'comment',
        content: 'New comment on: API documentation',
        timestamp: '2025-05-14T16:45:00',
        user: { name: 'Stephan El Khoury', initials: 'SE' }
      },
      {
        id: 'act4',
        type: 'status-changed',
        content: 'Task status changed: Authentication flow',
        timestamp: '2025-05-14T14:30:00',
        user: { name: 'Stephan El Khoury', initials: 'SE' }
      },
      {
        id: 'act5',
        type: 'task-assigned',
        content: 'Task assigned to you: Fix navigation bugs',
        timestamp: '2025-05-14T11:20:00',
        user: { name: 'Stephan El Khoury', initials: 'SE' }
      }
    ];

    // Chart data for the past week
    const chartData = {
      labels: ['May 9', 'May 10', 'May 11', 'May 12', 'May 13', 'May 14', 'May 15'],
      datasets: [
        {
          label: 'Created',
          data: [4, 6, 2, 8, 5, 7, 3],
          color: 'primary'
        },
        {
          label: 'Completed',
          data: [2, 4, 3, 5, 6, 4, 5],
          color: 'success'
        }
      ]
    };

    return html`
      <div class="dashboard-grid">
        <div class="stats-container">
          ${statsData.map(stat => html`
            <tm-stats-card
              title=${stat.title}
              value=${stat.value}
              change=${stat.change}
              trending=${stat.trending}
              color=${stat.color}
              icon=${stat.icon}
            ></tm-stats-card>
          `)}
        </div>
        
        <div class="chart-container">
          <tm-task-chart 
            .chartData=${chartData}
            title="Task Overview"
          ></tm-task-chart>
        </div>
        
        <div class="activity-container">
          <tm-activity-card 
            .activities=${activities}
            title="Recent Activity"
          ></tm-activity-card>
        </div>
        
        <div class="tasks-container">
          <tm-task-card 
            .tasks=${tasks}
            title="Your Tasks"
          ></tm-task-card>
        </div>
      </div>
    `;
  }
}

customElements.define('tm-dashboard-view', TmDashboardView);
