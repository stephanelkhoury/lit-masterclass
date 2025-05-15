import { LitElement, html, css } from 'lit';
import { ref, createRef } from 'lit/directives/ref.js';

/**
 * Component demonstrating the ref directive for DOM access
 */
export class RefDirectiveExample extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    
    .canvas-container {
      border: 1px solid #ddd;
      margin: 1rem 0;
      border-radius: var(--border-radius);
      overflow: hidden;
    }
    
    canvas {
      display: block;
      background-color: white;
    }
    
    .controls {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;
    }
    
    .color-btn {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      border: 2px solid white;
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }
    
    .color-btn.selected {
      border-color: black;
      transform: scale(1.1);
    }
    
    .info {
      background-color: #e3f2fd;
      padding: 1rem;
      border-radius: var(--border-radius);
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }
    
    .output-box {
      background-color: #f5f5f5;
      padding: 1rem;
      border-radius: var(--border-radius);
      margin: 1rem 0;
      font-family: monospace;
      white-space: pre-wrap;
    }
  `;

  static properties = {
    currentColor: { type: String },
    brushSize: { type: Number },
    isDrawing: { type: Boolean, state: true },
    measurements: { type: Object },
  };

  constructor() {
    super();
    this.currentColor = '#000000';
    this.brushSize = 5;
    this.isDrawing = false;
    this.measurements = { width: 0, height: 0 };
    
    // Create refs for elements we need to access directly
    this.canvasRef = createRef();
    this.outputRef = createRef();
    
    // Available colors
    this.colors = [
      '#000000', // Black
      '#e91e63', // Pink
      '#9c27b0', // Purple
      '#3f51b5', // Indigo
      '#2196f3', // Blue
      '#00bcd4', // Cyan
      '#4caf50', // Green
      '#ffeb3b', // Yellow
      '#ff9800', // Orange
      '#795548'  // Brown
    ];
  }

  // Called after the component is first updated
  firstUpdated() {
    // Initialize the canvas
    this._initCanvas();
    
    // Set up resize observer to handle canvas resizing
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.target === this.canvasRef.value) {
          this._resizeCanvas();
        }
      }
    });
    
    if (this.canvasRef.value) {
      this.resizeObserver.observe(this.canvasRef.value);
    }
  }
  
  // Handle disconnection to clean up observers
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  // Initialize canvas settings
  _initCanvas() {
    const canvas = this.canvasRef.value;
    if (!canvas) return;
    
    this._resizeCanvas();
    
    // Set up event listeners
    canvas.addEventListener('mousedown', this._startDrawing.bind(this));
    canvas.addEventListener('mousemove', this._draw.bind(this));
    canvas.addEventListener('mouseup', this._stopDrawing.bind(this));
    canvas.addEventListener('mouseleave', this._stopDrawing.bind(this));
    
    // For touch devices
    canvas.addEventListener('touchstart', this._handleTouchStart.bind(this));
    canvas.addEventListener('touchmove', this._handleTouchMove.bind(this));
    canvas.addEventListener('touchend', this._stopDrawing.bind(this));
    
    // Initial clear
    this._clearCanvas();
  }

  // Resize canvas to fit container
  _resizeCanvas() {
    const canvas = this.canvasRef.value;
    if (!canvas) return;
    
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = 200;
    
    this.measurements = {
      width: canvas.width,
      height: canvas.height
    };
    
    // Update output display
    this._updateOutput();
  }

  // Start drawing on the canvas
  _startDrawing(e) {
    this.isDrawing = true;
    const canvas = this.canvasRef.value;
    const ctx = canvas.getContext('2d');
    const pos = this._getPosition(e);
    
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  // Draw on the canvas
  _draw(e) {
    if (!this.isDrawing) return;
    
    const canvas = this.canvasRef.value;
    const ctx = canvas.getContext('2d');
    const pos = this._getPosition(e);
    
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = this.currentColor;
    ctx.lineWidth = this.brushSize;
    ctx.lineCap = 'round';
    ctx.stroke();
  }

  // Stop drawing
  _stopDrawing() {
    this.isDrawing = false;
  }

  // Get mouse position relative to canvas
  _getPosition(e) {
    const canvas = this.canvasRef.value;
    const rect = canvas.getBoundingClientRect();
    
    if (e.type.includes('touch')) {
      // Handle touch events
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else {
      // Handle mouse events
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  }

  // Touch event handlers
  _handleTouchStart(e) {
    e.preventDefault();
    this._startDrawing(e);
  }
  
  _handleTouchMove(e) {
    e.preventDefault();
    this._draw(e);
  }

  // Change the current drawing color
  _changeColor(color) {
    this.currentColor = color;
  }

  // Change the brush size
  _changeBrushSize(e) {
    this.brushSize = parseInt(e.target.value);
  }

  // Clear the canvas
  _clearCanvas() {
    const canvas = this.canvasRef.value;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Update the output display showing ref information
  _updateOutput() {
    if (!this.outputRef.value) return;
    
    const outputInfo = `Canvas Element Info:
- Width: ${this.measurements.width}px
- Height: ${this.measurements.height}px
- Current Color: ${this.currentColor}
- Brush Size: ${this.brushSize}px
- Is Drawing: ${this.isDrawing}`;
    
    this.outputRef.value.textContent = outputInfo;
  }

  render() {
    // Make sure to update the output whenever we render
    setTimeout(() => this._updateOutput(), 0);
    
    return html`
      <div class="info">
        The <code>ref</code> directive provides a way to get direct access to DOM elements 
        in your component. This is useful for imperative DOM operations like working with 
        canvas, focusing inputs, or measuring elements.
      </div>
      
      <div class="controls">
        ${this.colors.map(color => html`
          <div 
            class="color-btn ${this.currentColor === color ? 'selected' : ''}" 
            style="background-color: ${color}" 
            @click=${() => this._changeColor(color)}>
          </div>
        `)}
        
        <div>
          <label>
            Size: 
            <input 
              type="range" 
              min="1" 
              max="20" 
              .value=${this.brushSize} 
              @input=${this._changeBrushSize}>
          </label>
        </div>
        
        <button @click=${this._clearCanvas}>Clear</button>
      </div>
      
      <div class="canvas-container">
        <canvas ${ref(this.canvasRef)}></canvas>
      </div>
      
      <div class="output-box" ${ref(this.outputRef)}>Loading canvas info...</div>
    `;
  }
}

customElements.define('ref-directive-example', RefDirectiveExample);
