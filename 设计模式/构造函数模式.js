function Car(model, year, miles) {
    if (!(this instanceof Car)) {
        return new Car(model, year, miles);
    }
    this.model = model;
    this.year = year;
    this.miles = miles;
    this.output = function () {
        return this.model + "走了" + this.miles + "公里";
    }
}

var tom = new Car("大叔", 2009, 20000);
var dudu = Car("Dudu", 2010, 5000);

