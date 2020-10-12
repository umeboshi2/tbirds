var BootstrapModalRegion, MainChannel, getModalRegion;

import $ from 'jquery';

import {
  Radio
} from 'backbone';

import {
  Region
} from 'backbone.marionette';

MainChannel = Radio.channel('global');

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

    empty() {
      this.$el.modal('hide');
      return super.empty();
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

MainChannel.reply('main:app:modal-region', function() {
  return getModalRegion();
});

MainChannel.reply('main:app:show-modal', function(view, options) {
  var region;
  region = getModalRegion();
  region.backdrop = !!(options != null ? options.backdrop : void 0);
  region.show(view);
});

MainChannel.reply('main:app:empty-modal', function() {
  var region;
  region = getModalRegion();
  region.empty();
});

export default BootstrapModalRegion;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaW9ucy9ic21vZGFsLmpzIiwic291cmNlcyI6WyJyZWdpb25zL2JzbW9kYWwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsb0JBQUEsRUFBQSxXQUFBLEVBQUE7O0FBQUEsT0FBTyxDQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLEtBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxNQUFUO0NBQUEsTUFBQTs7QUFFQSxXQUFBLEdBQWMsS0FBSyxDQUFDLE9BQU4sQ0FBYyxRQUFkOztBQUVSO0VBQU4sTUFBQSxxQkFBQSxRQUFtQyxPQUFuQztJQUtFLEtBQU8sQ0FBQyxRQUFELENBQUE7QUFDVCxVQUFBO01BQUksR0FBQSxHQUFNLENBQUEsQ0FBRSxRQUFGO01BQ04sR0FBRyxDQUFDLElBQUosQ0FBUyxPQUFULEVBQWtCLE9BQWxCO2FBQ0E7SUFISzs7SUFLUCxJQUFNLENBQUMsSUFBRCxDQUFBO1dBQU4sQ0FBQSxJQUNFLENBQU0sSUFBTjtNQUNBLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTCxDQUNFO1FBQUEsUUFBQSxFQUFVLElBQUMsQ0FBQSxRQUFYO1FBQ0EsUUFBQSxFQUFVLElBQUMsQ0FBQTtNQURYLENBREY7YUFHQSxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQUwsQ0FBVyxNQUFYO0lBTEk7O0lBT04sS0FBTyxDQUFBLENBQUE7TUFDTCxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQUwsQ0FBVyxNQUFYO2tCQURGLENBQUEsS0FFRSxDQUFBO0lBRks7O0VBakJUOztpQ0FDRSxFQUFBLEdBQUk7O2lDQUNKLFFBQUEsR0FBVTs7aUNBQ1YsUUFBQSxHQUFVOzs7Ozs7QUFtQlosY0FBQSxHQUFpQixRQUFBLENBQUEsQ0FBQTtBQUNqQixNQUFBLEdBQUEsRUFBQTtFQUFFLEdBQUEsR0FBTSxXQUFXLENBQUMsT0FBWixDQUFvQixpQkFBcEI7RUFDTixNQUFBLEdBQVMsR0FBRyxDQUFDLE9BQUosQ0FBQTtBQUNULFNBQU8sTUFBTSxDQUFDLFNBQVAsQ0FBaUIsT0FBakI7QUFIUTs7QUFNakIsV0FBVyxDQUFDLEtBQVosQ0FBa0IsdUJBQWxCLEVBQTJDLFFBQUEsQ0FBQSxDQUFBO0FBQ3pDLFNBQU8sY0FBQSxDQUFBO0FBRGtDLENBQTNDOztBQUdBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLHFCQUFsQixFQUF5QyxRQUFBLENBQUMsSUFBRCxFQUFPLE9BQVAsQ0FBQTtBQUN6QyxNQUFBO0VBQUUsTUFBQSxHQUFTLGNBQUEsQ0FBQTtFQUNULE1BQU0sQ0FBQyxRQUFQLEdBQWtCLENBQUMsb0JBQUMsT0FBTyxDQUFFO0VBQzdCLE1BQU0sQ0FBQyxJQUFQLENBQVksSUFBWjtBQUh1QyxDQUF6Qzs7QUFNQSxXQUFXLENBQUMsS0FBWixDQUFrQixzQkFBbEIsRUFBMEMsUUFBQSxDQUFBLENBQUE7QUFDMUMsTUFBQTtFQUFFLE1BQUEsR0FBUyxjQUFBLENBQUE7RUFDVCxNQUFNLENBQUMsS0FBUCxDQUFBO0FBRndDLENBQTFDOztBQU1BLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSdcbmltcG9ydCB7IFJhZGlvIH0gZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgeyBSZWdpb24gfSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuXG5NYWluQ2hhbm5lbCA9IFJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcblxuY2xhc3MgQm9vdHN0cmFwTW9kYWxSZWdpb24gZXh0ZW5kcyBSZWdpb25cbiAgZWw6ICcjbW9kYWwnXG4gIGJhY2tkcm9wOiBmYWxzZVxuICBrZXlib2FyZDogZmFsc2VcbiAgXG4gIGdldEVsOiAoc2VsZWN0b3IpIC0+XG4gICAgJGVsID0gJCBzZWxlY3RvclxuICAgICRlbC5hdHRyICdjbGFzcycsICdtb2RhbCdcbiAgICAkZWxcbiAgICBcbiAgc2hvdzogKHZpZXcpIC0+XG4gICAgc3VwZXIgdmlld1xuICAgIEAkZWwubW9kYWxcbiAgICAgIGJhY2tkcm9wOiBAYmFja2Ryb3BcbiAgICAgIGtleWJvYXJkOiBAa2V5Ym9hcmRcbiAgICBAJGVsLm1vZGFsICdzaG93J1xuXG4gIGVtcHR5OiAtPlxuICAgIEAkZWwubW9kYWwgJ2hpZGUnXG4gICAgc3VwZXIoKVxuICAgIFxuXG5nZXRNb2RhbFJlZ2lvbiA9IC0+XG4gIGFwcCA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOm9iamVjdCdcbiAgbGF5b3V0ID0gYXBwLmdldFZpZXcoKVxuICByZXR1cm4gbGF5b3V0LmdldFJlZ2lvbiAnbW9kYWwnXG4gIFxuXG5NYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6bW9kYWwtcmVnaW9uJywgLT5cbiAgcmV0dXJuIGdldE1vZGFsUmVnaW9uKClcbiAgXG5NYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6c2hvdy1tb2RhbCcsICh2aWV3LCBvcHRpb25zKSAtPlxuICByZWdpb24gPSBnZXRNb2RhbFJlZ2lvbigpXG4gIHJlZ2lvbi5iYWNrZHJvcCA9ICEhb3B0aW9ucz8uYmFja2Ryb3BcbiAgcmVnaW9uLnNob3cgdmlld1xuICByZXR1cm5cbiAgXG5NYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6ZW1wdHktbW9kYWwnLCAtPlxuICByZWdpb24gPSBnZXRNb2RhbFJlZ2lvbigpXG4gIHJlZ2lvbi5lbXB0eSgpXG4gIHJldHVyblxuICBcbiAgXG5leHBvcnQgZGVmYXVsdCBCb290c3RyYXBNb2RhbFJlZ2lvblxuIl19
