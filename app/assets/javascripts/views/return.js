App.Views.ReturnPage = Backbone.View.extend({

  initialize: function() {
    this.timeout();
  },

  template: JST['root/return'],

  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.$el.trigger("render: success");
    return this;
  },

  timeout: function() {
    window.setTimeout(function() {
      window.location.replace('/session/new');
    }, 45000);
  },

});