// 代码生成时间: 2025-08-26 03:53:20
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

/*
 * MathCalculatorController handles the logic for the math calculator application.
 * It includes methods for performing basic arithmetic operations and error handling.
 */
export default class MathCalculatorController extends Controller {
    @service("router");
    router;

    // Tracked properties for the calculator input and output
    @tracked firstOperand = "";
    @tracked secondOperand = "";
    @tracked result = "";
    @tracked operation = "";
    @tracked error = "";

    // Perform arithmetic operation based on the selected operation
    @action
    calculate() {
        let firstNumber = parseFloat(this.firstOperand);
        let secondNumber = parseFloat(this.secondOperand);

        if (isNaN(firstNumber) || isNaN(secondNumber)) {
            this.error = "Please enter valid numbers for both operands.";
            this.result = "";
            return;
        }

        try {
            switch (this.operation) {
                case "add":
                    this.result = this.add(firstNumber, secondNumber).toString();
                    break;
                case "subtract":
                    this.result = this.subtract(firstNumber, secondOperand).toString();
                    break;
                case "multiply":
                    this.result = this.multiply(firstNumber, secondNumber).toString();
                    break;
                case "divide":
                    if (secondNumber === 0) {
                        this.error = "Division by zero is not allowed.";
                        this.result = "";
                        return;
                    }
                    this.result = this.divide(firstNumber, secondNumber).toString();
                    break;
                default:
                    this.error = "Please select a valid operation.";
                    this.result = "";
            }
        } catch (error) {
            this.error = `An error occurred: ${error.message}`;
            this.result = "";
        }
    }

    // Add two numbers
    add(number1, number2) {
        return number1 + number2;
    }

    // Subtract two numbers
    subtract(number1, number2) {
        return number1 - number2;
    }

    // Multiply two numbers
    multiply(number1, number2) {
        return number1 * number2;
    }

    // Divide two numbers
    divide(number1, number2) {
        return number1 / number2;
    }

    // Clear the calculator fields
    @action
    clear() {
        this.firstOperand = "";
        this.secondOperand = "";
        this.result = "";
        this.error = "";
    }
} // end of MathCalculatorController