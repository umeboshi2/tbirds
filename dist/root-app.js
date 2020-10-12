var MainChannel, RootApp;

import {
  Model,
  Radio
} from 'backbone';

import {
  App
} from 'marionette.toolkit';

import MainPageLayout from './tklayout';

if (__useCssModules__) {
  require("../sass/tklayout.scss");
}

MainChannel = Radio.channel('global');

export var TkAppState = (function() {
  class TkAppState extends Model {};

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

    onStart() {
      var c;
      c = MainChannel.request('main-controller');
      return c.loadFrontDoor();
    }

  };

  RootApp.prototype.StateModel = TkAppState;

  return RootApp;

}).call(this);

export default RootApp;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC1hcHAuanMiLCJzb3VyY2VzIjpbInJvb3QtYXBwLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFdBQUEsRUFBQTs7QUFBQSxPQUFBO0VBQVMsS0FBVDtFQUFnQixLQUFoQjtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLEdBQVQ7Q0FBQSxNQUFBOztBQUVBLE9BQU8sY0FBUCxNQUFBOztBQUVBLElBQUcsaUJBQUg7RUFDRSxPQUFBLENBQVEsdUJBQVIsRUFERjs7O0FBR0EsV0FBQSxHQUFjLEtBQUssQ0FBQyxPQUFOLENBQWMsUUFBZDs7QUFFZCxPQUFBLElBQWE7RUFBTixNQUFBLFdBQUEsUUFBeUIsTUFBekIsQ0FBQTs7dUJBQ0wsUUFBQSxHQUNFO0lBQUEsWUFBQSxFQUFjLElBQWQ7SUFDQSxTQUFBLEVBQVcsQ0FBQTtFQURYOzs7Ozs7QUFHRTtFQUFOLE1BQUEsUUFBQSxRQUFzQixJQUF0QjtJQUVFLFVBQVksQ0FBQyxPQUFELENBQUE7QUFDZCxVQUFBLFNBQUEsRUFBQSxHQUFBLEVBQUE7TUFBSSxJQUFDLENBQUEsU0FBRCxDQUFXLE9BQVg7TUFDQSxHQUFBLEdBQU0sSUFBQyxDQUFBLFNBQUQsQ0FBVyxXQUFYO01BQ04sU0FBQSxrQkFBWSxHQUFHLENBQUUsZ0JBQUwsSUFBZTtNQUMzQixNQUFBLEdBQVMsSUFBSSxTQUFKLENBQWMsR0FBRyxDQUFDLGFBQWxCO2FBQ1QsSUFBQyxDQUFBLFFBQUQsQ0FBVSxNQUFWO0lBTFU7O0lBT1osT0FBUyxDQUFBLENBQUE7QUFDWCxVQUFBO01BQUksQ0FBQSxHQUFJLFdBQVcsQ0FBQyxPQUFaLENBQW9CLGlCQUFwQjthQUNKLENBQUMsQ0FBQyxhQUFGLENBQUE7SUFGTzs7RUFUWDs7b0JBQ0UsVUFBQSxHQUFZOzs7Ozs7QUFZZCxPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2RlbCwgUmFkaW8gfSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCB7IEFwcCB9IGZyb20gJ21hcmlvbmV0dGUudG9vbGtpdCdcblxuaW1wb3J0IE1haW5QYWdlTGF5b3V0IGZyb20gJy4vdGtsYXlvdXQnXG5cbmlmIF9fdXNlQ3NzTW9kdWxlc19fXG4gIHJlcXVpcmUgXCIuLi9zYXNzL3RrbGF5b3V0LnNjc3NcIlxuXG5NYWluQ2hhbm5lbCA9IFJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcblxuZXhwb3J0IGNsYXNzIFRrQXBwU3RhdGUgZXh0ZW5kcyBNb2RlbFxuICBkZWZhdWx0czpcbiAgICBzdGFydEhpc3Rvcnk6IHRydWVcbiAgICBhcHBDb25maWc6IHt9XG5cbmNsYXNzIFJvb3RBcHAgZXh0ZW5kcyBBcHBcbiAgU3RhdGVNb2RlbDogVGtBcHBTdGF0ZVxuICBpbml0aWFsaXplOiAob3B0aW9ucykgLT5cbiAgICBAaW5pdFN0YXRlIG9wdGlvbnNcbiAgICBjZmcgPSBAZ2V0T3B0aW9uICdhcHBDb25maWcnXG4gICAgQXBwTGF5b3V0ID0gY2ZnPy5sYXlvdXQgb3IgTWFpblBhZ2VMYXlvdXRcbiAgICBsYXlvdXQgPSBuZXcgQXBwTGF5b3V0IGNmZy5sYXlvdXRPcHRpb25zXG4gICAgQHNob3dWaWV3IGxheW91dFxuXG4gIG9uU3RhcnQ6IC0+XG4gICAgYyA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW4tY29udHJvbGxlcidcbiAgICBjLmxvYWRGcm9udERvb3IoKVxuXG5leHBvcnQgZGVmYXVsdCBSb290QXBwXG5cbiAgICBcbiAgICBcbiJdfQ==
