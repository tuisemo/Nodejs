var maxentries = 0;
define(["脚本_layer", "脚本_paging"], function() {
    var PersonCenter = function() {
        this.$Pagination = $("#Pagination");
        this.init();
    }
    PersonCenter.prototype = {
        init: function() {
            this.loginstatesdraw();
        },
        //登陆状态渲染
        loginstatesdraw: function(argument) {
            $("#login").attr("href", 'http://www.ixm.gov.cn/ids/custom/xiamen/login_xm.jsp?fromCoAppName=XMDOP&returnUrl=http%3a%2f%2ftest.ixm.gov.cn%2fdop?returnUrl=' + window.location.href);
            $.ajax({
                url: "http://test.ixm.gov.cn/dop/front/login/info",
                dataType: "json",
                async: false,
                data: {},
                type: "GET",
                success: function(data) {
                    if (data.result == true) {
                        $("#login").attr("href", data.data.logoutUrl);
                        $("#login").html('<li><span class="glyphicon glyphicon-circle-arrow-down" aria-hidden="true"></span>退出</li>');
                        $("#signup").attr("href", "http://test.ixm.gov.cn/grzx/wdsq/");
                        $("#signup").html('<li>' + data.data.info + '</li>');
                        $(".userName").html(data.data.info);
                        switch (data.data.realNameStatus) {
                            case "PASSED_NOTREALNAME":
                                {
                                    $(".realNameStatus").html("未认证");
                                    break;
                                }
                            case "PASSED_BASICREALNAME":
                                {
                                    $(".realNameStatus").html("已完成初级实名认证");
                                    break;
                                }
                            case "PASSED_WITHREALNAME":
                                {
                                    $(".realNameStatus").html("已完成中级实名认证");
                                    break;
                                }
                            case "PASSED_ADVANCED":
                                {
                                    $(".realNameStatus").html("已完成高级实名认证");
                                    break;
                                }
                        }
                        window.userName = data.data.userName;
                    } else {
                        return false;
                    }
                },
                error: function(data) {
                    return false;
                }
            });
            $.ajax({
                url: "http://test.ixm.gov.cn/dop/front/data/index",
                dataType: "json",
                async: true,
                data: {},
                type: "GET",
                success: function(data) {
                    if (data.result == true) {
                        $("#datacount").html("本月新增<span>" + data.data.totalNum + "</span>条数据");
                    } else {
                        return false;
                    }
                },
                error: function(data) {
                    return false;
                }
            });
        },
        //我的申请，构建分页，分页回调
        applyCallbackfunc: function(pagesize, count) {
            var that = this;
            that.$Pagination.Paging({
                pagesize: pagesize,
                count: count,
                callback: function(page, size, count) {
                    that.applylistdraw(page, 10);
                }
            });

        },
        //我的评分，分页回调
        gradeCallbackfunc: function(pagesize, count) {
            var that = this;
            that.$Pagination.Paging({
                pagesize: pagesize,
                count: count,
                callback: function(page, size, count) {
                    that.gradelistdraw(page, 10);
                }
            });
        },
        //我的下载，分页回调
        downloadCallbackfunc: function(pagesize, count) {
            var that = this;
            that.$Pagination.Paging({
                pagesize: pagesize,
                count: count,
                callback: function(page, size, count) {
                    that.downloadlistdraw(page, 10);
                }
            });
        },
        //我的访问，分页回调
        viewsCallbackfunc: function(pagesize, count) {
            var that = this;
            that.$Pagination.Paging({
                pagesize: pagesize,
                count: count,
                callback: function(page, size, count) {
                    that.viewslistdraw(page, 10);
                }
            });
        },
        //申请列表渲染
        applylistdraw: function(page_index, num) {
            var that = this;
            $.ajax({
                url: "http://test.ixm.gov.cn/dop/front/dataApply/show",
                dataType: "json",
                async: false,
                data: {
                    "curPage": page_index,
                    "pageSize": num
                },
                type: "GET",
                success: function(data) {
                    if (data.result == true) {
                        maxentries = data.totalNum;
                        $("#myapplylist").empty();
                        for (var i = 0; i < data.data.length; i++) {
                            var dataName = data.data[i].dataName; //名称
                            var cName = data.data[i].cName; //提供单位
                            var nodeName = data.data[i].nodeName; //状态
                            var crTime = data.data[i].crTime; //提交时间
                            var documentURL = 'http://test.ixm.gov.cn/grzx/wdsq/wdsqxl/index.html?dataid=' + data.data[i].dataId; //详情id
                            $("#myapplylist").append("<tr><td>" + data.data[i].dataName + "</td><td>" + data.data[i].cName + "</td><td>" + data.data[i].nodeName + "</td><td>" + data.data[i].crTime + "</td><td><a href='" + documentURL + " '><span class='detailsicon'></span></a></td></tr>")
                        }
                    } else {
                        return false;
                    }
                },
                error: function(data) {
                    return false;

                }
            });
        },
        //申请详情渲染
        applylistdesdraw: function(page_index, num) {
            $.ajax({
                url: "http://test.ixm.gov.cn/dop/front/dataApply/detailShow.jhtml",
                dataType: "json",
                async: false,
                data: {
                    "dataId": dataid
                },
                type: "GET",
                success: function(data) {
                    if (data.result == true) {
                        $("#NO").html(data.data.dataId);
                        $("#name").html(data.data.dataName);
                        $("#depName").html(data.data.cName);
                        $("#status").html(data.data.nodeName);
                        $("#applytime").html(data.data.crTime);
                        $("#replytime").html(data.data.replyTime);
                        $("#reply").html(data.data.reply);
                    } else {
                        return false;
                    }
                },
                error: function(data) {
                    return false;

                }
            });
        },
        //我的评分渲染
        gradelistdraw: function(page_index, num) {
            var that = this;
            $.ajax({
                url: "http://test.ixm.gov.cn/dop/front/dataScore/show",
                dataType: "json",
                async: false,
                data: {
                    "curPage": page_index,
                    "pageSize": num
                },
                type: "GET",
                success: function(data) {
                    if (data.result == true) {
                        $("#mygradelist").empty();
                        maxentries = data.totalNum;
                        for (var i = 0; i < data.data.length; i++) {
                            var dataName = data.data[i].dataName; //名称
                            var chnlName = data.data[i].chnlName; //类型
                            var theme = data.data[i].theme; //主题
                            var cName = data.data[i].cName; //提供单位
                            var mygradenum = data.data[i].score; //我的评分值
                            var crTime = data.data[i].crTime; //提交时间
                            var allgradenum = data.data[i].averageScore; //综合评分值
                            var mygrade = "<td class='pf'><span class='five'></span></td>";
                            switch (mygradenum) {
                                case "1":
                                    {
                                        mygrade = "<td class='pf'><span class='one'></span></td>"
                                        break;
                                    }
                                case "2":
                                    {
                                        mygrade = "<td class='pf'><span class='two'></span></td>"
                                        break;
                                    }
                                case "3":
                                    {
                                        mygrade = "<td class='pf'><span class='three'></span></td>"
                                        break;
                                    }
                                case "4":
                                    {
                                        mygrade = "<td class='pf'><span class='four'></span></td>"
                                        break;
                                    }
                                case "5":
                                    {
                                        mygrade = "<td class='pf'><span class='five'></span></td>"
                                        break;
                                    }
                                default:
                                    {
                                        alert("评分值不为整数！");
                                        break;
                                    }
                            };
                            var allgrade = "<td class='pf'><span class='five'></span></td>";
                            switch (allgradenum) {
                                case "1":
                                    {
                                        allgrade = "<td class='pf'><span class='one'></span></td>"
                                        break;
                                    }
                                case "2":
                                    {
                                        allgrade = "<td class='pf'><span class='two'></span></td>"
                                        break;
                                    }
                                case "3":
                                    {
                                        allgrade = "<td class='pf'><span class='three'></span></td>"
                                        break;
                                    }
                                case "4":
                                    {
                                        allgrade = "<td class='pf'><span class='four'></span></td>"
                                        break;
                                    }
                                case "5":
                                    {
                                        allgrade = "<td class='pf'><span class='five'></span></td>"
                                        break;
                                    }
                                default:
                                    {
                                        alert("评分值不为整数！");
                                        break;
                                    }
                            }
                            $("#mygradelist").append("<tr><td>" + data.data[i].dataName + "</td><td>" + data.data[i].chnlName + "</td><td>" + data.data[i].theme + "</td><td>" + data.data[i].cName + "</td>" + mygrade + "<td>" + data.data[i].crTime + "</td>" + allgrade + "</tr>")
                        }
                    } else {
                        return false;
                    }
                },
                error: function(data) {
                    return false;
                }
            });
        },
        //我的下载渲染
        downloadlistdraw: function(page_index, num) {
            var that = this;
            $.ajax({
                url: "http://test.ixm.gov.cn/dop/front/download/show",
                dataType: "json",
                async: false,
                data: {
                    "curPage": page_index,
                    "pageSize": num
                },
                type: "GET", //请求方式
                success: function(data) {
                    if (data.result == true) {
                        maxentries = data.totalNum;
                        $("#mydownloadlist").empty();
                        for (var i = 0; i < data.data.length; i++) {
                            var dataName = data.data[i].dataName; //名称
                            var dataType = data.data[i].dataType; //类型
                            var dataArea = data.data[i].dataArea; //主题
                            var providerOrg = data.data[i].providerOrg; //提供单位
                            var downloadTime = new Date(parseInt(data.data[i].downloadTime)).toLocaleString('chinese', { hour12: false }); //下载时间
                            var downloadUrl = data.data[i].downloadUrl; //详情id
                            $("#mydownloadlist").append("<tr><td>" + data.data[i].dataName + "</td><td>" + data.data[i].dataType + "</td><td>" + data.data[i].dataArea + "</td><td>" + data.data[i].providerOrg + "</td><td>" + downloadTime + "</td><td><a href='" + data.data[i].downloadUrl + "' title='" + data.data[i].downloadUrl + "'>" + '<span class="downloadicon"></span>' + "</a></td></tr>")
                        }
                    } else {
                        return false;
                    }
                },
                error: function(data) {
                    return false;
                }
            });
        },
        //访问列表渲染
        viewslistdraw: function(page_index, num) {
            var that = this;
            $.ajax({
                url: "http://test.ixm.gov.cn/dop/front/access/show",
                dataType: "json",
                async: false,
                data: {
                    "curPage": page_index,
                    "pageSize": num
                },
                type: "GET",
                success: function(data) {
                    if (data.result == true) {
                        maxentries = data.totalNum;
                        $("#myviewslist").empty();
                        for (var i = 0; i < data.data.length; i++) {
                            var accessTime = new Date(parseInt(data.data[i].accessTime)).toLocaleString().replace(/:\d{1,2}$/, '').replace(/\s+/g, ""); //访问时间
                            $("#myviewslist").append("<tr><td>" + data.data[i].dataName + "</td><td>" + data.data[i].dataType + "</td><td>" + data.data[i].dataArea + "</td><td>" + data.data[i].providerOrg + "</td><td title=" + accessTime + ">" + accessTime + "</td></tr>")
                        }
                    } else {
                        return false;
                    }
                },
                error: function(data) {
                    return false;
                }
            });

        },
        //监听设置
        listen: function(argument) {},
    }
    window.personCenter = new PersonCenter();
});
/*========评分功能=========*/
$(function() {
    var aLi = $("#gradestar li");
    var i = iScore = iStar = 0;
    for (i = 1; i <= aLi.length; i++) {
        aLi[i - 1].index = i;
        //鼠标移过显示分数
        aLi[i - 1].onmouseover = function() {
            fnPoint(this.index);
        };
        //鼠标离开后恢复上次评分
        aLi[i - 1].onmouseout = function() {
            fnPoint();
        };
        //点击后进行评分处理
        aLi[i - 1].onclick = function() {
            iStar = this.index;
            document.getElementById("score").value = this.index;
        }
    }
    //评分处理
    function fnPoint(iArg) {
        //分数赋值
        iScore = iArg || iStar;
        for (i = 0; i < aLi.length; i++) aLi[i].className = i < iScore ? "on" : "";
    }
});

