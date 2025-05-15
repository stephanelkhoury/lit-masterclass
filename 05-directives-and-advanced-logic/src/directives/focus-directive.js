import { directive, AsyncDirective } from 'lit/async-directive.js';

/**
 * A custom directive that focuses an element when a condition is true
 * and provides additional focus management features.
 */
class FocusDirective extends AsyncDirective {
  // Whether the element is focused 
  _focused = false;
  
  // Reference to the element
  _element = null;

  render(shouldFocus, options = {}) {
    return (element) => {
      // Store the element reference
      this._element = element;
      
      // Update focus state based on the shouldFocus parameter
      if (shouldFocus && !this._focused) {
        this._applyFocus(element, options);
      } else if (!shouldFocus && this._focused) {
        this._removeFocus(element);
      }
      
      return element;
    };
  }
  
  // Apply focus to the element
  _applyFocus(element, options = {}) {
    if (!element || typeof element.focus !== 'function') return;
    
    // Add a small delay to ensure the element is rendered
    setTimeout(() => {
      // Focus the element
      element.focus(options);
      
      // Optionally select all text if requested
      if (options.select && 
          typeof element.select === 'function') {
        element.select();
      }
      
      this._focused = true;
      
      // If tabindex isn't set and we're using preventScroll, ensure element is focusable
      if (options.preventScroll && 
          !element.getAttribute('tabindex') && 
          element.tabIndex === -1) {
        element.setAttribute('tabindex', '0');
        this._addedTabindex = true;
      }
      
      // Dispatch a custom event
      const focusEvent = new CustomEvent('lit-focus-applied', {
        bubbles: true,
        composed: true,
        detail: { element }
      });
      
      element.dispatchEvent(focusEvent);
    }, options.delay || 0);
  }
  
  // Remove focus from the element
  _removeFocus(element) {
    if (!element) return;
    
    // If we added a tabindex, remove it
    if (this._addedTabindex) {
      element.removeAttribute('tabindex');
      this._addedTabindex = false;
    }
    
    this._focused = false;
    
    // If element is focused, blur it
    if (document.activeElement === element && 
        typeof element.blur === 'function') {
      element.blur();
    }
  }
  
  // Cleanup when disconnected
  disconnected() {
    // Clean up any added attributes
    if (this._element && this._addedTabindex) {
      this._element.removeAttribute('tabindex');
    }
    
    this._focused = false;
    this._element = null;
    this._addedTabindex = false;
  }
}

// Export the directive
export const focusWhen = directive(FocusDirective);
