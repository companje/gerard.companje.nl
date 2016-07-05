var url = "https://goo.gl/photos/CjrFuCNGhCoQnC2YA";
// var url = "cache.txt";

$.getJSON("photos-api.php?url=" + url, function(data) {
  var photos = data.photos;

  $.each(photos,function(index,photo) {
    var a = document.createElement("a");
    var img = document.createElement("img");
    $(a).append(img);
    $(a).attr("data-src",photo.large);
    $(a).attr("data-width",1000);
    $(a).attr("data-height",1000);
    $(a).on("click",function() { openGallery(index,this); });
    $(img).attr("src",photo.thumb);
    $('.thumbs').append(a);
  });

  console.log(photos);
});


function openGallery(index, galleryElement) {
  var pswpElement = document.querySelectorAll('.pswp')[0];
  var items = []; // {src:'photos/01/01.jpg',w:850, h:1280} ];

  $('.thumbs').children().each(function(index,element) {
    items.push({
      src: element.getAttribute('data-src'),
      w: element.getAttribute('data-width'),
      h: element.getAttribute('data-height')
    });
  });

  var options = {
    index: index,
    showHideOpacity:true,
    galleryUID: galleryElement.getAttribute('data-pswp-uid'),

    getThumbBoundsFn: function(index) {
      var thumbnail = galleryElement.firstChild;
      var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
      var rect = thumbnail.getBoundingClientRect(); 
      return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
    },

    history: false,
    focus: false	
  };

  var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
  gallery.init();
};

