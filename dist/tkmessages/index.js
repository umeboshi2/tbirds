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

export default MessagesApp;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGttZXNzYWdlcy9pbmRleC5qcyIsInNvdXJjZXMiOlsidGttZXNzYWdlcy9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxXQUFBLEVBQUEsY0FBQSxFQUFBLFdBQUEsRUFBQSxXQUFBLEVBQUE7O0FBQUEsT0FBTyxRQUFQLE1BQUE7O0FBQ0EsT0FBTyxVQUFQLE1BQUE7O0FBQ0EsT0FBTyxPQUFQLE1BQUE7O0FBQ0EsT0FBTyxFQUFQLE1BQUE7O0FBQ0EsT0FBTyxXQUFQLE1BQUE7O0FBRUEsSUFBRyxpQkFBSDtFQUNFLE9BQUEsQ0FBUSw0QkFBUixFQURGOzs7QUFHQSxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCOztBQUVqQixPQUFBOztBQUVNO0VBQU4sTUFBQSxZQUFBLFFBQTBCLFVBQVUsQ0FBQyxLQUFyQztJQVVFLGVBQWlCLENBQUEsQ0FBQTthQUNmLGNBQWMsQ0FBQyxPQUFmLENBQXVCLGdCQUF2QixFQUF5QyxJQUFDLENBQUEsS0FBMUM7SUFEZTs7RUFWbkI7O3dCQUNFLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxLQUFELENBQUE7SUFDdEIsSUFBRyxPQUFPLEtBQUssQ0FBQyxPQUFiLEtBQXdCLFVBQTNCO2FBQ0UsS0FBSyxDQUFDLE9BQU4sQ0FBYyxLQUFkLEVBREY7S0FBQSxNQUFBO2FBR0UsV0FBQSxDQUFZLEtBQVosRUFIRjs7RUFEc0IsQ0FBZDs7d0JBS1YsRUFBQSxHQUNFO0lBQUEsWUFBQSxFQUFjO0VBQWQ7O3dCQUNGLE1BQUEsR0FDRTtJQUFBLHdCQUFBLEVBQTBCO0VBQTFCOzs7Ozs7QUFJRTtFQUFOLE1BQUEsYUFBQSxRQUEyQixVQUFVLENBQUMsZUFBdEMsQ0FBQTs7eUJBQ0UsU0FBQSxHQUFXOzs7Ozs7QUFFUCxjQUFOLE1BQUEsWUFBQSxRQUEwQixPQUFPLENBQUMsSUFBbEM7RUFDRSxhQUFlLENBQUEsQ0FBQTtJQUNiLElBQUMsQ0FBQSxVQUFELEdBQWMsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsVUFBdkI7V0FDZCxJQUFDLENBQUEsU0FBRCxDQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQW5CLENBQUEsQ0FBNEIsQ0FBQyxTQUE3QixDQUF1QyxVQUF2QyxDQUFYO0VBRmE7O0VBSWYsT0FBUyxDQUFBLENBQUE7V0FDUCxJQUFDLENBQUEsUUFBRCxDQUFBO0VBRE87O0VBR1QsUUFBVSxDQUFBLENBQUE7QUFDUixRQUFBO0lBQUEsSUFBQSxHQUFPLElBQUksWUFBSixDQUNMO01BQUEsVUFBQSxFQUFZLElBQUMsQ0FBQTtJQUFiLENBREs7V0FFUCxJQUFDLENBQUEsUUFBRCxDQUFVLElBQVY7RUFIUTs7QUFSWjs7QUFhQSxPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IFRvb2xraXQgZnJvbSAnbWFyaW9uZXR0ZS50b29sa2l0J1xuaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcbmltcG9ydCBtZXNzYWdlX2JveCBmcm9tICcuL3RlbXBsYXRlcy9tZXNzYWdlLWJveCdcblxuaWYgX191c2VDc3NNb2R1bGVzX19cbiAgcmVxdWlyZSBcIi4uLy4uL3Nhc3MvdGttZXNzYWdlcy5zY3NzXCJcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5NZXNzYWdlQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG5pbXBvcnQgJy4vZGJjaGFubmVsJ1xuXG5jbGFzcyBNZXNzYWdlVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgaWYgdHlwZW9mIG1vZGVsLmNvbnRlbnQgaXMgJ2Z1bmN0aW9uJ1xuICAgICAgbW9kZWwuY29udGVudCBtb2RlbFxuICAgIGVsc2VcbiAgICAgIG1lc3NhZ2VfYm94IG1vZGVsXG4gIHVpOlxuICAgIGNsb3NlX2J1dHRvbjogJ2J1dHRvbi5jbG9zZSdcbiAgZXZlbnRzOlxuICAgICdjbGljayBAdWkuY2xvc2VfYnV0dG9uJzogJ2Rlc3Ryb3lfbWVzc2FnZSdcbiAgZGVzdHJveV9tZXNzYWdlOiAtPlxuICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ2RlbGV0ZS1tZXNzYWdlJywgQG1vZGVsXG4gICAgXG5jbGFzcyBNZXNzYWdlc1ZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbGxlY3Rpb25WaWV3XG4gIGNoaWxkVmlldzogTWVzc2FnZVZpZXdcblxuY2xhc3MgTWVzc2FnZXNBcHAgZXh0ZW5kcyBUb29sa2l0LkFwcFxuICBvbkJlZm9yZVN0YXJ0OiAtPlxuICAgIEBjb2xsZWN0aW9uID0gTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnbWVzc2FnZXMnXG4gICAgQHNldFJlZ2lvbiBAb3B0aW9ucy5wYXJlbnRBcHAuZ2V0VmlldygpLmdldFJlZ2lvbiAnbWVzc2FnZXMnXG4gICAgXG4gIG9uU3RhcnQ6IC0+XG4gICAgQGluaXRQYWdlKClcblxuICBpbml0UGFnZTogLT5cbiAgICB2aWV3ID0gbmV3IE1lc3NhZ2VzVmlld1xuICAgICAgY29sbGVjdGlvbjogQGNvbGxlY3Rpb25cbiAgICBAc2hvd1ZpZXcgdmlld1xuXG5leHBvcnQgZGVmYXVsdCBNZXNzYWdlc0FwcFxuICBcblxuIl19
