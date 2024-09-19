window.onload = function(){
    const calcElements = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "/", "x", "+", "-", ".", "="]

    var displayText = "";
    var noFloat = true;

    const manageInput = input => {
        if (input === ".") noFloat = false;
        if (input === "=") {
            // Calc
            // reset stuff
        } else if (input !== "." || (input === "." && noFloat)) {
            displayText += input;
            document.getElementById("display-text").innerHTML = displayText;
        }

    }

    for (const key in calcElements) {
        document.getElementById(calcElements[key]).onmouseup = function () {
            manageInput(calcElements[key]);
        };
    }
};