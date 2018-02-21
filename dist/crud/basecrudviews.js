var Backbone, BaseItemView, BaseListView, ConfirmDeleteModal, ConfirmDeleteTemplate, MainChannel, Marionette, MessageChannel, modal_close_button, navigate_to_url, tc;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

tc = require('teacup');

navigate_to_url = require('../util/navigate-to-url');

require('../regions/bsmodal');

({modal_close_button} = require('../templates/buttons'));

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
          btnclass = 'btn.btn-default.btn-sm';
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

module.exports = {
  BaseItemView: BaseItemView,
  BaseListView: BaseListView
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J1ZC9iYXNlY3J1ZHZpZXdzLmpzIiwic291cmNlcyI6WyJjcnVkL2Jhc2VjcnVkdmlld3MuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsUUFBQSxFQUFBLFlBQUEsRUFBQSxZQUFBLEVBQUEsa0JBQUEsRUFBQSxxQkFBQSxFQUFBLFdBQUEsRUFBQSxVQUFBLEVBQUEsY0FBQSxFQUFBLGtCQUFBLEVBQUEsZUFBQSxFQUFBOztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFDWCxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUNiLEVBQUEsR0FBSyxPQUFBLENBQVEsUUFBUjs7QUFFTCxlQUFBLEdBQWtCLE9BQUEsQ0FBUSx5QkFBUjs7QUFDbEIsT0FBQSxDQUFRLG9CQUFSOztBQUNBLENBQUEsQ0FBRSxrQkFBRixDQUFBLEdBQXlCLE9BQUEsQ0FBUSxzQkFBUixDQUF6Qjs7QUFFQSxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCOztBQUlqQixxQkFBQSxHQUF3QixFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxLQUFELENBQUE7U0FDcEMsRUFBRSxDQUFDLEdBQUgsQ0FBTyxlQUFQLEVBQXdCLFFBQUEsQ0FBQSxDQUFBO1dBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sZ0JBQVAsRUFBeUIsUUFBQSxDQUFBLENBQUE7TUFDdkIsRUFBRSxDQUFDLEVBQUgsQ0FBTSxDQUFBLDZCQUFBLENBQUEsQ0FBZ0MsS0FBSyxDQUFDLElBQXRDLENBQTJDLENBQTNDLENBQU47TUFDQSxFQUFFLENBQUMsR0FBSCxDQUFPLGFBQVAsRUFBc0IsUUFBQSxDQUFBLENBQUE7ZUFDcEIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxvQkFBUDtNQURvQixDQUF0QjthQUVBLEVBQUUsQ0FBQyxHQUFILENBQU8sZUFB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SUFBQyxDQUFBLFNBQUwsQ0FBZSxVQUFmO0lBQVY7RUFETzs7RUFFVCxFQUFJLENBQUEsQ0FBQTtXQUNGO01BQUEsYUFBQSxFQUFlLENBQUEsS0FBQSxDQUFBLENBQVEsSUFBQyxDQUFBLFNBQVQsQ0FBQTtJQUFmO0VBREU7O0VBRUosUUFBVSxDQUFBLENBQUE7QUFDUixRQUFBO0lBQUEsSUFBQSxHQUFPLElBQUksVUFBVSxDQUFDLGNBQWYsQ0FDTDtNQUFBLFVBQUEsRUFBWSxJQUFDLENBQUEsVUFBYjtNQUNBLFNBQUEsRUFBVyxJQUFDLENBQUE7SUFEWixDQURLO1dBR1AsSUFBQyxDQUFBLGFBQUQsQ0FBZSxVQUFmLEVBQTJCLElBQTNCO0VBSlE7O0VBS1YsTUFBUSxDQUFBLENBQUE7V0FDTjtNQUFBLHlCQUFBLEVBQTJCO0lBQTNCO0VBRE07O0VBR1IsV0FBYSxDQUFDLElBQUQsRUFBTyxXQUFTLEtBQWhCLENBQUE7QUFDWCxRQUFBO0lBQUEsWUFBQSxHQUFlLFdBQVcsQ0FBQyxPQUFaLENBQW9CLHFCQUFwQixFQUEyQyxPQUEzQztJQUNmLFlBQVksQ0FBQyxRQUFiLEdBQXdCO1dBQ3hCLFlBQVksQ0FBQyxJQUFiLENBQWtCLElBQWxCO0VBSFc7O0VBS2IsYUFBZSxDQUFBLENBQUEsRUFBQTs7V0FFYixlQUFBLENBQWdCLENBQUEsQ0FBQSxDQUFBLENBQUksSUFBQyxDQUFBLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBQSxDQUFtQixJQUFDLENBQUEsU0FBcEIsQ0FBOEIsS0FBOUIsQ0FBaEI7RUFGYTs7QUFsQmpCOztBQXNCQSxNQUFNLENBQUMsT0FBUCxHQUNFO0VBQUEsWUFBQSxFQUFjLFlBQWQ7RUFDQSxZQUFBLEVBQWM7QUFEZCIsInNvdXJjZXNDb250ZW50IjpbIkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5NYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbnRjID0gcmVxdWlyZSAndGVhY3VwJ1xuXG5uYXZpZ2F0ZV90b191cmwgPSByZXF1aXJlICcuLi91dGlsL25hdmlnYXRlLXRvLXVybCdcbnJlcXVpcmUgJy4uL3JlZ2lvbnMvYnNtb2RhbCdcbnsgbW9kYWxfY2xvc2VfYnV0dG9uIH0gPSByZXF1aXJlICcuLi90ZW1wbGF0ZXMvYnV0dG9ucydcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5NZXNzYWdlQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG5cblxuQ29uZmlybURlbGV0ZVRlbXBsYXRlID0gdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gIHRjLmRpdiAnLm1vZGFsLWRpYWxvZycsIC0+XG4gICAgdGMuZGl2ICcubW9kYWwtY29udGVudCcsIC0+XG4gICAgICB0Yy5oMyBcIkRvIHlvdSByZWFsbHkgd2FudCB0byBkZWxldGUgI3ttb2RlbC5uYW1lfT9cIlxuICAgICAgdGMuZGl2ICcubW9kYWwtYm9keScsIC0+XG4gICAgICAgIHRjLmRpdiAnI3NlbGVjdGVkLWNoaWxkcmVuJ1xuICAgICAgdGMuZGl2ICcubW9kYWwtZm9vdGVyJywgLT5cbiAgICAgICAgdGMudWwgJy5saXN0LWlubGluZScsIC0+XG4gICAgICAgICAgYnRuY2xhc3MgPSAnYnRuLmJ0bi1kZWZhdWx0LmJ0bi1zbSdcbiAgICAgICAgICB0Yy5saSBcIiNjb25maXJtLWRlbGV0ZS1idXR0b25cIiwgLT5cbiAgICAgICAgICAgIG1vZGFsX2Nsb3NlX2J1dHRvbiAnT0snLCAnY2hlY2snXG4gICAgICAgICAgdGMubGkgXCIjY2FuY2VsLWRlbGV0ZS1idXR0b25cIiwgLT5cbiAgICAgICAgICAgIG1vZGFsX2Nsb3NlX2J1dHRvbiAnQ2FuY2VsJ1xuICAgIFxuXG5jbGFzcyBDb25maXJtRGVsZXRlTW9kYWwgZXh0ZW5kcyBNYXJpb25ldHRlLlZpZXdcbiAgdGVtcGxhdGU6IENvbmZpcm1EZWxldGVUZW1wbGF0ZVxuICB1aTpcbiAgICBjb25maXJtX2RlbGV0ZTogJyNjb25maXJtLWRlbGV0ZS1idXR0b24nXG4gICAgY2FuY2VsX2J1dHRvbjogJyNjYW5jZWwtZGVsZXRlLWJ1dHRvbidcbiAgICBcbiAgZXZlbnRzOiAtPlxuICAgICdjbGljayBAdWkuY29uZmlybV9kZWxldGUnOiAnY29uZmlybV9kZWxldGUnXG5cbiAgY29uZmlybV9kZWxldGU6IC0+XG4gICAgbmFtZSA9IEBtb2RlbC5nZXQgJ25hbWUnXG4gICAgcmVzcG9uc2UgPSBAbW9kZWwuZGVzdHJveSgpXG4gICAgcmVzcG9uc2UuZG9uZSAtPlxuICAgICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnc3VjY2VzcycsIFwiI3tuYW1lfSBkZWxldGVkLlwiLFxuICAgIHJlc3BvbnNlLmZhaWwgLT5cbiAgICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ2RhbmdlcicsIFwiI3tuYW1lfSBOT1QgZGVsZXRlZC5cIlxuICAgICAgXG5jbGFzcyBCYXNlSXRlbVZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLlZpZXdcbiAgdWk6XG4gICAgZWRpdF9pdGVtOiAnLmVkaXQtaXRlbSdcbiAgICBkZWxldGVfaXRlbTogJy5kZWxldGUtaXRlbSdcbiAgICBpdGVtOiAnLmxpc3QtaXRlbSdcbiAgICBcbiAgZXZlbnRzOiAtPlxuICAgICdjbGljayBAdWkuZWRpdF9pdGVtJzogJ2VkaXRfaXRlbSdcbiAgICAnY2xpY2sgQHVpLmRlbGV0ZV9pdGVtJzogJ2RlbGV0ZV9pdGVtJ1xuICAgIFxuICBlZGl0X2l0ZW06IC0+XG4gICAgbmF2aWdhdGVfdG9fdXJsIFwiIyN7QHJvdXRlX25hbWV9LyN7QGl0ZW1fdHlwZX1zL2VkaXQvI3tAbW9kZWwuaWR9XCJcbiAgICBcbiAgZGVsZXRlX2l0ZW06IC0+XG4gICAgaWYgX19ERVZfX1xuICAgICAgY29uc29sZS5sb2cgXCJkZWxldGVfI3tAaXRlbV90eXBlfVwiLCBAbW9kZWxcbiAgICB2aWV3ID0gbmV3IENvbmZpcm1EZWxldGVNb2RhbFxuICAgICAgbW9kZWw6IEBtb2RlbFxuICAgIGlmIF9fREVWX19cbiAgICAgIGNvbnNvbGUubG9nICdtb2RhbCB2aWV3Jywgdmlld1xuICAgIHNob3dfbW9kYWwgdmlldywgdHJ1ZVxuICAgIE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOnNob3ctbW9kYWwnLCB2aWV3LCB7YmFja2Ryb3A6dHJ1ZX1cbiAgICBcbmNsYXNzIEJhc2VMaXN0VmlldyBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICByZWdpb25zOiAtPlxuICAgIGl0ZW1saXN0OiBcIiMje0BpdGVtX3R5cGV9LWNvbnRhaW5lclwiXG4gIHVpOiAtPlxuICAgIG1ha2VfbmV3X2l0ZW06IFwiI25ldy0je0BpdGVtX3R5cGV9XCJcbiAgb25SZW5kZXI6IC0+XG4gICAgdmlldyA9IG5ldyBNYXJpb25ldHRlLkNvbGxlY3Rpb25WaWV3XG4gICAgICBjb2xsZWN0aW9uOiBAY29sbGVjdGlvblxuICAgICAgY2hpbGRWaWV3OiBAY2hpbGRWaWV3XG4gICAgQHNob3dDaGlsZFZpZXcgJ2l0ZW1saXN0Jywgdmlld1xuICBldmVudHM6IC0+XG4gICAgJ2NsaWNrIEB1aS5tYWtlX25ld19pdGVtJzogJ21ha2VfbmV3X2l0ZW0nXG5cbiAgX3Nob3dfbW9kYWw6ICh2aWV3LCBiYWNrZHJvcD1mYWxzZSkgLT5cbiAgICBtb2RhbF9yZWdpb24gPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpnZXQtcmVnaW9uJywgJ21vZGFsJ1xuICAgIG1vZGFsX3JlZ2lvbi5iYWNrZHJvcCA9IGJhY2tkcm9wXG4gICAgbW9kYWxfcmVnaW9uLnNob3cgdmlld1xuICBcbiAgbWFrZV9uZXdfaXRlbTogLT5cbiAgICAjIEZJWE1FIC0gZml4IHVybCBkb250J3QgYWRkICdzJ1xuICAgIG5hdmlnYXRlX3RvX3VybCBcIiMje0Byb3V0ZV9uYW1lfS8je0BpdGVtX3R5cGV9cy9uZXdcIlxuICAgIFxubW9kdWxlLmV4cG9ydHMgPVxuICBCYXNlSXRlbVZpZXc6IEJhc2VJdGVtVmlld1xuICBCYXNlTGlzdFZpZXc6IEJhc2VMaXN0Vmlld1xuICBcblxuIl19
