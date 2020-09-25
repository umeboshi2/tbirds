
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
    click: 'toggleInput'
  };

  return CheckboxEntryView;

}).call(this);

export default CheckboxEntryView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvY2hlY2tib2stZW50cnkuanMiLCJzb3VyY2VzIjpbInZpZXdzL2NoZWNrYm9rLWVudHJ5LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7SUFBQTs7QUFBQSxPQUFBO0VBQVMsSUFBQSxVQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQTs7QUFhTTtFQUFOLE1BQUEsa0JBQUEsUUFBZ0MsT0FBaEM7SUFTRSxRQUFVLENBQUEsQ0FBQTthQUNSLElBQUMsQ0FBQSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQVYsQ0FBZSxTQUFmLEVBQTBCLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLFVBQVgsQ0FBMUI7SUFEUTs7SUFFVixXQUFhLENBQUEsQ0FBQTtBQUNYLFVBQUE7TUFBQSxPQUFBLEdBQVUsSUFBQyxDQUFBLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBVixDQUFhLFVBQWI7TUFDVixJQUFDLENBQUEsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFWLENBQWUsU0FBZixFQUEwQixDQUFJLE9BQTlCO01BQ0EsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsVUFBWCxFQUF1QixDQUFJLE9BQTNCO01BQ0EsSUFBQyxDQUFBLE9BQUQsQ0FBUyxDQUFBLFFBQUEsQ0FBQSxDQUFXLENBQUksT0FBZixDQUFBLENBQVQ7YUFDQSxJQUFDLENBQUEsT0FBRCxDQUFTLFNBQVQ7SUFMVzs7SUFNYixVQUFZLENBQUEsQ0FBQTtBQUNWLGFBQU8sSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsVUFBWDtJQURHOztFQWpCZDs7OEJBQ0UsU0FBQSxHQUFXOzs4QkFDWCxRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO0lBQ3RCLEVBQUUsQ0FBQyxLQUFILENBQVMsbUJBQVQsRUFBOEI7TUFBQSxJQUFBLEVBQUs7SUFBTCxDQUE5QjtXQUNBLEVBQUUsQ0FBQyxLQUFILENBQVMsbUJBQVQsRUFBOEIsS0FBSyxDQUFDLElBQXBDO0VBRnNCLENBQWQ7OzhCQUdWLEVBQUEsR0FDRTtJQUFBLEtBQUEsRUFBTztFQUFQOzs4QkFDRixNQUFBLEdBQ0U7SUFBQSxLQUFBLEVBQU87RUFBUDs7Ozs7O0FBWUosT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlldyBhcyBNblZpZXcgfSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuIyMjXG5UaGllIG1vZGVsIGZvciB0aGlzIHZpZXcgb25seSBuZWVkcyB0byBiZTpcbiAgTW9kZWw6XG4gICAgbmFtZTogXCJhIG5hbWVcIlxuICAgIHNlbGVjdGVkOiAoYm9vbGVhbilcblxuSWYgYW4gXCJpZFwiIGF0dHJpYnV0ZSBpcyBkZXNpcmVkLCBpdCBjYW4gYmUgZG9uZVxuaW4gdGhlIHBhcmVudCB2aWV3LCBvciBhIHN1YmNsYXNzIG9mIHRoaXMgdmlldy5cblxuIyMjXG5cbmNsYXNzIENoZWNrYm94RW50cnlWaWV3IGV4dGVuZHMgTW5WaWV3XG4gIGNsYXNzTmFtZTogXCJmb3JtLWdyb3VwIGZvcm0tY2hlY2tcIlxuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgdGMuaW5wdXQgJy5mb3JtLWNoZWNrLWlucHV0JywgdHlwZTonY2hlY2tib3gnXG4gICAgdGMubGFiZWwgJy5mb3JtLWNoZWNrLWxhYmVsJywgbW9kZWwubmFtZVxuICB1aTpcbiAgICBpbnB1dDogJ2lucHV0J1xuICBldmVudHM6XG4gICAgY2xpY2s6ICd0b2dnbGVJbnB1dCdcbiAgb25SZW5kZXI6IC0+XG4gICAgQHVpLmlucHV0LnByb3AgJ2NoZWNrZWQnLCBAbW9kZWwuZ2V0KCdzZWxlY3RlZCcpXG4gIHRvZ2dsZUlucHV0OiAtPlxuICAgIGNoZWNrZWQgPSBAdWkuaW5wdXQuaXMgJzpjaGVja2VkJ1xuICAgIEB1aS5pbnB1dC5wcm9wICdjaGVja2VkJywgbm90IGNoZWNrZWRcbiAgICBAbW9kZWwuc2V0ICdzZWxlY3RlZCcsIG5vdCBjaGVja2VkXG4gICAgQHRyaWdnZXIgXCJjaGVja2VkOiN7bm90IGNoZWNrZWR9XCJcbiAgICBAdHJpZ2dlciAndG9nZ2xlZCdcbiAgaXNTZWxlY3RlZDogLT5cbiAgICByZXR1cm4gQG1vZGVsLmdldCAnc2VsZWN0ZWQnXG4gICAgXG5leHBvcnQgZGVmYXVsdCBDaGVja2JveEVudHJ5Vmlld1xuIl19
