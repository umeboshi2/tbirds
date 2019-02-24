var MarkdownView;

import Backbone from 'backbone';

import {
  View
} from 'backbone.marionette';

import tc from 'teacup';

import marked from 'marked';

export default MarkdownView = (function() {
  class MarkdownView extends View {};

  MarkdownView.prototype.template = tc.renderable(function(model) {
    return tc.article('.document-view.content.col-sm-8.col-sm-offset-2', function() {
      return tc.div('.body', function() {
        return tc.raw(marked(model.content));
      });
    });
  });

  return MarkdownView;

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvbWR2aWV3LmpzIiwic291cmNlcyI6WyJ2aWV3cy9tZHZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsT0FBTyxRQUFQLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLElBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUNBLE9BQU8sTUFBUCxNQUFBOztBQUVBLE9BQUEsUUFBcUI7RUFBTixNQUFBLGFBQUEsUUFBMkIsS0FBM0IsQ0FBQTs7eUJBQ2IsUUFBQSxHQUFVLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLEtBQUQsQ0FBQTtXQUN0QixFQUFFLENBQUMsT0FBSCxDQUFXLGlEQUFYLEVBQThELFFBQUEsQ0FBQSxDQUFBO2FBQzVELEVBQUUsQ0FBQyxHQUFILENBQU8sT0FBUCxFQUFnQixRQUFBLENBQUEsQ0FBQTtlQUNkLEVBQUUsQ0FBQyxHQUFILENBQU8sTUFBQSxDQUFPLEtBQUssQ0FBQyxPQUFiLENBQVA7TUFEYyxDQUFoQjtJQUQ0RCxDQUE5RDtFQURzQixDQUFkIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuaW1wb3J0IG1hcmtlZCBmcm9tICdtYXJrZWQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcmtkb3duVmlldyBleHRlbmRzIFZpZXdcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICAgIHRjLmFydGljbGUgJy5kb2N1bWVudC12aWV3LmNvbnRlbnQuY29sLXNtLTguY29sLXNtLW9mZnNldC0yJywgLT5cbiAgICAgIHRjLmRpdiAnLmJvZHknLCAtPlxuICAgICAgICB0Yy5yYXcgbWFya2VkIG1vZGVsLmNvbnRlbnRcbiJdfQ==
