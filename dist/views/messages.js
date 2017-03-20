var Backbone, Marionette, MessageChannel, MessageView, MessagesView, MiscTemplates,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

MiscTemplates = require('../templates/misc');

MessageChannel = Backbone.Radio.channel('messages');

MessageView = (function(superClass) {
  extend(MessageView, superClass);

  function MessageView() {
    return MessageView.__super__.constructor.apply(this, arguments);
  }

  MessageView.prototype.template = MiscTemplates.message_box;

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

})(Backbone.Marionette.View);

MessagesView = (function(superClass) {
  extend(MessagesView, superClass);

  function MessagesView() {
    return MessagesView.__super__.constructor.apply(this, arguments);
  }

  MessagesView.prototype.childView = MessageView;

  return MessagesView;

})(Backbone.Marionette.CollectionView);

module.exports = MessagesView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvbWVzc2FnZXMuanMiLCJzb3VyY2VzIjpbInZpZXdzL21lc3NhZ2VzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLDhFQUFBO0VBQUE7OztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFDWCxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUViLGFBQUEsR0FBZ0IsT0FBQSxDQUFRLG1CQUFSOztBQUVoQixjQUFBLEdBQWlCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixVQUF2Qjs7QUFFWDs7Ozs7Ozt3QkFDSixRQUFBLEdBQVMsYUFBYSxDQUFDOzt3QkFDdkIsRUFBQSxHQUNFO0lBQUEsWUFBQSxFQUFjLGNBQWQ7Ozt3QkFFRixNQUFBLEdBQ0U7SUFBQSx3QkFBQSxFQUEwQixpQkFBMUI7Ozt3QkFFRixlQUFBLEdBQWlCLFNBQUE7V0FFZixjQUFjLENBQUMsT0FBZixDQUF1QixnQkFBdkIsRUFBeUMsSUFBQyxDQUFBLEtBQTFDO0VBRmU7Ozs7R0FSTyxRQUFRLENBQUMsVUFBVSxDQUFDOztBQWF4Qzs7Ozs7Ozt5QkFDSixTQUFBLEdBQVc7Ozs7R0FEYyxRQUFRLENBQUMsVUFBVSxDQUFDOztBQUkvQyxNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5NYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuTWlzY1RlbXBsYXRlcyA9IHJlcXVpcmUgJy4uL3RlbXBsYXRlcy9taXNjJ1xuXG5NZXNzYWdlQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG5jbGFzcyBNZXNzYWdlVmlldyBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTpNaXNjVGVtcGxhdGVzLm1lc3NhZ2VfYm94XG4gIHVpOlxuICAgIGNsb3NlX2J1dHRvbjogJ2J1dHRvbi5jbG9zZSdcblxuICBldmVudHM6XG4gICAgJ2NsaWNrIEB1aS5jbG9zZV9idXR0b24nOiAnZGVzdHJveV9tZXNzYWdlJ1xuXG4gIGRlc3Ryb3lfbWVzc2FnZTogLT5cbiAgICAjY29uc29sZS5sb2cgXCJEZXN0cm95IG1lc3NhZ2VcIiwgQG1vZGVsLmdldChcImNvbnRlbnRcIilcbiAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICdkZWxldGUtbWVzc2FnZScsIEBtb2RlbFxuICAgIFxuXG5jbGFzcyBNZXNzYWdlc1ZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLkNvbGxlY3Rpb25WaWV3XG4gIGNoaWxkVmlldzogTWVzc2FnZVZpZXdcbiAgXG4gIFxubW9kdWxlLmV4cG9ydHMgPSBNZXNzYWdlc1ZpZXdcbiJdfQ==
