var speed=600;//滚动速度
var wait=2500;//延迟时间
$(function () {
        var oDiv = $("#scroll");
        var timer = null;
        oDiv.mouseover(function () {
                clearInterval(timer);
        }).mouseout(function () {
                timer = setInterval(function () {
                        scrollUp(oDiv);
                }, wait);
        }).trigger("mouseout");
});

function scrollUp(obj) {
        var oLi = obj.find("ul:first");
        var lineHeight = oLi.find("li:first").height();
        oLi.animate({
                "margin-top": - lineHeight + "px"
        },
        speed,
                function () {
                        oLi.css({
                                "margin-top": "0px"
                        }).find("li:first").appendTo(oLi);
                })
}
function scrollDown(obj) {
        var oLi = obj.find("ul:first");
        var lineHeight = oLi.find("li:first").height();
        oLi.css({ "margin-top": - lineHeight + "px" }).find("li:last").show().prependTo(oLi);
        oLi.animate({
                "margin-top": "0px"
        }, speed)
}