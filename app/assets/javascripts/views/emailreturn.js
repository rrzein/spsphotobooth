App.Views.EmailReturn = Backbone.View.extend({
  template: JST['email/return'],

  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this; 
  },
})