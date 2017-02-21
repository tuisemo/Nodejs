define(['jquery', 'lodash', 'layer'], function() {
    var CheckFunc = function() {
        this.$Tel = $("input[type='tel']");
        this.$Email = $("input[type='email']");
        this.$Password = $("input[type='password']");
    }
    CheckFunc.prototype = {
        init: function() {
            this.listen();
        },
        checkTel: function(value) {
            layer.alert("测试通过！");
        },
        listen: function() {
            var that = this;
            that.$Tel.on("onblur", function() {
                checkTel();
            });
            // body...
        }

    }
    var checkFunc = new CheckFunc();

})
