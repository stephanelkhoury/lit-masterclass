import { LitElement, html, css } from 'lit';
import './components/tm-app-shell.js';

/**
 * Main application component for TaskMaster
 * 
 * @element taskmaster-app
 */
export class TaskmasterApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      height: 100vh;
      width: 100vw;
      overflow: hidden;
    }
  `;

  render() {
    return html`
      <tm-app-shell></tm-app-shell>
    `;
  }
}

customElements.define('taskmaster-app', TaskmasterApp);
