var SlideDownRegion;

import $ from 'jquery';

import Marionette from 'backbone.marionette';

SlideDownRegion = class SlideDownRegion extends Marionette.Region {
  attachHtml(view) {
    var speed;
    speed = this.slide_speed ? this.slide_speed : 'fast';
    this.$el.hide();
    this.$el.html(view.el);
    return this.$el.slideDown(speed);
  }

};

export default SlideDownRegion;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaW9ucy9zbGlkZWRvd24uanMiLCJzb3VyY2VzIjpbInJlZ2lvbnMvc2xpZGVkb3duLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQU8sQ0FBUCxNQUFBOztBQUNBLE9BQU8sVUFBUCxNQUFBOztBQUVNLGtCQUFOLE1BQUEsZ0JBQUEsUUFBOEIsVUFBVSxDQUFDLE9BQXpDO0VBQ0UsVUFBWSxDQUFDLElBQUQsQ0FBQTtBQUNWLFFBQUE7SUFBQSxLQUFBLEdBQVcsSUFBQyxDQUFBLFdBQUosR0FBcUIsSUFBQyxDQUFBLFdBQXRCLEdBQXVDO0lBQy9DLElBQUMsQ0FBQSxHQUFHLENBQUMsSUFBTCxDQUFBO0lBQ0EsSUFBQyxDQUFBLEdBQUcsQ0FBQyxJQUFMLENBQVUsSUFBSSxDQUFDLEVBQWY7V0FDQSxJQUFDLENBQUEsR0FBRyxDQUFDLFNBQUwsQ0FBZSxLQUFmO0VBSlU7O0FBRGQ7O0FBT0EsT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuY2xhc3MgU2xpZGVEb3duUmVnaW9uIGV4dGVuZHMgTWFyaW9uZXR0ZS5SZWdpb25cbiAgYXR0YWNoSHRtbDogKHZpZXcpIC0+XG4gICAgc3BlZWQgPSBpZiBAc2xpZGVfc3BlZWQgdGhlbiBAc2xpZGVfc3BlZWQgZWxzZSAnZmFzdCdcbiAgICBAJGVsLmhpZGUoKVxuICAgIEAkZWwuaHRtbCB2aWV3LmVsXG4gICAgQCRlbC5zbGlkZURvd24gc3BlZWRcblxuZXhwb3J0IGRlZmF1bHQgU2xpZGVEb3duUmVnaW9uXG4iXX0=
