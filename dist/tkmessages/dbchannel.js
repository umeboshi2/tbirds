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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGttZXNzYWdlcy9kYmNoYW5uZWwuanMiLCJzb3VyY2VzIjpbInRrbWVzc2FnZXMvZGJjaGFubmVsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFdBQUEsRUFBQSxxQkFBQSxFQUFBLGNBQUEsRUFBQSxXQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxLQUFBLEVBQUEsTUFBQSxFQUFBOztBQUFBLE9BQUE7RUFBUyxLQUFUO0VBQWdCLFVBQWhCO0VBQTRCLEtBQTVCO0NBQUEsTUFBQTs7QUFFQSxjQUFBLEdBQWlCLEtBQUssQ0FBQyxPQUFOLENBQWMsVUFBZDs7QUFFWDtFQUFOLE1BQUEsWUFBQSxRQUEwQixNQUExQixDQUFBOzt3QkFDRSxRQUFBLEdBQ0U7SUFBQSxLQUFBLEVBQU87RUFBUDs7Ozs7O0FBRUU7RUFBTixNQUFBLHNCQUFBLFFBQW9DLFdBQXBDLENBQUE7O2tDQUNFLEtBQUEsR0FBTzs7Ozs7O0FBRVQsdUJBQUEsR0FBMEIsSUFBSTs7QUFDOUIsY0FBYyxDQUFDLEtBQWYsQ0FBcUIsVUFBckIsRUFBaUMsUUFBQSxDQUFBLENBQUE7U0FDL0I7QUFEK0IsQ0FBakM7O0FBR0EsV0FBQSxHQUFjLFFBQUEsQ0FBQyxHQUFELEVBQU0sS0FBTixFQUFhLE9BQUssS0FBbEIsRUFBeUIsUUFBTSxJQUEvQixDQUFBO0FBQ1osTUFBQSxPQUFBLEVBQUE7RUFBQSxPQUFBLEdBQVUsSUFBSSxXQUFKLENBQ1I7SUFBQSxPQUFBLEVBQVMsR0FBVDtJQUNBLEtBQUEsRUFBTyxLQURQO0lBRUEsSUFBQSxFQUFNO0VBRk4sQ0FEUSxFQUFWOzs7RUFNQSxJQUFPLEtBQUEsS0FBUyxRQUFoQjtJQUNFLE9BQUEsR0FBVSxRQUFBLENBQUEsQ0FBQTthQUFHLHVCQUF1QixDQUFDLE1BQXhCLENBQStCLE9BQS9CO0lBQUg7SUFDVixVQUFBLENBQVcsT0FBWCxFQUFvQixLQUFwQixFQUZGOztTQUdBLHVCQUF1QixDQUFDLEdBQXhCLENBQTRCLE9BQTVCO0FBVlk7O0FBWWQsY0FBYyxDQUFDLEtBQWYsQ0FBcUIsaUJBQXJCLEVBQXdDLFFBQUEsQ0FBQyxHQUFELEVBQU0sTUFBSSxNQUFWLEVBQWtCLE9BQUssS0FBdkIsQ0FBQTtFQUN0QyxPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsRUFBcUIsSUFBckI7U0FDQSxXQUFBLENBQVksR0FBWixFQUFpQixHQUFqQixFQUFzQixJQUF0QjtBQUZzQyxDQUF4Qzs7QUFJQSxNQUFBLEdBQVMsQ0FBRSxTQUFGLEVBQWEsV0FBYixFQUEwQixTQUExQixFQUFxQyxNQUFyQyxFQUNQLFNBRE8sRUFDSSxRQURKLEVBQ2MsT0FEZCxFQUN1QixNQUR2Qjs7QUFHVCxLQUFBLHdDQUFBOztFQUNLLENBQUEsUUFBQSxDQUFDLEtBQUQsQ0FBQTtXQUNELGNBQWMsQ0FBQyxLQUFmLENBQXFCLEtBQXJCLEVBQTRCLFFBQUEsQ0FBQyxHQUFELEVBQU0sT0FBSyxLQUFYLENBQUE7YUFDMUIsV0FBQSxDQUFZLEdBQVosRUFBaUIsS0FBakIsRUFBd0IsSUFBeEI7SUFEMEIsQ0FBNUI7RUFEQyxDQUFBLENBQUgsQ0FBSSxLQUFKO0FBREY7O0FBTUEsY0FBYyxDQUFDLEtBQWYsQ0FBcUIsZ0JBQXJCLEVBQXVDLFFBQUEsQ0FBQyxLQUFELENBQUE7U0FDckMsdUJBQXVCLENBQUMsTUFBeEIsQ0FBK0IsS0FBL0I7QUFEcUMsQ0FBdkM7O0FBR0EsY0FBYyxDQUFDLEtBQWYsQ0FBcUIsV0FBckIsRUFBa0MsUUFBQSxDQUFDLEdBQUQsQ0FBQTtBQUNoQyxNQUFBLEdBQUEsRUFBQTtFQUFBLEdBQUEsdURBQXVCLENBQUU7RUFDekIsSUFBRyxDQUFJLEdBQVA7SUFDRSxHQUFBLEdBQU0sR0FBRyxDQUFDLFdBRFo7O1NBRUEsV0FBQSxDQUFZLEdBQVosRUFBaUIsUUFBakI7QUFKZ0MsQ0FBbEM7O0FBT0EsT0FBQTtFQUFRLHFCQUFSIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kZWwsIENvbGxlY3Rpb24sIFJhZGlvIH0gZnJvbSAnYmFja2JvbmUnXG5cbk1lc3NhZ2VDaGFubmVsID0gUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5cbmNsYXNzIEJhc2VNZXNzYWdlIGV4dGVuZHMgTW9kZWxcbiAgZGVmYXVsdHM6XG4gICAgbGV2ZWw6ICdpbmZvJ1xuICBcbmNsYXNzIEJhc2VNZXNzYWdlQ29sbGVjdGlvbiBleHRlbmRzIENvbGxlY3Rpb25cbiAgbW9kZWw6IEJhc2VNZXNzYWdlXG5cbm1haW5fbWVzc2FnZV9jb2xsZWN0aW9uID0gbmV3IEJhc2VNZXNzYWdlQ29sbGVjdGlvblxuTWVzc2FnZUNoYW5uZWwucmVwbHkgJ21lc3NhZ2VzJywgLT5cbiAgbWFpbl9tZXNzYWdlX2NvbGxlY3Rpb25cblxuYWRkX21lc3NhZ2UgPSAobXNnLCBsZXZlbCwgaWNvbj1mYWxzZSwgZGVsYXk9NjAwMCkgLT5cbiAgbWVzc2FnZSA9IG5ldyBCYXNlTWVzc2FnZVxuICAgIGNvbnRlbnQ6IG1zZ1xuICAgIGxldmVsOiBsZXZlbFxuICAgIGljb246IGljb25cbiAgIyMgRklYTUUgbWFrZSBkZWxheSBjb25maWd1cmFibGVcbiAgI2RlbGF5ID0gNjAwMFxuICB1bmxlc3MgbGV2ZWwgaXMgJ2RhbmdlcidcbiAgICBkZXN0cm95ID0gLT4gbWFpbl9tZXNzYWdlX2NvbGxlY3Rpb24ucmVtb3ZlIG1lc3NhZ2VcbiAgICBzZXRUaW1lb3V0IGRlc3Ryb3ksIGRlbGF5XG4gIG1haW5fbWVzc2FnZV9jb2xsZWN0aW9uLmFkZCBtZXNzYWdlXG4gIFxuTWVzc2FnZUNoYW5uZWwucmVwbHkgJ2Rpc3BsYXktbWVzc2FnZScsIChtc2csIGx2bD0naW5mbycsIGljb249ZmFsc2UpIC0+XG4gIGNvbnNvbGUud2FybiAnaWNvbicsIGljb25cbiAgYWRkX21lc3NhZ2UgbXNnLCBsdmwsIGljb25cblxubGV2ZWxzID0gWyAncHJpbWFyeScsICdzZWNvbmRhcnknLCAnc3VjY2VzcycsICdpbmZvJyxcbiAgJ3dhcm5pbmcnLCAnZGFuZ2VyJywgJ2xpZ2h0JywgJ2RhcmsnXVxuXG5mb3IgbGV2ZWwgaW4gbGV2ZWxzXG4gIGRvIChsZXZlbCkgLT5cbiAgICBNZXNzYWdlQ2hhbm5lbC5yZXBseSBsZXZlbCwgKG1zZywgaWNvbj1mYWxzZSkgLT5cbiAgICAgIGFkZF9tZXNzYWdlIG1zZywgbGV2ZWwsIGljb25cbiAgICAgIFxuXG5NZXNzYWdlQ2hhbm5lbC5yZXBseSAnZGVsZXRlLW1lc3NhZ2UnLCAobW9kZWwpIC0+XG4gIG1haW5fbWVzc2FnZV9jb2xsZWN0aW9uLnJlbW92ZSBtb2RlbFxuXG5NZXNzYWdlQ2hhbm5lbC5yZXBseSAneGhyLWVycm9yJywgKHhocikgLT5cbiAgbXNnID0geGhyPy5yZXNwb25zZUpTT04/Lm1lc3NhZ2VcbiAgaWYgbm90IG1zZ1xuICAgIG1zZyA9IHhoci5zdGF0dXNUZXh0XG4gIGFkZF9tZXNzYWdlIG1zZywgJ2RhbmdlcidcbiAgXG5cbmV4cG9ydCB7QmFzZU1lc3NhZ2VDb2xsZWN0aW9ufVxuXG5cbiJdfQ==
