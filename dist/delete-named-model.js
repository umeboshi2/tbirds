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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLW5hbWVkLW1vZGVsLmpzIiwic291cmNlcyI6WyJkZWxldGUtbmFtZWQtbW9kZWwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsa0JBQUEsRUFBQSxxQkFBQSxFQUFBOztBQUFBLE9BQUE7RUFBUyxLQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsSUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxFQUFQLE1BQUE7O0FBR0EsT0FBTyxrQkFBUCxNQUFBOztBQUVBLGNBQUEsR0FBaUIsS0FBSyxDQUFDLE9BQU4sQ0FBYyxVQUFkLEVBUGpCOzs7QUFVQSxxQkFBQSxHQUF3QixFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxLQUFELENBQUE7U0FDcEMsRUFBRSxDQUFDLEdBQUgsQ0FBTyxlQUFQLEVBQXdCLFFBQUEsQ0FBQSxDQUFBO1dBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sZ0JBQVAsRUFBeUIsUUFBQSxDQUFBLENBQUE7TUFDdkIsRUFBRSxDQUFDLEVBQUgsQ0FBTSxDQUFBLDZCQUFBLENBQUEsQ0FBZ0MsS0FBSyxDQUFDLGdCQUF0QyxDQUFBLENBQUEsQ0FBTjtNQUNBLEVBQUUsQ0FBQyxHQUFILENBQU8sYUFBUCxFQUFzQixRQUFBLENBQUEsQ0FBQTtlQUNwQixFQUFFLENBQUMsR0FBSCxDQUFPLG9CQUFQO01BRG9CLENBQXRCO2FBRUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyxlQUFQLEVBQXdCLFFBQUEsQ0FBQSxDQUFBO2VBQ3RCLEVBQUUsQ0FBQyxFQUFILENBQU0sY0FBTixFQUFzQixRQUFBLENBQUEsQ0FBQTtVQUNwQixFQUFFLENBQUMsRUFBSCxDQUFNLHdCQUFOLEVBQWdDLFFBQUEsQ0FBQSxDQUFBO21CQUM5QixrQkFBQSxDQUFtQixJQUFuQixFQUF5QixPQUF6QjtVQUQ4QixDQUFoQztpQkFFQSxFQUFFLENBQUMsRUFBSCxDQUFNLHVCQUFOLEVBQStCLFFBQUEsQ0FBQSxDQUFBO21CQUM3QixrQkFBQSxDQUFtQixRQUFuQjtVQUQ2QixDQUEvQjtRQUhvQixDQUF0QjtNQURzQixDQUF4QjtJQUp1QixDQUF6QjtFQURzQixDQUF4QjtBQURvQyxDQUFkOztBQWNsQjtFQUFOLE1BQUEsbUJBQUEsUUFBaUMsS0FBakM7SUFFRSxlQUFpQixDQUFBLENBQUE7YUFJZixDQUFBOzs7O1FBQUEsZ0JBQUEsRUFBa0IsSUFBQyxDQUFBLFNBQUQsQ0FBVyxzQkFBWCxDQUFBLElBQXNDO01BQXhEO0lBSmU7O0lBU2pCLE1BQVEsQ0FBQSxDQUFBO2FBQ047UUFBQSwwQkFBQSxFQUE0QjtNQUE1QjtJQURNOztJQUdSLGNBQWdCLENBQUEsQ0FBQTtBQUNsQixVQUFBLElBQUEsRUFBQTtNQUFJLElBQUEsR0FBTyxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxNQUFYO01BQ1AsUUFBQSxHQUFXLElBQUMsQ0FBQSxLQUFLLENBQUMsT0FBUCxDQUFBO01BQ1gsUUFBUSxDQUFDLElBQVQsQ0FBYyxRQUFBLENBQUEsQ0FBQTtlQUNaLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFNBQXZCLEVBQWtDLENBQUEsQ0FBQSxDQUFHLElBQUgsQ0FBQSxTQUFBLENBQWxDO01BRFksQ0FBZDthQUVBLFFBQVEsQ0FBQyxJQUFULENBQWMsUUFBQSxDQUFBLENBQUE7ZUFDWixjQUFjLENBQUMsT0FBZixDQUF1QixRQUF2QixFQUFpQyxDQUFBLENBQUEsQ0FBRyxJQUFILENBQUEsYUFBQSxDQUFqQztNQURZLENBQWQ7SUFMYzs7RUFkbEI7OytCQUNFLFFBQUEsR0FBVTs7K0JBTVYsRUFBQSxHQUNFO0lBQUEsY0FBQSxFQUFnQix3QkFBaEI7SUFDQSxhQUFBLEVBQWU7RUFEZjs7Ozs7O0FBY0osT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmFkaW8gfSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCB7IFZpZXcgfSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuI3sgbW9kYWxfY2xvc2VfYnV0dG9uIH0gPSByZXF1aXJlICcuL3RlbXBsYXRlcy9idXR0b25zJ1xuaW1wb3J0IG1vZGFsX2Nsb3NlX2J1dHRvbiBmcm9tICcuL3RlbXBsYXRlcy9idXR0b25zJ1xuXG5NZXNzYWdlQ2hhbm5lbCA9IFJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG4jIEZJWE1FLCB0aGlzIGRlcGVuZHMgb24gdGhlIG1vZGVsIGhhdmluZyBhIFwibmFtZVwiIGF0dHJpYnV0ZVxuQ29uZmlybURlbGV0ZVRlbXBsYXRlID0gdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gIHRjLmRpdiAnLm1vZGFsLWRpYWxvZycsIC0+XG4gICAgdGMuZGl2ICcubW9kYWwtY29udGVudCcsIC0+XG4gICAgICB0Yy5oMyBcIkRvIHlvdSByZWFsbHkgd2FudCB0byBkZWxldGUgI3ttb2RlbC5faHVtYW5JZGVudGlmaWVyfT9cIlxuICAgICAgdGMuZGl2ICcubW9kYWwtYm9keScsIC0+XG4gICAgICAgIHRjLmRpdiAnI3NlbGVjdGVkLWNoaWxkcmVuJ1xuICAgICAgdGMuZGl2ICcubW9kYWwtZm9vdGVyJywgLT5cbiAgICAgICAgdGMudWwgJy5saXN0LWlubGluZScsIC0+XG4gICAgICAgICAgdGMubGkgXCIjY29uZmlybS1kZWxldGUtYnV0dG9uXCIsIC0+XG4gICAgICAgICAgICBtb2RhbF9jbG9zZV9idXR0b24gJ09LJywgJ2NoZWNrJ1xuICAgICAgICAgIHRjLmxpIFwiI2NhbmNlbC1kZWxldGUtYnV0dG9uXCIsIC0+XG4gICAgICAgICAgICBtb2RhbF9jbG9zZV9idXR0b24gJ0NhbmNlbCdcbiAgICBcblxuY2xhc3MgQ29uZmlybURlbGV0ZU1vZGFsIGV4dGVuZHMgVmlld1xuICB0ZW1wbGF0ZTogQ29uZmlybURlbGV0ZVRlbXBsYXRlXG4gIHRlbXBsYXRlQ29udGV4dDogLT5cbiAgICAjIEZJWE1FIHRoaXMgaXMgdW5kZXJzY29yZWQgdG8gaG9wZWZ1bGx5XG4gICAgIyBrZWVwIGZyb20gcG90ZW50aWFsbHkgY2xvYmJlcmluZyBnZW5lcmljIG1vZGVsIGF0dHJpYnV0ZS5cbiAgICAjIEZpbmQgYSBiZXR0ZXIgd2F5IHRvIGRvIHRoaXMuXG4gICAgX2h1bWFuSWRlbnRpZmllcjogQGdldE9wdGlvbignbW9kZWxIdW1hbklkZW50aWZpZXInKSBvciAnbmFtZSdcbiAgdWk6XG4gICAgY29uZmlybV9kZWxldGU6ICcjY29uZmlybS1kZWxldGUtYnV0dG9uJ1xuICAgIGNhbmNlbF9idXR0b246ICcjY2FuY2VsLWRlbGV0ZS1idXR0b24nXG4gICAgXG4gIGV2ZW50czogLT5cbiAgICAnY2xpY2sgQHVpLmNvbmZpcm1fZGVsZXRlJzogJ2NvbmZpcm1fZGVsZXRlJ1xuXG4gIGNvbmZpcm1fZGVsZXRlOiAtPlxuICAgIG5hbWUgPSBAbW9kZWwuZ2V0ICduYW1lJ1xuICAgIHJlc3BvbnNlID0gQG1vZGVsLmRlc3Ryb3koKVxuICAgIHJlc3BvbnNlLmRvbmUgLT5cbiAgICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ3N1Y2Nlc3MnLCBcIiN7bmFtZX0gZGVsZXRlZC5cIixcbiAgICByZXNwb25zZS5mYWlsIC0+XG4gICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICdkYW5nZXInLCBcIiN7bmFtZX0gTk9UIGRlbGV0ZWQuXCJcbiAgICAgIFxuZXhwb3J0IGRlZmF1bHQgQ29uZmlybURlbGV0ZU1vZGFsXG5cbiJdfQ==
