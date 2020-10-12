var BaseAppletLayout, NavbarChannel, SidebarAppletLayout, ToolbarAppletLayout, make_sidebar_template;

import Backbone from 'backbone';

import {
  View
} from 'backbone.marionette';

import tc from 'teacup';

import ms from 'ms';

import ShowInitialEmptyContent from '../behaviors/show-initial-empty';

import SlideDownRegion from '../regions/slidedown';

if (__useCssModules__) {
  require("../../sass/applet-layout.scss");
}

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
  class BaseAppletLayout extends View {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvbGF5b3V0LmpzIiwic291cmNlcyI6WyJ2aWV3cy9sYXlvdXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsZ0JBQUEsRUFBQSxhQUFBLEVBQUEsbUJBQUEsRUFBQSxtQkFBQSxFQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxJQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQTs7QUFFQSxPQUFPLHVCQUFQLE1BQUE7O0FBRUEsT0FBTyxlQUFQLE1BQUE7O0FBRUEsSUFBRyxpQkFBSDtFQUNFLE9BQUEsQ0FBUSwrQkFBUixFQURGOzs7QUFHQSxhQUFBLEdBQWdCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFFaEIscUJBQUEsR0FBd0IsUUFBQSxDQUFDLFVBQVEsQ0FBVCxFQUFZLE9BQUssSUFBakIsRUFBdUIsV0FBUyxNQUFoQyxDQUFBO1NBQ3RCLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFBLENBQUE7SUFDWixJQUFHLFFBQUEsS0FBWSxNQUFmO01BQ0UsRUFBRSxDQUFDLEdBQUgsQ0FBTyxDQUFBLGFBQUEsQ0FBQSxDQUFnQixJQUFoQixDQUFBLENBQUEsQ0FBQSxDQUF3QixPQUF4QixDQUFBLFlBQUEsQ0FBUCxFQURGOztJQUVBLEVBQUUsQ0FBQyxHQUFILENBQU8sQ0FBQSxrQkFBQSxDQUFBLENBQXFCLElBQXJCLENBQUEsQ0FBQSxDQUFBLENBQTZCLEVBQUEsR0FBSyxPQUFsQyxDQUFBLENBQVA7SUFDQSxJQUFHLFFBQUEsS0FBWSxPQUFmO2FBQ0UsRUFBRSxDQUFDLEdBQUgsQ0FBTyxDQUFBLGFBQUEsQ0FBQSxDQUFnQixJQUFoQixDQUFBLENBQUEsQ0FBQSxDQUF3QixPQUF4QixDQUFBLGFBQUEsQ0FBUCxFQURGOztFQUpZLENBQWQ7QUFEc0I7O0FBU2xCO0VBQU4sTUFBQSxpQkFBQSxRQUErQixLQUEvQjtJQUVFLGVBQWlCLENBQUEsQ0FBQTtBQUNuQixVQUFBO01BQUksT0FBQSxHQUFVLGFBQWEsQ0FBQyxPQUFkLENBQXNCLGFBQXRCLEVBQXFDLFFBQXJDO2FBQ1YsT0FBTyxDQUFDLEtBQVIsQ0FBQTtJQUZlOztFQUZuQjs7NkJBQ0UsU0FBQSxHQUFXOzs2QkFJWCxTQUFBLEdBQ0U7SUFBQSx1QkFBQSxFQUNFO01BQUEsYUFBQSxFQUFlO0lBQWY7RUFERjs7Ozs7O0FBR0U7RUFBTixNQUFBLG9CQUFBLFFBQWtDLGlCQUFsQyxDQUFBOztnQ0FDRSxRQUFBLEdBQVUscUJBQUEsQ0FBQTs7Z0NBQ1YsT0FBQSxHQUNFO0lBQUEsT0FBQSxFQUFTLFVBQVQ7SUFDQSxPQUFBLEVBQVM7RUFEVDs7Ozs7O0FBR0U7RUFBTixNQUFBLG9CQUFBLFFBQWtDLGlCQUFsQztJQVNFLE9BQVMsQ0FBQSxDQUFBO0FBQ1gsVUFBQTtNQUFJLE1BQUEsR0FBUyxJQUFJLGVBQUosQ0FDUDtRQUFBLEVBQUEsRUFBSTtNQUFKLENBRE87TUFFVCxNQUFNLENBQUMsV0FBUCxHQUFxQixFQUFBLENBQUcsTUFBSDthQUNyQjtRQUFBLE9BQUEsRUFBUyxNQUFUO1FBQ0EsT0FBQSxFQUFTO01BRFQ7SUFKTzs7RUFUWDs7O2dDQUVFLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQSxDQUFBO0lBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sTUFBUCxFQUFlLFFBQUEsQ0FBQSxDQUFBLEVBQUE7O2FBRWIsRUFBRSxDQUFDLEdBQUgsQ0FBUSxlQUFSO0lBRmEsQ0FBZjtXQUdBLEVBQUUsQ0FBQyxHQUFILENBQU8sTUFBUCxFQUFlLFFBQUEsQ0FBQSxDQUFBLEVBQUE7O2FBRWIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxlQUFQO0lBRmEsQ0FBZjtFQUpzQixDQUFkOzs7Ozs7QUFjWixPQUFBO0VBQ0UsZ0JBREY7RUFFRSxtQkFGRjtFQUdFLG1CQUhGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuaW1wb3J0IG1zIGZyb20gJ21zJ1xuXG5pbXBvcnQgU2hvd0luaXRpYWxFbXB0eUNvbnRlbnQgZnJvbSAnLi4vYmVoYXZpb3JzL3Nob3ctaW5pdGlhbC1lbXB0eSdcblxuaW1wb3J0IFNsaWRlRG93blJlZ2lvbiBmcm9tICcuLi9yZWdpb25zL3NsaWRlZG93bidcblxuaWYgX191c2VDc3NNb2R1bGVzX19cbiAgcmVxdWlyZSBcIi4uLy4uL3Nhc3MvYXBwbGV0LWxheW91dC5zY3NzXCJcblxuTmF2YmFyQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ25hdmJhcidcblxubWFrZV9zaWRlYmFyX3RlbXBsYXRlID0gKGNvbHVtbnM9Mywgc2l6ZT0nc20nLCBwb3NpdGlvbj0nbGVmdCcpIC0+XG4gIHRjLnJlbmRlcmFibGUgKCkgLT5cbiAgICBpZiBwb3NpdGlvbiBpcyAnbGVmdCdcbiAgICAgIHRjLmRpdiBcIiNzaWRlYmFyLmNvbC0je3NpemV9LSN7Y29sdW1uc30ubGVmdC1jb2x1bW5cIlxuICAgIHRjLmRpdiBcIiNtYWluLWNvbnRlbnQuY29sLSN7c2l6ZX0tI3sxMiAtIGNvbHVtbnN9XCJcbiAgICBpZiBwb3NpdGlvbiBpcyAncmlnaHQnXG4gICAgICB0Yy5kaXYgXCIjc2lkZWJhci5jb2wtI3tzaXplfS0je2NvbHVtbnN9LnJpZ2h0LWNvbHVtblwiXG5cblxuY2xhc3MgQmFzZUFwcGxldExheW91dCBleHRlbmRzIFZpZXdcbiAgY2xhc3NOYW1lOiAnYXBwbGV0LWNvbnRhaW5lcidcbiAgb25CZWZvcmVEZXN0cm95OiAtPlxuICAgIGVudHJpZXMgPSBOYXZiYXJDaGFubmVsLnJlcXVlc3QgJ2dldC1lbnRyaWVzJywgJ2FwcGxldCdcbiAgICBlbnRyaWVzLnJlc2V0KClcbiAgYmVoYXZpb3JzOlxuICAgIFNob3dJbml0aWFsRW1wdHlDb250ZW50OlxuICAgICAgYmVoYXZpb3JDbGFzczogU2hvd0luaXRpYWxFbXB0eUNvbnRlbnRcbiAgXG5jbGFzcyBTaWRlYmFyQXBwbGV0TGF5b3V0IGV4dGVuZHMgQmFzZUFwcGxldExheW91dFxuICB0ZW1wbGF0ZTogbWFrZV9zaWRlYmFyX3RlbXBsYXRlKClcbiAgcmVnaW9uczpcbiAgICBzaWRlYmFyOiAnI3NpZGViYXInXG4gICAgY29udGVudDogJyNtYWluLWNvbnRlbnQnXG5cbmNsYXNzIFRvb2xiYXJBcHBsZXRMYXlvdXQgZXh0ZW5kcyBCYXNlQXBwbGV0TGF5b3V0XG4gICNlbDogJyNhcHBsZXQtY29udGVudCdcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgKCkgLT5cbiAgICB0Yy5kaXYgJy5yb3cnLCAtPlxuICAgICAgI3RjLmRpdiAgJyNtYWluLXRvb2xiYXIuY29sLXNtLTguY29sLXNtLW9mZnNldC0yJ1xuICAgICAgdGMuZGl2ICAnI21haW4tdG9vbGJhcidcbiAgICB0Yy5kaXYgJy5yb3cnLCAtPlxuICAgICAgI3RjLmRpdiAnI21haW4tY29udGVudC5jb2wtc20tMTAuY29sLXNtLW9mZnNldC0xJ1xuICAgICAgdGMuZGl2ICcjbWFpbi1jb250ZW50J1xuICByZWdpb25zOiAtPlxuICAgIHJlZ2lvbiA9IG5ldyBTbGlkZURvd25SZWdpb25cbiAgICAgIGVsOiAnI21haW4tY29udGVudCdcbiAgICByZWdpb24uc2xpZGVfc3BlZWQgPSBtcyAnLjAxcydcbiAgICBjb250ZW50OiByZWdpb25cbiAgICB0b29sYmFyOiAnI21haW4tdG9vbGJhcidcbiAgICBcbmV4cG9ydCB7XG4gIEJhc2VBcHBsZXRMYXlvdXRcbiAgU2lkZWJhckFwcGxldExheW91dFxuICBUb29sYmFyQXBwbGV0TGF5b3V0XG4gIH1cbiJdfQ==
