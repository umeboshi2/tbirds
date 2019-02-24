var MainChannel, MessageChannel, MessageView, MessagesApp, MessagesView;

import Backbone from 'backbone';

import {
  View,
  CollectionView
} from 'backbone.marionette';

import Toolkit from 'marionette.toolkit';

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

MessagesApp = class MessagesApp extends Toolkit.App {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGttZXNzYWdlcy9pbmRleC5qcyIsInNvdXJjZXMiOlsidGttZXNzYWdlcy9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxXQUFBLEVBQUEsY0FBQSxFQUFBLFdBQUEsRUFBQSxXQUFBLEVBQUE7O0FBQUEsT0FBTyxRQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLElBQVQ7RUFBZSxjQUFmO0NBQUEsTUFBQTs7QUFDQSxPQUFPLE9BQVAsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQTs7QUFDQSxPQUFPLFdBQVAsTUFBQTs7QUFFQSxJQUFHLGlCQUFIO0VBQ0UsT0FBQSxDQUFRLDRCQUFSLEVBREY7OztBQUdBLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsY0FBQSxHQUFpQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsVUFBdkI7O0FBRWpCLE9BQUE7O0FBRU07RUFBTixNQUFBLFlBQUEsUUFBMEIsS0FBMUI7SUFVRSxlQUFpQixDQUFBLENBQUE7YUFDZixjQUFjLENBQUMsT0FBZixDQUF1QixnQkFBdkIsRUFBeUMsSUFBQyxDQUFBLEtBQTFDO0lBRGU7O0VBVm5COzt3QkFDRSxRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO0lBQ3RCLElBQUcsT0FBTyxLQUFLLENBQUMsT0FBYixLQUF3QixVQUEzQjthQUNFLEtBQUssQ0FBQyxPQUFOLENBQWMsS0FBZCxFQURGO0tBQUEsTUFBQTthQUdFLFdBQUEsQ0FBWSxLQUFaLEVBSEY7O0VBRHNCLENBQWQ7O3dCQUtWLEVBQUEsR0FDRTtJQUFBLFlBQUEsRUFBYztFQUFkOzt3QkFDRixNQUFBLEdBQ0U7SUFBQSx3QkFBQSxFQUEwQjtFQUExQjs7Ozs7O0FBSUU7RUFBTixNQUFBLGFBQUEsUUFBMkIsZUFBM0IsQ0FBQTs7eUJBQ0UsU0FBQSxHQUFXOzs7Ozs7QUFFUCxjQUFOLE1BQUEsWUFBQSxRQUEwQixPQUFPLENBQUMsSUFBbEM7RUFDRSxVQUFZLENBQUMsT0FBRCxDQUFBO0FBQ1YsUUFBQTtJQUFBLElBQUMsQ0FBQSxVQUFELEdBQWMsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsVUFBdkI7SUFDZCxJQUFBLEdBQU8sSUFBSSxZQUFKLENBQ0w7TUFBQSxVQUFBLEVBQVksSUFBQyxDQUFBO0lBQWIsQ0FESztXQUVQLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBVjtFQUpVOztBQURkOztBQU9BLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCB7IFZpZXcsIENvbGxlY3Rpb25WaWV3IH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCBUb29sa2l0IGZyb20gJ21hcmlvbmV0dGUudG9vbGtpdCdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5pbXBvcnQgbWVzc2FnZV9ib3ggZnJvbSAnLi90ZW1wbGF0ZXMvbWVzc2FnZS1ib3gnXG5cbmlmIF9fdXNlQ3NzTW9kdWxlc19fXG4gIHJlcXVpcmUgXCIuLi8uLi9zYXNzL3RrbWVzc2FnZXMuc2Nzc1wiXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdtZXNzYWdlcydcblxuaW1wb3J0ICcuL2RiY2hhbm5lbCdcblxuY2xhc3MgTWVzc2FnZVZpZXcgZXh0ZW5kcyBWaWV3XG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICBpZiB0eXBlb2YgbW9kZWwuY29udGVudCBpcyAnZnVuY3Rpb24nXG4gICAgICBtb2RlbC5jb250ZW50IG1vZGVsXG4gICAgZWxzZVxuICAgICAgbWVzc2FnZV9ib3ggbW9kZWxcbiAgdWk6XG4gICAgY2xvc2VfYnV0dG9uOiAnYnV0dG9uLmNsb3NlJ1xuICBldmVudHM6XG4gICAgJ2NsaWNrIEB1aS5jbG9zZV9idXR0b24nOiAnZGVzdHJveV9tZXNzYWdlJ1xuICBkZXN0cm95X21lc3NhZ2U6IC0+XG4gICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnZGVsZXRlLW1lc3NhZ2UnLCBAbW9kZWxcbiAgICBcbmNsYXNzIE1lc3NhZ2VzVmlldyBleHRlbmRzIENvbGxlY3Rpb25WaWV3XG4gIGNoaWxkVmlldzogTWVzc2FnZVZpZXdcblxuY2xhc3MgTWVzc2FnZXNBcHAgZXh0ZW5kcyBUb29sa2l0LkFwcFxuICBpbml0aWFsaXplOiAob3B0aW9ucykgLT5cbiAgICBAY29sbGVjdGlvbiA9IE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ21lc3NhZ2VzJ1xuICAgIHZpZXcgPSBuZXcgTWVzc2FnZXNWaWV3XG4gICAgICBjb2xsZWN0aW9uOiBAY29sbGVjdGlvblxuICAgIEBzaG93VmlldyB2aWV3XG4gICAgXG5leHBvcnQgZGVmYXVsdCBNZXNzYWdlc0FwcFxuICBcblxuIl19
