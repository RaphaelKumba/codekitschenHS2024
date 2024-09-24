var display   = "";
var number    = "";
var isFloat = false;
var computable= false;

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

const updateDisplay = () => document.getElementById("display-text").innerHTML = display;
const resetDisplay = () => document.getElementById("display-text").innerHTML = display = "0";
const setDisplay = input => document.getElementById("display-text").innerHTML = display = input;
const displayAddNumber = nbr => { if (display === "0") display = nbr; else display += nbr; updateDisplay(); }
const displayAddOperation = opp => { display += " " + opp + " "; updateDisplay(); }

const isNumber = input => numbers.includes(input);
const setFloat = input => input === "." && number.length > 0 && !isFloat;
const isOperation = input => operations.includes(input);
const isCompute = input => input === "=" && tasks.length > 1;
const reset = () => { number = ""; isFloat = false; }

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
        }
        tasks.unshift(res);
    }
    return res;
}

const manageInput = input => {

    if (isNumber(input)) {
        computable = true;
        number += input;
        displayAddNumber(input);
    }

    if (setFloat(input)) {
        computable = false;
        isFloat = true;
        number += input;
        displayAddNumber(input);
    }

    if (isOperation(input) && computable) {
        computable = false;
        tasks.push(number);
        tasks.push(input);
        reset();
        displayAddOperation(input);
    }

    if (isCompute(input) && computable) {
        computable = false;
        tasks.push(number);
        setDisplay(computeTasks());
        reset();
    }

    if (input === "AC") {
        computable = false;
        reset();
        resetDisplay();
        tasks = [];
    }

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