define(['avalon'], function() {
    avalon.config({
        loader: false
    });
    var vm = avalon.define({
        $id: 'body',        
        userName: '',
        mobile: '',
        password: '',
        confirm_password: '',
        validate: {
            onError: function(reasons) {
                layer.msg(reasons[0].message);
                reasons.forEach(function(reason) {
                    console.log(reason.getMessage());
                });
            },
            onValidateAll: function(reasons) {
                if (reasons.length) {
                    //layer.msg(reasons[0].message);
                        reasons.forEach(function(reason) {
                            console.log(reason.getMessage());
                        });
                } else {
                    layer.msg('全部通过');
                }
            },
            validateInBlur: true,
            validateInKeyup: false
        },
        validateCode:{
        	value:'',
        	img:'http://www.ixm.gov.cn/dis/passport/authCode/show',
            style:{border:'1px solid rgba(34,36,38,.15)'}
        },
        reloadvalidate: function() {
            this.validateCode.value='';
            this.validateCode.img='http://www.ixm.gov.cn/dis/passport/authCode/show?' + Math.random();
        }
    });

    avalon.validators.userName = {
        message: '用户名格式不符合',
        get: function(value, field, next) {
            var REGEX = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;
            if (!REGEX.test(value)) {
                this.message = '用户名格式不正确';
            }
            next(REGEX.test(value));
            return value;
        }
    };
    avalon.validators.mobile = {
        message: '用户名格式不符合',
        get: function(value, field, next) {
            //想知道它们三个参数是什么,可以console.log(value, field,next)
            var REGEX = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[2-9])|(18[0-9]))\d{8}$/;
            if (value.length != 11) {
                this.message = '手机号码长度必须为11位';
                next(false);
            } else if (!REGEX.test(value)) {
                this.message = '手机号码格式不正确';
                next(false);
            } else
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
                this.message = '密码格式不正确';
                next(false);
            } else if (value.length < 8 || value.length > 30) {
                this.message = '密码长度必须为8~30位';
                next(false);
            } else
                next(true);
            return value;
        }
    };
});