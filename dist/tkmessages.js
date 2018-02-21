var Backbone, MainChannel, Marionette, MessageChannel, MessageView, MessagesApp, MessagesView, Toolkit, message_box, tc;

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
  return tc.div(`.alert.alert-${lvl}`, function() {
    var iclass;
    tc.button('.close', {
      type: 'button',
      'aria-hidden': true
    }, function() {
      return tc.raw('&times;');
    });
    if (msg.icon) {
      if (msg.icon.startsWith('fa-')) {
        iclass = `.fa.${msg.icon}`;
      } else {
        iclass = `.glyphicon.glyphicon-${msg.icon}`;
      }
      tc.span(iclass);
      tc.raw('&nbsp;&nbsp');
    }
    return tc.text(msg.content);
  });
});

MessageView = (function() {
  class MessageView extends Marionette.View {
    destroy_message() {
      return MessageChannel.request('delete-message', this.model);
    }

  };

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

  return MessageView;

}).call(this);

MessagesView = (function() {
  class MessagesView extends Marionette.CollectionView {};

  MessagesView.prototype.childView = MessageView;

  return MessagesView;

}).call(this);

MessagesApp = class MessagesApp extends Toolkit.App {
  onBeforeStart() {
    this.collection = MessageChannel.request('messages');
    return this.setRegion(this.options.parentApp.getView().getRegion('messages'));
  }

  onStart() {
    return this.initPage();
  }

  initPage() {
    var view;
    view = new MessagesView({
      collection: this.collection
    });
    return this.showView(view);
  }

};

