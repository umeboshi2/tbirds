var BaseAppletLayout, NavbarChannel, SidebarAppletLayout, ToolbarAppletLayout, make_sidebar_template;

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

import tc from 'teacup';

import ms from 'ms';

import ShowInitialEmptyContent from '../behaviors/show-initial-empty';

import SlideDownRegion from '../regions/slidedown';

import "../../sass/applet-layout.scss";

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvbGF5b3V0LmpzIiwic291cmNlcyI6WyJ2aWV3cy9sYXlvdXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsZ0JBQUEsRUFBQSxhQUFBLEVBQUEsbUJBQUEsRUFBQSxtQkFBQSxFQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQU8sVUFBUCxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUVBLE9BQU8sdUJBQVAsTUFBQTs7QUFFQSxPQUFPLGVBQVAsTUFBQTs7QUFFQSxPQUFBOztBQUVBLGFBQUEsR0FBZ0IsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUVoQixxQkFBQSxHQUF3QixRQUFBLENBQUMsVUFBUSxDQUFULEVBQVksT0FBSyxJQUFqQixFQUF1QixXQUFTLE1BQWhDLENBQUE7U0FDdEIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUEsQ0FBQTtJQUNaLElBQUcsUUFBQSxLQUFZLE1BQWY7TUFDRSxFQUFFLENBQUMsR0FBSCxDQUFPLENBQUEsYUFBQSxDQUFBLENBQWdCLElBQWhCLENBQXFCLENBQXJCLENBQUEsQ0FBd0IsT0FBeEIsQ0FBZ0MsWUFBaEMsQ0FBUCxFQURGOztJQUVBLEVBQUUsQ0FBQyxHQUFILENBQU8sQ0FBQSxrQkFBQSxDQUFBLENBQXFCLElBQXJCLENBQTBCLENBQTFCLENBQUEsQ0FBNkIsRUFBQSxHQUFLLE9BQWxDLENBQUEsQ0FBUDtJQUNBLElBQUcsUUFBQSxLQUFZLE9BQWY7YUFDRSxFQUFFLENBQUMsR0FBSCxDQUFPLENBQUEsYUFBQSxDQUFBLENBQWdCLElBQWhCLENBQXFCLENBQXJCLENBQUEsQ0FBd0IsT0FBeEIsQ0FBZ0MsYUFBaEMsQ0FBUCxFQURGOztFQUpZLENBQWQ7QUFEc0I7O0FBU2xCO0VBQU4sTUFBQSxpQkFBQSxRQUErQixVQUFVLENBQUMsS0FBMUM7SUFFRSxlQUFpQixDQUFBLENBQUE7QUFDZixVQUFBO01BQUEsT0FBQSxHQUFVLGFBQWEsQ0FBQyxPQUFkLENBQXNCLGFBQXRCLEVBQXFDLFFBQXJDO2FBQ1YsT0FBTyxDQUFDLEtBQVIsQ0FBQTtJQUZlOztFQUZuQjs7NkJBQ0UsU0FBQSxHQUFXOzs2QkFJWCxTQUFBLEdBQ0U7SUFBQSx1QkFBQSxFQUNFO01BQUEsYUFBQSxFQUFlO0lBQWY7RUFERjs7Ozs7O0FBR0U7RUFBTixNQUFBLG9CQUFBLFFBQWtDLGlCQUFsQyxDQUFBOztnQ0FDRSxRQUFBLEdBQVUscUJBQUEsQ0FBQTs7Z0NBQ1YsT0FBQSxHQUNFO0lBQUEsT0FBQSxFQUFTLFVBQVQ7SUFDQSxPQUFBLEVBQVM7RUFEVDs7Ozs7O0FBR0U7RUFBTixNQUFBLG9CQUFBLFFBQWtDLGlCQUFsQztJQVNFLE9BQVMsQ0FBQSxDQUFBO0FBQ1AsVUFBQTtNQUFBLE1BQUEsR0FBUyxJQUFJLGVBQUosQ0FDUDtRQUFBLEVBQUEsRUFBSTtNQUFKLENBRE87TUFFVCxNQUFNLENBQUMsV0FBUCxHQUFxQixFQUFBLENBQUcsTUFBSDthQUNyQjtRQUFBLE9BQUEsRUFBUyxNQUFUO1FBQ0EsT0FBQSxFQUFTO01BRFQ7SUFKTzs7RUFUWDs7O2dDQUVFLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQSxDQUFBO0lBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sTUFBUCxFQUFlLFFBQUEsQ0FBQSxDQUFBLEVBQUE7O2FBRWIsRUFBRSxDQUFDLEdBQUgsQ0FBUSxlQUFSO0lBRmEsQ0FBZjtXQUdBLEVBQUUsQ0FBQyxHQUFILENBQU8sTUFBUCxFQUFlLFFBQUEsQ0FBQSxDQUFBLEVBQUE7O2FBRWIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxlQUFQO0lBRmEsQ0FBZjtFQUpzQixDQUFkOzs7Ozs7QUFjWixPQUFBO0VBQ0UsZ0JBREY7RUFFRSxtQkFGRjtFQUdFLG1CQUhGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5pbXBvcnQgbXMgZnJvbSAnbXMnXG5cbmltcG9ydCBTaG93SW5pdGlhbEVtcHR5Q29udGVudCBmcm9tICcuLi9iZWhhdmlvcnMvc2hvdy1pbml0aWFsLWVtcHR5J1xuXG5pbXBvcnQgU2xpZGVEb3duUmVnaW9uIGZyb20gJy4uL3JlZ2lvbnMvc2xpZGVkb3duJ1xuXG5pbXBvcnQgXCIuLi8uLi9zYXNzL2FwcGxldC1sYXlvdXQuc2Nzc1wiXG5cbk5hdmJhckNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICduYXZiYXInXG5cbm1ha2Vfc2lkZWJhcl90ZW1wbGF0ZSA9IChjb2x1bW5zPTMsIHNpemU9J3NtJywgcG9zaXRpb249J2xlZnQnKSAtPlxuICB0Yy5yZW5kZXJhYmxlICgpIC0+XG4gICAgaWYgcG9zaXRpb24gaXMgJ2xlZnQnXG4gICAgICB0Yy5kaXYgXCIjc2lkZWJhci5jb2wtI3tzaXplfS0je2NvbHVtbnN9LmxlZnQtY29sdW1uXCJcbiAgICB0Yy5kaXYgXCIjbWFpbi1jb250ZW50LmNvbC0je3NpemV9LSN7MTIgLSBjb2x1bW5zfVwiXG4gICAgaWYgcG9zaXRpb24gaXMgJ3JpZ2h0J1xuICAgICAgdGMuZGl2IFwiI3NpZGViYXIuY29sLSN7c2l6ZX0tI3tjb2x1bW5zfS5yaWdodC1jb2x1bW5cIlxuXG5cbmNsYXNzIEJhc2VBcHBsZXRMYXlvdXQgZXh0ZW5kcyBNYXJpb25ldHRlLlZpZXdcbiAgY2xhc3NOYW1lOiAnYXBwbGV0LWNvbnRhaW5lcidcbiAgb25CZWZvcmVEZXN0cm95OiAtPlxuICAgIGVudHJpZXMgPSBOYXZiYXJDaGFubmVsLnJlcXVlc3QgJ2dldC1lbnRyaWVzJywgJ2FwcGxldCdcbiAgICBlbnRyaWVzLnJlc2V0KClcbiAgYmVoYXZpb3JzOlxuICAgIFNob3dJbml0aWFsRW1wdHlDb250ZW50OlxuICAgICAgYmVoYXZpb3JDbGFzczogU2hvd0luaXRpYWxFbXB0eUNvbnRlbnRcbiAgXG5jbGFzcyBTaWRlYmFyQXBwbGV0TGF5b3V0IGV4dGVuZHMgQmFzZUFwcGxldExheW91dFxuICB0ZW1wbGF0ZTogbWFrZV9zaWRlYmFyX3RlbXBsYXRlKClcbiAgcmVnaW9uczpcbiAgICBzaWRlYmFyOiAnI3NpZGViYXInXG4gICAgY29udGVudDogJyNtYWluLWNvbnRlbnQnXG5cbmNsYXNzIFRvb2xiYXJBcHBsZXRMYXlvdXQgZXh0ZW5kcyBCYXNlQXBwbGV0TGF5b3V0XG4gICNlbDogJyNhcHBsZXQtY29udGVudCdcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgKCkgLT5cbiAgICB0Yy5kaXYgJy5yb3cnLCAtPlxuICAgICAgI3RjLmRpdiAgJyNtYWluLXRvb2xiYXIuY29sLXNtLTguY29sLXNtLW9mZnNldC0yJ1xuICAgICAgdGMuZGl2ICAnI21haW4tdG9vbGJhcidcbiAgICB0Yy5kaXYgJy5yb3cnLCAtPlxuICAgICAgI3RjLmRpdiAnI21haW4tY29udGVudC5jb2wtc20tMTAuY29sLXNtLW9mZnNldC0xJ1xuICAgICAgdGMuZGl2ICcjbWFpbi1jb250ZW50J1xuICByZWdpb25zOiAtPlxuICAgIHJlZ2lvbiA9IG5ldyBTbGlkZURvd25SZWdpb25cbiAgICAgIGVsOiAnI21haW4tY29udGVudCdcbiAgICByZWdpb24uc2xpZGVfc3BlZWQgPSBtcyAnLjAxcydcbiAgICBjb250ZW50OiByZWdpb25cbiAgICB0b29sYmFyOiAnI21haW4tdG9vbGJhcidcbiAgICBcbmV4cG9ydCB7XG4gIEJhc2VBcHBsZXRMYXlvdXRcbiAgU2lkZWJhckFwcGxldExheW91dFxuICBUb29sYmFyQXBwbGV0TGF5b3V0XG4gIH1cbiJdfQ==
