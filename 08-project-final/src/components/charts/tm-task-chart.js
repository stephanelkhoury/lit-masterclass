import { LitElement, html, css } from 'lit';

/**
 * Task Chart Component
 * A reusable chart component for visualizing task data
 * 
 * @element tm-task-chart
 * @cssprop --chart-background - Chart background color
 * @cssprop --chart-border - Chart border
 * @cssprop --chart-height - Chart height
 * @cssprop --chart-padding - Chart internal padding
 * @cssprop --chart-text-color - Chart text color
 * @cssprop --chart-title-color - Chart title color
 * @cssprop --chart-grid-color - Chart grid line color
 * @cssprop --chart-bar-color-1 - First bar color
 * @cssprop --chart-bar-color-2 - Second bar color
 * @cssprop --chart-bar-color-3 - Third bar color
 * @cssprop --chart-bar-color-4 - Fourth bar color
 * @cssprop --chart-bar-color-5 - Fifth bar color
 */
export class TaskChart extends LitElement {
  static properties = {
    /**
     * Chart type: 'bar', 'line', 'pie', 'doughnut'
     */
    type: { type: String },
    
    /**
     * Chart title
     */
    title: { type: String },
    
    /**
     * Data to be visualized
     */
    data: { type: Object },
    
    /**
     * Additional chart options
     */
    options: { type: Object },
    
    /**
     * Chart width in pixels or percentage
     */
    width: { type: String },
    
    /**
     * Chart height in pixels
     */
    height: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    .chart-container {
      background-color: var(--chart-background, white);
      border: var(--chart-border, 1px solid #e0e0e0);
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      padding: var(--chart-padding, 16px);
      color: var(--chart-text-color, #333);
      position: relative;
    }

    .chart-title {
      font-size: 1.2rem;
      font-weight: 600;
      margin-top: 0;
      margin-bottom: 16px;
      color: var(--chart-title-color, #2962ff);
      text-align: center;
    }

    .chart {
      position: relative;
      width: 100%;
      height: 100%;
    }

    canvas {
      width: 100%;
      display: block;
    }

    /* Bar chart specific styles */
    .bar-chart {
      display: flex;
      flex-direction: column;
      height: var(--chart-height, 300px);
    }

    .bar-chart-grid {
      display: flex;
      flex: 1;
      position: relative;
      padding-left: 40px;
      padding-bottom: 30px;
      box-sizing: border-box;
    }

    .y-axis {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 30px;
      width: 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: var(--chart-text-color, #666);
      font-size: 12px;
    }

    .y-axis-label {
      text-align: right;
      padding-right: 5px;
      transform: translateY(50%);
    }

    .x-axis {
      position: absolute;
      left: 40px;
      right: 0;
      bottom: 0;
      height: 30px;
      display: flex;
    }

    .x-axis-label {
      text-align: center;
      padding-top: 5px;
      flex: 1;
      font-size: 12px;
      color: var(--chart-text-color, #666);
    }

    .grid-lines {
      position: absolute;
      left: 40px;
      right: 0;
      top: 0;
      bottom: 30px;
    }

    .grid-line {
      position: absolute;
      left: 0;
      right: 0;
      height: 1px;
      background-color: var(--chart-grid-color, #e0e0e0);
    }

    .bars-container {
      display: flex;
      align-items: flex-end;
      height: 100%;
      width: 100%;
      position: relative;
      padding-top: 10px;
    }

    .bar-group {
      display: flex;
      flex: 1;
      height: 100%;
      justify-content: center;
      gap: 5px;
    }

    .bar {
      width: 30px;
      background-color: var(--chart-bar-color-1, #2962ff);
      border-radius: 4px 4px 0 0;
      transition: height 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67);
    }

    /* Donut/Pie chart specific styles */
    .donut-chart {
      position: relative;
      width: 100%;
      height: var(--chart-height, 300px);
    }

    .donut-svg {
      width: 100%;
      height: 100%;
    }

    .donut-segment {
      transition: transform 0.2s ease-out;
    }

    .donut-segment:hover {
      transform: translateX(10px) translateY(-5px);
    }

    .donut-hole {
      fill: var(--chart-background, white);
    }

    .donut-legend {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 16px;
      gap: 12px;
    }

    .legend-item {
      display: flex;
      align-items: center;
      font-size: 12px;
      margin-right: 10px;
    }

    .legend-color {
      width: 12px;
      height: 12px;
      margin-right: 4px;
      border-radius: 2px;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: var(--chart-height, 300px);
      color: #999;
      text-align: center;
      padding: 20px;
    }

    .empty-state-icon {
      font-size: 36px;
      margin-bottom: 10px;
    }
  `;

  constructor() {
    super();
    this.type = 'bar';
    this.title = 'Task Chart';
    this.data = null;
    this.options = {};
    this.width = '100%';
    this.height = '300px';
    
    // Internal state
    this._chartData = null;
    this._colors = [
      'var(--chart-bar-color-1, #2962ff)',
      'var(--chart-bar-color-2, #00c853)',
      'var(--chart-bar-color-3, #ff6d00)',
      'var(--chart-bar-color-4, #d50000)',
      'var(--chart-bar-color-5, #aa00ff)'
    ];
  }

  firstUpdated() {
    this._processData();
  }

  updated(changedProps) {
    if (changedProps.has('data') || changedProps.has('type') || changedProps.has('options')) {
      this._processData();
    }
  }

  /**
   * Process raw data into chart-ready format
   */
  _processData() {
    if (!this.data) return;
    
    switch(this.type) {
      case 'bar':
        this._processBarData();
        break;
      case 'pie':
      case 'doughnut':
        this._processDonutData();
        break;
      // Other chart types would be processed here
    }
  }

  /**
   * Process data for bar chart
   */
  _processBarData() {
    const { labels, datasets } = this.data;
    if (!labels || !datasets || datasets.length === 0) return;
    
    // Find the maximum value across all datasets
    let maxValue = 0;
    datasets.forEach(dataset => {
      dataset.data.forEach(value => {
        if (value > maxValue) maxValue = value;
      });
    });
    
    // Calculate reasonable Y-axis scale
    this._yAxisMax = this._calculateYAxisMax(maxValue);
    this._yAxisSteps = 5; // Number of Y-axis gridlines
    this._yAxisValues = Array.from({ length: this._yAxisSteps + 1 }, 
      (_, i) => Math.round(this._yAxisMax * i / this._yAxisSteps));
    
    this._chartData = {
      labels,
      datasets: datasets.map((dataset, index) => ({
        ...dataset,
        color: dataset.color || this._colors[index % this._colors.length]
      }))
    };
  }

  /**
   * Process data for donut/pie chart
   */
  _processDonutData() {
    if (!this.data || !this.data.datasets || this.data.datasets.length === 0) return;
    
    // For pie/donut, we typically use just the first dataset
    const dataset = this.data.datasets[0];
    const labels = this.data.labels || [];
    
    // Calculate total for percentages
    const total = dataset.data.reduce((sum, value) => sum + value, 0);
    
    // Process segments
    let currentAngle = 0;
    const segments = [];
    
    dataset.data.forEach((value, index) => {
      const percentage = total === 0 ? 0 : (value / total) * 100;
      const angle = total === 0 ? 0 : (value / total) * 360;
      
      segments.push({
        value,
        percentage,
        startAngle: currentAngle,
        angle,
        endAngle: currentAngle + angle,
        color: dataset.backgroundColor?.[index] || this._colors[index % this._colors.length],
        label: labels[index] || `Item ${index + 1}`
      });
      
      currentAngle += angle;
    });
    
    this._chartData = {
      segments,
      total
    };
  }

  /**
   * Calculate a nice round maximum Y-axis value based on data
   */
  _calculateYAxisMax(maxValue) {
    if (maxValue === 0) return 10; // Default for empty data
    
    // Find the order of magnitude
    const magnitude = Math.pow(10, Math.floor(Math.log10(maxValue)));
    const normalized = maxValue / magnitude;
    
    // Round up to a nice number
    let niceMax;
    if (normalized <= 1) niceMax = 1;
    else if (normalized <= 2) niceMax = 2;
    else if (normalized <= 5) niceMax = 5;
    else niceMax = 10;
    
    return niceMax * magnitude;
  }

  /**
   * Calculate SVG path for a donut segment
   */
  _calculateDonutPath(segment, radius, innerRadius, centerX, centerY) {
    const startAngle = (segment.startAngle - 90) * Math.PI / 180;
    const endAngle = (segment.endAngle - 90) * Math.PI / 180;
    
    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);
    
    const x3 = centerX + innerRadius * Math.cos(endAngle);
    const y3 = centerY + innerRadius * Math.sin(endAngle);
    const x4 = centerX + innerRadius * Math.cos(startAngle);
    const y4 = centerY + innerRadius * Math.sin(startAngle);
    
    const largeArc = segment.angle > 180 ? 1 : 0;
    
    // Outer arc
    let path = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
    
    if (this.type === 'doughnut') {
      // Inner arc for donut
      path += ` L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`;
    } else {
      // Complete pie slice
      path += ` L ${centerX} ${centerY} Z`;
    }
    
    return path;
  }

  /**
   * Render bar chart
   */
  _renderBarChart() {
    if (!this._chartData) return this._renderEmptyState();
    
    const { labels, datasets } = this._chartData;
    
    return html`
      <div class="bar-chart">
        <h3 class="chart-title">${this.title}</h3>
        <div class="bar-chart-grid">
          <!-- Y-axis labels -->
          <div class="y-axis">
            ${this._yAxisValues.map(value => html`
              <div class="y-axis-label">${value}</div>
            `)}
          </div>
          
          <!-- X-axis labels -->
          <div class="x-axis">
            ${labels.map(label => html`
              <div class="x-axis-label">${label}</div>
            `)}
          </div>
          
          <!-- Grid lines -->
          <div class="grid-lines">
            ${this._yAxisValues.map((value, index) => html`
              <div class="grid-line" style="bottom: ${(index / this._yAxisSteps) * 100}%"></div>
            `)}
          </div>
          
          <!-- Bars -->
          <div class="bars-container">
            ${labels.map((_, labelIndex) => html`
              <div class="bar-group">
                ${datasets.map((dataset, datasetIndex) => {
                  const value = dataset.data[labelIndex] || 0;
                  const height = (value / this._yAxisMax) * 100;
                  return html`
                    <div class="bar" style="
                      height: ${height}%;
                      background-color: ${dataset.color};
                    " title="${dataset.label}: ${value}"></div>
                  `;
                })}
              </div>
            `)}
          </div>
        </div>
        
        <!-- Legend -->
        <div class="donut-legend">
          ${datasets.map(dataset => html`
            <div class="legend-item">
              <div class="legend-color" style="background-color: ${dataset.color}"></div>
              <span>${dataset.label}</span>
            </div>
          `)}
        </div>
      </div>
    `;
  }

  /**
   * Render donut or pie chart
   */
  _renderDonutChart() {
    if (!this._chartData || this._chartData.total === 0) 
      return this._renderEmptyState();
    
    const { segments } = this._chartData;
    const size = 300; // SVG viewbox size
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.4;
    const innerRadius = this.type === 'doughnut' ? radius * 0.6 : 0;
    
    return html`
      <div class="donut-chart">
        <h3 class="chart-title">${this.title}</h3>
        
        <svg class="donut-svg" viewBox="0 0 ${size} ${size}" aria-label="${this.title}">
          ${segments.map(segment => html`
            <path 
              class="donut-segment"
              d="${this._calculateDonutPath(segment, radius, innerRadius, centerX, centerY)}"
              fill="${segment.color}"
              stroke="white"
              stroke-width="1"
              title="${segment.label}: ${segment.value} (${segment.percentage.toFixed(1)}%)"
            ></path>
          `)}
          
          ${this.type === 'doughnut' ? html`
            <circle class="donut-hole" cx="${centerX}" cy="${centerY}" r="${innerRadius}"></circle>
          ` : ''}
        </svg>
        
        <!-- Legend -->
        <div class="donut-legend">
          ${segments.map(segment => html`
            <div class="legend-item">
              <div class="legend-color" style="background-color: ${segment.color}"></div>
              <span>${segment.label} (${segment.percentage.toFixed(1)}%)</span>
            </div>
          `)}
        </div>
      </div>
    `;
  }

  /**
   * Render empty state when no data is available
   */
  _renderEmptyState() {
    return html`
      <div class="empty-state">
        <div class="empty-state-icon">📊</div>
        <div>No data available</div>
      </div>
    `;
  }

  render() {
    const containerStyle = {
      width: this.width,
      height: this.height
    };
    
    return html`
      <div class="chart-container" style=${this._styleMap(containerStyle)}>
        ${this.type === 'bar' 
          ? this._renderBarChart() 
          : (this.type === 'pie' || this.type === 'doughnut') 
            ? this._renderDonutChart() 
            : this._renderEmptyState()}
      </div>
    `;
  }

  /**
   * Helper to convert object style to string
   */
  _styleMap(styles) {
    return Object.entries(styles)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${key}: ${value}`)
      .join('; ');
  }
}

customElements.define('tm-task-chart', TaskChart);
