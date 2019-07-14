var BootstrapModalRegion, MainChannel, getModalRegion;

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

getModalRegion = function() {
  var app, layout;
  app = MainChannel.request('main:app:object');
  layout = app.getView();
  return layout.getRegion('modal');
};

MainChannel.reply('main:app:show-modal', function(view, options) {
  var region;
  region = getModalRegion();
  region.backdrop = !!(options != null ? options.backdrop : void 0);
  return region.show(view);
});

MainChannel.reply('main:app:empty-modal', function() {
  var region;
  region = getModalRegion();
  return region.empty();
});

export default BootstrapModalRegion;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaW9ucy9ic21vZGFsLmpzIiwic291cmNlcyI6WyJyZWdpb25zL2JzbW9kYWwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsb0JBQUEsRUFBQSxXQUFBLEVBQUE7O0FBQUEsT0FBTyxDQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLE1BQVQ7Q0FBQSxNQUFBOztBQUVBLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBRVI7RUFBTixNQUFBLHFCQUFBLFFBQW1DLE9BQW5DO0lBS0UsS0FBTyxDQUFDLFFBQUQsQ0FBQTtBQUNMLFVBQUE7TUFBQSxHQUFBLEdBQU0sQ0FBQSxDQUFFLFFBQUY7TUFDTixHQUFHLENBQUMsSUFBSixDQUFTLE9BQVQsRUFBa0IsT0FBbEI7YUFDQTtJQUhLOztJQUtQLElBQU0sQ0FBQyxJQUFELENBQUE7V0FBTixDQUFBLElBQ0UsQ0FBTSxJQUFOO01BQ0EsSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFMLENBQ0U7UUFBQSxRQUFBLEVBQVUsSUFBQyxDQUFBLFFBQVg7UUFDQSxRQUFBLEVBQVUsSUFBQyxDQUFBO01BRFgsQ0FERjthQUdBLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTCxDQUFXLE1BQVg7SUFMSTs7RUFWUjs7aUNBQ0UsRUFBQSxHQUFJOztpQ0FDSixRQUFBLEdBQVU7O2lDQUNWLFFBQUEsR0FBVTs7Ozs7O0FBY1osY0FBQSxHQUFpQixRQUFBLENBQUEsQ0FBQTtBQUNmLE1BQUEsR0FBQSxFQUFBO0VBQUEsR0FBQSxHQUFNLFdBQVcsQ0FBQyxPQUFaLENBQW9CLGlCQUFwQjtFQUNOLE1BQUEsR0FBUyxHQUFHLENBQUMsT0FBSixDQUFBO0FBQ1QsU0FBTyxNQUFNLENBQUMsU0FBUCxDQUFpQixPQUFqQjtBQUhROztBQU1qQixXQUFXLENBQUMsS0FBWixDQUFrQixxQkFBbEIsRUFBeUMsUUFBQSxDQUFDLElBQUQsRUFBTyxPQUFQLENBQUE7QUFDdkMsTUFBQTtFQUFBLE1BQUEsR0FBUyxjQUFBLENBQUE7RUFDVCxNQUFNLENBQUMsUUFBUCxHQUFrQixDQUFDLG9CQUFDLE9BQU8sQ0FBRTtTQUM3QixNQUFNLENBQUMsSUFBUCxDQUFZLElBQVo7QUFIdUMsQ0FBekM7O0FBS0EsV0FBVyxDQUFDLEtBQVosQ0FBa0Isc0JBQWxCLEVBQTBDLFFBQUEsQ0FBQSxDQUFBO0FBQ3hDLE1BQUE7RUFBQSxNQUFBLEdBQVMsY0FBQSxDQUFBO1NBQ1QsTUFBTSxDQUFDLEtBQVAsQ0FBQTtBQUZ3QyxDQUExQzs7QUFLQSxPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgeyBSZWdpb24gfSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcblxuY2xhc3MgQm9vdHN0cmFwTW9kYWxSZWdpb24gZXh0ZW5kcyBSZWdpb25cbiAgZWw6ICcjbW9kYWwnXG4gIGJhY2tkcm9wOiBmYWxzZVxuICBrZXlib2FyZDogZmFsc2VcbiAgXG4gIGdldEVsOiAoc2VsZWN0b3IpIC0+XG4gICAgJGVsID0gJCBzZWxlY3RvclxuICAgICRlbC5hdHRyICdjbGFzcycsICdtb2RhbCdcbiAgICAkZWxcbiAgICBcbiAgc2hvdzogKHZpZXcpIC0+XG4gICAgc3VwZXIgdmlld1xuICAgIEAkZWwubW9kYWxcbiAgICAgIGJhY2tkcm9wOiBAYmFja2Ryb3BcbiAgICAgIGtleWJvYXJkOiBAa2V5Ym9hcmRcbiAgICBAJGVsLm1vZGFsICdzaG93J1xuXG5nZXRNb2RhbFJlZ2lvbiA9IC0+XG4gIGFwcCA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOm9iamVjdCdcbiAgbGF5b3V0ID0gYXBwLmdldFZpZXcoKVxuICByZXR1cm4gbGF5b3V0LmdldFJlZ2lvbiAnbW9kYWwnXG4gIFxuICAgICAgXG5NYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6c2hvdy1tb2RhbCcsICh2aWV3LCBvcHRpb25zKSAtPlxuICByZWdpb24gPSBnZXRNb2RhbFJlZ2lvbigpXG4gIHJlZ2lvbi5iYWNrZHJvcCA9ICEhb3B0aW9ucz8uYmFja2Ryb3BcbiAgcmVnaW9uLnNob3cgdmlld1xuXG5NYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6ZW1wdHktbW9kYWwnLCAtPlxuICByZWdpb24gPSBnZXRNb2RhbFJlZ2lvbigpXG4gIHJlZ2lvbi5lbXB0eSgpXG4gIFxuICBcbmV4cG9ydCBkZWZhdWx0IEJvb3RzdHJhcE1vZGFsUmVnaW9uXG4iXX0=
