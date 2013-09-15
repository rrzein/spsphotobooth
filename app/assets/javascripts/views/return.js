App.Views.ReturnPage = Backbone.View.extend({

  template: JST['root/return'],

  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  },

});