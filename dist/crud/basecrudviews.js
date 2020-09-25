var BaseItemView, BaseListView, ConfirmDeleteModal, ConfirmDeleteTemplate, MainChannel, MessageChannel;

import {
  Radio
} from 'backbone';

import {
  View,
  CollectionView
} from 'backbone.marionette';

import tc from 'teacup';

import navigate_to_url from '../util/navigate-to-url';

import '../regions/bsmodal';

import {
  modal_close_button
} from '../templates/buttons';

MainChannel = Radio.channel('global');

MessageChannel = Radio.channel('messages');

ConfirmDeleteTemplate = tc.renderable(function(model) {
  return tc.div('.modal-dialog', function() {
    return tc.div('.modal-content', function() {
      tc.h3(`Do you really want to delete ${model.name}?`);
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
  class BaseItemView extends View {
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

BaseListView = class BaseListView extends View {
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
    view = new CollectionView({
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J1ZC9iYXNlY3J1ZHZpZXdzLmpzIiwic291cmNlcyI6WyJjcnVkL2Jhc2VjcnVkdmlld3MuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsWUFBQSxFQUFBLFlBQUEsRUFBQSxrQkFBQSxFQUFBLHFCQUFBLEVBQUEsV0FBQSxFQUFBOztBQUFBLE9BQUE7RUFBUyxLQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsSUFBVDtFQUFlLGNBQWY7Q0FBQSxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUVBLE9BQU8sZUFBUCxNQUFBOztBQUNBLE9BQUE7O0FBQ0EsT0FBQTtFQUFTLGtCQUFUO0NBQUEsTUFBQTs7QUFFQSxXQUFBLEdBQWMsS0FBSyxDQUFDLE9BQU4sQ0FBYyxRQUFkOztBQUNkLGNBQUEsR0FBaUIsS0FBSyxDQUFDLE9BQU4sQ0FBYyxVQUFkOztBQUlqQixxQkFBQSxHQUF3QixFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxLQUFELENBQUE7U0FDcEMsRUFBRSxDQUFDLEdBQUgsQ0FBTyxlQUFQLEVBQXdCLFFBQUEsQ0FBQSxDQUFBO1dBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sZ0JBQVAsRUFBeUIsUUFBQSxDQUFBLENBQUE7TUFDdkIsRUFBRSxDQUFDLEVBQUgsQ0FBTSxDQUFBLDZCQUFBLENBQUEsQ0FBZ0MsS0FBSyxDQUFDLElBQXRDLENBQTJDLENBQTNDLENBQU47TUFDQSxFQUFFLENBQUMsR0FBSCxDQUFPLGFBQVAsRUFBc0IsUUFBQSxDQUFBLENBQUE7ZUFDcEIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxvQkFBUDtNQURvQixDQUF0QjthQUVBLEVBQUUsQ0FBQyxHQUFILENBQU8sZUFBUCxFQUF3QixRQUFBLENBQUEsQ0FBQTtlQUN0QixFQUFFLENBQUMsRUFBSCxDQUFNLGNBQU4sRUFBc0IsUUFBQSxDQUFBLENBQUE7VUFDcEIsRUFBRSxDQUFDLEVBQUgsQ0FBTSx3QkFBTixFQUFnQyxRQUFBLENBQUEs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QSxVQUFiO01BQ0EsU0FBQSxFQUFXLElBQUMsQ0FBQTtJQURaLENBREs7V0FHUCxJQUFDLENBQUEsYUFBRCxDQUFlLFVBQWYsRUFBMkIsSUFBM0I7RUFKUTs7RUFLVixNQUFRLENBQUEsQ0FBQTtXQUNOO01BQUEseUJBQUEsRUFBMkI7SUFBM0I7RUFETTs7RUFHUixXQUFhLENBQUMsSUFBRCxFQUFPLFdBQVMsS0FBaEIsQ0FBQTtBQUNYLFFBQUE7SUFBQSxZQUFBLEdBQWUsV0FBVyxDQUFDLE9BQVosQ0FBb0IscUJBQXBCLEVBQTJDLE9BQTNDO0lBQ2YsWUFBWSxDQUFDLFFBQWIsR0FBd0I7V0FDeEIsWUFBWSxDQUFDLElBQWIsQ0FBa0IsSUFBbEI7RUFIVzs7RUFLYixhQUFlLENBQUEsQ0FBQSxFQUFBOztXQUViLGVBQUEsQ0FBZ0IsQ0FBQSxDQUFBLENBQUEsQ0FBSSxJQUFDLENBQUEsVUFBTCxDQUFnQixDQUFoQixDQUFBLENBQW1CLElBQUMsQ0FBQSxTQUFwQixDQUE4QixLQUE5QixDQUFoQjtFQUZhOztBQWxCakI7O0FBc0JBLE9BQUE7RUFDRSxZQURGO0VBRUUsWUFGRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJhZGlvIH0gZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgeyBWaWV3LCBDb2xsZWN0aW9uVmlldyB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuXG5pbXBvcnQgbmF2aWdhdGVfdG9fdXJsIGZyb20gJy4uL3V0aWwvbmF2aWdhdGUtdG8tdXJsJ1xuaW1wb3J0ICcuLi9yZWdpb25zL2JzbW9kYWwnXG5pbXBvcnQgeyBtb2RhbF9jbG9zZV9idXR0b24gfSBmcm9tICcuLi90ZW1wbGF0ZXMvYnV0dG9ucydcblxuTWFpbkNoYW5uZWwgPSBSYWRpby5jaGFubmVsICdnbG9iYWwnXG5NZXNzYWdlQ2hhbm5lbCA9IFJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG5cblxuQ29uZmlybURlbGV0ZVRlbXBsYXRlID0gdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gIHRjLmRpdiAnLm1vZGFsLWRpYWxvZycsIC0+XG4gICAgdGMuZGl2ICcubW9kYWwtY29udGVudCcsIC0+XG4gICAgICB0Yy5oMyBcIkRvIHlvdSByZWFsbHkgd2FudCB0byBkZWxldGUgI3ttb2RlbC5uYW1lfT9cIlxuICAgICAgdGMuZGl2ICcubW9kYWwtYm9keScsIC0+XG4gICAgICAgIHRjLmRpdiAnI3NlbGVjdGVkLWNoaWxkcmVuJ1xuICAgICAgdGMuZGl2ICcubW9kYWwtZm9vdGVyJywgLT5cbiAgICAgICAgdGMudWwgJy5saXN0LWlubGluZScsIC0+XG4gICAgICAgICAgdGMubGkgXCIjY29uZmlybS1kZWxldGUtYnV0dG9uXCIsIC0+XG4gICAgICAgICAgICBtb2RhbF9jbG9zZV9idXR0b24gJ09LJywgJ2NoZWNrJ1xuICAgICAgICAgIHRjLmxpIFwiI2NhbmNlbC1kZWxldGUtYnV0dG9uXCIsIC0+XG4gICAgICAgICAgICBtb2RhbF9jbG9zZV9idXR0b24gJ0NhbmNlbCdcbiAgICBcblxuY2xhc3MgQ29uZmlybURlbGV0ZU1vZGFsIGV4dGVuZHMgVmlld1xuICB0ZW1wbGF0ZTogQ29uZmlybURlbGV0ZVRlbXBsYXRlXG4gIHVpOlxuICAgIGNvbmZpcm1fZGVsZXRlOiAnI2NvbmZpcm0tZGVsZXRlLWJ1dHRvbidcbiAgICBjYW5jZWxfYnV0dG9uOiAnI2NhbmNlbC1kZWxldGUtYnV0dG9uJ1xuICAgIFxuICBldmVudHM6IC0+XG4gICAgJ2NsaWNrIEB1aS5jb25maXJtX2RlbGV0ZSc6ICdjb25maXJtX2RlbGV0ZSdcblxuICBjb25maXJtX2RlbGV0ZTogLT5cbiAgICBuYW1lID0gQG1vZGVsLmdldCAnbmFtZSdcbiAgICByZXNwb25zZSA9IEBtb2RlbC5kZXN0cm95KClcbiAgICByZXNwb25zZS5kb25lIC0+XG4gICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICdzdWNjZXNzJywgXCIje25hbWV9IGRlbGV0ZWQuXCIsXG4gICAgcmVzcG9uc2UuZmFpbCAtPlxuICAgICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnZGFuZ2VyJywgXCIje25hbWV9IE5PVCBkZWxldGVkLlwiXG4gICAgICBcbmNsYXNzIEJhc2VJdGVtVmlldyBleHRlbmRzIFZpZXdcbiAgdWk6XG4gICAgZWRpdF9pdGVtOiAnLmVkaXQtaXRlbSdcbiAgICBkZWxldGVfaXRlbTogJy5kZWxldGUtaXRlbSdcbiAgICBpdGVtOiAnLmxpc3QtaXRlbSdcbiAgICBcbiAgZXZlbnRzOiAtPlxuICAgICdjbGljayBAdWkuZWRpdF9pdGVtJzogJ2VkaXRfaXRlbSdcbiAgICAnY2xpY2sgQHVpLmRlbGV0ZV9pdGVtJzogJ2RlbGV0ZV9pdGVtJ1xuICAgIFxuICBlZGl0X2l0ZW06IC0+XG4gICAgbmF2aWdhdGVfdG9fdXJsIFwiIyN7QHJvdXRlX25hbWV9LyN7QGl0ZW1fdHlwZX1zL2VkaXQvI3tAbW9kZWwuaWR9XCJcbiAgICBcbiAgZGVsZXRlX2l0ZW06IC0+XG4gICAgaWYgX19ERVZfX1xuICAgICAgY29uc29sZS5sb2cgXCJkZWxldGVfI3tAaXRlbV90eXBlfVwiLCBAbW9kZWxcbiAgICB2aWV3ID0gbmV3IENvbmZpcm1EZWxldGVNb2RhbFxuICAgICAgbW9kZWw6IEBtb2RlbFxuICAgIGlmIF9fREVWX19cbiAgICAgIGNvbnNvbGUubG9nICdtb2RhbCB2aWV3Jywgdmlld1xuICAgIE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOnNob3ctbW9kYWwnLCB2aWV3LCB7YmFja2Ryb3A6dHJ1ZX1cbiAgICBcbmNsYXNzIEJhc2VMaXN0VmlldyBleHRlbmRzIFZpZXdcbiAgcmVnaW9uczogLT5cbiAgICBpdGVtbGlzdDogXCIjI3tAaXRlbV90eXBlfS1jb250YWluZXJcIlxuICB1aTogLT5cbiAgICBtYWtlX25ld19pdGVtOiBcIiNuZXctI3tAaXRlbV90eXBlfVwiXG4gIG9uUmVuZGVyOiAtPlxuICAgIHZpZXcgPSBuZXcgQ29sbGVjdGlvblZpZXdcbiAgICAgIGNvbGxlY3Rpb246IEBjb2xsZWN0aW9uXG4gICAgICBjaGlsZFZpZXc6IEBjaGlsZFZpZXdcbiAgICBAc2hvd0NoaWxkVmlldyAnaXRlbWxpc3QnLCB2aWV3XG4gIGV2ZW50czogLT5cbiAgICAnY2xpY2sgQHVpLm1ha2VfbmV3X2l0ZW0nOiAnbWFrZV9uZXdfaXRlbSdcblxuICBfc2hvd19tb2RhbDogKHZpZXcsIGJhY2tkcm9wPWZhbHNlKSAtPlxuICAgIG1vZGFsX3JlZ2lvbiA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmdldC1yZWdpb24nLCAnbW9kYWwnXG4gICAgbW9kYWxfcmVnaW9uLmJhY2tkcm9wID0gYmFja2Ryb3BcbiAgICBtb2RhbF9yZWdpb24uc2hvdyB2aWV3XG4gIFxuICBtYWtlX25ld19pdGVtOiAtPlxuICAgICMgRklYTUUgLSBmaXggdXJsIGRvbnQndCBhZGQgJ3MnXG4gICAgbmF2aWdhdGVfdG9fdXJsIFwiIyN7QHJvdXRlX25hbWV9LyN7QGl0ZW1fdHlwZX1zL25ld1wiXG4gICAgXG5leHBvcnQge1xuICBCYXNlSXRlbVZpZXdcbiAgQmFzZUxpc3RWaWV3XG4gIH1cblxuIl19
