var MainPageLayout;

import Marionette from 'backbone.marionette';

import tc from 'teacup';

import ModalRegion from './regions/bsmodal';

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtsYXlvdXQuanMiLCJzb3VyY2VzIjpbInRrbGF5b3V0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQU8sVUFBUCxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUVBLE9BQU8sV0FBUCxNQUFBOztBQUVNO0VBQU4sTUFBQSxlQUFBLFFBQTZCLFVBQVUsQ0FBQyxLQUF4QyxDQUFBOzsyQkFDRSxRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUEsQ0FBQTtJQUN0QixFQUFFLENBQUMsR0FBSCxDQUFPLHdCQUFQO0lBQ0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyxrQkFBUCxFQUEyQixRQUFBLENBQUEsQ0FBQTtNQUN6QixFQUFFLENBQUMsR0FBSCxDQUFPLE1BQVAsRUFBZSxRQUFBLENBQUEsQ0FBQTtlQUNiLEVBQUUsQ0FBQyxHQUFILENBQU8sV0FBUDtNQURhLENBQWY7TUFFQSxFQUFFLENBQUMsR0FBSCxDQUFPLGlCQUFQO2FBQ0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyxTQUFQO0lBSnlCLENBQTNCO1dBS0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyxRQUFQO0VBUHNCLENBQWQ7OzJCQVNWLE9BQUEsR0FDRTtJQUFBLFFBQUEsRUFBVSxXQUFWO0lBQ0EsTUFBQSxFQUFRLHdCQURSO0lBRUEsS0FBQSxFQUFPLFdBRlA7SUFHQSxNQUFBLEVBQVEsaUJBSFI7SUFJQSxNQUFBLEVBQVE7RUFKUjs7Ozs7O0FBTUosT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5cbmltcG9ydCBNb2RhbFJlZ2lvbiBmcm9tICcuL3JlZ2lvbnMvYnNtb2RhbCdcblxuY2xhc3MgTWFpblBhZ2VMYXlvdXQgZXh0ZW5kcyBNYXJpb25ldHRlLlZpZXdcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgKCkgLT5cbiAgICB0Yy5kaXYgJyNuYXZiYXItdmlldy1jb250YWluZXInXG4gICAgdGMuZGl2IFwiLmNvbnRhaW5lci1mbHVpZFwiLCAtPlxuICAgICAgdGMuZGl2ICcucm93JywgLT5cbiAgICAgICAgdGMuZGl2ICcjbWVzc2FnZXMnXG4gICAgICB0Yy5kaXYgJyNhcHBsZXQtY29udGVudCdcbiAgICAgIHRjLmRpdiAnI2Zvb3RlcidcbiAgICB0Yy5kaXYgJyNtb2RhbCdcblxuICByZWdpb25zOlxuICAgIG1lc3NhZ2VzOiAnI21lc3NhZ2VzJ1xuICAgIG5hdmJhcjogJyNuYXZiYXItdmlldy1jb250YWluZXInXG4gICAgbW9kYWw6IE1vZGFsUmVnaW9uXG4gICAgYXBwbGV0OiAnI2FwcGxldC1jb250ZW50J1xuICAgIGZvb3RlcjogJyNmb290ZXInXG4gICAgXG5leHBvcnQgZGVmYXVsdCBNYWluUGFnZUxheW91dFxuXG5cbiJdfQ==
