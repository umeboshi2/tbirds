var Backbone, EmptyView, Marionette, tc;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

tc = require('teacup');

EmptyView = (function() {
  class EmptyView extends Backbone.Marionette.View {};

  EmptyView.prototype.template = tc.renderable(function() {
    return tc.div('.jumbotron', function() {
      return tc.h1(function() {
        tc.text('Loading ...');
        return tc.i('.fa.fa-spinner.fa-spin');
      });
    });
  });

  return EmptyView;

}).call(this);

module.exports = EmptyView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvZW1wdHkuanMiLCJzb3VyY2VzIjpbInZpZXdzL2VtcHR5LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFFBQUEsRUFBQSxTQUFBLEVBQUEsVUFBQSxFQUFBOztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFDWCxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUNiLEVBQUEsR0FBSyxPQUFBLENBQVEsUUFBUjs7QUFFQztFQUFOLE1BQUEsVUFBQSxRQUF3QixRQUFRLENBQUMsVUFBVSxDQUFDLEtBQTVDLENBQUE7O3NCQUNFLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQSxDQUFBO1dBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sWUFBUCxFQUFxQixRQUFBLENBQUEsQ0FBQTthQUNuQixFQUFFLENBQUMsRUFBSCxDQUFNLFFBQUEsQ0FBQSxDQUFBO1FBQ0osRUFBRSxDQUFDLElBQUgsQ0FBUSxhQUFSO2VBQ0EsRUFBRSxDQUFDLENBQUgsQ0FBSyx3QkFBTDtNQUZJLENBQU47SUFEbUIsQ0FBckI7RUFEc0IsQ0FBZDs7Ozs7O0FBT1osTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJCYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG50YyA9IHJlcXVpcmUgJ3RlYWN1cCdcblxuY2xhc3MgRW1wdHlWaWV3IGV4dGVuZHMgQmFja2JvbmUuTWFyaW9uZXR0ZS5WaWV3XG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIC0+XG4gICAgdGMuZGl2ICcuanVtYm90cm9uJywgLT5cbiAgICAgIHRjLmgxIC0+XG4gICAgICAgIHRjLnRleHQgJ0xvYWRpbmcgLi4uJ1xuICAgICAgICB0Yy5pICcuZmEuZmEtc3Bpbm5lci5mYS1zcGluJ1xuICAgIFxuICBcbm1vZHVsZS5leHBvcnRzID0gRW1wdHlWaWV3XG4iXX0=
