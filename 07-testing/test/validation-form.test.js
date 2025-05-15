import { html, fixture, expect, oneEvent, aTimeout } from '@open-wc/testing';
import { spy } from 'sinon';
import '../src/components/validation-form.js';

describe('ValidationForm Component', () => {
  /**
   * Basic Rendering Tests
   */
  describe('Basic Rendering', () => {
    it('renders with default values', async () => {
      const el = await fixture(html`<validation-form></validation-form>`);
      
      expect(el.formData).to.deep.equal({
        name: '',
        email: '',
        message: '',
        subject: 'general'
      });
      expect(el.errors).to.deep.equal({});
      expect(el.loading).to.be.false;
    });
    
    it('renders all form fields properly', async () => {
      const el = await fixture(html`<validation-form></validation-form>`);
      
      // Check for input elements
      const nameInput = el.shadowRoot.querySelector('#name');
      const emailInput = el.shadowRoot.querySelector('#email');
      const subjectSelect = el.shadowRoot.querySelector('#subject');
      const messageTextarea = el.shadowRoot.querySelector('#message');
      const submitButton = el.shadowRoot.querySelector('.submit-btn');
      
      expect(nameInput).to.exist;
      expect(emailInput).to.exist;
      expect(subjectSelect).to.exist;
      expect(messageTextarea).to.exist;
      expect(submitButton).to.exist;
      
      // Check default values
      expect(nameInput.value).to.equal('');
      expect(emailInput.value).to.equal('');
      expect(subjectSelect.value).to.equal('general');
      expect(messageTextarea.value).to.equal('');
      expect(submitButton.textContent.trim()).to.equal('Submit');
    });
  });
  
  /**
   * Form Input Tests
   */
  describe('Form Input Handling', () => {
    it('updates formData when inputs change', async () => {
      const el = await fixture(html`<validation-form></validation-form>`);
      
      const nameInput = el.shadowRoot.querySelector('#name');
      nameInput.value = 'John Doe';
      nameInput.dispatchEvent(new Event('input'));
      
      expect(el.formData.name).to.equal('John Doe');
      
      const emailInput = el.shadowRoot.querySelector('#email');
      emailInput.value = 'john@example.com';
      emailInput.dispatchEvent(new Event('input'));
      
      expect(el.formData.email).to.equal('john@example.com');
    });
    
    it('updates formData when select changes', async () => {
      const el = await fixture(html`<validation-form></validation-form>`);
      
      const subjectSelect = el.shadowRoot.querySelector('#subject');
      subjectSelect.value = 'support';
      subjectSelect.dispatchEvent(new Event('change'));
      
      expect(el.formData.subject).to.equal('support');
    });
    
    it('clears field error when input changes', async () => {
      const el = await fixture(html`<validation-form></validation-form>`);
      
      // Set an error manually
      el.errors = { name: 'Name is required' };
      await el.updateComplete;
      
      // Check that error is displayed
      expect(el.shadowRoot.querySelector('.error')).to.exist;
      
      // Change input value
      const nameInput = el.shadowRoot.querySelector('#name');
      nameInput.value = 'John';
      nameInput.dispatchEvent(new Event('input'));
      
      await el.updateComplete;
      
      // Error should be cleared
      expect(el.errors.name).to.be.undefined;
      expect(el.shadowRoot.querySelector('.error')).to.not.exist;
    });
  });
  
  /**
   * Validation Tests
   */
  describe('Form Validation', () => {
    it('validates name field correctly', async () => {
      const el = await fixture(html`<validation-form></validation-form>`);
      
      // Empty name
      el.formData = { ...el.formData, name: '' };
      el.validateForm();
      expect(el.errors.name).to.equal('Name is required');
      
      // Too short name
      el.formData = { ...el.formData, name: 'A' };
      el.validateForm();
      expect(el.errors.name).to.equal('Name must be at least 2 characters');
      
      // Valid name
      el.formData = { ...el.formData, name: 'John' };
      el.validateForm();
      expect(el.errors.name).to.be.undefined;
    });
    
    it('validates email field correctly', async () => {
      const el = await fixture(html`<validation-form></validation-form>`);
      
      // Empty email
      el.formData = { ...el.formData, email: '' };
      el.validateForm();
      expect(el.errors.email).to.equal('Email is required');
      
      // Invalid email format
      el.formData = { ...el.formData, email: 'notanemail' };
      el.validateForm();
      expect(el.errors.email).to.equal('Please enter a valid email address');
      
      // Valid email
      el.formData = { ...el.formData, email: 'test@example.com' };
      el.validateForm();
      expect(el.errors.email).to.be.undefined;
    });
    
    it('validates message field correctly', async () => {
      const el = await fixture(html`<validation-form></validation-form>`);
      
      // Empty message
      el.formData = { ...el.formData, message: '' };
      el.validateForm();
      expect(el.errors.message).to.equal('Message is required');
      
      // Too short message
      el.formData = { ...el.formData, message: 'Too short' };
      el.validateForm();
      expect(el.errors.message).to.equal('Message must be at least 10 characters');
      
      // Valid message
      el.formData = { ...el.formData, message: 'This is a valid message with sufficient length' };
      el.validateForm();
      expect(el.errors.message).to.be.undefined;
    });
    
    it('shows validation errors in the UI', async () => {
      const el = await fixture(html`<validation-form></validation-form>`);
      
      // Try to submit empty form
      const submitButton = el.shadowRoot.querySelector('.submit-btn');
      submitButton.click();
      
      await el.updateComplete;
      
      // Should show errors
      const errorMessages = el.shadowRoot.querySelectorAll('.error');
      expect(errorMessages.length).to.equal(3); // name, email, message
    });
    
    it('adds invalid class to fields with errors', async () => {
      const el = await fixture(html`<validation-form></validation-form>`);
      
      // Try to submit empty form
      const submitButton = el.shadowRoot.querySelector('.submit-btn');
      submitButton.click();
      
      await el.updateComplete;
      
      // Check for invalid class
      const nameInput = el.shadowRoot.querySelector('#name');
      expect(nameInput.classList.contains('invalid')).to.be.true;
    });
    
    it('fires validation-error event when validation fails', async () => {
      const el = await fixture(html`<validation-form></validation-form>`);
      
      // Set up event listener
      const validationSpy = spy();
      el.addEventListener('validation-error', validationSpy);
      
      // Try to submit empty form
      const form = el.shadowRoot.querySelector('form');
      const event = new Event('submit');
      event.preventDefault = spy();
      form.dispatchEvent(event);
      
      expect(validationSpy.called).to.be.true;
      expect(event.preventDefault.called).to.be.true;
    });
  });
  
  /**
   * Form Submission Tests
   */
  describe('Form Submission', () => {
    it('does not submit if validation fails', async () => {
      const el = await fixture(html`<validation-form></validation-form>`);
      
      // Spy on the submit event
      const submitSpy = spy();
      el.addEventListener('form-submit', submitSpy);
      
      // Try to submit with empty form
      const form = el.shadowRoot.querySelector('form');
      const event = new Event('submit');
      event.preventDefault = () => {}; // Just to avoid errors
      form.dispatchEvent(event);
      
      // Submit event should not be fired
      expect(submitSpy.called).to.be.false;
      
      // Should not be in loading state
      expect(el.loading).to.be.false;
    });
    
    it('submits when form is valid and fires form-submit event', async () => {
      const el = await fixture(html`<validation-form></validation-form>`);
      
      // Fill form with valid data
      el.formData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a test message with sufficient length',
        subject: 'feedback'
      };
      
      // Submit form
      setTimeout(() => {
        const form = el.shadowRoot.querySelector('form');
        const event = new Event('submit');
        event.preventDefault = () => {};
        form.dispatchEvent(event);
      });
      
      // Wait for the submit event
      const { detail } = await oneEvent(el, 'form-submit');
      
      // Check event details
      expect(detail).to.exist;
      expect(detail.formData).to.deep.equal({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a test message with sufficient length',
        subject: 'feedback'
      });
      
      // Form should be reset
      expect(el.formData).to.deep.equal({
        name: '',
        email: '',
        message: '',
        subject: 'general'
      });
    });
    
    it('shows loading state during submission', async () => {
      const el = await fixture(html`<validation-form></validation-form>`);
      
      // Fill form with valid data
      el.formData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a test message with sufficient length',
        subject: 'general'
      };
      
      // Start the submission process
      const form = el.shadowRoot.querySelector('form');
      const event = new Event('submit');
      event.preventDefault = () => {};
      form.dispatchEvent(event);
      
      // Should be in loading state
      expect(el.loading).to.be.true;
      
      // Wait for loading to finish
      await aTimeout(1100); // Wait for the simulated API call (1000ms) plus a little buffer
      
      // Should no longer be in loading state
      expect(el.loading).to.be.false;
    });
    
    it('disables form fields during submission', async () => {
      const el = await fixture(html`<validation-form></validation-form>`);
      
      // Set loading state manually
      el.loading = true;
      await el.updateComplete;
      
      // Check all inputs are disabled
      const nameInput = el.shadowRoot.querySelector('#name');
      const emailInput = el.shadowRoot.querySelector('#email');
      const subjectSelect = el.shadowRoot.querySelector('#subject');
      const messageTextarea = el.shadowRoot.querySelector('#message');
      const submitButton = el.shadowRoot.querySelector('.submit-btn');
      
      expect(nameInput.disabled).to.be.true;
      expect(emailInput.disabled).to.be.true;
      expect(subjectSelect.disabled).to.be.true;
      expect(messageTextarea.disabled).to.be.true;
      expect(submitButton.disabled).to.be.true;
    });
    
    it('shows loading spinner during submission', async () => {
      const el = await fixture(html`<validation-form></validation-form>`);
      
      // Set loading state manually
      el.loading = true;
      await el.updateComplete;
      
      // Check for loading spinner
      const spinner = el.shadowRoot.querySelector('.loading-spinner');
      expect(spinner).to.exist;
    });
  });
  
  /**
   * Accessibility Test
   */
  describe('Accessibility', () => {
    it('passes accessibility test', async () => {
      const el = await fixture(html`<validation-form></validation-form>`);
      await expect(el).shadowDom.to.be.accessible();
    });
  });
});
