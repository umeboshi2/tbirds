var EmptyView;

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

import tc from 'teacup';

export default EmptyView = (function() {
  class EmptyView extends Marionette.View {};

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvZW1wdHkuanMiLCJzb3VyY2VzIjpbInZpZXdzL2VtcHR5LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQU8sVUFBUCxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUVBLE9BQUEsUUFBcUI7RUFBTixNQUFBLFVBQUEsUUFBd0IsVUFBVSxDQUFDLEtBQW5DLENBQUE7O3NCQUNiLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQSxDQUFBO1dBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sWUFBUCxFQUFxQixRQUFBLENBQUEsQ0FBQTthQUNuQixFQUFFLENBQUMsRUFBSCxDQUFNLFFBQUEsQ0FBQSxDQUFBO1FBQ0osRUFBRSxDQUFDLElBQUgsQ0FBUSxhQUFSO2VBQ0EsRUFBRSxDQUFDLENBQUgsQ0FBSyx3QkFBTDtNQUZJLENBQU47SUFEbUIsQ0FBckI7RUFEc0IsQ0FBZCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbXB0eVZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLlZpZXdcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgLT5cbiAgICB0Yy5kaXYgJy5qdW1ib3Ryb24nLCAtPlxuICAgICAgdGMuaDEgLT5cbiAgICAgICAgdGMudGV4dCAnTG9hZGluZyAuLi4nXG4gICAgICAgIHRjLmkgJy5mYS5mYS1zcGlubmVyLmZhLXNwaW4nXG4gICAgXG4gIFxuIl19
