App.Views.Email = Backbone.View.extend({
  
  template: JST['email/email'],

  events: {
    "click .photo": "selectPhoto",
    "click .more": "appendDivs",
    "click .sendphotos": "sendEmail",
  },

  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  },

  photoDiv: function(photo) {
    $div = $('<div>').addClass("photo").attr("data-id", photo.id);
    $img = $('<img>').attr("src", photo.get('filename'));
    $div.append($img);
    return $div;
  },

  appendDivs: function() {
    var divArr = this.threePhotoDivs();
    this.fadeInDivs(divArr);
  },

  threePhotoDivs: function() {
    var photoCount = $('.photo').length
    var photos = App.Store.photos;
    var divArr = [];
    if (photoCount) {
      for (var i = photoCount - 1; i < photoCount + 2; i++) {
        var photo = App.Store.photos.at(i);
        var $div = this.photoDiv(photo);
        divArr.push($div);
      };
    } else {
      for (var i = 0; i < 3; i++) {
        var photo = App.Store.photos.at(i);
        var $div = this.photoDiv(photo);
        divArr.push($div);
      }
    }
    return divArr;
  },

  fadeInDivs: function(divArr) {
    for (var i = 0; i < divArr.length; i++) {
      var $div = divArr[i]
      $('#photos').append($div);
      $div.hide().delay(i * 100).fadeIn(500);
    }
  },

  selectPhoto: function(e) {
    $(e.target).closest(".photo").toggleClass("selected");
  },

  getImages: function(e) {
    var that = this;
    var imagesArr = [];
    $('.selected').each(function(idx, el) {
      var id = $(this).attr('data-id');
      imagesArr.push(id);
    });

    return imagesArr;
  },

  sendEmail: function(e) {
    e.preventDefault();
    var that = this;
    var imageIds = this.getImages;
    var data = {images: imageIds};
    $.ajax({
      url: "/email",
      data: data,
      type: "POST",
      success: function(res) {
        // that.logout();
        App.Store.Router.navigate("/emailExit", {trigger: true})
      },
    });
  },

  logout: function() {
    var that = this;
    $.ajax({
      url: "/session/",
      type: "DELETE",
      success: function(res) {
        App.Store.Router.navigate("/session/new", {trigger: true});
      },
    })
  },

});