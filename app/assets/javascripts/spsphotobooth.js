window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Store: {},
  initialize: function() {
    App.Store.photos = new App.Collections.Photos();
    App.Store.photos.fetch({
      success: function() {
        App.Store.Router = new App.Router($('body'));
        Backbone.history.start();
      }
    });
  },

  getEmail: function() {
    $('.email').on('keypress', function(e) {
      if (e.which == 13 || e.keyCode == 13) {
        var email = $(this).val();
        App.Store.email = email;
        this.form.submit();
        return false;
      };
      return true;
    })
  },

};

$(document).ready(function(){
  App.initialize();
  App.getEmail();
});