module.exports = MessagesApp;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGttZXNzYWdlcy5qcyIsInNvdXJjZXMiOlsidGttZXNzYWdlcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxRQUFBLEVBQUEsV0FBQSxFQUFBLFVBQUEsRUFBQSxjQUFBLEVBQUEsV0FBQSxFQUFBLFdBQUEsRUFBQSxZQUFBLEVBQUEsT0FBQSxFQUFBLFdBQUEsRUFBQTs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFDYixPQUFBLEdBQVUsT0FBQSxDQUFRLG9CQUFSOztBQUNWLEVBQUEsR0FBSyxPQUFBLENBQVEsUUFBUjs7QUFFTCxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCOztBQUVqQixPQUFBLENBQVEsWUFBUjs7QUFFQSxXQUFBLEdBQWMsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsR0FBRCxDQUFBO0FBQzFCLE1BQUE7RUFBQSxHQUFBLEdBQU0sR0FBRyxDQUFDO0VBQ1YsSUFBRyxHQUFBLEtBQU8sT0FBVjtJQUNFLEdBQUEsR0FBTSxTQURSOztTQUVBLEVBQUUsQ0FBQyxHQUFILENBQU8sQ0FBQSxhQUFBLENBQUEsQ0FBZ0IsR0FBaEIsQ0FBQSxDQUFQLEVBQThCLFFBQUEsQ0FBQSxDQUFBO0FBQzVCLFFBQUE7SUFBQSxFQUFFLENBQUMsTUFBSCxDQUFVLFFBQVYsRUFBb0I7TUFBQSxJQUFBLEVBQUssUUFBTDtNQUFlLGFBQUEsRUFBZTtJQUE5QixDQUFwQixFQUF3RCxRQUFBLENBQUEsQ0FBQTthQUN0RCxFQUFFLENBQUMsR0FBSCxDQUFPLFNBQVA7SUFEc0QsQ0FBeEQ7SUFFQSxJQUFHLEdBQUcsQ0FBQyxJQUFQO01BQ0UsSUFBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVQsQ0FBb0IsS0FBcEIsQ0FBSDtRQUNFLE1BQUEsR0FBUyxDQUFBLElBQUEsQ0FBQSxDQUFPLEdBQUcsQ0FBQyxJQUFYLENBQUEsRUFEWDtPQUFBLE1BQUE7UUFHRSxNQUFBLEdBQVMsQ0FBQSxxQkFBQSxDQUFBLENBQXdCLEdBQUcsQ0FBQyxJQUE1QixDQUFBLEVBSFg7O01BSUEsRUFBRSxDQUFDLElBQUgsQ0FBUSxNQUFSO01BQ0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyxhQUFQLEVBTkY7O1dBT0EsRUFBRSxDQUFDLElBQUgsQ0FBUSxHQUFHLENBQUMsT0FBWjtFQVY0QixDQUE5QjtBQUowQixDQUFkOztBQWdCUjtFQUFOLE1BQUEsWUFBQSxRQUEwQixVQUFVLENBQUMsS0FBckM7SUFVRSxlQUFpQixDQUFBLENBQUE7YUFDZixjQUFjLENBQUMsT0FBZixDQUF1QixnQkFBdkIsRUFBeUMsSUFBQyxDQUFBLEtBQTFDO0lBRGU7O0VBVm5COzt3QkFDRSxRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO0lBQ3RCLElBQUcsT0FBTyxLQUFLLENBQUMsT0FBYixLQUF3QixVQUEzQjthQUNFLEtBQUssQ0FBQyxPQUFOLENBQWMsS0FBZCxFQURGO0tBQUEsTUFBQTthQUdFLFdBQUEsQ0FBWSxLQUFaLEVBSEY7O0VBRHNCLENBQWQ7O3dCQUtWLEVBQUEsR0FDRTtJQUFBLFlBQUEsRUFBYztFQUFkOzt3QkFDRixNQUFBLEdBQ0U7SUFBQSx3QkFBQSxFQUEwQjtFQUExQjs7Ozs7O0FBSUU7RUFBTixNQUFBLGFBQUEsUUFBMkIsVUFBVSxDQUFDLGVBQXRDLENBQUE7O3lCQUNFLFNBQUEsR0FBVzs7Ozs7O0FBRVAsY0FBTixNQUFBLFlBQUEsUUFBMEIsT0FBTyxDQUFDLElBQWxDO0VBQ0UsYUFBZSxDQUFBLENBQUE7SUFDYixJQUFDLENBQUEsVUFBRCxHQUFjLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFVBQXZCO1dBQ2QsSUFBQyxDQUFBLFNBQUQsQ0FBVyxJQUFDLENBQUEsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFuQixDQUFBLENBQTRCLENBQUMsU0FBN0IsQ0FBdUMsVUFBdkMsQ0FBWDtFQUZhOztFQUlmLE9BQVMsQ0FBQSxDQUFBO1dBQ1AsSUFBQyxDQUFBLFFBQUQsQ0FBQTtFQURPOztFQUdULFFBQVUsQ0FBQSxDQUFBO0FBQ1IsUUFBQTtJQUFBLElBQUEsR0FBTyxJQUFJLFlBQUosQ0FDTDtNQUFBLFVBQUEsRUFBWSxJQUFDLENBQUE7SUFBYixDQURLO1dBRVAsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFWO0VBSFE7O0FBUlo7O0FBYUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJCYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5Ub29sa2l0ID0gcmVxdWlyZSAnbWFyaW9uZXR0ZS50b29sa2l0J1xudGMgPSByZXF1aXJlICd0ZWFjdXAnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdtZXNzYWdlcydcblxucmVxdWlyZSAnLi9tZXNzYWdlcydcblxubWVzc2FnZV9ib3ggPSB0Yy5yZW5kZXJhYmxlIChtc2cpIC0+XG4gIGx2bCA9IG1zZy5sZXZlbFxuICBpZiBsdmwgPT0gJ2Vycm9yJ1xuICAgIGx2bCA9ICdkYW5nZXInXG4gIHRjLmRpdiBcIi5hbGVydC5hbGVydC0je2x2bH1cIiwgLT5cbiAgICB0Yy5idXR0b24gJy5jbG9zZScsIHR5cGU6J2J1dHRvbicsICdhcmlhLWhpZGRlbic6IHRydWUsIC0+XG4gICAgICB0Yy5yYXcgJyZ0aW1lczsnXG4gICAgaWYgbXNnLmljb25cbiAgICAgIGlmIG1zZy5pY29uLnN0YXJ0c1dpdGggJ2ZhLSdcbiAgICAgICAgaWNsYXNzID0gXCIuZmEuI3ttc2cuaWNvbn1cIlxuICAgICAgZWxzZVxuICAgICAgICBpY2xhc3MgPSBcIi5nbHlwaGljb24uZ2x5cGhpY29uLSN7bXNnLmljb259XCJcbiAgICAgIHRjLnNwYW4gaWNsYXNzXG4gICAgICB0Yy5yYXcgJyZuYnNwOyZuYnNwJ1xuICAgIHRjLnRleHQgbXNnLmNvbnRlbnRcbiAgICBcbmNsYXNzIE1lc3NhZ2VWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5WaWV3XG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICBpZiB0eXBlb2YgbW9kZWwuY29udGVudCBpcyAnZnVuY3Rpb24nXG4gICAgICBtb2RlbC5jb250ZW50IG1vZGVsXG4gICAgZWxzZVxuICAgICAgbWVzc2FnZV9ib3ggbW9kZWxcbiAgdWk6XG4gICAgY2xvc2VfYnV0dG9uOiAnYnV0dG9uLmNsb3NlJ1xuICBldmVudHM6XG4gICAgJ2NsaWNrIEB1aS5jbG9zZV9idXR0b24nOiAnZGVzdHJveV9tZXNzYWdlJ1xuICBkZXN0cm95X21lc3NhZ2U6IC0+XG4gICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnZGVsZXRlLW1lc3NhZ2UnLCBAbW9kZWxcbiAgICBcbmNsYXNzIE1lc3NhZ2VzVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuQ29sbGVjdGlvblZpZXdcbiAgY2hpbGRWaWV3OiBNZXNzYWdlVmlld1xuXG5jbGFzcyBNZXNzYWdlc0FwcCBleHRlbmRzIFRvb2xraXQuQXBwXG4gIG9uQmVmb3JlU3RhcnQ6IC0+XG4gICAgQGNvbGxlY3Rpb24gPSBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICdtZXNzYWdlcydcbiAgICBAc2V0UmVnaW9uIEBvcHRpb25zLnBhcmVudEFwcC5nZXRWaWV3KCkuZ2V0UmVnaW9uICdtZXNzYWdlcydcbiAgICBcbiAgb25TdGFydDogLT5cbiAgICBAaW5pdFBhZ2UoKVxuXG4gIGluaXRQYWdlOiAtPlxuICAgIHZpZXcgPSBuZXcgTWVzc2FnZXNWaWV3XG4gICAgICBjb2xsZWN0aW9uOiBAY29sbGVjdGlvblxuICAgIEBzaG93VmlldyB2aWV3XG5cbm1vZHVsZS5leHBvcnRzID0gTWVzc2FnZXNBcHBcbiAgXG5cbiJdfQ==
