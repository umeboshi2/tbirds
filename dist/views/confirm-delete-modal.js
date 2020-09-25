var ConfirmDeleteModal, MainChannel, MessageChannel;

import {
  Radio
} from 'backbone';

import {
  View as MnView
} from 'backbone.marionette';

import tc from 'teacup';

MainChannel = Radio.channel('global');

MessageChannel = Radio.channel('messages');

ConfirmDeleteModal = (function() {
  class ConfirmDeleteModal extends MnView {
    events() {
      return {
        'click @ui.submitBtn': 'confirmDelete'
      };
    }

    confirmDelete() {
      var response;
      console.log('delete', this.model);
      response = this.model.destroy();
      response.fail(function() {
        return MessageChannel.request('xhr-error', response);
      });
      return response.done(function() {
        return MainChannel.request('main:app:empty-modal');
      });
    }

  };

  ConfirmDeleteModal.prototype.template = tc.renderable(function(model) {
    var name;
    name = model.name || "this model";
    return tc.div('.modal-dialog', function() {
      return tc.div('.modal-content', function() {
        tc.h3(`Delete ${name}?`);
        tc.div('.modal-body', function() {
          return tc.div('.selected-children');
        });
        return tc.div('.modal-footer', function() {
          tc.button('.btn.btn-warning.fa.fa-close.mr-auto', {
            data: {
              dismiss: 'modal'
            }
          }, 'Cancel');
          return tc.button('.btn.btn-primary.ml-auto.submit-btn', "Delete");
        });
      });
    });
  });

  ConfirmDeleteModal.prototype.ui = {
    submitBtn: '.submit-btn'
  };

  return ConfirmDeleteModal;

}).call(this);

