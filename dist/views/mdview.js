var MarkdownView;

import {
  View
} from 'backbone.marionette';

import tc from 'teacup';

import marked from 'marked';

MarkdownView = (function() {
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

export default MarkdownView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvbWR2aWV3LmpzIiwic291cmNlcyI6WyJ2aWV3cy9tZHZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsT0FBQTtFQUFTLElBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUNBLE9BQU8sTUFBUCxNQUFBOztBQUVNO0VBQU4sTUFBQSxhQUFBLFFBQTJCLEtBQTNCLENBQUE7O3lCQUNFLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxLQUFELENBQUE7V0FDdEIsRUFBRSxDQUFDLE9BQUgsQ0FBVyxpREFBWCxFQUE4RCxRQUFBLENBQUEsQ0FBQTthQUM1RCxFQUFFLENBQUMsR0FBSCxDQUFPLE9BQVAsRUFBZ0IsUUFBQSxDQUFBLENBQUE7ZUFDZCxFQUFFLENBQUMsR0FBSCxDQUFPLE1BQUEsQ0FBTyxLQUFLLENBQUMsT0FBYixDQUFQO01BRGMsQ0FBaEI7SUFENEQsQ0FBOUQ7RUFEc0IsQ0FBZDs7Ozs7O0FBSVosT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlldyB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuaW1wb3J0IG1hcmtlZCBmcm9tICdtYXJrZWQnXG5cbmNsYXNzIE1hcmtkb3duVmlldyBleHRlbmRzIFZpZXdcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICAgIHRjLmFydGljbGUgJy5kb2N1bWVudC12aWV3LmNvbnRlbnQuY29sLXNtLTguY29sLXNtLW9mZnNldC0yJywgLT5cbiAgICAgIHRjLmRpdiAnLmJvZHknLCAtPlxuICAgICAgICB0Yy5yYXcgbWFya2VkIG1vZGVsLmNvbnRlbnRcbmV4cG9ydCBkZWZhdWx0IE1hcmtkb3duVmlld1xuIl19
