import { directive, AsyncDirective } from 'lit/async-directive.js';

/**
 * A custom async directive that loads data and shows a loading state.
 * Demonstrates:
 * - Creating asynchronous directives
 * - Handling loading, error, and success states
 * - Updating the DOM asynchronously
 */
class AsyncLoadDirective extends AsyncDirective {
  // Reference to the pending promise
  _promise = null;
  
  // State values
  _value = null;
  _error = null;
  _loading = false;
  
  render(promiseOrFunc, loadingTemplate, errorTemplate) {
    // Skip if we're already handling this exact promise
    if (this._promise === promiseOrFunc) {
      // If we have an error, show the error template
      if (this._error) {
        return typeof errorTemplate === 'function' 
          ? errorTemplate(this._error) 
          : errorTemplate;
      }
      
      // If we have a value, return it
      if (this._value !== null) {
        return this._value;
      }
      
      // Otherwise, show loading template
      return loadingTemplate;
    }
    
    // Start a new load process
    this._loading = true;
    this._error = null;
    this._value = null;
    
    // Get the promise from the input (either a promise or a function that returns a promise)
    const promise = typeof promiseOrFunc === 'function' 
      ? promiseOrFunc() 
      : promiseOrFunc;
    
    this._promise = promise;
    
    // Handle the promise resolution
    promise.then(
      // Success handler
      (value) => {
        // Only update if this is still the active promise
        if (this._promise === promise) {
          this._value = value;
          this._loading = false;
          this._error = null;
          
          // Update the DOM with the new value
          this.setValue(value);
        }
      },
      // Error handler
      (error) => {
        // Only update if this is still the active promise
        if (this._promise === promise) {
          this._error = error;
          this._loading = false;
          this._value = null;
          
          // Update the DOM with the error template
          this.setValue(
            typeof errorTemplate === 'function'
              ? errorTemplate(error)
              : errorTemplate
          );
        }
      }
    );
    
    // Return the loading template while we wait
    return loadingTemplate;
  }
  
  // Disconnect: clean up resources when the directive is removed
  disconnected() {
    this._promise = null;
    this._value = null;
    this._error = null;
    this._loading = false;
  }
  
  // Reconnect: re-render when the directive is reconnected
  reconnected() {
    // When reconnected, we'll get a fresh render call anyway
  }
}

// Create the directive function that will be imported
export const asyncLoad = directive(AsyncLoadDirective);
