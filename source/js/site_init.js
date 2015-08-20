$(function(){

    var siteInit = new SiteInit({
        "contentArea" : ".article-body",
        "searchButton" : ".toggle-search",
        "searchArea" : ".site-search"
    });

});

var SiteInit = function(){

    this.init.apply(this, arguments)

};

SiteInit.prototype = {

    init : function(args){
        var _self = this;
        var _animationRate = 300;
        this.setObject(args);
        this.imageWrapper();
        this.imageFancybox();
        this.initSearchArea();
        this.clickSearchBtn(_self, _animationRate);
    },
    setObject : function(args){
        this.$contentArea = $(args.contentArea);
        this.$searchButton = $(args.searchButton);
        this.$searchArea = $(args.searchArea);
    },
    imageWrapper : function(){
        this.$contentArea.each(function(){
            $(this).find('img').each(function(){
                var $img = $(this),
                    imgAlt = this.alt,
                    imgSrc = this.src,
                    $imgWrap,
                    $imgCaption;
                if( imgAlt ){
                    $imgCaption = $('<span>', {
                        "class" : "caption",
                        "text" : imgAlt
                    });
                    $img.after($imgCaption);
                }
                $imgWrap = $('<a>', {
                    "class" : "img-wrap",
                    "href" : imgSrc
                });
                $img.wrap($imgWrap);
            });
        });
    },
    imageFancybox : function(){
        if( ! $.fancybox ){
            return false;
        }else{
            this.$contentArea.each(function(i){
                $(this).find('.img-wrap').each(function(){
                    $(this).attr('rel', 'image' + i);
                });
            });
            $('.img-wrap').fancybox();
        }
    },
    initSearchArea : function(){
        this.$searchArea.find('input[type="search"]').attr('type', 'text');
    },
    clickSearchBtn : function(_self, _animationRate){
        this.$searchButton.click(function(e){
            e.preventDefault();
            _self.$searchArea.toggleClass('active');
        });
    }

};