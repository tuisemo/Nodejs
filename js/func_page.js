define(['jquery', 'lodash', 'layer'], function() {
    var CheckFunc = function() {
        this.$Tel = $("input[type='tel']");
        this.$Email = $("input[type='email']");
        this.$Password = $("input[type='password']");
        this.$SubmitBtn = $("#submit");
        this.init(); //定义声明，默认执行函数
    }
    CheckFunc.prototype = {
        init: function() { //默认执行的函数功能汇总
            this.listen();
        },
        checkTel: function(text) { //定义功能函数
            var that = this;
            var TelVal = that.$Tel.val();
            var telVal = /^(((13[0-9]{1})|(15[0-9]{1})|(17[01678]{1})|(18[0-9]{1}))+\d{8})$/;
            if (!telVal.test(TelVal) || TelVal.length != 11) {
                that.$Tel.parents('.form-group').addClass('has-error');
                that.$Tel.next('.help-block').html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "请输入正确的手机号码！");
            }
        },
        checkEmail: function(argument) {
            var that = this;
            var EmailVal = that.$Email.val();
            var emailVal = /^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i
            if (!emailVal.test(EmailVal)) {
                that.$Email.parents('.form-group').addClass('has-error');
                that.$Email.next('.help-block').html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "请输入正确的邮箱地址！");
            }
        },
        removeClass: function(Obj) {
            Obj.parents('.form-group').removeClass("has-success has-warring has-error");
            // body...
        },
        listen: function() { //设置监听
            var that = this;
            that.$Tel.on("blur", function() {
                that.checkTel();
            });
            that.$Tel.on("input", function() {
                that.removeClass(that.$Tel);
                that.$Tel.next('.help-block').html("请输入您的手机号(仅支持中国大陆)");
            });
            that.$Email.on("blur", function() {
                that.checkEmail();
            });
            that.$Email.on("input", function() {
                that.removeClass(that.$Email);
                that.$Email.next('.help-block').html("请输入您的邮箱地址");
            });
            that.$SubmitBtn.on("click", function() {
                that.checkTel();
            });

        }

    }
    window.checkFunc = new CheckFunc();

});
