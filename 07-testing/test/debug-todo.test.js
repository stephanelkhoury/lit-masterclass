import { html, fixture, expect } from '@open-wc/testing';
import '../src/components/todo-list.js';

describe('Debug TodoList', () => {
  it('tests add and remove todos', async () => {
    const el = await fixture(html`<todo-list></todo-list>`);
    
    // First, ensure todos array is cleared
    el.todos = [];
    await el.updateComplete;
    
    console.log('Initial todos length:', el.todos.length);
    
    // Add a todo
    const todo1 = el.addTodo('Test Todo 1');
    console.log('After adding todo1:', el.todos.length);
    console.log('Todo1 ID:', todo1.id);
    
    // Add another todo
    const todo2 = el.addTodo('Test Todo 2');
    console.log('After adding todo2:', el.todos.length);
    console.log('Todo2 ID:', todo2.id);
    
    // Remove the first todo
    el.removeTodo(todo1.id);
    console.log('After removing todo1:', el.todos.length);
    console.log('Remaining todos:', JSON.stringify(el.todos));
    
    // The test
    expect(el.todos.length).to.equal(1);
  });
});
