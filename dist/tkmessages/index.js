var MainChannel, MessageChannel, MessageView, MessagesApp, MessagesView;

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGttZXNzYWdlcy9pbmRleC5qcyIsInNvdXJjZXMiOlsidGttZXNzYWdlcy9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxXQUFBLEVBQUEsY0FBQSxFQUFBLFdBQUEsRUFBQSxXQUFBLEVBQUE7O0FBQUEsT0FBTyxRQUFQLE1BQUE7O0FBQ0EsT0FBTyxVQUFQLE1BQUE7O0FBQ0EsT0FBTyxPQUFQLE1BQUE7O0FBQ0EsT0FBTyxFQUFQLE1BQUE7O0FBQ0EsT0FBTyxXQUFQLE1BQUE7O0FBRUEsSUFBRyxpQkFBSDtFQUNFLE9BQUEsQ0FBUSw0QkFBUixFQURGOzs7QUFHQSxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCOztBQUVqQixPQUFBOztBQUVNO0VBQU4sTUFBQSxZQUFBLFFBQTBCLFVBQVUsQ0FBQyxLQUFyQztJQVVFLGVBQWlCLENBQUEsQ0FBQTthQUNmLGNBQWMsQ0FBQyxPQUFmLENBQXVCLGdCQUF2QixFQUF5QyxJQUFDLENBQUEsS0FBMUM7SUFEZTs7RUFWbkI7O3dCQUNFLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxLQUFELENBQUE7SUFDdEIsSUFBRyxPQUFPLEtBQUssQ0FBQyxPQUFiLEtBQXdCLFVBQTNCO2FBQ0UsS0FBSyxDQUFDLE9BQU4sQ0FBYyxLQUFkLEVBREY7S0FBQSxNQUFBO2FBR0UsV0FBQSxDQUFZLEtBQVosRUFIRjs7RUFEc0IsQ0FBZDs7d0JBS1YsRUFBQSxHQUNFO0lBQUEsWUFBQSxFQUFjO0VBQWQ7O3dCQUNGLE1BQUEsR0FDRTtJQUFBLHdCQUFBLEVBQTBCO0VBQTFCOzs7Ozs7QUFJRTtFQUFOLE1BQUEsYUFBQSxRQUEyQixVQUFVLENBQUMsZUFBdEMsQ0FBQTs7eUJBQ0UsU0FBQSxHQUFXOzs7Ozs7QUFFUCxjQUFOLE1BQUEsWUFBQSxRQUEwQixPQUFPLENBQUMsSUFBbEM7RUFDRSxVQUFZLENBQUMsT0FBRCxDQUFBO0FBQ1YsUUFBQTtJQUFBLElBQUMsQ0FBQSxVQUFELEdBQWMsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsVUFBdkI7SUFDZCxJQUFBLEdBQU8sSUFBSSxZQUFKLENBQ0w7TUFBQSxVQUFBLEVBQVksSUFBQyxDQUFBO0lBQWIsQ0FESztXQUVQLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBVjtFQUpVOztBQURkOztBQU9BLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgVG9vbGtpdCBmcm9tICdtYXJpb25ldHRlLnRvb2xraXQnXG5pbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuaW1wb3J0IG1lc3NhZ2VfYm94IGZyb20gJy4vdGVtcGxhdGVzL21lc3NhZ2UtYm94J1xuXG5pZiBfX3VzZUNzc01vZHVsZXNfX1xuICByZXF1aXJlIFwiLi4vLi4vc2Fzcy90a21lc3NhZ2VzLnNjc3NcIlxuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5cbmltcG9ydCAnLi9kYmNoYW5uZWwnXG5cbmNsYXNzIE1lc3NhZ2VWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5WaWV3XG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICBpZiB0eXBlb2YgbW9kZWwuY29udGVudCBpcyAnZnVuY3Rpb24nXG4gICAgICBtb2RlbC5jb250ZW50IG1vZGVsXG4gICAgZWxzZVxuICAgICAgbWVzc2FnZV9ib3ggbW9kZWxcbiAgdWk6XG4gICAgY2xvc2VfYnV0dG9uOiAnYnV0dG9uLmNsb3NlJ1xuICBldmVudHM6XG4gICAgJ2NsaWNrIEB1aS5jbG9zZV9idXR0b24nOiAnZGVzdHJveV9tZXNzYWdlJ1xuICBkZXN0cm95X21lc3NhZ2U6IC0+XG4gICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnZGVsZXRlLW1lc3NhZ2UnLCBAbW9kZWxcbiAgICBcbmNsYXNzIE1lc3NhZ2VzVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuQ29sbGVjdGlvblZpZXdcbiAgY2hpbGRWaWV3OiBNZXNzYWdlVmlld1xuXG5jbGFzcyBNZXNzYWdlc0FwcCBleHRlbmRzIFRvb2xraXQuQXBwXG4gIGluaXRpYWxpemU6IChvcHRpb25zKSAtPlxuICAgIEBjb2xsZWN0aW9uID0gTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnbWVzc2FnZXMnXG4gICAgdmlldyA9IG5ldyBNZXNzYWdlc1ZpZXdcbiAgICAgIGNvbGxlY3Rpb246IEBjb2xsZWN0aW9uXG4gICAgQHNob3dWaWV3IHZpZXdcbiAgICBcbmV4cG9ydCBkZWZhdWx0IE1lc3NhZ2VzQXBwXG4gIFxuXG4iXX0=
