var MainChannel, RootApp;

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC1hcHAuanMiLCJzb3VyY2VzIjpbInJvb3QtYXBwLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFdBQUEsRUFBQTs7QUFBQSxPQUFPLFFBQVAsTUFBQTs7QUFDQSxPQUFPLFVBQVAsTUFBQTs7QUFDQSxPQUFPLE9BQVAsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQTs7QUFFQSxPQUFPLFdBQVAsTUFBQTs7QUFDQSxPQUFPLFNBQVAsTUFBQTs7QUFDQSxPQUFPLGNBQVAsTUFBQTs7QUFFQSxJQUFHLGlCQUFIO0VBQ0UsT0FBQSxDQUFRLHVCQUFSLEVBREY7OztBQUdBLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBRWQsT0FBQSxJQUFhO0VBQU4sTUFBQSxXQUFBLFFBQXlCLFFBQVEsQ0FBQyxNQUFsQyxDQUFBOzt1QkFDTCxRQUFBLEdBQ0U7SUFBQSxZQUFBLEVBQWMsSUFBZDtJQUNBLFNBQUEsRUFBVyxDQUFBO0VBRFg7Ozs7OztBQUdFO0VBQU4sTUFBQSxRQUFBLFFBQXNCLE9BQU8sQ0FBQyxJQUE5QjtJQUVFLFVBQVksQ0FBQyxPQUFELENBQUE7QUFDVixVQUFBLFNBQUEsRUFBQSxHQUFBLEVBQUE7TUFBQSxJQUFDLENBQUEsU0FBRCxDQUFXLE9BQVg7TUFDQSxHQUFBLEdBQU0sSUFBQyxDQUFBLFNBQUQsQ0FBVyxXQUFYO01BQ04sU0FBQSxrQkFBWSxHQUFHLENBQUUsZ0JBQUwsSUFBZTtNQUMzQixNQUFBLEdBQVMsSUFBSSxTQUFKLENBQWMsR0FBRyxDQUFDLGFBQWxCO2FBQ1QsSUFBQyxDQUFBLFFBQUQsQ0FBVSxNQUFWO0lBTFU7O0lBT1osT0FBUyxDQUFDLE9BQUQsQ0FBQTtBQUNQLFVBQUE7TUFBQSxDQUFBLEdBQUksV0FBVyxDQUFDLE9BQVosQ0FBb0IsaUJBQXBCO2FBQ0osQ0FBQyxDQUFDLGFBQUYsQ0FBQTtJQUZPOztFQVRYOztvQkFDRSxVQUFBLEdBQVk7Ozs7OztBQVlkLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgVG9vbGtpdCBmcm9tICdtYXJpb25ldHRlLnRvb2xraXQnXG5pbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuXG5pbXBvcnQgTWVzc2FnZXNBcHAgZnJvbSAnLi90a21lc3NhZ2VzJ1xuaW1wb3J0IE5hdmJhckFwcCBmcm9tICcuL3RrbmF2YmFyJ1xuaW1wb3J0IE1haW5QYWdlTGF5b3V0IGZyb20gJy4vdGtsYXlvdXQnXG5cbmlmIF9fdXNlQ3NzTW9kdWxlc19fXG4gIHJlcXVpcmUgXCIuLi9zYXNzL3RrbGF5b3V0LnNjc3NcIlxuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcblxuZXhwb3J0IGNsYXNzIFRrQXBwU3RhdGUgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuICBkZWZhdWx0czpcbiAgICBzdGFydEhpc3Rvcnk6IHRydWVcbiAgICBhcHBDb25maWc6IHt9XG5cbmNsYXNzIFJvb3RBcHAgZXh0ZW5kcyBUb29sa2l0LkFwcFxuICBTdGF0ZU1vZGVsOiBUa0FwcFN0YXRlXG4gIGluaXRpYWxpemU6IChvcHRpb25zKSAtPlxuICAgIEBpbml0U3RhdGUgb3B0aW9uc1xuICAgIGNmZyA9IEBnZXRPcHRpb24gJ2FwcENvbmZpZydcbiAgICBBcHBMYXlvdXQgPSBjZmc/LmxheW91dCBvciBNYWluUGFnZUxheW91dFxuICAgIGxheW91dCA9IG5ldyBBcHBMYXlvdXQgY2ZnLmxheW91dE9wdGlvbnNcbiAgICBAc2hvd1ZpZXcgbGF5b3V0XG5cbiAgb25TdGFydDogKG9wdGlvbnMpIC0+XG4gICAgYyA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW4tY29udHJvbGxlcidcbiAgICBjLmxvYWRGcm9udERvb3IoKVxuXG5leHBvcnQgZGVmYXVsdCBSb290QXBwXG5cbiAgICBcbiAgICBcbiJdfQ==
