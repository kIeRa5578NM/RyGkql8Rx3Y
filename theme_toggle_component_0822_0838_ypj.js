// 代码生成时间: 2025-08-22 08:38:44
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ThemeToggleComponent extends Component {
  // Tracked property for the current theme
  @tracked theme = 'light'; // Default theme

  /**
   * Toggle the theme between 'light' and 'dark'
   *
   * @method toggleTheme
   */
  @action
  toggleTheme() {
    try {
      // Check if the theme is 'light' and switch to 'dark', or vice versa
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      // Save the new theme to local storage
      localStorage.setItem('theme', this.theme);
    } catch (error) {
      // Handle any errors that occur during theme toggling
      console.error('Error toggling theme:', error);
    }
  }
}
