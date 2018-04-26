var BaseMessage, BaseMessageCollection, MainChannel, MessageChannel, add_message, i, len, level, levels, main_message_collection;

import Backbone from 'backbone';

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

BaseMessage = (function() {
  class BaseMessage extends Backbone.Model {};

  BaseMessage.prototype.defaults = {
    level: 'info'
  };

  return BaseMessage;

}).call(this);

BaseMessageCollection = (function() {
  class BaseMessageCollection extends Backbone.Collection {};

  BaseMessageCollection.prototype.model = BaseMessage;

  return BaseMessageCollection;

}).call(this);

main_message_collection = new BaseMessageCollection;

MessageChannel.reply('messages', function() {
  return main_message_collection;
});

add_message = function(msg, level, icon = false, delay = 6000) {
  var destroy, message;
  message = new BaseMessage({
    content: msg,
    level: level,
    icon: icon
  });
  //# FIXME make delay configurable
  //delay = 6000
  if (level !== 'danger') {
    destroy = function() {
      return main_message_collection.remove(message);
    };
    setTimeout(destroy, delay);
  }
  return main_message_collection.add(message);
};

MessageChannel.reply('display-message', function(msg, lvl = 'info', icon = false) {
  console.warn('icon', icon);
  return add_message(msg, lvl, icon);
});

levels = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark'];

for (i = 0, len = levels.length; i < len; i++) {
  level = levels[i];
  (function(level) {
    return MessageChannel.reply(level, function(msg, icon = false) {
      return add_message(msg, level, icon);
    });
  })(level);
}

MessageChannel.reply('delete-message', function(model) {
  return main_message_collection.remove(model);
});

