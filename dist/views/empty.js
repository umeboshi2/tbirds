var EmptyView;

import {
  View
} from 'backbone.marionette';

import tc from 'teacup';

EmptyView = (function() {
  class EmptyView extends View {};

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

export default EmptyView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvZW1wdHkuanMiLCJzb3VyY2VzIjpbInZpZXdzL2VtcHR5LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQUE7RUFBUyxJQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQTs7QUFFTTtFQUFOLE1BQUEsVUFBQSxRQUF3QixLQUF4QixDQUFBOztzQkFDRSxRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUEsQ0FBQTtXQUN0QixFQUFFLENBQUMsR0FBSCxDQUFPLFlBQVAsRUFBcUIsUUFBQSxDQUFBLENBQUE7YUFDbkIsRUFBRSxDQUFDLEVBQUgsQ0FBTSxRQUFBLENBQUEsQ0FBQTtRQUNKLEVBQUUsQ0FBQyxJQUFILENBQVEsYUFBUjtlQUNBLEVBQUUsQ0FBQyxDQUFILENBQUssd0JBQUw7TUFGSSxDQUFOO0lBRG1CLENBQXJCO0VBRHNCLENBQWQ7Ozs7OztBQU1aLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpZXcgfSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuY2xhc3MgRW1wdHlWaWV3IGV4dGVuZHMgVmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAtPlxuICAgIHRjLmRpdiAnLmp1bWJvdHJvbicsIC0+XG4gICAgICB0Yy5oMSAtPlxuICAgICAgICB0Yy50ZXh0ICdMb2FkaW5nIC4uLidcbiAgICAgICAgdGMuaSAnLmZhLmZhLXNwaW5uZXIuZmEtc3BpbidcblxuZXhwb3J0IGRlZmF1bHQgRW1wdHlWaWV3XG4iXX0=
