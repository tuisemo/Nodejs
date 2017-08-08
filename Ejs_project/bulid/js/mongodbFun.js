define(['vue'], function(Vue) {

    var app = new Vue({
        el: '.wrap',
        created: function() {
            var that = this;
        },
        data: {
            addBooks: {
                title: "",
                summary: "",
                price: ""
            },
        },
        //事件触发函数定义
        methods: {
            addBookPost: function() {
                var that = this;
                $.ajax({
                    url: '/add',
                    type: 'POST',
                    dataType: 'json',
                    data: addBooks,
                    success: function(data) {

                    },
                    erroe: function() {}
                });
            }
        }
    });
    window.app = app;
});