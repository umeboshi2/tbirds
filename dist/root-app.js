var MainChannel, RootApp;

import {
  Model,
  Radio
} from 'backbone';

import {
  App
} from 'marionette.toolkit';

import MainPageLayout from './tklayout';

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC1hcHAuanMiLCJzb3VyY2VzIjpbInJvb3QtYXBwLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFdBQUEsRUFBQTs7QUFBQSxPQUFBO0VBQVMsS0FBVDtFQUFnQixLQUFoQjtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLEdBQVQ7Q0FBQSxNQUFBOztBQUVBLE9BQU8sY0FBUCxNQUFBOztBQUVBLFdBQUEsR0FBYyxLQUFLLENBQUMsT0FBTixDQUFjLFFBQWQ7O0FBRWQsT0FBQSxJQUFhO0VBQU4sTUFBQSxXQUFBLFFBQXlCLE1BQXpCLENBQUE7O3VCQUNMLFFBQUEsR0FDRTtJQUFBLFlBQUEsRUFBYyxJQUFkO0lBQ0EsU0FBQSxFQUFXLENBQUE7RUFEWDs7Ozs7O0FBR0U7RUFBTixNQUFBLFFBQUEsUUFBc0IsSUFBdEI7SUFFRSxVQUFZLENBQUMsT0FBRCxDQUFBO0FBQ2QsVUFBQSxTQUFBLEVBQUEsR0FBQSxFQUFBO01BQUksSUFBQyxDQUFBLFNBQUQsQ0FBVyxPQUFYO01BQ0EsR0FBQSxHQUFNLElBQUMsQ0FBQSxTQUFELENBQVcsV0FBWDtNQUNOLFNBQUEsa0JBQVksR0FBRyxDQUFFLGdCQUFMLElBQWU7TUFDM0IsTUFBQSxHQUFTLElBQUksU0FBSixDQUFjLEdBQUcsQ0FBQyxhQUFsQjthQUNULElBQUMsQ0FBQSxRQUFELENBQVUsTUFBVjtJQUxVOztJQU9aLE9BQVMsQ0FBQSxDQUFBO0FBQ1gsVUFBQTtNQUFJLENBQUEsR0FBSSxXQUFXLENBQUMsT0FBWixDQUFvQixpQkFBcEI7YUFDSixDQUFDLENBQUMsYUFBRixDQUFBO0lBRk87O0VBVFg7O29CQUNFLFVBQUEsR0FBWTs7Ozs7O0FBWWQsT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kZWwsIFJhZGlvIH0gZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgeyBBcHAgfSBmcm9tICdtYXJpb25ldHRlLnRvb2xraXQnXG5cbmltcG9ydCBNYWluUGFnZUxheW91dCBmcm9tICcuL3RrbGF5b3V0J1xuXG5NYWluQ2hhbm5lbCA9IFJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcblxuZXhwb3J0IGNsYXNzIFRrQXBwU3RhdGUgZXh0ZW5kcyBNb2RlbFxuICBkZWZhdWx0czpcbiAgICBzdGFydEhpc3Rvcnk6IHRydWVcbiAgICBhcHBDb25maWc6IHt9XG5cbmNsYXNzIFJvb3RBcHAgZXh0ZW5kcyBBcHBcbiAgU3RhdGVNb2RlbDogVGtBcHBTdGF0ZVxuICBpbml0aWFsaXplOiAob3B0aW9ucykgLT5cbiAgICBAaW5pdFN0YXRlIG9wdGlvbnNcbiAgICBjZmcgPSBAZ2V0T3B0aW9uICdhcHBDb25maWcnXG4gICAgQXBwTGF5b3V0ID0gY2ZnPy5sYXlvdXQgb3IgTWFpblBhZ2VMYXlvdXRcbiAgICBsYXlvdXQgPSBuZXcgQXBwTGF5b3V0IGNmZy5sYXlvdXRPcHRpb25zXG4gICAgQHNob3dWaWV3IGxheW91dFxuXG4gIG9uU3RhcnQ6IC0+XG4gICAgYyA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW4tY29udHJvbGxlcidcbiAgICBjLmxvYWRGcm9udERvb3IoKVxuXG5leHBvcnQgZGVmYXVsdCBSb290QXBwXG5cbiAgICBcbiAgICBcbiJdfQ==
