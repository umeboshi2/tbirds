var Backbone, DefaultAppletLayout, LayoutTemplates, MainPageLayout, Marionette, Regions, ShowInitialEmptyContent, SidebarAppletLayout, ToolbarAppletLayout, ms, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

tc = require('teacup');

ms = require('ms');

LayoutTemplates = require('../templates/layout');

ShowInitialEmptyContent = require('../behaviors/show-initial-empty');

Regions = require('../regions');

MainPageLayout = (function(superClass) {
  extend(MainPageLayout, superClass);

  function MainPageLayout() {
    return MainPageLayout.__super__.constructor.apply(this, arguments);
  }

  MainPageLayout.prototype.template = LayoutTemplates.MainFluidLayoutTemplate;

  MainPageLayout.prototype.regions = {
    messages: '#messages',
    navbar: '#navbar-view-container',
    modal: Regions.BootstrapModalRegion,
    applet: '#applet-content',
    footer: '#footer'
  };

  return MainPageLayout;

})(Backbone.Marionette.View);

SidebarAppletLayout = (function(superClass) {
  extend(SidebarAppletLayout, superClass);

  function SidebarAppletLayout() {
    return SidebarAppletLayout.__super__.constructor.apply(this, arguments);
  }

  SidebarAppletLayout.prototype.template = LayoutTemplates.make_sidebar_template();

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
    tc.div('.row', function() {
      return tc.div('#main-toolbar.col-sm-6.col-sm-offset-3');
    });
    return tc.div('.row', function() {
      return tc.div('#main-content.col-sm-10.col-sm-offset-1');
    });
  });

  ToolbarAppletLayout.prototype.regions = function() {
    var region;
    region = new Regions.SlideDownRegion({
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

DefaultAppletLayout = SidebarAppletLayout;

module.exports = {
  DefaultAppletLayout: DefaultAppletLayout,
  MainPageLayout: MainPageLayout,
  SidebarAppletLayout: SidebarAppletLayout,
  ToolbarAppletLayout: ToolbarAppletLayout
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvbGF5b3V0LmpzIiwic291cmNlcyI6WyJ2aWV3cy9sYXlvdXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsOEpBQUE7RUFBQTs7O0FBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxVQUFSOztBQUNYLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBQ2IsRUFBQSxHQUFLLE9BQUEsQ0FBUSxRQUFSOztBQUNMLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUjs7QUFFTCxlQUFBLEdBQWtCLE9BQUEsQ0FBUSxxQkFBUjs7QUFDbEIsdUJBQUEsR0FBMEIsT0FBQSxDQUFRLGlDQUFSOztBQUUxQixPQUFBLEdBQVUsT0FBQSxDQUFRLFlBQVI7O0FBRUo7Ozs7Ozs7MkJBQ0osUUFBQSxHQUFVLGVBQWUsQ0FBQzs7MkJBQzFCLE9BQUEsR0FDRTtJQUFBLFFBQUEsRUFBVSxXQUFWO0lBQ0EsTUFBQSxFQUFRLHdCQURSO0lBR0EsS0FBQSxFQUFPLE9BQU8sQ0FBQyxvQkFIZjtJQUlBLE1BQUEsRUFBUSxpQkFKUjtJQUtBLE1BQUEsRUFBUSxTQUxSOzs7OztHQUh5QixRQUFRLENBQUMsVUFBVSxDQUFDOztBQVkzQzs7Ozs7OztnQ0FDSixRQUFBLEdBQVUsZUFBZSxDQUFDLHFCQUFoQixDQUFBOztnQ0FDVixPQUFBLEdBQ0U7SUFBQSxPQUFBLEVBQVMsVUFBVDtJQUNBLE9BQUEsRUFBUyxlQURUOzs7OztHQUg4QixRQUFRLENBQUMsVUFBVSxDQUFDOztBQU9oRDs7Ozs7OztnQ0FDSixTQUFBLEdBQ0U7SUFBQSx1QkFBQSxFQUNFO01BQUEsYUFBQSxFQUFlLHVCQUFmO0tBREY7OztnQ0FFRixRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxTQUFBO0lBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sTUFBUCxFQUFlLFNBQUE7YUFDYixFQUFFLENBQUMsR0FBSCxDQUFRLHdDQUFSO0lBRGEsQ0FBZjtXQUVBLEVBQUUsQ0FBQyxHQUFILENBQU8sTUFBUCxFQUFlLFNBQUE7YUFDYixFQUFFLENBQUMsR0FBSCxDQUFPLHlDQUFQO0lBRGEsQ0FBZjtFQUhzQixDQUFkOztnQ0FLVixPQUFBLEdBQVMsU0FBQTtBQUNQLFFBQUE7SUFBQSxNQUFBLEdBQVMsSUFBSSxPQUFPLENBQUMsZUFBWixDQUNQO01BQUEsRUFBQSxFQUFJLGVBQUo7S0FETztJQUVULE1BQU0sQ0FBQyxXQUFQLEdBQXFCLEVBQUEsQ0FBRyxNQUFIO1dBQ3JCO01BQUEsT0FBQSxFQUFTLE1BQVQ7TUFDQSxPQUFBLEVBQVMsZUFEVDs7RUFKTzs7OztHQVR1QixRQUFRLENBQUMsVUFBVSxDQUFDOztBQWdCdEQsbUJBQUEsR0FBc0I7O0FBQ3RCLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7RUFBQSxtQkFBQSxFQUFxQixtQkFBckI7RUFDQSxjQUFBLEVBQWdCLGNBRGhCO0VBRUEsbUJBQUEsRUFBcUIsbUJBRnJCO0VBR0EsbUJBQUEsRUFBcUIsbUJBSHJCIiwic291cmNlc0NvbnRlbnQiOlsiQmFja2JvbmUgPSByZXF1aXJlICdiYWNrYm9uZSdcbk1hcmlvbmV0dGUgPSByZXF1aXJlICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xudGMgPSByZXF1aXJlICd0ZWFjdXAnXG5tcyA9IHJlcXVpcmUgJ21zJ1xuXG5MYXlvdXRUZW1wbGF0ZXMgPSByZXF1aXJlICcuLi90ZW1wbGF0ZXMvbGF5b3V0J1xuU2hvd0luaXRpYWxFbXB0eUNvbnRlbnQgPSByZXF1aXJlICcuLi9iZWhhdmlvcnMvc2hvdy1pbml0aWFsLWVtcHR5J1xuXG5SZWdpb25zID0gcmVxdWlyZSAnLi4vcmVnaW9ucydcblxuY2xhc3MgTWFpblBhZ2VMYXlvdXQgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLlZpZXdcbiAgdGVtcGxhdGU6IExheW91dFRlbXBsYXRlcy5NYWluRmx1aWRMYXlvdXRUZW1wbGF0ZVxuICByZWdpb25zOlxuICAgIG1lc3NhZ2VzOiAnI21lc3NhZ2VzJ1xuICAgIG5hdmJhcjogJyNuYXZiYXItdmlldy1jb250YWluZXInXG4gICAgI21vZGFsOiAnI21vZGFsJ1xuICAgIG1vZGFsOiBSZWdpb25zLkJvb3RzdHJhcE1vZGFsUmVnaW9uXG4gICAgYXBwbGV0OiAnI2FwcGxldC1jb250ZW50J1xuICAgIGZvb3RlcjogJyNmb290ZXInXG4gICAgXG4gICAgXG4gICAgXG5jbGFzcyBTaWRlYmFyQXBwbGV0TGF5b3V0IGV4dGVuZHMgQmFja2JvbmUuTWFyaW9uZXR0ZS5WaWV3XG4gIHRlbXBsYXRlOiBMYXlvdXRUZW1wbGF0ZXMubWFrZV9zaWRlYmFyX3RlbXBsYXRlKClcbiAgcmVnaW9uczpcbiAgICBzaWRlYmFyOiAnI3NpZGViYXInXG4gICAgY29udGVudDogJyNtYWluLWNvbnRlbnQnXG5cblxuY2xhc3MgVG9vbGJhckFwcGxldExheW91dCBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuVmlld1xuICBiZWhhdmlvcnM6XG4gICAgU2hvd0luaXRpYWxFbXB0eUNvbnRlbnQ6XG4gICAgICBiZWhhdmlvckNsYXNzOiBTaG93SW5pdGlhbEVtcHR5Q29udGVudFxuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAoKSAtPlxuICAgIHRjLmRpdiAnLnJvdycsIC0+XG4gICAgICB0Yy5kaXYgICcjbWFpbi10b29sYmFyLmNvbC1zbS02LmNvbC1zbS1vZmZzZXQtMydcbiAgICB0Yy5kaXYgJy5yb3cnLCAtPlxuICAgICAgdGMuZGl2ICcjbWFpbi1jb250ZW50LmNvbC1zbS0xMC5jb2wtc20tb2Zmc2V0LTEnXG4gIHJlZ2lvbnM6IC0+XG4gICAgcmVnaW9uID0gbmV3IFJlZ2lvbnMuU2xpZGVEb3duUmVnaW9uXG4gICAgICBlbDogJyNtYWluLWNvbnRlbnQnXG4gICAgcmVnaW9uLnNsaWRlX3NwZWVkID0gbXMgJy4wMXMnXG4gICAgY29udGVudDogcmVnaW9uXG4gICAgdG9vbGJhcjogJyNtYWluLXRvb2xiYXInXG5cbkRlZmF1bHRBcHBsZXRMYXlvdXQgPSBTaWRlYmFyQXBwbGV0TGF5b3V0ICAgIFxubW9kdWxlLmV4cG9ydHMgPVxuICBEZWZhdWx0QXBwbGV0TGF5b3V0OiBEZWZhdWx0QXBwbGV0TGF5b3V0XG4gIE1haW5QYWdlTGF5b3V0OiBNYWluUGFnZUxheW91dFxuICBTaWRlYmFyQXBwbGV0TGF5b3V0OiBTaWRlYmFyQXBwbGV0TGF5b3V0XG4gIFRvb2xiYXJBcHBsZXRMYXlvdXQ6IFRvb2xiYXJBcHBsZXRMYXlvdXRcbiAgXG4iXX0=
