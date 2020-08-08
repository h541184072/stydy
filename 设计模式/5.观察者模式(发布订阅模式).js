// 使用观察者模式的好处：
//
// 支持简单的广播通信，自动通知所有已经订阅过的对象。
// 页面载入后目标对象很容易与观察者存在一种动态关联，增加了灵活性。
// 目标对象与观察者之间的抽象耦合关系能够单独扩展以及重用。


// 类似vue event bus   发布订阅
// addEventListener


// 观察者
var subject = {
    observers: [],
    notify() {
        this.observers.forEach(observer =>{
            // 这里
            observer.update()
        })
    },
    attach (observer) {
        this.observers.push(observer)
    }
}
var observer = {
    update(){
        alert('updated')
    }
}
subject.attach(observer)
subject.notify()


