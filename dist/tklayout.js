var MainPageLayout, Marionette, ModalRegion, tc;

Marionette = require('backbone.marionette');

tc = require('teacup');

ModalRegion = require('./regions/bsmodal');

MainPageLayout = (function() {
  class MainPageLayout extends Marionette.View {};

  MainPageLayout.prototype.template = tc.renderable(function() {
    tc.div('#navbar-view-container');
    tc.div(".container-fluid", function() {
      tc.div('.row', function() {
        return tc.div('.col-sm-10.col-sm-offset-1', function() {
          return tc.div('#messages');
        });
      });
      tc.div('#applet-content.row');
      return tc.div('#footer.row');
    });
    return tc.div('#modal');
  });

  MainPageLayout.prototype.regions = {
    messages: '#messages',
    navbar: '#navbar-view-container',
    modal: ModalRegion,
    applet: '#applet-content',
    footer: '#footer'
  };

  return MainPageLayout;

}).call(this);

module.exports = MainPageLayout;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtsYXlvdXQuanMiLCJzb3VyY2VzIjpbInRrbGF5b3V0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLGNBQUEsRUFBQSxVQUFBLEVBQUEsV0FBQSxFQUFBOztBQUFBLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBQ2IsRUFBQSxHQUFLLE9BQUEsQ0FBUSxRQUFSOztBQUVMLFdBQUEsR0FBYyxPQUFBLENBQVEsbUJBQVI7O0FBRVI7RUFBTixNQUFBLGVBQUEsUUFBNkIsVUFBVSxDQUFDLEtBQXhDLENBQUE7OzJCQUNFLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQSxDQUFBO0lBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sd0JBQVA7SUFDQSxFQUFFLENBQUMsR0FBSCxDQUFPLGtCQUFQLEVBQTJCLFFBQUEsQ0FBQSxDQUFBO01BQ3pCLEVBQUUsQ0FBQyxHQUFILENBQU8sTUFBUCxFQUFlLFFBQUEsQ0FBQSxDQUFBO2VBQ2IsRUFBRSxDQUFDLEdBQUgsQ0FBTyw0QkFBUCxFQUFxQyxRQUFBLENBQUEsQ0FBQTtpQkFDbkMsRUFBRSxDQUFDLEdBQUgsQ0FBTyxXQUFQO1FBRG1DLENBQXJDO01BRGEsQ0FBZjtNQUdBLEVBQUUsQ0FBQyxHQUFILENBQU8scUJBQVA7YUFDQSxFQUFFLENBQUMsR0FBSCxDQUFPLGFBQVA7SUFMeUIsQ0FBM0I7V0FNQSxFQUFFLENBQUMsR0FBSCxDQUFPLFFBQVA7RUFSc0IsQ0FBZDs7MkJBVVYsT0FBQSxHQUNFO0lBQUEsUUFBQSxFQUFVLFdBQVY7SUFDQSxNQUFBLEVBQVEsd0JBRFI7SUFFQSxLQUFBLEVBQU8sV0FGUDtJQUdBLE1BQUEsRUFBUSxpQkFIUjtJQUlBLE1BQUEsRUFBUTtFQUpSOzs7Ozs7QUFNSixNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIk1hcmlvbmV0dGUgPSByZXF1aXJlICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xudGMgPSByZXF1aXJlICd0ZWFjdXAnXG5cbk1vZGFsUmVnaW9uID0gcmVxdWlyZSAnLi9yZWdpb25zL2JzbW9kYWwnXG5cbmNsYXNzIE1haW5QYWdlTGF5b3V0IGV4dGVuZHMgTWFyaW9uZXR0ZS5WaWV3XG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlICgpIC0+XG4gICAgdGMuZGl2ICcjbmF2YmFyLXZpZXctY29udGFpbmVyJ1xuICAgIHRjLmRpdiBcIi5jb250YWluZXItZmx1aWRcIiwgLT5cbiAgICAgIHRjLmRpdiAnLnJvdycsIC0+XG4gICAgICAgIHRjLmRpdiAnLmNvbC1zbS0xMC5jb2wtc20tb2Zmc2V0LTEnLCAtPlxuICAgICAgICAgIHRjLmRpdiAnI21lc3NhZ2VzJ1xuICAgICAgdGMuZGl2ICcjYXBwbGV0LWNvbnRlbnQucm93J1xuICAgICAgdGMuZGl2ICcjZm9vdGVyLnJvdydcbiAgICB0Yy5kaXYgJyNtb2RhbCdcblxuICByZWdpb25zOlxuICAgIG1lc3NhZ2VzOiAnI21lc3NhZ2VzJ1xuICAgIG5hdmJhcjogJyNuYXZiYXItdmlldy1jb250YWluZXInXG4gICAgbW9kYWw6IE1vZGFsUmVnaW9uXG4gICAgYXBwbGV0OiAnI2FwcGxldC1jb250ZW50J1xuICAgIGZvb3RlcjogJyNmb290ZXInXG4gICAgXG5tb2R1bGUuZXhwb3J0cyA9IE1haW5QYWdlTGF5b3V0XG5cblxuIl19
