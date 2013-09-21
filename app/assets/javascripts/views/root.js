App.Views.Root = Backbone.View.extend({

  template: JST['root/root'],

  events: {
    "click .logout": "logoutFBUser",
    "click .more": "appendDivs",
    "click .photo": "sharePhoto"
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

  sharePhoto: function(e) {
    e.preventDefault();
    var photoID = $(e.target).closest('.photo').data('id');
    var photo = App.Store.photos.get(photoID);
<<<<<<< HEAD
=======

    var params = {};
    //var msg = document.getElementById('user_message').value;
    var msg = 'hello! this is a post from #facebookadweek';
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
        console.log(response.error);
      } else {
        alert('Published to stream!');
      }
    });

    /*
>>>>>>> 643d23d38c9285a083cfad5c37a8a06d0d58dc21
    FB.ui(
      {
        method: 'feed',
        name: "Facebook Portaits",
        link: photo.get('url'),
        caption: "A portrait of me.",
        description: "Taken at the Facebook event.",
        picture: photo.get('url'),
      },
      function(response) { 
        if (response && response.post_id) {
          App.Store.Router.navigate("#/exit", {trigger: true});
        };
      }
    );
<<<<<<< HEAD
=======
    */
>>>>>>> 643d23d38c9285a083cfad5c37a8a06d0d58dc21
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

});