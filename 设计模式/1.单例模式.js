function Universe() {
    if (typeof Universe.instance === 'object') return Universe.instance;
    this.a = 1;

    Universe.instance = this;
}

const uni = new Universe();
const uni2 = new Universe();
console.log(uni === uni2); //true
