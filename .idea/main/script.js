window.onload = function(){
    const calcElements = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "÷", "×", "+", "-", ".", "="];
    const operations = ["÷", "×", "+", "-"];

    var displayText = "";
    var noFloat = true;

    const manageInput = input => {

        if (input !== "." || (input === "." && noFloat)) {
            displayText += input;
            document.getElementById("display-text").innerHTML = displayText;
        }

        if (operations.includes(input)) {
            noFloat = true;
        }

        if (input === ".") noFloat = false;

        if (input === "=") displayText = "";

    }

    for (const key in calcElements) {
        document.getElementById(calcElements[key]).onmouseup = function () {
            manageInput(calcElements[key]);
        };
    }
};