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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaW9ucy9ic21vZGFsLmpzIiwic291cmNlcyI6WyJyZWdpb25zL2JzbW9kYWwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsb0JBQUEsRUFBQSxXQUFBLEVBQUE7O0FBQUEsT0FBTyxDQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLEtBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxNQUFUO0NBQUEsTUFBQTs7QUFFQSxXQUFBLEdBQWMsS0FBSyxDQUFDLE9BQU4sQ0FBYyxRQUFkOztBQUVSO0VBQU4sTUFBQSxxQkFBQSxRQUFtQyxPQUFuQztJQUtFLEtBQU8sQ0FBQyxRQUFELENBQUE7QUFDTCxVQUFBO01BQUEsR0FBQSxHQUFNLENBQUEsQ0FBRSxRQUFGO01BQ04sR0FBRyxDQUFDLElBQUosQ0FBUyxPQUFULEVBQWtCLE9BQWxCO2FBQ0E7SUFISzs7SUFLUCxJQUFNLENBQUMsSUFBRCxDQUFBO1dBQU4sQ0FBQSxJQUNFLENBQU0sSUFBTjtNQUNBLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTCxDQUNFO1FBQUEsUUFBQSxFQUFVLElBQUMsQ0FBQSxRQUFYO1FBQ0EsUUFBQSxFQUFVLElBQUMsQ0FBQTtNQURYLENBREY7YUFHQSxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQUwsQ0FBVyxNQUFYO0lBTEk7O0lBT04sS0FBTyxDQUFBLENBQUE7TUFDTCxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQUwsQ0FBVyxNQUFYO2tCQURGLENBQUEsS0FFRSxDQUFBO0lBRks7O0VBakJUOztpQ0FDRSxFQUFBLEdBQUk7O2lDQUNKLFFBQUEsR0FBVTs7aUNBQ1YsUUFBQSxHQUFVOzs7Ozs7QUFtQlosY0FBQSxHQUFpQixRQUFBLENBQUEsQ0FBQTtBQUNmLE1BQUEsR0FBQSxFQUFBO0VBQUEsR0FBQSxHQUFNLFdBQVcsQ0FBQyxPQUFaLENBQW9CLGlCQUFwQjtFQUNOLE1BQUEsR0FBUyxHQUFHLENBQUMsT0FBSixDQUFBO0FBQ1QsU0FBTyxNQUFNLENBQUMsU0FBUCxDQUFpQixPQUFqQjtBQUhROztBQU1qQixXQUFXLENBQUMsS0FBWixDQUFrQix1QkFBbEIsRUFBMkMsUUFBQSxDQUFBLENBQUE7QUFDekMsU0FBTyxjQUFBLENBQUE7QUFEa0MsQ0FBM0M7O0FBR0EsV0FBVyxDQUFDLEtBQVosQ0FBa0IscUJBQWxCLEVBQXlDLFFBQUEsQ0FBQyxJQUFELEVBQU8sT0FBUCxDQUFBO0FBQ3ZDLE1BQUE7RUFBQSxNQUFBLEdBQVMsY0FBQSxDQUFBO0VBQ1QsTUFBTSxDQUFDLFFBQVAsR0FBa0IsQ0FBQyxvQkFBQyxPQUFPLENBQUU7RUFDN0IsTUFBTSxDQUFDLElBQVAsQ0FBWSxJQUFaO0FBSHVDLENBQXpDOztBQU1BLFdBQVcsQ0FBQyxLQUFaLENBQWtCLHNCQUFsQixFQUEwQyxRQUFBLENBQUEsQ0FBQTtBQUN4QyxNQUFBO0VBQUEsTUFBQSxHQUFTLGNBQUEsQ0FBQTtFQUNULE1BQU0sQ0FBQyxLQUFQLENBQUE7QUFGd0MsQ0FBMUM7O0FBTUEsT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuaW1wb3J0IHsgUmFkaW8gfSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCB7IFJlZ2lvbiB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5cbk1haW5DaGFubmVsID0gUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuXG5jbGFzcyBCb290c3RyYXBNb2RhbFJlZ2lvbiBleHRlbmRzIFJlZ2lvblxuICBlbDogJyNtb2RhbCdcbiAgYmFja2Ryb3A6IGZhbHNlXG4gIGtleWJvYXJkOiBmYWxzZVxuICBcbiAgZ2V0RWw6IChzZWxlY3RvcikgLT5cbiAgICAkZWwgPSAkIHNlbGVjdG9yXG4gICAgJGVsLmF0dHIgJ2NsYXNzJywgJ21vZGFsJ1xuICAgICRlbFxuICAgIFxuICBzaG93OiAodmlldykgLT5cbiAgICBzdXBlciB2aWV3XG4gICAgQCRlbC5tb2RhbFxuICAgICAgYmFja2Ryb3A6IEBiYWNrZHJvcFxuICAgICAga2V5Ym9hcmQ6IEBrZXlib2FyZFxuICAgIEAkZWwubW9kYWwgJ3Nob3cnXG5cbiAgZW1wdHk6IC0+XG4gICAgQCRlbC5tb2RhbCAnaGlkZSdcbiAgICBzdXBlcigpXG4gICAgXG5cbmdldE1vZGFsUmVnaW9uID0gLT5cbiAgYXBwID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6b2JqZWN0J1xuICBsYXlvdXQgPSBhcHAuZ2V0VmlldygpXG4gIHJldHVybiBsYXlvdXQuZ2V0UmVnaW9uICdtb2RhbCdcbiAgXG5cbk1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDptb2RhbC1yZWdpb24nLCAtPlxuICByZXR1cm4gZ2V0TW9kYWxSZWdpb24oKVxuICBcbk1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDpzaG93LW1vZGFsJywgKHZpZXcsIG9wdGlvbnMpIC0+XG4gIHJlZ2lvbiA9IGdldE1vZGFsUmVnaW9uKClcbiAgcmVnaW9uLmJhY2tkcm9wID0gISFvcHRpb25zPy5iYWNrZHJvcFxuICByZWdpb24uc2hvdyB2aWV3XG4gIHJldHVyblxuICBcbk1haW5DaGFubmVsLnJlcGx5ICdtYWluOmFwcDplbXB0eS1tb2RhbCcsIC0+XG4gIHJlZ2lvbiA9IGdldE1vZGFsUmVnaW9uKClcbiAgcmVnaW9uLmVtcHR5KClcbiAgcmV0dXJuXG4gIFxuICBcbmV4cG9ydCBkZWZhdWx0IEJvb3RzdHJhcE1vZGFsUmVnaW9uXG4iXX0=
