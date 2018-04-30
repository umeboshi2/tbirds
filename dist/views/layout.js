var BaseAppletLayout, NavbarChannel, SidebarAppletLayout, ToolbarAppletLayout, make_sidebar_template;

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvbGF5b3V0LmpzIiwic291cmNlcyI6WyJ2aWV3cy9sYXlvdXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsZ0JBQUEsRUFBQSxhQUFBLEVBQUEsbUJBQUEsRUFBQSxtQkFBQSxFQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQU8sVUFBUCxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUVBLE9BQU8sdUJBQVAsTUFBQTs7QUFFQSxPQUFPLGVBQVAsTUFBQTs7QUFFQSxJQUFHLGlCQUFIO0VBQ0UsT0FBQSxDQUFRLCtCQUFSLEVBREY7OztBQUdBLGFBQUEsR0FBZ0IsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUVoQixxQkFBQSxHQUF3QixRQUFBLENBQUMsVUFBUSxDQUFULEVBQVksT0FBSyxJQUFqQixFQUF1QixXQUFTLE1BQWhDLENBQUE7U0FDdEIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUEsQ0FBQTtJQUNaLElBQUcsUUFBQSxLQUFZLE1BQWY7TUFDRSxFQUFFLENBQUMsR0FBSCxDQUFPLENBQUEsYUFBQSxDQUFBLENBQWdCLElBQWhCLENBQXFCLENBQXJCLENBQUEsQ0FBd0IsT0FBeEIsQ0FBZ0MsWUFBaEMsQ0FBUCxFQURGOztJQUVBLEVBQUUsQ0FBQyxHQUFILENBQU8sQ0FBQSxrQkFBQSxDQUFBLENBQXFCLElBQXJCLENBQTBCLENBQTFCLENBQUEsQ0FBNkIsRUFBQSxHQUFLLE9BQWxDLENBQUEsQ0FBUDtJQUNBLElBQUcsUUFBQSxLQUFZLE9BQWY7YUFDRSxFQUFFLENBQUMsR0FBSCxDQUFPLENBQUEsYUFBQSxDQUFBLENBQWdCLElBQWhCLENBQXFCLENBQXJCLENBQUEsQ0FBd0IsT0FBeEIsQ0FBZ0MsYUFBaEMsQ0FBUCxFQURGOztFQUpZLENBQWQ7QUFEc0I7O0FBU2xCO0VBQU4sTUFBQSxpQkFBQSxRQUErQixVQUFVLENBQUMsS0FBMUM7SUFFRSxlQUFpQixDQUFBLENBQUE7QUFDZixVQUFBO01BQUEsT0FBQSxHQUFVLGFBQWEsQ0FBQyxPQUFkLENBQXNCLGFBQXRCLEVBQXFDLFFBQXJDO2FBQ1YsT0FBTyxDQUFDLEtBQVIsQ0FBQTtJQUZlOztFQUZuQjs7NkJBQ0UsU0FBQSxHQUFXOzs2QkFJWCxTQUFBLEdBQ0U7SUFBQSx1QkFBQSxFQUNFO01BQUEsYUFBQSxFQUFlO0lBQWY7RUFERjs7Ozs7O0FBR0U7RUFBTixNQUFBLG9CQUFBLFFBQWtDLGlCQUFsQyxDQUFBOztnQ0FDRSxRQUFBLEdBQVUscUJBQUEsQ0FBQTs7Z0NBQ1YsT0FBQSxHQUNFO0lBQUEsT0FBQSxFQUFTLFVBQVQ7SUFDQSxPQUFBLEVBQVM7RUFEVDs7Ozs7O0FBR0U7RUFBTixNQUFBLG9CQUFBLFFBQWtDLGlCQUFsQztJQVNFLE9BQVMsQ0FBQSxDQUFBO0FBQ1AsVUFBQTtNQUFBLE1BQUEsR0FBUyxJQUFJLGVBQUosQ0FDUDtRQUFBLEVBQUEsRUFBSTtNQUFKLENBRE87TUFFVCxNQUFNLENBQUMsV0FBUCxHQUFxQixFQUFBLENBQUcsTUFBSDthQUNyQjtRQUFBLE9BQUEsRUFBUyxNQUFUO1FBQ0EsT0FBQSxFQUFTO01BRFQ7SUFKTzs7RUFUWDs7O2dDQUVFLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQSxDQUFBO0lBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sTUFBUCxFQUFlLFFBQUEsQ0FBQSxDQUFBLEVBQUE7O2FBRWIsRUFBRSxDQUFDLEdBQUgsQ0FBUSxlQUFSO0lBRmEsQ0FBZjtXQUdBLEVBQUUsQ0FBQyxHQUFILENBQU8sTUFBUCxFQUFlLFFBQUEsQ0FBQSxDQUFBLEVBQUE7O2FBRWIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxlQUFQO0lBRmEsQ0FBZjtFQUpzQixDQUFkOzs7Ozs7QUFjWixPQUFBO0VBQ0UsZ0JBREY7RUFFRSxtQkFGRjtFQUdFLG1CQUhGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5pbXBvcnQgbXMgZnJvbSAnbXMnXG5cbmltcG9ydCBTaG93SW5pdGlhbEVtcHR5Q29udGVudCBmcm9tICcuLi9iZWhhdmlvcnMvc2hvdy1pbml0aWFsLWVtcHR5J1xuXG5pbXBvcnQgU2xpZGVEb3duUmVnaW9uIGZyb20gJy4uL3JlZ2lvbnMvc2xpZGVkb3duJ1xuXG5pZiBfX3VzZUNzc01vZHVsZXNfX1xuICByZXF1aXJlIFwiLi4vLi4vc2Fzcy9hcHBsZXQtbGF5b3V0LnNjc3NcIlxuXG5OYXZiYXJDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbmF2YmFyJ1xuXG5tYWtlX3NpZGViYXJfdGVtcGxhdGUgPSAoY29sdW1ucz0zLCBzaXplPSdzbScsIHBvc2l0aW9uPSdsZWZ0JykgLT5cbiAgdGMucmVuZGVyYWJsZSAoKSAtPlxuICAgIGlmIHBvc2l0aW9uIGlzICdsZWZ0J1xuICAgICAgdGMuZGl2IFwiI3NpZGViYXIuY29sLSN7c2l6ZX0tI3tjb2x1bW5zfS5sZWZ0LWNvbHVtblwiXG4gICAgdGMuZGl2IFwiI21haW4tY29udGVudC5jb2wtI3tzaXplfS0jezEyIC0gY29sdW1uc31cIlxuICAgIGlmIHBvc2l0aW9uIGlzICdyaWdodCdcbiAgICAgIHRjLmRpdiBcIiNzaWRlYmFyLmNvbC0je3NpemV9LSN7Y29sdW1uc30ucmlnaHQtY29sdW1uXCJcblxuXG5jbGFzcyBCYXNlQXBwbGV0TGF5b3V0IGV4dGVuZHMgTWFyaW9uZXR0ZS5WaWV3XG4gIGNsYXNzTmFtZTogJ2FwcGxldC1jb250YWluZXInXG4gIG9uQmVmb3JlRGVzdHJveTogLT5cbiAgICBlbnRyaWVzID0gTmF2YmFyQ2hhbm5lbC5yZXF1ZXN0ICdnZXQtZW50cmllcycsICdhcHBsZXQnXG4gICAgZW50cmllcy5yZXNldCgpXG4gIGJlaGF2aW9yczpcbiAgICBTaG93SW5pdGlhbEVtcHR5Q29udGVudDpcbiAgICAgIGJlaGF2aW9yQ2xhc3M6IFNob3dJbml0aWFsRW1wdHlDb250ZW50XG4gIFxuY2xhc3MgU2lkZWJhckFwcGxldExheW91dCBleHRlbmRzIEJhc2VBcHBsZXRMYXlvdXRcbiAgdGVtcGxhdGU6IG1ha2Vfc2lkZWJhcl90ZW1wbGF0ZSgpXG4gIHJlZ2lvbnM6XG4gICAgc2lkZWJhcjogJyNzaWRlYmFyJ1xuICAgIGNvbnRlbnQ6ICcjbWFpbi1jb250ZW50J1xuXG5jbGFzcyBUb29sYmFyQXBwbGV0TGF5b3V0IGV4dGVuZHMgQmFzZUFwcGxldExheW91dFxuICAjZWw6ICcjYXBwbGV0LWNvbnRlbnQnXG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlICgpIC0+XG4gICAgdGMuZGl2ICcucm93JywgLT5cbiAgICAgICN0Yy5kaXYgICcjbWFpbi10b29sYmFyLmNvbC1zbS04LmNvbC1zbS1vZmZzZXQtMidcbiAgICAgIHRjLmRpdiAgJyNtYWluLXRvb2xiYXInXG4gICAgdGMuZGl2ICcucm93JywgLT5cbiAgICAgICN0Yy5kaXYgJyNtYWluLWNvbnRlbnQuY29sLXNtLTEwLmNvbC1zbS1vZmZzZXQtMSdcbiAgICAgIHRjLmRpdiAnI21haW4tY29udGVudCdcbiAgcmVnaW9uczogLT5cbiAgICByZWdpb24gPSBuZXcgU2xpZGVEb3duUmVnaW9uXG4gICAgICBlbDogJyNtYWluLWNvbnRlbnQnXG4gICAgcmVnaW9uLnNsaWRlX3NwZWVkID0gbXMgJy4wMXMnXG4gICAgY29udGVudDogcmVnaW9uXG4gICAgdG9vbGJhcjogJyNtYWluLXRvb2xiYXInXG4gICAgXG5leHBvcnQge1xuICBCYXNlQXBwbGV0TGF5b3V0XG4gIFNpZGViYXJBcHBsZXRMYXlvdXRcbiAgVG9vbGJhckFwcGxldExheW91dFxuICB9XG4iXX0=
