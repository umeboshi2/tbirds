var BaseMessage, BaseMessageCollection, MessageChannel, add_message, i, len, level, levels, main_message_collection;

import {
  Model,
  Collection,
  Radio
} from 'backbone';

MessageChannel = Radio.channel('messages');

BaseMessage = (function() {
  class BaseMessage extends Model {};

  BaseMessage.prototype.defaults = {
    level: 'info'
  };

  return BaseMessage;

}).call(this);

BaseMessageCollection = (function() {
  class BaseMessageCollection extends Collection {};

  BaseMessageCollection.prototype.model = BaseMessage;

  return BaseMessageCollection;

}).call(this);

main_message_collection = new BaseMessageCollection();

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

MessageChannel.reply('xhr-error', function(xhr) {
  var msg, ref;
  msg = xhr != null ? (ref = xhr.responseJSON) != null ? ref.message : void 0 : void 0;
  if (!msg) {
    msg = xhr.statusText;
  }
  return add_message(msg, 'danger');
});

export {
  BaseMessageCollection
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGttZXNzYWdlcy9kYmNoYW5uZWwuanMiLCJzb3VyY2VzIjpbInRrbWVzc2FnZXMvZGJjaGFubmVsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFdBQUEsRUFBQSxxQkFBQSxFQUFBLGNBQUEsRUFBQSxXQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxLQUFBLEVBQUEsTUFBQSxFQUFBOztBQUFBLE9BQUE7RUFBUyxLQUFUO0VBQWdCLFVBQWhCO0VBQTRCLEtBQTVCO0NBQUEsTUFBQTs7QUFFQSxjQUFBLEdBQWlCLEtBQUssQ0FBQyxPQUFOLENBQWMsVUFBZDs7QUFFWDtFQUFOLE1BQUEsWUFBQSxRQUEwQixNQUExQixDQUFBOzt3QkFDRSxRQUFBLEdBQ0U7SUFBQSxLQUFBLEVBQU87RUFBUDs7Ozs7O0FBRUU7RUFBTixNQUFBLHNCQUFBLFFBQW9DLFdBQXBDLENBQUE7O2tDQUNFLEtBQUEsR0FBTzs7Ozs7O0FBRVQsdUJBQUEsR0FBMEIsSUFBSSxxQkFBSixDQUFBOztBQUMxQixjQUFjLENBQUMsS0FBZixDQUFxQixVQUFyQixFQUFpQyxRQUFBLENBQUEsQ0FBQTtTQUMvQjtBQUQrQixDQUFqQzs7QUFHQSxXQUFBLEdBQWMsUUFBQSxDQUFDLEdBQUQsRUFBTSxLQUFOLEVBQWEsT0FBSyxLQUFsQixFQUF5QixRQUFNLElBQS9CLENBQUE7QUFDZCxNQUFBLE9BQUEsRUFBQTtFQUFFLE9BQUEsR0FBVSxJQUFJLFdBQUosQ0FDUjtJQUFBLE9BQUEsRUFBUyxHQUFUO0lBQ0EsS0FBQSxFQUFPLEtBRFA7SUFFQSxJQUFBLEVBQU07RUFGTixDQURRLEVBQVo7OztFQU1FLElBQU8sS0FBQSxLQUFTLFFBQWhCO0lBQ0UsT0FBQSxHQUFVLFFBQUEsQ0FBQSxDQUFBO2FBQUcsdUJBQXVCLENBQUMsTUFBeEIsQ0FBK0IsT0FBL0I7SUFBSDtJQUNWLFVBQUEsQ0FBVyxPQUFYLEVBQW9CLEtBQXBCLEVBRkY7O1NBR0EsdUJBQXVCLENBQUMsR0FBeEIsQ0FBNEIsT0FBNUI7QUFWWTs7QUFZZCxjQUFjLENBQUMsS0FBZixDQUFxQixpQkFBckIsRUFBd0MsUUFBQSxDQUFDLEdBQUQsRUFBTSxNQUFJLE1BQVYsRUFBa0IsT0FBSyxLQUF2QixDQUFBO0VBQ3RDLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixFQUFxQixJQUFyQjtTQUNBLFdBQUEsQ0FBWSxHQUFaLEVBQWlCLEdBQWpCLEVBQXNCLElBQXRCO0FBRnNDLENBQXhDOztBQUlBLE1BQUEsR0FBUyxDQUFFLFNBQUYsRUFBYSxXQUFiLEVBQTBCLFNBQTFCLEVBQXFDLE1BQXJDLEVBQ1AsU0FETyxFQUNJLFFBREosRUFDYyxPQURkLEVBQ3VCLE1BRHZCOztBQUdULEtBQUEsd0NBQUE7O0VBQ0ssQ0FBQSxRQUFBLENBQUMsS0FBRCxDQUFBO1dBQ0QsY0FBYyxDQUFDLEtBQWYsQ0FBcUIsS0FBckIsRUFBNEIsUUFBQSxDQUFDLEdBQUQsRUFBTSxPQUFLLEtBQVgsQ0FBQTthQUMxQixXQUFBLENBQVksR0FBWixFQUFpQixLQUFqQixFQUF3QixJQUF4QjtJQUQwQixDQUE1QjtFQURDLENBQUEsRUFBQztBQUROOztBQU1BLGNBQWMsQ0FBQyxLQUFmLENBQXFCLGdCQUFyQixFQUF1QyxRQUFBLENBQUMsS0FBRCxDQUFBO1NBQ3JDLHVCQUF1QixDQUFDLE1BQXhCLENBQStCLEtBQS9CO0FBRHFDLENBQXZDOztBQUdBLGNBQWMsQ0FBQyxLQUFmLENBQXFCLFdBQXJCLEVBQWtDLFFBQUEsQ0FBQyxHQUFELENBQUE7QUFDbEMsTUFBQSxHQUFBLEVBQUE7RUFBRSxHQUFBLHVEQUF1QixDQUFFO0VBQ3pCLElBQUcsQ0FBSSxHQUFQO0lBQ0UsR0FBQSxHQUFNLEdBQUcsQ0FBQyxXQURaOztTQUVBLFdBQUEsQ0FBWSxHQUFaLEVBQWlCLFFBQWpCO0FBSmdDLENBQWxDOztBQU9BLE9BQUE7RUFBUSxxQkFBUiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZGVsLCBDb2xsZWN0aW9uLCBSYWRpbyB9IGZyb20gJ2JhY2tib25lJ1xuXG5NZXNzYWdlQ2hhbm5lbCA9IFJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG5jbGFzcyBCYXNlTWVzc2FnZSBleHRlbmRzIE1vZGVsXG4gIGRlZmF1bHRzOlxuICAgIGxldmVsOiAnaW5mbydcbiAgXG5jbGFzcyBCYXNlTWVzc2FnZUNvbGxlY3Rpb24gZXh0ZW5kcyBDb2xsZWN0aW9uXG4gIG1vZGVsOiBCYXNlTWVzc2FnZVxuXG5tYWluX21lc3NhZ2VfY29sbGVjdGlvbiA9IG5ldyBCYXNlTWVzc2FnZUNvbGxlY3Rpb25cbk1lc3NhZ2VDaGFubmVsLnJlcGx5ICdtZXNzYWdlcycsIC0+XG4gIG1haW5fbWVzc2FnZV9jb2xsZWN0aW9uXG5cbmFkZF9tZXNzYWdlID0gKG1zZywgbGV2ZWwsIGljb249ZmFsc2UsIGRlbGF5PTYwMDApIC0+XG4gIG1lc3NhZ2UgPSBuZXcgQmFzZU1lc3NhZ2VcbiAgICBjb250ZW50OiBtc2dcbiAgICBsZXZlbDogbGV2ZWxcbiAgICBpY29uOiBpY29uXG4gICMjIEZJWE1FIG1ha2UgZGVsYXkgY29uZmlndXJhYmxlXG4gICNkZWxheSA9IDYwMDBcbiAgdW5sZXNzIGxldmVsIGlzICdkYW5nZXInXG4gICAgZGVzdHJveSA9IC0+IG1haW5fbWVzc2FnZV9jb2xsZWN0aW9uLnJlbW92ZSBtZXNzYWdlXG4gICAgc2V0VGltZW91dCBkZXN0cm95LCBkZWxheVxuICBtYWluX21lc3NhZ2VfY29sbGVjdGlvbi5hZGQgbWVzc2FnZVxuICBcbk1lc3NhZ2VDaGFubmVsLnJlcGx5ICdkaXNwbGF5LW1lc3NhZ2UnLCAobXNnLCBsdmw9J2luZm8nLCBpY29uPWZhbHNlKSAtPlxuICBjb25zb2xlLndhcm4gJ2ljb24nLCBpY29uXG4gIGFkZF9tZXNzYWdlIG1zZywgbHZsLCBpY29uXG5cbmxldmVscyA9IFsgJ3ByaW1hcnknLCAnc2Vjb25kYXJ5JywgJ3N1Y2Nlc3MnLCAnaW5mbycsXG4gICd3YXJuaW5nJywgJ2RhbmdlcicsICdsaWdodCcsICdkYXJrJ11cblxuZm9yIGxldmVsIGluIGxldmVsc1xuICBkbyAobGV2ZWwpIC0+XG4gICAgTWVzc2FnZUNoYW5uZWwucmVwbHkgbGV2ZWwsIChtc2csIGljb249ZmFsc2UpIC0+XG4gICAgICBhZGRfbWVzc2FnZSBtc2csIGxldmVsLCBpY29uXG4gICAgICBcblxuTWVzc2FnZUNoYW5uZWwucmVwbHkgJ2RlbGV0ZS1tZXNzYWdlJywgKG1vZGVsKSAtPlxuICBtYWluX21lc3NhZ2VfY29sbGVjdGlvbi5yZW1vdmUgbW9kZWxcblxuTWVzc2FnZUNoYW5uZWwucmVwbHkgJ3hoci1lcnJvcicsICh4aHIpIC0+XG4gIG1zZyA9IHhocj8ucmVzcG9uc2VKU09OPy5tZXNzYWdlXG4gIGlmIG5vdCBtc2dcbiAgICBtc2cgPSB4aHIuc3RhdHVzVGV4dFxuICBhZGRfbWVzc2FnZSBtc2csICdkYW5nZXInXG4gIFxuXG5leHBvcnQge0Jhc2VNZXNzYWdlQ29sbGVjdGlvbn1cblxuXG4iXX0=
