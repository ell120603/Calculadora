const previoOperaText = document.querySelector("#previo-opera");
const currentOperaText = document.querySelector("#current-opera");
const buttons = document.querySelectorAll("#button-container button");

class Calculator {
  constructor(previoOperaText, currentOperaText) {
    this.previoOperaText = previoOperaText;
    this.currentOperaText = currentOperaText;
    this.currentOpera = "";
  }
  addDigit(digit) {
    if (digit === "." && this.currentOperaText.innerText.includes(".")) {
      return;
    }
    this.currentOpera = digit;
    this.updateScreen();
  }
  processOperation(operation) {
    if (this.currentOperaText.innerText === " " && operation !== "C") {
      if (previoOperaText.innerText !== " ") {
        this.changeOperation(operation);
      }
      return;
    }
    let operationValue;
    const previous = +this.previoOperaText.innerText.split(" ")[0];
    const current = +this.currentOperaText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
        case "DEL":
        this.processDelOpera();
        break;
        case "CE":
        this.processCeOpera();
        break;
        case "C":
        this.processCOpera();
        break;
        case "=":
        this.processEqualpera();
        break;
      default:
        return;
    }
  }
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      this.currentOperaText.innerText += this.currentOpera;
    } else {
      if (previous === 0) {
        operationValue = current;
      }
      this.previoOperaText.innerText = `${operationValue} ${operation}`;
      this.currentOperaText.innerText = "";
    }
  }
  changeOperation(operation) {
    const mathOperations = ["+", "-", "*", "/"];
    if (!mathOperations.includes(operation)) {
      return;
    }
    this.previoOperaText.innerText =
      this.previoOperaText.innerText.slice(0, -1) + operation;
  }
  processDelOpera(){
    this.currentOperaText.innerText = this.currentOperaText.innerText.slice(0, -1);
  }

  processCeOpera(){
    this.currentOperaText.innerText = "";
  }
  processCOpera(){
    this.currentOperaText.innerText = "";
    this.previoOperaText.innerText = "";
  }
  processEqualpera(){
    const operation = previoOperaText.innerText.split(" ")[1];
    this.processOperation(operation)
  }
}
const calcu = new Calculator(previoOperaText, currentOperaText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;
    if (+value >= 0 || value === ".") {
      calcu.addDigit(value);
    } else {
      calcu.processOperation(value);
    }
  });
});
