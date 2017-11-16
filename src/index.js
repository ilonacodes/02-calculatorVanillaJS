function Calculator(input) {
    this.input = input;
    this.inputArray = [];
}

Calculator.prototype.newInput = function() {
    document.getElementById(this.input).innerText = this.inputArray.join(" ");
};

Calculator.prototype.getLastNumber = function() {
    return this.inputArray[this.inputArray.length - 1];
};

Calculator.prototype.addLastNumber = function(number) {
    return this.inputArray[this.inputArray.length - 1] += number;
};

Calculator.prototype.currentNumber = function(number) {
    if (isNaN(this.getLastNumber())) {
        this.inputArray.push(number.toString());
    } else {
        this.addLastNumber(number.toString());
    }
    this.newInput();
};

Calculator.prototype.currentOperator = function(operator) {
  if(!isNaN(this.getLastNumber())) {
      if (operator === ".") {
          return this.addLastNumber(operator)
      } else {
          this.inputArray.push(operator);
      }
      this.newInput();
  }
};

Calculator.prototype.allEmpty = function() {
    this.inputArray = [];
    this.newInput();
};

Calculator.prototype.clearNumber = function () {
    this.inputArray[this.inputArray.length - 1] = this.getLastNumber().toString().slice(0, -1);
    if (this.getLastNumber().length < 1) {
        this.inputArray.pop();
    }
    this.newInput();
};

Calculator.prototype.answer = function () {
    if (isNaN(this.getLastNumber())) {
        this.inputArray.pop();
    }

    var answer = eval(this.inputArray.join(" "));
    answer = parseFloat(answer.toFixed(6));
    this.inputArray = [answer];
    this.newInput();
};

var calculator = new Calculator("input");

document.getElementById("ac").addEventListener("click", function() {
   calculator.allEmpty();
});

document.getElementById("ce").addEventListener("click", function() {
   calculator.clearNumber();
});

document.getElementById("=").addEventListener("click", function() {
   calculator.answer();
});

var numbers = document.getElementsByClassName("number");

for (var i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", function() {
        calculator.currentNumber(this.getAttribute("id"));
    });
}

var operators = document.getElementsByClassName("operator");

for (var i = 0; i < operators.length; i++) {
    operators[i].addEventListener("click", function() {
        calculator.currentOperator(this.getAttribute("id"))
    });
}



