window.onload = function(){
    const calcElements = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "÷", "×", "+", "-", ".", "="];
    const numbers      = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const operations   = ["÷", "×", "+", "-"];

    var displayText     = "";
    var numberBuilder   = "";
    var noFloat       = true;

    var tasks = [];

    const computeTasks = () => {
        var res       = 0;
        var left      = 0;
        var right     = 0;
        var operation   = "";

        console.log("Number of Tasks:" + tasks.length);

        while (tasks.length > 1) {
            console.log(tasks);
            left = parseFloat(tasks.shift());
            operation = tasks.shift();
            right = parseFloat(tasks.shift());
            if (operation === "+") res = left + right;
            if (operation === "-") res = left - right;
            if (operation === "÷") res = left / right;
            if (operation === "×") res = left * right;
            tasks.unshift(res);
        }
        console.log(tasks);
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

        if (numbers.includes(input) || (input === "." && noFloat && numberBuilder.length > 0)) {
            updateDisplay(input);
            builderAppend(input)
        }

        if (operations.includes(input)) {
            noFloat = true;
            if (numberBuilder.length > 0 || tasks.length === 1) {
                updateDisplay(input);
                tasks.push(numberBuilder);
                builderReset();
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

};