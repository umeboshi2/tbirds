var BootstrapModalRegion;

import $ from 'jquery';

import {
  Region
} from 'backbone.marionette';

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

export default BootstrapModalRegion;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaW9ucy9ic21vZGFsLmpzIiwic291cmNlcyI6WyJyZWdpb25zL2JzbW9kYWwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsT0FBTyxDQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLE1BQVQ7Q0FBQSxNQUFBOztBQUVNO0VBQU4sTUFBQSxxQkFBQSxRQUFtQyxPQUFuQztJQUtFLEtBQU8sQ0FBQyxRQUFELENBQUE7QUFDVCxVQUFBO01BQUksR0FBQSxHQUFNLENBQUEsQ0FBRSxRQUFGO01BQ04sR0FBRyxDQUFDLElBQUosQ0FBUyxPQUFULEVBQWtCLE9BQWxCO2FBQ0E7SUFISzs7SUFLUCxJQUFNLENBQUMsSUFBRCxDQUFBO1dBQU4sQ0FBQSxJQUNFLENBQU0sSUFBTjtNQUNBLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTCxDQUNFO1FBQUEsUUFBQSxFQUFVLElBQUMsQ0FBQSxRQUFYO1FBQ0EsUUFBQSxFQUFVLElBQUMsQ0FBQTtNQURYLENBREY7YUFHQSxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQUwsQ0FBVyxNQUFYO0lBTEk7O0lBT04sS0FBTyxDQUFBLENBQUE7TUFDTCxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQUwsQ0FBVyxNQUFYO2tCQURGLENBQUEsS0FFRSxDQUFBO0lBRks7O0VBakJUOztpQ0FDRSxFQUFBLEdBQUk7O2lDQUNKLFFBQUEsR0FBVTs7aUNBQ1YsUUFBQSxHQUFVOzs7Ozs7QUFrQlosT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuaW1wb3J0IHsgUmVnaW9uIH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuY2xhc3MgQm9vdHN0cmFwTW9kYWxSZWdpb24gZXh0ZW5kcyBSZWdpb25cbiAgZWw6ICcjbW9kYWwnXG4gIGJhY2tkcm9wOiBmYWxzZVxuICBrZXlib2FyZDogZmFsc2VcbiAgXG4gIGdldEVsOiAoc2VsZWN0b3IpIC0+XG4gICAgJGVsID0gJCBzZWxlY3RvclxuICAgICRlbC5hdHRyICdjbGFzcycsICdtb2RhbCdcbiAgICAkZWxcbiAgICBcbiAgc2hvdzogKHZpZXcpIC0+XG4gICAgc3VwZXIgdmlld1xuICAgIEAkZWwubW9kYWxcbiAgICAgIGJhY2tkcm9wOiBAYmFja2Ryb3BcbiAgICAgIGtleWJvYXJkOiBAa2V5Ym9hcmRcbiAgICBAJGVsLm1vZGFsICdzaG93J1xuXG4gIGVtcHR5OiAtPlxuICAgIEAkZWwubW9kYWwgJ2hpZGUnXG4gICAgc3VwZXIoKVxuXG5leHBvcnQgZGVmYXVsdCBCb290c3RyYXBNb2RhbFJlZ2lvblxuIl19
