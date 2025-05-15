import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { Task } from '@lit/task';

// Import sample data
import { fetchSampleData } from '../data/sample-data.js';
import { statusColorMap } from '../utils/constants.js';

/**
 * A data dashboard component that demonstrates several Lit directives
 * and advanced control flow techniques.
 */
export class DataDashboard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    
    .dashboard-container {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .controls-panel {
      background-color: white;
      padding: 1.5rem;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow);
    }
    
    .filters {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    
    .filter-item {
      flex: 1;
      min-width: 200px;
    }
    
    .filter-item label {
      display: block;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
      color: #666;
    }
    
    .filter-item select,
    .filter-item input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    .data-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }
    
    .data-card {
      background-color: white;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow);
      padding: 1.5rem;
      transition: transform 0.2s;
    }
    
    .data-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    }
    
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
    }
    
    .card-title {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 500;
    }
    
    .status-badge {
      padding: 0.25rem 0.5rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 500;
    }
    
    .item-property {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      border-bottom: 1px solid #eee;
      font-size: 0.9rem;
    }
    
    .property-label {
      color: #666;
    }
    
    .property-value {
      font-weight: 500;
    }
    
    .loading-indicator {
      text-align: center;
      padding: 2rem;
      color: var(--primary-color);
    }
    
    .error-message {
      padding: 1rem;
      background-color: #ffebee;
      color: #c62828;
      border-radius: var(--border-radius);
      margin-bottom: 1rem;
    }
    
    .empty-state {
      text-align: center;
      padding: 3rem;
      background-color: #f9f9f9;
      border-radius: var(--border-radius);
      color: #757575;
      font-style: italic;
    }
    
    .actions {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #eee;
    }
  `;

  static properties = {
    filter: { type: Object },
    sortBy: { type: String },
    sortDirection: { type: String },
  };

  constructor() {
    super();
    // Initialize filter state
    this.filter = {
      status: 'all',
      priority: 'all',
      search: '',
    };
    this.sortBy = 'date';
    this.sortDirection = 'desc';
    
    // Create a task for data fetching
    this.dataTask = new Task(this, {
      task: async ([filter, sortBy, sortDirection]) => {
        const data = await fetchSampleData();
        return this._processData(data, filter, sortBy, sortDirection);
      },
      args: () => [this.filter, this.sortBy, this.sortDirection],
    });
  }

  // Process and filter data based on current filters and sorting
  _processData(data, filter, sortBy, sortDirection) {
    // First apply filters
    let filteredData = [...data];
    
    // Filter by status
    if (filter.status !== 'all') {
      filteredData = filteredData.filter(item => item.status === filter.status);
    }
    
    // Filter by priority
    if (filter.priority !== 'all') {
      filteredData = filteredData.filter(item => item.priority === filter.priority);
    }
    
    // Filter by search text
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      filteredData = filteredData.filter(item => 
        item.title.toLowerCase().includes(searchLower) || 
        item.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply sorting
    filteredData.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'priority':
          comparison = a.priority.localeCompare(b.priority);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'date':
        default:
          comparison = new Date(a.createdAt) - new Date(b.createdAt);
          break;
      }
      
      // Apply sort direction
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    return filteredData;
  }

  // Event handlers
  _handleFilterChange(e, filterType) {
    this.filter = {
      ...this.filter,
      [filterType]: e.target.value
    };
  }

  _handleSortChange(e) {
    this.sortBy = e.target.value;
  }

  _handleSortDirectionChange(e) {
    this.sortDirection = e.target.value;
  }

  _handleSearchInput(e) {
    // Debounce search input to avoid too many re-renders
    clearTimeout(this._searchTimeout);
    this._searchTimeout = setTimeout(() => {
      this.filter = {
        ...this.filter,
        search: e.target.value
      };
    }, 300);
  }

  // Render methods
  _renderControls() {
    return html`
      <div class="controls-panel">
        <div class="filters">
          <div class="filter-item">
            <label for="status-filter">Status</label>
            <select id="status-filter" @change=${(e) => this._handleFilterChange(e, 'status')}>
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
          
          <div class="filter-item">
            <label for="priority-filter">Priority</label>
            <select id="priority-filter" @change=${(e) => this._handleFilterChange(e, 'priority')}>
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          
          <div class="filter-item">
            <label for="sort-by">Sort By</label>
            <select id="sort-by" @change=${this._handleSortChange}>
              <option value="date">Date</option>
              <option value="title">Title</option>
              <option value="status">Status</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          
          <div class="filter-item">
            <label for="sort-direction">Direction</label>
            <select id="sort-direction" @change=${this._handleSortDirectionChange}>
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>
        
        <div class="filter-item">
          <label for="search">Search</label>
          <input 
            type="text" 
            id="search" 
            placeholder="Search titles and descriptions..." 
            @input=${this._handleSearchInput}>
        </div>
      </div>
    `;
  }

  _renderDataCard(item) {
    const statusClass = {
      'status-badge': true,
      [`status-${item.status}`]: true
    };
    
    const statusStyles = {
      backgroundColor: `${statusColorMap[item.status]}20`,
      color: statusColorMap[item.status]
    };

    return html`
      <div class="data-card">
        <div class="card-header">
          <h3 class="card-title">${item.title}</h3>
          <span class=${classMap(statusClass)} style=${styleMap(statusStyles)}>
            ${item.status}
          </span>
        </div>
        
        <div class="item-property">
          <span class="property-label">Priority:</span>
          <span class="property-value">${item.priority}</span>
        </div>
        
        <div class="item-property">
          <span class="property-label">Created:</span>
          <span class="property-value">${new Date(item.createdAt).toLocaleDateString()}</span>
        </div>
        
        <div class="item-property">
          <span class="property-label">Category:</span>
          <span class="property-value">${item.category}</span>
        </div>
        
        <p>${item.description}</p>
        
        <div class="actions">
          <button class="secondary">View Details</button>
          <button class="accent">Edit</button>
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <div class="dashboard-container">
        ${this._renderControls()}
        
        ${this.dataTask.render({
          pending: () => html`
            <div class="loading-indicator">
              <p>Loading data...</p>
            </div>
          `,
          complete: (data) => {
            if (data.length === 0) {
              return html`
                <div class="empty-state">
                  <p>No items found matching your filters.</p>
                </div>
              `;
            }
            return html`
              <div class="data-grid">
                ${repeat(
                  data, 
                  (item) => item.id, 
                  (item) => this._renderDataCard(item)
                )}
              </div>
            `;
          },
          error: (error) => html`
            <div class="error-message">
              <p>Error loading data: ${error.message}</p>
              <button @click=${() => this.dataTask.run()}>Retry</button>
            </div>
          `
        })}
      </div>
    `;
  }
}

customElements.define('data-dashboard', DataDashboard);
