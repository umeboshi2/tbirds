var BaseAppletLayout, NavbarChannel, SidebarAppletLayout, ToolbarAppletLayout, make_sidebar_template;

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

import tc from 'teacup';

import ms from 'ms';

import ShowInitialEmptyContent from '../behaviors/show-initial-empty';

import SlideDownRegion from '../regions/slidedown';

NavbarChannel = Backbone.Radio.channel('navbar');

make_sidebar_template = function(columns = 3, size = 'sm', position = 'left') {
  return tc.renderable(function() {
    if (position === 'left') {
      tc.div(`#sidebar.col-${size}-${columns}.left-column`);
    }
    tc.div(`#main-content.col-${size}-${12 - columns}`);
    if (position === 'right') {
      return tc.div(`#sidebar.col-${size}-${columns}.right-column`);
    }
  });
};

BaseAppletLayout = (function() {
  class BaseAppletLayout extends Marionette.View {
    onBeforeDestroy() {
      var entries;
      entries = NavbarChannel.request('get-entries', 'applet');
      return entries.reset();
    }

  };

  BaseAppletLayout.prototype.className = 'applet-container';

  BaseAppletLayout.prototype.behaviors = {
    ShowInitialEmptyContent: {
      behaviorClass: ShowInitialEmptyContent
    }
  };

  return BaseAppletLayout;

}).call(this);

SidebarAppletLayout = (function() {
  class SidebarAppletLayout extends BaseAppletLayout {};

  SidebarAppletLayout.prototype.template = make_sidebar_template();

  SidebarAppletLayout.prototype.regions = {
    sidebar: '#sidebar',
    content: '#main-content'
  };

  return SidebarAppletLayout;

}).call(this);

ToolbarAppletLayout = (function() {
  class ToolbarAppletLayout extends BaseAppletLayout {
    regions() {
      var region;
      region = new SlideDownRegion({
        el: '#main-content'
      });
      region.slide_speed = ms('.01s');
      return {
        content: region,
        toolbar: '#main-toolbar'
      };
    }

  };

  //el: '#applet-content'
  ToolbarAppletLayout.prototype.template = tc.renderable(function() {
    tc.div('.row', function() {
      //tc.div  '#main-toolbar.col-sm-8.col-sm-offset-2'
      return tc.div('#main-toolbar');
    });
    return tc.div('.row', function() {
      //tc.div '#main-content.col-sm-10.col-sm-offset-1'
      return tc.div('#main-content');
    });
  });

  return ToolbarAppletLayout;

}).call(this);

