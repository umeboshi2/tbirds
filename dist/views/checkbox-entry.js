
/*
Thie model for this view only needs to be:
  Model:
    name: "a name"
    selected: (boolean)

If an "id" attribute is desired, it can be done
in the parent view, or a subclass of this view.

*/
var CheckboxEntryView;

import {
  View as MnView
} from 'backbone.marionette';

import tc from 'teacup';

CheckboxEntryView = (function() {
  class CheckboxEntryView extends MnView {
    onRender() {
      return this.ui.input.prop('checked', this.model.get('selected'));
    }

    toggleInput() {
      var checked;
      checked = this.ui.input.is(':checked');
      this.ui.input.prop('checked', !checked);
      this.model.set('selected', !checked);
      this.trigger(`checked:${!checked}`);
      return this.trigger('toggled');
    }

    isSelected() {
      return this.model.get('selected');
    }

  };

  CheckboxEntryView.prototype.className = "form-group form-check";

  CheckboxEntryView.prototype.template = tc.renderable(function(model) {
    tc.input('.form-check-input', {
      type: 'checkbox'
    });
    return tc.label('.form-check-label', model.name);
  });

  CheckboxEntryView.prototype.ui = {
    input: 'input'
  };

  CheckboxEntryView.prototype.events = {
    click: 'toggleInput',
    'click @ui.input': 'toggleInput'
  };

  return CheckboxEntryView;

}).call(this);

export default CheckboxEntryView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvY2hlY2tib3gtZW50cnkuanMiLCJzb3VyY2VzIjpbInZpZXdzL2NoZWNrYm94LWVudHJ5LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7SUFBQTs7QUFBQSxPQUFBO0VBQVMsSUFBQSxVQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQTs7QUFhTTtFQUFOLE1BQUEsa0JBQUEsUUFBZ0MsT0FBaEM7SUFVRSxRQUFVLENBQUEsQ0FBQTthQUNSLElBQUMsQ0FBQSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQVYsQ0FBZSxTQUFmLEVBQTBCLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLFVBQVgsQ0FBMUI7SUFEUTs7SUFFVixXQUFhLENBQUEsQ0FBQTtBQUNmLFVBQUE7TUFBSSxPQUFBLEdBQVUsSUFBQyxDQUFBLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBVixDQUFhLFVBQWI7TUFDVixJQUFDLENBQUEsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFWLENBQWUsU0FBZixFQUEwQixDQUFJLE9BQTlCO01BQ0EsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsVUFBWCxFQUF1QixDQUFJLE9BQTNCO01BQ0EsSUFBQyxDQUFBLE9BQUQsQ0FBUyxDQUFBLFFBQUEsQ0FBQSxDQUFXLENBQUksT0FBZixDQUFBLENBQVQ7YUFDQSxJQUFDLENBQUEsT0FBRCxDQUFTLFNBQVQ7SUFMVzs7SUFNYixVQUFZLENBQUEsQ0FBQTtBQUNWLGFBQU8sSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsVUFBWDtJQURHOztFQWxCZDs7OEJBQ0UsU0FBQSxHQUFXOzs4QkFDWCxRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO0lBQ3RCLEVBQUUsQ0FBQyxLQUFILENBQVMsbUJBQVQsRUFBOEI7TUFBQSxJQUFBLEVBQUs7SUFBTCxDQUE5QjtXQUNBLEVBQUUsQ0FBQyxLQUFILENBQVMsbUJBQVQsRUFBOEIsS0FBSyxDQUFDLElBQXBDO0VBRnNCLENBQWQ7OzhCQUdWLEVBQUEsR0FDRTtJQUFBLEtBQUEsRUFBTztFQUFQOzs4QkFDRixNQUFBLEdBQ0U7SUFBQSxLQUFBLEVBQU8sYUFBUDtJQUNBLGlCQUFBLEVBQW1CO0VBRG5COzs7Ozs7QUFhSixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWaWV3IGFzIE1uVmlldyB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuXG4jIyNcblRoaWUgbW9kZWwgZm9yIHRoaXMgdmlldyBvbmx5IG5lZWRzIHRvIGJlOlxuICBNb2RlbDpcbiAgICBuYW1lOiBcImEgbmFtZVwiXG4gICAgc2VsZWN0ZWQ6IChib29sZWFuKVxuXG5JZiBhbiBcImlkXCIgYXR0cmlidXRlIGlzIGRlc2lyZWQsIGl0IGNhbiBiZSBkb25lXG5pbiB0aGUgcGFyZW50IHZpZXcsIG9yIGEgc3ViY2xhc3Mgb2YgdGhpcyB2aWV3LlxuXG4jIyNcblxuY2xhc3MgQ2hlY2tib3hFbnRyeVZpZXcgZXh0ZW5kcyBNblZpZXdcbiAgY2xhc3NOYW1lOiBcImZvcm0tZ3JvdXAgZm9ybS1jaGVja1wiXG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICB0Yy5pbnB1dCAnLmZvcm0tY2hlY2staW5wdXQnLCB0eXBlOidjaGVja2JveCdcbiAgICB0Yy5sYWJlbCAnLmZvcm0tY2hlY2stbGFiZWwnLCBtb2RlbC5uYW1lXG4gIHVpOlxuICAgIGlucHV0OiAnaW5wdXQnXG4gIGV2ZW50czpcbiAgICBjbGljazogJ3RvZ2dsZUlucHV0J1xuICAgICdjbGljayBAdWkuaW5wdXQnOiAndG9nZ2xlSW5wdXQnXG4gIG9uUmVuZGVyOiAtPlxuICAgIEB1aS5pbnB1dC5wcm9wICdjaGVja2VkJywgQG1vZGVsLmdldCgnc2VsZWN0ZWQnKVxuICB0b2dnbGVJbnB1dDogLT5cbiAgICBjaGVja2VkID0gQHVpLmlucHV0LmlzICc6Y2hlY2tlZCdcbiAgICBAdWkuaW5wdXQucHJvcCAnY2hlY2tlZCcsIG5vdCBjaGVja2VkXG4gICAgQG1vZGVsLnNldCAnc2VsZWN0ZWQnLCBub3QgY2hlY2tlZFxuICAgIEB0cmlnZ2VyIFwiY2hlY2tlZDoje25vdCBjaGVja2VkfVwiXG4gICAgQHRyaWdnZXIgJ3RvZ2dsZWQnXG4gIGlzU2VsZWN0ZWQ6IC0+XG4gICAgcmV0dXJuIEBtb2RlbC5nZXQgJ3NlbGVjdGVkJ1xuICAgIFxuZXhwb3J0IGRlZmF1bHQgQ2hlY2tib3hFbnRyeVZpZXdcbiJdfQ==
