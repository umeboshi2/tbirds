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

module.exports = {
  BaseItemView: BaseItemView,
  BaseListView: BaseListView
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J1ZC9iYXNlY3J1ZHZpZXdzLmpzIiwic291cmNlcyI6WyJjcnVkL2Jhc2VjcnVkdmlld3MuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsUUFBQSxFQUFBLFlBQUEsRUFBQSxZQUFBLEVBQUEsa0JBQUEsRUFBQSxxQkFBQSxFQUFBLFdBQUEsRUFBQSxVQUFBLEVBQUEsY0FBQSxFQUFBLGtCQUFBLEVBQUEsZUFBQSxFQUFBOztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFDWCxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUNiLEVBQUEsR0FBSyxPQUFBLENBQVEsUUFBUjs7QUFFTCxlQUFBLEdBQWtCLE9BQUEsQ0FBUSx5QkFBUjs7QUFDbEIsT0FBQSxDQUFRLG9CQUFSOztBQUNBLENBQUEsQ0FBRSxrQkFBRixDQUFBLEdBQXlCLE9BQUEsQ0FBUSxzQkFBUixDQUF6Qjs7QUFFQSxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCOztBQUlqQixxQkFBQSxHQUF3QixFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQyxLQUFELENBQUE7U0FDcEMsRUFBRSxDQUFDLEdBQUgsQ0FBTyxlQUFQLEVBQXdCLFFBQUEsQ0FBQSxDQUFBO1dBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sZ0JBQVAsRUFBeUIsUUFBQSxDQUFBLENBQUE7TUFDdkIsRUFBRSxDQUFDLEVBQUgsQ0FBTSxDQUFBLDZCQUFBLENBQUEsQ0FBZ0MsS0FBSyxDQUFDLElBQXRDLENBQTJDLENBQTNDLENBQU47TUFDQSxFQUFFLENBQUMsR0FBSCxDQUFPLGFBQVAsRUFBc0IsUUFBQSxDQUFBLENBQUE7ZUFDcEIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxvQkFBUDtNQURvQixDQUF0QjthQUVBLEVBQUUsQ0FBQyxHQUFILENBQU8sZUFB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SUFBQyxDQUFBLFNBQUwsQ0FBZSxVQUFmO0lBQVY7RUFETzs7RUFFVCxFQUFJLENBQUEsQ0FBQTtXQUNGO01BQUEsYUFBQSxFQUFlLENBQUEsS0FBQSxDQUFBLENBQVEsSUFBQyxDQUFBLFNBQVQsQ0FBQTtJQUFmO0VBREU7O0VBRUosUUFBVSxDQUFBLENBQUE7QUFDUixRQUFBO0lBQUEsSUFBQSxHQUFPLElBQUksVUFBVSxDQUFDLGNBQWYsQ0FDTDtNQUFBLFVBQUEsRUFBWSxJQUFDLENBQUEsVUFBYjtNQUNBLFNBQUEsRUFBVyxJQUFDLENBQUE7SUFEWixDQURLO1dBR1AsSUFBQyxDQUFBLGFBQUQsQ0FBZSxVQUFmLEVBQTJCLElBQTNCO0VBSlE7O0VBS1YsTUFBUSxDQUFBLENBQUE7V0FDTjtNQUFBLHlCQUFBLEVBQTJCO0lBQTNCO0VBRE07O0VBR1IsV0FBYSxDQUFDLElBQUQsRUFBTyxXQUFTLEtBQWhCLENBQUE7QUFDWCxRQUFBO0lBQUEsWUFBQSxHQUFlLFdBQVcsQ0FBQyxPQUFaLENBQW9CLHFCQUFwQixFQUEyQyxPQUEzQztJQUNmLFlBQVksQ0FBQyxRQUFiLEdBQXdCO1dBQ3hCLFlBQVksQ0FBQyxJQUFiLENBQWtCLElBQWxCO0VBSFc7O0VBS2IsYUFBZSxDQUFBLENBQUEsRUFBQTs7V0FFYixlQUFBLENBQWdCLENBQUEsQ0FBQSxDQUFBLENBQUksSUFBQyxDQUFBLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBQSxDQUFtQixJQUFDLENBQUEsU0FBcEIsQ0FBOEIsS0FBOUIsQ0FBaEI7RUFGYTs7QUFsQmpCOztBQXNCQSxNQUFNLENBQUMsT0FBUCxHQUNFO0VBQUEsWUFBQSxFQUFjLFlBQWQ7RUFDQSxZQUFBLEVBQWM7QUFEZCIsInNvdXJjZXNDb250ZW50IjpbIkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5NYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbnRjID0gcmVxdWlyZSAndGVhY3VwJ1xuXG5uYXZpZ2F0ZV90b191cmwgPSByZXF1aXJlICcuLi91dGlsL25hdmlnYXRlLXRvLXVybCdcbnJlcXVpcmUgJy4uL3JlZ2lvbnMvYnNtb2RhbCdcbnsgbW9kYWxfY2xvc2VfYnV0dG9uIH0gPSByZXF1aXJlICcuLi90ZW1wbGF0ZXMvYnV0dG9ucydcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5NZXNzYWdlQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG5cblxuQ29uZmlybURlbGV0ZVRlbXBsYXRlID0gdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gIHRjLmRpdiAnLm1vZGFsLWRpYWxvZycsIC0+XG4gICAgdGMuZGl2ICcubW9kYWwtY29udGVudCcsIC0+XG4gICAgICB0Yy5oMyBcIkRvIHlvdSByZWFsbHkgd2FudCB0byBkZWxldGUgI3ttb2RlbC5uYW1lfT9cIlxuICAgICAgdGMuZGl2ICcubW9kYWwtYm9keScsIC0+XG4gICAgICAgIHRjLmRpdiAnI3NlbGVjdGVkLWNoaWxkcmVuJ1xuICAgICAgdGMuZGl2ICcubW9kYWwtZm9vdGVyJywgLT5cbiAgICAgICAgdGMudWwgJy5saXN0LWlubGluZScsIC0+XG4gICAgICAgICAgYnRuY2xhc3MgPSAnYnRuLmJ0bi1zZWNvbmRhcnkuYnRuLXNtJ1xuICAgICAgICAgIHRjLmxpIFwiI2NvbmZpcm0tZGVsZXRlLWJ1dHRvblwiLCAtPlxuICAgICAgICAgICAgbW9kYWxfY2xvc2VfYnV0dG9uICdPSycsICdjaGVjaydcbiAgICAgICAgICB0Yy5saSBcIiNjYW5jZWwtZGVsZXRlLWJ1dHRvblwiLCAtPlxuICAgICAgICAgICAgbW9kYWxfY2xvc2VfYnV0dG9uICdDYW5jZWwnXG4gICAgXG5cbmNsYXNzIENvbmZpcm1EZWxldGVNb2RhbCBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogQ29uZmlybURlbGV0ZVRlbXBsYXRlXG4gIHVpOlxuICAgIGNvbmZpcm1fZGVsZXRlOiAnI2NvbmZpcm0tZGVsZXRlLWJ1dHRvbidcbiAgICBjYW5jZWxfYnV0dG9uOiAnI2NhbmNlbC1kZWxldGUtYnV0dG9uJ1xuICAgIFxuICBldmVudHM6IC0+XG4gICAgJ2NsaWNrIEB1aS5jb25maXJtX2RlbGV0ZSc6ICdjb25maXJtX2RlbGV0ZSdcblxuICBjb25maXJtX2RlbGV0ZTogLT5cbiAgICBuYW1lID0gQG1vZGVsLmdldCAnbmFtZSdcbiAgICByZXNwb25zZSA9IEBtb2RlbC5kZXN0cm95KClcbiAgICByZXNwb25zZS5kb25lIC0+XG4gICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICdzdWNjZXNzJywgXCIje25hbWV9IGRlbGV0ZWQuXCIsXG4gICAgcmVzcG9uc2UuZmFpbCAtPlxuICAgICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnZGFuZ2VyJywgXCIje25hbWV9IE5PVCBkZWxldGVkLlwiXG4gICAgICBcbmNsYXNzIEJhc2VJdGVtVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICB1aTpcbiAgICBlZGl0X2l0ZW06ICcuZWRpdC1pdGVtJ1xuICAgIGRlbGV0ZV9pdGVtOiAnLmRlbGV0ZS1pdGVtJ1xuICAgIGl0ZW06ICcubGlzdC1pdGVtJ1xuICAgIFxuICBldmVudHM6IC0+XG4gICAgJ2NsaWNrIEB1aS5lZGl0X2l0ZW0nOiAnZWRpdF9pdGVtJ1xuICAgICdjbGljayBAdWkuZGVsZXRlX2l0ZW0nOiAnZGVsZXRlX2l0ZW0nXG4gICAgXG4gIGVkaXRfaXRlbTogLT5cbiAgICBuYXZpZ2F0ZV90b191cmwgXCIjI3tAcm91dGVfbmFtZX0vI3tAaXRlbV90eXBlfXMvZWRpdC8je0Btb2RlbC5pZH1cIlxuICAgIFxuICBkZWxldGVfaXRlbTogLT5cbiAgICBpZiBfX0RFVl9fXG4gICAgICBjb25zb2xlLmxvZyBcImRlbGV0ZV8je0BpdGVtX3R5cGV9XCIsIEBtb2RlbFxuICAgIHZpZXcgPSBuZXcgQ29uZmlybURlbGV0ZU1vZGFsXG4gICAgICBtb2RlbDogQG1vZGVsXG4gICAgaWYgX19ERVZfX1xuICAgICAgY29uc29sZS5sb2cgJ21vZGFsIHZpZXcnLCB2aWV3XG4gICAgc2hvd19tb2RhbCB2aWV3LCB0cnVlXG4gICAgTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6c2hvdy1tb2RhbCcsIHZpZXcsIHtiYWNrZHJvcDp0cnVlfVxuICAgIFxuY2xhc3MgQmFzZUxpc3RWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5WaWV3XG4gIHJlZ2lvbnM6IC0+XG4gICAgaXRlbWxpc3Q6IFwiIyN7QGl0ZW1fdHlwZX0tY29udGFpbmVyXCJcbiAgdWk6IC0+XG4gICAgbWFrZV9uZXdfaXRlbTogXCIjbmV3LSN7QGl0ZW1fdHlwZX1cIlxuICBvblJlbmRlcjogLT5cbiAgICB2aWV3ID0gbmV3IE1hcmlvbmV0dGUuQ29sbGVjdGlvblZpZXdcbiAgICAgIGNvbGxlY3Rpb246IEBjb2xsZWN0aW9uXG4gICAgICBjaGlsZFZpZXc6IEBjaGlsZFZpZXdcbiAgICBAc2hvd0NoaWxkVmlldyAnaXRlbWxpc3QnLCB2aWV3XG4gIGV2ZW50czogLT5cbiAgICAnY2xpY2sgQHVpLm1ha2VfbmV3X2l0ZW0nOiAnbWFrZV9uZXdfaXRlbSdcblxuICBfc2hvd19tb2RhbDogKHZpZXcsIGJhY2tkcm9wPWZhbHNlKSAtPlxuICAgIG1vZGFsX3JlZ2lvbiA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmdldC1yZWdpb24nLCAnbW9kYWwnXG4gICAgbW9kYWxfcmVnaW9uLmJhY2tkcm9wID0gYmFja2Ryb3BcbiAgICBtb2RhbF9yZWdpb24uc2hvdyB2aWV3XG4gIFxuICBtYWtlX25ld19pdGVtOiAtPlxuICAgICMgRklYTUUgLSBmaXggdXJsIGRvbnQndCBhZGQgJ3MnXG4gICAgbmF2aWdhdGVfdG9fdXJsIFwiIyN7QHJvdXRlX25hbWV9LyN7QGl0ZW1fdHlwZX1zL25ld1wiXG4gICAgXG5tb2R1bGUuZXhwb3J0cyA9XG4gIEJhc2VJdGVtVmlldzogQmFzZUl0ZW1WaWV3XG4gIEJhc2VMaXN0VmlldzogQmFzZUxpc3RWaWV3XG4gIFxuXG4iXX0=
