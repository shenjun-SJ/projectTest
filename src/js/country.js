class getCountry{
    constructor(){
        this.$address = $(".address");
        this.$country = $(".country");
        this.$head = $(".header-top");
        this.url = "http://localhost/projectTest/dist/libs/data/country.json";
        this.getData()
    }
    getData(){
        var that = this;
        $.getJSON(this.url,function(data){
            that.countryList(data);
        })
    }
    countryList(data){
        let str = "";
        // console.log(data.length);
        for(var i=0;i < data.length;i++){
            str += `
                        <li class="nature"><img src="${data[i].img}">${data[i].name}<span>${data[i].currency}</span></li> 
                   `
        }
        str = "<ul class='country-list'>"+str+"</ul>";
        this.$address.append(str);
    }
}
new getCountry;
$(".address").mouseenter(function(){
    $(".country-list").stop().animate({height:"815px"},1000).css({"box-shadow":"0 0 3px 1px grey"})
})
$(".address").mouseleave(function(){
    $(".country-list").stop().animate({height:0,},0).css({"box-shadow":"0 0 0 0 grey"})
})