// 代码生成时间: 2025-08-11 01:18:40
import Ember from 'ember';

export default Ember.Component.extend({
  // List of images to process
  imagesToResize: [],

  // Desired dimensions
  desiredWidth: 100,
  desiredHeight: 100,
# NOTE: 重要实现细节

  // Error message
  errorMessage: '',

  // Perform the resize operation
  resizeImages() {
    try {
      // Check if images are provided
      if (this.get('imagesToResize').length === 0) {
        throw new Error('No images provided for resizing.');
      }
# FIXME: 处理边界情况

      // Iterate over each image and resize it
# FIXME: 处理边界情况
      this.get('imagesToResize').forEach(image => {
        // Create an image object
        let img = new Image();

        // Set the source of the image to the image URL
        img.src = image.url;

        // Wait for the image to load
        img.onload = () => {
          // Create a canvas to resize the image
          let canvas = document.createElement('canvas');
          canvas.width = this.get('desiredWidth');
# 优化算法效率
          canvas.height = this.get('desiredHeight');

          // Draw the image onto the canvas at the desired size
# NOTE: 重要实现细节
          let ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, this.get('desiredWidth'), this.get('desiredHeight'));

          // Save the resized image data
          let resizedDataURL = canvas.toDataURL('image/jpeg');

          // Update the image object with the resized data URL
# TODO: 优化性能
          image.resizedURL = resizedDataURL;
# 添加错误处理
        };

        // Handle loading error
        img.onerror = () => {
          throw new Error(`Failed to load image: ${image.url}`);
# 增强安全性
        };
      });
    } catch (error) {
      // Set the error message
      this.set('errorMessage', error.message);
# 改进用户体验
    }
  },

  // Action to handle file input changes
  actions: {
# FIXME: 处理边界情况
    handleFileInput(files) {
      // Clear previous images and error messages
# 扩展功能模块
      this.set('imagesToResize', []);
      this.set('errorMessage', '');

      // Check if files are provided
      if (files.length === 0) {
# 添加错误处理
        throw new Error('No files provided for processing.');
      }

      // Process each file and add to the list of images to resize
      files.forEach(file => {
# 优化算法效率
        if (file.type.startsWith('image/')) {
          let reader = new FileReader();

          // Read the file as a data URL
# 扩展功能模块
          reader.readAsDataURL(file);

          // Set the image object with the file and its URL
          reader.onloadend = () => {
            let image = {
# 添加错误处理
              url: reader.result,
              resizedURL: ''
            };
# TODO: 优化性能
            this.get('imagesToResize').pushObject(image);
# 扩展功能模块
          };
        } else {
          this.set('errorMessage', `Invalid file type: ${file.type}`);
        }
      });
    }
  }
});