function gradingsubmit() {
    if (typeof(userName) == "undefined") {
        $('#gradeing').modal('hide');
        alertmsg("您还未登录，请登录后再评分！", 0);
        return false;
    }
    var score = $("#score").val();
    var comments = $("#comments").val();
    var articleId = $("#articleId").val();
    $.ajax({
        url: 'http://test.ixm.gov.cn/dop/front/dataScore/submit.jhtml',
        type: 'GET',
        dataType: 'JSON',
        data: {
            "score": score,
            "comments": comments,
            "articleId": articleId
        },
        success: function(data) {
            $('#gradeing').modal('hide');
            alertmsg("您已成功提交评分！", 1);

        }
    })

}
//申请公开
function dataapplysubmit() {
    if (typeof(userName) == "undefined") {
        alertmsg("您还未登录，请登录后再申请！", 0);
        return false;
    }
    var articleID = $("input[name='articleID']").val();
    var name = $("input[name='name']").val();
    var depName = $("input[name='depName']").val();
    var conditions = $("input[name='conditions']").val();
    var purpose = $("textarea[name='purpose']").val();
    var upload = $("input[name='upload']").val();
    if (typeof(conditions) == "undefined") {
        conditions = "完成实名认证"
    }
    $.ajax({
        url: 'http://test.ixm.gov.cn/dop/front/dataApply/submit.jhtml',
        type: 'GET',
        dataType: 'JSON',
        data: {
            "articleID": articleID,
            "name": name,
            "depName": depName,
            "conditions": conditions,
            "purpose": purpose,
            "upload": upload
        },
        success: function(data) {
            if (data.result == true) {
                alertmsg("您已成功提交申请！", 1);
            } else {
                alertmsg(data.msg, 2);
            }
        }
    })

}

function alertmsg(text, iconnum) {
    layer.alert(text, { icon: iconnum });
}

function GetUrlString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); //编码解码
    return null;
}