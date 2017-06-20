var MainPageLayout, Marionette, ModalRegion, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Marionette = require('backbone.marionette');

tc = require('teacup');

ModalRegion = require('./regions/bsmodal');

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
      tc.div('#applet-content.row');
      return tc.div('#footer.row');
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

})(Marionette.View);

module.exports = MainPageLayout;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGtsYXlvdXQuanMiLCJzb3VyY2VzIjpbInRrbGF5b3V0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLDJDQUFBO0VBQUE7OztBQUFBLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBQ2IsRUFBQSxHQUFLLE9BQUEsQ0FBUSxRQUFSOztBQUVMLFdBQUEsR0FBYyxPQUFBLENBQVEsbUJBQVI7O0FBRVI7Ozs7Ozs7MkJBQ0osUUFBQSxHQUFVLEVBQUUsQ0FBQyxVQUFILENBQWMsU0FBQTtJQUN0QixFQUFFLENBQUMsR0FBSCxDQUFPLHdCQUFQO0lBQ0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyxrQkFBUCxFQUEyQixTQUFBO01BQ3pCLEVBQUUsQ0FBQyxHQUFILENBQU8sTUFBUCxFQUFlLFNBQUE7ZUFDYixFQUFFLENBQUMsR0FBSCxDQUFPLDRCQUFQLEVBQXFDLFNBQUE7aUJBQ25DLEVBQUUsQ0FBQyxHQUFILENBQU8sV0FBUDtRQURtQyxDQUFyQztNQURhLENBQWY7TUFHQSxFQUFFLENBQUMsR0FBSCxDQUFPLHFCQUFQO2FBQ0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyxhQUFQO0lBTHlCLENBQTNCO1dBTUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyxRQUFQO0VBUnNCLENBQWQ7OzJCQVVWLE9BQUEsR0FDRTtJQUFBLFFBQUEsRUFBVSxXQUFWO0lBQ0EsTUFBQSxFQUFRLHdCQURSO0lBRUEsS0FBQSxFQUFPLFdBRlA7SUFHQSxNQUFBLEVBQVEsaUJBSFI7SUFJQSxNQUFBLEVBQVEsU0FKUjs7Ozs7R0FaeUIsVUFBVSxDQUFDOztBQWtCeEMsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJNYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbnRjID0gcmVxdWlyZSAndGVhY3VwJ1xuXG5Nb2RhbFJlZ2lvbiA9IHJlcXVpcmUgJy4vcmVnaW9ucy9ic21vZGFsJ1xuXG5jbGFzcyBNYWluUGFnZUxheW91dCBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAoKSAtPlxuICAgIHRjLmRpdiAnI25hdmJhci12aWV3LWNvbnRhaW5lcidcbiAgICB0Yy5kaXYgXCIuY29udGFpbmVyLWZsdWlkXCIsIC0+XG4gICAgICB0Yy5kaXYgJy5yb3cnLCAtPlxuICAgICAgICB0Yy5kaXYgJy5jb2wtc20tMTAuY29sLXNtLW9mZnNldC0xJywgLT5cbiAgICAgICAgICB0Yy5kaXYgJyNtZXNzYWdlcydcbiAgICAgIHRjLmRpdiAnI2FwcGxldC1jb250ZW50LnJvdydcbiAgICAgIHRjLmRpdiAnI2Zvb3Rlci5yb3cnXG4gICAgdGMuZGl2ICcjbW9kYWwnXG5cbiAgcmVnaW9uczpcbiAgICBtZXNzYWdlczogJyNtZXNzYWdlcydcbiAgICBuYXZiYXI6ICcjbmF2YmFyLXZpZXctY29udGFpbmVyJ1xuICAgIG1vZGFsOiBNb2RhbFJlZ2lvblxuICAgIGFwcGxldDogJyNhcHBsZXQtY29udGVudCdcbiAgICBmb290ZXI6ICcjZm9vdGVyJ1xuICAgIFxubW9kdWxlLmV4cG9ydHMgPSBNYWluUGFnZUxheW91dFxuXG5cbiJdfQ==
