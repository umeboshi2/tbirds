var $, Marionette, SlideDownRegion,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

$ = require('jquery');

Marionette = require('backbone.marionette');

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

})(Marionette.Region);

module.exports = SlideDownRegion;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaW9ucy9zbGlkZWRvd24uanMiLCJzb3VyY2VzIjpbInJlZ2lvbnMvc2xpZGVkb3duLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLDhCQUFBO0VBQUE7OztBQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsUUFBUjs7QUFDSixVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUVQOzs7Ozs7OzRCQUNKLFVBQUEsR0FBWSxTQUFDLElBQUQ7QUFDVixRQUFBO0lBQUEsS0FBQSxHQUFXLElBQUMsQ0FBQSxXQUFKLEdBQXFCLElBQUMsQ0FBQSxXQUF0QixHQUF1QztJQUMvQyxJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsQ0FBQTtJQUNBLElBQUMsQ0FBQSxHQUFHLENBQUMsSUFBTCxDQUFVLElBQUksQ0FBQyxFQUFmO1dBQ0EsSUFBQyxDQUFBLEdBQUcsQ0FBQyxTQUFMLENBQWUsS0FBZjtFQUpVOzs7O0dBRGdCLFVBQVUsQ0FBQzs7QUFPekMsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIkID0gcmVxdWlyZSAnanF1ZXJ5J1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5cbmNsYXNzIFNsaWRlRG93blJlZ2lvbiBleHRlbmRzIE1hcmlvbmV0dGUuUmVnaW9uXG4gIGF0dGFjaEh0bWw6ICh2aWV3KSAtPlxuICAgIHNwZWVkID0gaWYgQHNsaWRlX3NwZWVkIHRoZW4gQHNsaWRlX3NwZWVkIGVsc2UgJ2Zhc3QnXG4gICAgQCRlbC5oaWRlKClcbiAgICBAJGVsLmh0bWwgdmlldy5lbFxuICAgIEAkZWwuc2xpZGVEb3duIHNwZWVkXG5cbm1vZHVsZS5leHBvcnRzID0gU2xpZGVEb3duUmVnaW9uXG4iXX0=
