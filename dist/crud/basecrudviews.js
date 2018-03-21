var BaseItemView, BaseListView, ConfirmDeleteModal, ConfirmDeleteTemplate, MainChannel, MessageChannel;

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

import tc from 'teacup';

import navigate_to_url from '../util/navigate-to-url';

import '../regions/bsmodal';

import {
  modal_close_button
} from '../templates/buttons';

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

ConfirmDeleteTemplate = tc.renderable(function(model) {
  return tc.div('.modal-dialog', function() {
    return tc.div('.modal-content', function() {
      tc.h3(`Do you really want to delete ${model.name}?`);
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
  class ConfirmDeleteModal extends Marionette.View {
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

BaseItemView = (function() {
  class BaseItemView extends Marionette.View {
    events() {
      return {
        'click @ui.edit_item': 'edit_item',
        'click @ui.delete_item': 'delete_item'
      };
    }

    edit_item() {
      return navigate_to_url(`#${this.route_name}/${this.item_type}s/edit/${this.model.id}`);
    }

    delete_item() {
      var view;
      if (__DEV__) {
        console.log(`delete_${this.item_type}`, this.model);
      }
      view = new ConfirmDeleteModal({
        model: this.model
      });
      if (__DEV__) {
        console.log('modal view', view);
      }
      show_modal(view, true);
      return MainChannel.request('main:app:show-modal', view, {
        backdrop: true
      });
    }

  };

  BaseItemView.prototype.ui = {
    edit_item: '.edit-item',
    delete_item: '.delete-item',
    item: '.list-item'
  };

  return BaseItemView;

}).call(this);

BaseListView = class BaseListView extends Marionette.View {
  regions() {
    return {
      itemlist: `#${this.item_type}-container`
    };
  }

  ui() {
    return {
      make_new_item: `#new-${this.item_type}`
    };
  }

  onRender() {
    var view;
    view = new Marionette.CollectionView({
      collection: this.collection,
      childView: this.childView
    });
    return this.showChildView('itemlist', view);
  }

  events() {
    return {
      'click @ui.make_new_item': 'make_new_item'
    };
  }

  _show_modal(view, backdrop = false) {
    var modal_region;
    modal_region = MainChannel.request('main:app:get-region', 'modal');
    modal_region.backdrop = backdrop;
    return modal_region.show(view);
  }

  make_new_item() {
    // FIXME - fix url dont't add 's'
    return navigate_to_url(`#${this.route_name}/${this.item_type}s/new`);
  }

};

export {
  BaseItemView,
  BaseListView
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J1ZC9iYXNlY3J1ZHZpZXdzLmpzIiwic291cmNlcyI6WyJjcnVkL2Jhc2VjcnVkdmlld3MuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsWUFBQSxFQUFBLFlBQUEsRUFBQSxrQkFBQSxFQUFBLHFCQUFBLEVBQUEsV0FBQSxFQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQU8sVUFBUCxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUVBLE9BQU8sZUFBUCxNQUFBOztBQUNBLE9BQUE7O0FBQ0EsT0FBQTtFQUFTLGtCQUFUO0NBQUEsTUFBQTs7QUFFQSxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCOztBQUlqQixxQkFBQSxHQUF3QixFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxLQUFELENBQUE7U0FDcEMsRUFBRSxDQUFDLEdBQUgsQ0FBTyxlQUFQLEVBQXdCLFFBQUEsQ0FBQSxDQUFBO1dBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sZ0JBQVAsRUFBeUIsUUFBQSxDQUFBLENBQUE7TUFDdkIsRUFBRSxDQUFDLEVBQUgsQ0FBTSxDQUFBLDZCQUFBLENBQUEsQ0FBZ0MsS0FBSyxDQUFDLElBQXRDLENBQTJDLENBQTNDLENBQU47TUFDQSxFQUFFLENBQUMsR0FBSCxDQUFPLGFBQVAsRUFBc0IsUUFBQSxDQUFBLENBQUE7ZUFDcEIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxvQkFBUDtNQURvQixDQUF0QjthQUVBLEVBQUUsQ0FBQyxHQUFILENBQU8sZUFBUCxFQUF3QixRQUFBLENBQUEsQ0FBQTtlQUN0QixFQUFFLENBQUMsRUFBSCxDQUFNLGNBQU4sRUFBc0IsUUFBQSxDQUFBLENBQUE7QUFDcEIsY0FBQTtVQUFBLFFBQUEsR0FBVztVQUNYLEVBQUUsQ0FBQyxFQUFILENBQU0sd0JB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RUosUUFBVSxDQUFBLENBQUE7QUFDUixRQUFBO0lBQUEsSUFBQSxHQUFPLElBQUksVUFBVSxDQUFDLGNBQWYsQ0FDTDtNQUFBLFVBQUEsRUFBWSxJQUFDLENBQUEsVUFBYjtNQUNBLFNBQUEsRUFBVyxJQUFDLENBQUE7SUFEWixDQURLO1dBR1AsSUFBQyxDQUFBLGFBQUQsQ0FBZSxVQUFmLEVBQTJCLElBQTNCO0VBSlE7O0VBS1YsTUFBUSxDQUFBLENBQUE7V0FDTjtNQUFBLHlCQUFBLEVBQTJCO0lBQTNCO0VBRE07O0VBR1IsV0FBYSxDQUFDLElBQUQsRUFBTyxXQUFTLEtBQWhCLENBQUE7QUFDWCxRQUFBO0lBQUEsWUFBQSxHQUFlLFdBQVcsQ0FBQyxPQUFaLENBQW9CLHFCQUFwQixFQUEyQyxPQUEzQztJQUNmLFlBQVksQ0FBQyxRQUFiLEdBQXdCO1dBQ3hCLFlBQVksQ0FBQyxJQUFiLENBQWtCLElBQWxCO0VBSFc7O0VBS2IsYUFBZSxDQUFBLENBQUEsRUFBQTs7V0FFYixlQUFBLENBQWdCLENBQUEsQ0FBQSxDQUFBLENBQUksSUFBQyxDQUFBLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBQSxDQUFtQixJQUFDLENBQUEsU0FBcEIsQ0FBOEIsS0FBOUIsQ0FBaEI7RUFGYTs7QUFsQmpCOztBQXNCQSxPQUFBO0VBQ0UsWUFERjtFQUVFLFlBRkYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuaW1wb3J0IG5hdmlnYXRlX3RvX3VybCBmcm9tICcuLi91dGlsL25hdmlnYXRlLXRvLXVybCdcbmltcG9ydCAnLi4vcmVnaW9ucy9ic21vZGFsJ1xuaW1wb3J0IHsgbW9kYWxfY2xvc2VfYnV0dG9uIH0gZnJvbSAnLi4vdGVtcGxhdGVzL2J1dHRvbnMnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdtZXNzYWdlcydcblxuXG5cbkNvbmZpcm1EZWxldGVUZW1wbGF0ZSA9IHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICB0Yy5kaXYgJy5tb2RhbC1kaWFsb2cnLCAtPlxuICAgIHRjLmRpdiAnLm1vZGFsLWNvbnRlbnQnLCAtPlxuICAgICAgdGMuaDMgXCJEbyB5b3UgcmVhbGx5IHdhbnQgdG8gZGVsZXRlICN7bW9kZWwubmFtZX0/XCJcbiAgICAgIHRjLmRpdiAnLm1vZGFsLWJvZHknLCAtPlxuICAgICAgICB0Yy5kaXYgJyNzZWxlY3RlZC1jaGlsZHJlbidcbiAgICAgIHRjLmRpdiAnLm1vZGFsLWZvb3RlcicsIC0+XG4gICAgICAgIHRjLnVsICcubGlzdC1pbmxpbmUnLCAtPlxuICAgICAgICAgIGJ0bmNsYXNzID0gJ2J0bi5idG4tc2Vjb25kYXJ5LmJ0bi1zbSdcbiAgICAgICAgICB0Yy5saSBcIiNjb25maXJtLWRlbGV0ZS1idXR0b25cIiwgLT5cbiAgICAgICAgICAgIG1vZGFsX2Nsb3NlX2J1dHRvbiAnT0snLCAnY2hlY2snXG4gICAgICAgICAgdGMubGkgXCIjY2FuY2VsLWRlbGV0ZS1idXR0b25cIiwgLT5cbiAgICAgICAgICAgIG1vZGFsX2Nsb3NlX2J1dHRvbiAnQ2FuY2VsJ1xuICAgIFxuXG5jbGFzcyBDb25maXJtRGVsZXRlTW9kYWwgZXh0ZW5kcyBNYXJpb25ldHRlLlZpZXdcbiAgdGVtcGxhdGU6IENvbmZpcm1EZWxldGVUZW1wbGF0ZVxuICB1aTpcbiAgICBjb25maXJtX2RlbGV0ZTogJyNjb25maXJtLWRlbGV0ZS1idXR0b24nXG4gICAgY2FuY2VsX2J1dHRvbjogJyNjYW5jZWwtZGVsZXRlLWJ1dHRvbidcbiAgICBcbiAgZXZlbnRzOiAtPlxuICAgICdjbGljayBAdWkuY29uZmlybV9kZWxldGUnOiAnY29uZmlybV9kZWxldGUnXG5cbiAgY29uZmlybV9kZWxldGU6IC0+XG4gICAgbmFtZSA9IEBtb2RlbC5nZXQgJ25hbWUnXG4gICAgcmVzcG9uc2UgPSBAbW9kZWwuZGVzdHJveSgpXG4gICAgcmVzcG9uc2UuZG9uZSAtPlxuICAgICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnc3VjY2VzcycsIFwiI3tuYW1lfSBkZWxldGVkLlwiLFxuICAgIHJlc3BvbnNlLmZhaWwgLT5cbiAgICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ2RhbmdlcicsIFwiI3tuYW1lfSBOT1QgZGVsZXRlZC5cIlxuICAgICAgXG5jbGFzcyBCYXNlSXRlbVZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLlZpZXdcbiAgdWk6XG4gICAgZWRpdF9pdGVtOiAnLmVkaXQtaXRlbSdcbiAgICBkZWxldGVfaXRlbTogJy5kZWxldGUtaXRlbSdcbiAgICBpdGVtOiAnLmxpc3QtaXRlbSdcbiAgICBcbiAgZXZlbnRzOiAtPlxuICAgICdjbGljayBAdWkuZWRpdF9pdGVtJzogJ2VkaXRfaXRlbSdcbiAgICAnY2xpY2sgQHVpLmRlbGV0ZV9pdGVtJzogJ2RlbGV0ZV9pdGVtJ1xuICAgIFxuICBlZGl0X2l0ZW06IC0+XG4gICAgbmF2aWdhdGVfdG9fdXJsIFwiIyN7QHJvdXRlX25hbWV9LyN7QGl0ZW1fdHlwZX1zL2VkaXQvI3tAbW9kZWwuaWR9XCJcbiAgICBcbiAgZGVsZXRlX2l0ZW06IC0+XG4gICAgaWYgX19ERVZfX1xuICAgICAgY29uc29sZS5sb2cgXCJkZWxldGVfI3tAaXRlbV90eXBlfVwiLCBAbW9kZWxcbiAgICB2aWV3ID0gbmV3IENvbmZpcm1EZWxldGVNb2RhbFxuICAgICAgbW9kZWw6IEBtb2RlbFxuICAgIGlmIF9fREVWX19cbiAgICAgIGNvbnNvbGUubG9nICdtb2RhbCB2aWV3Jywgdmlld1xuICAgIHNob3dfbW9kYWwgdmlldywgdHJ1ZVxuICAgIE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOnNob3ctbW9kYWwnLCB2aWV3LCB7YmFja2Ryb3A6dHJ1ZX1cbiAgICBcbmNsYXNzIEJhc2VMaXN0VmlldyBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICByZWdpb25zOiAtPlxuICAgIGl0ZW1saXN0OiBcIiMje0BpdGVtX3R5cGV9LWNvbnRhaW5lclwiXG4gIHVpOiAtPlxuICAgIG1ha2VfbmV3X2l0ZW06IFwiI25ldy0je0BpdGVtX3R5cGV9XCJcbiAgb25SZW5kZXI6IC0+XG4gICAgdmlldyA9IG5ldyBNYXJpb25ldHRlLkNvbGxlY3Rpb25WaWV3XG4gICAgICBjb2xsZWN0aW9uOiBAY29sbGVjdGlvblxuICAgICAgY2hpbGRWaWV3OiBAY2hpbGRWaWV3XG4gICAgQHNob3dDaGlsZFZpZXcgJ2l0ZW1saXN0Jywgdmlld1xuICBldmVudHM6IC0+XG4gICAgJ2NsaWNrIEB1aS5tYWtlX25ld19pdGVtJzogJ21ha2VfbmV3X2l0ZW0nXG5cbiAgX3Nob3dfbW9kYWw6ICh2aWV3LCBiYWNrZHJvcD1mYWxzZSkgLT5cbiAgICBtb2RhbF9yZWdpb24gPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpnZXQtcmVnaW9uJywgJ21vZGFsJ1xuICAgIG1vZGFsX3JlZ2lvbi5iYWNrZHJvcCA9IGJhY2tkcm9wXG4gICAgbW9kYWxfcmVnaW9uLnNob3cgdmlld1xuICBcbiAgbWFrZV9uZXdfaXRlbTogLT5cbiAgICAjIEZJWE1FIC0gZml4IHVybCBkb250J3QgYWRkICdzJ1xuICAgIG5hdmlnYXRlX3RvX3VybCBcIiMje0Byb3V0ZV9uYW1lfS8je0BpdGVtX3R5cGV9cy9uZXdcIlxuICAgIFxuZXhwb3J0IHtcbiAgQmFzZUl0ZW1WaWV3XG4gIEJhc2VMaXN0Vmlld1xuICB9XG5cbiJdfQ==
