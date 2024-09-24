var display       = "";
var number        = "";
var isFloat     = false;
var computable  = false;
var tasks          = [];

const buttons    = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "÷", "×", "+", "-", "%", ".", "=", "AC", "⌫"];
const numbers    = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operations = ["÷", "×", "+", "-", "%"];

const validKey = key => {
    if (buttons.includes(key))      return key;
    if (key === "/")                return "÷";
    if (key === "x" || key === "*") return "×";
    if (key === "Enter")            return "=";
    if (key === "Backspace")        return "⌫";
    return false;
}

const updateDisplay = ()    => document.getElementById("display-text").innerHTML = display;
const resetDisplay = ()     => document.getElementById("display-text").innerHTML = display = "0";
const setDisplay = input           => document.getElementById("display-text").innerHTML = display = input;
const displayAddNumber = nbr       => { if (display === "0") display = nbr; else display += nbr; updateDisplay(); }
const displayAddFloat = ()   => { display += "."; updateDisplay(); }
const displayAddOperation = opp    => { display += " " + opp + " "; updateDisplay(); }
const displayDeleteLast = ()=> document.getElementById("display-text").innerHTML = display = display.substring(0, display.length - 1);

const isNumber = input           => numbers.includes(input);
const setFloat = input           => input === "." && number.length > 0 && !isFloat;
const reset = ()           => { number = "0"; isFloat = false; }
const isOperation = input        => operations.includes(input);
const isCompute = input          => input === "=" && tasks.length > 1;
const isDelete = input           => input === "⌫" && number > 0;


const computeTasks = () => {
    let res= 0;
    while (tasks.length > 1) {
        console.log(tasks);
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

    if (isNumber(input) && tasks.length !== 1) {
        computable = true;
        number += input;
        displayAddNumber(input);
    }

    if (setFloat(input)) {
        computable = false;
        isFloat = true;
        number += input;
        displayAddFloat();
    }

    if (isOperation(input) && computable) {
        computable = false;
        if (tasks.length !== 1) tasks.push(number);
        tasks.push(input);
        reset();
        displayAddOperation(input);
    }

    if (isCompute(input) && computable) {
        tasks.push(number);
        setDisplay(computeTasks());
        reset();
    }

    if (isDelete(input)) {
        number = number.substring(0, number.length - 1);
        displayDeleteLast();
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