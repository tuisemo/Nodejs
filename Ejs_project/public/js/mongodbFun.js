define(["vue"],function(o){var a=new o({el:".wrap",created:function(){},data:{addBooks:{title:"",summary:"",price:""}},methods:{addBookPost:function(){var o=this;$.ajax({url:"/add",type:"POST",dataType:"json",data:o.addBooks,success:function(o){console.log(o)},erroe:function(){}})}}});window.app=a});