var Backbone, BaseMessage, BaseMessageCollection, MainChannel, MessageChannel, add_message, i, len, level, main_message_collection, ref;

Backbone = require('backbone');

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

module.exports = {
  BaseMessageCollection: BaseMessageCollection
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuanMiLCJzb3VyY2VzIjpbIm1lc3NhZ2VzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFFBQUEsRUFBQSxXQUFBLEVBQUEscUJBQUEsRUFBQSxXQUFBLEVBQUEsY0FBQSxFQUFBLFdBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLEtBQUEsRUFBQSx1QkFBQSxFQUFBOztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFFWCxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCOztBQUVYO0VBQU4sTUFBQSxZQUFBLFFBQTBCLFFBQVEsQ0FBQyxNQUFuQyxDQUFBOzt3QkFDRSxRQUFBLEdBQ0U7SUFBQSxLQUFBLEVBQU87RUFBUDs7Ozs7O0FBRUU7RUFBTixNQUFBLHNCQUFBLFFBQW9DLFFBQVEsQ0FBQyxXQUE3QyxDQUFBOztrQ0FDRSxLQUFBLEdBQU87Ozs7OztBQUVULHVCQUFBLEdBQTBCLElBQUk7O0FBQzlCLGNBQWMsQ0FBQyxLQUFmLENBQXFCLFVBQXJCLEVBQWlDLFFBQUEsQ0FBQSxDQUFBO1NBQy9CO0FBRCtCLENBQWpDOztBQUdBLFdBQUEsR0FBYyxRQUFBLENBQUMsR0FBRCxFQUFNLEtBQU4sRUFBYSxPQUFLLEtBQWxCLEVBQXlCLFFBQU0sSUFBL0IsQ0FBQTtBQUNaLE1BQUEsT0FBQSxFQUFBO0VBQUEsT0FBQSxHQUFVLElBQUksV0FBSixDQUNSO0lBQUEsT0FBQSxFQUFTLEdBQVQ7SUFDQSxLQUFBLEVBQU8sS0FEUDtJQUVBLElBQUEsRUFBTTtFQUZOLENBRFEsRUFBVjs7O0VBTUEsSUFBTyxLQUFBLEtBQVMsUUFBaEI7SUFDRSxPQUFBLEdBQVUsUUFBQSxDQUFBLENBQUE7YUFBRyx1QkFBdUIsQ0FBQyxNQUF4QixDQUErQixPQUEvQjtJQUFIO0lBQ1YsVUFBQSxDQUFXLE9BQVgsRUFBb0IsS0FBcEIsRUFGRjs7U0FHQSx1QkFBdUIsQ0FBQyxHQUF4QixDQUE0QixPQUE1QjtBQVZZOztBQVlkLGNBQWMsQ0FBQyxLQUFmLENBQXFCLGlCQUFyQixFQUF3QyxRQUFBLENBQUMsR0FBRCxFQUFNLE1BQUksTUFBVixFQUFrQixPQUFLLEtBQXZCLENBQUE7RUFDdEMsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLEVBQXFCLElBQXJCO1NBQ0EsV0FBQSxDQUFZLEdBQVosRUFBaUIsR0FBakIsRUFBc0IsSUFBdEI7QUFGc0MsQ0FBeEM7O0FBSUE7QUFBQSxLQUFBLHFDQUFBOztFQUNLLENBQUEsUUFBQSxDQUFDLEtBQUQsQ0FBQTtXQUNELGNBQWMsQ0FBQyxLQUFmLENBQXFCLEtBQXJCLEVBQTRCLFFBQUEsQ0FBQyxHQUFELEVBQU0sT0FBSyxLQUFYLENBQUE7YUFDMUIsV0FBQSxDQUFZLEdBQVosRUFBaUIsS0FBakIsRUFBd0IsSUFBeEI7SUFEMEIsQ0FBNUI7RUFEQyxDQUFBLENBQUgsQ0FBSSxLQUFKO0FBREY7O0FBTUEsY0FBYyxDQUFDLEtBQWYsQ0FBcUIsZ0JBQXJCLEVBQXVDLFFBQUEsQ0FBQyxLQUFELENBQUE7U0FDckMsdUJBQXVCLENBQUMsTUFBeEIsQ0FBK0IsS0FBL0I7QUFEcUMsQ0FBdkM7O0FBR0EsTUFBTSxDQUFDLE9BQVAsR0FDRTtFQUFBLHFCQUFBLEVBQXVCO0FBQXZCIiwic291cmNlc0NvbnRlbnQiOlsiQmFja2JvbmUgPSByZXF1aXJlICdiYWNrYm9uZSdcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5NZXNzYWdlQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG5jbGFzcyBCYXNlTWVzc2FnZSBleHRlbmRzIEJhY2tib25lLk1vZGVsXG4gIGRlZmF1bHRzOlxuICAgIGxldmVsOiAnaW5mbydcbiAgXG5jbGFzcyBCYXNlTWVzc2FnZUNvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gIG1vZGVsOiBCYXNlTWVzc2FnZVxuXG5tYWluX21lc3NhZ2VfY29sbGVjdGlvbiA9IG5ldyBCYXNlTWVzc2FnZUNvbGxlY3Rpb25cbk1lc3NhZ2VDaGFubmVsLnJlcGx5ICdtZXNzYWdlcycsIC0+XG4gIG1haW5fbWVzc2FnZV9jb2xsZWN0aW9uXG5cbmFkZF9tZXNzYWdlID0gKG1zZywgbGV2ZWwsIGljb249ZmFsc2UsIGRlbGF5PTYwMDApIC0+XG4gIG1lc3NhZ2UgPSBuZXcgQmFzZU1lc3NhZ2VcbiAgICBjb250ZW50OiBtc2dcbiAgICBsZXZlbDogbGV2ZWxcbiAgICBpY29uOiBpY29uXG4gICMjIEZJWE1FIG1ha2UgZGVsYXkgY29uZmlndXJhYmxlXG4gICNkZWxheSA9IDYwMDBcbiAgdW5sZXNzIGxldmVsIGlzICdkYW5nZXInXG4gICAgZGVzdHJveSA9IC0+IG1haW5fbWVzc2FnZV9jb2xsZWN0aW9uLnJlbW92ZSBtZXNzYWdlXG4gICAgc2V0VGltZW91dCBkZXN0cm95LCBkZWxheVxuICBtYWluX21lc3NhZ2VfY29sbGVjdGlvbi5hZGQgbWVzc2FnZVxuICBcbk1lc3NhZ2VDaGFubmVsLnJlcGx5ICdkaXNwbGF5LW1lc3NhZ2UnLCAobXNnLCBsdmw9J2luZm8nLCBpY29uPWZhbHNlKSAtPlxuICBjb25zb2xlLndhcm4gJ2ljb24nLCBpY29uXG4gIGFkZF9tZXNzYWdlIG1zZywgbHZsLCBpY29uXG5cbmZvciBsZXZlbCBpbiBbJ3N1Y2Nlc3MnLCAnaW5mbycsICd3YXJuaW5nJywgJ2RhbmdlciddXG4gIGRvIChsZXZlbCkgLT5cbiAgICBNZXNzYWdlQ2hhbm5lbC5yZXBseSBsZXZlbCwgKG1zZywgaWNvbj1mYWxzZSkgLT5cbiAgICAgIGFkZF9tZXNzYWdlIG1zZywgbGV2ZWwsIGljb25cbiAgICAgIFxuXG5NZXNzYWdlQ2hhbm5lbC5yZXBseSAnZGVsZXRlLW1lc3NhZ2UnLCAobW9kZWwpIC0+XG4gIG1haW5fbWVzc2FnZV9jb2xsZWN0aW9uLnJlbW92ZSBtb2RlbFxuXG5tb2R1bGUuZXhwb3J0cyA9XG4gIEJhc2VNZXNzYWdlQ29sbGVjdGlvbjogQmFzZU1lc3NhZ2VDb2xsZWN0aW9uXG4gIFxuXG4iXX0=
