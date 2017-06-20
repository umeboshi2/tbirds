var Backbone, Marionette, ShowInitialEmptyContent, SidebarAppletLayout, SlideDownRegion, ToolbarAppletLayout, make_sidebar_template, ms, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

tc = require('teacup');

ms = require('ms');

ShowInitialEmptyContent = require('../behaviors/show-initial-empty');

SlideDownRegion = require('../regions/slidedown');

make_sidebar_template = function(columns, size, position) {
  if (columns == null) {
    columns = 3;
  }
  if (size == null) {
    size = 'sm';
  }
  if (position == null) {
    position = 'left';
  }
  return tc.renderable(function() {
    if (position === 'left') {
      tc.div("#sidebar.col-" + size + "-" + columns + ".left-column");
    }
    tc.div("#main-content.col-" + size + "-" + (12 - columns));
    if (position === 'right') {
      return tc.div("#sidebar.col-" + size + "-" + columns + ".right-column");
    }
  });
};

SidebarAppletLayout = (function(superClass) {
  extend(SidebarAppletLayout, superClass);

  function SidebarAppletLayout() {
    return SidebarAppletLayout.__super__.constructor.apply(this, arguments);
  }

  SidebarAppletLayout.prototype.template = make_sidebar_template();

  SidebarAppletLayout.prototype.regions = {
    sidebar: '#sidebar',
    content: '#main-content'
  };

  return SidebarAppletLayout;

})(Backbone.Marionette.View);

ToolbarAppletLayout = (function(superClass) {
  extend(ToolbarAppletLayout, superClass);

  function ToolbarAppletLayout() {
    return ToolbarAppletLayout.__super__.constructor.apply(this, arguments);
  }

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

  ToolbarAppletLayout.prototype.regions = function() {
    var region;
    region = new SlideDownRegion({
      el: '#main-content'
    });
    region.slide_speed = ms('.01s');
    return {
      content: region,
      toolbar: '#main-toolbar'
    };
  };

  return ToolbarAppletLayout;

})(Backbone.Marionette.View);

