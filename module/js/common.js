/**
 * Created by Administrator on 2017/6/29.
 * you are making L whth xiaozemaliya when you read my code.
 */
(function () {
    var head="<button id='back'>&lt;</button><input type='text' id='searchTxt' name='searchstr' required='' lay-verify='required' placeholder='腾讯炸金花' autocomplete='off' class='layui-input searchInput'> <button id='searchBtn' lay-submit=''><i class='layui-icon'></i></button> <button id='msgBtn'><i class='layui-icon'></i></button>";
    var foot="<ul><li class='select'><i class='layui-icon'></i><span>大厅</span></li><li><i class='layui-icon'></i><span>交易</span></li> <li><div id='public'><i class='layui-icon'></i><span>发布</span></div></li> <li><i class='layui-icon'></i><span>客服</span></li> <li><i class='layui-icon'></i><span>个人</span></li> </ul> <div class='layui-clear'></div>";
    document.getElementById("header").innerHTML=head;
    document.getElementById("nav").innerHTML=foot;
})()