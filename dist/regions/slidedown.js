var SlideDownRegion;

import $ from 'jquery';

import {
  Region
} from 'backbone.marionette';

SlideDownRegion = class SlideDownRegion extends Region {
  attachHtml(view) {
    var speed;
    speed = this.slide_speed ? this.slide_speed : 'fast';
    this.$el.hide();
    this.$el.html(view.el);
    return this.$el.slideDown(speed);
  }

};

export default SlideDownRegion;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaW9ucy9zbGlkZWRvd24uanMiLCJzb3VyY2VzIjpbInJlZ2lvbnMvc2xpZGVkb3duLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQU8sQ0FBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxNQUFUO0NBQUEsTUFBQTs7QUFFTSxrQkFBTixNQUFBLGdCQUFBLFFBQThCLE9BQTlCO0VBQ0UsVUFBWSxDQUFDLElBQUQsQ0FBQTtBQUNkLFFBQUE7SUFBSSxLQUFBLEdBQVcsSUFBQyxDQUFBLFdBQUosR0FBcUIsSUFBQyxDQUFBLFdBQXRCLEdBQXVDO0lBQy9DLElBQUMsQ0FBQSxHQUFHLENBQUMsSUFBTCxDQUFBO0lBQ0EsSUFBQyxDQUFBLEdBQUcsQ0FBQyxJQUFMLENBQVUsSUFBSSxDQUFDLEVBQWY7V0FDQSxJQUFDLENBQUEsR0FBRyxDQUFDLFNBQUwsQ0FBZSxLQUFmO0VBSlU7O0FBRGQ7O0FBT0EsT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuaW1wb3J0IHsgUmVnaW9uIH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuY2xhc3MgU2xpZGVEb3duUmVnaW9uIGV4dGVuZHMgUmVnaW9uXG4gIGF0dGFjaEh0bWw6ICh2aWV3KSAtPlxuICAgIHNwZWVkID0gaWYgQHNsaWRlX3NwZWVkIHRoZW4gQHNsaWRlX3NwZWVkIGVsc2UgJ2Zhc3QnXG4gICAgQCRlbC5oaWRlKClcbiAgICBAJGVsLmh0bWwgdmlldy5lbFxuICAgIEAkZWwuc2xpZGVEb3duIHNwZWVkXG5cbmV4cG9ydCBkZWZhdWx0IFNsaWRlRG93blJlZ2lvblxuIl19
