var BootstrapModalRegion, MainChannel;

import $ from 'jquery';

import {
  Region
} from 'backbone.marionette';

MainChannel = Backbone.Radio.channel('global');

BootstrapModalRegion = (function() {
  class BootstrapModalRegion extends Region {
    getEl(selector) {
      var $el;
      $el = $(selector);
      $el.attr('class', 'modal');
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
  modal_region = layout.getRegion('modal');
  modal_region.backdrop = !!(options != null ? options.backdrop : void 0);
  return modal_region.show(view);
});

export default BootstrapModalRegion;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaW9ucy9ic21vZGFsLmpzIiwic291cmNlcyI6WyJyZWdpb25zL2JzbW9kYWwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsb0JBQUEsRUFBQTs7QUFBQSxPQUFPLENBQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVMsTUFBVDtDQUFBLE1BQUE7O0FBRUEsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFFUjtFQUFOLE1BQUEscUJBQUEsUUFBbUMsT0FBbkM7SUFLRSxLQUFPLENBQUMsUUFBRCxDQUFBO0FBQ0wsVUFBQTtNQUFBLEdBQUEsR0FBTSxDQUFBLENBQUUsUUFBRjtNQUNOLEdBQUcsQ0FBQyxJQUFKLENBQVMsT0FBVCxFQUFrQixPQUFsQjthQUNBO0lBSEs7O0lBS1AsSUFBTSxDQUFDLElBQUQsQ0FBQTtXQUFOLENBQUEsSUFDRSxDQUFNLElBQU47TUFDQSxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQUwsQ0FDRTtRQUFBLFFBQUEsRUFBVSxJQUFDLENBQUEsUUFBWDtRQUNBLFFBQUEsRUFBVSxJQUFDLENBQUE7TUFEWCxDQURGO2FBR0EsSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFMLENBQVcsTUFBWDtJQUxJOztFQVZSOztpQ0FDRSxFQUFBLEdBQUk7O2lDQUNKLFFBQUEsR0FBVTs7aUNBQ1YsUUFBQSxHQUFVOzs7Ozs7QUFjWixXQUFXLENBQUMsS0FBWixDQUFrQixxQkFBbEIsRUFBeUMsUUFBQSxDQUFDLElBQUQsRUFBTyxPQUFQLENBQUE7QUFDdkMsTUFBQSxHQUFBLEVBQUEsTUFBQSxFQUFBO0VBQUEsR0FBQSxHQUFNLFdBQVcsQ0FBQyxPQUFaLENBQW9CLGlCQUFwQjtFQUNOLE1BQUEsR0FBUyxHQUFHLENBQUMsT0FBSixDQUFBO0VBQ1QsWUFBQSxHQUFlLE1BQU0sQ0FBQyxTQUFQLENBQWlCLE9BQWpCO0VBQ2YsWUFBWSxDQUFDLFFBQWIsR0FBd0IsQ0FBQyxvQkFBQyxPQUFPLENBQUU7U0FDbkMsWUFBWSxDQUFDLElBQWIsQ0FBa0IsSUFBbEI7QUFMdUMsQ0FBekM7O0FBT0EsT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuaW1wb3J0IHsgUmVnaW9uIH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5cbmNsYXNzIEJvb3RzdHJhcE1vZGFsUmVnaW9uIGV4dGVuZHMgUmVnaW9uXG4gIGVsOiAnI21vZGFsJ1xuICBiYWNrZHJvcDogZmFsc2VcbiAga2V5Ym9hcmQ6IGZhbHNlXG4gIFxuICBnZXRFbDogKHNlbGVjdG9yKSAtPlxuICAgICRlbCA9ICQgc2VsZWN0b3JcbiAgICAkZWwuYXR0ciAnY2xhc3MnLCAnbW9kYWwnXG4gICAgJGVsXG4gICAgXG4gIHNob3c6ICh2aWV3KSAtPlxuICAgIHN1cGVyIHZpZXdcbiAgICBAJGVsLm1vZGFsXG4gICAgICBiYWNrZHJvcDogQGJhY2tkcm9wXG4gICAgICBrZXlib2FyZDogQGtleWJvYXJkXG4gICAgQCRlbC5tb2RhbCAnc2hvdydcbiAgICAgIFxuTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOnNob3ctbW9kYWwnLCAodmlldywgb3B0aW9ucykgLT5cbiAgYXBwID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6b2JqZWN0J1xuICBsYXlvdXQgPSBhcHAuZ2V0VmlldygpXG4gIG1vZGFsX3JlZ2lvbiA9IGxheW91dC5nZXRSZWdpb24gJ21vZGFsJ1xuICBtb2RhbF9yZWdpb24uYmFja2Ryb3AgPSAhIW9wdGlvbnM/LmJhY2tkcm9wXG4gIG1vZGFsX3JlZ2lvbi5zaG93IHZpZXdcbiAgXG5leHBvcnQgZGVmYXVsdCBCb290c3RyYXBNb2RhbFJlZ2lvblxuIl19
