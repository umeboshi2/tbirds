var MessageChannel, MessageView, MessagesApp, MessagesView;

import {
  Radio
} from 'backbone';

import {
  View,
  CollectionView
} from 'backbone.marionette';

import {
  App
} from 'marionette.toolkit';

import tc from 'teacup';

import message_box from './templates/message-box';

MessageChannel = Radio.channel('messages');

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
  initialize() {
    var view;
    this.collection = MessageChannel.request('messages');
    view = new MessagesView({
      collection: this.collection
    });
    return this.showView(view);
  }

};

export default MessagesApp;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGttZXNzYWdlcy9pbmRleC5qcyIsInNvdXJjZXMiOlsidGttZXNzYWdlcy9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxjQUFBLEVBQUEsV0FBQSxFQUFBLFdBQUEsRUFBQTs7QUFBQSxPQUFBO0VBQVMsS0FBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLElBQVQ7RUFBZSxjQUFmO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsR0FBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxFQUFQLE1BQUE7O0FBQ0EsT0FBTyxXQUFQLE1BQUE7O0FBRUEsY0FBQSxHQUFpQixLQUFLLENBQUMsT0FBTixDQUFjLFVBQWQ7O0FBRWpCLE9BQUE7O0FBRU07RUFBTixNQUFBLFlBQUEsUUFBMEIsS0FBMUI7SUFVRSxlQUFpQixDQUFBLENBQUE7YUFDZixjQUFjLENBQUMsT0FBZixDQUF1QixnQkFBdkIsRUFBeUMsSUFBQyxDQUFBLEtBQTFDO0lBRGU7O0VBVm5COzt3QkFDRSxRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO0lBQ3RCLElBQUcsT0FBTyxLQUFLLENBQUMsT0FBYixLQUF3QixVQUEzQjthQUNFLEtBQUssQ0FBQyxPQUFOLENBQWMsS0FBZCxFQURGO0tBQUEsTUFBQTthQUdFLFdBQUEsQ0FBWSxLQUFaLEVBSEY7O0VBRHNCLENBQWQ7O3dCQUtWLEVBQUEsR0FDRTtJQUFBLFlBQUEsRUFBYztFQUFkOzt3QkFDRixNQUFBLEdBQ0U7SUFBQSx3QkFBQSxFQUEwQjtFQUExQjs7Ozs7O0FBSUU7RUFBTixNQUFBLGFBQUEsUUFBMkIsZUFBM0IsQ0FBQTs7eUJBQ0UsU0FBQSxHQUFXOzs7Ozs7QUFFUCxjQUFOLE1BQUEsWUFBQSxRQUEwQixJQUExQjtFQUNFLFVBQVksQ0FBQSxDQUFBO0FBQ2QsUUFBQTtJQUFJLElBQUMsQ0FBQSxVQUFELEdBQWMsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsVUFBdkI7SUFDZCxJQUFBLEdBQU8sSUFBSSxZQUFKLENBQ0w7TUFBQSxVQUFBLEVBQVksSUFBQyxDQUFBO0lBQWIsQ0FESztXQUVQLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBVjtFQUpVOztBQURkOztBQU9BLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJhZGlvIH0gZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgeyBWaWV3LCBDb2xsZWN0aW9uVmlldyB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgeyBBcHAgfSBmcm9tICdtYXJpb25ldHRlLnRvb2xraXQnXG5pbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuaW1wb3J0IG1lc3NhZ2VfYm94IGZyb20gJy4vdGVtcGxhdGVzL21lc3NhZ2UtYm94J1xuXG5NZXNzYWdlQ2hhbm5lbCA9IFJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG5pbXBvcnQgJy4vZGJjaGFubmVsJ1xuXG5jbGFzcyBNZXNzYWdlVmlldyBleHRlbmRzIFZpZXdcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICAgIGlmIHR5cGVvZiBtb2RlbC5jb250ZW50IGlzICdmdW5jdGlvbidcbiAgICAgIG1vZGVsLmNvbnRlbnQgbW9kZWxcbiAgICBlbHNlXG4gICAgICBtZXNzYWdlX2JveCBtb2RlbFxuICB1aTpcbiAgICBjbG9zZV9idXR0b246ICdidXR0b24uY2xvc2UnXG4gIGV2ZW50czpcbiAgICAnY2xpY2sgQHVpLmNsb3NlX2J1dHRvbic6ICdkZXN0cm95X21lc3NhZ2UnXG4gIGRlc3Ryb3lfbWVzc2FnZTogLT5cbiAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICdkZWxldGUtbWVzc2FnZScsIEBtb2RlbFxuICAgIFxuY2xhc3MgTWVzc2FnZXNWaWV3IGV4dGVuZHMgQ29sbGVjdGlvblZpZXdcbiAgY2hpbGRWaWV3OiBNZXNzYWdlVmlld1xuXG5jbGFzcyBNZXNzYWdlc0FwcCBleHRlbmRzIEFwcFxuICBpbml0aWFsaXplOiAtPlxuICAgIEBjb2xsZWN0aW9uID0gTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnbWVzc2FnZXMnXG4gICAgdmlldyA9IG5ldyBNZXNzYWdlc1ZpZXdcbiAgICAgIGNvbGxlY3Rpb246IEBjb2xsZWN0aW9uXG4gICAgQHNob3dWaWV3IHZpZXdcbiAgICBcbmV4cG9ydCBkZWZhdWx0IE1lc3NhZ2VzQXBwXG4gIFxuXG4iXX0=
