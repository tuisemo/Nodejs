define(["脚本_DataOpenFunc", "脚本_layer"], function() {
    var DataViewTable = function() {
        this.$table = $("table");
        this.$tableHead = $("table thead");
        this.$tableBody = $("table tbody");
        this.init();
    }
    DataViewTable.prototype = {
        init: function() {
            this.showfile();
        },
        //显示所有附件
        showfile: function(dataid) {
            var that = this;
            $.ajax({
                url: "http://test.ixm.gov.cn/dop/front/excel/show.jhtml",
                dataType: "json",
                async: false,
                data: {
                    "dataId": dataId
                },
                type: "GET",
                success: function(data) {
                    if (data.result == true) {
                        if (data.data.length == 0) {
                            alertmsg("没有可在线预览的附件", 5);
                            return false;
                        }
                        for (var i = 0; i < data.data.length; i++) {
                            var text = '<div class="col-xs-4"><li><a href="javascript:;" dataId="' + dataId + '" srcFile="' + data.data[i].srcFile + '" onclick="javascript:selectfile(this);" style="cursor: pointer;">' + data.data[i].srcFile + '</a></li></div>'
                            $(".main ul").append(text);
                        }
                        that.teableview(dataId, data.data[0].srcFile, 1);
                    } else {
                        return false;
                    }
                },
                error: function(data) {
                    return false;
                }
            });
        },
        //初次渲染表格
        teableview: function(dataId, srcFile, curPage) {
            var that = this;
            $.ajax({
                url: "http://test.ixm.gov.cn/dop/front/excel/open.jhtml",
                dataType: "json",
                async: false,
                data: {
                    "dataId": dataId,
                    "srcFile": srcFile,
                    "curPage": curPage,
                    "pageSize": 10
                },
                type: "GET",
                success: function(json) {
                    if (json.result == true) {
                        that.$table.attr("srcFile", srcFile);
                        that.tablepaging(10, json.totalNum - 1);
                        var row = json.data.length;
                        var col = 0;
                        for (var key in json.data[0]) {
                            if (json.data[0].hasOwnProperty(key)) {
                                col++;
                            }
                        }
                        col = col - 2;
                        var rowmsg1 = new Array();
                        var rowmsg2 = new Array();
                        var tableWidth = 0;
                        var fieldStyle = eval("(" + json.tableInfo.fieldStyle + ")");
                        for (var n = 0; n < col; n++) {
                            var FIELDID = 'FIELD_' + n;
                            rowmsg1.push('<th>' + '<input class="sr01" style="width:' + fieldStyle[FIELDID] / 20 + 'px" name="FIELD_' + n + '" type="text" placeholder="' + json.data[0][FIELDID] + '" /></th>');
                        };
                        that.$tableHead.append('<tr>' + rowmsg1 + '</tr>');
                        for (var n = 0; n < col; n++) {
                            var FIELDID = 'FIELD_' + n;
                            rowmsg2.push('<td width="' + fieldStyle[FIELDID] / 20 + 'px' + '">' + json.data[0][FIELDID] + '</td>');
                        }
                        that.$tableHead.append('<tr class="td-tit">' + rowmsg2 + '</tr>');
                        for (var i = 1; i < row; i++) {
                            var rowmsg = new Array();
                            for (var n = 0; n < col; n++) {
                                var FIELDID = 'FIELD_' + n;
                                rowmsg.push('<td>' + json.data[i][FIELDID] + '</td>')
                            }
                            that.$table.append('<tr>' + rowmsg + '</tr>');
                        };
                        $("table tr:odd").addClass('tr-bg');
                    } else {
                        return false;
                    }
                },
                error: function(data) {
                    return false;
                }
            });
        },
        //构建分页展示
        tablepaging: function(pagesize, count) {
            var that = this;
            $('.excel_page').empty();
            $('.excel_page').Paging({
                pagesize: pagesize,
                count: count,
                callback: function(page, size, count) {
                    that.teabledraw(page);
                }
            });
        },
        //搜索结果分页构建
        searchpaging: function(pagesize, count) {
            var that = this;
            $('.excel_page').empty();
            $('.excel_page').Paging({
                pagesize: pagesize,
                count: count,
                callback: function(page, size, count) {
                    that.searchdraw(page);
                }
            });
        },
        //无搜索分页展示
        teabledraw: function(curPage) {
            var that = this;
            var dataId = GetUrlString("dataId");
            var srcFile = $("table").attr("srcFile");
            $.ajax({
                url: "http://test.ixm.gov.cn/dop/front/excel/open.jhtml",
                dataType: "json",
                async: false,
                data: {
                    "dataId": dataId,
                    "srcFile": srcFile,
                    "curPage": curPage,
                    "pageSize": 10
                },
                type: "GET",
                success: function(json) {
                    if (json.result == true) {
                        that.$tableBody.empty();
                        that.$table.attr("srcFile", srcFile);
                        var row = json.data.length;
                        var col = 0;
                        for (var key in json.data[0]) {
                            if (json.data[0].hasOwnProperty(key)) {
                                col++;
                            }
                        }
                        col = col - 2;
                        var rowmsg1 = new Array();
                        var rowmsg2 = new Array();
                        for (var i = 1; i < row; i++) {
                            var rowmsg = new Array();
                            for (var n = 0; n < col; n++) {
                                var FIELDID = 'FIELD_' + n;
                                rowmsg.push('<td>' + json.data[i][FIELDID] + '</td>')
                            }
                            that.$tableBody.append('<tr>' + rowmsg + '</tr>');
                        }
                        $("table tr:odd").addClass('tr-bg');
                    } else {
                        return false;
                    }
                },
                error: function(data) {
                    return false;
                }
            });
        },
        //
        selectfile: function(obj) {
            var that = this;
            var dataId = $(obj).attr("dataId");
            var srcFile = $(obj).attr("srcFile");
            that.$tableHead.empty();
            that.$tableBody.empty();
            that.teableview(dataId, srcFile, 1);
        },
        //
        searchpost: function(page) {
            var that = this;
            var dataId = GetUrlString("dataId");
            var srcFile = $("table").attr("srcFile");
            var dataarry = "";
            var dataObj = {};
            $("table input").each(function() {
                var name = $(this).attr("name");
                var value = $(this).val();
                if (value != "") {
                    dataObj[name] = value;
                }
            });
            if (typeof(page) != "undefined") {
                dataObj["curPage"] = page;
            }
            var postdata = $.extend({}, { "dataId": dataId, "srcFile": srcFile }, dataObj)
            $.ajax({
                url: "http://test.ixm.gov.cn/dop/front/excel/open.jhtml",
                dataType: "json",
                async: false,
                data: postdata,
                type: "GET",
                success: function(json) {
                    if (json.result == true) {
                        that.searchpaging(10, json.totalNum - 1);
                        $("table tbody").empty();
                        $("table").attr("srcFile", srcFile);
                        var row = json.data.length;
                        var col = 0;
                        for (var key in json.data[0]) {
                            if (json.data[0].hasOwnProperty(key)) {
                                col++;
                            }
                        }
                        col = col - 2;
                        var rowmsg1 = new Array();
                        var rowmsg2 = new Array();
                        for (var i = 1; i < row; i++) {
                            var rowmsg = new Array();
                            for (var n = 0; n < col; n++) {
                                var FIELDID = 'FIELD_' + n;
                                rowmsg.push('<td>' + json.data[i][FIELDID] + '</td>')
                            }
                            $("table tbody").append('<tr>' + rowmsg + '</tr>');
                        }
                        $("table tr:odd").addClass('tr-bg');
                    } else {
                        return false;
                    }
                },
                error: function(data) {
                    return false;
                }
            });
        },
        //
        searchdraw: function(page) {
            var that = this;
            var dataId = GetUrlString("dataId");
            var srcFile = $("table").attr("srcFile");
            var dataarry = "";
            var dataObj = {};
            $("table input").each(function() {
                var name = $(this).attr("name");
                var value = $(this).val();
                if (value != "") {
                    dataObj[name] = value;
                }
            });
            if (typeof(page) != "undefined") {
                dataObj["curPage"] = page;
            }
            var postdata = $.extend({}, { "dataId": dataId, "srcFile": srcFile }, dataObj)
            $.ajax({
                url: "http://test.ixm.gov.cn/dop/front/excel/open.jhtml",
                dataType: "json",
                async: false,
                data: postdata,
                type: "GET",
                success: function(json) {
                    if (json.result == true) {
                        $("table tbody").empty();
                        $("table").attr("srcFile", srcFile);
                        var row = json.data.length;
                        var col = 0;
                        for (var key in json.data[0]) {
                            if (json.data[0].hasOwnProperty(key)) {
                                col++;
                            }
                        }
                        col = col - 2;
                        var rowmsg1 = new Array();
                        var rowmsg2 = new Array();
                        for (var i = 1; i < row; i++) {
                            var rowmsg = new Array();
                            for (var n = 0; n < col; n++) {
                                var FIELDID = 'FIELD_' + n;
                                rowmsg.push('<td>' + json.data[i][FIELDID] + '</td>')
                            }
                            $("table tbody").append('<tr>' + rowmsg + '</tr>');
                        }
                        $("table tr:odd").addClass('tr-bg');
                    } else {
                        return false;
                    }
                },
                error: function(data) {
                    return false;
                }
            });
        },
        //设置监听
        listen: function(argument) {},
    }
    window.dataViewTable = new DataViewTable();
})
