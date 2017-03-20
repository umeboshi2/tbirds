var BootstrapModalRegion, MainPageLayout, Marionette, Toolkit, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Marionette = require('backbone.marionette');

Toolkit = require('marionette.toolkit');

tc = require('teacup');

BootstrapModalRegion = (function(superClass) {
  extend(BootstrapModalRegion, superClass);

  function BootstrapModalRegion() {
    return BootstrapModalRegion.__super__.constructor.apply(this, arguments);
  }

  BootstrapModalRegion.prototype.el = '#modal';

  BootstrapModalRegion.prototype.backdrop = false;

  BootstrapModalRegion.prototype.getEl = function(selector) {
    var $el;
    $el = $(selector);
    $el.attr('class', 'modal');
    return $el;
  };

  BootstrapModalRegion.prototype.show = function(view) {
    BootstrapModalRegion.__super__.show.call(this, view);
    this.$el.modal({
      backdrop: this.backdrop
    });
    return this.$el.modal('show');
  };

  return BootstrapModalRegion;

})(Marionette.Region);

MainPageLayout = (function(superClass) {
  extend(MainPageLayout, superClass);

  function MainPageLayout() {
    return MainPageLayout.__super__.constructor.apply(this, arguments);
  }

  MainPageLayout.prototype.template = tc.renderable(function() {
    tc.div('#navbar-view-container');
    tc.div(".container-fluid", function() {
      tc.div('.row', function() {
        return tc.div('.col-sm-10.col-sm-offset-1', function() {
          return tc.div('#messages');
        });
      });
      return tc.div('#applet-content.row');
    });
    tc.div('#footer');
    return tc.div('#modal');
  });

  MainPageLayout.prototype.regions = {
    messages: '#messages',
    navbar: '#navbar-view-container',
    modal: BootstrapModalRegion,
    applet: '#applet-content',
    footer: '#footer'
  };

  return MainPageLayout;

})(Marionette.View);

module.exports = MainPageLayout;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtsYXlvdXQuanMiLCJzb3VyY2VzIjpbInRrbGF5b3V0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLDZEQUFBO0VBQUE7OztBQUFBLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBQ2IsT0FBQSxHQUFVLE9BQUEsQ0FBUSxvQkFBUjs7QUFDVixFQUFBLEdBQUssT0FBQSxDQUFRLFFBQVI7O0FBRUM7Ozs7Ozs7aUNBQ0osRUFBQSxHQUFJOztpQ0FDSixRQUFBLEdBQVU7O2lDQUVWLEtBQUEsR0FBTyxTQUFDLFFBQUQ7QUFDTCxRQUFBO0lBQUEsR0FBQSxHQUFNLENBQUEsQ0FBRSxRQUFGO0lBQ04sR0FBRyxDQUFDLElBQUosQ0FBUyxPQUFULEVBQWtCLE9BQWxCO1dBQ0E7RUFISzs7aUNBS1AsSUFBQSxHQUFNLFNBQUMsSUFBRDtJQUNKLCtDQUFNLElBQU47SUFDQSxJQUFDLENBQUEsR0FBRyxDQUFDLEtBQUwsQ0FDRTtNQUFBLFFBQUEsRUFBVSxJQUFDLENBQUEsUUFBWDtLQURGO1dBRUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFMLENBQVcsTUFBWDtFQUpJOzs7O0dBVDJCLFVBQVUsQ0FBQzs7QUFleEM7Ozs7Ozs7MkJBQ0osUUFBQSxHQUFVLEVBQUUsQ0FBQyxVQUFILENBQWMsU0FBQTtJQUN0QixFQUFFLENBQUMsR0FBSCxDQUFPLHdCQUFQO0lBQ0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyxrQkFBUCxFQUEyQixTQUFBO01BQ3pCLEVBQUUsQ0FBQyxHQUFILENBQU8sTUFBUCxFQUFlLFNBQUE7ZUFDYixFQUFFLENBQUMsR0FBSCxDQUFPLDRCQUFQLEVBQXFDLFNBQUE7aUJBQ25DLEVBQUUsQ0FBQyxHQUFILENBQU8sV0FBUDtRQURtQyxDQUFyQztNQURhLENBQWY7YUFHQSxFQUFFLENBQUMsR0FBSCxDQUFPLHFCQUFQO0lBSnlCLENBQTNCO0lBS0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyxTQUFQO1dBQ0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyxRQUFQO0VBUnNCLENBQWQ7OzJCQVVWLE9BQUEsR0FDRTtJQUFBLFFBQUEsRUFBVSxXQUFWO0lBQ0EsTUFBQSxFQUFRLHdCQURSO0lBRUEsS0FBQSxFQUFPLG9CQUZQO0lBR0EsTUFBQSxFQUFRLGlCQUhSO0lBSUEsTUFBQSxFQUFRLFNBSlI7Ozs7O0dBWnlCLFVBQVUsQ0FBQzs7QUFrQnhDLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5Ub29sa2l0ID0gcmVxdWlyZSAnbWFyaW9uZXR0ZS50b29sa2l0J1xudGMgPSByZXF1aXJlICd0ZWFjdXAnXG5cbmNsYXNzIEJvb3RzdHJhcE1vZGFsUmVnaW9uIGV4dGVuZHMgTWFyaW9uZXR0ZS5SZWdpb25cbiAgZWw6ICcjbW9kYWwnXG4gIGJhY2tkcm9wOiBmYWxzZVxuICBcbiAgZ2V0RWw6IChzZWxlY3RvcikgLT5cbiAgICAkZWwgPSAkIHNlbGVjdG9yXG4gICAgJGVsLmF0dHIgJ2NsYXNzJywgJ21vZGFsJ1xuICAgICRlbFxuICAgIFxuICBzaG93OiAodmlldykgLT5cbiAgICBzdXBlciB2aWV3XG4gICAgQCRlbC5tb2RhbFxuICAgICAgYmFja2Ryb3A6IEBiYWNrZHJvcFxuICAgIEAkZWwubW9kYWwgJ3Nob3cnXG5cbmNsYXNzIE1haW5QYWdlTGF5b3V0IGV4dGVuZHMgTWFyaW9uZXR0ZS5WaWV3XG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlICgpIC0+IFxuICAgIHRjLmRpdiAnI25hdmJhci12aWV3LWNvbnRhaW5lcidcbiAgICB0Yy5kaXYgXCIuY29udGFpbmVyLWZsdWlkXCIsIC0+XG4gICAgICB0Yy5kaXYgJy5yb3cnLCAtPlxuICAgICAgICB0Yy5kaXYgJy5jb2wtc20tMTAuY29sLXNtLW9mZnNldC0xJywgLT5cbiAgICAgICAgICB0Yy5kaXYgJyNtZXNzYWdlcydcbiAgICAgIHRjLmRpdiAnI2FwcGxldC1jb250ZW50LnJvdydcbiAgICB0Yy5kaXYgJyNmb290ZXInXG4gICAgdGMuZGl2ICcjbW9kYWwnXG5cbiAgcmVnaW9uczpcbiAgICBtZXNzYWdlczogJyNtZXNzYWdlcydcbiAgICBuYXZiYXI6ICcjbmF2YmFyLXZpZXctY29udGFpbmVyJ1xuICAgIG1vZGFsOiBCb290c3RyYXBNb2RhbFJlZ2lvblxuICAgIGFwcGxldDogJyNhcHBsZXQtY29udGVudCdcbiAgICBmb290ZXI6ICcjZm9vdGVyJ1xuICAgIFxubW9kdWxlLmV4cG9ydHMgPSBNYWluUGFnZUxheW91dFxuXG5cbiJdfQ==
