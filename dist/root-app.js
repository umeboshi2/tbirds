var MainChannel, RootApp;

import Backbone from 'backbone';

import Toolkit from 'marionette.toolkit';

import tc from 'teacup';

import MessagesApp from './tkmessages';

import NavbarApp from './tknavbar';

import MainPageLayout from './tklayout';

if (__useCssModules__) {
  require("../sass/tklayout.scss");
}

MainChannel = Backbone.Radio.channel('global');

export var TkAppState = (function() {
  class TkAppState extends Backbone.Model {};

  TkAppState.prototype.defaults = {
    startHistory: true,
    appConfig: {}
  };

  return TkAppState;

}).call(this);

RootApp = (function() {
  class RootApp extends Toolkit.App {
    initialize(options) {
      var AppLayout, cfg, layout;
      this.initState(options);
      cfg = this.getOption('appConfig');
      AppLayout = (cfg != null ? cfg.layout : void 0) || MainPageLayout;
      layout = new AppLayout(cfg.layoutOptions);
      return this.showView(layout);
    }

    onStart(options) {
      var c;
      c = MainChannel.request('main-controller');
      return c.loadFrontDoor();
    }

  };

  RootApp.prototype.StateModel = TkAppState;

  return RootApp;

}).call(this);

export default RootApp;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC1hcHAuanMiLCJzb3VyY2VzIjpbInJvb3QtYXBwLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFdBQUEsRUFBQTs7QUFBQSxPQUFPLFFBQVAsTUFBQTs7QUFDQSxPQUFPLE9BQVAsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQTs7QUFFQSxPQUFPLFdBQVAsTUFBQTs7QUFDQSxPQUFPLFNBQVAsTUFBQTs7QUFDQSxPQUFPLGNBQVAsTUFBQTs7QUFFQSxJQUFHLGlCQUFIO0VBQ0UsT0FBQSxDQUFRLHVCQUFSLEVBREY7OztBQUdBLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBRWQsT0FBQSxJQUFhO0VBQU4sTUFBQSxXQUFBLFFBQXlCLFFBQVEsQ0FBQyxNQUFsQyxDQUFBOzt1QkFDTCxRQUFBLEdBQ0U7SUFBQSxZQUFBLEVBQWMsSUFBZDtJQUNBLFNBQUEsRUFBVyxDQUFBO0VBRFg7Ozs7OztBQUdFO0VBQU4sTUFBQSxRQUFBLFFBQXNCLE9BQU8sQ0FBQyxJQUE5QjtJQUVFLFVBQVksQ0FBQyxPQUFELENBQUE7QUFDVixVQUFBLFNBQUEsRUFBQSxHQUFBLEVBQUE7TUFBQSxJQUFDLENBQUEsU0FBRCxDQUFXLE9BQVg7TUFDQSxHQUFBLEdBQU0sSUFBQyxDQUFBLFNBQUQsQ0FBVyxXQUFYO01BQ04sU0FBQSxrQkFBWSxHQUFHLENBQUUsZ0JBQUwsSUFBZTtNQUMzQixNQUFBLEdBQVMsSUFBSSxTQUFKLENBQWMsR0FBRyxDQUFDLGFBQWxCO2FBQ1QsSUFBQyxDQUFBLFFBQUQsQ0FBVSxNQUFWO0lBTFU7O0lBT1osT0FBUyxDQUFDLE9BQUQsQ0FBQTtBQUNQLFVBQUE7TUFBQSxDQUFBLEdBQUksV0FBVyxDQUFDLE9BQVosQ0FBb0IsaUJBQXBCO2FBQ0osQ0FBQyxDQUFDLGFBQUYsQ0FBQTtJQUZPOztFQVRYOztvQkFDRSxVQUFBLEdBQVk7Ozs7OztBQVlkLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCBUb29sa2l0IGZyb20gJ21hcmlvbmV0dGUudG9vbGtpdCdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5cbmltcG9ydCBNZXNzYWdlc0FwcCBmcm9tICcuL3RrbWVzc2FnZXMnXG5pbXBvcnQgTmF2YmFyQXBwIGZyb20gJy4vdGtuYXZiYXInXG5pbXBvcnQgTWFpblBhZ2VMYXlvdXQgZnJvbSAnLi90a2xheW91dCdcblxuaWYgX191c2VDc3NNb2R1bGVzX19cbiAgcmVxdWlyZSBcIi4uL3Nhc3MvdGtsYXlvdXQuc2Nzc1wiXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuXG5leHBvcnQgY2xhc3MgVGtBcHBTdGF0ZSBleHRlbmRzIEJhY2tib25lLk1vZGVsXG4gIGRlZmF1bHRzOlxuICAgIHN0YXJ0SGlzdG9yeTogdHJ1ZVxuICAgIGFwcENvbmZpZzoge31cblxuY2xhc3MgUm9vdEFwcCBleHRlbmRzIFRvb2xraXQuQXBwXG4gIFN0YXRlTW9kZWw6IFRrQXBwU3RhdGVcbiAgaW5pdGlhbGl6ZTogKG9wdGlvbnMpIC0+XG4gICAgQGluaXRTdGF0ZSBvcHRpb25zXG4gICAgY2ZnID0gQGdldE9wdGlvbiAnYXBwQ29uZmlnJ1xuICAgIEFwcExheW91dCA9IGNmZz8ubGF5b3V0IG9yIE1haW5QYWdlTGF5b3V0XG4gICAgbGF5b3V0ID0gbmV3IEFwcExheW91dCBjZmcubGF5b3V0T3B0aW9uc1xuICAgIEBzaG93VmlldyBsYXlvdXRcblxuICBvblN0YXJ0OiAob3B0aW9ucykgLT5cbiAgICBjID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbi1jb250cm9sbGVyJ1xuICAgIGMubG9hZEZyb250RG9vcigpXG5cbmV4cG9ydCBkZWZhdWx0IFJvb3RBcHBcblxuICAgIFxuICAgIFxuIl19
