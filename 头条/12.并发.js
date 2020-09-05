class ReqMaxClass {
    constructor(number) {
        this.max = number || 2;
        this.list = [];
        this.current = 0;
    }

    async addReq(fn) {
        if (this.current >= this.max) {
            await new Promise(resolve => this.list.push(resolve));
        }

        return this.handleReq(fn);
    }

    async handleReq(fn) {
        try {
            this.current++;
            return await fn();
        } catch (e) {
            return e;
        } finally {
            this.current--;
            const temp = this.list.shift();
            temp && temp();
        }
    }
}

const demo = new ReqMaxClass(3);

for (let i = 0; i < 10; i++) {
    demo.addReq(function() {
        return new Promise(resolve => {
            console.log(i);
            setTimeout(resolve, 3000);
        });
    });
}
