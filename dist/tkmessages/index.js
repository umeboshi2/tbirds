var MainChannel, MessageChannel, MessageView, MessagesApp, MessagesView;

import Backbone from 'backbone';

import {
  View,
  CollectionView
} from 'backbone.marionette';

import {
  App
} from 'marionette.toolkit';

import tc from 'teacup';

import message_box from './templates/message-box';

if (__useCssModules__) {
  require("../../sass/tkmessages.scss");
}

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

import './dbchannel';

MessageView = (function() {
  class MessageView extends View {
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
  class MessagesView extends CollectionView {};

  MessagesView.prototype.childView = MessageView;

  return MessagesView;

}).call(this);

MessagesApp = class MessagesApp extends App {
  initialize(options) {
    var view;
    this.collection = MessageChannel.request('messages');
    view = new MessagesView({
      collection: this.collection
    });
    return this.showView(view);
  }

};

export default MessagesApp;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGttZXNzYWdlcy9pbmRleC5qcyIsInNvdXJjZXMiOlsidGttZXNzYWdlcy9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxXQUFBLEVBQUEsY0FBQSxFQUFBLFdBQUEsRUFBQSxXQUFBLEVBQUE7O0FBQUEsT0FBTyxRQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLElBQVQ7RUFBZSxjQUFmO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsR0FBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxFQUFQLE1BQUE7O0FBQ0EsT0FBTyxXQUFQLE1BQUE7O0FBRUEsSUFBRyxpQkFBSDtFQUNFLE9BQUEsQ0FBUSw0QkFBUixFQURGOzs7QUFHQSxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCOztBQUVqQixPQUFBOztBQUVNO0VBQU4sTUFBQSxZQUFBLFFBQTBCLEtBQTFCO0lBVUUsZUFBaUIsQ0FBQSxDQUFBO2FBQ2YsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsZ0JBQXZCLEVBQXlDLElBQUMsQ0FBQSxLQUExQztJQURlOztFQVZuQjs7d0JBQ0UsUUFBQSxHQUFVLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLEtBQUQsQ0FBQTtJQUN0QixJQUFHLE9BQU8sS0FBSyxDQUFDLE9BQWIsS0FBd0IsVUFBM0I7YUFDRSxLQUFLLENBQUMsT0FBTixDQUFjLEtBQWQsRUFERjtLQUFBLE1BQUE7YUFHRSxXQUFBLENBQVksS0FBWixFQUhGOztFQURzQixDQUFkOzt3QkFLVixFQUFBLEdBQ0U7SUFBQSxZQUFBLEVBQWM7RUFBZDs7d0JBQ0YsTUFBQSxHQUNFO0lBQUEsd0JBQUEsRUFBMEI7RUFBMUI7Ozs7OztBQUlFO0VBQU4sTUFBQSxhQUFBLFFBQTJCLGVBQTNCLENBQUE7O3lCQUNFLFNBQUEsR0FBVzs7Ozs7O0FBRVAsY0FBTixNQUFBLFlBQUEsUUFBMEIsSUFBMUI7RUFDRSxVQUFZLENBQUMsT0FBRCxDQUFBO0FBQ1YsUUFBQTtJQUFBLElBQUMsQ0FBQSxVQUFELEdBQWMsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsVUFBdkI7SUFDZCxJQUFBLEdBQU8sSUFBSSxZQUFKLENBQ0w7TUFBQSxVQUFBLEVBQVksSUFBQyxDQUFBO0lBQWIsQ0FESztXQUVQLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBVjtFQUpVOztBQURkOztBQU9BLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCB7IFZpZXcsIENvbGxlY3Rpb25WaWV3IH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCB7IEFwcCB9IGZyb20gJ21hcmlvbmV0dGUudG9vbGtpdCdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5pbXBvcnQgbWVzc2FnZV9ib3ggZnJvbSAnLi90ZW1wbGF0ZXMvbWVzc2FnZS1ib3gnXG5cbmlmIF9fdXNlQ3NzTW9kdWxlc19fXG4gIHJlcXVpcmUgXCIuLi8uLi9zYXNzL3RrbWVzc2FnZXMuc2Nzc1wiXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdtZXNzYWdlcydcblxuaW1wb3J0ICcuL2RiY2hhbm5lbCdcblxuY2xhc3MgTWVzc2FnZVZpZXcgZXh0ZW5kcyBWaWV3XG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICBpZiB0eXBlb2YgbW9kZWwuY29udGVudCBpcyAnZnVuY3Rpb24nXG4gICAgICBtb2RlbC5jb250ZW50IG1vZGVsXG4gICAgZWxzZVxuICAgICAgbWVzc2FnZV9ib3ggbW9kZWxcbiAgdWk6XG4gICAgY2xvc2VfYnV0dG9uOiAnYnV0dG9uLmNsb3NlJ1xuICBldmVudHM6XG4gICAgJ2NsaWNrIEB1aS5jbG9zZV9idXR0b24nOiAnZGVzdHJveV9tZXNzYWdlJ1xuICBkZXN0cm95X21lc3NhZ2U6IC0+XG4gICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnZGVsZXRlLW1lc3NhZ2UnLCBAbW9kZWxcbiAgICBcbmNsYXNzIE1lc3NhZ2VzVmlldyBleHRlbmRzIENvbGxlY3Rpb25WaWV3XG4gIGNoaWxkVmlldzogTWVzc2FnZVZpZXdcblxuY2xhc3MgTWVzc2FnZXNBcHAgZXh0ZW5kcyBBcHBcbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnMpIC0+XG4gICAgQGNvbGxlY3Rpb24gPSBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICdtZXNzYWdlcydcbiAgICB2aWV3ID0gbmV3IE1lc3NhZ2VzVmlld1xuICAgICAgY29sbGVjdGlvbjogQGNvbGxlY3Rpb25cbiAgICBAc2hvd1ZpZXcgdmlld1xuICAgIFxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZXNBcHBcbiAgXG5cbiJdfQ==
