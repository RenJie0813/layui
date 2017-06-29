/**
  项目JS主入口
  以依赖Layui的layer和form模块为例
**/
$(function() {
    layui.define(["layer", "form"], function(exports) {
        var layer = layui.layer,
            form = layui.form();

        $.getJSON("../dist/bankData.json",function (data) {
            var html="";
            for(var i=0,leng=data.length;i<leng;i++){
                html+="<option value='"+data[i].bin+"'>"+data[i].bankName+"</option>";
            }
            $("#bank").append(html);
            form.render("select");
            $("#cardNum").on("input",function () {
                var n=$(this).val();
                if(n.length>=6){
                    for(var i=0,leng=data.length;i<leng;i++){
                        if(n==data[i].bin){
                            $("#bank").get(0).selectedIndex=i+1;
                            $($("#bank-div dl dd")[i+1]).addClass("layui-this");
                            $(".layui-input.layui-unselect").val(data[i].bankName);
                        }
                    }
                }else{
                    $("#bank").get(0).selectedIndex=0;
                    $(".layui-input.layui-unselect").val("");
                }
            });
        });

        //表单验证
        form.verify({
            checkPwdL: function(value) {
                if (value.length < 6) {
                    return "请输入至少6位数交易密码";
                }
            },
            checkPwd: function(value) {
                var reg = /^(\w){6,14}$/;
                if (!reg.test(value)) {
                    return "登录密码由6-14位数字，字母组成";
                }
            }
        });

        //提交事件
        form.on("submit(login)", function (data) {
            var username=data["field"]["username"];
            var pwd=data["field"]["pwd"];
            if(username=="aidi"&&pwd=="memeda"){
                $("#loginForm").hide();
                $("#login").removeClass("layui-hide");
            }else{
                layer.msg("密码错误！",{skin:"demo-class",time:1000,icon:5});
            }
        });

        //个人信息完善
        form.on("submit(addInfo)", function (data) {
            console.log(data);
            return false;
        });

        exports("login", {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
    });

    //上传头像预览
    $("#imgFile").on("change", function() {
        var _this = this;
        if(!_this.files[0]){return}
        $("#upImage").css("color", "#fff");
        $("#preview").attr("src", URL.createObjectURL(_this.files[0]));
    });
})