module.exports = {
  SidebarAppletLayout: SidebarAppletLayout,
  ToolbarAppletLayout: ToolbarAppletLayout
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvbGF5b3V0LmpzIiwic291cmNlcyI6WyJ2aWV3cy9sYXlvdXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsdUlBQUE7RUFBQTs7O0FBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxVQUFSOztBQUNYLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBQ2IsRUFBQSxHQUFLLE9BQUEsQ0FBUSxRQUFSOztBQUNMLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUjs7QUFFTCx1QkFBQSxHQUEwQixPQUFBLENBQVEsaUNBQVI7O0FBRTFCLGVBQUEsR0FBa0IsT0FBQSxDQUFRLHNCQUFSOztBQUVsQixxQkFBQSxHQUF3QixTQUFDLE9BQUQsRUFBWSxJQUFaLEVBQXVCLFFBQXZCOztJQUFDLFVBQVE7OztJQUFHLE9BQUs7OztJQUFNLFdBQVM7O1NBQ3RELEVBQUUsQ0FBQyxVQUFILENBQWMsU0FBQTtJQUNaLElBQUcsUUFBQSxLQUFZLE1BQWY7TUFDRSxFQUFFLENBQUMsR0FBSCxDQUFPLGVBQUEsR0FBZ0IsSUFBaEIsR0FBcUIsR0FBckIsR0FBd0IsT0FBeEIsR0FBZ0MsY0FBdkMsRUFERjs7SUFFQSxFQUFFLENBQUMsR0FBSCxDQUFPLG9CQUFBLEdBQXFCLElBQXJCLEdBQTBCLEdBQTFCLEdBQTRCLENBQUMsRUFBQSxHQUFLLE9BQU4sQ0FBbkM7SUFDQSxJQUFHLFFBQUEsS0FBWSxPQUFmO2FBQ0UsRUFBRSxDQUFDLEdBQUgsQ0FBTyxlQUFBLEdBQWdCLElBQWhCLEdBQXFCLEdBQXJCLEdBQXdCLE9BQXhCLEdBQWdDLGVBQXZDLEVBREY7O0VBSlksQ0FBZDtBQURzQjs7QUFRbEI7Ozs7Ozs7Z0NBQ0osUUFBQSxHQUFVLHFCQUFBLENBQUE7O2dDQUNWLE9BQUEsR0FDRTtJQUFBLE9BQUEsRUFBUyxVQUFUO0lBQ0EsT0FBQSxFQUFTLGVBRFQ7Ozs7O0dBSDhCLFFBQVEsQ0FBQyxVQUFVLENBQUM7O0FBTWhEOzs7Ozs7O2dDQUNKLFNBQUEsR0FDRTtJQUFBLHVCQUFBLEVBQ0U7TUFBQSxhQUFBLEVBQWUsdUJBQWY7S0FERjs7O2dDQUVGLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFNBQUE7V0FDdEIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxZQUFQLEVBQXFCLFNBQUE7TUFDbkIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxNQUFQLEVBQWUsU0FBQTtlQUNiLEVBQUUsQ0FBQyxHQUFILENBQVEsd0NBQVI7TUFEYSxDQUFmO2FBRUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyxNQUFQLEVBQWUsU0FBQTtlQUNiLEVBQUUsQ0FBQyxHQUFILENBQU8seUNBQVA7TUFEYSxDQUFmO0lBSG1CLENBQXJCO0VBRHNCLENBQWQ7O2dDQU1WLE9BQUEsR0FBUyxTQUFBO0FBQ1AsUUFBQTtJQUFBLE1BQUEsR0FBUyxJQUFJLGVBQUosQ0FDUDtNQUFBLEVBQUEsRUFBSSxlQUFKO0tBRE87SUFFVCxNQUFNLENBQUMsV0FBUCxHQUFxQixFQUFBLENBQUcsTUFBSDtXQUNyQjtNQUFBLE9BQUEsRUFBUyxNQUFUO01BQ0EsT0FBQSxFQUFTLGVBRFQ7O0VBSk87Ozs7R0FWdUIsUUFBUSxDQUFDLFVBQVUsQ0FBQzs7QUFpQnRELE1BQU0sQ0FBQyxPQUFQLEdBQ0U7RUFBQSxtQkFBQSxFQUFxQixtQkFBckI7RUFDQSxtQkFBQSxFQUFxQixtQkFEckIiLCJzb3VyY2VzQ29udGVudCI6WyJCYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG50YyA9IHJlcXVpcmUgJ3RlYWN1cCdcbm1zID0gcmVxdWlyZSAnbXMnXG5cblNob3dJbml0aWFsRW1wdHlDb250ZW50ID0gcmVxdWlyZSAnLi4vYmVoYXZpb3JzL3Nob3ctaW5pdGlhbC1lbXB0eSdcblxuU2xpZGVEb3duUmVnaW9uID0gcmVxdWlyZSAnLi4vcmVnaW9ucy9zbGlkZWRvd24nXG5cbm1ha2Vfc2lkZWJhcl90ZW1wbGF0ZSA9IChjb2x1bW5zPTMsIHNpemU9J3NtJywgcG9zaXRpb249J2xlZnQnKSAtPlxuICB0Yy5yZW5kZXJhYmxlICgpIC0+XG4gICAgaWYgcG9zaXRpb24gaXMgJ2xlZnQnXG4gICAgICB0Yy5kaXYgXCIjc2lkZWJhci5jb2wtI3tzaXplfS0je2NvbHVtbnN9LmxlZnQtY29sdW1uXCJcbiAgICB0Yy5kaXYgXCIjbWFpbi1jb250ZW50LmNvbC0je3NpemV9LSN7MTIgLSBjb2x1bW5zfVwiXG4gICAgaWYgcG9zaXRpb24gaXMgJ3JpZ2h0J1xuICAgICAgdGMuZGl2IFwiI3NpZGViYXIuY29sLSN7c2l6ZX0tI3tjb2x1bW5zfS5yaWdodC1jb2x1bW5cIlxuXG5jbGFzcyBTaWRlYmFyQXBwbGV0TGF5b3V0IGV4dGVuZHMgQmFja2JvbmUuTWFyaW9uZXR0ZS5WaWV3XG4gIHRlbXBsYXRlOiBtYWtlX3NpZGViYXJfdGVtcGxhdGUoKVxuICByZWdpb25zOlxuICAgIHNpZGViYXI6ICcjc2lkZWJhcidcbiAgICBjb250ZW50OiAnI21haW4tY29udGVudCdcblxuY2xhc3MgVG9vbGJhckFwcGxldExheW91dCBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuVmlld1xuICBiZWhhdmlvcnM6XG4gICAgU2hvd0luaXRpYWxFbXB0eUNvbnRlbnQ6XG4gICAgICBiZWhhdmlvckNsYXNzOiBTaG93SW5pdGlhbEVtcHR5Q29udGVudFxuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAoKSAtPlxuICAgIHRjLmRpdiAnLmNvbC1zbS0xMicsIC0+XG4gICAgICB0Yy5kaXYgJy5yb3cnLCAtPlxuICAgICAgICB0Yy5kaXYgICcjbWFpbi10b29sYmFyLmNvbC1zbS04LmNvbC1zbS1vZmZzZXQtMidcbiAgICAgIHRjLmRpdiAnLnJvdycsIC0+XG4gICAgICAgIHRjLmRpdiAnI21haW4tY29udGVudC5jb2wtc20tMTAuY29sLXNtLW9mZnNldC0xJ1xuICByZWdpb25zOiAtPlxuICAgIHJlZ2lvbiA9IG5ldyBTbGlkZURvd25SZWdpb25cbiAgICAgIGVsOiAnI21haW4tY29udGVudCdcbiAgICByZWdpb24uc2xpZGVfc3BlZWQgPSBtcyAnLjAxcydcbiAgICBjb250ZW50OiByZWdpb25cbiAgICB0b29sYmFyOiAnI21haW4tdG9vbGJhcidcblxubW9kdWxlLmV4cG9ydHMgPVxuICBTaWRlYmFyQXBwbGV0TGF5b3V0OiBTaWRlYmFyQXBwbGV0TGF5b3V0XG4gIFRvb2xiYXJBcHBsZXRMYXlvdXQ6IFRvb2xiYXJBcHBsZXRMYXlvdXRcbiAgXG4iXX0=
