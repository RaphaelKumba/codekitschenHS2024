window.onload = function(){
    const calcElements = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "÷", "×", "+", "-", ".", "="];
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const operations = ["÷", "×", "+", "-"];

    var displayText = "";
    var numberBuilder = "";
    var noFloat = true;

    var tasks = [];

    const computeTasks = () => {
        var res = 0;
        var left = 0;
        var right = 0;
        for (const task in tasks) {
            if (task in operations) {

            } else {

            }
        }
        return "RESULT";
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

    const manageInput = input => {

        if (numbers.includes(input) || (input === "." && noFloat)) {
            updateDisplay(input);
            numberBuilder += input;
        }

        if (operations.includes(input)) {
            noFloat = true;
            if (numberBuilder.length > 0) {
                updateDisplay(input);
                tasks.push(numberBuilder);
                numberBuilder = "";
                tasks.push(input);
            }
        }

        if (input === ".") noFloat = false;

        if (input === "=" && numberBuilder !== "") {
            resetDisplay();
            tasks.push(numberBuilder);
            numberBuilder = "";
            document.getElementById("display-text").innerHTML = "Compute";
        }

    }

    for (const key in calcElements) {
        document.getElementById(calcElements[key]).onmouseup = function () {
            manageInput(calcElements[key]);
        };
    }
};