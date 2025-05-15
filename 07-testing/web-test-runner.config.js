import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
  // Files to test
  files: 'test/**/*.test.js',
  
  // Browsers to test in
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    // Uncomment to test in Firefox and WebKit as well
    // playwrightLauncher({ product: 'firefox' }),
    // playwrightLauncher({ product: 'webkit' }),
  ],
  
  // Test framework
  testFramework: {
    // Mocha configuration
    config: {
      ui: 'bdd',
      timeout: '5000'
    }
  },

  // Coverage settings
  coverage: {
    exclude: ['**/node_modules/**/*', '**/test/**/*']
  },
  
  // Serve files from this directory
  nodeResolve: true,
  
  // Output test results to this file
  // reporters: [
  //   'html',
  //   'json'
  // ],
  
  // Use concurrency for faster testing
  concurrentBrowsers: 1,
  
  // Test concurrency
  concurrency: 1,
};
