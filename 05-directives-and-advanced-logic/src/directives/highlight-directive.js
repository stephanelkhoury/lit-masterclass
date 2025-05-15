import { directive, Directive, PartType, ChildPart, noChange } from 'lit/directive.js';

/**
 * A custom directive to highlight occurrences of a search term in a text.
 * 
 * This directive demonstrates how to create a custom directive that:
 * 1. Takes parameters
 * 2. Updates based on changing input
 * 3. Manipulates the rendered content
 */
class HighlightDirective extends Directive {
  constructor(partInfo) {
    super(partInfo);
    // Only allow this directive to be used on child expressions (text content)
    if (partInfo.type !== PartType.CHILD) {
      throw new Error('highlight directive can only be used in text content');
    }
  }
  
  // These are the arguments from the template
  text = '';
  searchTerm = '';
  caseSensitive = false;
  
  render(text, searchTerm, caseSensitive = false) {
    this.text = text;
    this.searchTerm = searchTerm;
    this.caseSensitive = caseSensitive;
    
    // If there's no search term, just return the original text
    if (!searchTerm || !text) {
      return text;
    }
    
    return this._highlightText();
  }
  
  // Create a highlighted version of the text
  _highlightText() {
    const text = this.text;
    const term = this.caseSensitive ? this.searchTerm : this.searchTerm.toLowerCase();
    
    if (!term || term === '') {
      return text;
    }
    
    // Create a document fragment to hold the highlighted text
    const fragment = document.createDocumentFragment();
    
    // Convert to lowercase for case-insensitive search
    const searchText = this.caseSensitive ? text : text.toLowerCase();
    
    let lastIndex = 0;
    let index = searchText.indexOf(term, lastIndex);
    
    while (index !== -1) {
      // Add the text before the match
      if (index > lastIndex) {
        fragment.appendChild(document.createTextNode(
          text.substring(lastIndex, index)
        ));
      }
      
      // Add the highlighted match
      const highlight = document.createElement('span');
      highlight.className = 'highlight';
      highlight.textContent = text.substring(index, index + term.length);
      fragment.appendChild(highlight);
      
      // Move past this match
      lastIndex = index + term.length;
      
      // Look for the next match
      index = searchText.indexOf(term, lastIndex);
    }
    
    // Add any remaining text
    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(
        text.substring(lastIndex)
      ));
    }
    
    return fragment;
  }
  
  update(part, [text, searchTerm, caseSensitive = false]) {
    // Only re-render if the parameters have changed
    if (
      this.text !== text ||
      this.searchTerm !== searchTerm ||
      this.caseSensitive !== caseSensitive
    ) {
      return this.render(text, searchTerm, caseSensitive);
    }
    
    return noChange;
  }
}

// Create the directive function that will be imported
export const highlight = directive(HighlightDirective);
