class Details{
    constructor(){
        this.cont = document.querySelector(".cont");
        this.url = "http://localhost/projectTest/dist/libs/data/goodsList.json";
        this.load();
        this.getId();
    }
    getId(){
        this.id = location.search.slice(1).split("=")[1];
    }
    load(){
        var that = this;
        $.getJSON(this.url,function(data){
            that.display(data);
            that.data = data;
        })
    }
    display(data){
        data.forEach(val => {
            if(val.goodId === this.id){
                this.cont.innerHTML = `
                <div class="magnifier">
                    <div class="s_box">
                        <img src="${val.imgs.largeImg[0]}" alt="">
                        <span></span>
                        <p class="mask"></p>
                    </div>
                    <div class="b_box">
                        <img src="${val.imgs.largeImg[0]}" alt="">
                    </div>
                    <span class="clear"></span>
                    <ul class="sList">
                        ${this.createLi(val.imgs.smallImg)}
                    </ul>
                </div>
                <div class="goodsMsg">
                    <p class="brand">${val.brand}</p>
                    <h3>${val.title}</h3>
                    <p>￥${val.price}</p>
                    <p>价格已包含税费，无需另付税费</p>
                    <div class="content">净含量
                        <select>${val.content}
                            <option>${val.content}</option>
                        </select>
                    </div>
                    <p class="address">送达<i>免运费</i><span>2 - 5 天 配送自 ${val.country[0]}  </span></p>
                    <p class="num">数量<span class="iconfont icon-jian"></span><strong>1</strong><span class="iconfont icon-jia"></p>
                    <p class="sum">总价<span>￥${val.price}</span></p>
                    <div>
                        <em class="intocar">加入购物车</em>
                        <a href="http://localhost/projectTest/dist/pages/shoppingCart.html"><em class="buy">立即购买</em></a>
                    </div>
                </div>`;
                new Large(val.imgs);
                this.addEvent();
            }
        });
    }
    createLi(arr){
        let str = "";
        for(let i=0;i<arr.length;i++){
            str += `<li><img src="${arr[i]}" alt=""></li>`
        }
        return str;
    }
    addEvent(){
        var that = this;
        this.cont.onclick = function(eve){
            var e = eve || window.event;
            var tar = e.target || e.srcElement;
            if(tar.className === "intocar"){
                that.goodId = that.id;
                that.setData();
            }
        }
    }
    setData(){
        var gm = localStorage.getItem("goodsMsg");
        // console.log(gm);
        if(gm === null){
            gm = [{
                goodId:this.goodId,
                num:1,
                msg:this.getData(this.goodId)
            }];
        }else{
            gm = JSON.parse(gm);
            var a = 0;
            for(var i=0;i<gm.length;i++){
                if(gm[i].goodId === this.goodId){
                    gm[i].num++;
                    a = 1;
                    break;
                }
            }
            if(a == 0){
                gm.push({
                    goodId:this.goodId,
                    num:1,
                    msg:this.getData(this.goodId)
                })
            }
        }
        localStorage.setItem("goodsMsg",JSON.stringify(gm));
    }
    getData(id){
        for(var i=0;i<this.data.length;i++){
            if(this.data[i].goodId === id){
                return this.data[i];
            }
        }
        return {};
    }
}
var d = new Details;
// d.addEvent();

class Large{
    constructor(imgData){
        this.sBox = document.querySelector(".s_box");
        this.sImg = document.querySelector(".s_box img");
        this.sSpan = document.querySelector(".s_box span");
        this.bBox = document.querySelector(".b_box");
        this.bImg = document.querySelector(".b_box img");
        this.li = document.querySelectorAll(".sList li");
        this.imgData = imgData;
        this.addEvent();
    }
    addEvent(){
        var that = this;
        this.sBox.onmouseover = function(){
            that.over();
        }
        this.sBox.onmousemove = function(eve){
            var e = eve || window.event;
            that.move(e);
        }
        this.sBox.onmouseout = function(){
            that.out();
        }
        for(let i=0;i<this.li.length;i++){
            this.li[i].onclick = function(){
                that.sImg.src = that.imgData.largeImg[i];
                that.bImg.src = that.imgData.largeImg[i];
            }
        }
    }
    over(){
        this.sSpan.style.display = "block";
        this.bBox.style.display = "block";
    }
    move(e){
        var l = e.offsetX - this.sSpan.offsetWidth/2;
        var t = e.offsetY - this.sSpan.offsetHeight/2;
        if(l<0) l=0;
        if(t<0) t=0;
        if(l > this.sBox.offsetWidth - this.sSpan.offsetWidth){
            l = this.sBox.offsetWidth - this.sSpan.offsetWidth;
        }
        if(t > this.sBox.offsetHeight - this.sSpan.offsetHeight){
            t = this.sBox.offsetHeight - this.sSpan.offsetHeight;
        }
        this.sSpan.style.left = l + "px";
        this.sSpan.style.top = t + "px";
        var x = l / (this.sBox.offsetWidth - this.sSpan.offsetWidth);
        var y = t / (this.sBox.offsetHeight - this.sSpan.offsetHeight);
        this.bImg.style.left = (this.bBox.offsetWidth - this.bImg.offsetWidth) * x + "px";
        this.bImg.style.top = (this.bBox.offsetHeight - this.bImg.offsetHeight) * y + "px";
    }
    out(){
        this.sSpan.style.display = "none";
        this.bBox.style.display = "none";
    }
}

