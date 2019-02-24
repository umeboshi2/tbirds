var BaseItemView, BaseListView, ConfirmDeleteModal, ConfirmDeleteTemplate, MainChannel, MessageChannel;

import Backbone from 'backbone';

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J1ZC9iYXNlY3J1ZHZpZXdzLmpzIiwic291cmNlcyI6WyJjcnVkL2Jhc2VjcnVkdmlld3MuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsWUFBQSxFQUFBLFlBQUEsRUFBQSxrQkFBQSxFQUFBLHFCQUFBLEVBQUEsV0FBQSxFQUFBOztBQUFBLE9BQU8sUUFBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxJQUFUO0VBQWUsY0FBZjtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxFQUFQLE1BQUE7O0FBRUEsT0FBTyxlQUFQLE1BQUE7O0FBQ0EsT0FBQTs7QUFDQSxPQUFBO0VBQVMsa0JBQVQ7Q0FBQSxNQUFBOztBQUVBLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsY0FBQSxHQUFpQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsVUFBdkI7O0FBSWpCLHFCQUFBLEdBQXdCLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLEtBQUQsQ0FBQTtTQUNwQyxFQUFFLENBQUMsR0FBSCxDQUFPLGVBQVAsRUFBd0IsUUFBQSxDQUFBLENBQUE7V0FDdEIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxnQkFBUCxFQUF5QixRQUFBLENBQUEsQ0FBQTtNQUN2QixFQUFFLENBQUMsRUFBSCxDQUFNLENBQUEsNkJBQUEsQ0FBQSxDQUFnQyxLQUFLLENBQUMsSUFBdEMsQ0FBMkMsQ0FBM0MsQ0FBTjtNQUNBLEVBQUUsQ0FBQyxHQUFILENBQU8sYUFBUCxFQUFzQixRQUFBLENBQUEsQ0FBQTtlQUNwQixFQUFFLENBQUMsR0FBSCxDQUFPLG9CQUFQO01BRG9CLENBQXRCO2FBRUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyxlQUFQLEVBQXdCLFFBQUEsQ0FBQSxDQUFBO2VBQ3RCLEVBQUUsQ0FBQyxFQUFILENBQU0sY0FBTixFQUFzQixRQUFBLENBQUEsQ0FBQTtBQUNwQixjQUFBO1VBQUEsUUFBQSxHQUFXO1VBQ1gsRUFB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QUEsQ0FBQTtBQUNSLFFBQUE7SUFBQSxJQUFBLEdBQU8sSUFBSSxjQUFKLENBQ0w7TUFBQSxVQUFBLEVBQVksSUFBQyxDQUFBLFVBQWI7TUFDQSxTQUFBLEVBQVcsSUFBQyxDQUFBO0lBRFosQ0FESztXQUdQLElBQUMsQ0FBQSxhQUFELENBQWUsVUFBZixFQUEyQixJQUEzQjtFQUpROztFQUtWLE1BQVEsQ0FBQSxDQUFBO1dBQ047TUFBQSx5QkFBQSxFQUEyQjtJQUEzQjtFQURNOztFQUdSLFdBQWEsQ0FBQyxJQUFELEVBQU8sV0FBUyxLQUFoQixDQUFBO0FBQ1gsUUFBQTtJQUFBLFlBQUEsR0FBZSxXQUFXLENBQUMsT0FBWixDQUFvQixxQkFBcEIsRUFBMkMsT0FBM0M7SUFDZixZQUFZLENBQUMsUUFBYixHQUF3QjtXQUN4QixZQUFZLENBQUMsSUFBYixDQUFrQixJQUFsQjtFQUhXOztFQUtiLGFBQWUsQ0FBQSxDQUFBLEVBQUE7O1dBRWIsZUFBQSxDQUFnQixDQUFBLENBQUEsQ0FBQSxDQUFJLElBQUMsQ0FBQSxVQUFMLENBQWdCLENBQWhCLENBQUEsQ0FBbUIsSUFBQyxDQUFBLFNBQXBCLENBQThCLEtBQTlCLENBQWhCO0VBRmE7O0FBbEJqQjs7QUFzQkEsT0FBQTtFQUNFLFlBREY7RUFFRSxZQUZGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IHsgVmlldywgQ29sbGVjdGlvblZpZXcgfSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuaW1wb3J0IG5hdmlnYXRlX3RvX3VybCBmcm9tICcuLi91dGlsL25hdmlnYXRlLXRvLXVybCdcbmltcG9ydCAnLi4vcmVnaW9ucy9ic21vZGFsJ1xuaW1wb3J0IHsgbW9kYWxfY2xvc2VfYnV0dG9uIH0gZnJvbSAnLi4vdGVtcGxhdGVzL2J1dHRvbnMnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdtZXNzYWdlcydcblxuXG5cbkNvbmZpcm1EZWxldGVUZW1wbGF0ZSA9IHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICB0Yy5kaXYgJy5tb2RhbC1kaWFsb2cnLCAtPlxuICAgIHRjLmRpdiAnLm1vZGFsLWNvbnRlbnQnLCAtPlxuICAgICAgdGMuaDMgXCJEbyB5b3UgcmVhbGx5IHdhbnQgdG8gZGVsZXRlICN7bW9kZWwubmFtZX0/XCJcbiAgICAgIHRjLmRpdiAnLm1vZGFsLWJvZHknLCAtPlxuICAgICAgICB0Yy5kaXYgJyNzZWxlY3RlZC1jaGlsZHJlbidcbiAgICAgIHRjLmRpdiAnLm1vZGFsLWZvb3RlcicsIC0+XG4gICAgICAgIHRjLnVsICcubGlzdC1pbmxpbmUnLCAtPlxuICAgICAgICAgIGJ0bmNsYXNzID0gJ2J0bi5idG4tc2Vjb25kYXJ5LmJ0bi1zbSdcbiAgICAgICAgICB0Yy5saSBcIiNjb25maXJtLWRlbGV0ZS1idXR0b25cIiwgLT5cbiAgICAgICAgICAgIG1vZGFsX2Nsb3NlX2J1dHRvbiAnT0snLCAnY2hlY2snXG4gICAgICAgICAgdGMubGkgXCIjY2FuY2VsLWRlbGV0ZS1idXR0b25cIiwgLT5cbiAgICAgICAgICAgIG1vZGFsX2Nsb3NlX2J1dHRvbiAnQ2FuY2VsJ1xuICAgIFxuXG5jbGFzcyBDb25maXJtRGVsZXRlTW9kYWwgZXh0ZW5kcyBWaWV3XG4gIHRlbXBsYXRlOiBDb25maXJtRGVsZXRlVGVtcGxhdGVcbiAgdWk6XG4gICAgY29uZmlybV9kZWxldGU6ICcjY29uZmlybS1kZWxldGUtYnV0dG9uJ1xuICAgIGNhbmNlbF9idXR0b246ICcjY2FuY2VsLWRlbGV0ZS1idXR0b24nXG4gICAgXG4gIGV2ZW50czogLT5cbiAgICAnY2xpY2sgQHVpLmNvbmZpcm1fZGVsZXRlJzogJ2NvbmZpcm1fZGVsZXRlJ1xuXG4gIGNvbmZpcm1fZGVsZXRlOiAtPlxuICAgIG5hbWUgPSBAbW9kZWwuZ2V0ICduYW1lJ1xuICAgIHJlc3BvbnNlID0gQG1vZGVsLmRlc3Ryb3koKVxuICAgIHJlc3BvbnNlLmRvbmUgLT5cbiAgICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ3N1Y2Nlc3MnLCBcIiN7bmFtZX0gZGVsZXRlZC5cIixcbiAgICByZXNwb25zZS5mYWlsIC0+XG4gICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICdkYW5nZXInLCBcIiN7bmFtZX0gTk9UIGRlbGV0ZWQuXCJcbiAgICAgIFxuY2xhc3MgQmFzZUl0ZW1WaWV3IGV4dGVuZHMgVmlld1xuICB1aTpcbiAgICBlZGl0X2l0ZW06ICcuZWRpdC1pdGVtJ1xuICAgIGRlbGV0ZV9pdGVtOiAnLmRlbGV0ZS1pdGVtJ1xuICAgIGl0ZW06ICcubGlzdC1pdGVtJ1xuICAgIFxuICBldmVudHM6IC0+XG4gICAgJ2NsaWNrIEB1aS5lZGl0X2l0ZW0nOiAnZWRpdF9pdGVtJ1xuICAgICdjbGljayBAdWkuZGVsZXRlX2l0ZW0nOiAnZGVsZXRlX2l0ZW0nXG4gICAgXG4gIGVkaXRfaXRlbTogLT5cbiAgICBuYXZpZ2F0ZV90b191cmwgXCIjI3tAcm91dGVfbmFtZX0vI3tAaXRlbV90eXBlfXMvZWRpdC8je0Btb2RlbC5pZH1cIlxuICAgIFxuICBkZWxldGVfaXRlbTogLT5cbiAgICBpZiBfX0RFVl9fXG4gICAgICBjb25zb2xlLmxvZyBcImRlbGV0ZV8je0BpdGVtX3R5cGV9XCIsIEBtb2RlbFxuICAgIHZpZXcgPSBuZXcgQ29uZmlybURlbGV0ZU1vZGFsXG4gICAgICBtb2RlbDogQG1vZGVsXG4gICAgaWYgX19ERVZfX1xuICAgICAgY29uc29sZS5sb2cgJ21vZGFsIHZpZXcnLCB2aWV3XG4gICAgc2hvd19tb2RhbCB2aWV3LCB0cnVlXG4gICAgTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6c2hvdy1tb2RhbCcsIHZpZXcsIHtiYWNrZHJvcDp0cnVlfVxuICAgIFxuY2xhc3MgQmFzZUxpc3RWaWV3IGV4dGVuZHMgVmlld1xuICByZWdpb25zOiAtPlxuICAgIGl0ZW1saXN0OiBcIiMje0BpdGVtX3R5cGV9LWNvbnRhaW5lclwiXG4gIHVpOiAtPlxuICAgIG1ha2VfbmV3X2l0ZW06IFwiI25ldy0je0BpdGVtX3R5cGV9XCJcbiAgb25SZW5kZXI6IC0+XG4gICAgdmlldyA9IG5ldyBDb2xsZWN0aW9uVmlld1xuICAgICAgY29sbGVjdGlvbjogQGNvbGxlY3Rpb25cbiAgICAgIGNoaWxkVmlldzogQGNoaWxkVmlld1xuICAgIEBzaG93Q2hpbGRWaWV3ICdpdGVtbGlzdCcsIHZpZXdcbiAgZXZlbnRzOiAtPlxuICAgICdjbGljayBAdWkubWFrZV9uZXdfaXRlbSc6ICdtYWtlX25ld19pdGVtJ1xuXG4gIF9zaG93X21vZGFsOiAodmlldywgYmFja2Ryb3A9ZmFsc2UpIC0+XG4gICAgbW9kYWxfcmVnaW9uID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6Z2V0LXJlZ2lvbicsICdtb2RhbCdcbiAgICBtb2RhbF9yZWdpb24uYmFja2Ryb3AgPSBiYWNrZHJvcFxuICAgIG1vZGFsX3JlZ2lvbi5zaG93IHZpZXdcbiAgXG4gIG1ha2VfbmV3X2l0ZW06IC0+XG4gICAgIyBGSVhNRSAtIGZpeCB1cmwgZG9udCd0IGFkZCAncydcbiAgICBuYXZpZ2F0ZV90b191cmwgXCIjI3tAcm91dGVfbmFtZX0vI3tAaXRlbV90eXBlfXMvbmV3XCJcbiAgICBcbmV4cG9ydCB7XG4gIEJhc2VJdGVtVmlld1xuICBCYXNlTGlzdFZpZXdcbiAgfVxuXG4iXX0=
