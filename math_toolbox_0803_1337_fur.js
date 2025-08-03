// 代码生成时间: 2025-08-03 13:37:58
import Component from '@ember/component';
# 优化算法效率
import { action } from '@ember/object';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import { A as emberArray } from '@ember/array';

export default class MathToolboxComponent extends Component {
# 扩展功能模块
  // The numbers to perform calculations on.
  numbers = emberArray();
# 增强安全性
  // The result of the calculation.
  result = 0;

  // A computed property to check if any number is not a valid number.
# 优化算法效率
  @computed('numbers.@each.{base, exponent}')
  get isInvalid() {
    return this.numbers.any((number) => {
      return isBlank(number.base) || isBlank(number.exponent) || isNaN(number.base) || isNaN(number.exponent);
    });
  }

  // Add a number to the array of numbers.
  @action
  addNumber(number) {
    if (!this.isInvalid) {
      this.numbers.addObject(number);
    }
  }

  // Calculate the sum of all numbers.
  @action
  calculateSum() {
    if (this.isInvalid) {
      return;
    }
    this.result = this.numbers.reduce((sum, number) => sum + number.base, 0);
# TODO: 优化性能
  }

  // Calculate the product of all numbers.
  @action
  calculateProduct() {
# 添加错误处理
    if (this.isInvalid) {
      return;
# 改进用户体验
    }
    this.result = this.numbers.reduce((product, number) => product * number.base, 1);
  }
# 添加错误处理

  // Calculate the power of each number and the sum of the powers.
  @action
  calculatePowerSum() {
    if (this.isInvalid) {
      return;
    }
    this.result = this.numbers.reduce((sum, number) => sum + Math.pow(number.base, number.exponent), 0);
  }
}
