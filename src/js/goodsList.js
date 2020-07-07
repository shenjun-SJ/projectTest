class List{
    constructor(){
        this.url = "http://localhost/projectTest/dist/libs/data/goodsList.json";
        this.$goods = $("main .goods");
        this.$i = $("main .goods .order .account i")
        this.load();
    }
    load(){
        var that = this;
        $.getJSON(this.url,function(data){
            that.display(data)
            that.$i.last().html(data.length);
        })
    }
    display(data){
        let str = "";
        for(var i=0;i<data.length;i++){
            str += `<div class="wGoods" index="${data[i].goodId}">
                        <a href="http://localhost/projectTest/dist/pages/goodDetail.html?id=${data[i].goodId}">
                            <img class="img1" src="${data[i].imgs.largeImg[0]}" alt="">
                            <div><img class="img2" src="${data[i].country[1]}" alt=""><span>${data[i].brand}</span></div>
                            <p>${data[i].title}</p>
                            <h3>￥${data[i].price}</h3>
                        </a>
                        <p class="assess"><span class="iconfont icon-star"></span><span class="iconfont icon-star"></span><span class="iconfont icon-star"></span><span class="iconfont icon-star"></span><span class="iconfont icon-star"></span>${data[i].assess}
                    </div>`
        }
        this.$goods.append(str);
    }
}
new List;