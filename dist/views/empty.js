var EmptyView;

import Backbone from 'backbone';

import {
  View
} from 'backbone.marionette';

import tc from 'teacup';

export default EmptyView = (function() {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvZW1wdHkuanMiLCJzb3VyY2VzIjpbInZpZXdzL2VtcHR5LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxJQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQTs7QUFFQSxPQUFBLFFBQXFCO0VBQU4sTUFBQSxVQUFBLFFBQXdCLEtBQXhCLENBQUE7O3NCQUNiLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQSxDQUFBO1dBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sWUFBUCxFQUFxQixRQUFBLENBQUEsQ0FBQTthQUNuQixFQUFFLENBQUMsRUFBSCxDQUFNLFFBQUEsQ0FBQSxDQUFBO1FBQ0osRUFBRSxDQUFDLElBQUgsQ0FBUSxhQUFSO2VBQ0EsRUFBRSxDQUFDLENBQUgsQ0FBSyx3QkFBTDtNQUZJLENBQU47SUFEbUIsQ0FBckI7RUFEc0IsQ0FBZCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCB7IFZpZXcgfSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW1wdHlWaWV3IGV4dGVuZHMgVmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAtPlxuICAgIHRjLmRpdiAnLmp1bWJvdHJvbicsIC0+XG4gICAgICB0Yy5oMSAtPlxuICAgICAgICB0Yy50ZXh0ICdMb2FkaW5nIC4uLidcbiAgICAgICAgdGMuaSAnLmZhLmZhLXNwaW5uZXIuZmEtc3BpbidcbiAgICBcbiAgXG4iXX0=
