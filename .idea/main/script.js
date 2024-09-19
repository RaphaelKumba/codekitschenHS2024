window.onload = function(){
    var counter = 0;

    const updateElements = count => {
        document.getElementById("count").innerHTML = count;
        document.getElementById("count-total").innerHTML = count;
    }

    document.getElementById("counter").onmousedown = function () {
        updateElements(++counter);
    };

    document.getElementById("counter-reset").onmousedown = function () {
        updateElements(counter = 0);
    };

};