var Backbone, BaseMessage, BaseMessageCollection, MainChannel, MessageChannel, add_message, fn, i, len, level, main_message_collection, ref,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

BaseMessage = (function(superClass) {
  extend(BaseMessage, superClass);

  function BaseMessage() {
    return BaseMessage.__super__.constructor.apply(this, arguments);
  }

  BaseMessage.prototype.defaults = {
    level: 'info'
  };

  return BaseMessage;

})(Backbone.Model);

BaseMessageCollection = (function(superClass) {
  extend(BaseMessageCollection, superClass);

  function BaseMessageCollection() {
    return BaseMessageCollection.__super__.constructor.apply(this, arguments);
  }

  BaseMessageCollection.prototype.model = BaseMessage;

  return BaseMessageCollection;

})(Backbone.Collection);

main_message_collection = new BaseMessageCollection;

MessageChannel.reply('messages', function() {
  return main_message_collection;
});

add_message = (function(_this) {
  return function(msg, level, icon, delay) {
    var destroy, message;
    if (icon == null) {
      icon = false;
    }
    if (delay == null) {
      delay = 6000;
    }
    message = new BaseMessage({
      content: msg,
      level: level,
      icon: icon
    });
    if (level !== 'danger') {
      destroy = function() {
        return main_message_collection.remove(message);
      };
      setTimeout(destroy, delay);
    }
    return main_message_collection.add(message);
  };
})(this);

MessageChannel.reply('display-message', (function(_this) {
  return function(msg, lvl, icon) {
    if (lvl == null) {
      lvl = 'info';
    }
    if (icon == null) {
      icon = false;
    }
    console.warn('icon', icon);
    return add_message(msg, lvl, icon);
  };
})(this));

ref = ['success', 'info', 'warning', 'danger'];
fn = function(level) {
  return MessageChannel.reply(level, (function(_this) {
    return function(msg, icon) {
      if (icon == null) {
        icon = false;
      }
      return add_message(msg, level, icon);
    };
  })(this));
};
for (i = 0, len = ref.length; i < len; i++) {
  level = ref[i];
  fn(level);
}

MessageChannel.reply('delete-message', (function(_this) {
  return function(model) {
    return main_message_collection.remove(model);
  };
})(this));

