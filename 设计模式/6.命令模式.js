// 命令模式的意图是把请求封装为对象，从而分离请求的发起者和请求的接收者(执行者)之 间的耦合关系。在命令被执行之前，
// 可以预先往命令对象中植入命令的接收者。

var Tv = {
    open: function() {
        console.log('打开电视机');
    },
    close: function() {
        console.log('关上电视机');
    },
};

var OpenTvCommand = function(receiver) {
    this.receiver = receiver;
};

OpenTvCommand.prototype.execute = function() {
    this.receiver.open();
};

OpenTvCommand.prototype.undo = function() {
    this.receiver.close();
};

var setCommand = function(command) {
    document.getElementById('execute').onclick = function() {
        command.execute();
    };

    document.getElementById('undo').onclick = function() {
        command.undo();
    };
};

setCommand(new OpenTvCommand(Tv));
