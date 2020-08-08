// 没用模式之前
// 策略模式的定义是:定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。
validator = {
    validate: function (value, type) {
        switch (type) {
            case 'isNonEmpty ':
            {
                return true; // NonEmpty 验证结果
            }
            case 'isNumber ':
            {
                return true; // Number 验证结果
                break;
            }
            case 'isAlphaNum ':
            {
                return true; // AlphaNum 验证结果
            }
            default:
            {
                return true;
            }
        }
    }
};
//  测试
alert(validator.validate("123", "isNonEmpty"));


// 用了模式之后
var validator = {

    // 所有可以的验证规则处理类存放的地方，后面会单独定义
    types: {},

    // 验证类型所对应的错误消息
    messages: [],

    // 当然需要使用的验证类型
    config: {},

    // 暴露的公开验证方法
    // 传入的参数是 key => value对
    validate: function (data) {

        var i, msg, type, checker, result_ok;

        // 清空所有的错误信息
        this.messages = [];

        for (i in data) {
            if (data.hasOwnProperty(i)) {

                type = this.config[i];  // 根据key查询是否有存在的验证规则
                checker = this.types[type]; // 获取验证规则的验证类

                if (!type) {
                    continue; // 如果验证规则不存在，则不处理
                }
                if (!checker) { // 如果验证规则类不存在，抛出异常
                    throw {
                        name: "ValidationError",
                        message: "No handler to validate type " + type
                    };
                }

                result_ok = checker.validate(data[i]); // 使用查到到的单个验证类进行验证
                if (!result_ok) {
                    msg = "Invalid value for *" + i + "*, " + checker.instructions;
                    this.messages.push(msg);
                }
            }
        }
        return this.hasErrors();
    },

    // helper
    hasErrors: function () {
        return this.messages.length !== 0;
    }
};

// 之后存放验证
// 验证给定的值是否不为空
validator.types.isNonEmpty = {
    validate: function (value) {
        return value !== "";
    },
    instructions: "传入的值不能为空"
};

// 验证给定的值是否是数字
validator.types.isNumber = {
    validate: function (value) {
        return !isNaN(value);
    },
    instructions: "传入的值只能是合法的数字，例如：1, 3.14 or 2010"
};

var data = {
    first_name: "Tom",
    last_name: "Xu",
    age: "unknown",
    username: "TomXu"
};

validator.config = {
    first_name: 'isNonEmpty',
    age: 'isNumber',
    username: 'isAlphaNum'
};

validator.validate(data);

if (validator.hasErrors()) {
    console.log(validator.messages.join("\n"));
}

// 表单验证