module.exports = {
  BaseMessageCollection: BaseMessageCollection
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuanMiLCJzb3VyY2VzIjpbIm1lc3NhZ2VzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLHVJQUFBO0VBQUE7OztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFFWCxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCOztBQUVYOzs7Ozs7O3dCQUNKLFFBQUEsR0FDRTtJQUFBLEtBQUEsRUFBTyxNQUFQOzs7OztHQUZzQixRQUFRLENBQUM7O0FBSTdCOzs7Ozs7O2tDQUNKLEtBQUEsR0FBTzs7OztHQUQyQixRQUFRLENBQUM7O0FBRzdDLHVCQUFBLEdBQTBCLElBQUk7O0FBQzlCLGNBQWMsQ0FBQyxLQUFmLENBQXFCLFVBQXJCLEVBQWlDLFNBQUE7U0FDL0I7QUFEK0IsQ0FBakM7O0FBR0EsV0FBQSxHQUFjLENBQUEsU0FBQSxLQUFBO1NBQUEsU0FBQyxHQUFELEVBQU0sS0FBTixFQUFhLElBQWIsRUFBeUIsS0FBekI7QUFDWixRQUFBOztNQUR5QixPQUFLOzs7TUFBTyxRQUFNOztJQUMzQyxPQUFBLEdBQVUsSUFBSSxXQUFKLENBQ1I7TUFBQSxPQUFBLEVBQVMsR0FBVDtNQUNBLEtBQUEsRUFBTyxLQURQO01BRUEsSUFBQSxFQUFNLElBRk47S0FEUTtJQU1WLElBQU8sS0FBQSxLQUFTLFFBQWhCO01BQ0UsT0FBQSxHQUFVLFNBQUE7ZUFBRyx1QkFBdUIsQ0FBQyxNQUF4QixDQUErQixPQUEvQjtNQUFIO01BQ1YsVUFBQSxDQUFXLE9BQVgsRUFBb0IsS0FBcEIsRUFGRjs7V0FHQSx1QkFBdUIsQ0FBQyxHQUF4QixDQUE0QixPQUE1QjtFQVZZO0FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQTs7QUFZZCxjQUFjLENBQUMsS0FBZixDQUFxQixpQkFBckIsRUFBd0MsQ0FBQSxTQUFBLEtBQUE7U0FBQSxTQUFDLEdBQUQsRUFBTSxHQUFOLEVBQWtCLElBQWxCOztNQUFNLE1BQUk7OztNQUFRLE9BQUs7O0lBQzdELE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixFQUFxQixJQUFyQjtXQUNBLFdBQUEsQ0FBWSxHQUFaLEVBQWlCLEdBQWpCLEVBQXNCLElBQXRCO0VBRnNDO0FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF4Qzs7QUFJQTtLQUNLLFNBQUMsS0FBRDtTQUNELGNBQWMsQ0FBQyxLQUFmLENBQXFCLEtBQXJCLEVBQTRCLENBQUEsU0FBQSxLQUFBO1dBQUEsU0FBQyxHQUFELEVBQU0sSUFBTjs7UUFBTSxPQUFLOzthQUNyQyxXQUFBLENBQVksR0FBWixFQUFpQixLQUFqQixFQUF3QixJQUF4QjtJQUQwQjtFQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBNUI7QUFEQztBQURMLEtBQUEscUNBQUE7O0tBQ007QUFETjs7QUFNQSxjQUFjLENBQUMsS0FBZixDQUFxQixnQkFBckIsRUFBdUMsQ0FBQSxTQUFBLEtBQUE7U0FBQSxTQUFDLEtBQUQ7V0FDckMsdUJBQXVCLENBQUMsTUFBeEIsQ0FBK0IsS0FBL0I7RUFEcUM7QUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXZDOztBQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7RUFBQSxxQkFBQSxFQUF1QixxQkFBdkIiLCJzb3VyY2VzQ29udGVudCI6WyJCYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5cbmNsYXNzIEJhc2VNZXNzYWdlIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcbiAgZGVmYXVsdHM6XG4gICAgbGV2ZWw6ICdpbmZvJ1xuICBcbmNsYXNzIEJhc2VNZXNzYWdlQ29sbGVjdGlvbiBleHRlbmRzIEJhY2tib25lLkNvbGxlY3Rpb25cbiAgbW9kZWw6IEJhc2VNZXNzYWdlXG5cbm1haW5fbWVzc2FnZV9jb2xsZWN0aW9uID0gbmV3IEJhc2VNZXNzYWdlQ29sbGVjdGlvblxuTWVzc2FnZUNoYW5uZWwucmVwbHkgJ21lc3NhZ2VzJywgLT5cbiAgbWFpbl9tZXNzYWdlX2NvbGxlY3Rpb25cblxuYWRkX21lc3NhZ2UgPSAobXNnLCBsZXZlbCwgaWNvbj1mYWxzZSwgZGVsYXk9NjAwMCkgPT5cbiAgbWVzc2FnZSA9IG5ldyBCYXNlTWVzc2FnZVxuICAgIGNvbnRlbnQ6IG1zZ1xuICAgIGxldmVsOiBsZXZlbFxuICAgIGljb246IGljb25cbiAgIyMgRklYTUUgbWFrZSBkZWxheSBjb25maWd1cmFibGVcbiAgI2RlbGF5ID0gNjAwMFxuICB1bmxlc3MgbGV2ZWwgaXMgJ2RhbmdlcidcbiAgICBkZXN0cm95ID0gLT4gbWFpbl9tZXNzYWdlX2NvbGxlY3Rpb24ucmVtb3ZlIG1lc3NhZ2VcbiAgICBzZXRUaW1lb3V0IGRlc3Ryb3ksIGRlbGF5XG4gIG1haW5fbWVzc2FnZV9jb2xsZWN0aW9uLmFkZCBtZXNzYWdlXG4gIFxuTWVzc2FnZUNoYW5uZWwucmVwbHkgJ2Rpc3BsYXktbWVzc2FnZScsIChtc2csIGx2bD0naW5mbycsIGljb249ZmFsc2UpID0+XG4gIGNvbnNvbGUud2FybiAnaWNvbicsIGljb25cbiAgYWRkX21lc3NhZ2UgbXNnLCBsdmwsIGljb25cblxuZm9yIGxldmVsIGluIFsnc3VjY2VzcycsICdpbmZvJywgJ3dhcm5pbmcnLCAnZGFuZ2VyJ11cbiAgZG8gKGxldmVsKSAtPlxuICAgIE1lc3NhZ2VDaGFubmVsLnJlcGx5IGxldmVsLCAobXNnLCBpY29uPWZhbHNlKSA9PlxuICAgICAgYWRkX21lc3NhZ2UgbXNnLCBsZXZlbCwgaWNvblxuICAgICAgXG5cbk1lc3NhZ2VDaGFubmVsLnJlcGx5ICdkZWxldGUtbWVzc2FnZScsIChtb2RlbCkgPT5cbiAgbWFpbl9tZXNzYWdlX2NvbGxlY3Rpb24ucmVtb3ZlIG1vZGVsXG5cbm1vZHVsZS5leHBvcnRzID1cbiAgQmFzZU1lc3NhZ2VDb2xsZWN0aW9uOiBCYXNlTWVzc2FnZUNvbGxlY3Rpb25cbiAgXG5cbiJdfQ==
