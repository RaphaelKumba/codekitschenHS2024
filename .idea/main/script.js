var display  = "";
var number   = "";
var isFloat= false;

var tasks = [];

const buttons = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "÷", "×", "+", "-", "%", ".", "=", "AC"];
const numbers      = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operations   = ["÷", "×", "+", "-", "%"];

const validKey = key => {
    if (buttons.includes(key))      return key;
    if (key === "/")                return "÷";
    if (key === "x" || key === "*") return "×";
    if (key === "Enter")            return "=";
    return false;
}

const builderAppend = input => number += input;
const builderReset = () => number = "";

const updateDisplay = () => document.getElementById("display-text").innerHTML = display;

const displayAddNumber = nbr => {
    display += nbr;
    updateDisplay();
}

const displayAddOperation = opp => {
    display += " " + opp + " ";
    updateDisplay();
}

const isNumber = input => numbers.includes(input);
const setFloat = input => input === "." && number.length > 0 && !isFloat;
const isOperation = input => operations.includes(input);
const reset = () => number = ""; isFloat = false;

const computeTasks = () => {
    let res= 0;
    while (tasks.length > 1) {
        let left = parseFloat(tasks.shift());
        let operation = tasks.shift();
        let right = parseFloat(tasks.shift());
        switch (operation) {
            case "+": res = left + right; break;
            case "-": res = left - right; break;
            case "÷": res = left / right; break;
            case "×": res = left * right; break;
            case "%": res = left % right; break;
            default: throw new Error();
        }
        tasks.unshift(res);
    }
    return res;
}

const manageInput = input => {

    if (isNumber(input)) {
        number += input;
        displayAddNumber(input);
    }

    if (setFloat(input)) {
        isFloat = true;
        number += input;
        displayAddNumber(input);
    }

    if (isOperation(input)) {
        reset();
        displayAddOperation(input);
    }

    /*
    if (operations.includes(input)) {
        noFloat = true;
        if (number.length > 0) {
            displayAddOpp(input);
            tasks.push(number);
            builderReset();
            tasks.push(input);

        } else if (tasks.length === 1 && number === "") {
            updateDisplay(input);
            tasks.push(input);
        }
    }
        if (input === ".") noFloat = false;

        if (input === "=" && number.length > 0 && tasks.length > 1) {
            resetDisplay();
            tasks.push(number);
            builderReset();
            updateDisplay(computeTasks());
        }

        if (input === "AC") {
            resetDisplay();
            builderReset();
            noFloat = true;
            tasks = [];
        }
         */

}

window.onload = function(){
    for (const button in buttons) {
        document.getElementById(buttons[button]).onmouseup = function () {
            manageInput(buttons[button]);
        };
    }

    document.addEventListener('keydown', function(event) {
        manageInput(validKey(event.key));
    });
};