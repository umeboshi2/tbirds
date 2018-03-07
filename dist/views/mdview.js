var Backbone, Marionette, MarkdownView, marked, tc;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

tc = require('teacup');

marked = require('marked');

MarkdownView = (function() {
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

module.exports = MarkdownView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvbWR2aWV3LmpzIiwic291cmNlcyI6WyJ2aWV3cy9tZHZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsUUFBQSxFQUFBLFVBQUEsRUFBQSxZQUFBLEVBQUEsTUFBQSxFQUFBOztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFDWCxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUNiLEVBQUEsR0FBSyxPQUFBLENBQVEsUUFBUjs7QUFDTCxNQUFBLEdBQVMsT0FBQSxDQUFRLFFBQVI7O0FBRUg7RUFBTixNQUFBLGFBQUEsUUFBMkIsVUFBVSxDQUFDLEtBQXRDLENBQUE7O3lCQUNFLFFBQUEsR0FBVSxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxLQUFELENBQUE7V0FDdEIsRUFBRSxDQUFDLE9BQUgsQ0FBVyxpREFBWCxFQUE4RCxRQUFBLENBQUEsQ0FBQTthQUM1RCxFQUFFLENBQUMsR0FBSCxDQUFPLE9BQVAsRUFBZ0IsUUFBQSxDQUFBLENBQUE7ZUFDZCxFQUFFLENBQUMsR0FBSCxDQUFPLE1BQUEsQ0FBTyxLQUFLLENBQUMsT0FBYixDQUFQO01BRGMsQ0FBaEI7SUFENEQsQ0FBOUQ7RUFEc0IsQ0FBZDs7Ozs7O0FBS1osTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJCYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG50YyA9IHJlcXVpcmUgJ3RlYWN1cCdcbm1hcmtlZCA9IHJlcXVpcmUgJ21hcmtlZCdcblxuY2xhc3MgTWFya2Rvd25WaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5WaWV3XG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICB0Yy5hcnRpY2xlICcuZG9jdW1lbnQtdmlldy5jb250ZW50LmNvbC1zbS04LmNvbC1zbS1vZmZzZXQtMicsIC0+XG4gICAgICB0Yy5kaXYgJy5ib2R5JywgLT5cbiAgICAgICAgdGMucmF3IG1hcmtlZCBtb2RlbC5jb250ZW50XG5cbm1vZHVsZS5leHBvcnRzID0gTWFya2Rvd25WaWV3XG4iXX0=
