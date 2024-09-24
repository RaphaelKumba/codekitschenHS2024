var displayText     = "";
var numberBuilder   = "";
var noFloat       = true;

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

const builderAppend = input => numberBuilder += input;
const builderReset = () => numberBuilder = "";

const updateDisplay = data => {
    if (operations.includes(data)) {
        displayText += " " + data + " ";
    } else {
        if (displayText === "0" && data !== "0" && data !== ".") displayText = data;
        else displayText += data;
    }
    document.getElementById("display-text").innerHTML = displayText;
}
const resetDisplay = () => {
    displayText = "0";
    document.getElementById("display-text").innerHTML = displayText;
}

const validNumber = input => numbers.includes(input) || (input === "." && noFloat && numberBuilder.length > 0);

const computeTasks = () => {
    var res       = 0;
    var left      = 0;
    var right     = 0;
    var operation   = "";

    while (tasks.length > 1) {
        left = parseFloat(tasks.shift());
        operation = tasks.shift();
        right = parseFloat(tasks.shift());
        if (operation === "+") res = left + right;
        if (operation === "-") res = left - right;
        if (operation === "÷") res = left / right;
        if (operation === "×") res = left * right;
        if (operation === "%") res = left % right;
        tasks.unshift(res);
    }
    return res;
}

const manageInput = input => {
    if (validNumber(input)) {
        updateDisplay(input);
        builderAppend(input)
    }

    if (operations.includes(input)) {
        noFloat = true;
        if (numberBuilder.length > 0) {
            updateDisplay(input);
            tasks.push(numberBuilder);
            builderReset();
            tasks.push(input);

        } else if (tasks.length === 1 && numberBuilder === "") {
            updateDisplay(input);
            tasks.push(input);
        }
    }

    if (input === ".") noFloat = false;

    if (input === "=" && numberBuilder.length > 0 && tasks.length > 1) {
        resetDisplay();
        tasks.push(numberBuilder);
        builderReset();
        updateDisplay(computeTasks());
    }

    if (input === "AC") {
        resetDisplay();
        builderReset();
        noFloat = true;
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