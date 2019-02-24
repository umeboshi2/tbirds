var MainPageLayout;

import {
  View
} from 'backbone.marionette';

import tc from 'teacup';

import ModalRegion from './regions/bsmodal';

if (__useCssModules__) {
  require("../sass/main-grid.scss");
}

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtsYXlvdXQuanMiLCJzb3VyY2VzIjpbInRrbGF5b3V0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQUE7RUFBUyxJQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQTs7QUFFQSxPQUFPLFdBQVAsTUFBQTs7QUFDQSxJQUFHLGlCQUFIO0VBQ0UsT0FBQSxDQUFRLHdCQUFSLEVBREY7OztBQUdNO0VBQU4sTUFBQSxlQUFBLFFBQTZCLEtBQTdCLENBQUE7OzJCQUNFLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQSxDQUFBO0lBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sd0JBQVA7SUFDQSxFQUFFLENBQUMsR0FBSCxDQUFPLGtCQUFQLEVBQTJCLFFBQUEsQ0FBQSxDQUFBO01BQ3pCLEVBQUUsQ0FBQyxHQUFILENBQU8sTUFBUCxFQUFlLFFBQUEsQ0FBQSxDQUFBO2VBQ2IsRUFBRSxDQUFDLEdBQUgsQ0FBTyxXQUFQO01BRGEsQ0FBZjtNQUVBLEVBQUUsQ0FBQyxHQUFILENBQU8saUJBQVA7YUFDQSxFQUFFLENBQUMsR0FBSCxDQUFPLFNBQVA7SUFKeUIsQ0FBM0I7V0FLQSxFQUFFLENBQUMsR0FBSCxDQUFPLFFBQVA7RUFQc0IsQ0FBZDs7MkJBU1YsT0FBQSxHQUNFO0lBQUEsUUFBQSxFQUFVLFdBQVY7SUFDQSxNQUFBLEVBQVEsd0JBRFI7SUFFQSxLQUFBLEVBQU8sV0FGUDtJQUdBLE1BQUEsRUFBUSxpQkFIUjtJQUlBLE1BQUEsRUFBUTtFQUpSOzs7Ozs7QUFNSixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWaWV3IH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5cbmltcG9ydCBNb2RhbFJlZ2lvbiBmcm9tICcuL3JlZ2lvbnMvYnNtb2RhbCdcbmlmIF9fdXNlQ3NzTW9kdWxlc19fXG4gIHJlcXVpcmUgXCIuLi9zYXNzL21haW4tZ3JpZC5zY3NzXCJcblxuY2xhc3MgTWFpblBhZ2VMYXlvdXQgZXh0ZW5kcyBWaWV3XG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlICgpIC0+XG4gICAgdGMuZGl2ICcjbmF2YmFyLXZpZXctY29udGFpbmVyJ1xuICAgIHRjLmRpdiBcIi5jb250YWluZXItZmx1aWRcIiwgLT5cbiAgICAgIHRjLmRpdiAnLnJvdycsIC0+XG4gICAgICAgIHRjLmRpdiAnI21lc3NhZ2VzJ1xuICAgICAgdGMuZGl2ICcjYXBwbGV0LWNvbnRlbnQnXG4gICAgICB0Yy5kaXYgJyNmb290ZXInXG4gICAgdGMuZGl2ICcjbW9kYWwnXG5cbiAgcmVnaW9uczpcbiAgICBtZXNzYWdlczogJyNtZXNzYWdlcydcbiAgICBuYXZiYXI6ICcjbmF2YmFyLXZpZXctY29udGFpbmVyJ1xuICAgIG1vZGFsOiBNb2RhbFJlZ2lvblxuICAgIGFwcGxldDogJyNhcHBsZXQtY29udGVudCdcbiAgICBmb290ZXI6ICcjZm9vdGVyJ1xuICAgIFxuZXhwb3J0IGRlZmF1bHQgTWFpblBhZ2VMYXlvdXRcblxuXG4iXX0=
