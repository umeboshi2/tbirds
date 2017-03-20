var Backbone, MainChannel, Marionette, MessageChannel, MessageView, MessagesApp, MessagesView, Toolkit, message_box, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

Toolkit = require('marionette.toolkit');

tc = require('teacup');

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

require('./messages');

message_box = tc.renderable(function(msg) {
  var lvl;
  lvl = msg.level;
  if (lvl === 'error') {
    lvl = 'danger';
  }
  return tc.div(".alert.alert-" + lvl, function() {
    tc.button('.close', {
      type: 'button',
      'aria-hidden': true
    }, function() {
      return tc.raw('&times;');
    });
    if (msg.icon) {
      tc.span(".glyphicon.glyphicon-" + msg.icon);
    }
    return tc.text(msg.content);
  });
});

MessageView = (function(superClass) {
  extend(MessageView, superClass);

  function MessageView() {
    return MessageView.__super__.constructor.apply(this, arguments);
  }

  MessageView.prototype.template = message_box;

  MessageView.prototype.ui = {
    close_button: 'button.close'
  };

  MessageView.prototype.events = {
    'click @ui.close_button': 'destroy_message'
  };

  MessageView.prototype.destroy_message = function() {
    return MessageChannel.request('delete-message', this.model);
  };

  return MessageView;

})(Marionette.View);

MessagesView = (function(superClass) {
  extend(MessagesView, superClass);

  function MessagesView() {
    return MessagesView.__super__.constructor.apply(this, arguments);
  }

  MessagesView.prototype.childView = MessageView;

  return MessagesView;

})(Marionette.CollectionView);

MessagesApp = (function(superClass) {
  extend(MessagesApp, superClass);

  function MessagesApp() {
    return MessagesApp.__super__.constructor.apply(this, arguments);
  }

  MessagesApp.prototype.onBeforeStart = function() {
    this.collection = MessageChannel.request('messages');
    return this.setRegion(this.options.parentApp.getView().getRegion('messages'));
  };

  MessagesApp.prototype.onStart = function() {
    return this.initPage();
  };

  MessagesApp.prototype.initPage = function() {
    var view;
    view = new MessagesView({
      collection: this.collection
    });
    return this.showView(view);
  };

  return MessagesApp;

})(Toolkit.App);

