// 代码生成时间: 2025-08-11 11:29:34
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

// ResponsiveLayoutComponent is a simple Glimmer component that
// demonstrates a responsive layout using Ember's built-in functionality.
export default class ResponsiveLayoutComponent extends Component {
  // Track the current media query breakpoint
  @tracked breakpoint = this.getBreakpoint();

  // Get the current breakpoint based on the window size
  getBreakpoint() {
    const width = window.innerWidth;
    if (width < 576) return 'xs';
    if (width >= 576 && width < 768) return 'sm';
    if (width >= 768 && width < 992) return 'md';
    if (width >= 992 && width < 1200) return 'lg';
    return 'xl';
  }

  // Called when the component is inserted into the DOM
  constructor() {
    super(...arguments);
    // Listen for window resize events
    window.addEventListener('resize', this.handleResize);
  }

  // Called when the component is removed from the DOM
  willDestroy() {
    super(...arguments);
    // Remove the event listener
    window.removeEventListener('resize', this.handleResize);
  }

  // Handle the window resize event to update the breakpoint
  @action handleResize() {
    this.breakpoint = this.getBreakpoint();
  }

  // Method to determine the layout based on the breakpoint
  getLayoutClass() {
    switch (this.breakpoint) {
      case 'xs':
        return 'layout-xs';
      case 'sm':
        return 'layout-sm';
      case 'md':
        return 'layout-md';
      case 'lg':
        return 'layout-lg';
      default:
        return 'layout-xl';
    }
  }
}

// CSS styles for different breakpoints (to be placed in a separate CSS file)
// .layout-xs { ... }
// .layout-sm { ... }
// .layout-md { ... }
// .layout-lg { ... }
// .layout-xl { ... }