App.Views.Root = Backbone.View.extend({

  template: JST['root/root'],

  events: {
    "click .logout": "logoutFBUser",
    "click .more": "appendDivs",
    "click .photo": "sharePhoto",
    "keypress .caption": "enterCaption"
  },

  render: function() {
    var renderedContent = this.template({user: this.model});
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

  enterCaption: function(e) {
    if (e.which == 13 || e.keyCode == 13) {
      this.captionText = $('.caption').val();
      this.switchStatus('.caption-input', '.posting');
      this.submitFacebook();
      return false;
    }
    return true;
  },

  sharePhoto: function(e) {
    e.preventDefault();
    $('.selected').toggleClass('selected');
    $(e.target).closest(".photo").toggleClass("selected");
    var that = this;
    this.photoID = $(e.target).closest('.photo').data('id');
    this.captionShow();
    return true;
  },

  submitFacebook: function() {
    var that = this;
    var photo = App.Store.photos.get(this.photoID);
    var params = {};
    var msg = this.captionText;
    var url = '/me/spsphotobooth:take' +
      '?portrait=http://alexhimel.com/jsphotos/index.php' +
      '&fb:explicitly_shared=1' +
      '&image[0][user_generated]=true' +
      '&image[0][url]='+photo.get('url');
    if (msg) {
      url += '&message=' + encodeURIComponent(msg);
    }
    FB.api(url, 'post', params, function(response) {
      if (!response || response.error) {
        that.switchStatus('.posting', '.post-failed');
        that.sendEmail();
      } else {
        that.switchStatus('.posting', '.post-success');
        that.sendEmail();
        App.Store.Router.navigate("/exit", {trigger: true});
      }
    });
  },

  sendEmail: function() {
    var that = this;
    var data = {images: this.photoID};
    $.ajax({
      url: "/email",
      data: data,
      type: "POST",
      success: function(res) {
        App.Store.Router.navigate("/emailExit", {trigger: true})
      },
    });
  },

  logoutFBUser: function(e) {
    var that = this;
    e.preventDefault();
    FB.getLoginStatus(function(response) {
      if (response.authResponse) {
        FB.logout(function(response) {
          that.logout();
        });
      };
    });
  },

  logout: function() {
    $.ajax({
      url:"/session",
      type: "DELETE",
      success: function() {
        App.Store.Router.navigate("/session/new", {trigger: true});
      }
    })
  },

  flashText: function(selector) {
    $(selector).css(
      {
        display: "block",
        opacity: ".8", 
      }).animate({opacity: ".05"}, 10)
        .animate({opacity: "1"}, 200);
  },

  captionShow: function() {
    this.flashText('.caption-input');
  },

  postingFlash: function() {
    this.flashText('.posting');
  },

  switchStatus: function(oldStatusSelector, newStatusSelector) {
    $(oldStatusSelector).css({display: "none"});
    this.flashText(newStatusSelector);
  },

});