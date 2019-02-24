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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaW9ucy9ic21vZGFsLmpzIiwic291cmNlcyI6WyJyZWdpb25zL2JzbW9kYWwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsb0JBQUEsRUFBQTs7QUFBQSxPQUFPLENBQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVMsTUFBVDtDQUFBLE1BQUE7O0FBRUEsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFFUjtFQUFOLE1BQUEscUJBQUEsUUFBbUMsT0FBbkM7SUFLRSxLQUFPLENBQUMsUUFBRCxDQUFBO0FBQ0wsVUFBQTtNQUFBLEdBQUEsR0FBTSxDQUFBLENBQUUsUUFBRjtNQUNOLEdBQUcsQ0FBQyxJQUFKLENBQVMsT0FBVCxFQUFrQixPQUFsQixFQURBOzthQUdBO0lBSks7O0lBTVAsSUFBTSxDQUFDLElBQUQsQ0FBQTtXQUFOLENBQUEsSUFDRSxDQUFNLElBQU47TUFDQSxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQUwsQ0FDRTtRQUFBLFFBQUEsRUFBVSxJQUFDLENBQUEsUUFBWDtRQUNBLFFBQUEsRUFBVSxJQUFDLENBQUE7TUFEWCxDQURGO2FBR0EsSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFMLENBQVcsTUFBWDtJQUxJOztFQVhSOztpQ0FDRSxFQUFBLEdBQUk7O2lDQUNKLFFBQUEsR0FBVTs7aUNBQ1YsUUFBQSxHQUFVOzs7Ozs7QUFlWixXQUFXLENBQUMsS0FBWixDQUFrQixxQkFBbEIsRUFBeUMsUUFBQSxDQUFDLElBQUQsRUFBTyxPQUFQLENBQUE7QUFDdkMsTUFBQSxHQUFBLEVBQUEsTUFBQSxFQUFBO0VBQUEsR0FBQSxHQUFNLFdBQVcsQ0FBQyxPQUFaLENBQW9CLGlCQUFwQjtFQUNOLE1BQUEsR0FBUyxHQUFHLENBQUMsT0FBSixDQUFBO0VBQ1QsWUFBQSxHQUFlLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFGOUI7O0VBSUEsWUFBWSxDQUFDLFFBQWIsR0FBd0IsQ0FBQyxvQkFBQyxPQUFPLENBQUU7U0FDbkMsWUFBWSxDQUFDLElBQWIsQ0FBa0IsSUFBbEI7QUFOdUMsQ0FBekM7O0FBUUEsT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuaW1wb3J0IHsgUmVnaW9uIH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5cbmNsYXNzIEJvb3RzdHJhcE1vZGFsUmVnaW9uIGV4dGVuZHMgUmVnaW9uXG4gIGVsOiAnI21vZGFsJ1xuICBiYWNrZHJvcDogZmFsc2VcbiAga2V5Ym9hcmQ6IGZhbHNlXG4gIFxuICBnZXRFbDogKHNlbGVjdG9yKSAtPlxuICAgICRlbCA9ICQgc2VsZWN0b3JcbiAgICAkZWwuYXR0ciAnY2xhc3MnLCAnbW9kYWwnXG4gICAgIyRlbC5hdHRyICdjbGFzcycsICdtb2RhbCBmYWRlJ1xuICAgICRlbFxuICAgIFxuICBzaG93OiAodmlldykgLT5cbiAgICBzdXBlciB2aWV3XG4gICAgQCRlbC5tb2RhbFxuICAgICAgYmFja2Ryb3A6IEBiYWNrZHJvcFxuICAgICAga2V5Ym9hcmQ6IEBrZXlib2FyZFxuICAgIEAkZWwubW9kYWwgJ3Nob3cnXG4gICAgICBcbk1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpzaG93LW1vZGFsJywgKHZpZXcsIG9wdGlvbnMpIC0+XG4gIGFwcCA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOm9iamVjdCdcbiAgbGF5b3V0ID0gYXBwLmdldFZpZXcoKVxuICBtb2RhbF9yZWdpb24gPSBsYXlvdXQucmVnaW9ucy5tb2RhbFxuICAjbW9kYWxfcmVnaW9uID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6Z2V0LXJlZ2lvbicsICdtb2RhbCdcbiAgbW9kYWxfcmVnaW9uLmJhY2tkcm9wID0gISFvcHRpb25zPy5iYWNrZHJvcFxuICBtb2RhbF9yZWdpb24uc2hvdyB2aWV3XG4gIFxuZXhwb3J0IGRlZmF1bHQgQm9vdHN0cmFwTW9kYWxSZWdpb25cbiJdfQ==
