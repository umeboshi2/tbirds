var EmptyView;

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

import tc from 'teacup';

export default EmptyView = (function() {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvZW1wdHkuanMiLCJzb3VyY2VzIjpbInZpZXdzL2VtcHR5LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQU8sVUFBUCxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUVBLE9BQUEsUUFBcUI7RUFBTixNQUFBLFVBQUEsUUFBd0IsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUE1QyxDQUFBOztzQkFDYixRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUEsQ0FBQTtXQUN0QixFQUFFLENBQUMsR0FBSCxDQUFPLFlBQVAsRUFBcUIsUUFBQSxDQUFBLENBQUE7YUFDbkIsRUFBRSxDQUFDLEVBQUgsQ0FBTSxRQUFBLENBQUEsQ0FBQTtRQUNKLEVBQUUsQ0FBQyxJQUFILENBQVEsYUFBUjtlQUNBLEVBQUUsQ0FBQyxDQUFILENBQUssd0JBQUw7TUFGSSxDQUFOO0lBRG1CLENBQXJCO0VBRHNCLENBQWQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW1wdHlWaWV3IGV4dGVuZHMgQmFja2JvbmUuTWFyaW9uZXR0ZS5WaWV3XG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIC0+XG4gICAgdGMuZGl2ICcuanVtYm90cm9uJywgLT5cbiAgICAgIHRjLmgxIC0+XG4gICAgICAgIHRjLnRleHQgJ0xvYWRpbmcgLi4uJ1xuICAgICAgICB0Yy5pICcuZmEuZmEtc3Bpbm5lci5mYS1zcGluJ1xuICAgIFxuICBcbiJdfQ==