export {
  BaseAppletLayout,
  SidebarAppletLayout,
  ToolbarAppletLayout
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvbGF5b3V0LmpzIiwic291cmNlcyI6WyJ2aWV3cy9sYXlvdXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsZ0JBQUEsRUFBQSxhQUFBLEVBQUEsbUJBQUEsRUFBQSxtQkFBQSxFQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQU8sVUFBUCxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUVBLE9BQU8sdUJBQVAsTUFBQTs7QUFFQSxPQUFPLGVBQVAsTUFBQTs7QUFFQSxhQUFBLEdBQWdCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFFaEIscUJBQUEsR0FBd0IsUUFBQSxDQUFDLFVBQVEsQ0FBVCxFQUFZLE9BQUssSUFBakIsRUFBdUIsV0FBUyxNQUFoQyxDQUFBO1NBQ3RCLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFBLENBQUE7SUFDWixJQUFHLFFBQUEsS0FBWSxNQUFmO01BQ0UsRUFBRSxDQUFDLEdBQUgsQ0FBTyxDQUFBLGFBQUEsQ0FBQSxDQUFnQixJQUFoQixDQUFxQixDQUFyQixDQUFBLENBQXdCLE9BQXhCLENBQWdDLFlBQWhDLENBQVAsRUFERjs7SUFFQSxFQUFFLENBQUMsR0FBSCxDQUFPLENBQUEsa0JBQUEsQ0FBQSxDQUFxQixJQUFyQixDQUEwQixDQUExQixDQUFBLENBQTZCLEVBQUEsR0FBSyxPQUFsQyxDQUFBLENBQVA7SUFDQSxJQUFHLFFBQUEsS0FBWSxPQUFmO2FBQ0UsRUFBRSxDQUFDLEdBQUgsQ0FBTyxDQUFBLGFBQUEsQ0FBQSxDQUFnQixJQUFoQixDQUFxQixDQUFyQixDQUFBLENBQXdCLE9BQXhCLENBQWdDLGFBQWhDLENBQVAsRUFERjs7RUFKWSxDQUFkO0FBRHNCOztBQVNsQjtFQUFOLE1BQUEsaUJBQUEsUUFBK0IsVUFBVSxDQUFDLEtBQTFDO0lBRUUsZUFBaUIsQ0FBQSxDQUFBO0FBQ2YsVUFBQTtNQUFBLE9BQUEsR0FBVSxhQUFhLENBQUMsT0FBZCxDQUFzQixhQUF0QixFQUFxQyxRQUFyQzthQUNWLE9BQU8sQ0FBQyxLQUFSLENBQUE7SUFGZTs7RUFGbkI7OzZCQUNFLFNBQUEsR0FBVzs7NkJBSVgsU0FBQSxHQUNFO0lBQUEsdUJBQUEsRUFDRTtNQUFBLGFBQUEsRUFBZTtJQUFmO0VBREY7Ozs7OztBQUdFO0VBQU4sTUFBQSxvQkFBQSxRQUFrQyxpQkFBbEMsQ0FBQTs7Z0NBQ0UsUUFBQSxHQUFVLHFCQUFBLENBQUE7O2dDQUNWLE9BQUEsR0FDRTtJQUFBLE9BQUEsRUFBUyxVQUFUO0lBQ0EsT0FBQSxFQUFTO0VBRFQ7Ozs7OztBQUdFO0VBQU4sTUFBQSxvQkFBQSxRQUFrQyxpQkFBbEM7SUFTRSxPQUFTLENBQUEsQ0FBQTtBQUNQLFVBQUE7TUFBQSxNQUFBLEdBQVMsSUFBSSxlQUFKLENBQ1A7UUFBQSxFQUFBLEVBQUk7TUFBSixDQURPO01BRVQsTUFBTSxDQUFDLFdBQVAsR0FBcUIsRUFBQSxDQUFHLE1BQUg7YUFDckI7UUFBQSxPQUFBLEVBQVMsTUFBVDtRQUNBLE9BQUEsRUFBUztNQURUO0lBSk87O0VBVFg7OztnQ0FFRSxRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUEsQ0FBQTtJQUN0QixFQUFFLENBQUMsR0FBSCxDQUFPLE1BQVAsRUFBZSxRQUFBLENBQUEsQ0FBQSxFQUFBOzthQUViLEVBQUUsQ0FBQyxHQUFILENBQVEsZUFBUjtJQUZhLENBQWY7V0FHQSxFQUFFLENBQUMsR0FBSCxDQUFPLE1BQVAsRUFBZSxRQUFBLENBQUEsQ0FBQSxFQUFBOzthQUViLEVBQUUsQ0FBQyxHQUFILENBQU8sZUFBUDtJQUZhLENBQWY7RUFKc0IsQ0FBZDs7Ozs7O0FBY1osT0FBQTtFQUNFLGdCQURGO0VBRUUsbUJBRkY7RUFHRSxtQkFIRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuaW1wb3J0IG1zIGZyb20gJ21zJ1xuXG5pbXBvcnQgU2hvd0luaXRpYWxFbXB0eUNvbnRlbnQgZnJvbSAnLi4vYmVoYXZpb3JzL3Nob3ctaW5pdGlhbC1lbXB0eSdcblxuaW1wb3J0IFNsaWRlRG93blJlZ2lvbiBmcm9tICcuLi9yZWdpb25zL3NsaWRlZG93bidcblxuTmF2YmFyQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ25hdmJhcidcblxubWFrZV9zaWRlYmFyX3RlbXBsYXRlID0gKGNvbHVtbnM9Mywgc2l6ZT0nc20nLCBwb3NpdGlvbj0nbGVmdCcpIC0+XG4gIHRjLnJlbmRlcmFibGUgKCkgLT5cbiAgICBpZiBwb3NpdGlvbiBpcyAnbGVmdCdcbiAgICAgIHRjLmRpdiBcIiNzaWRlYmFyLmNvbC0je3NpemV9LSN7Y29sdW1uc30ubGVmdC1jb2x1bW5cIlxuICAgIHRjLmRpdiBcIiNtYWluLWNvbnRlbnQuY29sLSN7c2l6ZX0tI3sxMiAtIGNvbHVtbnN9XCJcbiAgICBpZiBwb3NpdGlvbiBpcyAncmlnaHQnXG4gICAgICB0Yy5kaXYgXCIjc2lkZWJhci5jb2wtI3tzaXplfS0je2NvbHVtbnN9LnJpZ2h0LWNvbHVtblwiXG5cblxuY2xhc3MgQmFzZUFwcGxldExheW91dCBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICBjbGFzc05hbWU6ICdhcHBsZXQtY29udGFpbmVyJ1xuICBvbkJlZm9yZURlc3Ryb3k6IC0+XG4gICAgZW50cmllcyA9IE5hdmJhckNoYW5uZWwucmVxdWVzdCAnZ2V0LWVudHJpZXMnLCAnYXBwbGV0J1xuICAgIGVudHJpZXMucmVzZXQoKVxuICBiZWhhdmlvcnM6XG4gICAgU2hvd0luaXRpYWxFbXB0eUNvbnRlbnQ6XG4gICAgICBiZWhhdmlvckNsYXNzOiBTaG93SW5pdGlhbEVtcHR5Q29udGVudFxuICBcbmNsYXNzIFNpZGViYXJBcHBsZXRMYXlvdXQgZXh0ZW5kcyBCYXNlQXBwbGV0TGF5b3V0XG4gIHRlbXBsYXRlOiBtYWtlX3NpZGViYXJfdGVtcGxhdGUoKVxuICByZWdpb25zOlxuICAgIHNpZGViYXI6ICcjc2lkZWJhcidcbiAgICBjb250ZW50OiAnI21haW4tY29udGVudCdcblxuY2xhc3MgVG9vbGJhckFwcGxldExheW91dCBleHRlbmRzIEJhc2VBcHBsZXRMYXlvdXRcbiAgI2VsOiAnI2FwcGxldC1jb250ZW50J1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAoKSAtPlxuICAgIHRjLmRpdiAnLnJvdycsIC0+XG4gICAgICAjdGMuZGl2ICAnI21haW4tdG9vbGJhci5jb2wtc20tOC5jb2wtc20tb2Zmc2V0LTInXG4gICAgICB0Yy5kaXYgICcjbWFpbi10b29sYmFyJ1xuICAgIHRjLmRpdiAnLnJvdycsIC0+XG4gICAgICAjdGMuZGl2ICcjbWFpbi1jb250ZW50LmNvbC1zbS0xMC5jb2wtc20tb2Zmc2V0LTEnXG4gICAgICB0Yy5kaXYgJyNtYWluLWNvbnRlbnQnXG4gIHJlZ2lvbnM6IC0+XG4gICAgcmVnaW9uID0gbmV3IFNsaWRlRG93blJlZ2lvblxuICAgICAgZWw6ICcjbWFpbi1jb250ZW50J1xuICAgIHJlZ2lvbi5zbGlkZV9zcGVlZCA9IG1zICcuMDFzJ1xuICAgIGNvbnRlbnQ6IHJlZ2lvblxuICAgIHRvb2xiYXI6ICcjbWFpbi10b29sYmFyJ1xuICAgIFxuZXhwb3J0IHtcbiAgQmFzZUFwcGxldExheW91dFxuICBTaWRlYmFyQXBwbGV0TGF5b3V0XG4gIFRvb2xiYXJBcHBsZXRMYXlvdXRcbiAgfVxuIl19
