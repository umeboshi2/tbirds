var ConfirmDeleteModal, ConfirmDeleteTemplate, MainChannel, MessageChannel;

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

export var BaseItemView = (function() {
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

export var BaseListView = class BaseListView extends View {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J1ZC9iYXNlY3J1ZHZpZXdzLmpzIiwic291cmNlcyI6WyJjcnVkL2Jhc2VjcnVkdmlld3MuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsa0JBQUEsRUFBQSxxQkFBQSxFQUFBLFdBQUEsRUFBQTs7QUFBQSxPQUFBO0VBQVMsS0FBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFTLElBQVQ7RUFBZSxjQUFmO0NBQUEsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQTs7QUFFQSxPQUFPLGVBQVAsTUFBQTs7QUFDQSxPQUFBOztBQUNBLE9BQUE7RUFBUyxrQkFBVDtDQUFBLE1BQUE7O0FBRUEsV0FBQSxHQUFjLEtBQUssQ0FBQyxPQUFOLENBQWMsUUFBZDs7QUFDZCxjQUFBLEdBQWlCLEtBQUssQ0FBQyxPQUFOLENBQWMsVUFBZDs7QUFJakIscUJBQUEsR0FBd0IsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO1NBQ3BDLEVBQUUsQ0FBQyxHQUFILENBQU8sZUFBUCxFQUF3QixRQUFBLENBQUEsQ0FBQTtXQUN0QixFQUFFLENBQUMsR0FBSCxDQUFPLGdCQUFQLEVBQXlCLFFBQUEsQ0FBQSxDQUFBO01BQ3ZCLEVBQUUsQ0FBQyxFQUFILENBQU0sQ0FBQSw2QkFBQSxDQUFBLENBQWdDLEtBQUssQ0FBQyxJQUF0QyxDQUFBLENBQUEsQ0FBTjtNQUNBLEVBQUUsQ0FBQyxHQUFILENBQU8sYUFBUCxFQUFzQixRQUFBLENBQUEsQ0FBQTtlQUNwQixFQUFFLENBQUMsR0FBSCxDQUFPLG9CQUFQO01BRG9CLENBQXRCO2FBRUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyxlQUFQLEVBQXdCLFFBQUEsQ0FBQSxDQUFBO2VBQ3RCLEVBQUUsQ0FBQyxFQUFILENBQU0sY0FBTixFQUFzQixRQUFBLENBQUEsQ0FBQTtVQUNwQixFQUFFLENBQUMsRUFBSCxDQUFNLHdCQUFOLEVBQWdDLFFBQUEsQ0FBQSxDQUFBO21CQUM5QixrQkFBQSxDQUFt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YjtNQUNBLFNBQUEsRUFBVyxJQUFDLENBQUE7SUFEWixDQURLO1dBR1AsSUFBQyxDQUFBLGFBQUQsQ0FBZSxVQUFmLEVBQTJCLElBQTNCO0VBSlE7O0VBS1YsTUFBUSxDQUFBLENBQUE7V0FDTjtNQUFBLHlCQUFBLEVBQTJCO0lBQTNCO0VBRE07O0VBR1IsV0FBYSxDQUFDLElBQUQsRUFBTyxXQUFTLEtBQWhCLENBQUE7QUFDZixRQUFBO0lBQUksWUFBQSxHQUFlLFdBQVcsQ0FBQyxPQUFaLENBQW9CLHFCQUFwQixFQUEyQyxPQUEzQztJQUNmLFlBQVksQ0FBQyxRQUFiLEdBQXdCO1dBQ3hCLFlBQVksQ0FBQyxJQUFiLENBQWtCLElBQWxCO0VBSFc7O0VBS2IsYUFBZSxDQUFBLENBQUEsRUFBQTs7V0FFYixlQUFBLENBQWdCLENBQUEsQ0FBQSxDQUFBLENBQUksSUFBQyxDQUFBLFVBQUwsQ0FBQSxDQUFBLENBQUEsQ0FBbUIsSUFBQyxDQUFBLFNBQXBCLENBQUEsS0FBQSxDQUFoQjtFQUZhOztBQWxCViIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJhZGlvIH0gZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgeyBWaWV3LCBDb2xsZWN0aW9uVmlldyB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuXG5pbXBvcnQgbmF2aWdhdGVfdG9fdXJsIGZyb20gJy4uL3V0aWwvbmF2aWdhdGUtdG8tdXJsJ1xuaW1wb3J0ICcuLi9yZWdpb25zL2JzbW9kYWwnXG5pbXBvcnQgeyBtb2RhbF9jbG9zZV9idXR0b24gfSBmcm9tICcuLi90ZW1wbGF0ZXMvYnV0dG9ucydcblxuTWFpbkNoYW5uZWwgPSBSYWRpby5jaGFubmVsICdnbG9iYWwnXG5NZXNzYWdlQ2hhbm5lbCA9IFJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG5cblxuQ29uZmlybURlbGV0ZVRlbXBsYXRlID0gdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gIHRjLmRpdiAnLm1vZGFsLWRpYWxvZycsIC0+XG4gICAgdGMuZGl2ICcubW9kYWwtY29udGVudCcsIC0+XG4gICAgICB0Yy5oMyBcIkRvIHlvdSByZWFsbHkgd2FudCB0byBkZWxldGUgI3ttb2RlbC5uYW1lfT9cIlxuICAgICAgdGMuZGl2ICcubW9kYWwtYm9keScsIC0+XG4gICAgICAgIHRjLmRpdiAnI3NlbGVjdGVkLWNoaWxkcmVuJ1xuICAgICAgdGMuZGl2ICcubW9kYWwtZm9vdGVyJywgLT5cbiAgICAgICAgdGMudWwgJy5saXN0LWlubGluZScsIC0+XG4gICAgICAgICAgdGMubGkgXCIjY29uZmlybS1kZWxldGUtYnV0dG9uXCIsIC0+XG4gICAgICAgICAgICBtb2RhbF9jbG9zZV9idXR0b24gJ09LJywgJ2NoZWNrJ1xuICAgICAgICAgIHRjLmxpIFwiI2NhbmNlbC1kZWxldGUtYnV0dG9uXCIsIC0+XG4gICAgICAgICAgICBtb2RhbF9jbG9zZV9idXR0b24gJ0NhbmNlbCdcbiAgICBcblxuY2xhc3MgQ29uZmlybURlbGV0ZU1vZGFsIGV4dGVuZHMgVmlld1xuICB0ZW1wbGF0ZTogQ29uZmlybURlbGV0ZVRlbXBsYXRlXG4gIHVpOlxuICAgIGNvbmZpcm1fZGVsZXRlOiAnI2NvbmZpcm0tZGVsZXRlLWJ1dHRvbidcbiAgICBjYW5jZWxfYnV0dG9uOiAnI2NhbmNlbC1kZWxldGUtYnV0dG9uJ1xuICAgIFxuICBldmVudHM6IC0+XG4gICAgJ2NsaWNrIEB1aS5jb25maXJtX2RlbGV0ZSc6ICdjb25maXJtX2RlbGV0ZSdcblxuICBjb25maXJtX2RlbGV0ZTogLT5cbiAgICBuYW1lID0gQG1vZGVsLmdldCAnbmFtZSdcbiAgICByZXNwb25zZSA9IEBtb2RlbC5kZXN0cm95KClcbiAgICByZXNwb25zZS5kb25lIC0+XG4gICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICdzdWNjZXNzJywgXCIje25hbWV9IGRlbGV0ZWQuXCIsXG4gICAgcmVzcG9uc2UuZmFpbCAtPlxuICAgICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnZGFuZ2VyJywgXCIje25hbWV9IE5PVCBkZWxldGVkLlwiXG4gICAgICBcbmV4cG9ydCBjbGFzcyBCYXNlSXRlbVZpZXcgZXh0ZW5kcyBWaWV3XG4gIHVpOlxuICAgIGVkaXRfaXRlbTogJy5lZGl0LWl0ZW0nXG4gICAgZGVsZXRlX2l0ZW06ICcuZGVsZXRlLWl0ZW0nXG4gICAgaXRlbTogJy5saXN0LWl0ZW0nXG4gICAgXG4gIGV2ZW50czogLT5cbiAgICAnY2xpY2sgQHVpLmVkaXRfaXRlbSc6ICdlZGl0X2l0ZW0nXG4gICAgJ2NsaWNrIEB1aS5kZWxldGVfaXRlbSc6ICdkZWxldGVfaXRlbSdcbiAgICBcbiAgZWRpdF9pdGVtOiAtPlxuICAgIG5hdmlnYXRlX3RvX3VybCBcIiMje0Byb3V0ZV9uYW1lfS8je0BpdGVtX3R5cGV9cy9lZGl0LyN7QG1vZGVsLmlkfVwiXG4gICAgXG4gIGRlbGV0ZV9pdGVtOiAtPlxuICAgIGlmIF9fREVWX19cbiAgICAgIGNvbnNvbGUubG9nIFwiZGVsZXRlXyN7QGl0ZW1fdHlwZX1cIiwgQG1vZGVsXG4gICAgdmlldyA9IG5ldyBDb25maXJtRGVsZXRlTW9kYWxcbiAgICAgIG1vZGVsOiBAbW9kZWxcbiAgICBpZiBfX0RFVl9fXG4gICAgICBjb25zb2xlLmxvZyAnbW9kYWwgdmlldycsIHZpZXdcbiAgICBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpzaG93LW1vZGFsJywgdmlldywge2JhY2tkcm9wOnRydWV9XG4gICAgXG5leHBvcnQgY2xhc3MgQmFzZUxpc3RWaWV3IGV4dGVuZHMgVmlld1xuICByZWdpb25zOiAtPlxuICAgIGl0ZW1saXN0OiBcIiMje0BpdGVtX3R5cGV9LWNvbnRhaW5lclwiXG4gIHVpOiAtPlxuICAgIG1ha2VfbmV3X2l0ZW06IFwiI25ldy0je0BpdGVtX3R5cGV9XCJcbiAgb25SZW5kZXI6IC0+XG4gICAgdmlldyA9IG5ldyBDb2xsZWN0aW9uVmlld1xuICAgICAgY29sbGVjdGlvbjogQGNvbGxlY3Rpb25cbiAgICAgIGNoaWxkVmlldzogQGNoaWxkVmlld1xuICAgIEBzaG93Q2hpbGRWaWV3ICdpdGVtbGlzdCcsIHZpZXdcbiAgZXZlbnRzOiAtPlxuICAgICdjbGljayBAdWkubWFrZV9uZXdfaXRlbSc6ICdtYWtlX25ld19pdGVtJ1xuXG4gIF9zaG93X21vZGFsOiAodmlldywgYmFja2Ryb3A9ZmFsc2UpIC0+XG4gICAgbW9kYWxfcmVnaW9uID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6Z2V0LXJlZ2lvbicsICdtb2RhbCdcbiAgICBtb2RhbF9yZWdpb24uYmFja2Ryb3AgPSBiYWNrZHJvcFxuICAgIG1vZGFsX3JlZ2lvbi5zaG93IHZpZXdcbiAgXG4gIG1ha2VfbmV3X2l0ZW06IC0+XG4gICAgIyBGSVhNRSAtIGZpeCB1cmwgZG9udCd0IGFkZCAncydcbiAgICBuYXZpZ2F0ZV90b191cmwgXCIjI3tAcm91dGVfbmFtZX0vI3tAaXRlbV90eXBlfXMvbmV3XCJcbiJdfQ==
