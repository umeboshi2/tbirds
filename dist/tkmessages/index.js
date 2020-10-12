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

if (__useCssModules__) {
  require("../../sass/tkmessages.scss");
}

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGttZXNzYWdlcy9pbmRleC5qcyIsInNvdXJjZXMiOlsidGttZXNzYWdlcy9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxjQUFBLEVBQUEsV0FBQSxFQUFBLFdBQUEsRUFBQTs7QUFBQSxPQUFBO0VBQVMsS0FBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLElBQVQ7RUFBZSxjQUFmO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsR0FBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxFQUFQLE1BQUE7O0FBQ0EsT0FBTyxXQUFQLE1BQUE7O0FBRUEsSUFBRyxpQkFBSDtFQUNFLE9BQUEsQ0FBUSw0QkFBUixFQURGOzs7QUFHQSxjQUFBLEdBQWlCLEtBQUssQ0FBQyxPQUFOLENBQWMsVUFBZDs7QUFFakIsT0FBQTs7QUFFTTtFQUFOLE1BQUEsWUFBQSxRQUEwQixLQUExQjtJQVVFLGVBQWlCLENBQUEsQ0FBQTthQUNmLGNBQWMsQ0FBQyxPQUFmLENBQXVCLGdCQUF2QixFQUF5QyxJQUFDLENBQUEsS0FBMUM7SUFEZTs7RUFWbkI7O3dCQUNFLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxLQUFELENBQUE7SUFDdEIsSUFBRyxPQUFPLEtBQUssQ0FBQyxPQUFiLEtBQXdCLFVBQTNCO2FBQ0UsS0FBSyxDQUFDLE9BQU4sQ0FBYyxLQUFkLEVBREY7S0FBQSxNQUFBO2FBR0UsV0FBQSxDQUFZLEtBQVosRUFIRjs7RUFEc0IsQ0FBZDs7d0JBS1YsRUFBQSxHQUNFO0lBQUEsWUFBQSxFQUFjO0VBQWQ7O3dCQUNGLE1BQUEsR0FDRTtJQUFBLHdCQUFBLEVBQTBCO0VBQTFCOzs7Ozs7QUFJRTtFQUFOLE1BQUEsYUFBQSxRQUEyQixlQUEzQixDQUFBOzt5QkFDRSxTQUFBLEdBQVc7Ozs7OztBQUVQLGNBQU4sTUFBQSxZQUFBLFFBQTBCLElBQTFCO0VBQ0UsVUFBWSxDQUFBLENBQUE7QUFDZCxRQUFBO0lBQUksSUFBQyxDQUFBLFVBQUQsR0FBYyxjQUFjLENBQUMsT0FBZixDQUF1QixVQUF2QjtJQUNkLElBQUEsR0FBTyxJQUFJLFlBQUosQ0FDTDtNQUFBLFVBQUEsRUFBWSxJQUFDLENBQUE7SUFBYixDQURLO1dBRVAsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFWO0VBSlU7O0FBRGQ7O0FBT0EsT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmFkaW8gfSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCB7IFZpZXcsIENvbGxlY3Rpb25WaWV3IH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCB7IEFwcCB9IGZyb20gJ21hcmlvbmV0dGUudG9vbGtpdCdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5pbXBvcnQgbWVzc2FnZV9ib3ggZnJvbSAnLi90ZW1wbGF0ZXMvbWVzc2FnZS1ib3gnXG5cbmlmIF9fdXNlQ3NzTW9kdWxlc19fXG4gIHJlcXVpcmUgXCIuLi8uLi9zYXNzL3RrbWVzc2FnZXMuc2Nzc1wiXG5cbk1lc3NhZ2VDaGFubmVsID0gUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5cbmltcG9ydCAnLi9kYmNoYW5uZWwnXG5cbmNsYXNzIE1lc3NhZ2VWaWV3IGV4dGVuZHMgVmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgaWYgdHlwZW9mIG1vZGVsLmNvbnRlbnQgaXMgJ2Z1bmN0aW9uJ1xuICAgICAgbW9kZWwuY29udGVudCBtb2RlbFxuICAgIGVsc2VcbiAgICAgIG1lc3NhZ2VfYm94IG1vZGVsXG4gIHVpOlxuICAgIGNsb3NlX2J1dHRvbjogJ2J1dHRvbi5jbG9zZSdcbiAgZXZlbnRzOlxuICAgICdjbGljayBAdWkuY2xvc2VfYnV0dG9uJzogJ2Rlc3Ryb3lfbWVzc2FnZSdcbiAgZGVzdHJveV9tZXNzYWdlOiAtPlxuICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ2RlbGV0ZS1tZXNzYWdlJywgQG1vZGVsXG4gICAgXG5jbGFzcyBNZXNzYWdlc1ZpZXcgZXh0ZW5kcyBDb2xsZWN0aW9uVmlld1xuICBjaGlsZFZpZXc6IE1lc3NhZ2VWaWV3XG5cbmNsYXNzIE1lc3NhZ2VzQXBwIGV4dGVuZHMgQXBwXG4gIGluaXRpYWxpemU6IC0+XG4gICAgQGNvbGxlY3Rpb24gPSBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICdtZXNzYWdlcydcbiAgICB2aWV3ID0gbmV3IE1lc3NhZ2VzVmlld1xuICAgICAgY29sbGVjdGlvbjogQGNvbGxlY3Rpb25cbiAgICBAc2hvd1ZpZXcgdmlld1xuICAgIFxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZXNBcHBcbiAgXG5cbiJdfQ==
