$(".user .msg,.user .icon-dengluyonghu").click(function(){
    location.href = "http://localhost/projectTest/dist/pages/login.html"
})
var gm = JSON.parse(localStorage.getItem("goodsMsg"));
if(gm.length!==0){
    $(".user .icon-gouwuche").click(function(){
        location.href = "http://localhost/projectTest/dist/pages/shoppingCart.html"
    })
}

class user{
    constructor(){
        this.msg = $(".user .msg");
        this.logout = $("#logout");
        this.init();
        this.addEvent();
    }
    init(){
        this.mStr = $.cookie("login") ? $.cookie('login') : '';
        this.mObj = this.convertCookieStrToCookieObj(this.mStr);
        for(var i in this.mObj){
             if(i){
                this.msg.html(i);
            }
        }
    }
    convertCookieStrToCookieObj(str){
        if(!str){
            return {};
        }
        return JSON.parse(str);
    }
    addEvent(){
        var that = this;
        this.logout.click(function(){
            $.removeCookie('login',{expires : 7,path : '/'})
            location.reload();
        })
    }
}
new user;