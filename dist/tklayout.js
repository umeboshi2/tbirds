var MainPageLayout;

import Marionette from 'backbone.marionette';

import tc from 'teacup';

import ModalRegion from './regions/bsmodal';

if (__useCssModules__) {
  require("../sass/main-grid.scss");
}

MainPageLayout = (function() {
  class MainPageLayout extends Marionette.View {};

  MainPageLayout.prototype.template = tc.renderable(function() {
    tc.div('#navbar-view-container');
    tc.div(".container-fluid", function() {
      tc.div('.row', function() {
        return tc.div('#messages');
      });
      tc.div('#applet-content');
      return tc.div('#footer');
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

export default MainPageLayout;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtsYXlvdXQuanMiLCJzb3VyY2VzIjpbInRrbGF5b3V0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQU8sVUFBUCxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUVBLE9BQU8sV0FBUCxNQUFBOztBQUNBLElBQUcsaUJBQUg7RUFDRSxPQUFBLENBQVEsd0JBQVIsRUFERjs7O0FBR007RUFBTixNQUFBLGVBQUEsUUFBNkIsVUFBVSxDQUFDLEtBQXhDLENBQUE7OzJCQUNFLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQSxDQUFBO0lBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sd0JBQVA7SUFDQSxFQUFFLENBQUMsR0FBSCxDQUFPLGtCQUFQLEVBQTJCLFFBQUEsQ0FBQSxDQUFBO01BQ3pCLEVBQUUsQ0FBQyxHQUFILENBQU8sTUFBUCxFQUFlLFFBQUEsQ0FBQSxDQUFBO2VBQ2IsRUFBRSxDQUFDLEdBQUgsQ0FBTyxXQUFQO01BRGEsQ0FBZjtNQUVBLEVBQUUsQ0FBQyxHQUFILENBQU8saUJBQVA7YUFDQSxFQUFFLENBQUMsR0FBSCxDQUFPLFNBQVA7SUFKeUIsQ0FBM0I7V0FLQSxFQUFFLENBQUMsR0FBSCxDQUFPLFFBQVA7RUFQc0IsQ0FBZDs7MkJBU1YsT0FBQSxHQUNFO0lBQUEsUUFBQSxFQUFVLFdBQVY7SUFDQSxNQUFBLEVBQVEsd0JBRFI7SUFFQSxLQUFBLEVBQU8sV0FGUDtJQUdBLE1BQUEsRUFBUSxpQkFIUjtJQUlBLE1BQUEsRUFBUTtFQUpSOzs7Ozs7QUFNSixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuaW1wb3J0IE1vZGFsUmVnaW9uIGZyb20gJy4vcmVnaW9ucy9ic21vZGFsJ1xuaWYgX191c2VDc3NNb2R1bGVzX19cbiAgcmVxdWlyZSBcIi4uL3Nhc3MvbWFpbi1ncmlkLnNjc3NcIlxuXG5jbGFzcyBNYWluUGFnZUxheW91dCBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAoKSAtPlxuICAgIHRjLmRpdiAnI25hdmJhci12aWV3LWNvbnRhaW5lcidcbiAgICB0Yy5kaXYgXCIuY29udGFpbmVyLWZsdWlkXCIsIC0+XG4gICAgICB0Yy5kaXYgJy5yb3cnLCAtPlxuICAgICAgICB0Yy5kaXYgJyNtZXNzYWdlcydcbiAgICAgIHRjLmRpdiAnI2FwcGxldC1jb250ZW50J1xuICAgICAgdGMuZGl2ICcjZm9vdGVyJ1xuICAgIHRjLmRpdiAnI21vZGFsJ1xuXG4gIHJlZ2lvbnM6XG4gICAgbWVzc2FnZXM6ICcjbWVzc2FnZXMnXG4gICAgbmF2YmFyOiAnI25hdmJhci12aWV3LWNvbnRhaW5lcidcbiAgICBtb2RhbDogTW9kYWxSZWdpb25cbiAgICBhcHBsZXQ6ICcjYXBwbGV0LWNvbnRlbnQnXG4gICAgZm9vdGVyOiAnI2Zvb3RlcidcbiAgICBcbmV4cG9ydCBkZWZhdWx0IE1haW5QYWdlTGF5b3V0XG5cblxuIl19
