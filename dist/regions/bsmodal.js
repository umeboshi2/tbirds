var $, BootstrapModalRegion, MainChannel, Marionette,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$ = require('jquery');

Marionette = require('backbone.marionette');

MainChannel = Backbone.Radio.channel('global');

BootstrapModalRegion = (function(superClass) {
  extend(BootstrapModalRegion, superClass);

  function BootstrapModalRegion() {
    return BootstrapModalRegion.__super__.constructor.apply(this, arguments);
  }

  BootstrapModalRegion.prototype.el = '#modal';

  BootstrapModalRegion.prototype.backdrop = false;

  BootstrapModalRegion.prototype.keyboard = false;

  BootstrapModalRegion.prototype.getEl = function(selector) {
    var $el;
    $el = $(selector);
    $el.attr('class', 'modal');
    return $el;
  };

  BootstrapModalRegion.prototype.show = function(view) {
    BootstrapModalRegion.__super__.show.call(this, view);
    this.$el.modal({
      backdrop: this.backdrop,
      keyboard: this.keyboard
    });
    return this.$el.modal('show');
  };

  return BootstrapModalRegion;

})(Marionette.Region);

MainChannel.reply('main:app:show-modal', function(view, options) {
  var app, layout, modal_region;
  app = MainChannel.request('main:app:object');
  layout = app.getView();
  modal_region = layout.regions.modal;
  modal_region.backdrop = !!(options != null ? options.backdrop : void 0);
  return modal_region.show(view);
});

module.exports = BootstrapModalRegion;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaW9ucy9ic21vZGFsLmpzIiwic291cmNlcyI6WyJyZWdpb25zL2JzbW9kYWwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsZ0RBQUE7RUFBQTs7O0FBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxRQUFSOztBQUNKLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBRWIsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFHUjs7Ozs7OztpQ0FDSixFQUFBLEdBQUk7O2lDQUNKLFFBQUEsR0FBVTs7aUNBQ1YsUUFBQSxHQUFVOztpQ0FFVixLQUFBLEdBQU8sU0FBQyxRQUFEO0FBQ0wsUUFBQTtJQUFBLEdBQUEsR0FBTSxDQUFBLENBQUUsUUFBRjtJQUNOLEdBQUcsQ0FBQyxJQUFKLENBQVMsT0FBVCxFQUFrQixPQUFsQjtXQUVBO0VBSks7O2lDQU1QLElBQUEsR0FBTSxTQUFDLElBQUQ7SUFDSiwrQ0FBTSxJQUFOO0lBQ0EsSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFMLENBQ0U7TUFBQSxRQUFBLEVBQVUsSUFBQyxDQUFBLFFBQVg7TUFDQSxRQUFBLEVBQVUsSUFBQyxDQUFBLFFBRFg7S0FERjtXQUdBLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTCxDQUFXLE1BQVg7RUFMSTs7OztHQVgyQixVQUFVLENBQUM7O0FBa0I5QyxXQUFXLENBQUMsS0FBWixDQUFrQixxQkFBbEIsRUFBeUMsU0FBQyxJQUFELEVBQU8sT0FBUDtBQUN2QyxNQUFBO0VBQUEsR0FBQSxHQUFNLFdBQVcsQ0FBQyxPQUFaLENBQW9CLGlCQUFwQjtFQUNOLE1BQUEsR0FBUyxHQUFHLENBQUMsT0FBSixDQUFBO0VBQ1QsWUFBQSxHQUFlLE1BQU0sQ0FBQyxPQUFPLENBQUM7RUFFOUIsWUFBWSxDQUFDLFFBQWIsR0FBd0IsQ0FBQyxvQkFBQyxPQUFPLENBQUU7U0FDbkMsWUFBWSxDQUFDLElBQWIsQ0FBa0IsSUFBbEI7QUFOdUMsQ0FBekM7O0FBUUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIkID0gcmVxdWlyZSAnanF1ZXJ5J1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuXG5cbmNsYXNzIEJvb3RzdHJhcE1vZGFsUmVnaW9uIGV4dGVuZHMgTWFyaW9uZXR0ZS5SZWdpb25cbiAgZWw6ICcjbW9kYWwnXG4gIGJhY2tkcm9wOiBmYWxzZVxuICBrZXlib2FyZDogZmFsc2VcbiAgXG4gIGdldEVsOiAoc2VsZWN0b3IpIC0+XG4gICAgJGVsID0gJCBzZWxlY3RvclxuICAgICRlbC5hdHRyICdjbGFzcycsICdtb2RhbCdcbiAgICAjJGVsLmF0dHIgJ2NsYXNzJywgJ21vZGFsIGZhZGUnXG4gICAgJGVsXG4gICAgXG4gIHNob3c6ICh2aWV3KSAtPlxuICAgIHN1cGVyIHZpZXdcbiAgICBAJGVsLm1vZGFsXG4gICAgICBiYWNrZHJvcDogQGJhY2tkcm9wXG4gICAgICBrZXlib2FyZDogQGtleWJvYXJkXG4gICAgQCRlbC5tb2RhbCAnc2hvdydcbiAgICAgIFxuTWFpbkNoYW5uZWwucmVwbHkgJ21haW46YXBwOnNob3ctbW9kYWwnLCAodmlldywgb3B0aW9ucykgLT5cbiAgYXBwID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6b2JqZWN0J1xuICBsYXlvdXQgPSBhcHAuZ2V0VmlldygpXG4gIG1vZGFsX3JlZ2lvbiA9IGxheW91dC5yZWdpb25zLm1vZGFsXG4gICNtb2RhbF9yZWdpb24gPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpnZXQtcmVnaW9uJywgJ21vZGFsJ1xuICBtb2RhbF9yZWdpb24uYmFja2Ryb3AgPSAhIW9wdGlvbnM/LmJhY2tkcm9wXG4gIG1vZGFsX3JlZ2lvbi5zaG93IHZpZXdcbiAgXG5tb2R1bGUuZXhwb3J0cyA9IEJvb3RzdHJhcE1vZGFsUmVnaW9uXG4iXX0=
