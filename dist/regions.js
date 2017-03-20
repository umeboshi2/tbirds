var Backbone, BootstrapModalRegion, MainChannel, Marionette, SlideDownRegion, show_modal,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

MainChannel = Backbone.Radio.channel('global');

SlideDownRegion = (function(superClass) {
  extend(SlideDownRegion, superClass);

  function SlideDownRegion() {
    return SlideDownRegion.__super__.constructor.apply(this, arguments);
  }

  SlideDownRegion.prototype.attachHtml = function(view) {
    var speed;
    speed = this.slide_speed ? this.slide_speed : 'fast';
    this.$el.hide();
    this.$el.html(view.el);
    return this.$el.slideDown(speed);
  };

  return SlideDownRegion;

})(Backbone.Marionette.Region);

BootstrapModalRegion = (function(superClass) {
  extend(BootstrapModalRegion, superClass);

  function BootstrapModalRegion() {
    return BootstrapModalRegion.__super__.constructor.apply(this, arguments);
  }

  BootstrapModalRegion.prototype.el = '#modal';

  BootstrapModalRegion.prototype.backdrop = false;

  BootstrapModalRegion.prototype.getEl = function(selector) {
    var $el;
    $el = $(selector);
    $el.attr('class', 'modal');
    return $el;
  };

  BootstrapModalRegion.prototype.show = function(view) {
    BootstrapModalRegion.__super__.show.call(this, view);
    this.$el.modal({
      backdrop: this.backdrop
    });
    return this.$el.modal('show');
  };

  return BootstrapModalRegion;

})(Backbone.Marionette.Region);

show_modal = function(view, backdrop) {
  var modal_region;
  if (backdrop == null) {
    backdrop = false;
  }
  modal_region = MainChannel.request('main:app:get-region', 'modal');
  modal_region.backdrop = backdrop;
  return modal_region.show(view);
};

