var MarkdownView;

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

import tc from 'teacup';

import marked from 'marked';

export default MarkdownView = (function() {
  class MarkdownView extends Marionette.View {};

  MarkdownView.prototype.template = tc.renderable(function(model) {
    return tc.article('.document-view.content.col-sm-8.col-sm-offset-2', function() {
      return tc.div('.body', function() {
        return tc.raw(marked(model.content));
      });
    });
  });

  return MarkdownView;

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvbWR2aWV3LmpzIiwic291cmNlcyI6WyJ2aWV3cy9tZHZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsT0FBTyxRQUFQLE1BQUE7O0FBQ0EsT0FBTyxVQUFQLE1BQUE7O0FBQ0EsT0FBTyxFQUFQLE1BQUE7O0FBQ0EsT0FBTyxNQUFQLE1BQUE7O0FBRUEsT0FBQSxRQUFxQjtFQUFOLE1BQUEsYUFBQSxRQUEyQixVQUFVLENBQUMsS0FBdEMsQ0FBQTs7eUJBQ2IsUUFBQSxHQUFVLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLEtBQUQsQ0FBQTtXQUN0QixFQUFFLENBQUMsT0FBSCxDQUFXLGlEQUFYLEVBQThELFFBQUEsQ0FBQSxDQUFBO2FBQzVELEVBQUUsQ0FBQyxHQUFILENBQU8sT0FBUCxFQUFnQixRQUFBLENBQUEsQ0FBQTtlQUNkLEVBQUUsQ0FBQyxHQUFILENBQU8sTUFBQSxDQUFPLEtBQUssQ0FBQyxPQUFiLENBQVA7TUFEYyxDQUFoQjtJQUQ0RCxDQUE5RDtFQURzQixDQUFkIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5pbXBvcnQgbWFya2VkIGZyb20gJ21hcmtlZCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFya2Rvd25WaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5WaWV3XG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICB0Yy5hcnRpY2xlICcuZG9jdW1lbnQtdmlldy5jb250ZW50LmNvbC1zbS04LmNvbC1zbS1vZmZzZXQtMicsIC0+XG4gICAgICB0Yy5kaXYgJy5ib2R5JywgLT5cbiAgICAgICAgdGMucmF3IG1hcmtlZCBtb2RlbC5jb250ZW50XG4iXX0=
