var ConfirmDeleteModal, ConfirmDeleteTemplate, MainChannel, MessageChannel;

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

import tc from 'teacup';

import modal_close_button from './templates/buttons';

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

// FIXME, this depends on the model having a "name" attribute
ConfirmDeleteTemplate = tc.renderable(function(model) {
  return tc.div('.modal-dialog', function() {
    return tc.div('.modal-content', function() {
      tc.h3(`Do you really want to delete ${model._humanIdentifier}?`);
      tc.div('.modal-body', function() {
        return tc.div('#selected-children');
      });
      return tc.div('.modal-footer', function() {
        return tc.ul('.list-inline', function() {
          var btnclass;
          btnclass = 'btn.btn-secondary.btn-sm';
          tc.li("#confirm-delete-button", function() {
            return modal_close_button('OK', 'check');
          });
          return tc.li("#cancel-delete-button", function() {
            return modal_close_button('Cancel');
          });
        });
      });
    });
  });
});

ConfirmDeleteModal = (function() {
  class ConfirmDeleteModal extends Backbone.Marionette.View {
    templateContext() {
      return {
        // FIXME this is underscored to hopefully
        // keep from potentially clobbering generic model attribute.
        // Find a better way to do this.
        _humanIdentifier: this.getOption('modelHumanIdentifier') || 'name'
      };
    }

    events() {
      return {
        'click @ui.confirm_delete': 'confirm_delete'
      };
    }

    confirm_delete() {
      var name, response;
      name = this.model.get('name');
      response = this.model.destroy();
      response.done(function() {
        return MessageChannel.request('success', `${name} deleted.`);
      });
      return response.fail(function() {
        return MessageChannel.request('danger', `${name} NOT deleted.`);
      });
    }

  };

  ConfirmDeleteModal.prototype.template = ConfirmDeleteTemplate;

  ConfirmDeleteModal.prototype.ui = {
    confirm_delete: '#confirm-delete-button',
    cancel_button: '#cancel-delete-button'
  };

  return ConfirmDeleteModal;

}).call(this);

