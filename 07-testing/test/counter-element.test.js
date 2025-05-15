import { html, fixture, expect, oneEvent, aTimeout } from '@open-wc/testing';
import '../src/components/counter-element.js';

describe('CounterElement', () => {
  it('renders with default values', async () => {
    const el = await fixture(html`<counter-element></counter-element>`);
    
    expect(el.count).to.equal(0);
    expect(el.label).to.equal('Count');
    expect(el.max).to.equal(Infinity);
    
    // Check if the label is rendered
    expect(el.shadowRoot.querySelector('h3').textContent).to.equal('Count');
    
    // Check if the count is displayed
    expect(el.shadowRoot.querySelector('.count').textContent.trim()).to.equal('0');
  });

  it('increments the counter when the button is clicked', async () => {
    const el = await fixture(html`<counter-element></counter-element>`);
    
    el.shadowRoot.querySelector('button').click();
    await el.updateComplete;
    
    expect(el.count).to.equal(1);
    expect(el.shadowRoot.querySelector('.count').textContent.trim()).to.equal('1');
  });

  it('resets the counter when the reset button is clicked', async () => {
    const el = await fixture(html`<counter-element></counter-element>`);
    
    // First set the count to 5
    el.count = 5;
    await el.updateComplete;
    
    expect(el.count).to.equal(5);
    
    el.shadowRoot.querySelectorAll('button')[1].click();
    await el.updateComplete;
    
    expect(el.count).to.equal(0);
    expect(el.shadowRoot.querySelector('.count').textContent.trim()).to.equal('0');
  });

  it('dispatches count-changed event on increment', async () => {
    const el = await fixture(html`<counter-element></counter-element>`);
    
    setTimeout(() => el.shadowRoot.querySelector('button').click());
    
    const { detail } = await oneEvent(el, 'count-changed');
    
    expect(detail.value).to.equal(1);
  });

  it('disables the increment button when max is reached', async () => {
    const el = await fixture(html`<counter-element max="3"></counter-element>`);
    
    // Initial state
    expect(el.shadowRoot.querySelector('button').disabled).to.be.false;
    
    // Directly set count to max to test the disabled state
    el.count = el.max;
    await el.updateComplete;
    
    // Now the count should be 3 and the button disabled
    expect(el.count).to.equal(3);
    expect(el.shadowRoot.querySelector('button').disabled).to.be.true;
    
    // The count should have the max-reached class
    expect(el.shadowRoot.querySelector('.count').classList.contains('max-reached')).to.be.true;
  });

  it('can be styled via CSS parts', async () => {
    const el = await fixture(html`
      <counter-element></counter-element>
      <style>
        counter-element::part(button) {
          background-color: red;
        }
        counter-element::part(count) {
          color: blue;
        }
      </style>
    `);
    
    const button = el.shadowRoot.querySelector('button');
    const count = el.shadowRoot.querySelector('.count');
    
    // Note: We can't test actual computed styles in this test environment,
    // but we can test that the parts are correctly exposed
    expect(button.getAttribute('part')).to.include('button');
    expect(count.getAttribute('part')).to.include('count');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(html`<counter-element></counter-element>`);
    
    await expect(el).shadowDom.to.be.accessible();
  });
});
