define(['MSG', 'avalon'], function() {
    avalon.config({
        loader: false
    });
    var vm = avalon.define({
        $id: 'body',
        config: {
            timeOpt: true,
            timeWait: 10,
            btnState: true,
            btnMsg: '发送验证码',
        },
        userName: {
            value: '',
            msg: MSG[101]
        },
        mobile: {
            value: '',
            msg: MSG[201]
        },
        password: {
            value: '',
            msg: MSG[501]
        },
        confirm_password: {
            value: '',
            msg: ''
        },
        validateCode: {
            value: '',
            msg: MSG[401],
            src: 'http://ixm.terton.com.cn/dis/passport/authCode/show?',
            //src: '',
            style: { padding: 0, height: 34 }
        },
        msgCode: {
            value: '',
            msg: ''
        },
        validate: {
            onError: function(reasons) {
                layer.msg(reasons[0].message);
                reasons.forEach(function(reason) {
                    $(reason.element).parents('.ui-form-item').addClass('error');
                    vm[$(reason.element).attr('name')].msg = reason.getMessage();
                    //console.log(reason.getMessage());
                });
            },
            onValidateAll: function(reasons) {
                if (reasons.length) {
                    layer.msg(reasons[0].message);
                    reasons.forEach(function(reason) {
                        $(reason.element).parents('.ui-form-item').addClass('error');
                        vm[$(reason.element).attr('name')].msg = reason.getMessage();
                    });
                } else {
                    layer.msg('全部通过');
                }
            },
            validateInBlur: true,
            validateInKeyup: false
        },
        /*=================业务逻辑=================*/
        init: function() {
            this.listen();
        },
        listen: function() {
            var that = this;
            $("body").on("focus", "input", function() {
                //console.log($(this).attr('name'));
                $(this).parents('.ui-form-item').removeClass('error');
                var name=$(this).attr('name');
                that[name].msg = MSG[name];
            })
        },
        reloadvalidate: function() {
            this.validateCode.value = '';
            this.validateCode.src = this.validateCode.src + Math.random();
        },
        Timesetter: function(o) {
            var that = this;
            that.config.timeOpt = false;
            if (that.config.timeWait === 0) {
                that.config.timeWait = 10;
                that.config.timeOpt = true;
                that.config.btnState = true;
                that.config.btnMsg = '发送验证码';
            } else {
                if (that.config.timeWait == 10) {
                    that.config.btnState = false;
                }
                that.config.btnMsg = that.config.timeWait + '秒后重试';
                that.config.timeWait--;
                setTimeout(function() {
                    that.Timesetter(o);
                }, 1000);
            }
        },
        sendMsgFor: function(operationType, domainName, sendType) {
            var that = this;
            if (!(that.config.timeOpt)) {
                return false;
            } else {
                $.ajax({
                    url: "/dis/passport/sendMsg",
                    dataType: "json",
                    //async: true,
                    cache: false,
                    data: {
                        "operationType": operationType || '',
                        "domainName": domainName || '',
                        //"sendType": sendType || '',
                        "mobile": '18248639098',
                        //"code": that.validateCode.value || '',
                    },
                    type: "POST",
                    success: function(data) {
                        if (data.code == 200 || data.result) {
                            that.Timesetter();
                            return;
                        }
                        ResultOpt.msg(data);
                    },
                    error: function(data) {
                        layer.msg('请求出错，请稍后重试');
                        return;
                    }
                });
            }
        }
    });
    vm.init();
    /*===============表单验证===================*/
    avalon.validators.userName = {
        message: '用户名格式不正确',
        get: function(value, field, next) {
            var REGEX = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;
            if (!REGEX.test(value)) {
                this.message = MSG[102];
            }
            next(REGEX.test(value));
            return value;
        }
    };
    avalon.validators.mobile = {
        message: '手机格式不正确',
        get: function(value, field, next) {
            //想知道它们三个参数是什么,可以console.log(value, field,next)
            var REGEX = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[2-9])|(18[0-9]))\d{8}$/;
            if (!REGEX.test(value)) {
                this.message = MSG[202];
                next(false);
            } else
                next(true);
            return value;
        }
    };
    avalon.validators.validateCode = {
        message: '',
        get: function(value, field, next) {
            next(true);
            return value;
        }
    };
    avalon.validators.password = {
        message: '密码格式不正确',
        get: function(value, field, next) {
            var REGEX1 = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/;
            var REGEX2 = /^[A-Za-z0-9`~!@#\$%\^&\*\(\)_\+-=\[\]\{\}\\\|;:'"<,>\.\?\/]{8,30}$/;
            if (!(REGEX1.test(value) && REGEX2.test(value))) {
                this.message = MSG[502];
                next(false);
            } else if (value.length < 8 || value.length > 30) {
                this.message = MSG[504];
                next(false);
            } else
                next(true);
            return value;
        }
    };
});