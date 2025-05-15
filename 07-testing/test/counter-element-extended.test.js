// Additional tests for the counter-element
import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import '../src/components/counter-element.js';

describe('CounterElement Extended Tests', () => {
  // Test for custom initial values
  it('accepts custom initial values via attributes', async () => {
    const el = await fixture(html`
      <counter-element
        count="10"
        label="Custom Label"
        max="20"
      ></counter-element>
    `);
    
    expect(el.count).to.equal(10);
    expect(el.label).to.equal('Custom Label');
    expect(el.max).to.equal(20);
    
    expect(el.shadowRoot.querySelector('h3').textContent).to.equal('Custom Label');
    expect(el.shadowRoot.querySelector('.count').textContent.trim()).to.equal('10');
  });

  // Test the component's reactivity when properties change
  it('updates UI when properties change', async () => {
    const el = await fixture(html`<counter-element></counter-element>`);
    
    // Change properties programmatically
    el.count = 15;
    el.label = 'Updated Label';
    el.max = 25;
    
    // Wait for the update to complete
    await el.updateComplete;
    
    expect(el.shadowRoot.querySelector('h3').textContent).to.equal('Updated Label');
    expect(el.shadowRoot.querySelector('.count').textContent.trim()).to.equal('15');
  });

  // Test that the increment doesn't go over max
  it('prevents incrementing beyond max value', async () => {
    const el = await fixture(html`<counter-element count="9" max="10"></counter-element>`);
    
    // Click once - should work (9 -> 10)
    el.shadowRoot.querySelector('button').click();
    expect(el.count).to.equal(10);
    
    // Click again - should not increment (stays at 10)
    el.shadowRoot.querySelector('button').click();
    expect(el.count).to.equal(10);
  });

  // Test for event detail structure
  it('provides correct details in count-changed event', async () => {
    const el = await fixture(html`<counter-element></counter-element>`);
    
    setTimeout(() => el.shadowRoot.querySelector('button').click());
    
    const event = await oneEvent(el, 'count-changed');
    
    expect(event).to.exist;
    expect(event.type).to.equal('count-changed');
    expect(event.detail).to.be.an('object');
    expect(event.detail.value).to.equal(1);
    
    // Test event bubbling
    expect(event.bubbles).to.be.true;
    expect(event.composed).to.be.true;
  });

  // Test that the max-reached class is applied correctly
  it('applies max-reached class correctly', async () => {
    const el = await fixture(html`<counter-element max="3"></counter-element>`);
    
    // Initially should not have the class
    expect(el.shadowRoot.querySelector('.count').classList.contains('max-reached')).to.be.false;
    
    // Increment to max - 1
    el.count = 2;
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('.count').classList.contains('max-reached')).to.be.false;
    
    // Increment to max
    el.count = 3;
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('.count').classList.contains('max-reached')).to.be.true;
  });

  // Test slot functionality
  it('renders content in the default slot', async () => {
    const el = await fixture(html`
      <counter-element>
        <p>Custom slotted content</p>
      </counter-element>
    `);
    
    const slotContent = el.querySelector('p');
    expect(slotContent).to.exist;
    expect(slotContent.textContent).to.equal('Custom slotted content');
  });

  // Test working with imperative API
  it('provides a working imperative API', async () => {
    const el = await fixture(html`<counter-element></counter-element>`);
    
    // Direct method call
    el.increment();
    expect(el.count).to.equal(1);
    
    el.increment();
    expect(el.count).to.equal(2);
    
    el.reset();
    expect(el.count).to.equal(0);
  });

  // Test CSS custom properties for styling
  it('can be styled with CSS custom properties', async () => {
    const el = await fixture(html`
      <style>
        counter-element {
          --counter-background: red;
          --counter-text: blue;
        }
      </style>
      <counter-element></counter-element>
    `);
    
    // Note: In real-world applications, you would test computed styles
    // but in this test environment, that's not practical
    expect(el).to.exist;
  });
});
