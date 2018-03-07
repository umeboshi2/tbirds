var $, BootstrapModalRegion, MainChannel, Marionette;

$ = require('jquery');

Marionette = require('backbone.marionette');

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

module.exports = BootstrapModalRegion;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaW9ucy9ic21vZGFsLmpzIiwic291cmNlcyI6WyJyZWdpb25zL2JzbW9kYWwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsQ0FBQSxFQUFBLG9CQUFBLEVBQUEsV0FBQSxFQUFBOztBQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsUUFBUjs7QUFDSixVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUViLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBR1I7RUFBTixNQUFBLHFCQUFBLFFBQW1DLFVBQVUsQ0FBQyxPQUE5QztJQUtFLEtBQU8sQ0FBQyxRQUFELENBQUE7QUFDTCxVQUFBO01BQUEsR0FBQSxHQUFNLENBQUEsQ0FBRSxRQUFGO01BQ04sR0FBRyxDQUFDLElBQUosQ0FBUyxPQUFULEVBQWtCLE9BQWxCLEVBREE7O2FBR0E7SUFKSzs7SUFNUCxJQUFNLENBQUMsSUFBRCxDQUFBO1dBQU4sQ0FBQSxJQUNFLENBQU0sSUFBTjtNQUNBLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTCxDQUNFO1FBQUEsUUFBQSxFQUFVLElBQUMsQ0FBQSxRQUFYO1FBQ0EsUUFBQSxFQUFVLElBQUMsQ0FBQTtNQURYLENBREY7YUFHQSxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQUwsQ0FBVyxNQUFYO0lBTEk7O0VBWFI7O2lDQUNFLEVBQUEsR0FBSTs7aUNBQ0osUUFBQSxHQUFVOztpQ0FDVixRQUFBLEdBQVU7Ozs7OztBQWVaLFdBQVcsQ0FBQyxLQUFaLENBQWtCLHFCQUFsQixFQUF5QyxRQUFBLENBQUMsSUFBRCxFQUFPLE9BQVAsQ0FBQTtBQUN2QyxNQUFBLEdBQUEsRUFBQSxNQUFBLEVBQUE7RUFBQSxHQUFBLEdBQU0sV0FBVyxDQUFDLE9BQVosQ0FBb0IsaUJBQXBCO0VBQ04sTUFBQSxHQUFTLEdBQUcsQ0FBQyxPQUFKLENBQUE7RUFDVCxZQUFBLEdBQWUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUY5Qjs7RUFJQSxZQUFZLENBQUMsUUFBYixHQUF3QixDQUFDLG9CQUFDLE9BQU8sQ0FBRTtTQUNuQyxZQUFZLENBQUMsSUFBYixDQUFrQixJQUFsQjtBQU51QyxDQUF6Qzs7QUFRQSxNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIiQgPSByZXF1aXJlICdqcXVlcnknXG5NYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5cblxuY2xhc3MgQm9vdHN0cmFwTW9kYWxSZWdpb24gZXh0ZW5kcyBNYXJpb25ldHRlLlJlZ2lvblxuICBlbDogJyNtb2RhbCdcbiAgYmFja2Ryb3A6IGZhbHNlXG4gIGtleWJvYXJkOiBmYWxzZVxuICBcbiAgZ2V0RWw6IChzZWxlY3RvcikgLT5cbiAgICAkZWwgPSAkIHNlbGVjdG9yXG4gICAgJGVsLmF0dHIgJ2NsYXNzJywgJ21vZGFsJ1xuICAgICMkZWwuYXR0ciAnY2xhc3MnLCAnbW9kYWwgZmFkZSdcbiAgICAkZWxcbiAgICBcbiAgc2hvdzogKHZpZXcpIC0+XG4gICAgc3VwZXIgdmlld1xuICAgIEAkZWwubW9kYWxcbiAgICAgIGJhY2tkcm9wOiBAYmFja2Ryb3BcbiAgICAgIGtleWJvYXJkOiBAa2V5Ym9hcmRcbiAgICBAJGVsLm1vZGFsICdzaG93J1xuICAgICAgXG5NYWluQ2hhbm5lbC5yZXBseSAnbWFpbjphcHA6c2hvdy1tb2RhbCcsICh2aWV3LCBvcHRpb25zKSAtPlxuICBhcHAgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpvYmplY3QnXG4gIGxheW91dCA9IGFwcC5nZXRWaWV3KClcbiAgbW9kYWxfcmVnaW9uID0gbGF5b3V0LnJlZ2lvbnMubW9kYWxcbiAgI21vZGFsX3JlZ2lvbiA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmdldC1yZWdpb24nLCAnbW9kYWwnXG4gIG1vZGFsX3JlZ2lvbi5iYWNrZHJvcCA9ICEhb3B0aW9ucz8uYmFja2Ryb3BcbiAgbW9kYWxfcmVnaW9uLnNob3cgdmlld1xuICBcbm1vZHVsZS5leHBvcnRzID0gQm9vdHN0cmFwTW9kYWxSZWdpb25cbiJdfQ==
