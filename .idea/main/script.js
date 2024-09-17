window.onload = function(){
    var counter = 0;
    document.getElementById("counter").onmousedown = function () {
        document.getElementById("count").innerHTML = counter++;
    };
};

const CountController = () => {
    var count = 0;

    const countModel = ObservableList([]); // observable array of Todos, this state is private

    const Update = () => {
        const countAttr = Observable(count++);
        console.log("Counter: " + count);
        return {
            onCountChanged: countAttr.onChange
        }
    }


    const newUpdate = () => {
        const newUpdate = Update();
        countModel.add(newUpdate);
        return newUpdate;
    };

    return {
        update: newUpdate()
    }
};

const CountView = (countController, rootElement) => {
    const count = counting => {
        document.getElementById("count").innerHTML = counter++;
    }
    // binding

    countController.onCountChanged(count);
};