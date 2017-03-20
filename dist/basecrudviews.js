var Backbone, BaseItemView, BaseListView, ConfirmDeleteModal, ConfirmDeleteTemplate, MainChannel, Marionette, MessageChannel, modal_close_button, navigate_to_url, show_modal, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

tc = require('teacup');

navigate_to_url = require('./apputil').navigate_to_url;

show_modal = require('./regions').show_modal;

modal_close_button = require('./templates/buttons').modal_close_button;

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
    response.done((function(_this) {
      return function() {
        return MessageChannel.request('success', name + " deleted.");
      };
    })(this));
    return response.fail((function(_this) {
      return function() {
        return MessageChannel.request('danger', name + " NOT deleted.");
      };
    })(this));
  };

  return ConfirmDeleteModal;

})(Backbone.Marionette.View);

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
    return show_modal(view, true);
  };

  return BaseItemView;

})(Backbone.Marionette.View);

BaseListView = (function(superClass) {
  extend(BaseListView, superClass);

  function BaseListView() {
    return BaseListView.__super__.constructor.apply(this, arguments);
  }

  BaseListView.prototype.childViewContainer = "#" + BaseListView.item_type + "-container";

  BaseListView.prototype.ui = function() {
    return {
      make_new_item: "#new-" + this.item_type
    };
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

})(Backbone.Marionette.CompositeView);

module.exports = {
  BaseItemView: BaseItemView,
  BaseListView: BaseListView
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZWNydWR2aWV3cy5qcyIsInNvdXJjZXMiOlsiYmFzZWNydWR2aWV3cy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSw2S0FBQTtFQUFBOzs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFDYixFQUFBLEdBQUssT0FBQSxDQUFRLFFBQVI7O0FBRUgsa0JBQW9CLE9BQUEsQ0FBUSxXQUFSOztBQUNwQixhQUFlLE9BQUEsQ0FBUSxXQUFSOztBQUNmLHFCQUF1QixPQUFBLENBQVEscUJBQVI7O0FBRXpCLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsY0FBQSxHQUFpQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsVUFBdkI7O0FBSWpCLHFCQUFBLEdBQXdCLEVBQUUsQ0FBQyxVQUFILENBQWMsU0FBQyxLQUFEO1NBQ3BDLEVBQUUsQ0FBQyxHQUFILENBQU8sZUFBUCxFQUF3QixTQUFBO1dBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sZ0JBQVAsRUFBeUIsU0FBQTtNQUN2QixFQUFFLENBQUMsRUFBSCxDQUFNLCtCQUFBLEdBQWdDLEtBQUssQ0FBQyxJQUF0QyxHQUEyQyxHQUFqRDtNQUNBLEVBQUUsQ0FBQyxHQUFILENBQU8sYUFBUCxFQUFzQixTQUFBO2VBQ3BCLEVBQUUsQ0FBQyxHQUFILENBQU8sb0JBQVA7TUFEb0IsQ0FBdEI7YUFFQSxFQUFFLENBQUMsR0FBSCxDQUFPLGVBQVAsRUFBd0IsU0FBQTtlQUN0QixFQUFFLENBQUMsRUFBSCxDQUFNLGNBQU4sRUFBc0IsU0FBQTtBQUNwQixjQUFBO1VBQUEsUUFBQSxHQUFXO1VBQ1gsRUFBRSxDQUFDLEVBQUgsQ0FBTSx3QkFBTixFQUFnQyxTQUFBO21CQUM5QixrQkFBQSxDQUFtQixJQUFuQixFQUF5QixPQUF6QjtVQUQ4QixDQUFoQztpQkFFQSxFQUFF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R0FBbUIsSUFBQyxDQUFBLFNBQXBCLEdBQThCLE9BQTlDO0VBRmE7Ozs7R0FkVSxRQUFRLENBQUMsVUFBVSxDQUFDOztBQW9CL0MsTUFBTSxDQUFDLE9BQVAsR0FDRTtFQUFBLFlBQUEsRUFBYyxZQUFkO0VBQ0EsWUFBQSxFQUFjLFlBRGQiLCJzb3VyY2VzQ29udGVudCI6WyJCYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG50YyA9IHJlcXVpcmUgJ3RlYWN1cCdcblxueyBuYXZpZ2F0ZV90b191cmwgfSA9IHJlcXVpcmUgJy4vYXBwdXRpbCdcbnsgc2hvd19tb2RhbCB9ID0gcmVxdWlyZSAnLi9yZWdpb25zJ1xueyBtb2RhbF9jbG9zZV9idXR0b24gfSA9IHJlcXVpcmUgJy4vdGVtcGxhdGVzL2J1dHRvbnMnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdtZXNzYWdlcydcblxuXG5cbkNvbmZpcm1EZWxldGVUZW1wbGF0ZSA9IHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICB0Yy5kaXYgJy5tb2RhbC1kaWFsb2cnLCAtPlxuICAgIHRjLmRpdiAnLm1vZGFsLWNvbnRlbnQnLCAtPlxuICAgICAgdGMuaDMgXCJEbyB5b3UgcmVhbGx5IHdhbnQgdG8gZGVsZXRlICN7bW9kZWwubmFtZX0/XCJcbiAgICAgIHRjLmRpdiAnLm1vZGFsLWJvZHknLCAtPlxuICAgICAgICB0Yy5kaXYgJyNzZWxlY3RlZC1jaGlsZHJlbidcbiAgICAgIHRjLmRpdiAnLm1vZGFsLWZvb3RlcicsIC0+XG4gICAgICAgIHRjLnVsICcubGlzdC1pbmxpbmUnLCAtPlxuICAgICAgICAgIGJ0bmNsYXNzID0gJ2J0bi5idG4tZGVmYXVsdC5idG4tc20nXG4gICAgICAgICAgdGMubGkgXCIjY29uZmlybS1kZWxldGUtYnV0dG9uXCIsIC0+XG4gICAgICAgICAgICBtb2RhbF9jbG9zZV9idXR0b24gJ09LJywgJ2NoZWNrJ1xuICAgICAgICAgIHRjLmxpIFwiI2NhbmNlbC1kZWxldGUtYnV0dG9uXCIsIC0+XG4gICAgICAgICAgICBtb2RhbF9jbG9zZV9idXR0b24gJ0NhbmNlbCdcbiAgICBcblxuY2xhc3MgQ29uZmlybURlbGV0ZU1vZGFsIGV4dGVuZHMgQmFja2JvbmUuTWFyaW9uZXR0ZS5WaWV3XG4gIHRlbXBsYXRlOiBDb25maXJtRGVsZXRlVGVtcGxhdGVcbiAgdWk6XG4gICAgY29uZmlybV9kZWxldGU6ICcjY29uZmlybS1kZWxldGUtYnV0dG9uJ1xuICAgIGNhbmNlbF9idXR0b246ICcjY2FuY2VsLWRlbGV0ZS1idXR0b24nXG4gICAgXG4gIGV2ZW50czogLT5cbiAgICAnY2xpY2sgQHVpLmNvbmZpcm1fZGVsZXRlJzogJ2NvbmZpcm1fZGVsZXRlJ1xuXG4gIGNvbmZpcm1fZGVsZXRlOiAtPlxuICAgIG5hbWUgPSBAbW9kZWwuZ2V0ICduYW1lJ1xuICAgIHJlc3BvbnNlID0gQG1vZGVsLmRlc3Ryb3koKVxuICAgIHJlc3BvbnNlLmRvbmUgPT5cbiAgICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ3N1Y2Nlc3MnLCBcIiN7bmFtZX0gZGVsZXRlZC5cIixcbiAgICByZXNwb25zZS5mYWlsID0+XG4gICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICdkYW5nZXInLCBcIiN7bmFtZX0gTk9UIGRlbGV0ZWQuXCJcbiAgICAgIFxuY2xhc3MgQmFzZUl0ZW1WaWV3IGV4dGVuZHMgQmFja2JvbmUuTWFyaW9uZXR0ZS5WaWV3XG4gIHVpOlxuICAgIGVkaXRfaXRlbTogJy5lZGl0LWl0ZW0nXG4gICAgZGVsZXRlX2l0ZW06ICcuZGVsZXRlLWl0ZW0nXG4gICAgaXRlbTogJy5saXN0LWl0ZW0nXG4gICAgXG4gIGV2ZW50czogLT5cbiAgICAnY2xpY2sgQHVpLmVkaXRfaXRlbSc6ICdlZGl0X2l0ZW0nXG4gICAgJ2NsaWNrIEB1aS5kZWxldGVfaXRlbSc6ICdkZWxldGVfaXRlbSdcbiAgICBcbiAgZWRpdF9pdGVtOiAtPlxuICAgIG5hdmlnYXRlX3RvX3VybCBcIiMje0Byb3V0ZV9uYW1lfS8je0BpdGVtX3R5cGV9cy9lZGl0LyN7QG1vZGVsLmlkfVwiXG4gICAgXG4gIGRlbGV0ZV9pdGVtOiAtPlxuICAgIGlmIF9fREVWX19cbiAgICAgIGNvbnNvbGUubG9nIFwiZGVsZXRlXyN7QGl0ZW1fdHlwZX1cIiwgQG1vZGVsXG4gICAgdmlldyA9IG5ldyBDb25maXJtRGVsZXRlTW9kYWxcbiAgICAgIG1vZGVsOiBAbW9kZWxcbiAgICBpZiBfX0RFVl9fXG4gICAgICBjb25zb2xlLmxvZyAnbW9kYWwgdmlldycsIHZpZXdcbiAgICBzaG93X21vZGFsIHZpZXcsIHRydWVcblxuXG5jbGFzcyBCYXNlTGlzdFZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLkNvbXBvc2l0ZVZpZXdcbiAgY2hpbGRWaWV3Q29udGFpbmVyOiBcIiMje0BpdGVtX3R5cGV9LWNvbnRhaW5lclwiXG4gIHVpOiAtPlxuICAgIG1ha2VfbmV3X2l0ZW06IFwiI25ldy0je0BpdGVtX3R5cGV9XCJcbiAgICBcbiAgZXZlbnRzOiAtPlxuICAgICdjbGljayBAdWkubWFrZV9uZXdfaXRlbSc6ICdtYWtlX25ld19pdGVtJ1xuXG4gIF9zaG93X21vZGFsOiAodmlldywgYmFja2Ryb3A9ZmFsc2UpIC0+XG4gICAgbW9kYWxfcmVnaW9uID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6Z2V0LXJlZ2lvbicsICdtb2RhbCdcbiAgICBtb2RhbF9yZWdpb24uYmFja2Ryb3AgPSBiYWNrZHJvcFxuICAgIG1vZGFsX3JlZ2lvbi5zaG93IHZpZXdcblxuICBcbiAgbWFrZV9uZXdfaXRlbTogLT5cbiAgICAjIEZJWE1FIC0gZml4IHVybCBkb250J3QgYWRkICdzJ1xuICAgIG5hdmlnYXRlX3RvX3VybCBcIiMje0Byb3V0ZV9uYW1lfS8je0BpdGVtX3R5cGV9cy9uZXdcIlxuICAgIFxuICBcblxubW9kdWxlLmV4cG9ydHMgPVxuICBCYXNlSXRlbVZpZXc6IEJhc2VJdGVtVmlld1xuICBCYXNlTGlzdFZpZXc6IEJhc2VMaXN0Vmlld1xuICBcblxuIl19
