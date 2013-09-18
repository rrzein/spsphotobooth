App.Views.EmailReturn = Backbone.View.extend({
  
  initialize: function() {
    this.timeout();
  },

  template: JST['email/return'],

  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this; 
  },

  timeout: function() {
    window.setTimeout(function() {
      window.location.replace('/session/new');
    }, 45000);
  },
})