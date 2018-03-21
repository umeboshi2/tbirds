var BootstrapModalRegion, MainChannel;

import $ from 'jquery';

import Marionette from 'backbone.marionette';

MainChannel = Backbone.Radio.channel('global');

BootstrapModalRegion = (function() {
  class BootstrapModalRegion extends Marionette.Region {
    getEl(selector) {
      var $el;
      $el = $(selector);
      $el.attr('class', 'modal');
      //$el.attr 'class', 'modal fade'
      return $el;
    }

    show(view) {
      super.show(view);
      this.$el.modal({
        backdrop: this.backdrop,
        keyboard: this.keyboard
      });
      return this.$el.modal('show');
    }

  };

  BootstrapModalRegion.prototype.el = '#modal';

  BootstrapModalRegion.prototype.backdrop = false;

  BootstrapModalRegion.prototype.keyboard = false;

  return BootstrapModalRegion;

}).call(this);

MainChannel.reply('main:app:show-modal', function(view, options) {
  var app, layout, modal_region;
  app = MainChannel.request('main:app:object');
  layout = app.getView();
  modal_region = layout.regions.modal;
  //modal_region = MainChannel.request 'main:app:get-region', 'modal'
  modal_region.backdrop = !!(options != null ? options.backdrop : void 0);
  return modal_region.show(view);
});

export default BootstrapModalRegion;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaW9ucy9ic21vZGFsLmpzIiwic291cmNlcyI6WyJyZWdpb25zL2JzbW9kYWwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsb0JBQUEsRUFBQTs7QUFBQSxPQUFPLENBQVAsTUFBQTs7QUFDQSxPQUFPLFVBQVAsTUFBQTs7QUFFQSxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUVSO0VBQU4sTUFBQSxxQkFBQSxRQUFtQyxVQUFVLENBQUMsT0FBOUM7SUFLRSxLQUFPLENBQUMsUUFBRCxDQUFBO0FBQ0wsVUFBQTtNQUFBLEdBQUEsR0FBTSxDQUFBLENBQUUsUUFBRjtNQUNOLEdBQUcsQ0FBQyxJQUFKLENBQVMsT0FBVCxFQUFrQixPQUFsQixFQURBOzthQUdBO0lBSks7O0lBTVAsSUFBTSxDQUFDLElBQUQsQ0FBQTtXQUFOLENBQUEsSUFDRSxDQUFNLElBQU47TUFDQSxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQUwsQ0FDRTtRQUFBLFFBQUEsRUFBVSxJQUFDLENBQUEsUUFBWDtRQUNBLFFBQUEsRUFBVSxJQUFDLENBQUE7TUFEWCxDQURGO2FBR0EsSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFMLENBQVcsTUFBWDtJQUxJOztFQVhSOztpQ0FDRSxFQUFBLEdBQUk7O2lDQUNKLFFBQUEsR0FBVTs7aUNBQ1YsUUFBQSxHQUFVOzs7Ozs7QUFlWixXQUFXLENBQUMsS0FBWixDQUFrQixxQkFBbEIsRUFBeUMsUUFBQSxDQUFDLElBQUQsRUFBTyxPQUFQLENBQUE7QUFDdkMsTUFBQSxHQUFBLEVBQUEsTUFBQSxFQUFBO0VBQUEsR0FBQSxHQUFNLFdBQVcsQ0FBQyxPQUFaLENBQW9CLGlCQUFwQjtFQUNOLE1BQUEsR0FBUyxHQUFHLENBQUMsT0FBSixDQUFBO0VBQ1QsWUFBQSxHQUFlLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFGOUI7O0VBSUEsWUFBWSxDQUFDLFFBQWIsR0FBd0IsQ0FBQyxvQkFBQyxPQUFPLENBQUU7U0FDbkMsWUFBWSxDQUFDLElBQWIsQ0FBa0IsSUFBbEI7QUFOdUMsQ0FBekM7O0FBUUEsT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5cbmNsYXNzIEJvb3RzdHJhcE1vZGFsUmVnaW9uIGV4dGVuZHMgTWFyaW9uZXR0ZS5SZWdpb25cbiAgZWw6ICcjbW9kYWwnXG4gIGJhY2tkcm9wOiBmYWxzZVxuICBrZXlib2FyZDogZmFsc2VcbiAgXG4gIGdldEVsOiAoc2VsZWN0b3IpIC0+XG4gICAgJGVsID0gJCBzZWxlY3RvclxuICAgICRlbC5hdHRyICdjbGFzcycsICdtb2RhbCdcbiAgICAjJGVsLmF0dHIgJ2NsYXNzJywgJ21vZGFsIGZhZGUnXG4gICAgJGVsXG4gICAgXG4gIHNob3c6ICh2aWV3KSAtPlxuICAgIHN1cGVyIHZpZXdcbiAgICBAJGVsLm1vZGFsXG4gICAgICBiYWNrZHJvcDogQGJhY2tkcm9wXG4gICAgICBrZXlib2FyZDogQGtleWJvYXJkXG4gICAgQCRlbC5tb2RhbCAnc2hvdydcbiAgICAgIFxuTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOnNob3ctbW9kYWwnLCAodmlldywgb3B0aW9ucykgLT5cbiAgYXBwID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6b2JqZWN0J1xuICBsYXlvdXQgPSBhcHAuZ2V0VmlldygpXG4gIG1vZGFsX3JlZ2lvbiA9IGxheW91dC5yZWdpb25zLm1vZGFsXG4gICNtb2RhbF9yZWdpb24gPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpnZXQtcmVnaW9uJywgJ21vZGFsJ1xuICBtb2RhbF9yZWdpb24uYmFja2Ryb3AgPSAhIW9wdGlvbnM/LmJhY2tkcm9wXG4gIG1vZGFsX3JlZ2lvbi5zaG93IHZpZXdcbiAgXG5leHBvcnQgZGVmYXVsdCBCb290c3RyYXBNb2RhbFJlZ2lvblxuIl19
