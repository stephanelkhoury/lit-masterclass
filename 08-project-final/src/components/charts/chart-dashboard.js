import { LitElement, html, css } from 'lit';
import './tm-task-chart.js';

export class ChartDashboard extends LitElement {
  static properties = {
    tasksByCategory: { type: Object },
    tasksByStatus: { type: Object },
    tasksTrend: { type: Object }
  };

  static styles = css`
    :host {
      display: block;
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    .chart-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }

    h2 {
      margin-top: 0;
      color: #2962ff;
    }

    .chart-container {
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      overflow: hidden;
    }

    @media (max-width: 768px) {
      .chart-grid {
        grid-template-columns: 1fr;
      }
    }
  `;

  constructor() {
    super();
    // Initialize with sample data
    this._initializeSampleData();
  }

  /**
   * Initialize sample data for charts
   */
  _initializeSampleData() {
    // Task by Category (Pie/Donut Chart)
    this.tasksByCategory = {
      labels: ['Development', 'Design', 'Research', 'Planning', 'Documentation'],
      datasets: [{
        label: 'Tasks by Category',
        data: [42, 25, 18, 15, 10],
        backgroundColor: [
          '#2962ff', // Blue
          '#00c853', // Green
          '#ff6d00', // Orange
          '#d50000', // Red
          '#aa00ff'  // Purple
        ]
      }]
    };

    // Task by Status (Bar Chart)
    this.tasksByStatus = {
      labels: ['Backlog', 'In Progress', 'Review', 'Done'],
      datasets: [
        {
          label: 'High Priority',
          data: [5, 8, 3, 12],
          color: '#d50000' // Red
        },
        {
          label: 'Medium Priority',
          data: [15, 10, 5, 25],
          color: '#ff6d00' // Orange
        },
        {
          label: 'Low Priority',
          data: [20, 5, 2, 18],
          color: '#00c853' // Green
        }
      ]
    };

    // Task Trend (Bar Chart)
    this.tasksTrend = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Created',
          data: [12, 19, 15, 28, 22, 30],
          color: '#2962ff' // Blue
        },
        {
          label: 'Completed',
          data: [8, 15, 12, 22, 18, 25],
          color: '#00c853' // Green
        }
      ]
    };
  }

  render() {
    return html`
      <div class="charts-dashboard">
        <h2>Task Analytics Dashboard</h2>
        <p>Visualization of task data across different dimensions</p>

        <div class="chart-grid">
          <!-- Task by Category Donut Chart -->
          <div class="chart-container">
            <tm-task-chart 
              type="doughnut" 
              title="Tasks by Category"
              .data=${this.tasksByCategory}
              height="300px">
            </tm-task-chart>
          </div>

          <!-- Task by Status Bar Chart -->
          <div class="chart-container">
            <tm-task-chart 
              type="bar" 
              title="Tasks by Status & Priority"
              .data=${this.tasksByStatus}
              height="300px">
            </tm-task-chart>
          </div>

          <!-- Task Trend Bar Chart -->
          <div class="chart-container">
            <tm-task-chart 
              type="bar" 
              title="Task Creation & Completion Trend"
              .data=${this.tasksTrend}
              height="300px">
            </tm-task-chart>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('chart-dashboard', ChartDashboard);
