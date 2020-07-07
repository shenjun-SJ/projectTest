class getSelfSupport{
    constructor(){
        this.$ul = $(".self-support-down");
        this.url = "http://localhost/projectTest/dist/libs/data/selfSupport.json";
        this.getData()
    }
    getData(){
        var that = this;
        $.getJSON(this.url,function(data){
            that.SelfSupportList(data);
        })
    }
    SelfSupportList(data){
        let str = "";
        for(var i=0;i < data.length;i++){
            str += `
                        <li class="selfSupport-msg"><img src="${data[i].img}"><p class="introduce">${data[i].introduce}</p><p class="price"><span>￥ ${data[i].price}</span></p><p class="assess"><span class="iconfont icon-star"></span><span class="iconfont icon-star"></span><span class="iconfont icon-star"></span><span class="iconfont icon-star"></span><span class="iconfont icon-star"></span>${data[i].assess}</p></li> 
                `
        }
        this.$ul.append(str);
        $(".introduce").each(function(){
        var len=$(this).text().length;  
        if(len>30){
            var s="";
            s=$(this).text().substring(0,28)+"..."; 
            $(this).html(s);    
        }
        });
    }
}
new getSelfSupport;