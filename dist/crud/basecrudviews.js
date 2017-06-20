var Backbone, BaseItemView, BaseListView, ConfirmDeleteModal, ConfirmDeleteTemplate, MainChannel, Marionette, MessageChannel, modal_close_button, navigate_to_url, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

tc = require('teacup');

navigate_to_url = require('../util/navigate-to-url');

require('../regions/bsmodal');

modal_close_button = require('../templates/buttons').modal_close_button;

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

ConfirmDeleteTemplate = tc.renderable(function(model) {
  return tc.div('.modal-dialog', function() {
    return tc.div('.modal-content', function() {
      tc.h3("Do you really want to delete " + model.name + "?");
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

ConfirmDeleteModal = (function(superClass) {
  extend(ConfirmDeleteModal, superClass);

  function ConfirmDeleteModal() {
    return ConfirmDeleteModal.__super__.constructor.apply(this, arguments);
  }

  ConfirmDeleteModal.prototype.template = ConfirmDeleteTemplate;

  ConfirmDeleteModal.prototype.ui = {
    confirm_delete: '#confirm-delete-button',
    cancel_button: '#cancel-delete-button'
  };

  ConfirmDeleteModal.prototype.events = function() {
    return {
      'click @ui.confirm_delete': 'confirm_delete'
    };
  };

  ConfirmDeleteModal.prototype.confirm_delete = function() {
    var name, response;
    name = this.model.get('name');
    response = this.model.destroy();
    response.done(function() {
      return MessageChannel.request('success', name + " deleted.");
    });
    return response.fail(function() {
      return MessageChannel.request('danger', name + " NOT deleted.");
    });
  };

  return ConfirmDeleteModal;

})(Marionette.View);

BaseItemView = (function(superClass) {
  extend(BaseItemView, superClass);

  function BaseItemView() {
    return BaseItemView.__super__.constructor.apply(this, arguments);
  }

  BaseItemView.prototype.ui = {
    edit_item: '.edit-item',
    delete_item: '.delete-item',
    item: '.list-item'
  };

  BaseItemView.prototype.events = function() {
    return {
      'click @ui.edit_item': 'edit_item',
      'click @ui.delete_item': 'delete_item'
    };
  };

  BaseItemView.prototype.edit_item = function() {
    return navigate_to_url("#" + this.route_name + "/" + this.item_type + "s/edit/" + this.model.id);
  };

  BaseItemView.prototype.delete_item = function() {
    var view;
    if (__DEV__) {
      console.log("delete_" + this.item_type, this.model);
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
  };

  return BaseItemView;

})(Marionette.View);

BaseListView = (function(superClass) {
  extend(BaseListView, superClass);

  function BaseListView() {
    return BaseListView.__super__.constructor.apply(this, arguments);
  }

  BaseListView.prototype.regions = function() {
    return {
      itemlist: "#" + this.item_type + "-container"
    };
  };

  BaseListView.prototype.ui = function() {
    return {
      make_new_item: "#new-" + this.item_type
    };
  };

  BaseListView.prototype.onRender = function() {
    var view;
    view = new Marionette.CollectionView({
      collection: this.collection,
      childView: this.childView
    });
    return this.showChildView('itemlist', view);
  };

  BaseListView.prototype.events = function() {
    return {
      'click @ui.make_new_item': 'make_new_item'
    };
  };

  BaseListView.prototype._show_modal = function(view, backdrop) {
    var modal_region;
    if (backdrop == null) {
      backdrop = false;
    }
    modal_region = MainChannel.request('main:app:get-region', 'modal');
    modal_region.backdrop = backdrop;
    return modal_region.show(view);
  };

  BaseListView.prototype.make_new_item = function() {
    return navigate_to_url("#" + this.route_name + "/" + this.item_type + "s/new");
  };

  return BaseListView;

})(Marionette.View);

module.exports = {
  BaseItemView: BaseItemView,
  BaseListView: BaseListView
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J1ZC9iYXNlY3J1ZHZpZXdzLmpzIiwic291cmNlcyI6WyJjcnVkL2Jhc2VjcnVkdmlld3MuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsaUtBQUE7RUFBQTs7O0FBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxVQUFSOztBQUNYLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBQ2IsRUFBQSxHQUFLLE9BQUEsQ0FBUSxRQUFSOztBQUVMLGVBQUEsR0FBa0IsT0FBQSxDQUFRLHlCQUFSOztBQUNsQixPQUFBLENBQVEsb0JBQVI7O0FBQ0UscUJBQXVCLE9BQUEsQ0FBUSxzQkFBUjs7QUFFekIsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDZCxjQUFBLEdBQWlCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixVQUF2Qjs7QUFJakIscUJBQUEsR0FBd0IsRUFBRSxDQUFDLFVBQUgsQ0FBYyxTQUFDLEtBQUQ7U0FDcEMsRUFBRSxDQUFDLEdBQUgsQ0FBTyxlQUFQLEVBQXdCLFNBQUE7V0FDdEIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxnQkFBUCxFQUF5QixTQUFBO01BQ3ZCLEVBQUUsQ0FBQyxFQUFILENBQU0sK0JBQUEsR0FBZ0MsS0FBSyxDQUFDLElBQXRDLEdBQTJDLEdBQWpEO01BQ0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyxhQUFQLEVBQXNCLFNBQUE7ZUFDcEIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxvQkFBUDtNQURvQixDQUF0QjthQUVBLEVBQUUsQ0FBQyxHQUFILENBQU8sZUFBUCxFQUF3QixTQUFBO2VBQ3RCLEVBQUUsQ0FBQyxFQUFILENBQU0sY0FBTixFQUFzQixTQUFBO0FBQ3BCLGNBQUE7VUFBQSxRQUFBLEdBQVc7VUFDWCxFQUFFLENBQUMsRUFBSCxDQUFNLHdCQUFOLEVBQWdDLFNBQUE7bUJBQzlCLGtCQUFBLENBQW1CLElBQW5CLEVBQXlCLE9BQXpCO1VBRDhCLENBQWhD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O0lBQzNCLFlBQUEsR0FBZSxXQUFXLENBQUMsT0FBWixDQUFvQixxQkFBcEIsRUFBMkMsT0FBM0M7SUFDZixZQUFZLENBQUMsUUFBYixHQUF3QjtXQUN4QixZQUFZLENBQUMsSUFBYixDQUFrQixJQUFsQjtFQUhXOzt5QkFLYixhQUFBLEdBQWUsU0FBQTtXQUViLGVBQUEsQ0FBZ0IsR0FBQSxHQUFJLElBQUMsQ0FBQSxVQUFMLEdBQWdCLEdBQWhCLEdBQW1CLElBQUMsQ0FBQSxTQUFwQixHQUE4QixPQUE5QztFQUZhOzs7O0dBbEJVLFVBQVUsQ0FBQzs7QUFzQnRDLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7RUFBQSxZQUFBLEVBQWMsWUFBZDtFQUNBLFlBQUEsRUFBYyxZQURkIiwic291cmNlc0NvbnRlbnQiOlsiQmFja2JvbmUgPSByZXF1aXJlICdiYWNrYm9uZSdcbk1hcmlvbmV0dGUgPSByZXF1aXJlICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xudGMgPSByZXF1aXJlICd0ZWFjdXAnXG5cbm5hdmlnYXRlX3RvX3VybCA9IHJlcXVpcmUgJy4uL3V0aWwvbmF2aWdhdGUtdG8tdXJsJ1xucmVxdWlyZSAnLi4vcmVnaW9ucy9ic21vZGFsJ1xueyBtb2RhbF9jbG9zZV9idXR0b24gfSA9IHJlcXVpcmUgJy4uL3RlbXBsYXRlcy9idXR0b25zJ1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5cblxuXG5Db25maXJtRGVsZXRlVGVtcGxhdGUgPSB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgdGMuZGl2ICcubW9kYWwtZGlhbG9nJywgLT5cbiAgICB0Yy5kaXYgJy5tb2RhbC1jb250ZW50JywgLT5cbiAgICAgIHRjLmgzIFwiRG8geW91IHJlYWxseSB3YW50IHRvIGRlbGV0ZSAje21vZGVsLm5hbWV9P1wiXG4gICAgICB0Yy5kaXYgJy5tb2RhbC1ib2R5JywgLT5cbiAgICAgICAgdGMuZGl2ICcjc2VsZWN0ZWQtY2hpbGRyZW4nXG4gICAgICB0Yy5kaXYgJy5tb2RhbC1mb290ZXInLCAtPlxuICAgICAgICB0Yy51bCAnLmxpc3QtaW5saW5lJywgLT5cbiAgICAgICAgICBidG5jbGFzcyA9ICdidG4uYnRuLWRlZmF1bHQuYnRuLXNtJ1xuICAgICAgICAgIHRjLmxpIFwiI2NvbmZpcm0tZGVsZXRlLWJ1dHRvblwiLCAtPlxuICAgICAgICAgICAgbW9kYWxfY2xvc2VfYnV0dG9uICdPSycsICdjaGVjaydcbiAgICAgICAgICB0Yy5saSBcIiNjYW5jZWwtZGVsZXRlLWJ1dHRvblwiLCAtPlxuICAgICAgICAgICAgbW9kYWxfY2xvc2VfYnV0dG9uICdDYW5jZWwnXG4gICAgXG5cbmNsYXNzIENvbmZpcm1EZWxldGVNb2RhbCBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogQ29uZmlybURlbGV0ZVRlbXBsYXRlXG4gIHVpOlxuICAgIGNvbmZpcm1fZGVsZXRlOiAnI2NvbmZpcm0tZGVsZXRlLWJ1dHRvbidcbiAgICBjYW5jZWxfYnV0dG9uOiAnI2NhbmNlbC1kZWxldGUtYnV0dG9uJ1xuICAgIFxuICBldmVudHM6IC0+XG4gICAgJ2NsaWNrIEB1aS5jb25maXJtX2RlbGV0ZSc6ICdjb25maXJtX2RlbGV0ZSdcblxuICBjb25maXJtX2RlbGV0ZTogLT5cbiAgICBuYW1lID0gQG1vZGVsLmdldCAnbmFtZSdcbiAgICByZXNwb25zZSA9IEBtb2RlbC5kZXN0cm95KClcbiAgICByZXNwb25zZS5kb25lIC0+XG4gICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICdzdWNjZXNzJywgXCIje25hbWV9IGRlbGV0ZWQuXCIsXG4gICAgcmVzcG9uc2UuZmFpbCAtPlxuICAgICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnZGFuZ2VyJywgXCIje25hbWV9IE5PVCBkZWxldGVkLlwiXG4gICAgICBcbmNsYXNzIEJhc2VJdGVtVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuVmlld1xuICB1aTpcbiAgICBlZGl0X2l0ZW06ICcuZWRpdC1pdGVtJ1xuICAgIGRlbGV0ZV9pdGVtOiAnLmRlbGV0ZS1pdGVtJ1xuICAgIGl0ZW06ICcubGlzdC1pdGVtJ1xuICAgIFxuICBldmVudHM6IC0+XG4gICAgJ2NsaWNrIEB1aS5lZGl0X2l0ZW0nOiAnZWRpdF9pdGVtJ1xuICAgICdjbGljayBAdWkuZGVsZXRlX2l0ZW0nOiAnZGVsZXRlX2l0ZW0nXG4gICAgXG4gIGVkaXRfaXRlbTogLT5cbiAgICBuYXZpZ2F0ZV90b191cmwgXCIjI3tAcm91dGVfbmFtZX0vI3tAaXRlbV90eXBlfXMvZWRpdC8je0Btb2RlbC5pZH1cIlxuICAgIFxuICBkZWxldGVfaXRlbTogLT5cbiAgICBpZiBfX0RFVl9fXG4gICAgICBjb25zb2xlLmxvZyBcImRlbGV0ZV8je0BpdGVtX3R5cGV9XCIsIEBtb2RlbFxuICAgIHZpZXcgPSBuZXcgQ29uZmlybURlbGV0ZU1vZGFsXG4gICAgICBtb2RlbDogQG1vZGVsXG4gICAgaWYgX19ERVZfX1xuICAgICAgY29uc29sZS5sb2cgJ21vZGFsIHZpZXcnLCB2aWV3XG4gICAgc2hvd19tb2RhbCB2aWV3LCB0cnVlXG4gICAgTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6c2hvdy1tb2RhbCcsIHZpZXcsIHtiYWNrZHJvcDp0cnVlfVxuICAgIFxuY2xhc3MgQmFzZUxpc3RWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5WaWV3XG4gIHJlZ2lvbnM6IC0+XG4gICAgaXRlbWxpc3Q6IFwiIyN7QGl0ZW1fdHlwZX0tY29udGFpbmVyXCJcbiAgdWk6IC0+XG4gICAgbWFrZV9uZXdfaXRlbTogXCIjbmV3LSN7QGl0ZW1fdHlwZX1cIlxuICBvblJlbmRlcjogLT5cbiAgICB2aWV3ID0gbmV3IE1hcmlvbmV0dGUuQ29sbGVjdGlvblZpZXdcbiAgICAgIGNvbGxlY3Rpb246IEBjb2xsZWN0aW9uXG4gICAgICBjaGlsZFZpZXc6IEBjaGlsZFZpZXdcbiAgICBAc2hvd0NoaWxkVmlldyAnaXRlbWxpc3QnLCB2aWV3XG4gIGV2ZW50czogLT5cbiAgICAnY2xpY2sgQHVpLm1ha2VfbmV3X2l0ZW0nOiAnbWFrZV9uZXdfaXRlbSdcblxuICBfc2hvd19tb2RhbDogKHZpZXcsIGJhY2tkcm9wPWZhbHNlKSAtPlxuICAgIG1vZGFsX3JlZ2lvbiA9IE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmdldC1yZWdpb24nLCAnbW9kYWwnXG4gICAgbW9kYWxfcmVnaW9uLmJhY2tkcm9wID0gYmFja2Ryb3BcbiAgICBtb2RhbF9yZWdpb24uc2hvdyB2aWV3XG4gIFxuICBtYWtlX25ld19pdGVtOiAtPlxuICAgICMgRklYTUUgLSBmaXggdXJsIGRvbnQndCBhZGQgJ3MnXG4gICAgbmF2aWdhdGVfdG9fdXJsIFwiIyN7QHJvdXRlX25hbWV9LyN7QGl0ZW1fdHlwZX1zL25ld1wiXG4gICAgXG5tb2R1bGUuZXhwb3J0cyA9XG4gIEJhc2VJdGVtVmlldzogQmFzZUl0ZW1WaWV3XG4gIEJhc2VMaXN0VmlldzogQmFzZUxpc3RWaWV3XG4gIFxuXG4iXX0=
