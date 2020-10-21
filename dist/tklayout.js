var MainPageLayout;

import {
  View
} from 'backbone.marionette';

import tc from 'teacup';

import ModalRegion from './regions/bsmodal';

MainPageLayout = (function() {
  class MainPageLayout extends View {};

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtsYXlvdXQuanMiLCJzb3VyY2VzIjpbInRrbGF5b3V0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQUE7RUFBUyxJQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQTs7QUFFQSxPQUFPLFdBQVAsTUFBQTs7QUFFTTtFQUFOLE1BQUEsZUFBQSxRQUE2QixLQUE3QixDQUFBOzsyQkFDRSxRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUEsQ0FBQTtJQUN0QixFQUFFLENBQUMsR0FBSCxDQUFPLHdCQUFQO0lBQ0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyxrQkFBUCxFQUEyQixRQUFBLENBQUEsQ0FBQTtNQUN6QixFQUFFLENBQUMsR0FBSCxDQUFPLE1BQVAsRUFBZSxRQUFBLENBQUEsQ0FBQTtlQUNiLEVBQUUsQ0FBQyxHQUFILENBQU8sV0FBUDtNQURhLENBQWY7TUFFQSxFQUFFLENBQUMsR0FBSCxDQUFPLGlCQUFQO2FBQ0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyxTQUFQO0lBSnlCLENBQTNCO1dBS0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyxRQUFQO0VBUHNCLENBQWQ7OzJCQVNWLE9BQUEsR0FDRTtJQUFBLFFBQUEsRUFBVSxXQUFWO0lBQ0EsTUFBQSxFQUFRLHdCQURSO0lBRUEsS0FBQSxFQUFPLFdBRlA7SUFHQSxNQUFBLEVBQVEsaUJBSFI7SUFJQSxNQUFBLEVBQVE7RUFKUjs7Ozs7O0FBTUosT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlldyB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuXG5pbXBvcnQgTW9kYWxSZWdpb24gZnJvbSAnLi9yZWdpb25zL2JzbW9kYWwnXG5cbmNsYXNzIE1haW5QYWdlTGF5b3V0IGV4dGVuZHMgVmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAoKSAtPlxuICAgIHRjLmRpdiAnI25hdmJhci12aWV3LWNvbnRhaW5lcidcbiAgICB0Yy5kaXYgXCIuY29udGFpbmVyLWZsdWlkXCIsIC0+XG4gICAgICB0Yy5kaXYgJy5yb3cnLCAtPlxuICAgICAgICB0Yy5kaXYgJyNtZXNzYWdlcydcbiAgICAgIHRjLmRpdiAnI2FwcGxldC1jb250ZW50J1xuICAgICAgdGMuZGl2ICcjZm9vdGVyJ1xuICAgIHRjLmRpdiAnI21vZGFsJ1xuXG4gIHJlZ2lvbnM6XG4gICAgbWVzc2FnZXM6ICcjbWVzc2FnZXMnXG4gICAgbmF2YmFyOiAnI25hdmJhci12aWV3LWNvbnRhaW5lcidcbiAgICBtb2RhbDogTW9kYWxSZWdpb25cbiAgICBhcHBsZXQ6ICcjYXBwbGV0LWNvbnRlbnQnXG4gICAgZm9vdGVyOiAnI2Zvb3RlcidcbiAgICBcbmV4cG9ydCBkZWZhdWx0IE1haW5QYWdlTGF5b3V0XG5cblxuIl19
