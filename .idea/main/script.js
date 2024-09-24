var display       = "";
var number        = "";
var isFloat     = false;
var computable  = false;
var tasks          = [];

const historicFacts = JSON.parse('{"400": "Highland Maya fall to the lowland city of Teotihuacan", "431": "Council of Ephesus", "34" : "Crucifixion of Jesus Crist", "0": "Birth of Jesus Christ", "-776" : "First recorded Ancient Olympic Games", "2024":"Code Kitschen"}');

const buttons    = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "÷", "×", "+", "-", "%", ".", "=", "AC", "⌫", "int"];
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
const isConvertInteger = input   => input === "int" && tasks.length === 1;
const isCompute = input          => input === "=" && tasks.length > 1;
const isDelete = input           => input === "⌫" && number > 0;


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

    if (isConvertInteger(input)) {
        tasks[0] = parseInt(tasks[0], 10);
        setDisplay(tasks[0]);
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
        acTriggered();
        tasks = [];
        triggerFact(display);
    }
}

async function triggerFact(display){
    if (historicFacts[display]) document.getElementById("historic-fact").innerHTML = historicFacts[display];
    document.getElementById("historic-fact").style.color = "white";
    await new Promise(r => setTimeout(r, 5000));
    document.getElementById("historic-fact").style.color = "#444444";
}

async function acTriggered() {
    for (const button in buttons) {
        document.getElementById(buttons[button]).style.transitionDuration = "0ms";
        document.getElementById(buttons[button]).style.backgroundColor = "red";
    }
    document.getElementById("=").style.backgroundColor = "#AAAAAA";
    document.getElementsByName("part-text").forEach((part) => { part.style.color = "white"; part.style.transitionDuration = "0ms" })
    document.getElementById("display").style.transitionDuration = "0ms";
    document.getElementById("display").style.backgroundColor = "red";

    await new Promise(r => setTimeout(r, 1));

    for (const button in buttons) {
        document.getElementById(buttons[button]).style.transitionDuration = "1s";
        document.getElementById(buttons[button]).style.backgroundColor = "";
    }
    document.getElementsByName("part-text").forEach((part) => { part.style.color = ""; part.style.transitionDuration = ".5s" })
    document.getElementById("display").style.transitionDuration = ".5s";
    document.getElementById("display").style.backgroundColor = "";
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