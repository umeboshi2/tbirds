var ConfirmDeleteModal, ConfirmDeleteTemplate, MessageChannel;

import {
  Radio
} from 'backbone';

import {
  View
} from 'backbone.marionette';

import tc from 'teacup';

import modal_close_button from './templates/buttons';

MessageChannel = Radio.channel('messages');

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
  class ConfirmDeleteModal extends View {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLW5hbWVkLW1vZGVsLmpzIiwic291cmNlcyI6WyJkZWxldGUtbmFtZWQtbW9kZWwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsa0JBQUEsRUFBQSxxQkFBQSxFQUFBOztBQUFBLE9BQUE7RUFBUyxLQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsSUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxFQUFQLE1BQUE7O0FBR0EsT0FBTyxrQkFBUCxNQUFBOztBQUVBLGNBQUEsR0FBaUIsS0FBSyxDQUFDLE9BQU4sQ0FBYyxVQUFkLEVBUGpCOzs7QUFVQSxxQkFBQSxHQUF3QixFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxLQUFELENBQUE7U0FDcEMsRUFBRSxDQUFDLEdBQUgsQ0FBTyxlQUFQLEVBQXdCLFFBQUEsQ0FBQSxDQUFBO1dBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sZ0JBQVAsRUFBeUIsUUFBQSxDQUFBLENBQUE7TUFDdkIsRUFBRSxDQUFDLEVBQUgsQ0FBTSxDQUFBLDZCQUFBLENBQUEsQ0FBZ0MsS0FBSyxDQUFDLGdCQUF0QyxDQUF1RCxDQUF2RCxDQUFOO01BQ0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyxhQUFQLEVBQXNCLFFBQUEsQ0FBQSxDQUFBO2VBQ3BCLEVBQUUsQ0FBQyxHQUFILENBQU8sb0JBQVA7TUFEb0IsQ0FBdEI7YUFFQSxFQUFFLENBQUMsR0FBSCxDQUFPLGVBQVAsRUFBd0IsUUFBQSxDQUFBLENBQUE7ZUFDdEIsRUFBRSxDQUFDLEVBQUgsQ0FBTSxjQUFOLEVBQXNCLFFBQUEsQ0FBQSxDQUFBO1VBQ3BCLEVBQUUsQ0FBQyxFQUFILENBQU0sd0JBQU4sRUFBZ0MsUUFBQSxDQUFBLENBQUE7bUJBQzlCLGtCQUFBLENBQW1CLElBQW5CLEVBQXlCLE9BQXpCO1VBRDhCLENBQWhDO2lCQUVBLEVBQUUsQ0FBQyxFQUFILENBQU0sdUJBQU4sRUFBK0IsUUFBQSxDQUFBLENBQUE7bUJBQzdCLGtCQUFBLENBQW1CLFFBQW5CO1VBRDZCLENBQS9CO1FBSG9CLENBQXRCO01BRHNCLENBQXhCO0lBSnVCLENBQXpCO0VBRHNCLENBQXhCO0FBRG9DLENBQWQ7O0FBY2xCO0VBQU4sTUFBQSxtQkFBQSxRQUFpQyxLQUFqQztJQUVFLGVBQWlCLENBQUEsQ0FBQTthQUlmLENBQUE7Ozs7UUFBQSxnQkFBQSxFQUFrQixJQUFDLENBQUEsU0FBRCxDQUFXLHNCQUFYLENBQUEsSUFBc0M7TUFBeEQ7SUFKZTs7SUFTakIsTUFBUSxDQUFBLENBQUE7YUFDTjtRQUFBLDBCQUFBLEVBQTRCO01BQTVCO0lBRE07O0lBR1IsY0FBZ0IsQ0FBQSxDQUFBO0FBQ2QsVUFBQSxJQUFBLEVBQUE7TUFBQSxJQUFBLEdBQU8sSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsTUFBWDtNQUNQLFFBQUEsR0FBVyxJQUFDLENBQUEsS0FBSyxDQUFDLE9BQVAsQ0FBQTtNQUNYLFFBQVEsQ0FBQyxJQUFULENBQWMsUUFBQSxDQUFBLENBQUE7ZUFDWixjQUFjLENBQUMsT0FBZixDQUF1QixTQUF2QixFQUFrQyxDQUFBLENBQUEsQ0FBRyxJQUFILENBQVEsU0FBUixDQUFsQztNQURZLENBQWQ7YUFFQSxRQUFRLENBQUMsSUFBVCxDQUFjLFFBQUEsQ0FBQSxDQUFBO2VBQ1osY0FBYyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkIsRUFBaUMsQ0FBQSxDQUFBLENBQUcsSUFBSCxDQUFRLGFBQVIsQ0FBakM7TUFEWSxDQUFkO0lBTGM7O0VBZGxCOzsrQkFDRSxRQUFBLEdBQVU7OytCQU1WLEVBQUEsR0FDRTtJQUFBLGNBQUEsRUFBZ0Isd0JBQWhCO0lBQ0EsYUFBQSxFQUFlO0VBRGY7Ozs7OztBQWNKLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJhZGlvIH0gZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5cbiN7IG1vZGFsX2Nsb3NlX2J1dHRvbiB9ID0gcmVxdWlyZSAnLi90ZW1wbGF0ZXMvYnV0dG9ucydcbmltcG9ydCBtb2RhbF9jbG9zZV9idXR0b24gZnJvbSAnLi90ZW1wbGF0ZXMvYnV0dG9ucydcblxuTWVzc2FnZUNoYW5uZWwgPSBSYWRpby5jaGFubmVsICdtZXNzYWdlcydcblxuIyBGSVhNRSwgdGhpcyBkZXBlbmRzIG9uIHRoZSBtb2RlbCBoYXZpbmcgYSBcIm5hbWVcIiBhdHRyaWJ1dGVcbkNvbmZpcm1EZWxldGVUZW1wbGF0ZSA9IHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICB0Yy5kaXYgJy5tb2RhbC1kaWFsb2cnLCAtPlxuICAgIHRjLmRpdiAnLm1vZGFsLWNvbnRlbnQnLCAtPlxuICAgICAgdGMuaDMgXCJEbyB5b3UgcmVhbGx5IHdhbnQgdG8gZGVsZXRlICN7bW9kZWwuX2h1bWFuSWRlbnRpZmllcn0/XCJcbiAgICAgIHRjLmRpdiAnLm1vZGFsLWJvZHknLCAtPlxuICAgICAgICB0Yy5kaXYgJyNzZWxlY3RlZC1jaGlsZHJlbidcbiAgICAgIHRjLmRpdiAnLm1vZGFsLWZvb3RlcicsIC0+XG4gICAgICAgIHRjLnVsICcubGlzdC1pbmxpbmUnLCAtPlxuICAgICAgICAgIHRjLmxpIFwiI2NvbmZpcm0tZGVsZXRlLWJ1dHRvblwiLCAtPlxuICAgICAgICAgICAgbW9kYWxfY2xvc2VfYnV0dG9uICdPSycsICdjaGVjaydcbiAgICAgICAgICB0Yy5saSBcIiNjYW5jZWwtZGVsZXRlLWJ1dHRvblwiLCAtPlxuICAgICAgICAgICAgbW9kYWxfY2xvc2VfYnV0dG9uICdDYW5jZWwnXG4gICAgXG5cbmNsYXNzIENvbmZpcm1EZWxldGVNb2RhbCBleHRlbmRzIFZpZXdcbiAgdGVtcGxhdGU6IENvbmZpcm1EZWxldGVUZW1wbGF0ZVxuICB0ZW1wbGF0ZUNvbnRleHQ6IC0+XG4gICAgIyBGSVhNRSB0aGlzIGlzIHVuZGVyc2NvcmVkIHRvIGhvcGVmdWxseVxuICAgICMga2VlcCBmcm9tIHBvdGVudGlhbGx5IGNsb2JiZXJpbmcgZ2VuZXJpYyBtb2RlbCBhdHRyaWJ1dGUuXG4gICAgIyBGaW5kIGEgYmV0dGVyIHdheSB0byBkbyB0aGlzLlxuICAgIF9odW1hbklkZW50aWZpZXI6IEBnZXRPcHRpb24oJ21vZGVsSHVtYW5JZGVudGlmaWVyJykgb3IgJ25hbWUnXG4gIHVpOlxuICAgIGNvbmZpcm1fZGVsZXRlOiAnI2NvbmZpcm0tZGVsZXRlLWJ1dHRvbidcbiAgICBjYW5jZWxfYnV0dG9uOiAnI2NhbmNlbC1kZWxldGUtYnV0dG9uJ1xuICAgIFxuICBldmVudHM6IC0+XG4gICAgJ2NsaWNrIEB1aS5jb25maXJtX2RlbGV0ZSc6ICdjb25maXJtX2RlbGV0ZSdcblxuICBjb25maXJtX2RlbGV0ZTogLT5cbiAgICBuYW1lID0gQG1vZGVsLmdldCAnbmFtZSdcbiAgICByZXNwb25zZSA9IEBtb2RlbC5kZXN0cm95KClcbiAgICByZXNwb25zZS5kb25lIC0+XG4gICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICdzdWNjZXNzJywgXCIje25hbWV9IGRlbGV0ZWQuXCIsXG4gICAgcmVzcG9uc2UuZmFpbCAtPlxuICAgICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnZGFuZ2VyJywgXCIje25hbWV9IE5PVCBkZWxldGVkLlwiXG4gICAgICBcbmV4cG9ydCBkZWZhdWx0IENvbmZpcm1EZWxldGVNb2RhbFxuXG4iXX0=
