define(['jquery', 'avalon', 'layer'], function() {

    var vm = avalon.define({
        $id: 'body',
        textmsg: '这是一个text内容',
        textmsg2: 'aaaaaaaaa',
        htmlmsg: '<p>这是一个带样式的的内容</p>',
        attr_title: '标题',
        attr_obj: { title: '普通 ', algin: 'left' },
        for_obj: [{ aa: 1 }, { aa: 2 }, { aa: 3 }, { aa: 4 }, { aa: 5 }, { aa: 6 }],
        img_obj: [
            { src: 'http://www.ixm.gov.cn/dis/passport/authCode/show?random' + Math.random() },
            { src: 'http://www.ixm.gov.cn/dis/passport/authCode/show?random' + Math.random() },
            { src: 'http://www.ixm.gov.cn/dis/passport/authCode/show?random' + Math.random() }
        ],
        cssmsg: '',
        attrmsg: '',
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
                    layer.msg(reasons[0].message);
                } else {
                    layer.msg('全部通过');
                }
            }
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
            } else if (!REGEX.test(value)) {
                this.message = '手机号码格式不正确';
            }
            next(REGEX.test(value) && value.length == 11);
            return value;
        }
    };
    avalon.validators.password = {
        message: '用户名格式不符合',
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