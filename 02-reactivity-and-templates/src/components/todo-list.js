import { LitElement, html, css } from 'lit';

/**
 * A Todo List component that demonstrates:
 * - Reactive properties with different types
 * - Event handling and custom events
 * - Conditional rendering
 * - List rendering with repeat directive
 */
export class TodoList extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    
    .todo-container {
      margin-bottom: 2rem;
    }
    
    .todo-stats {
      display: flex;
      justify-content: space-between;
      margin: 1rem 0;
      padding: 0.5rem;
      background-color: var(--light-bg);
      border-radius: var(--border-radius);
      font-size: 0.9rem;
    }
    
    .empty-state {
      text-align: center;
      padding: 2rem 0;
      color: #888;
      font-style: italic;
    }
    
    .todo-list {
      margin-top: 1rem;
    }
    
    .filters {
      margin: 1.5rem 0;
    }
  `;

  static properties = {
    tasks: { type: Array }, // Array of task objects
    filter: { type: String }, // Current filter (all, active, completed)
    loading: { type: Boolean }, // Loading state demonstration
  };

  constructor() {
    super();
    // Initialize properties with default values
    this.tasks = [
      { id: 1, text: 'Learn about Lit properties', completed: true },
      { id: 2, text: 'Understand Lit templates', completed: false },
      { id: 3, text: 'Master event handling in Lit', completed: false },
      { id: 4, text: 'Build a complete todo app', completed: false },
    ];
    this.filter = 'all';
    this.loading = false;
  }

  // Computed property to get filtered tasks based on the current filter
  get filteredTasks() {
    switch (this.filter) {
      case 'active':
        return this.tasks.filter(task => !task.completed);
      case 'completed':
        return this.tasks.filter(task => task.completed);
      default:
        return this.tasks;
    }
  }

  // Computed properties for stats
  get totalTasks() {
    return this.tasks.length;
  }

  get completedTasks() {
    return this.tasks.filter(task => task.completed).length;
  }

  get activeTasks() {
    return this.totalTasks - this.completedTasks;
  }

  // Event handlers
  handleFilterChange(e) {
    this.filter = e.detail.filter;
  }

  handleAddTask(e) {
    const newTask = {
      id: Date.now(), // Simple way to generate unique IDs
      text: e.detail.text,
      completed: false
    };
    
    // Create a new array with the new task (immutable update pattern)
    this.tasks = [...this.tasks, newTask];
  }

  handleTaskToggle(e) {
    const taskId = e.detail.id;
    
    // Create a new array with the updated task
    this.tasks = this.tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
  }

  handleTaskDelete(e) {
    const taskId = e.detail.id;
    
    // Filter out the deleted task
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

  // Simulate loading data from an API
  async loadTasks() {
    this.loading = true;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    this.loading = false;
  }

  // Lifecycle method - called when the element is first connected to the document
  firstUpdated() {
    this.loadTasks();
  }

  render() {
    return html`
      <div class="todo-container">
        <task-form @task-add="${this.handleAddTask}"></task-form>
        
        <div class="filters">
          <task-filter 
            .currentFilter="${this.filter}" 
            @filter-change="${this.handleFilterChange}">
          </task-filter>
        </div>
        
        <div class="todo-stats">
          <span>Total: ${this.totalTasks}</span>
          <span>Active: ${this.activeTasks}</span>
          <span>Completed: ${this.completedTasks}</span>
        </div>
        
        <!-- Conditional rendering example -->
        ${this.loading 
          ? html`<p>Loading tasks...</p>` 
          : html`
            <div class="todo-list">
              ${this.filteredTasks.length === 0 
                ? html`<p class="empty-state">No ${this.filter} tasks found.</p>` 
                : this.filteredTasks.map(task => html`
                  <todo-item 
                    .task="${task}" 
                    @task-toggle="${this.handleTaskToggle}"
                    @task-delete="${this.handleTaskDelete}">
                  </todo-item>
                `)}
            </div>
          `}
      </div>
    `;
  }
}

customElements.define('todo-list', TodoList);
