/**
 项目JS主入口
 以依赖Layui的layer和form模块为例
 **/
var flow;
$(function () {
    var index = (function (index) {
        //屏幕尺寸变化
        index.resize=function () {
            $("#hall").height(window.innerHeight-parseInt($("#hall").css("padding-top")));
            $("#info-list").height(window.innerHeight-$("header").innerHeight()-$(".top").innerHeight()-$(".btnGroup").innerHeight()-$("nav").innerHeight()-parseInt($("#info-list").css("margin-bottom")));
        }
        //关闭当前窗口
        index.closeWindow= function (sales) {
            function closeM() {
                layer.close(sales);
            }

            $(".resetBtn").unbind("click", closeM);
            $(".resetBtn").on("click", closeM);
        }

        //事件绑定
        index.eventRegist = function () {

            //大厅列表点击
            $("#main-list").on("click","li .layui-btn",function (e) {
                $("#back").show();
                // -1:未代理
                if(this.className.indexOf("warm")==-1){
                    $(".dlInfo,.dlEdit").show();
                    $(".single").hide();
                }else{
                    $(".dlInfo,.dlEdit").hide();
                    $(".single").show();
                }
                //模拟数据
                function getData2(p,cb) {
                    if(p==1){
                        setTimeout(function () {
                            console.log(111);
                            var data = {
                                data: [
                                    {type:'买'},
                                    {type:'卖'},
                                    {type:'卖'},
                                    {type:'买'},
                                    {type:'卖'},
                                    {type:'买'},
                                    {type:'卖'},
                                    {type:'买'},
                                    {type:'卖'},
                                    {type:'卖'},
                                    {type:'买'},
                                    {type:'卖'}
                                ],
                                pages:2
                            };
                            cb(data);
                        },600);
                    }else{
                        setTimeout(function () {
                            console.log(222);
                            var obj= {
                                data:[
                                    {type:'卖'},
                                    {type:'卖'},
                                    {type:'买'},
                                    {type:'卖'},
                                    {type:'买'},
                                    {type:'卖'}
                                ],
                                pages:2
                            };
                            cb(obj);
                        },1000);
                    }
                }
                flow.load({
                    elem:"#table-list",
                    scrollElem:"#info-list",
                    isAuto:false,
                    done:function (page,next) {
                        var lis = [];
                        //以jQuery的Ajax请求为例，请求下一页数据（注意：page是从2开始返回）
                        // $.get('/api/list?page='+page, function(res){
                        // });
                        getData2(page,function (res) {
                            //假设你的列表返回在data集合中
                            layui.each(res.data, function(index, item){
                                lis.push("<tr><td><p><span class='sell "+(item.type=='买'?'red':'green')+"'>"+item.type+"</span><span class='pub'>花花<br>商行</span><span class='pub_name'>" +
                                    "花花商行</span></p><p class='long'>100=100</p><p>100</p><p>￥100</p><p>" +
                                    "<button  class='layui-btn layui-btn-warm layui-btn-small deal' data-i='"+(item.type=='买'?'sell':'buy')+"'>"+(item.type=='买'?'购买':'出售')+"</button></p></td></tr>");
                            });
                            next(lis.join(''), page < res.pages);
                        });
                    }
                });
                $("#goodsInfo").stop(false,true).animate({"left":0},300);
                $("main").fadeOut(400);
            });

            //发布
            $("#public").on("click",function (e) {
                e.stopPropagation();
                layer.closeAll();
                var html = template("pub", []);
                layer.open({
                    type: 1,
                    content: html,
                    title: false,
                    area: ["23rem"]
                });
            });

            //返回大厅
            $("#back").on("click",function (e) {
                e.stopPropagation();
                $("#goodsInfo").stop(false,true).animate({"left":'100%'},300,function () {
                    $("#table-list").empty();
                });
                $("main").fadeIn(400);
                $(this).hide();
            });

            $("#searchTxt").on("focus", function () {
                var _this = this;
                var val = $(_this).val();
                _this.style.textAlign="left";
                if (!val) {
                    var txtW = $("#searchTxt").width();
                    var btnW = $("#searchBtn").width();
                    var offWidth = $("#searchTxt").offset().left + txtW - $("#searchBtn").offset().left - btnW;
                    $("#searchBtn").css("transform", "translateX(" + (offWidth) + "px)");
                }
            });

            $("#searchTxt").on("blur", function () {
                var _this = this;
                var val = $(_this).val();
                _this.style.textAlign="center";
                if (!val) {
                    $("#searchBtn").css("transform", "translateX(0px)");
                }
            });

            //右侧顶部消息按钮
            $("#msgBtn").click(function (e) {
                e.stopPropagation();
                var load = layer.load(0, {
                    shade: [0.4, "#000"], //0.1透明度的白色背景
                    scrollbar: false
                });
                setTimeout(function () {
                    layer.close(load)
                }, 2000);
            });

            //出售按钮
            $("#sell").on("click", function (e) {
                e.stopPropagation();
                var html = template("sales_M", []);
                var sales = layer.open({
                    type: 1,
                    content: html,
                    skin: "dl",
                    title: ["销售"],
                    closeBtn: 0,
                    area: ["25rem"]
                });
                index.closeWindow(sales);
            });

            //申请代理
            $("#request").on("click",function (e) {
                e.stopPropagation();
                var html=template("is-send",[]);
                var send=layer.open({
                    type: 1,
                    title:false,
                    content: html,
                    skin: "dl",
                    closeBtn: 0,
                    area: ["24rem"]
                });
                index.closeWindow(send);
            });

            //购买、出售按钮
            $("#dataTable").on("click","button.deal", function (e) {
                e.stopPropagation();
                var node= $(this).attr("data-i");
                var html = template("buy_M", {
                    temp:node=="buy"?"卖出":"购入"
                });
                var sales = layer.open({
                    type: 1,
                    title:false,
                    content: html,
                    skin: "dl",
                    closeBtn: 0,
                    area: ["25rem"]
                });
                index.closeWindow(sales);
            });

            //充值按钮
            $("#payBtn").on("click",function(e){
                e.stopPropagation();
                var html=template("pub_Pay",[]);
                var sales = layer.open({
                    type: 1,
                    title:false,
                    content: html,
                    skin: "dl",
                    closeBtn: 0,
                    area: ["25rem"]
                });
                index.closeWindow(sales);
            });

            //设置名片
            $("#setCard").on("click",function (e) {
                e.stopPropagation();
                var html=template("set-div",[]);
                var set = layer.open({
                    type: 1,
                    title:false,
                    content: html,
                    skin: "dl",
                    closeBtn: 0,
                    area: ["25.5rem"]
                });
                //上传头像预览
                $("#dl-imgFile").on("change", function() {
                    var _this = this;
                    if(!_this.files[0]){return}
                    $("#dl-img").attr("src", URL.createObjectURL(_this.files[0]));
                });
                index.closeWindow(set);
            });
        };

        //支付密码框
        index.payOpen= function (title,money) {
            var html=template("pay_Pwd",{title:title,money:money});
            layer.open({
                type:1,
                content:html,
                closeBtn: 1,
                title:["请输入支付密码","padding:.4rem 40px;text-align:center;font-size:1.2rem"],
                area: ["25rem"],
                skin:"pay"
            });
        };

        //支付请求
        index.payRequst= function (val) {
            console.log(val);
            layer.load(0, {
                shade: [0.4, "#000"], //0.1透明度的白色背景
                scrollbar: false
            });
            setTimeout(function () {
                layer.closeAll();
                layer.alert("成功！",{icon:1,title:false,btnAlign:'c',closeBtn:0});
            }, 2000);
        };

        //支付密码输入
        index.payInput= function () {
            $("#payPwdText").on("input propertychange", function () {
                console.log("input");
                var val=$(this).val();
                var leng=val.length;
                var span=$("#pwd .layui-form-item>span");
                var text=$("#pwd .layui-form-item>span[input='true']").length;
                if(text<=leng){
                    for(var i=0;i<leng;i++){
                        span.eq(i).html("*").attr("input",true);
                    }
                    i==6&&index.payRequst(val);
                }else{
                    for(var i=leng;i<6;i++){
                        span.eq(i).html("").attr("input",false);
                    }
                    console.log(val);
                }

            });
        }

        index.init=function () {
            layui.define(["layer", "form","flow"], function (exports) {
                layer = layui.layer;flow=layui.flow;
                var form = layui.form();

                <!--模拟大厅数据-->
                function getData(p,cb) {
                    console.log(p);
                    if(p==1){
                        setTimeout(function () {
                            var data = {
                                data: [
                                    {
                                        title: '678 game Center',
                                        dl:'当前代理人数很多123213123131',
                                        is:1,
                                        max:7545,
                                        min:7125,
                                        deal:12312123123124
                                    },{
                                        title: '1312 game Center',
                                        dl:'当前代理人数没有',
                                        is:0,
                                        max:7545,
                                        min:7125,
                                        deal:121333
                                    },{
                                        title: '1312 game Center',
                                        dl:'当前代理人数没有',
                                        is:1,
                                        max:7545,
                                        min:7125,
                                        deal:121333
                                    },{
                                        title: '1312 game Center',
                                        dl:'当前代理人数没有',
                                        is:0,
                                        max:7545,
                                        min:7125,
                                        deal:121333
                                    },{
                                        title: '1312 game Center',
                                        dl:'当前代理人数没有',
                                        is:1,
                                        max:7545,
                                        min:7125,
                                        deal:121333
                                    }, {
                                        title: '678 game Center',
                                        dl:'当前代理人数很多',
                                        is:1,
                                        max:7545,
                                        min:7125,
                                        deal:345345
                                    }, {
                                        title: '678 game Center',
                                        dl:'当前代理人数不是很多',
                                        is:0,
                                        max:7545,
                                        min:7125,
                                        deal:455232
                                    }, {
                                        title: '678 game Center',
                                        dl:'当前代理人数没有',
                                        is:1,
                                        max:7545,
                                        min:7125,
                                        deal:121333
                                    }],
                                pages:2
                            };
                            cb(data);
                        },1000);
                    }else{
                        setTimeout(function () {
                            var obj= {
                                data:[{
                                    title: '788 game Center',
                                    dl:'当前代理人数很多123213123131',
                                    is:1,
                                    max:p,
                                    min:7125,
                                    deal:12312123123124
                                }, {
                                    title: '67788 game Center',
                                    dl:'当前代理人数很多',
                                    is:1,
                                    max:p,
                                    min:7125,
                                    deal:345345
                                }, {
                                    title: '4564 game Center',
                                    dl:'当前代理人数不是很多',
                                    is:0,
                                    max:7545,
                                    min:7125,
                                    deal:455232
                                }, {
                                    title: '1312 game Center',
                                    dl:'当前代理人数没有',
                                    is:1,
                                    max:7545,
                                    min:7125,
                                    deal:121333
                                }],
                                pages:2
                            };
                            cb(obj);
                        },2000);
                    }
                }
                //大厅数据流加载
                flow.load({
                    elem:"#main-list",
                    scrollElem:"#hall",
                    done:function (page,next) {
                        var lis = [];
                        //以jQuery的Ajax请求为例，请求下一页数据（注意：page是从2开始返回）
                        // $.get('/api/list?page='+page, function(res){
                        // });
                        getData(page,function (res) {
                            //假设你的列表返回在data集合中
                            layui.each(res.data, function(index, item){
                                lis.push('<li><div><div class="logoImg"><img src="" alt=""></div><div class="desc"><p class="title">'+
                                    item.title+'</p><p class="num">'+item.dl+'</p><p><button class="layui-btn layui-btn-small t5 '+
                                    (item.is==1?"layui-btn-warm":"layui-btn-normal")+'">'+(item.is==1?"申请代理":"已代理")+'</button></p>'+
                                    '</div></div><div class="dealInfo"><p class="eg">比例：<span>'+item.max+'</span></p>'+
                                    '<p class="dealNum">成交量 <span>'+item.deal+'</span></p> </div></li>')
                            });
                            //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
                            //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
                            next(lis.join(''), page < res.pages);
                        });
                    }
                });

                //输入验证
                form.verify({
                    checkPwdL: function (value) {
                        if (value.length != 6) {
                            return "请输入6位数交易密码";
                        }
                    },
                    checkPwd: function (value) {
                        var reg = /^(\w){6,14}$/;
                        if (!reg.test(value)) {
                            return "登录密码由6-14位数字，字母组成";
                        }
                    },
                    isNumber:function (value) {
                        var reg=/^[0-9]*$/;
                        if (!reg.test(value)) {
                            return "请输入正确的数字";
                        }
                    }
                });

                //提交事件
                form.on("submit(deal)", function (data) {
                    console.log(data, 1);
                });
                //支付
                form.on("submit(sure_deal)", function (data) {
                    var node=data.elem.dataset.i;
                    layer.close(layer.index);
                    layer.open({
                        content:'您的帐户余额不足，请在“个人”中完成帐户充值再进行购买。',
                        btn:["立即前往"],
                        title:false,
                        btnAlign:'c',
                        yes: function (i,layero) {
                            layer.close(i);
                            index.payOpen(node,7123);
                            index.payInput();
                        }
                    });
                });
                //申请代理
                form.on("submit(req)",function (data) {
                    layer.closeAll();
                    var html=template("send-req",[]);
                    var req=layer.open({
                        type: 1,
                        title:false,
                        content: html,
                        skin: "dl",
                        closeBtn: 0,
                        area: ["24rem"]
                    });
                    index.closeWindow(req);
                });
                //提交申请
                form.on("submit(send-req)",function (data) {
                    console.log(data.field);
                    layer.msg("提交成功，请随时注意查看消息通知！",{icon:1,time:1000},function () {
                        layer.closeAll();
                    });
                });
                //名片设置
                form.on("submit(set-card)",function (data) {
                    console.log(data.field);
                    layer.msg("设置成功！",{icon:1,time:1000},function () {
                        layer.closeAll();
                    });
                })

                window.addEventListener("resize",index.resize);
                index.resize();
                index.eventRegist();
                exports("index", {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
            });
        };
        return index;
    }(index || {}));
    index.init();
});