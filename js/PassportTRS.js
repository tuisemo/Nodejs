/*=======================对输入框的格式控制================================*/
$(function() {
    $("#userName").attr("maxlength", "20");
    $("#tel").attr("maxlength", "11");
    $("input[type='password']").attr("maxlength", "30");
    $("input").attr("autocomplete", "off"); //对所有输入框屏蔽缓存提示
    //手机号码格式限制
    $('#tel').keypress(function(e) {
        var code = e.keyCode | e.which;
        //←退格键 || 回车键 || tab键
        if (code == 8 || code == 13 || code == 9) {
            return true;
        }
        //数字
        if ((code > 47 && code < 58))
            return true;
        return false;
    });
    //密码格式限制+证件号格式限制
    $("input[type='password']").keypress(function(e) {
        var code = e.keyCode | e.which;
        if (code == 8 || code == 13 || code == 9) {
            return true;
        }
        //数字 || 小写字母 || 大写字母
        if ((code > 47 && code < 58) || (code > 64 && code < 91) || (code > 96 && code < 123))
            return true;
        return false;
    })
    $("#certificateNum").keypress(function(e) {
        var code = e.keyCode | e.which;
        if (code == 8 || code == 13 || code == 9) {
            return true;
        }
        //数字 || 小写字母 || 大写字母
        if ((code > 47 && code < 58) || (code > 64 && code < 91) || (code > 96 && code < 123) || (code == 46) || (code == 95))
            return true;
        return false;
    })

    $('#idcard').keypress(function(e) {
            var code = e.keyCode | e.which;
            if (code == 8 || code == 13 || code == 9) {
                return true;
            }
            //数字 || 字母X(大小写)
            if ((code > 47 && code < 58) || code == 88 || code == 120)
                return true;
            return false;
        })
        /*=======真实姓名格式控制=======*/
    $("#certificateName").blur(function() {
        var trueNameRE = /(^[a-zA-Z_\u4e00-\u9fa5]+[0-9]*)/;
        var trueName = $("#certificateName").val();
        if (!trueNameRE.test(trueName)) {
            $("#certificateNamemsg").addClass('text-danger');
            $("#certificateNamemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "姓名格式不符合！");
            return false;
        }
    })

    $("#certificateNum").blur(function() {
        var trueNumRE = /^[0-9a-zA-Z._]*$/g;
        var trueNum = $("#certificateNum").val();
        if (!trueNumRE.test(trueNum)) {
            $("#certificatemsg").addClass('text-danger');
            $("#certificatemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "证件号格式不符合！");
            return false;
        }
    })
    $("#enterpriseName").blur(function() {
        var LocationRE = /[a-zA-Z|\u4e00-\u9fa5]/;
        var Location = $("#enterpriseName").val();
        if (!LocationRE.test(Location)) {
            $("#dwmcmsg").addClass('text-danger');
            $("#dwmcmsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "名称格式不符合！");
            return false;
        }
    })
    $("#licenseLocation").blur(function() {
        var LocationRE = /[a-zA-Z|\u4e00-\u9fa5]/;
        var Location = $("#licenseLocation").val();
        if (!LocationRE.test(Location)) {
            $("#Locationmsg").addClass('text-danger');
            $("#Locationmsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "地址格式不符合！");
            return false;
        }
    })
    $("#tel").blur(function() {
            var tel = $("#tel").val();
            if (!telVal.test(tel) || tel.length != 11) {
                $("#mobilemsg").addClass('text-danger');
                $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "手机号码格式不正确");
                mobileBoo = false;
                return false;
            }
        })
        /*=======用户名输入框复位=======*/
    $("#userName").focus(function() {
            $("#usermsg").removeClass('text-danger text-success');
            $("#usermsg").html("以英文字母开头，可包含3-20个字符");
        })
        /*=======手机输入框复位=======*/
    $(".tel").focus(function() {
        $("#mobilemsg").removeClass('text-danger text-success');
        $("#mobilemsg").html("请输入11位有效手机号码");
    }) /*=======手机输入框复位=======*/
    $(".email").focus(function() {
            $("#mobilemsg").removeClass('text-danger text-success');
            $("#mobilemsg").html("请输入有效邮箱地址");
        })
        /*=======手机/邮箱输入框复位=======*/
    $(".TelOrEmail").focus(function() {
            $("#mobilemsg").removeClass('text-danger text-success');
            $("#mobilemsg").html("请输入有效手机号码或邮箱地址");
        })
        /*=======图片验证码输入框复位=======*/
    $("#validateCode").focus(function() {
            $("#valimsg").removeClass('text-danger text-success');
            $("#valimsg").html("");
        })
        /*=======验证码输入框复位=======*/
    $("#msgCode").focus(function() {
            $("#codemsg").removeClass('text-danger text-success');
            $("#codemsg").html("");
        })
        /*=======密码输入框复位=======*/
    $("#pwd").focus(function() {
            $("#pwdmsg").removeClass('text-danger text-success');
            $("#pwdmsg").html("8-30位字符包含数字和英文字符");
        })
        /*=======确认密码输入框复位=======*/
    $("#pwd2").focus(function() {
            $("#pwd2msg").removeClass('text-danger text-success');
            $("#pwd2msg").html("");
        })
        /*=======真实姓名输入框复位=======*/
    $("#certificateName").focus(function() {
            $("#certificateNamemsg").removeClass('text-danger text-success');
            $("#certificateNamemsg").html("请填写有效证件上的真实姓名");
        })
        /*=======证件号输入框复位=======*/
    $("#certificateNum").focus(function() {
        $("#certificatemsg").removeClass('text-danger text-success');
        $("#certificatemsg").html("请填写有效证件上的证件号");
    })
    $("#licenseLocation").focus(function() {
        $("#Locationmsg").removeClass('text-danger text-success');
        $("#Locationmsg").html("请填写登记注册地址");
    })




});
/*============================通行证注册=============================*/
/*账户用户名唯一可用性检测*/
var userBoo = false;

function checkuser() {
    var userName = $("#userName").val();
    var userVal = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;
    if (!userVal.test(userName) || userName.length < 3 || userName.length > 20) {
        $("#usermsg").addClass('text-danger');
        $("#usermsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "用户名格式不正确！");
        userBoo = false;
        return false;
    } else {
        $.ajax({
            url: "/dis/passport/checkUserAttribute", //请求的url地址
            dataType: "json", //服务器返回的值类型
            async: false, //请求是否异步，默认为异步
            data: {
                "attributeValue": userName,
                "attributeName": "userName",
            }, //发送到服务器的参数
            type: "POST", //请求方式
            success: function(data) {
                //请求成功时处理
                var code = data.code;
                var resultmsg = data.result;
                switch (code) {
                    case 200:
                        {
                            $("#usermsg").addClass('text-success');
                            $("#usermsg").html('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>');
                            userBoo = true;
                            return true;
                            break;
                        }
                    case 1001:
                        {
                            $("#usermsg").addClass('text-danger');
                            $("#usermsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            userBoo = false;
                            return false;
                            break;
                        }
                    case 1002:
                        {
                            $("#usermsg").addClass('text-danger');
                            $("#usermsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            userBoo = false;
                            return false;
                            break;
                        }
                    case 1003:
                        {
                            $("#usermsg").addClass('text-danger');
                            $("#usermsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            userBoo = false;
                            return false;
                            break;
                        }
                    default:
                        {
                            $("#usermsg").addClass('text-danger');
                            $("#usermsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            return false;
                            break;
                        }
                }
            },
            error: function(data) {
                //请求出错处理
                $("#usermsg").addClass('text-danger');
                $("#usermsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "请求出错请重试！");
            }
        });
    }
}
/*通用账户手机可用性检测*/
var mobileBoo = false;
var telVal = /^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}|15[0-9]\d{8}|17[0-9]\d{8}|18[0-9]\d{8}|14[0-9]\d{8}$/;

function checkMobileOrEmail(domainName) {
    //var domainName = $("input[name='domainName']:checked").val();
    var tel = $("#TelOrEmail").val();
    if (!telVal.test(tel) || tel.length != 11) {

        if (tel != "" && tel.indexOf("@") > 0) {
            checkEmail(tel, domainName);
            return mobileBoo;
        }
        $("#mobilemsg").addClass('text-danger');
        $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "手机号码格式不正确");
        mobileBoo = false;
        return false;
    } else {
        $.ajax({
            url: "/dis/passport/checkUserAttribute", //请求的url地址
            dataType: "json", //服务器返回的值类型
            async: false, //请求是否异步，默认为异步
            data: {
                "attributeValue": tel,
                "attributeName": "mobile",
                "domainName": domainName
            }, //发送到服务器的参数
            type: "POST", //请求方式
            success: function(data) {
                //请求成功时处理
                var code = data.code;
                var resultmsg = data.result;
                switch (code) {
                    case 200:
                        {
                            $("#mobilemsg").addClass('text-success');
                            $("#mobilemsg").html('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>');
                            mobileBoo = true;
                            return true;
                            break;
                        }
                    case 2001:
                        {
                            $("#mobilemsg").addClass('text-danger');
                            $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            mobileBoo = false;
                            return false;
                            break;
                        }
                    case 2002:
                        {
                            $("#mobilemsg").addClass('text-danger');
                            $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            mobileBoo = false;
                            return false;
                            break;
                        }
                    case 2003:
                        {
                            $("#usermsg").addClass('text-danger');
                            $("#usermsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            mobileBoo = false;
                            return false;
                            break;
                        }
                    default:
                        {
                            $("#mobilemsg").addClass('text-danger');
                            $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            return false;
                            break;
                        }
                }
            },
            error: function(data) {
                //请求出错处理
                $("#mobilemsg").addClass('text-danger');
                $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "请求出错请重试！");
            }
        });

    }
}
/*通用账户邮箱可用性检测*/
var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

function checkEmail(email, domainName) {
    //var domainName = $("input[name='domainName']:checked").val();
    var result = reg.test(email);
    if (false == result) {
        $("#mobilemsg").addClass('text-danger');
        $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "邮箱格式不正确");
        mobileBoo = false;
        return false;
    }
    $.ajax({
        url: "/dis/passport/checkUserAttribute", //请求的url地址
        dataType: "json", //服务器返回的值类型
        async: true, //请求是否异步，默认为异步
        data: {
            "attributeValue": email,
            "attributeName": "email",
            "domainName": domainName
        }, //发送到服务器的参数
        type: "POST", //请求方式
        success: function(data) {
            //请求成功时处理
            var code = data.code;
            var resultmsg = data.result;
            switch (code) {
                case 200:
                    {
                        $("#mobilemsg").addClass('text-success');
                        $("#mobilemsg").html('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>');
                        mobileBoo = true;
                        return true;
                        break;
                    }
                case 3001:
                    {
                        $("#mobilemsg").addClass('text-danger');
                        $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                        mobileBoo = false;
                        return false;
                        break;
                    }
                case 3002:
                    {
                        $("#mobilemsg").addClass('text-danger');
                        $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                        mobileBoo = false;
                        return false;
                        break;
                    }
                case 3003:
                    {
                        $("#mobilemsg").addClass('text-danger');
                        $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                        mobileBoo = false;
                        return false;
                        break;
                    }
                default:
                    {
                        $("#mobilemsg").addClass('text-danger');
                        $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                        return false;
                        break;
                    }
            }
        },
        error: function(data) {
            //请求出错处理
            $("#mobilemsg").addClass('text-danger');
            $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "请求出错请重试！");
        }
    });
}
/*刷新图片验证码*/
function reloadcode() {
    var verify = document.getElementById('codeimg');
    $("#validateCode").val("");
    validateCodestatus = false;
    $("#valimsg").removeClass('text-success');
    $("#valimsg").removeClass('text-danger');
    $("#valimsg").html('');
    verify.setAttribute('src', '/dis/passport/authCode/show?' + Math.random());
}
/*60秒倒计时*/
var wait = 60;
var timeBoo = true;

function time(o) {
    $("#sendmsg").hide();
    if (wait == 0) {
        $("#msgtimer").innerHTML = "发送校验码";
        document.getElementById("msgtimer").innerHTML = "发送校验码";
        $("#sendmsg").show();
        $("#msgtimer").hide();
        wait = 60;
        timeBoo = true;
    } else {
        if (wait == 60) {
            $("#sendmsg").hide();
            $("#msgtimer").show();
        }
        timeBoo = false;
        document.getElementById("msgtimer").innerHTML = wait + "秒后再重试";
        wait--;
        setTimeout(function() {
            time(o);
        }, 1000);
    }
}
/*图片验证码校验*/
var validateBoo = false;

function checkvalidateCode() {
    var validateCode = $("#validateCode").val();
    $.ajax({
        url: "/dis/passport/authCode/check", //请求的url地址
        dataType: "json", //服务器返回的值类型
        async: false, //请求是否异步，默认为异步
        data: {
            "code": validateCode,
        }, //发送到服务器的参数
        type: "GET", //请求方式
        success: function(data) {
            //请求成功时处理
            var code = data.code;
            var resultmsg = data.result;
            switch (code) {
                case 200:
                    {
                        $("#valimsg").addClass('text-success');
                        $("#valimsg").html('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>' + resultmsg);
                        validateBoo = true;
                        return true;
                        break;
                    }
                case -1:
                    {
                        $("#valimsg").addClass('text-danger');
                        $("#valimsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                        validateBoo = false;
                        return false;
                        break;
                    }
                case 4004:
                    {
                        $("#valimsg").addClass('text-danger');
                        $("#valimsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                        validateBoo = false;
                        return false;
                        break;
                    }
                case 4006:
                    {
                        $("#valimsg").addClass('text-danger');
                        $("#valimsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                        validateBoo = false;
                        return false;
                        break;
                    }
                default:
                    {
                        $("#valimsg").addClass('text-danger');
                        $("#valimsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                        validateBoo = false;
                        return false;
                        break;
                    }
            }
        },
        error: function(data) {
            //请求出错处理
            $("#valimsg").addClass('text-danger');
            $("#valimsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "请求出错请重试！");
        }
    });
}

/*通用账户注册发送验证码*/
var random;

function sendmsg(domainName) {
    random = Math.random();
    //var domainName = $("input[name='domainName']:checked").val();
    var domainName = domainName;
    var tel = $("#TelOrEmail").val();
    var code = $("#validateCode").val();
    if (timeBoo == false || mobileBoo == false || userBoo == false || validateBoo == false) {
        return false;
    } else {
        $.ajax({
            url: "/dis/passport/sendMsgForReg", //请求的url地址
            dataType: "json", //服务器返回的值类型
            async: true, //请求是否异步，默认为异步
            data: {
                "tel": tel,
                "code": code,
                "domainName": domainName,
                "random": random
            }, //发送到服务器的参数
            type: "GET", //请求方式
            success: function(data) {
                //请求成功时处理
                var status = data.status;
                var type = data.type;
                var msg = data.msg;
                if (type == "mobile") {
                    if (status == "success") {
                        $("#msgtimer").hide();
                        $("#sendmsg").show();
                        $("#mobilemsg").addClass('text-success');
                        $("#mobilemsg").html('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>' + msg);
                        time();
                        mobileBoo = true;
                        return true;
                    } else {
                        $("#mobilemsg").addClass('text-danger');
                        $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + msg);
                        mobileBoo = false;
                        return false;
                    }
                } else {
                    if (status == "success") {
                        $("#valimsg").addClass('text-success');
                        $("#valimsg").html('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>' + msg);
                        validateBoo = true;
                        return true;
                    } else {
                        $("#valimsg").addClass('text-danger');
                        $("#valimsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + msg);
                        validateBoo = false;
                        return false;
                    }
                }
            },
            error: function(data) {
                //请求出错处理
                $("#codemsg").addClass('text-danger');
                $("#codemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "请求出错请重试！");
            }
        });
    }
}
/*密码格式检验*/
function checkpwd() {
    var pwd = $("#pwd").val();
    var pwd2 = $("#pwd2").val();
    var passpwdVal = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
    if (!passpwdVal.test(pwd)) {
        $("#pwdmsg").addClass('text-danger');
        $("#pwdmsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "密码格式不符合");
        return false;
    } else if (pwd.length < 8 || pwd.length > 30) {
        $("#pwdmsg").addClass('text-danger');
        $("#pwdmsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "密码长度不符合");
        return false;
    } else {
        return true;
    }
}
/*确认密码检验*/
function checkpwdsame() {
    var pwd = $("#pwd").val();
    var pwd2 = $("#pwd2").val();
    if (checkpwd()) {
        if (pwd == pwd2) {
            return true;
        } else {
            $("#pwd2msg").addClass('text-danger');
            $("#pwd2msg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "两次密码不一致");
            return false;
        }
    } else {
        checkpwd();
        return false;
    }
}
/*================================密码强度检测======================================*/
var pwdsecurity = false;

function pwdSecurity() {
    var userName = $("#userName").val();
    var newPwd = $("#pwd").val();
    $.get("/dis/ids/checkUserPwd?ran=" + new Date(), {
        userName: userName,
        password: newPwd
    }, function(data) {
        var arr = data.split(",");
        if (arr[0] == "success") {
            pwdsecurity = true;
        } else {
            pwdsecurity = false;
            $("#pwdmsg").addClass('text-danger');
            $("#pwdmsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "不允许使用强度太弱的密码");
        }
        if (arr[2] == "WEAK") {
            $("#passwordsafe").addClass("progress-bar-danger");
            $("#passwordsafe").removeClass("progress-bar-warning");
            $("#passwordsafe").removeClass("progress-bar-info");
            $("#passwordsafe").css("width", "30%");
            $("#passwordsafe").attr("aria-valuenow", "30");
            $("#passwordsafe").text('弱');
        } else if (arr[2] == "NORMAL") {
            $("#passwordsafe").addClass("progress-bar-warning");
            $("#passwordsafe").removeClass("progress-bar-info");
            $("#passwordsafe").removeClass("progress-bar-danger");
            $("#passwordsafe").css("width", "60%");
            $("#passwordsafe").attr("aria-valuenow", "60");
            $("#passwordsafe").text('中');
        } else if (arr[2] == "STRONG") {
            $("#passwordsafe").addClass("progress-bar-info");
            $("#passwordsafe").removeClass("progress-bar-warning");
            $("#passwordsafe").removeClass("progress-bar-danger");
            $("#passwordsafe").css("width", "90%");
            $("#passwordsafe").attr("aria-valuenow", "90");
            $("#passwordsafe").text('强');
        }
    }, "text");
};
/*================================注册表单提交======================================*/
function regform() {
    if (!$("#haveread").is(':checked')) {
        alert("请勾选通行证协议！");
        return;
    }
    var pwdBoo = checkpwdsame();
    if ((mobileBoo == true) && (userBoo == true) && (validateBoo == true) && (pwdBoo == true)) {
        $("#regform").submit();
    }
}

/*================================通行证修改手机======================================*/
function changeMobileOrEmail(domainName, sendType) {
    var tel = $("#TelOrEmail").val();
    var vcode = $("#msgCode").val();
    if (mobileBoo == false) {
        return false;
    } else {
        $.ajax({
            url: "/dis/passport/changeMobileOrEmail", //请求的url地址
            dataType: "json", //服务器返回的值类型
            async: true, //请求是否异步，默认为异步
            data: {
                "sendType": sendType,
                "mobile": tel,
                "vcode": vcode,
                "domainName": domainName
            }, //发送到服务器的参数
            type: "POST", //请求方式
            success: function(data) {
                //请求成功时处理
                var code = data.code;
                var resultmsg = data.result;
                switch (code) {
                    case 200:
                        {
                            window.location.href = "/dis/passport/handleSucc";
                            break;
                        }
                    case -1:
                        {
                            $("#codemsg").addClass('text-danger');
                            $("#codemsg").html(resultmsg);
                            break;
                        }
                    case 2003:
                        {
                            $("#mobilemsg").addClass('text-danger');
                            $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            mobileBoo = false;
                            return false;
                            break;
                        }
                    case 2004:
                        {
                            $("#codemsg").addClass('text-danger');
                            $("#codemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            return false;
                            break;
                        }
                    case 3003:
                        {
                            $("#mobilemsg").addClass('text-danger');
                            $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            mobileBoo = false;
                            return false;
                            break;
                        }
                    case 3004:
                        {
                            $("#codemsg").addClass('text-danger');
                            $("#codemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            return false;
                            break;
                        }
                    default:
                        {
                            $("#valimsg").addClass('text-danger');
                            $("#valimsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            validateBoo = false;
                            return false;
                            break;
                        }
                }
            },
            error: function(data) {
                //请求出错处理
                $("#codemsg").addClass('text-danger');
                $("#codemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "请求出错请重试！");
            }
        });
    }
}
/*发送按钮控制（时间+手机+用户名+图片验证码）*/
function checkall() {
    if (timeBoo == false || mobileBoo == false || userBoo == false || validateBoo == false) {
        $("#sendmsg").hide();
        $("#msgtimer").show();
        return false;
    } else {
        $("#msgtimer").hide();
        $("#sendmsg").show();
        return true;
    }
}
/*发送按钮控制（时间+手机+图片验证码）*/
function checktmv() {
    if (timeBoo == false || mobileBoo == false || validateBoo == false) {
        $("#sendmsg").hide();
        $("#msgtimer").show();
        return false;
    } else {
        $("#msgtimer").hide();
        $("#sendmsg").show();
        return true;
    }
}
/*发送按钮控制（时间+图片验证码）*/
function checktv() {
    if (timeBoo == false || validateBoo == false) {
        $("#sendmsg").hide();
        $("#msgtimer").show();
        return false;
    } else {
        $("#msgtimer").hide();
        $("#sendmsg").show();
        return true;
    }
}


/*================================企业注册======================================*/
var enterpriseBoo = false;
var businessLicenseBoo = false;
var organizationBoo = false;
var unifiedcreditBoo = false;
/*企业名称检测*/
function checkenterpriseName() {
    var enterpriseNameRE = /[a-zA-Z|\u4e00-\u9fa5]/;
    var enterpriseName = $("#enterpriseName").val();
    if (!enterpriseNameRE.test(enterpriseName)) {
        $("#dwmcmsg").addClass('text-danger');
        $("#dwmcmsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "名称格式不符合！");
        return false;
    }
    if ((enterpriseName.length < 1) || (enterpriseName.length > 100)) {
        $("#dwmcmsg").addClass('text-danger');
        $("#dwmcmsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "名称格式不符合！");
        enterpriseBoo = false;
        return false;
    } else {
        $.ajax({
            url: "/dis/passport/checkUserAttribute", //请求的url地址
            dataType: "json", //服务器返回的值类型
            async: false, //请求是否异步，默认为异步
            data: {
                "objectName": "Group",
                "attributeValue": encodeURI(enterpriseName),
                "attributeName": "enterpriseName"
            }, //发送到服务器的参数
            type: "POST", //请求方式
            success: function(data) {
                //请求成功时处理
                var code = data.code;
                var resultmsg = data.result;
                switch (code) {
                    case 200:
                        {
                            $("#dwmcmsg").addClass('text-success');
                            $("#dwmcmsg").html('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>');
                            enterpriseBoo = true;
                            return true;
                            break;
                        }
                    case 7002:
                        {
                            $("#dwmcmsg").addClass('text-danger');
                            $("#dwmcmsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            enterpriseBoo = false;
                            return false;
                        }
                    default:
                        {
                            $("#dwmcmsg").addClass('text-danger');
                            $("#dwmcmsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            enterpriseBoo = false;
                            return false;
                            break;
                        }
                }
            },
            error: function(data) {
                //请求出错处理
                $("#dwmcmsg").addClass('text-danger');
                $("#dwmcmsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "请求出错请重试！");
            }
        });
    }
}
/*营业执照检测*/
function checkbusinessLicense() {
    var businessLicense = $("#businessLicense").val();
    var businessLicenseVal = /^[0-9]+$/;
    if (!businessLicenseVal.test(businessLicense) || businessLicense.length != 15) {
        $("#yyzzmsg").addClass('text-danger');
        $("#yyzzmsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "注册号格式不正确！");
        businessLicenseBoo = false;
        return false;
    } else {
        $.ajax({
            url: "/dis/passport/checkUserAttribute", //请求的url地址
            dataType: "json", //服务器返回的值类型
            async: false, //请求是否异步，默认为异步
            data: {
                "objectName": "Group",
                "attributeValue": encodeURI(businessLicense),
                "attributeName": "businessLicense"
            }, //发送到服务器的参数
            type: "POST", //请求方式
            success: function(data) {
                //请求成功时处理
                var code = data.code;
                var resultmsg = data.result;
                switch (code) {
                    case 200:
                        {
                            $("#yyzzmsg").addClass('text-success');
                            $("#yyzzmsg").html('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>');
                            businessLicenseBoo = true;
                            return true;
                            break;
                        }
                    case 8002:
                        {
                            $("#yyzzmsg").addClass('text-danger');
                            $("#yyzzmsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            businessLicenseBoo = false;
                            return false;
                        }
                    default:
                        {
                            $("#yyzzmsg").addClass('text-danger');
                            $("#yyzzmsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            businessLicenseBoo = false;
                            return false;
                            break;
                        }
                }

            },
            error: function(data) {
                //请求出错处理
                $("#yyzzmsg").addClass('text-danger');
                $("#yyzzmsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "请求出错请重试！");
            }
        });
    }
}
/*组织机构代码检测*/
function checkorganizationCode() {
    var organizationCode = $("#organizationCode").val();
    var organizationCodeVal = /^[0-9A-Z]+$/;
    var lastorganizationCode = organizationCode.substring(8, 9); //最后一位必须为数字或者大写X
    var lastorganizationCodeVal = /^[0-9X]+$/;
    if (!organizationCodeVal.test(organizationCode) || (!lastorganizationCodeVal.test(lastorganizationCode)) || organizationCode.length != 9) {
        $("#zzjgmsg").addClass('text-danger');
        $("#zzjgmsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "组织机构代码格式不正确！");
        organizationBoo = false;
        return false;
    } else {
        $.ajax({
            url: "/dis/passport/checkUserAttribute", //请求的url地址
            dataType: "json", //服务器返回的值类型
            async: false, //请求是否异步，默认为异步
            data: {
                "objectName": "Group",
                "attributeValue": encodeURI(organizationCode),
                "attributeName": "organizationCode",
            }, //发送到服务器的参数
            type: "POST", //请求方式
            success: function(data) {
                //请求成功时处理
                var code = data.code;
                var resultmsg = data.result;
                switch (code) {
                    case 200:
                        {
                            $("#zzjgmsg").addClass('text-success');
                            $("#zzjgmsg").html('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>');
                            organizationBoo = true;
                            return true;
                            break;
                        }
                    case 9002:
                        {
                            $("#zzjgmsg").addClass('text-danger');
                            $("#zzjgmsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            organizationBoo = false;
                            return false;
                        }
                    default:
                        {
                            $("#zzjgmsg").addClass('text-danger');
                            $("#zzjgmsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            organizationBoo = false;
                            return false;
                            break;
                        }
                }

            },
            error: function(data) {
                //请求出错处理
                $("#zzjgmsg").addClass('text-danger');
                $("#zzjgmsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "请求出错请重试！");
            }
        });

    }
}
/*统一信用代码检测*/
function checkunifiedcreditCode() {
    var unifiedcreditCode = $("#unifiedcreditCode").val();
    var unifiedcreditCodeVal = /^[0-9A-Z]+$/;
    if (!unifiedcreditCodeVal.test(unifiedcreditCode) || unifiedcreditCode.length != 18) {
        $("#tyxydmmsg").addClass('text-danger');
        $("#tyxydmmsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "统一信用代码格式不正确！");
        unifiedcreditBoo = false;
        return false;
    } else {
        $.ajax({
            url: "/dis/passport/checkUserAttribute", //请求的url地址
            dataType: "json", //服务器返回的值类型
            async: false, //请求是否异步，默认为异步
            data: {
                "objectName": "Group",
                "attributeValue": encodeURI(unifiedcreditCode),
                "attributeName": "unifiedcreditCode"
            }, //发送到服务器的参数
            type: "POST", //请求方式
            success: function(data) {
                //请求成功时处理
                var code = data.code;
                var resultmsg = data.result;
                switch (code) {
                    case 200:
                        {
                            $("#tyxydmmsg").addClass('text-success');
                            $("#tyxydmmsg").html('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>');
                            unifiedcreditBoo = true;
                            return true;
                            break;
                        }
                    case 10002:
                        {
                            $("#tyxydmmsg").addClass('text-danger');
                            $("#tyxydmmsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            unifiedcreditBoo = false;
                            return false;
                        }
                    default:
                        {
                            $("#tyxydmmsg").addClass('text-danger');
                            $("#tyxydmmsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            unifiedcreditBoo = false;
                            return false;
                            break;
                        }
                }
            },
            error: function(data) {
                //请求出错处理
                $("#tyxydmmsg").addClass('text-danger');
                $("#tyxydmmsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "请求出错请重试！");
            }
        });
    }
}
/*企业注册提交检测*/
function enterpriseReg() {
    if (!$("#haveread").is(':checked')) {
        alert("请勾选通行证协议！");
        return;
    }
    var enterpriseName = $("#enterpriseName").val();
    var businessLicense = $("#businessLicense").val();
    var organizationCode = $("#organizationCode").val();
    var unifiedcreditCode = $("#unifiedcreditCode").val();
    var certificateName = $("#certificateName").val();
    var certificateNum = $("#certificateNum").val();
    var licenseLocation = $("#licenseLocation").val();
    if (certificateName == "" || certificateNum == "" || licenseLocation == "") {
        alert("请填写完整信息再提交！");
        return false;
    }
    var pwdBoo = checkpwdsame();
    var Boo1 = ((enterpriseBoo == true) && (businessLicenseBoo == true) && (organizationBoo == true));
    var Boo2 = (enterpriseBoo == true) && (unifiedcreditBoo == true);
    var Boo3 = (mobileBoo = true) && (userBoo = true) && (validateBoo == true) && (pwdBoo == true);
    var Boo4 = (Boo1 || Boo2) && Boo3;
    if (!Boo4) {
        $("#zzjgmsg").addClass('text-danger');
        $("#zzjgmsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "请确认全部信息填写正确！");
        $("#tyxydmmsg").addClass('text-danger');
        $("#tyxydmmsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "请确认全部信息填写正确！");
        return false;
    } else {
        $("body").addClass('modal-open');
        $("body").attr("padding-right", '17px');
        $("#waitting").show();
        $("#qiyeRegform").submit();
    }
}
/*============================企业注册提示信息复位=============================*/
function reorganizationCode() {
    $("#zzjgmsg").removeClass('text-danger text-success');
    $("#zzjgmsg").html("请输入9位组织机构代码");
}

function reunifiedcreditCode() {
    $("#tyxydmmsg").removeClass('text-danger text-success');
    $("#tyxydmmsg").html("请输入18位统一社会信用代码");
}

function reenterpriseName() {
    $("#dwmcmsg").removeClass('text-danger text-success');
    $("#dwmcmsg").html("请输入营业执照上的单位名称");
}

function rebusinessLicense() {
    $("#yyzzmsg").removeClass('text-danger text-success');
    $("#yyzzmsg").html("请输入15位营业执照注册号");
}
/*================================通行证登录功能======================================*/
function checkCaptcha(oXmlHttp) {
    var result = $.trim(oXmlHttp.responseText);
    var names = new Array();
    names = result.split("|");
    if (names[1] == 'true') {
        document.getElementById("verifyCode-div").style.display = "";
    }
}

function refreshVerifyCode() {
    if (null == document.getElementById("verifyCodeImg")) {
        return;
    }
    var verify = document.getElementById("verifyCodeId");
    verify.setAttribute('src', '/ids/admin/abc.code?random=' + random);
}

//点击登录按钮或者获取验证码按钮时调用此方法
function send2FAVerifyCode(login) {
    //document.getElementById("domainName").value = $("input[name='enterpriseOrCitizen']:checked").val();
    var loginKey = $.trim(document.getElementById("loginKey").value);
    document.getElementById("loginType").value = "userName";
    if ((/^\d+$/.test(loginKey)) && loginKey.length == 11) {
        document.getElementById("loginType").value = "mobile";
    } else {
        //判断身份证数字开头并且是18位
        if (loginKey.length == 18 && (/^[0-9]+[\s\S]*$/.test(loginKey))) {
            document.getElementById("loginType").value = "creditID";
        }
        if (loginKey.indexOf("@") >= 0) {
            document.getElementById("loginType").value = "email";
        }
    }
    var loginTypeObj = document.getElementById("loginType");
    //var domainName = document.getElementById("domainName").value;
    var domainName = $("input[name='domainName']").val();
    var loginType = "userName";
    if (loginTypeObj != null) {
        loginType = $.trim(loginTypeObj.value);
    }
    if (loginKey == "") {
        var loginError = document.getElementById("trt_login_xx");
        loginError.style.display = "block";
        loginError.innerHTML = "登录账号不允许为空!";
        document.getElementById("loginKey").focus();
        return;
    }
    var passwordObj = document.getElementById("password");
    if (passwordObj == null || $.trim(passwordObj.value) == "") {
        var loginError = document.getElementById("trt_login_xx");
        loginError.style.display = "block";
        loginError.innerHTML = "密码不允许为空!";
        document.getElementById("password").focus();
        return;
    }

    var password = $.trim(passwordObj.value);
    var source = document.getElementById("sourceName");
    var sourceName = "ids_internal";
    if (source != null) {
        sourceName = source.value;
    }
    var codeObj = document.getElementById("verifycode");
    var display = document.getElementById("verifyCode-div").style.display;
    var code = "";
    if (null != codeObj && "" == display) {
        code = codeObj.value.trim();
        if (code == "") {
            var loginError = document.getElementById("trt_login_xx");
            loginError.style.display = "block";
            loginError.innerHTML = "验证码不允许为空!";
            document.getElementById("verifycode").focus();
            return;
        }
    }

    var myDate = new Date();

    var FAValue = "";
    var paras = 'loginType=' + loginType + '&loginKey=' + loginKey + '&password=' + password + '&sourceName=' + sourceName + '&login=' + login + '&FAValue=' + FAValue + '&verifycode=' + code + '&time=' + myDate.getTime();
    var myAjax = $.ajax({
        type: "POST",
        url: "/ids/admin/sendVerifyCodeFor2FA.jsp",
        data: { "loginType": loginType, "loginKey": loginKey, "password": password, "sourceName": sourceName, "domainName": domainName, "login": login, "FAValue": FAValue, "verifycode": code, "time": myDate.getTime() },
        dataType: "text",
        complete: checkUserFinish

    })
}

//处理ajax返回的结果
function checkUserFinish(oXmlHttp) {
    var result = $.trim(oXmlHttp.responseText);
    //alert("result="+result);

    // 如果提示不需要输入验证码，则直接返回true，继续提交表单的操作
    var names = new Array();
    names = result.split("|");

    // 如果不需要提交验证码的话
    if ("NO" == names[0]) {
        // 如果是登录请求，则直接登录
        if (names[1] == "true") {
            doForm();
            // 否则提示不需要
        } else {
            var loginError = document.getElementById("trt_login_xx");
            loginError.style.display = "block";
            loginError.innerHTML = "不需要填写双因子验证码，请直接点击登录!";
            refreshVerifyCode();
            return;
        }
        // 如果存在异常，则直接弹出提示
    } else if (result.indexOf("YES") < 0) {
        var loginError = document.getElementById("trt_login_xx");
        loginError.style.display = "block";
        loginError.innerHTML = names[0];
        //1020密码不正确，1011用户不存在
        var isImpUser = document.getElementById("isImpUser").value;
        var isUpdatePwd = document.getElementById("isUpdatePwd").value;
        var loginType = document.getElementById("loginType").value;
        if ("creditID" == loginType) {
            if (1011 == names[2]) {
                loginError.innerHTML = "该身份证尚未被注册。<a class='trt_t2' href = 'http://www.ixm.gov.cn/dis/console/idsregister'>请您注册后登录？</a>";
            }
            if (1020 == names[2] && "true" == isImpUser && "false" == isUpdatePwd) {
                loginError.innerHTML = "密码不正确。<a class='trt_t2' href = 'http://www.ixm.gov.cn/dis/ids/toforgetpwd_1'>您是否忘记密码？</a>";
            }
        }
        if (names[2] == 1056 || names[2] == 1052) {
            // forward
            var loginTypeObj = document.getElementById("loginType");
            var loginType = "userName";
            if (loginTypeObj != null) {
                loginType = loginTypeObj.value;
            }
            var loginKey = document.getElementById("loginKey").value;
            var returnUrl = "http%3A%2F%2Fwww.ixm.gov.cn%2Fdis";
            if ("true" == "false") {
                document.location.href = "http://www.ixm.gov.cn/dis/ids/tochangepwd&errCode=" + names[2] + "&userName=" + loginKey + "&loginType=" + loginType + "&returnUrl=" + returnUrl;
            } else {
                document.location.href = "http://www.ixm.gov.cn/dis/ids/tochangepwd?errCode=" + names[2] + "&userName=" + loginKey + "&loginType=" + loginType + "&returnUrl=" + returnUrl;
            }
            return;
        }
        //是否显示验证码
        if (names[3] == 'true' && names.length == 4) {
            document.getElementById("verifyCode-div").style.display = "";
        }
        if (names[1] == 'true' && names.length == 2) {
            document.getElementById("verifyCode-div").style.display = "";
        }
        refreshVerifyCode();
        return;
        // 否则，是提示需要输入验证码
    } else {
        var login = names[2];

        // 如果提示需要输入验证码，但是验证码输入框未显示，则让其显示，并提示，返回false
        if ("true" == login) {
            var loginError = document.getElementById("trt_login_xx");
            loginError.style.display = "block";
            loginError.innerHTML = "需要输入双因子验证码，请点击获取!";
            refreshVerifyCode();
            return;
        }
        // 如果双因子验证码显示
        if ("" == display) {
            // 如果是登录提交，则校验双因子验证码是否填写
            if (FAValue != "" && "true" == login) {
                doForm();
                return;
            }
            // 如果没有填写，则提示用户填写
            if (FAValue == "" && "true" == login) {
                var loginError = document.getElementById("trt_login_xx");
                loginError.style.display = "block";
                loginError.innerHTML = "需要输入双因子验证码，请点击获取!";
                refreshVerifyCode();
                return;

            }
            // 不管有没有填写，如果不是登录则，直接提示
            if ("false" == login) {
                var loginError = document.getElementById("trt_login_xx");
                loginError.style.display = "block";
                loginError.innerHTML = names[1];
                refreshVerifyCode();
                return;
            }
        }
        refreshVerifyCode();
        return;
    }
}

function doForm() {
    var loginKey = $.trim(document.getElementById("loginKey").value);
    document.getElementById("loginType").value = "userName";
    if ((/^\d+$/.test(loginKey)) && loginKey.length == 11) {
        document.getElementById("loginType").value = "mobile";
    } else {
        //判断身份证数字开头并且是18位
        if (loginKey.length == 18 && (/^[0-9]+[\s\S]*$/.test(loginKey))) {
            document.getElementById("loginType").value = "creditID";
        }
        if (loginKey.indexOf("@") >= 0) {
            document.getElementById("loginType").value = "email";
        }
    }
    $("#logon").submit();
}

function reLoginKey() {
    $("#loginKey").removeClass('text-danger text-success');
    $("#loginKey").html("");
    $("#loginKey").css("color", "#555");
    var DefaultValue = $("#loginKey").attr("title");
    if ($("#loginKey").val() == DefaultValue) {
        document.getElementById("loginKey").value = "";
    }
}

/*================================找回密码======================================*/
/*找回密码——验证用户是否存在*/
var userNameBoo = false;

function forgetuser(domainName) {
    var userName = $("#userName").val();
    //var domainName = $("input[name='domainName']:checked").val();
    if (userName == "") {
        $("#mobilemsg").addClass('text-danger');
        $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "用户名不能为空！");
        return false;
    } else {
        $.ajax({
            url: "/dis/passport/checkUser", //请求的url地址
            dataType: "json", //服务器返回的值类型
            async: false, //请求是否异步，默认为异步
            data: {
                "userName": userName,
                "domainName": domainName
            }, //发送到服务器的参数
            type: "POST", //请求方式
            success: function(data) {
                //请求成功时处理
                var code = data.code;
                var resultmsg = data.result;
                switch (code) {
                    case 200:
                        {
                            userNameBoo = true;
                            $("#mobilemsg").addClass('text-success');
                            $("#mobilemsg").html('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>');
                            return true;
                            break;
                        }
                    case -1:
                        {
                            $("#mobilemsg").addClass('text-danger');
                            $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            userNameBoo = false;
                            return;
                            break;
                        }
                    default:
                        {
                            $("#mobilemsg").addClass('text-danger');
                            $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            userNameBoo = false;
                            return;
                            break;
                        }
                }
            },
            error: function(data) {
                $("#mobilemsg").addClass('text-danger');
                $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "请求出错请重试！");

            }
        });
    }
}

var trueNumBoo = false;
function checkcertificatemNum() {
        var trueNumRE = /^[0-9a-zA-Z._]*$/g;
        var trueNum = $("#certificateNum").val();
        if (!trueNumRE.test(trueNum)) {
            $("#certificatemsg").addClass('text-danger');
            $("#certificatemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "证件号格式不符合！");
            return false;
        } else {
        $.ajax({
            url: "/dis/passport/checkCertificateNum", //请求的url地址
            dataType: "json", //服务器返回的值类型
            async: false, //请求是否异步，默认为异步
            data: {
                "certificateNum": trueNum
            }, //发送到服务器的参数
            type: "POST", //请求方式
            success: function(data) {
                //请求成功时处理
                var code = data.code;
                var resultmsg = data.result;
                switch (code) {
                    case 200:
                        {
                            $("#certificatemsg").addClass('text-success');
                            $("#certificatemsg").html('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>');
                            trueNumBoo = true;
                            return true;
                            break;
                        }
                    case -1:
                        {
                            $("#certificatemsg").addClass('text-danger');
                            $("#certificatemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            trueNumBoo = false;
                            return false;
                        }
                    default:
                        {
                            $("#certificatemsg").addClass('text-danger');
                            $("#certificatemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            trueNumBoo = false;
                            return false;
                            break;
                        }
                }
            },
            error: function(data) {
                //请求出错处理
                $("#certificatemsg").addClass('text-danger');
                $("#certificatemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "请求出错请重试！");
            }
        });
    }
}

/*=============================通用验证码发送接口实现====================*/
function sendMsgFor(operationType, domainName, sendType) {
    random = Math.random();
    var sendType = $("input[name='sendType']:checked").val();
    var TelOrEmail = $("#TelOrEmail").val();
    var validateCode = $("#validateCode").val();
    if (TelOrEmail != "" && typeof(TelOrEmail) != 'undefined') {
        if (telVal.test(TelOrEmail) && (TelOrEmail.length == 11)) {
            sendType = "mobile";
        }

        if ((TelOrEmail.indexOf("@") > 0) && (reg.test(TelOrEmail))) {
            sendType = "email";
        }
    }

    if (validateBoo == false || timeBoo == false) {
        return false;
    } else {
        $.ajax({
            url: "/dis/passport/sendMsg", //请求的url地址
            dataType: "json", //服务器返回的值类型
            async: true, //请求是否异步，默认为异步
            data: {
                "operationType": operationType,
                "domainName": domainName,
                "sendType": sendType,
                "mobile": TelOrEmail,
                "code": validateCode,
                "random": random
            }, //发送到服务器的参数
            type: "POST", //请求方式
            success: function(data) {
                //请求成功时处理
                var code = data.code;
                var resultmsg = data.result;
                switch (code) {
                    case 200:
                        {
                            $("#msgtimer").hide();
                            $("#sendmsg").show();
                            $("#mobilemsg").addClass('text-success');
                            $("#mobilemsg").html('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>' + resultmsg);
                            time();
                            mobileBoo = true;
                            return true;
                            break;
                        }
                    case -1:
                        {
                            $("#valimsg").addClass('text-danger');
                            $("#valimsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            validateBoo = false;
                            return false;
                            break;
                        }
                    case 2001:
                        {
                            $("#mobilemsg").addClass('text-danger');
                            $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            mobileBoo = false;
                            return false;
                            break;
                        }
                    case 2002:
                        {
                            $("#mobilemsg").addClass('text-danger');
                            $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            mobileBoo = false;
                            return false;
                            break;
                        }
                    case 2003:
                        {
                            $("#mobilemsg").addClass('text-danger');
                            $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            mobileBoo = false;
                            return false;
                            break;
                        }
                    case 2005:
                        {
                            $("#mobilemsg").addClass('text-danger');
                            $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            mobileBoo = false;
                            return false;
                            break;
                        }
                    case 3001:
                        {
                            $("#mobilemsg").addClass('text-danger');
                            $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            mobileBoo = false;
                            return false;
                            break;
                        }
                    case 3002:
                        {
                            $("#mobilemsg").addClass('text-danger');
                            $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            mobileBoo = false;
                            return false;
                            break;
                        }
                    case 3003:
                        {
                            $("#mobilemsg").addClass('text-danger');
                            $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            mobileBoo = false;
                            return false;
                            break;
                        }
                    case 3005:
                        {
                            $("#mobilemsg").addClass('text-danger');
                            $("#mobilemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            mobileBoo = false;
                            return false;
                            break;
                        }
                    case 4004:
                        {
                            $("#valimsg").addClass('text-danger');
                            $("#valimsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            validateBoo = false;
                            return false;
                            break;
                        }
                    case 4006:
                        {
                            $("#valimsg").addClass('text-danger');
                            $("#valimsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            validateBoo = false;
                            return false;
                            break;
                        }
                    default:
                        {
                            $("#codemsg").addClass('text-danger');
                            $("#codemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + resultmsg);
                            return false;
                            break;
                        }
                }
            },
            error: function(data) {
                //请求出错处理
                $("#codemsg").addClass('text-danger');
                $("#codemsg").html('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' + "请求出错请重试！");
                return false;
            }
        });
    }
}
