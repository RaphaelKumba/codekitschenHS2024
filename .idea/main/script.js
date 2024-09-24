window.onload = function(){
    const calcElements = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "÷", "×", "+", "-", ".", "="];
    const numbers      = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const operations   = ["÷", "×", "+", "-", "x", "/"];

    const parseOperation = operation => {

    }

    var displayText     = "";
    var numberBuilder   = "";
    var noFloat       = true;

    var tasks = [];

    const validNumberPressed = input => numbers.includes(input) || (input === "." && noFloat && numberBuilder.length > 0);

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
            tasks.unshift(res);
        }
        return res;
    }

    const updateDisplay = data => {
        if (operations.includes(data)) {
            displayText += " " + data + " ";
        } else {
            displayText += data;
        }
        document.getElementById("display-text").innerHTML = displayText;
    }

    const resetDisplay = () => displayText = "";
    const builderAppend = input => numberBuilder += input;
    const builderReset = () => numberBuilder = "";

    const manageInput = input => {
        if (validNumberPressed(input)) {
            updateDisplay(input);
            builderAppend(input)
        }

        if (operations.includes(input)) {
            noFloat = true;
            // Case of first operation
            if (numberBuilder.length > 0) {
                updateDisplay(input);
                tasks.push(numberBuilder);
                builderReset();
                tasks.push(input);
            }
            // case of a new operation on an existing result
            else if (tasks.length === 1 && numberBuilder === "") {
                updateDisplay(input);
                tasks.push(input);
            }
        }

        if (input === ".") noFloat = false;

        if (input === "=" && numberBuilder.length > 0 && tasks.length > 1) {
            resetDisplay();
            tasks.push(numberBuilder);
            builderReset();
            document.getElementById("display-text").innerHTML = computeTasks();
        }
    }

    for (const key in calcElements) {
        document.getElementById(calcElements[key]).onmouseup = function () {
            manageInput(calcElements[key]);
        };
    }

    document.addEventListener('keydown', function(event) {
        manageInput(event.key);
    });
};