module.exports = MessagesApp;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGttZXNzYWdlcy5qcyIsInNvdXJjZXMiOlsidGttZXNzYWdlcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxtSEFBQTtFQUFBOzs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFDYixPQUFBLEdBQVUsT0FBQSxDQUFRLG9CQUFSOztBQUNWLEVBQUEsR0FBSyxPQUFBLENBQVEsUUFBUjs7QUFFTCxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCOztBQUVqQixPQUFBLENBQVEsWUFBUjs7QUFFQSxXQUFBLEdBQWMsRUFBRSxDQUFDLFVBQUgsQ0FBYyxTQUFDLEdBQUQ7QUFDMUIsTUFBQTtFQUFBLEdBQUEsR0FBTSxHQUFHLENBQUM7RUFDVixJQUFHLEdBQUEsS0FBTyxPQUFWO0lBQ0UsR0FBQSxHQUFNLFNBRFI7O1NBRUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyxlQUFBLEdBQWdCLEdBQXZCLEVBQThCLFNBQUE7SUFDNUIsRUFBRSxDQUFDLE1BQUgsQ0FBVSxRQUFWLEVBQW9CO01BQUEsSUFBQSxFQUFLLFFBQUw7TUFBZSxhQUFBLEVBQWUsSUFBOUI7S0FBcEIsRUFBd0QsU0FBQTthQUN0RCxFQUFFLENBQUMsR0FBSCxDQUFPLFNBQVA7SUFEc0QsQ0FBeEQ7SUFFQSxJQUFHLEdBQUcsQ0FBQyxJQUFQO01BQ0UsRUFBRSxDQUFDLElBQUgsQ0FBUSx1QkFBQSxHQUF3QixHQUFHLENBQUMsSUFBcEMsRUFERjs7V0FFQSxFQUFFLENBQUMsSUFBSCxDQUFRLEdBQUcsQ0FBQyxPQUFaO0VBTDRCLENBQTlCO0FBSjBCLENBQWQ7O0FBV1I7Ozs7Ozs7d0JBQ0osUUFBQSxHQUFVOzt3QkFDVixFQUFBLEdBQ0U7SUFBQSxZQUFBLEVBQWMsY0FBZDs7O3dCQUNGLE1BQUEsR0FDRTtJQUFBLHdCQUFBLEVBQTBCLGlCQUExQjs7O3dCQUNGLGVBQUEsR0FBaUIsU0FBQTtXQUNmLGNBQWMsQ0FBQyxPQUFmLENBQXVCLGdCQUF2QixFQUF5QyxJQUFDLENBQUEsS0FBMUM7RUFEZTs7OztHQU5PLFVBQVUsQ0FBQzs7QUFTL0I7Ozs7Ozs7eUJBQ0osU0FBQSxHQUFXOzs7O0dBRGMsVUFBVSxDQUFDOztBQUdoQzs7Ozs7Ozt3QkFDSixhQUFBLEdBQWUsU0FBQTtJQUNiLElBQUMsQ0FBQSxVQUFELEdBQWMsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsVUFBdkI7V0FDZCxJQUFDLENBQUEsU0FBRCxDQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQW5CLENBQUEsQ0FBNEIsQ0FBQyxTQUE3QixDQUF1QyxVQUF2QyxDQUFYO0VBRmE7O3dCQUlmLE9BQUEsR0FBUyxTQUFBO1dBQ1AsSUFBQyxDQUFBLFFBQUQsQ0FBQTtFQURPOzt3QkFHVCxRQUFBLEdBQVUsU0FBQTtBQUNSLFFBQUE7SUFBQSxJQUFBLEdBQU8sSUFBSSxZQUFKLENBQ0w7TUFBQSxVQUFBLEVBQVksSUFBQyxDQUFBLFVBQWI7S0FESztXQUVQLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBVjtFQUhROzs7O0dBUmMsT0FBTyxDQUFDOztBQWFsQyxNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5NYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblRvb2xraXQgPSByZXF1aXJlICdtYXJpb25ldHRlLnRvb2xraXQnXG50YyA9IHJlcXVpcmUgJ3RlYWN1cCdcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5NZXNzYWdlQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG5yZXF1aXJlICcuL21lc3NhZ2VzJ1xuXG5tZXNzYWdlX2JveCA9IHRjLnJlbmRlcmFibGUgKG1zZykgLT5cbiAgbHZsID0gbXNnLmxldmVsXG4gIGlmIGx2bCA9PSAnZXJyb3InXG4gICAgbHZsID0gJ2RhbmdlcidcbiAgdGMuZGl2IFwiLmFsZXJ0LmFsZXJ0LSN7bHZsfVwiLCAtPlxuICAgIHRjLmJ1dHRvbiAnLmNsb3NlJywgdHlwZTonYnV0dG9uJywgJ2FyaWEtaGlkZGVuJzogdHJ1ZSwgLT5cbiAgICAgIHRjLnJhdyAnJnRpbWVzOydcbiAgICBpZiBtc2cuaWNvblxuICAgICAgdGMuc3BhbiBcIi5nbHlwaGljb24uZ2x5cGhpY29uLSN7bXNnLmljb259XCJcbiAgICB0Yy50ZXh0IG1zZy5jb250ZW50XG4gICAgXG5jbGFzcyBNZXNzYWdlVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogbWVzc2FnZV9ib3hcbiAgdWk6XG4gICAgY2xvc2VfYnV0dG9uOiAnYnV0dG9uLmNsb3NlJ1xuICBldmVudHM6XG4gICAgJ2NsaWNrIEB1aS5jbG9zZV9idXR0b24nOiAnZGVzdHJveV9tZXNzYWdlJ1xuICBkZXN0cm95X21lc3NhZ2U6IC0+XG4gICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnZGVsZXRlLW1lc3NhZ2UnLCBAbW9kZWxcbiAgICBcbmNsYXNzIE1lc3NhZ2VzVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuQ29sbGVjdGlvblZpZXdcbiAgY2hpbGRWaWV3OiBNZXNzYWdlVmlld1xuXG5jbGFzcyBNZXNzYWdlc0FwcCBleHRlbmRzIFRvb2xraXQuQXBwXG4gIG9uQmVmb3JlU3RhcnQ6IC0+XG4gICAgQGNvbGxlY3Rpb24gPSBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICdtZXNzYWdlcydcbiAgICBAc2V0UmVnaW9uIEBvcHRpb25zLnBhcmVudEFwcC5nZXRWaWV3KCkuZ2V0UmVnaW9uICdtZXNzYWdlcydcbiAgICBcbiAgb25TdGFydDogLT5cbiAgICBAaW5pdFBhZ2UoKVxuXG4gIGluaXRQYWdlOiAtPlxuICAgIHZpZXcgPSBuZXcgTWVzc2FnZXNWaWV3XG4gICAgICBjb2xsZWN0aW9uOiBAY29sbGVjdGlvblxuICAgIEBzaG93VmlldyB2aWV3XG5cbm1vZHVsZS5leHBvcnRzID0gTWVzc2FnZXNBcHBcbiAgXG5cbiJdfQ==
