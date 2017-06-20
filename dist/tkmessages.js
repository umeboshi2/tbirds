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
    var iclass;
    tc.button('.close', {
      type: 'button',
      'aria-hidden': true
    }, function() {
      return tc.raw('&times;');
    });
    if (msg.icon) {
      if (msg.icon.startsWith('fa-')) {
        iclass = ".fa." + msg.icon;
      } else {
        iclass = ".glyphicon.glyphicon-" + msg.icon;
      }
      tc.span(iclass);
      tc.raw('&nbsp;&nbsp');
    }
    return tc.text(msg.content);
  });
});

MessageView = (function(superClass) {
  extend(MessageView, superClass);

  function MessageView() {
    return MessageView.__super__.constructor.apply(this, arguments);
  }

  MessageView.prototype.template = tc.renderable(function(model) {
    if (typeof model.content === 'function') {
      return model.content(model);
    } else {
      return message_box(model);
    }
  });

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGttZXNzYWdlcy5qcyIsInNvdXJjZXMiOlsidGttZXNzYWdlcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxtSEFBQTtFQUFBOzs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFDYixPQUFBLEdBQVUsT0FBQSxDQUFRLG9CQUFSOztBQUNWLEVBQUEsR0FBSyxPQUFBLENBQVEsUUFBUjs7QUFFTCxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCOztBQUVqQixPQUFBLENBQVEsWUFBUjs7QUFFQSxXQUFBLEdBQWMsRUFBRSxDQUFDLFVBQUgsQ0FBYyxTQUFDLEdBQUQ7QUFDMUIsTUFBQTtFQUFBLEdBQUEsR0FBTSxHQUFHLENBQUM7RUFDVixJQUFHLEdBQUEsS0FBTyxPQUFWO0lBQ0UsR0FBQSxHQUFNLFNBRFI7O1NBRUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyxlQUFBLEdBQWdCLEdBQXZCLEVBQThCLFNBQUE7QUFDNUIsUUFBQTtJQUFBLEVBQUUsQ0FBQyxNQUFILENBQVUsUUFBVixFQUFvQjtNQUFBLElBQUEsRUFBSyxRQUFMO01BQWUsYUFBQSxFQUFlLElBQTlCO0tBQXBCLEVBQXdELFNBQUE7YUFDdEQsRUFBRSxDQUFDLEdBQUgsQ0FBTyxTQUFQO0lBRHNELENBQXhEO0lBRUEsSUFBRyxHQUFHLENBQUMsSUFBUDtNQUNFLElBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFULENBQW9CLEtBQXBCLENBQUg7UUFDRSxNQUFBLEdBQVMsTUFBQSxHQUFPLEdBQUcsQ0FBQyxLQUR0QjtPQUFBLE1BQUE7UUFHRSxNQUFBLEdBQVMsdUJBQUEsR0FBd0IsR0FBRyxDQUFDLEtBSHZDOztNQUlBLEVBQUUsQ0FBQyxJQUFILENBQVEsTUFBUjtNQUNBLEVBQUUsQ0FBQyxHQUFILENBQU8sYUFBUCxFQU5GOztXQU9BLEVBQUUsQ0FBQyxJQUFILENBQVEsR0FBRyxDQUFDLE9BQVo7RUFWNEIsQ0FBOUI7QUFKMEIsQ0FBZDs7QUFnQlI7Ozs7Ozs7d0JBQ0osUUFBQSxHQUFVLEVBQUUsQ0FBQyxVQUFILENBQWMsU0FBQyxLQUFEO0lBQ3RCLElBQUcsT0FBTyxLQUFLLENBQUMsT0FBYixLQUF3QixVQUEzQjthQUNFLEtBQUssQ0FBQyxPQUFOLENBQWMsS0FBZCxFQURGO0tBQUEsTUFBQTthQUdFLFdBQUEsQ0FBWSxLQUFaLEVBSEY7O0VBRHNCLENBQWQ7O3dCQUtWLEVBQUEsR0FDRTtJQUFBLFlBQUEsRUFBYyxjQUFkOzs7d0JBQ0YsTUFBQSxHQUNFO0lBQUEsd0JBQUEsRUFBMEIsaUJBQTFCOzs7d0JBQ0YsZUFBQSxHQUFpQixTQUFBO1dBQ2YsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsZ0JBQXZCLEVBQXlDLElBQUMsQ0FBQSxLQUExQztFQURlOzs7O0dBVk8sVUFBVSxDQUFDOztBQWEvQjs7Ozs7Ozt5QkFDSixTQUFBLEdBQVc7Ozs7R0FEYyxVQUFVLENBQUM7O0FBR2hDOzs7Ozs7O3dCQUNKLGFBQUEsR0FBZSxTQUFBO0lBQ2IsSUFBQyxDQUFBLFVBQUQsR0FBYyxjQUFjLENBQUMsT0FBZixDQUF1QixVQUF2QjtXQUNkLElBQUMsQ0FBQSxTQUFELENBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBbkIsQ0FBQSxDQUE0QixDQUFDLFNBQTdCLENBQXVDLFVBQXZDLENBQVg7RUFGYTs7d0JBSWYsT0FBQSxHQUFTLFNBQUE7V0FDUCxJQUFDLENBQUEsUUFBRCxDQUFBO0VBRE87O3dCQUdULFFBQUEsR0FBVSxTQUFBO0FBQ1IsUUFBQTtJQUFBLElBQUEsR0FBTyxJQUFJLFlBQUosQ0FDTDtNQUFBLFVBQUEsRUFBWSxJQUFDLENBQUEsVUFBYjtLQURLO1dBRVAsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFWO0VBSFE7Ozs7R0FSYyxPQUFPLENBQUM7O0FBYWxDLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiQmFja2JvbmUgPSByZXF1aXJlICdiYWNrYm9uZSdcbk1hcmlvbmV0dGUgPSByZXF1aXJlICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuVG9vbGtpdCA9IHJlcXVpcmUgJ21hcmlvbmV0dGUudG9vbGtpdCdcbnRjID0gcmVxdWlyZSAndGVhY3VwJ1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5cbnJlcXVpcmUgJy4vbWVzc2FnZXMnXG5cbm1lc3NhZ2VfYm94ID0gdGMucmVuZGVyYWJsZSAobXNnKSAtPlxuICBsdmwgPSBtc2cubGV2ZWxcbiAgaWYgbHZsID09ICdlcnJvcidcbiAgICBsdmwgPSAnZGFuZ2VyJ1xuICB0Yy5kaXYgXCIuYWxlcnQuYWxlcnQtI3tsdmx9XCIsIC0+XG4gICAgdGMuYnV0dG9uICcuY2xvc2UnLCB0eXBlOididXR0b24nLCAnYXJpYS1oaWRkZW4nOiB0cnVlLCAtPlxuICAgICAgdGMucmF3ICcmdGltZXM7J1xuICAgIGlmIG1zZy5pY29uXG4gICAgICBpZiBtc2cuaWNvbi5zdGFydHNXaXRoICdmYS0nXG4gICAgICAgIGljbGFzcyA9IFwiLmZhLiN7bXNnLmljb259XCJcbiAgICAgIGVsc2VcbiAgICAgICAgaWNsYXNzID0gXCIuZ2x5cGhpY29uLmdseXBoaWNvbi0je21zZy5pY29ufVwiXG4gICAgICB0Yy5zcGFuIGljbGFzc1xuICAgICAgdGMucmF3ICcmbmJzcDsmbmJzcCdcbiAgICB0Yy50ZXh0IG1zZy5jb250ZW50XG4gICAgXG5jbGFzcyBNZXNzYWdlVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgaWYgdHlwZW9mIG1vZGVsLmNvbnRlbnQgaXMgJ2Z1bmN0aW9uJ1xuICAgICAgbW9kZWwuY29udGVudCBtb2RlbFxuICAgIGVsc2VcbiAgICAgIG1lc3NhZ2VfYm94IG1vZGVsXG4gIHVpOlxuICAgIGNsb3NlX2J1dHRvbjogJ2J1dHRvbi5jbG9zZSdcbiAgZXZlbnRzOlxuICAgICdjbGljayBAdWkuY2xvc2VfYnV0dG9uJzogJ2Rlc3Ryb3lfbWVzc2FnZSdcbiAgZGVzdHJveV9tZXNzYWdlOiAtPlxuICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ2RlbGV0ZS1tZXNzYWdlJywgQG1vZGVsXG4gICAgXG5jbGFzcyBNZXNzYWdlc1ZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbGxlY3Rpb25WaWV3XG4gIGNoaWxkVmlldzogTWVzc2FnZVZpZXdcblxuY2xhc3MgTWVzc2FnZXNBcHAgZXh0ZW5kcyBUb29sa2l0LkFwcFxuICBvbkJlZm9yZVN0YXJ0OiAtPlxuICAgIEBjb2xsZWN0aW9uID0gTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnbWVzc2FnZXMnXG4gICAgQHNldFJlZ2lvbiBAb3B0aW9ucy5wYXJlbnRBcHAuZ2V0VmlldygpLmdldFJlZ2lvbiAnbWVzc2FnZXMnXG4gICAgXG4gIG9uU3RhcnQ6IC0+XG4gICAgQGluaXRQYWdlKClcblxuICBpbml0UGFnZTogLT5cbiAgICB2aWV3ID0gbmV3IE1lc3NhZ2VzVmlld1xuICAgICAgY29sbGVjdGlvbjogQGNvbGxlY3Rpb25cbiAgICBAc2hvd1ZpZXcgdmlld1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1lc3NhZ2VzQXBwXG4gIFxuXG4iXX0=
