var BaseMessage, BaseMessageCollection, MainChannel, MessageChannel, add_message, i, len, level, main_message_collection, ref;

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

ref = ['success', 'info', 'warning', 'danger'];
for (i = 0, len = ref.length; i < len; i++) {
  level = ref[i];
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGttZXNzYWdlcy9kYmNoYW5uZWwuanMiLCJzb3VyY2VzIjpbInRrbWVzc2FnZXMvZGJjaGFubmVsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFdBQUEsRUFBQSxxQkFBQSxFQUFBLFdBQUEsRUFBQSxjQUFBLEVBQUEsV0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsS0FBQSxFQUFBLHVCQUFBLEVBQUE7O0FBQUEsT0FBTyxRQUFQLE1BQUE7O0FBRUEsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDZCxjQUFBLEdBQWlCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixVQUF2Qjs7QUFFWDtFQUFOLE1BQUEsWUFBQSxRQUEwQixRQUFRLENBQUMsTUFBbkMsQ0FBQTs7d0JBQ0UsUUFBQSxHQUNFO0lBQUEsS0FBQSxFQUFPO0VBQVA7Ozs7OztBQUVFO0VBQU4sTUFBQSxzQkFBQSxRQUFvQyxRQUFRLENBQUMsV0FBN0MsQ0FBQTs7a0NBQ0UsS0FBQSxHQUFPOzs7Ozs7QUFFVCx1QkFBQSxHQUEwQixJQUFJOztBQUM5QixjQUFjLENBQUMsS0FBZixDQUFxQixVQUFyQixFQUFpQyxRQUFBLENBQUEsQ0FBQTtTQUMvQjtBQUQrQixDQUFqQzs7QUFHQSxXQUFBLEdBQWMsUUFBQSxDQUFDLEdBQUQsRUFBTSxLQUFOLEVBQWEsT0FBSyxLQUFsQixFQUF5QixRQUFNLElBQS9CLENBQUE7QUFDWixNQUFBLE9BQUEsRUFBQTtFQUFBLE9BQUEsR0FBVSxJQUFJLFdBQUosQ0FDUjtJQUFBLE9BQUEsRUFBUyxHQUFUO0lBQ0EsS0FBQSxFQUFPLEtBRFA7SUFFQSxJQUFBLEVBQU07RUFGTixDQURRLEVBQVY7OztFQU1BLElBQU8sS0FBQSxLQUFTLFFBQWhCO0lBQ0UsT0FBQSxHQUFVLFFBQUEsQ0FBQSxDQUFBO2FBQUcsdUJBQXVCLENBQUMsTUFBeEIsQ0FBK0IsT0FBL0I7SUFBSDtJQUNWLFVBQUEsQ0FBVyxPQUFYLEVBQW9CLEtBQXBCLEVBRkY7O1NBR0EsdUJBQXVCLENBQUMsR0FBeEIsQ0FBNEIsT0FBNUI7QUFWWTs7QUFZZCxjQUFjLENBQUMsS0FBZixDQUFxQixpQkFBckIsRUFBd0MsUUFBQSxDQUFDLEdBQUQsRUFBTSxNQUFJLE1BQVYsRUFBa0IsT0FBSyxLQUF2QixDQUFBO0VBQ3RDLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixFQUFxQixJQUFyQjtTQUNBLFdBQUEsQ0FBWSxHQUFaLEVBQWlCLEdBQWpCLEVBQXNCLElBQXRCO0FBRnNDLENBQXhDOztBQUlBO0FBQUEsS0FBQSxxQ0FBQTs7RUFDSyxDQUFBLFFBQUEsQ0FBQyxLQUFELENBQUE7V0FDRCxjQUFjLENBQUMsS0FBZixDQUFxQixLQUFyQixFQUE0QixRQUFBLENBQUMsR0FBRCxFQUFNLE9BQUssS0FBWCxDQUFBO2FBQzFCLFdBQUEsQ0FBWSxHQUFaLEVBQWlCLEtBQWpCLEVBQXdCLElBQXhCO0lBRDBCLENBQTVCO0VBREMsQ0FBQSxDQUFILENBQUksS0FBSjtBQURGOztBQU1BLGNBQWMsQ0FBQyxLQUFmLENBQXFCLGdCQUFyQixFQUF1QyxRQUFBLENBQUMsS0FBRCxDQUFBO1NBQ3JDLHVCQUF1QixDQUFDLE1BQXhCLENBQStCLEtBQS9CO0FBRHFDLENBQXZDOztBQUdBLE9BQUE7RUFBUSxxQkFBUiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSdcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5NZXNzYWdlQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG5jbGFzcyBCYXNlTWVzc2FnZSBleHRlbmRzIEJhY2tib25lLk1vZGVsXG4gIGRlZmF1bHRzOlxuICAgIGxldmVsOiAnaW5mbydcbiAgXG5jbGFzcyBCYXNlTWVzc2FnZUNvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gIG1vZGVsOiBCYXNlTWVzc2FnZVxuXG5tYWluX21lc3NhZ2VfY29sbGVjdGlvbiA9IG5ldyBCYXNlTWVzc2FnZUNvbGxlY3Rpb25cbk1lc3NhZ2VDaGFubmVsLnJlcGx5ICdtZXNzYWdlcycsIC0+XG4gIG1haW5fbWVzc2FnZV9jb2xsZWN0aW9uXG5cbmFkZF9tZXNzYWdlID0gKG1zZywgbGV2ZWwsIGljb249ZmFsc2UsIGRlbGF5PTYwMDApIC0+XG4gIG1lc3NhZ2UgPSBuZXcgQmFzZU1lc3NhZ2VcbiAgICBjb250ZW50OiBtc2dcbiAgICBsZXZlbDogbGV2ZWxcbiAgICBpY29uOiBpY29uXG4gICMjIEZJWE1FIG1ha2UgZGVsYXkgY29uZmlndXJhYmxlXG4gICNkZWxheSA9IDYwMDBcbiAgdW5sZXNzIGxldmVsIGlzICdkYW5nZXInXG4gICAgZGVzdHJveSA9IC0+IG1haW5fbWVzc2FnZV9jb2xsZWN0aW9uLnJlbW92ZSBtZXNzYWdlXG4gICAgc2V0VGltZW91dCBkZXN0cm95LCBkZWxheVxuICBtYWluX21lc3NhZ2VfY29sbGVjdGlvbi5hZGQgbWVzc2FnZVxuICBcbk1lc3NhZ2VDaGFubmVsLnJlcGx5ICdkaXNwbGF5LW1lc3NhZ2UnLCAobXNnLCBsdmw9J2luZm8nLCBpY29uPWZhbHNlKSAtPlxuICBjb25zb2xlLndhcm4gJ2ljb24nLCBpY29uXG4gIGFkZF9tZXNzYWdlIG1zZywgbHZsLCBpY29uXG5cbmZvciBsZXZlbCBpbiBbJ3N1Y2Nlc3MnLCAnaW5mbycsICd3YXJuaW5nJywgJ2RhbmdlciddXG4gIGRvIChsZXZlbCkgLT5cbiAgICBNZXNzYWdlQ2hhbm5lbC5yZXBseSBsZXZlbCwgKG1zZywgaWNvbj1mYWxzZSkgLT5cbiAgICAgIGFkZF9tZXNzYWdlIG1zZywgbGV2ZWwsIGljb25cbiAgICAgIFxuXG5NZXNzYWdlQ2hhbm5lbC5yZXBseSAnZGVsZXRlLW1lc3NhZ2UnLCAobW9kZWwpIC0+XG4gIG1haW5fbWVzc2FnZV9jb2xsZWN0aW9uLnJlbW92ZSBtb2RlbFxuXG5leHBvcnQge0Jhc2VNZXNzYWdlQ29sbGVjdGlvbn1cblxuXG4iXX0=
