document.addEventListener("DOMContentLoaded", function () {
    const output = document.getElementById("output");
    const form = document.getElementById("calc_form");
    const operandBtns = document.querySelectorAll("button[data-type=operand]");
    const operatorBtns = document.querySelectorAll("button[data-type=operator]");
    let isOperatorClicked = false;
    let isFirstOperand = true;
    let firstOperand = null;
    let operator = null;
  
    operandBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if (isOperatorClicked) {
          output.value = e.target.value;
          isOperatorClicked = false;
        } else if (output.value === "0" || output.value === "Error") {
          output.value = e.target.value;
        } else {
          output.value += e.target.value;
        }
      });
    });
  
    operatorBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const clickedOperator = e.target.value;
  
        if (isFirstOperand) {
          firstOperand = parseFloat(output.value);
          operator = clickedOperator;
          isFirstOperand = false;
          isOperatorClicked = true;
        } else {
          const secondOperand = parseFloat(output.value);
          const result = operate(firstOperand, secondOperand, operator);
  
          if (result === "Error") {
            output.value = result;
          } else {
            output.value = result;
            firstOperand = result;
            operator = clickedOperator;
            isOperatorClicked = true;
          }
        }
      });
    });
  
    form.addEventListener("reset", (e) => {
      output.value = "0";
      isFirstOperand = true;
      firstOperand = null;
      operator = null;
      isOperatorClicked = false;
    });
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  
    function operate(a, b, op) {
      switch (op) {
        case "+":
          return a + b;
        case "-":
          return a - b;
        case "*":
          return a * b;
        case "/":
          if (b === 0) {
            return "Error";
          }
          return a / b;
        default:
          return b;
      }
    }
  });
  