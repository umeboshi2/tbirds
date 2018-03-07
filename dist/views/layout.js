var Backbone, Marionette, ShowInitialEmptyContent, SidebarAppletLayout, SlideDownRegion, ToolbarAppletLayout, make_sidebar_template, ms, tc;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

tc = require('teacup');

ms = require('ms');

ShowInitialEmptyContent = require('../behaviors/show-initial-empty');

SlideDownRegion = require('../regions/slidedown');

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

SidebarAppletLayout = (function() {
  class SidebarAppletLayout extends Backbone.Marionette.View {};

  SidebarAppletLayout.prototype.template = make_sidebar_template();

  SidebarAppletLayout.prototype.regions = {
    sidebar: '#sidebar',
    content: '#main-content'
  };

  return SidebarAppletLayout;

}).call(this);

ToolbarAppletLayout = (function() {
  class ToolbarAppletLayout extends Backbone.Marionette.View {
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

  ToolbarAppletLayout.prototype.behaviors = {
    ShowInitialEmptyContent: {
      behaviorClass: ShowInitialEmptyContent
    }
  };

  ToolbarAppletLayout.prototype.template = tc.renderable(function() {
    return tc.div('.col-sm-12', function() {
      tc.div('.row', function() {
        return tc.div('#main-toolbar.col-sm-8.col-sm-offset-2');
      });
      return tc.div('.row', function() {
        return tc.div('#main-content.col-sm-10.col-sm-offset-1');
      });
    });
  });

  return ToolbarAppletLayout;

}).call(this);

module.exports = {
  SidebarAppletLayout: SidebarAppletLayout,
  ToolbarAppletLayout: ToolbarAppletLayout
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvbGF5b3V0LmpzIiwic291cmNlcyI6WyJ2aWV3cy9sYXlvdXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsUUFBQSxFQUFBLFVBQUEsRUFBQSx1QkFBQSxFQUFBLG1CQUFBLEVBQUEsZUFBQSxFQUFBLG1CQUFBLEVBQUEscUJBQUEsRUFBQSxFQUFBLEVBQUE7O0FBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxVQUFSOztBQUNYLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBQ2IsRUFBQSxHQUFLLE9BQUEsQ0FBUSxRQUFSOztBQUNMLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUjs7QUFFTCx1QkFBQSxHQUEwQixPQUFBLENBQVEsaUNBQVI7O0FBRTFCLGVBQUEsR0FBa0IsT0FBQSxDQUFRLHNCQUFSOztBQUVsQixxQkFBQSxHQUF3QixRQUFBLENBQUMsVUFBUSxDQUFULEVBQVksT0FBSyxJQUFqQixFQUF1QixXQUFTLE1BQWhDLENBQUE7U0FDdEIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUEsQ0FBQTtJQUNaLElBQUcsUUFBQSxLQUFZLE1BQWY7TUFDRSxFQUFFLENBQUMsR0FBSCxDQUFPLENBQUEsYUFBQSxDQUFBLENBQWdCLElBQWhCLENBQXFCLENBQXJCLENBQUEsQ0FBd0IsT0FBeEIsQ0FBZ0MsWUFBaEMsQ0FBUCxFQURGOztJQUVBLEVBQUUsQ0FBQyxHQUFILENBQU8sQ0FBQSxrQkFBQSxDQUFBLENBQXFCLElBQXJCLENBQTBCLENBQTFCLENBQUEsQ0FBNkIsRUFBQSxHQUFLLE9BQWxDLENBQUEsQ0FBUDtJQUNBLElBQUcsUUFBQSxLQUFZLE9BQWY7YUFDRSxFQUFFLENBQUMsR0FBSCxDQUFPLENBQUEsYUFBQSxDQUFBLENBQWdCLElBQWhCLENBQXFCLENBQXJCLENBQUEsQ0FBd0IsT0FBeEIsQ0FBZ0MsYUFBaEMsQ0FBUCxFQURGOztFQUpZLENBQWQ7QUFEc0I7O0FBUWxCO0VBQU4sTUFBQSxvQkFBQSxRQUFrQyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQXRELENBQUE7O2dDQUNFLFFBQUEsR0FBVSxxQkFBQSxDQUFBOztnQ0FDVixPQUFBLEdBQ0U7SUFBQSxPQUFBLEVBQVMsVUFBVDtJQUNBLE9BQUEsRUFBUztFQURUOzs7Ozs7QUFHRTtFQUFOLE1BQUEsb0JBQUEsUUFBa0MsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUF0RDtJQVVFLE9BQVMsQ0FBQSxDQUFBO0FBQ1AsVUFBQTtNQUFBLE1BQUEsR0FBUyxJQUFJLGVBQUosQ0FDUDtRQUFBLEVBQUEsRUFBSTtNQUFKLENBRE87TUFFVCxNQUFNLENBQUMsV0FBUCxHQUFxQixFQUFBLENBQUcsTUFBSDthQUNyQjtRQUFBLE9BQUEsRUFBUyxNQUFUO1FBQ0EsT0FBQSxFQUFTO01BRFQ7SUFKTzs7RUFWWDs7Z0NBQ0UsU0FBQSxHQUNFO0lBQUEsdUJBQUEsRUFDRTtNQUFBLGFBQUEsRUFBZTtJQUFmO0VBREY7O2dDQUVGLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQSxDQUFBO1dBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sWUFBUCxFQUFxQixRQUFBLENBQUEsQ0FBQTtNQUNuQixFQUFFLENBQUMsR0FBSCxDQUFPLE1BQVAsRUFBZSxRQUFBLENBQUEsQ0FBQTtlQUNiLEVBQUUsQ0FBQyxHQUFILENBQVEsd0NBQVI7TUFEYSxDQUFmO2FBRUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyxNQUFQLEVBQWUsUUFBQSxDQUFBLENBQUE7ZUFDYixFQUFFLENBQUMsR0FBSCxDQUFPLHlDQUFQO01BRGEsQ0FBZjtJQUhtQixDQUFyQjtFQURzQixDQUFkOzs7Ozs7QUFhWixNQUFNLENBQUMsT0FBUCxHQUNFO0VBQUEsbUJBQUEsRUFBcUIsbUJBQXJCO0VBQ0EsbUJBQUEsRUFBcUI7QUFEckIiLCJzb3VyY2VzQ29udGVudCI6WyJCYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG50YyA9IHJlcXVpcmUgJ3RlYWN1cCdcbm1zID0gcmVxdWlyZSAnbXMnXG5cblNob3dJbml0aWFsRW1wdHlDb250ZW50ID0gcmVxdWlyZSAnLi4vYmVoYXZpb3JzL3Nob3ctaW5pdGlhbC1lbXB0eSdcblxuU2xpZGVEb3duUmVnaW9uID0gcmVxdWlyZSAnLi4vcmVnaW9ucy9zbGlkZWRvd24nXG5cbm1ha2Vfc2lkZWJhcl90ZW1wbGF0ZSA9IChjb2x1bW5zPTMsIHNpemU9J3NtJywgcG9zaXRpb249J2xlZnQnKSAtPlxuICB0Yy5yZW5kZXJhYmxlICgpIC0+XG4gICAgaWYgcG9zaXRpb24gaXMgJ2xlZnQnXG4gICAgICB0Yy5kaXYgXCIjc2lkZWJhci5jb2wtI3tzaXplfS0je2NvbHVtbnN9LmxlZnQtY29sdW1uXCJcbiAgICB0Yy5kaXYgXCIjbWFpbi1jb250ZW50LmNvbC0je3NpemV9LSN7MTIgLSBjb2x1bW5zfVwiXG4gICAgaWYgcG9zaXRpb24gaXMgJ3JpZ2h0J1xuICAgICAgdGMuZGl2IFwiI3NpZGViYXIuY29sLSN7c2l6ZX0tI3tjb2x1bW5zfS5yaWdodC1jb2x1bW5cIlxuXG5jbGFzcyBTaWRlYmFyQXBwbGV0TGF5b3V0IGV4dGVuZHMgQmFja2JvbmUuTWFyaW9uZXR0ZS5WaWV3XG4gIHRlbXBsYXRlOiBtYWtlX3NpZGViYXJfdGVtcGxhdGUoKVxuICByZWdpb25zOlxuICAgIHNpZGViYXI6ICcjc2lkZWJhcidcbiAgICBjb250ZW50OiAnI21haW4tY29udGVudCdcblxuY2xhc3MgVG9vbGJhckFwcGxldExheW91dCBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuVmlld1xuICBiZWhhdmlvcnM6XG4gICAgU2hvd0luaXRpYWxFbXB0eUNvbnRlbnQ6XG4gICAgICBiZWhhdmlvckNsYXNzOiBTaG93SW5pdGlhbEVtcHR5Q29udGVudFxuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAoKSAtPlxuICAgIHRjLmRpdiAnLmNvbC1zbS0xMicsIC0+XG4gICAgICB0Yy5kaXYgJy5yb3cnLCAtPlxuICAgICAgICB0Yy5kaXYgICcjbWFpbi10b29sYmFyLmNvbC1zbS04LmNvbC1zbS1vZmZzZXQtMidcbiAgICAgIHRjLmRpdiAnLnJvdycsIC0+XG4gICAgICAgIHRjLmRpdiAnI21haW4tY29udGVudC5jb2wtc20tMTAuY29sLXNtLW9mZnNldC0xJ1xuICByZWdpb25zOiAtPlxuICAgIHJlZ2lvbiA9IG5ldyBTbGlkZURvd25SZWdpb25cbiAgICAgIGVsOiAnI21haW4tY29udGVudCdcbiAgICByZWdpb24uc2xpZGVfc3BlZWQgPSBtcyAnLjAxcydcbiAgICBjb250ZW50OiByZWdpb25cbiAgICB0b29sYmFyOiAnI21haW4tdG9vbGJhcidcblxubW9kdWxlLmV4cG9ydHMgPVxuICBTaWRlYmFyQXBwbGV0TGF5b3V0OiBTaWRlYmFyQXBwbGV0TGF5b3V0XG4gIFRvb2xiYXJBcHBsZXRMYXlvdXQ6IFRvb2xiYXJBcHBsZXRMYXlvdXRcbiAgXG4iXX0=
