var MainChannel, MessageChannel, MessageView, MessagesApp, MessagesView;

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

import Toolkit from 'marionette.toolkit';

import tc from 'teacup';

import message_box from './templates/message-box';

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGttZXNzYWdlcy9pbmRleC5qcyIsInNvdXJjZXMiOlsidGttZXNzYWdlcy9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxXQUFBLEVBQUEsY0FBQSxFQUFBLFdBQUEsRUFBQSxXQUFBLEVBQUE7O0FBQUEsT0FBTyxRQUFQLE1BQUE7O0FBQ0EsT0FBTyxVQUFQLE1BQUE7O0FBQ0EsT0FBTyxPQUFQLE1BQUE7O0FBQ0EsT0FBTyxFQUFQLE1BQUE7O0FBQ0EsT0FBTyxXQUFQLE1BQUE7O0FBRUEsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDZCxjQUFBLEdBQWlCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixVQUF2Qjs7QUFFakIsT0FBQTs7QUFFTTtFQUFOLE1BQUEsWUFBQSxRQUEwQixVQUFVLENBQUMsS0FBckM7SUFVRSxlQUFpQixDQUFBLENBQUE7YUFDZixjQUFjLENBQUMsT0FBZixDQUF1QixnQkFBdkIsRUFBeUMsSUFBQyxDQUFBLEtBQTFDO0lBRGU7O0VBVm5COzt3QkFDRSxRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO0lBQ3RCLElBQUcsT0FBTyxLQUFLLENBQUMsT0FBYixLQUF3QixVQUEzQjthQUNFLEtBQUssQ0FBQyxPQUFOLENBQWMsS0FBZCxFQURGO0tBQUEsTUFBQTthQUdFLFdBQUEsQ0FBWSxLQUFaLEVBSEY7O0VBRHNCLENBQWQ7O3dCQUtWLEVBQUEsR0FDRTtJQUFBLFlBQUEsRUFBYztFQUFkOzt3QkFDRixNQUFBLEdBQ0U7SUFBQSx3QkFBQSxFQUEwQjtFQUExQjs7Ozs7O0FBSUU7RUFBTixNQUFBLGFBQUEsUUFBMkIsVUFBVSxDQUFDLGVBQXRDLENBQUE7O3lCQUNFLFNBQUEsR0FBVzs7Ozs7O0FBRVAsY0FBTixNQUFBLFlBQUEsUUFBMEIsT0FBTyxDQUFDLElBQWxDO0VBQ0UsYUFBZSxDQUFBLENBQUE7SUFDYixJQUFDLENBQUEsVUFBRCxHQUFjLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFVBQXZCO1dBQ2QsSUFBQyxDQUFBLFNBQUQsQ0FBVyxJQUFDLENBQUEsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFuQixDQUFBLENBQTRCLENBQUMsU0FBN0IsQ0FBdUMsVUFBdkMsQ0FBWDtFQUZhOztFQUlmLE9BQVMsQ0FBQSxDQUFBO1dBQ1AsSUFBQyxDQUFBLFFBQUQsQ0FBQTtFQURPOztFQUdULFFBQVUsQ0FBQSxDQUFBO0FBQ1IsUUFBQTtJQUFBLElBQUEsR0FBTyxJQUFJLFlBQUosQ0FDTDtNQUFBLFVBQUEsRUFBWSxJQUFDLENBQUE7SUFBYixDQURLO1dBRVAsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFWO0VBSFE7O0FBUlo7O0FBYUEsT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCBUb29sa2l0IGZyb20gJ21hcmlvbmV0dGUudG9vbGtpdCdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5pbXBvcnQgbWVzc2FnZV9ib3ggZnJvbSAnLi90ZW1wbGF0ZXMvbWVzc2FnZS1ib3gnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdtZXNzYWdlcydcblxuaW1wb3J0ICcuL2RiY2hhbm5lbCdcblxuY2xhc3MgTWVzc2FnZVZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLlZpZXdcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICAgIGlmIHR5cGVvZiBtb2RlbC5jb250ZW50IGlzICdmdW5jdGlvbidcbiAgICAgIG1vZGVsLmNvbnRlbnQgbW9kZWxcbiAgICBlbHNlXG4gICAgICBtZXNzYWdlX2JveCBtb2RlbFxuICB1aTpcbiAgICBjbG9zZV9idXR0b246ICdidXR0b24uY2xvc2UnXG4gIGV2ZW50czpcbiAgICAnY2xpY2sgQHVpLmNsb3NlX2J1dHRvbic6ICdkZXN0cm95X21lc3NhZ2UnXG4gIGRlc3Ryb3lfbWVzc2FnZTogLT5cbiAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICdkZWxldGUtbWVzc2FnZScsIEBtb2RlbFxuICAgIFxuY2xhc3MgTWVzc2FnZXNWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5Db2xsZWN0aW9uVmlld1xuICBjaGlsZFZpZXc6IE1lc3NhZ2VWaWV3XG5cbmNsYXNzIE1lc3NhZ2VzQXBwIGV4dGVuZHMgVG9vbGtpdC5BcHBcbiAgb25CZWZvcmVTdGFydDogLT5cbiAgICBAY29sbGVjdGlvbiA9IE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ21lc3NhZ2VzJ1xuICAgIEBzZXRSZWdpb24gQG9wdGlvbnMucGFyZW50QXBwLmdldFZpZXcoKS5nZXRSZWdpb24gJ21lc3NhZ2VzJ1xuICAgIFxuICBvblN0YXJ0OiAtPlxuICAgIEBpbml0UGFnZSgpXG5cbiAgaW5pdFBhZ2U6IC0+XG4gICAgdmlldyA9IG5ldyBNZXNzYWdlc1ZpZXdcbiAgICAgIGNvbGxlY3Rpb246IEBjb2xsZWN0aW9uXG4gICAgQHNob3dWaWV3IHZpZXdcblxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZXNBcHBcbiAgXG5cbiJdfQ==
