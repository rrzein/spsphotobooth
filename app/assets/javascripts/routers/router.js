App.Router = Backbone.Router.extend({
  initialize: function($rootEl) {
    this.$rootEl = $rootEl;
  },

  routes: {
    "": "homePage",
    "_=_": "homePage",
    "email": "emailPage",
    "exit": "returnPage",
    "emailExit": "emailReturnPage"
  },

  homePage: function() {
    var that = this;
    var user = App.Store.current_user;
    var rootPage = new App.Views.Root({model: user});
    that._swapView(rootPage);
    rootPage.appendDivs();
  },

  emailPage: function() {
    var that = this;
    var emailPage = new App.Views.Email();
    that._swapView(emailPage);
    emailPage.appendDivs();
  },

  returnPage: function() {
    var that = this;
    var returnPage = new App.Views.ReturnPage();
    that._swapView(returnPage);
  },

  emailReturnPage: function() {
    var that = this;
    var returnPage = new App.Views.EmailReturn();
    that._swapView(returnPage);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    $('#content').html(view.render().$el);
  },

});