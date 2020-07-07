class getCosmetic{
    constructor(){
        this.$ul = $(".cosmetic-down");
        this.url = "http://localhost/projectTest/dist/libs/data/cosmetic.json";
        this.getData()
    }
    getData(){
        var that = this;
        $.getJSON(this.url,function(data){
            that.cosmeticList(data);
        })
    }
    cosmeticList(data){
        let str = "";
        // console.log(data.length);
        for(var i=0;i < data.length;i++){
            str += `
                        <li class="cosmetic-msg"><img src="${data[i].img}"><p class="introduce">${data[i].introduce}</p><p class="price"><span>￥ ${data[i].price}</span></p><p class="assess"><span class="iconfont icon-star"></span><span class="iconfont icon-star"></span><span class="iconfont icon-star"></span><span class="iconfont icon-star"></span><span class="iconfont icon-star"></span>${data[i].assess}</p></li> 
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
new getCosmetic;