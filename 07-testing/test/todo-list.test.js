import { html, fixture, expect, oneEvent, aTimeout, nextFrame } from '@open-wc/testing';
import { stub } from 'sinon';
import '../src/components/todo-list.js';

describe('TodoList Component', () => {
  /**
   * Basic Rendering Tests
   */
  describe('Basic Rendering', () => {
    it('renders the component with default values', async () => {
      const el = await fixture(html`<todo-list></todo-list>`);
      
      expect(el.todos).to.deep.equal([]);
      expect(el.loading).to.be.false;
      expect(el.filter).to.equal('all');
      
      const heading = el.shadowRoot.querySelector('h2');
      expect(heading).to.exist;
      expect(heading.textContent).to.equal('Todo List');
    });
    
    it('displays the empty state when no todos', async () => {
      const el = await fixture(html`<todo-list></todo-list>`);
      
      const emptyState = el.shadowRoot.querySelector('.empty-state');
      expect(emptyState).to.exist;
      expect(emptyState.textContent).to.include('No tasks');
    });
    
    it('shows loading state when loading is true', async () => {
      const el = await fixture(html`<todo-list .loading=${true}></todo-list>`);
      
      const loadingEl = el.shadowRoot.querySelector('.loading');
      expect(loadingEl).to.exist;
      expect(loadingEl.textContent).to.include('Loading');
    });
  });
  
  /**
   * Functionality Tests
   */
  describe('Adding Todos', () => {
    it('adds a new todo when using the addTodo method', async () => {
      const el = await fixture(html`<todo-list></todo-list>`);
      
      // Initially empty
      expect(el.todos.length).to.equal(0);
      
      // Add a todo
      el.addTodo('Test Todo');
      
      // Should have one todo now
      expect(el.todos.length).to.equal(1);
      expect(el.todos[0].text).to.equal('Test Todo');
      expect(el.todos[0].completed).to.be.false;
      
      // Check if the todo is rendered in the DOM
      await el.updateComplete;
      const todoEl = el.shadowRoot.querySelector('li');
      expect(todoEl).to.exist;
      expect(todoEl.textContent).to.include('Test Todo');
    });
    
    it('fires todo-added event when adding a new todo', async () => {
      const el = await fixture(html`<todo-list></todo-list>`);
      
      // Set up listener for the event
      setTimeout(() => el.addTodo('Event Test Todo'));
      
      // Wait for the event to fire
      const { detail } = await oneEvent(el, 'todo-added');
      
      expect(detail).to.exist;
      expect(detail.todo).to.exist;
      expect(detail.todo.text).to.equal('Event Test Todo');
    });
    
    it('adds a todo when submitting the form', async () => {
      const el = await fixture(html`<todo-list></todo-list>`);
      
      // Fill in the input field
      const input = el.shadowRoot.querySelector('#new-todo');
      input.value = 'Form Test Todo';
      
      // Click the add button
      const addButton = el.shadowRoot.querySelector('.todo-form button');
      addButton.click();
      
      await el.updateComplete;
      
      expect(el.todos.length).to.equal(1);
      expect(el.todos[0].text).to.equal('Form Test Todo');
      
      // Check if input was cleared
      expect(input.value).to.equal('');
    });
    
    it('does not add empty todos', async () => {
      const el = await fixture(html`<todo-list></todo-list>`);
      
      const result = el.addTodo('');
      expect(result).to.be.null;
      expect(el.todos.length).to.equal(0);
    });
  });
  
  describe('Toggling and Removing Todos', () => {
    it('toggles a todo when using the toggleTodo method', async () => {
      const el = await fixture(html`<todo-list></todo-list>`);
      
      // Add a todo and get its ID
      const todo = el.addTodo('Toggle Test');
      const id = todo.id;
      
      // Toggle the todo
      el.toggleTodo(id);
      
      // Todo should now be completed
      expect(el.todos[0].completed).to.be.true;
      
      // Toggle again
      el.toggleTodo(id);
      
      // Todo should now be incomplete
      expect(el.todos[0].completed).to.be.false;
    });
    
    it('fires todo-toggled event when toggling a todo', async () => {
      const el = await fixture(html`<todo-list></todo-list>`);
      
      // Add a todo and get its ID
      const todo = el.addTodo('Toggle Event Test');
      const id = todo.id;
      
      // Set up listener for the event
      setTimeout(() => el.toggleTodo(id));
      
      // Wait for the event to fire
      const { detail } = await oneEvent(el, 'todo-toggled');
      
      expect(detail).to.exist;
      expect(detail.todo).to.exist;
      expect(detail.todo.id).to.equal(id);
      expect(detail.todo.completed).to.be.true;
    });
    
    it('removes a todo when using the removeTodo method', async () => {
      const el = await fixture(html`<todo-list></todo-list>`);
      
      // Initialize with empty array to ensure consistent starting point
      el.todos = [];
      await el.updateComplete;
      
      // Add two todos
      const todo1 = el.addTodo('Remove Test 1');
      const todo2 = el.addTodo('Remove Test 2');
      await el.updateComplete;
      
      // Should have two todos
      expect(el.todos.length).to.equal(2);
      
      // Remove the first todo
      el.removeTodo(todo1.id);
      await el.updateComplete;
      
      // Should have one todo remaining
      expect(el.todos.length).to.equal(1);
      expect(el.todos[0].id).to.equal(todo2.id);
    });
    
    it('fires todo-removed event when removing a todo', async () => {
      const el = await fixture(html`<todo-list></todo-list>`);
      
      // Add a todo and get its ID
      const todo = el.addTodo('Remove Event Test');
      const id = todo.id;
      
      // Set up listener for the event
      setTimeout(() => el.removeTodo(id));
      
      // Wait for the event to fire
      const { detail } = await oneEvent(el, 'todo-removed');
      
      expect(detail).to.exist;
      expect(detail.todo).to.exist;
      expect(detail.todo.id).to.equal(id);
    });
  });
  
  describe('Filtering', () => {
    it('filters todos correctly', async () => {
      const el = await fixture(html`<todo-list></todo-list>`);
      
      // Add some todos
      const todo1 = el.addTodo('Todo 1');
      const todo2 = el.addTodo('Todo 2');
      const todo3 = el.addTodo('Todo 3');
      
      // Mark the first one as completed
      el.toggleTodo(todo1.id);
      
      // By default, filter is 'all'
      expect(el.filteredTodos.length).to.equal(3);
      
      // Filter to 'completed'
      el.setFilter('completed');
      expect(el.filteredTodos.length).to.equal(1);
      expect(el.filteredTodos[0].id).to.equal(todo1.id);
      
      // Filter to 'active'
      el.setFilter('active');
      expect(el.filteredTodos.length).to.equal(2);
      expect(el.filteredTodos[0].id).to.equal(todo2.id);
      expect(el.filteredTodos[1].id).to.equal(todo3.id);
    });
    
    it('updates the UI when filter changes', async () => {
      const el = await fixture(html`<todo-list></todo-list>`);
      
      // Add todos
      el.addTodo('Todo 1');
      
      // Mark as completed
      el.toggleTodo(el.todos[0].id);
      
      // Add another todo
      el.addTodo('Todo 2');
      
      // Wait for rendering
      await el.updateComplete;
      
      // Filter to 'active'
      el.setFilter('active');
      await el.updateComplete;
      
      // Should only show one todo
      const todoItems = el.shadowRoot.querySelectorAll('li');
      expect(todoItems.length).to.equal(1);
      expect(todoItems[0].textContent).to.include('Todo 2');
      
      // Filter button should be active
      const activeBtn = el.shadowRoot.querySelector('.filter-btn.active');
      expect(activeBtn).to.exist;
      expect(activeBtn.textContent.trim()).to.equal('Active');
    });
  });
  
  describe('Async Operations', () => {
    it('loads todos asynchronously', async () => {
      const el = await fixture(html`<todo-list></todo-list>`);
      
      // Load todos (start loading)
      const loadPromise = el.loadTodos();
      
      // Should be in loading state
      expect(el.loading).to.be.true;
      
      // Wait for loading to finish
      await loadPromise;
      
      // Should have 3 todos and not be loading
      expect(el.loading).to.be.false;
      expect(el.todos.length).to.equal(3);
      
      // Check if todos are in the DOM
      await el.updateComplete;
      const todoItems = el.shadowRoot.querySelectorAll('li');
      expect(todoItems.length).to.equal(3);
    });
  });
  
  /**
   * User Interaction Tests
   */
  describe('User Interactions', () => {
    it('adds a todo when user types and clicks Add', async () => {
      const el = await fixture(html`<todo-list></todo-list>`);
      
      // Find the input and button
      const input = el.shadowRoot.querySelector('#new-todo');
      const addButton = el.shadowRoot.querySelector('.todo-form button');
      
      // Type in the input
      input.value = 'User Test Todo';
      
      // Click the add button
      addButton.click();
      
      // Wait for updates
      await el.updateComplete;
      
      // Check if todo was added
      expect(el.todos.length).to.equal(1);
      expect(el.todos[0].text).to.equal('User Test Todo');
    });
    
    it('adds a todo when user presses Enter in the input', async () => {
      const el = await fixture(html`<todo-list></todo-list>`);
      
      // Find the input
      const input = el.shadowRoot.querySelector('#new-todo');
      
      // Type in the input
      input.value = 'Enter Key Todo';
      
      // Simulate Enter key press
      const enterEvent = new KeyboardEvent('keyup', { key: 'Enter' });
      input.dispatchEvent(enterEvent);
      
      // Wait for updates
      await el.updateComplete;
      
      // Check if todo was added
      expect(el.todos.length).to.equal(1);
      expect(el.todos[0].text).to.equal('Enter Key Todo');
    });
    
    it('toggles todo when user clicks checkbox', async () => {
      const el = await fixture(html`<todo-list></todo-list>`);
      
      // Add a todo
      el.addTodo('Checkbox Test');
      await el.updateComplete;
      
      // Find the checkbox
      const checkbox = el.shadowRoot.querySelector('input[type="checkbox"]');
      expect(checkbox).to.exist;
      
      // Click the checkbox
      checkbox.click();
      await el.updateComplete;
      
      // Check if todo was toggled
      expect(el.todos[0].completed).to.be.true;
    });
    
    it('removes todo when user clicks delete button', async () => {
      const el = await fixture(html`<todo-list></todo-list>`);
      
      // Add a todo
      el.addTodo('Delete Test');
      await el.updateComplete;
      
      // Should have one todo
      expect(el.todos.length).to.equal(1);
      
      // Find the delete button
      const deleteButton = el.shadowRoot.querySelector('.delete-btn');
      expect(deleteButton).to.exist;
      
      // Click the delete button
      deleteButton.click();
      await el.updateComplete;
      
      // Should have no todos
      expect(el.todos.length).to.equal(0);
    });
  });
  
  /**
   * Accessibility Test
   */
  describe('Accessibility', () => {
    it('passes accessibility test', async () => {
      const el = await fixture(html`<todo-list></todo-list>`);
      await expect(el).shadowDom.to.be.accessible();
    });
  });
});
