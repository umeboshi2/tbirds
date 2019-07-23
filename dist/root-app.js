var MainChannel, RootApp;

import Backbone from 'backbone';

import {
  App
} from 'marionette.toolkit';

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
  class RootApp extends App {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC1hcHAuanMiLCJzb3VyY2VzIjpbInJvb3QtYXBwLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFdBQUEsRUFBQTs7QUFBQSxPQUFPLFFBQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVMsR0FBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxFQUFQLE1BQUE7O0FBRUEsT0FBTyxXQUFQLE1BQUE7O0FBQ0EsT0FBTyxTQUFQLE1BQUE7O0FBQ0EsT0FBTyxjQUFQLE1BQUE7O0FBRUEsSUFBRyxpQkFBSDtFQUNFLE9BQUEsQ0FBUSx1QkFBUixFQURGOzs7QUFHQSxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUVkLE9BQUEsSUFBYTtFQUFOLE1BQUEsV0FBQSxRQUF5QixRQUFRLENBQUMsTUFBbEMsQ0FBQTs7dUJBQ0wsUUFBQSxHQUNFO0lBQUEsWUFBQSxFQUFjLElBQWQ7SUFDQSxTQUFBLEVBQVcsQ0FBQTtFQURYOzs7Ozs7QUFHRTtFQUFOLE1BQUEsUUFBQSxRQUFzQixJQUF0QjtJQUVFLFVBQVksQ0FBQyxPQUFELENBQUE7QUFDVixVQUFBLFNBQUEsRUFBQSxHQUFBLEVBQUE7TUFBQSxJQUFDLENBQUEsU0FBRCxDQUFXLE9BQVg7TUFDQSxHQUFBLEdBQU0sSUFBQyxDQUFBLFNBQUQsQ0FBVyxXQUFYO01BQ04sU0FBQSxrQkFBWSxHQUFHLENBQUUsZ0JBQUwsSUFBZTtNQUMzQixNQUFBLEdBQVMsSUFBSSxTQUFKLENBQWMsR0FBRyxDQUFDLGFBQWxCO2FBQ1QsSUFBQyxDQUFBLFFBQUQsQ0FBVSxNQUFWO0lBTFU7O0lBT1osT0FBUyxDQUFDLE9BQUQsQ0FBQTtBQUNQLFVBQUE7TUFBQSxDQUFBLEdBQUksV0FBVyxDQUFDLE9BQVosQ0FBb0IsaUJBQXBCO2FBQ0osQ0FBQyxDQUFDLGFBQUYsQ0FBQTtJQUZPOztFQVRYOztvQkFDRSxVQUFBLEdBQVk7Ozs7OztBQVlkLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCB7IEFwcCB9IGZyb20gJ21hcmlvbmV0dGUudG9vbGtpdCdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5cbmltcG9ydCBNZXNzYWdlc0FwcCBmcm9tICcuL3RrbWVzc2FnZXMnXG5pbXBvcnQgTmF2YmFyQXBwIGZyb20gJy4vdGtuYXZiYXInXG5pbXBvcnQgTWFpblBhZ2VMYXlvdXQgZnJvbSAnLi90a2xheW91dCdcblxuaWYgX191c2VDc3NNb2R1bGVzX19cbiAgcmVxdWlyZSBcIi4uL3Nhc3MvdGtsYXlvdXQuc2Nzc1wiXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuXG5leHBvcnQgY2xhc3MgVGtBcHBTdGF0ZSBleHRlbmRzIEJhY2tib25lLk1vZGVsXG4gIGRlZmF1bHRzOlxuICAgIHN0YXJ0SGlzdG9yeTogdHJ1ZVxuICAgIGFwcENvbmZpZzoge31cblxuY2xhc3MgUm9vdEFwcCBleHRlbmRzIEFwcFxuICBTdGF0ZU1vZGVsOiBUa0FwcFN0YXRlXG4gIGluaXRpYWxpemU6IChvcHRpb25zKSAtPlxuICAgIEBpbml0U3RhdGUgb3B0aW9uc1xuICAgIGNmZyA9IEBnZXRPcHRpb24gJ2FwcENvbmZpZydcbiAgICBBcHBMYXlvdXQgPSBjZmc/LmxheW91dCBvciBNYWluUGFnZUxheW91dFxuICAgIGxheW91dCA9IG5ldyBBcHBMYXlvdXQgY2ZnLmxheW91dE9wdGlvbnNcbiAgICBAc2hvd1ZpZXcgbGF5b3V0XG5cbiAgb25TdGFydDogKG9wdGlvbnMpIC0+XG4gICAgYyA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW4tY29udHJvbGxlcidcbiAgICBjLmxvYWRGcm9udERvb3IoKVxuXG5leHBvcnQgZGVmYXVsdCBSb290QXBwXG5cbiAgICBcbiAgICBcbiJdfQ==