module.exports = {
  BootstrapModalRegion: BootstrapModalRegion,
  show_modal: show_modal,
  SlideDownRegion: SlideDownRegion,
  modal: BootstrapModalRegion,
  slideDown: SlideDownRegion
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaW9ucy5qcyIsInNvdXJjZXMiOlsicmVnaW9ucy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxvRkFBQTtFQUFBOzs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFFYixXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUdSOzs7Ozs7OzRCQUNKLFVBQUEsR0FBWSxTQUFDLElBQUQ7QUFDVixRQUFBO0lBQUEsS0FBQSxHQUFXLElBQUMsQ0FBQSxXQUFKLEdBQXFCLElBQUMsQ0FBQSxXQUF0QixHQUF1QztJQUMvQyxJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsQ0FBQTtJQUNBLElBQUMsQ0FBQSxHQUFHLENBQUMsSUFBTCxDQUFVLElBQUksQ0FBQyxFQUFmO1dBQ0EsSUFBQyxDQUFBLEdBQUcsQ0FBQyxTQUFMLENBQWUsS0FBZjtFQUpVOzs7O0dBRGdCLFFBQVEsQ0FBQyxVQUFVLENBQUM7O0FBTzVDOzs7Ozs7O2lDQUNKLEVBQUEsR0FBSTs7aUNBQ0osUUFBQSxHQUFVOztpQ0FFVixLQUFBLEdBQU8sU0FBQyxRQUFEO0FBQ0wsUUFBQTtJQUFBLEdBQUEsR0FBTSxDQUFBLENBQUUsUUFBRjtJQUNOLEdBQUcsQ0FBQyxJQUFKLENBQVMsT0FBVCxFQUFrQixPQUFsQjtXQUVBO0VBSks7O2lDQU1QLElBQUEsR0FBTSxTQUFDLElBQUQ7SUFDSiwrQ0FBTSxJQUFOO0lBQ0EsSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFMLENBQ0U7TUFBQSxRQUFBLEVBQVUsSUFBQyxDQUFBLFFBQVg7S0FERjtXQUVBLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTCxDQUFXLE1BQVg7RUFKSTs7OztHQVYyQixRQUFRLENBQUMsVUFBVSxDQUFDOztBQWdCdkQsVUFBQSxHQUFhLFNBQUMsSUFBRCxFQUFPLFFBQVA7QUFDWCxNQUFBOztJQURrQixXQUFTOztFQUMzQixZQUFBLEdBQWUsV0FBVyxDQUFDLE9BQVosQ0FBb0IscUJBQXBCLEVBQTJDLE9BQTNDO0VBQ2YsWUFBWSxDQUFDLFFBQWIsR0FBd0I7U0FDeEIsWUFBWSxDQUFDLElBQWIsQ0FBa0IsSUFBbEI7QUFIVzs7QUFLYixNQUFNLENBQUMsT0FBUCxHQUNFO0VBQUEsb0JBQUEsRUFBc0Isb0JBQXRCO0VBQ0EsVUFBQSxFQUFZLFVBRFo7RUFFQSxlQUFBLEVBQWlCLGVBRmpCO0VBSUEsS0FBQSxFQUFPLG9CQUpQO0VBS0EsU0FBQSxFQUFXLGVBTFgiLCJzb3VyY2VzQ29udGVudCI6WyJCYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuXG5cbmNsYXNzIFNsaWRlRG93blJlZ2lvbiBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuUmVnaW9uXG4gIGF0dGFjaEh0bWw6ICh2aWV3KSAtPlxuICAgIHNwZWVkID0gaWYgQHNsaWRlX3NwZWVkIHRoZW4gQHNsaWRlX3NwZWVkIGVsc2UgJ2Zhc3QnXG4gICAgQCRlbC5oaWRlKClcbiAgICBAJGVsLmh0bWwgdmlldy5lbFxuICAgIEAkZWwuc2xpZGVEb3duIHNwZWVkXG5cbmNsYXNzIEJvb3RzdHJhcE1vZGFsUmVnaW9uIGV4dGVuZHMgQmFja2JvbmUuTWFyaW9uZXR0ZS5SZWdpb25cbiAgZWw6ICcjbW9kYWwnXG4gIGJhY2tkcm9wOiBmYWxzZVxuICBcbiAgZ2V0RWw6IChzZWxlY3RvcikgLT5cbiAgICAkZWwgPSAkIHNlbGVjdG9yXG4gICAgJGVsLmF0dHIgJ2NsYXNzJywgJ21vZGFsJ1xuICAgICMkZWwuYXR0ciAnY2xhc3MnLCAnbW9kYWwgZmFkZSdcbiAgICAkZWxcbiAgICBcbiAgc2hvdzogKHZpZXcpIC0+XG4gICAgc3VwZXIgdmlld1xuICAgIEAkZWwubW9kYWxcbiAgICAgIGJhY2tkcm9wOiBAYmFja2Ryb3BcbiAgICBAJGVsLm1vZGFsICdzaG93J1xuICAgICAgXG5zaG93X21vZGFsID0gKHZpZXcsIGJhY2tkcm9wPWZhbHNlKSAtPlxuICBtb2RhbF9yZWdpb24gPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpnZXQtcmVnaW9uJywgJ21vZGFsJ1xuICBtb2RhbF9yZWdpb24uYmFja2Ryb3AgPSBiYWNrZHJvcFxuICBtb2RhbF9yZWdpb24uc2hvdyB2aWV3XG5cbm1vZHVsZS5leHBvcnRzID1cbiAgQm9vdHN0cmFwTW9kYWxSZWdpb246IEJvb3RzdHJhcE1vZGFsUmVnaW9uXG4gIHNob3dfbW9kYWw6IHNob3dfbW9kYWxcbiAgU2xpZGVEb3duUmVnaW9uOiBTbGlkZURvd25SZWdpb25cbiAgIyBuYW1lZFxuICBtb2RhbDogQm9vdHN0cmFwTW9kYWxSZWdpb25cbiAgc2xpZGVEb3duOiBTbGlkZURvd25SZWdpb25cbiJdfQ==