export default ConfirmDeleteModal;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLW5hbWVkLW1vZGVsLmpzIiwic291cmNlcyI6WyJkZWxldGUtbmFtZWQtbW9kZWwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsa0JBQUEsRUFBQSxxQkFBQSxFQUFBLFdBQUEsRUFBQTs7QUFBQSxPQUFPLFFBQVAsTUFBQTs7QUFDQSxPQUFPLFVBQVAsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQTs7QUFHQSxPQUFPLGtCQUFQLE1BQUE7O0FBRUEsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDZCxjQUFBLEdBQWlCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixVQUF2QixFQVJqQjs7O0FBV0EscUJBQUEsR0FBd0IsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO1NBQ3BDLEVBQUUsQ0FBQyxHQUFILENBQU8sZUFBUCxFQUF3QixRQUFBLENBQUEsQ0FBQTtXQUN0QixFQUFFLENBQUMsR0FBSCxDQUFPLGdCQUFQLEVBQXlCLFFBQUEsQ0FBQSxDQUFBO01BQ3ZCLEVBQUUsQ0FBQyxFQUFILENBQU0sQ0FBQSw2QkFBQSxDQUFBLENBQWdDLEtBQUssQ0FBQyxnQkFBdEMsQ0FBdUQsQ0FBdkQsQ0FBTjtNQUNBLEVBQUUsQ0FBQyxHQUFILENBQU8sYUFBUCxFQUFzQixRQUFBLENBQUEsQ0FBQTtlQUNwQixFQUFFLENBQUMsR0FBSCxDQUFPLG9CQUFQO01BRG9CLENBQXRCO2FBRUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyxlQUFQLEVBQXdCLFFBQUEsQ0FBQSxDQUFBO2VBQ3RCLEVBQUUsQ0FBQyxFQUFILENBQU0sY0FBTixFQUFzQixRQUFBLENBQUEsQ0FBQTtBQUNwQixjQUFBO1VBQUEsUUFBQSxHQUFXO1VBQ1gsRUFBRSxDQUFDLEVBQUgsQ0FBTSx3QkFBTixFQUFnQyxRQUFBLENBQUEsQ0FBQTttQkFDOUIsa0JBQUEsQ0FBbUIsSUFBbkIsRUFBeUIsT0FBekI7VUFEOEIsQ0FBaEM7aUJBRUEsRUFBRSxDQUFDLEVBQUgsQ0FBTSx1QkFBTixFQUErQixRQUFBLENBQUEsQ0FBQTttQkFDN0Isa0JBQUEsQ0FBbUIsUUFBbkI7VUFENkIsQ0FBL0I7UUFKb0IsQ0FBdEI7TUFEc0IsQ0FBeEI7SUFKdUIsQ0FBekI7RUFEc0IsQ0FBeEI7QUFEb0MsQ0FBZDs7QUFlbEI7RUFBTixNQUFBLG1CQUFBLFFBQWlDLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBckQ7SUFFRSxlQUFpQixDQUFBLENBQUE7YUFJZixDQUFBOzs7O1FBQUEsZ0JBQUEsRUFBa0IsSUFBQyxDQUFBLFNBQUQsQ0FBVyxzQkFBWCxDQUFBLElBQXNDO01BQXhEO0lBSmU7O0lBU2pCLE1BQVEsQ0FBQSxDQUFBO2FBQ047UUFBQSwwQkFBQSxFQUE0QjtNQUE1QjtJQURNOztJQUdSLGNBQWdCLENBQUEsQ0FBQTtBQUNkLFVBQUEsSUFBQSxFQUFBO01BQUEsSUFBQSxHQUFPLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLE1BQVg7TUFDUCxRQUFBLEdBQVcsSUFBQyxDQUFBLEtBQUssQ0FBQyxPQUFQLENBQUE7TUFDWCxRQUFRLENBQUMsSUFBVCxDQUFjLFFBQUEsQ0FBQSxDQUFBO2VBQ1osY0FBYyxDQUFDLE9BQWYsQ0FBdUIsU0FBdkIsRUFBa0MsQ0FBQSxDQUFBLENBQUcsSUFBSCxDQUFRLFNBQVIsQ0FBbEM7TUFEWSxDQUFkO2FBRUEsUUFBUSxDQUFDLElBQVQsQ0FBYyxRQUFBLENBQUEsQ0FBQTtlQUNaLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFFBQXZCLEVBQWlDLENBQUEsQ0FBQSxDQUFHLElBQUgsQ0FBUSxhQUFSLENBQWpDO01BRFksQ0FBZDtJQUxjOztFQWRsQjs7K0JBQ0UsUUFBQSxHQUFVOzsrQkFNVixFQUFBLEdBQ0U7SUFBQSxjQUFBLEVBQWdCLHdCQUFoQjtJQUNBLGFBQUEsRUFBZTtFQURmOzs7Ozs7QUFjSixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuI3sgbW9kYWxfY2xvc2VfYnV0dG9uIH0gPSByZXF1aXJlICcuL3RlbXBsYXRlcy9idXR0b25zJ1xuaW1wb3J0IG1vZGFsX2Nsb3NlX2J1dHRvbiBmcm9tICcuL3RlbXBsYXRlcy9idXR0b25zJ1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5cbiMgRklYTUUsIHRoaXMgZGVwZW5kcyBvbiB0aGUgbW9kZWwgaGF2aW5nIGEgXCJuYW1lXCIgYXR0cmlidXRlXG5Db25maXJtRGVsZXRlVGVtcGxhdGUgPSB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgdGMuZGl2ICcubW9kYWwtZGlhbG9nJywgLT5cbiAgICB0Yy5kaXYgJy5tb2RhbC1jb250ZW50JywgLT5cbiAgICAgIHRjLmgzIFwiRG8geW91IHJlYWxseSB3YW50IHRvIGRlbGV0ZSAje21vZGVsLl9odW1hbklkZW50aWZpZXJ9P1wiXG4gICAgICB0Yy5kaXYgJy5tb2RhbC1ib2R5JywgLT5cbiAgICAgICAgdGMuZGl2ICcjc2VsZWN0ZWQtY2hpbGRyZW4nXG4gICAgICB0Yy5kaXYgJy5tb2RhbC1mb290ZXInLCAtPlxuICAgICAgICB0Yy51bCAnLmxpc3QtaW5saW5lJywgLT5cbiAgICAgICAgICBidG5jbGFzcyA9ICdidG4uYnRuLXNlY29uZGFyeS5idG4tc20nXG4gICAgICAgICAgdGMubGkgXCIjY29uZmlybS1kZWxldGUtYnV0dG9uXCIsIC0+XG4gICAgICAgICAgICBtb2RhbF9jbG9zZV9idXR0b24gJ09LJywgJ2NoZWNrJ1xuICAgICAgICAgIHRjLmxpIFwiI2NhbmNlbC1kZWxldGUtYnV0dG9uXCIsIC0+XG4gICAgICAgICAgICBtb2RhbF9jbG9zZV9idXR0b24gJ0NhbmNlbCdcbiAgICBcblxuY2xhc3MgQ29uZmlybURlbGV0ZU1vZGFsIGV4dGVuZHMgQmFja2JvbmUuTWFyaW9uZXR0ZS5WaWV3XG4gIHRlbXBsYXRlOiBDb25maXJtRGVsZXRlVGVtcGxhdGVcbiAgdGVtcGxhdGVDb250ZXh0OiAtPlxuICAgICMgRklYTUUgdGhpcyBpcyB1bmRlcnNjb3JlZCB0byBob3BlZnVsbHlcbiAgICAjIGtlZXAgZnJvbSBwb3RlbnRpYWxseSBjbG9iYmVyaW5nIGdlbmVyaWMgbW9kZWwgYXR0cmlidXRlLlxuICAgICMgRmluZCBhIGJldHRlciB3YXkgdG8gZG8gdGhpcy5cbiAgICBfaHVtYW5JZGVudGlmaWVyOiBAZ2V0T3B0aW9uKCdtb2RlbEh1bWFuSWRlbnRpZmllcicpIG9yICduYW1lJ1xuICB1aTpcbiAgICBjb25maXJtX2RlbGV0ZTogJyNjb25maXJtLWRlbGV0ZS1idXR0b24nXG4gICAgY2FuY2VsX2J1dHRvbjogJyNjYW5jZWwtZGVsZXRlLWJ1dHRvbidcbiAgICBcbiAgZXZlbnRzOiAtPlxuICAgICdjbGljayBAdWkuY29uZmlybV9kZWxldGUnOiAnY29uZmlybV9kZWxldGUnXG5cbiAgY29uZmlybV9kZWxldGU6IC0+XG4gICAgbmFtZSA9IEBtb2RlbC5nZXQgJ25hbWUnXG4gICAgcmVzcG9uc2UgPSBAbW9kZWwuZGVzdHJveSgpXG4gICAgcmVzcG9uc2UuZG9uZSAtPlxuICAgICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnc3VjY2VzcycsIFwiI3tuYW1lfSBkZWxldGVkLlwiLFxuICAgIHJlc3BvbnNlLmZhaWwgLT5cbiAgICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ2RhbmdlcicsIFwiI3tuYW1lfSBOT1QgZGVsZXRlZC5cIlxuICAgICAgXG5leHBvcnQgZGVmYXVsdCBDb25maXJtRGVsZXRlTW9kYWxcblxuIl19
