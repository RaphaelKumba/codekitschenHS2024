
window.onload = function(){

    var counter = 0;

    document.getElementById("counter").onmousedown = function () {
        counter++;
        const div = document.querySelector("div");
        div.innerHTML = "My new text!";
        console.log(counter);
    };

};