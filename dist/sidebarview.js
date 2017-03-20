var Backbone, BaseSideBarView, BumblrChannel, Marionette, navigate_to_url, sidebar_template, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

tc = require('teacup');

navigate_to_url = require('agate/src/apputil').navigate_to_url;

BumblrChannel = Backbone.Radio.channel('bumblr');

sidebar_template = tc.renderable(function(model) {
  return tc.div('.sidebar-menu.btn-group-vertical', function() {
    var entry, i, len, ref, results;
    ref = model.entries;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      entry = ref[i];
      results.push(tc.button('.sidebar-entry-button.btn.btn-default', {
        'button-url': entry.url
      }, function() {
        return tc.text(entry.name);
      }));
    }
    return results;
  });
});

BaseSideBarView = (function(superClass) {
  extend(BaseSideBarView, superClass);

  function BaseSideBarView() {
    return BaseSideBarView.__super__.constructor.apply(this, arguments);
  }

  BaseSideBarView.prototype.template = sidebar_template;

  BaseSideBarView.prototype.events = {
    'click .sidebar-entry-button': 'sidebar_button_pressed'
  };

  BaseSideBarView.prototype.sidebar_button_pressed = function(event) {
    var url;
    url = event.currentTarget.getAttribute('button-url');
    return navigate_to_url(url);
  };

  return BaseSideBarView;

})(Backbone.Marionette.View);

module.exports = BaseSideBarView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhcnZpZXcuanMiLCJzb3VyY2VzIjpbInNpZGViYXJ2aWV3LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLDJGQUFBO0VBQUE7OztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFDWCxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUNiLEVBQUEsR0FBSyxPQUFBLENBQVEsUUFBUjs7QUFFSCxrQkFBb0IsT0FBQSxDQUFRLG1CQUFSOztBQUV0QixhQUFBLEdBQWdCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFHaEIsZ0JBQUEsR0FBbUIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxTQUFDLEtBQUQ7U0FDL0IsRUFBRSxDQUFDLEdBQUgsQ0FBTyxrQ0FBUCxFQUEyQyxTQUFBO0FBQ3pDLFFBQUE7QUFBQTtBQUFBO1NBQUEscUNBQUE7O21CQUNFLEVBQUUsQ0FBQyxNQUFILENBQVUsdUNBQVYsRUFDQTtRQUFBLFlBQUEsRUFBYSxLQUFLLENBQUMsR0FBbkI7T0FEQSxFQUN3QixTQUFBO2VBQ3RCLEVBQUUsQ0FBQyxJQUFILENBQVEsS0FBSyxDQUFDLElBQWQ7TUFEc0IsQ0FEeEI7QUFERjs7RUFEeUMsQ0FBM0M7QUFEK0IsQ0FBZDs7QUFPYjs7Ozs7Ozs0QkFDSixRQUFBLEdBQVU7OzRCQUNWLE1BQUEsR0FDRTtJQUFBLDZCQUFBLEVBQStCLHdCQUEvQjs7OzRCQUVGLHNCQUFBLEdBQXdCLFNBQUMsS0FBRDtBQUV0QixRQUFBO0lBQUEsR0FBQSxHQUFNLEtBQUssQ0FBQyxhQUFhLENBQUMsWUFBcEIsQ0FBaUMsWUFBakM7V0FDTixlQUFBLENBQWdCLEdBQWhCO0VBSHNCOzs7O0dBTEksUUFBUSxDQUFDLFVBQVUsQ0FBQzs7QUFXbEQsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJCYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG50YyA9IHJlcXVpcmUgJ3RlYWN1cCdcblxueyBuYXZpZ2F0ZV90b191cmwgfSA9IHJlcXVpcmUgJ2FnYXRlL3NyYy9hcHB1dGlsJ1xuXG5CdW1ibHJDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnYnVtYmxyJ1xuXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5zaWRlYmFyX3RlbXBsYXRlID0gdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gIHRjLmRpdiAnLnNpZGViYXItbWVudS5idG4tZ3JvdXAtdmVydGljYWwnLCAtPlxuICAgIGZvciBlbnRyeSBpbiBtb2RlbC5lbnRyaWVzXG4gICAgICB0Yy5idXR0b24gJy5zaWRlYmFyLWVudHJ5LWJ1dHRvbi5idG4uYnRuLWRlZmF1bHQnLFxuICAgICAgJ2J1dHRvbi11cmwnOmVudHJ5LnVybCwgLT5cbiAgICAgICAgdGMudGV4dCBlbnRyeS5uYW1lICAgICAgICAgIFxuXG5jbGFzcyBCYXNlU2lkZUJhclZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLlZpZXdcbiAgdGVtcGxhdGU6IHNpZGViYXJfdGVtcGxhdGVcbiAgZXZlbnRzOlxuICAgICdjbGljayAuc2lkZWJhci1lbnRyeS1idXR0b24nOiAnc2lkZWJhcl9idXR0b25fcHJlc3NlZCdcblxuICBzaWRlYmFyX2J1dHRvbl9wcmVzc2VkOiAoZXZlbnQpIC0+XG4gICAgI2NvbnNvbGUubG9nIFwiU2lkZWJhcl9idXR0b25fcHJlc3NlZFwiXG4gICAgdXJsID0gZXZlbnQuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUgJ2J1dHRvbi11cmwnXG4gICAgbmF2aWdhdGVfdG9fdXJsIHVybFxuICAgICAgXG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZVNpZGVCYXJWaWV3XG4iXX0=
