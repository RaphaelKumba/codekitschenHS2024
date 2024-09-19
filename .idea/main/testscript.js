const calcElements = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "÷", "×", "+", "-", ".", "="];
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

const manageInput = input => {

    if (input !== "=" && (input !== "." || (input === "." && noFloat))) {
        displayText += input;
        numberBuilder += input;
        //document.getElementById("display-text").innerHTML = displayText;
    }

    if (operations.includes(input)) {
        noFloat = true;
        if (numberBuilder.length > 0) {
            tasks.push(numberBuilder);
            numberBuilder = "";
            tasks.push(input);
        }
    }

    if (input === ".") noFloat = false;

    if (input === "=" && tasks.length % 2 !== 0) {
        document.getElementById("display-text").innerHTML = Compute;
        console.log(computeTasks());
    }

}

for (const key in calcElements) {
    document.getElementById(calcElements[key]).onmouseup = function () {
        manageInput(calcElements[key]);
    };
}