export {
  BaseMessageCollection
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGttZXNzYWdlcy9kYmNoYW5uZWwuanMiLCJzb3VyY2VzIjpbInRrbWVzc2FnZXMvZGJjaGFubmVsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFdBQUEsRUFBQSxxQkFBQSxFQUFBLFdBQUEsRUFBQSxjQUFBLEVBQUEsV0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsS0FBQSxFQUFBLE1BQUEsRUFBQTs7QUFBQSxPQUFPLFFBQVAsTUFBQTs7QUFFQSxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCOztBQUVYO0VBQU4sTUFBQSxZQUFBLFFBQTBCLFFBQVEsQ0FBQyxNQUFuQyxDQUFBOzt3QkFDRSxRQUFBLEdBQ0U7SUFBQSxLQUFBLEVBQU87RUFBUDs7Ozs7O0FBRUU7RUFBTixNQUFBLHNCQUFBLFFBQW9DLFFBQVEsQ0FBQyxXQUE3QyxDQUFBOztrQ0FDRSxLQUFBLEdBQU87Ozs7OztBQUVULHVCQUFBLEdBQTBCLElBQUk7O0FBQzlCLGNBQWMsQ0FBQyxLQUFmLENBQXFCLFVBQXJCLEVBQWlDLFFBQUEsQ0FBQSxDQUFBO1NBQy9CO0FBRCtCLENBQWpDOztBQUdBLFdBQUEsR0FBYyxRQUFBLENBQUMsR0FBRCxFQUFNLEtBQU4sRUFBYSxPQUFLLEtBQWxCLEVBQXlCLFFBQU0sSUFBL0IsQ0FBQTtBQUNaLE1BQUEsT0FBQSxFQUFBO0VBQUEsT0FBQSxHQUFVLElBQUksV0FBSixDQUNSO0lBQUEsT0FBQSxFQUFTLEdBQVQ7SUFDQSxLQUFBLEVBQU8sS0FEUDtJQUVBLElBQUEsRUFBTTtFQUZOLENBRFEsRUFBVjs7O0VBTUEsSUFBTyxLQUFBLEtBQVMsUUFBaEI7SUFDRSxPQUFBLEdBQVUsUUFBQSxDQUFBLENBQUE7YUFBRyx1QkFBdUIsQ0FBQyxNQUF4QixDQUErQixPQUEvQjtJQUFIO0lBQ1YsVUFBQSxDQUFXLE9BQVgsRUFBb0IsS0FBcEIsRUFGRjs7U0FHQSx1QkFBdUIsQ0FBQyxHQUF4QixDQUE0QixPQUE1QjtBQVZZOztBQVlkLGNBQWMsQ0FBQyxLQUFmLENBQXFCLGlCQUFyQixFQUF3QyxRQUFBLENBQUMsR0FBRCxFQUFNLE1BQUksTUFBVixFQUFrQixPQUFLLEtBQXZCLENBQUE7RUFDdEMsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLEVBQXFCLElBQXJCO1NBQ0EsV0FBQSxDQUFZLEdBQVosRUFBaUIsR0FBakIsRUFBc0IsSUFBdEI7QUFGc0MsQ0FBeEM7O0FBSUEsTUFBQSxHQUFTLENBQUUsU0FBRixFQUFhLFdBQWIsRUFBMEIsU0FBMUIsRUFBcUMsTUFBckMsRUFDUCxTQURPLEVBQ0ksUUFESixFQUNjLE9BRGQsRUFDdUIsTUFEdkI7O0FBR1QsS0FBQSx3Q0FBQTs7RUFDSyxDQUFBLFFBQUEsQ0FBQyxLQUFELENBQUE7V0FDRCxjQUFjLENBQUMsS0FBZixDQUFxQixLQUFyQixFQUE0QixRQUFBLENBQUMsR0FBRCxFQUFNLE9BQUssS0FBWCxDQUFBO2FBQzFCLFdBQUEsQ0FBWSxHQUFaLEVBQWlCLEtBQWpCLEVBQXdCLElBQXhCO0lBRDBCLENBQTVCO0VBREMsQ0FBQSxDQUFILENBQUksS0FBSjtBQURGOztBQU1BLGNBQWMsQ0FBQyxLQUFmLENBQXFCLGdCQUFyQixFQUF1QyxRQUFBLENBQUMsS0FBRCxDQUFBO1NBQ3JDLHVCQUF1QixDQUFDLE1BQXhCLENBQStCLEtBQS9CO0FBRHFDLENBQXZDOztBQUdBLE9BQUE7RUFBUSxxQkFBUiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSdcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5NZXNzYWdlQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG5jbGFzcyBCYXNlTWVzc2FnZSBleHRlbmRzIEJhY2tib25lLk1vZGVsXG4gIGRlZmF1bHRzOlxuICAgIGxldmVsOiAnaW5mbydcbiAgXG5jbGFzcyBCYXNlTWVzc2FnZUNvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gIG1vZGVsOiBCYXNlTWVzc2FnZVxuXG5tYWluX21lc3NhZ2VfY29sbGVjdGlvbiA9IG5ldyBCYXNlTWVzc2FnZUNvbGxlY3Rpb25cbk1lc3NhZ2VDaGFubmVsLnJlcGx5ICdtZXNzYWdlcycsIC0+XG4gIG1haW5fbWVzc2FnZV9jb2xsZWN0aW9uXG5cbmFkZF9tZXNzYWdlID0gKG1zZywgbGV2ZWwsIGljb249ZmFsc2UsIGRlbGF5PTYwMDApIC0+XG4gIG1lc3NhZ2UgPSBuZXcgQmFzZU1lc3NhZ2VcbiAgICBjb250ZW50OiBtc2dcbiAgICBsZXZlbDogbGV2ZWxcbiAgICBpY29uOiBpY29uXG4gICMjIEZJWE1FIG1ha2UgZGVsYXkgY29uZmlndXJhYmxlXG4gICNkZWxheSA9IDYwMDBcbiAgdW5sZXNzIGxldmVsIGlzICdkYW5nZXInXG4gICAgZGVzdHJveSA9IC0+IG1haW5fbWVzc2FnZV9jb2xsZWN0aW9uLnJlbW92ZSBtZXNzYWdlXG4gICAgc2V0VGltZW91dCBkZXN0cm95LCBkZWxheVxuICBtYWluX21lc3NhZ2VfY29sbGVjdGlvbi5hZGQgbWVzc2FnZVxuICBcbk1lc3NhZ2VDaGFubmVsLnJlcGx5ICdkaXNwbGF5LW1lc3NhZ2UnLCAobXNnLCBsdmw9J2luZm8nLCBpY29uPWZhbHNlKSAtPlxuICBjb25zb2xlLndhcm4gJ2ljb24nLCBpY29uXG4gIGFkZF9tZXNzYWdlIG1zZywgbHZsLCBpY29uXG5cbmxldmVscyA9IFsgJ3ByaW1hcnknLCAnc2Vjb25kYXJ5JywgJ3N1Y2Nlc3MnLCAnaW5mbycsXG4gICd3YXJuaW5nJywgJ2RhbmdlcicsICdsaWdodCcsICdkYXJrJ11cblxuZm9yIGxldmVsIGluIGxldmVsc1xuICBkbyAobGV2ZWwpIC0+XG4gICAgTWVzc2FnZUNoYW5uZWwucmVwbHkgbGV2ZWwsIChtc2csIGljb249ZmFsc2UpIC0+XG4gICAgICBhZGRfbWVzc2FnZSBtc2csIGxldmVsLCBpY29uXG4gICAgICBcblxuTWVzc2FnZUNoYW5uZWwucmVwbHkgJ2RlbGV0ZS1tZXNzYWdlJywgKG1vZGVsKSAtPlxuICBtYWluX21lc3NhZ2VfY29sbGVjdGlvbi5yZW1vdmUgbW9kZWxcblxuZXhwb3J0IHtCYXNlTWVzc2FnZUNvbGxlY3Rpb259XG5cblxuIl19
