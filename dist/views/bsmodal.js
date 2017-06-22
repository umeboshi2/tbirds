var $, AppChannel, Backbone, BaseModalView, MainChannel, Marionette, MessageChannel,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$ = require('jquery');

Backbone = require('backbone');

Marionette = require('backbone.marionette');

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

AppChannel = Backbone.Radio.channel('ebcsv');

BaseModalView = (function(superClass) {
  extend(BaseModalView, superClass);

  function BaseModalView() {
    this.keydownHandler = bind(this.keydownHandler, this);
    return BaseModalView.__super__.constructor.apply(this, arguments);
  }

  BaseModalView.prototype.ui = {
    html: 'html',
    close_btn: '#close-modal div'
  };

  BaseModalView.prototype.keydownHandler = function(event_object) {
    var keyCode;
    keyCode = event_object.keyCode;
    if (keyCode === 27) {
      return this.ui.close_btn.click();
    }
  };

  BaseModalView.prototype.onDomRefresh = function() {
    return this.ui.html.keydown(this.keydownHandler);
  };

  BaseModalView.prototype.onBeforeDestroy = function() {
    return this.ui.html.unbind('keydown', this.keydownHandler);
  };

  return BaseModalView;

})(Marionette.View);

module.exports = BaseModalView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvYnNtb2RhbC5qcyIsInNvdXJjZXMiOlsidmlld3MvYnNtb2RhbC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSwrRUFBQTtFQUFBOzs7O0FBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxRQUFSOztBQUNKLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFDWCxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUViLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsY0FBQSxHQUFpQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsVUFBdkI7O0FBQ2pCLFVBQUEsR0FBYSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsT0FBdkI7O0FBRVA7Ozs7Ozs7OzBCQUNKLEVBQUEsR0FDRTtJQUFBLElBQUEsRUFBTSxNQUFOO0lBQ0EsU0FBQSxFQUFXLGtCQURYOzs7MEJBR0YsY0FBQSxHQUFnQixTQUFDLFlBQUQ7QUFDZCxRQUFBO0lBQUEsT0FBQSxHQUFVLFlBQVksQ0FBQztJQUd2QixJQUFHLE9BQUEsS0FBVyxFQUFkO2FBQ0UsSUFBQyxDQUFBLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBZCxDQUFBLEVBREY7O0VBSmM7OzBCQU9oQixZQUFBLEdBQWMsU0FBQTtXQUNaLElBQUMsQ0FBQSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQVQsQ0FBaUIsSUFBQyxDQUFBLGNBQWxCO0VBRFk7OzBCQUdkLGVBQUEsR0FBaUIsU0FBQTtXQUNmLElBQUMsQ0FBQSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQVQsQ0FBZ0IsU0FBaEIsRUFBMkIsSUFBQyxDQUFBLGNBQTVCO0VBRGU7Ozs7R0FmUyxVQUFVLENBQUM7O0FBa0J2QyxNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIiQgPSByZXF1aXJlICdqcXVlcnknXG5CYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdtZXNzYWdlcydcbkFwcENoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdlYmNzdidcblxuY2xhc3MgQmFzZU1vZGFsVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICB1aTpcbiAgICBodG1sOiAnaHRtbCdcbiAgICBjbG9zZV9idG46ICcjY2xvc2UtbW9kYWwgZGl2J1xuICAgIFxuICBrZXlkb3duSGFuZGxlcjogKGV2ZW50X29iamVjdCkgPT5cbiAgICBrZXlDb2RlID0gZXZlbnRfb2JqZWN0LmtleUNvZGVcbiAgICAjY29uc29sZS5sb2cgXCJrZXlDb2RlXCIsIGtleUNvZGVcbiAgICAjIGhhbmRsZSBlc2NhcGUoJ2VzYycpIGtleVxuICAgIGlmIGtleUNvZGUgPT0gMjdcbiAgICAgIEB1aS5jbG9zZV9idG4uY2xpY2soKVxuICAgICAgXG4gIG9uRG9tUmVmcmVzaDogLT5cbiAgICBAdWkuaHRtbC5rZXlkb3duIEBrZXlkb3duSGFuZGxlclxuXG4gIG9uQmVmb3JlRGVzdHJveTogLT5cbiAgICBAdWkuaHRtbC51bmJpbmQgJ2tleWRvd24nLCBAa2V5ZG93bkhhbmRsZXJcbiAgXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VNb2RhbFZpZXdcblxuXG4iXX0=