export default ConfirmDeleteModal;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvY29uZmlybS1kZWxldGUtbW9kYWwuanMiLCJzb3VyY2VzIjpbInZpZXdzL2NvbmZpcm0tZGVsZXRlLW1vZGFsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLGtCQUFBLEVBQUEsV0FBQSxFQUFBOztBQUFBLE9BQUE7RUFBUyxLQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsSUFBQSxVQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQTs7QUFFQSxXQUFBLEdBQWMsS0FBSyxDQUFDLE9BQU4sQ0FBYyxRQUFkOztBQUNkLGNBQUEsR0FBaUIsS0FBSyxDQUFDLE9BQU4sQ0FBYyxVQUFkOztBQUVYO0VBQU4sTUFBQSxtQkFBQSxRQUFpQyxPQUFqQztJQWNFLE1BQVEsQ0FBQSxDQUFBO2FBQ047UUFBQSxxQkFBQSxFQUF1QjtNQUF2QjtJQURNOztJQUdSLGFBQWUsQ0FBQSxDQUFBO0FBQ2IsVUFBQTtNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksUUFBWixFQUFzQixJQUFDLENBQUEsS0FBdkI7TUFDQSxRQUFBLEdBQVcsSUFBQyxDQUFBLEtBQUssQ0FBQyxPQUFQLENBQUE7TUFDWCxRQUFRLENBQUMsSUFBVCxDQUFjLFFBQUEsQ0FBQSxDQUFBO2VBQ1osY0FBYyxDQUFDLE9BQWYsQ0FBdUIsV0FBdkIsRUFBb0MsUUFBcEM7TUFEWSxDQUFkO2FBRUEsUUFBUSxDQUFDLElBQVQsQ0FBYyxRQUFBLENBQUEsQ0FBQTtlQUNaLFdBQVcsQ0FBQyxPQUFaLENBQW9CLHNCQUFwQjtNQURZLENBQWQ7SUFMYTs7RUFqQmpCOzsrQkFDRSxRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO0FBQ3RCLFFBQUE7SUFBQSxJQUFBLEdBQU8sS0FBSyxDQUFDLElBQU4sSUFBYztXQUNyQixFQUFFLENBQUMsR0FBSCxDQUFPLGVBQVAsRUFBd0IsUUFBQSxDQUFBLENBQUE7YUFDdEIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxnQkFBUCxFQUF5QixRQUFBLENBQUEsQ0FBQTtRQUN2QixFQUFFLENBQUMsRUFBSCxDQUFNLENBQUEsT0FBQSxDQUFBLENBQVUsSUFBVixDQUFlLENBQWYsQ0FBTjtRQUNBLEVBQUUsQ0FBQyxHQUFILENBQU8sYUFBUCxFQUFzQixRQUFBLENBQUEsQ0FBQTtpQkFDcEIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxvQkFBUDtRQURvQixDQUF0QjtlQUVBLEVBQUUsQ0FBQyxHQUFILENBQU8sZUFBUCxFQUF3QixRQUFBLENBQUEsQ0FBQTtVQUN0QixFQUFFLENBQUMsTUFBSCxDQUFVLHNDQUFWLEVBQ0E7WUFBQSxJQUFBLEVBQUs7Y0FBQSxPQUFBLEVBQVE7WUFBUjtVQUFMLENBREEsRUFDc0IsUUFEdEI7aUJBRUEsRUFBRSxDQUFDLE1BQUgsQ0FBVSxxQ0FBVixFQUFpRCxRQUFqRDtRQUhzQixDQUF4QjtNQUp1QixDQUF6QjtJQURzQixDQUF4QjtFQUZzQixDQUFkOzsrQkFXVixFQUFBLEdBQ0U7SUFBQSxTQUFBLEVBQVc7RUFBWDs7Ozs7O0FBWUosT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmFkaW8gfSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCB7IFZpZXcgYXMgTW5WaWV3IH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5cbk1haW5DaGFubmVsID0gUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBSYWRpby5jaGFubmVsICdtZXNzYWdlcydcblxuY2xhc3MgQ29uZmlybURlbGV0ZU1vZGFsIGV4dGVuZHMgTW5WaWV3XG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICBuYW1lID0gbW9kZWwubmFtZSBvciBcInRoaXMgbW9kZWxcIlxuICAgIHRjLmRpdiAnLm1vZGFsLWRpYWxvZycsIC0+XG4gICAgICB0Yy5kaXYgJy5tb2RhbC1jb250ZW50JywgLT5cbiAgICAgICAgdGMuaDMgXCJEZWxldGUgI3tuYW1lfT9cIlxuICAgICAgICB0Yy5kaXYgJy5tb2RhbC1ib2R5JywgLT5cbiAgICAgICAgICB0Yy5kaXYgJy5zZWxlY3RlZC1jaGlsZHJlbidcbiAgICAgICAgdGMuZGl2ICcubW9kYWwtZm9vdGVyJywgLT5cbiAgICAgICAgICB0Yy5idXR0b24gJy5idG4uYnRuLXdhcm5pbmcuZmEuZmEtY2xvc2UubXItYXV0bycsXG4gICAgICAgICAgZGF0YTpkaXNtaXNzOidtb2RhbCcsICdDYW5jZWwnXG4gICAgICAgICAgdGMuYnV0dG9uICcuYnRuLmJ0bi1wcmltYXJ5Lm1sLWF1dG8uc3VibWl0LWJ0bicsIFwiRGVsZXRlXCJcbiAgdWk6XG4gICAgc3VibWl0QnRuOiAnLnN1Ym1pdC1idG4nXG4gIGV2ZW50czogLT5cbiAgICAnY2xpY2sgQHVpLnN1Ym1pdEJ0bic6ICdjb25maXJtRGVsZXRlJ1xuXG4gIGNvbmZpcm1EZWxldGU6IC0+XG4gICAgY29uc29sZS5sb2cgJ2RlbGV0ZScsIEBtb2RlbFxuICAgIHJlc3BvbnNlID0gQG1vZGVsLmRlc3Ryb3koKVxuICAgIHJlc3BvbnNlLmZhaWwgLT5cbiAgICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ3hoci1lcnJvcicsIHJlc3BvbnNlXG4gICAgcmVzcG9uc2UuZG9uZSAtPlxuICAgICAgTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6ZW1wdHktbW9kYWwnXG4gICAgICBcbmV4cG9ydCBkZWZhdWx0IENvbmZpcm1EZWxldGVNb2RhbFxuIl19
