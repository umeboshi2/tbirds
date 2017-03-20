var Backbone, ConfirmDeleteModal, ConfirmDeleteTemplate, MainChannel, Marionette, MessageChannel, modal_close_button, show_modal, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

tc = require('teacup');

show_modal = require('./regions').show_modal;

modal_close_button = require('./templates/buttons').modal_close_button;

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

ConfirmDeleteTemplate = tc.renderable(function(model) {
  return tc.div('.modal-dialog', function() {
    return tc.div('.modal-content', function() {
      tc.h3("Do you really want to delete " + model._humanIdentifier + "?");
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

  ConfirmDeleteModal.prototype.templateContext = function() {
    return {
      _humanIdentifier: this.getOption('modelHumanIdentifier') || 'name'
    };
  };

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

})(Backbone.Marionette.View);

module.exports = ConfirmDeleteModal;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLW5hbWVkLW1vZGVsLmpzIiwic291cmNlcyI6WyJkZWxldGUtbmFtZWQtbW9kZWwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsZ0lBQUE7RUFBQTs7O0FBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxVQUFSOztBQUNYLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBQ2IsRUFBQSxHQUFLLE9BQUEsQ0FBUSxRQUFSOztBQUVILGFBQWUsT0FBQSxDQUFRLFdBQVI7O0FBQ2YscUJBQXVCLE9BQUEsQ0FBUSxxQkFBUjs7QUFFekIsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDZCxjQUFBLEdBQWlCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixVQUF2Qjs7QUFHakIscUJBQUEsR0FBd0IsRUFBRSxDQUFDLFVBQUgsQ0FBYyxTQUFDLEtBQUQ7U0FDcEMsRUFBRSxDQUFDLEdBQUgsQ0FBTyxlQUFQLEVBQXdCLFNBQUE7V0FDdEIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxnQkFBUCxFQUF5QixTQUFBO01BQ3ZCLEVBQUUsQ0FBQyxFQUFILENBQU0sK0JBQUEsR0FBZ0MsS0FBSyxDQUFDLGdCQUF0QyxHQUF1RCxHQUE3RDtNQUNBLEVBQUUsQ0FBQyxHQUFILENBQU8sYUFBUCxFQUFzQixTQUFBO2VBQ3BCLEVBQUUsQ0FBQyxHQUFILENBQU8sb0JBQVA7TUFEb0IsQ0FBdEI7YUFFQSxFQUFFLENBQUMsR0FBSCxDQUFPLGVBQVAsRUFBd0IsU0FBQTtlQUN0QixFQUFFLENBQUMsRUFBSCxDQUFNLGNBQU4sRUFBc0IsU0FBQTtBQUNwQixjQUFBO1VBQUEsUUFBQSxHQUFXO1VBQ1gsRUFBRSxDQUFDLEVBQUgsQ0FBTSx3QkFBTixFQUFnQyxTQUFBO21CQUM5QixrQkFBQSxDQUFtQixJQUFuQixFQUF5QixPQUF6QjtVQUQ4QixDQUFoQztpQkFFQSxFQUFFLENBQUMsRUFBSCxDQUFNLHVCQUFOLEVBQStCLFNBQUE7bUJBQzdCLGtCQUFBLENBQW1CLFFBQW5CO1VBRDZCLENBQS9CO1FBSm9CLENBQXRCO01BRHNCLENBQXhCO0lBSnVCLENBQXpCO0VBRHNCLENBQXhCO0FBRG9DLENBQWQ7O0FBZWxCOzs7Ozs7OytCQUNKLFFBQUEsR0FBVTs7K0JBQ1YsZUFBQSxHQUFpQixTQUFBO1dBSWY7TUFBQSxnQkFBQSxFQUFrQixJQUFDLENBQUEsU0FBRCxDQUFXLHNCQUFYLENBQUEsSUFBc0MsTUFBeEQ7O0VBSmU7OytCQUtqQixFQUFBLEdBQ0U7SUFBQSxjQUFBLEVBQWdCLHdCQUFoQjtJQUNBLGFBQUEsRUFBZSx1QkFEZjs7OytCQUdGLE1BQUEsR0FBUSxTQUFBO1dBQ047TUFBQSwwQkFBQSxFQUE0QixnQkFBNUI7O0VBRE07OytCQUdSLGNBQUEsR0FBZ0IsU0FBQTtBQUNkLFFBQUE7SUFBQSxJQUFBLEdBQU8sSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsTUFBWDtJQUNQLFFBQUEsR0FBVyxJQUFDLENBQUEsS0FBSyxDQUFDLE9BQVAsQ0FBQTtJQUNYLFFBQVEsQ0FBQyxJQUFULENBQWMsU0FBQTthQUNaLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFNBQXZCLEVBQXFDLElBQUQsR0FBTSxXQUExQztJQURZLENBQWQ7V0FFQSxRQUFRLENBQUMsSUFBVCxDQUFjLFNBQUE7YUFDWixjQUFjLENBQUMsT0FBZixDQUF1QixRQUF2QixFQUFvQyxJQUFELEdBQU0sZUFBekM7SUFEWSxDQUFkO0VBTGM7Ozs7R0FkZSxRQUFRLENBQUMsVUFBVSxDQUFDOztBQXNCckQsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJCYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG50YyA9IHJlcXVpcmUgJ3RlYWN1cCdcblxueyBzaG93X21vZGFsIH0gPSByZXF1aXJlICcuL3JlZ2lvbnMnXG57IG1vZGFsX2Nsb3NlX2J1dHRvbiB9ID0gcmVxdWlyZSAnLi90ZW1wbGF0ZXMvYnV0dG9ucydcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5NZXNzYWdlQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG4jIEZJWE1FLCB0aGlzIGRlcGVuZHMgb24gdGhlIG1vZGVsIGhhdmluZyBhIFwibmFtZVwiIGF0dHJpYnV0ZVxuQ29uZmlybURlbGV0ZVRlbXBsYXRlID0gdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gIHRjLmRpdiAnLm1vZGFsLWRpYWxvZycsIC0+XG4gICAgdGMuZGl2ICcubW9kYWwtY29udGVudCcsIC0+XG4gICAgICB0Yy5oMyBcIkRvIHlvdSByZWFsbHkgd2FudCB0byBkZWxldGUgI3ttb2RlbC5faHVtYW5JZGVudGlmaWVyfT9cIlxuICAgICAgdGMuZGl2ICcubW9kYWwtYm9keScsIC0+XG4gICAgICAgIHRjLmRpdiAnI3NlbGVjdGVkLWNoaWxkcmVuJ1xuICAgICAgdGMuZGl2ICcubW9kYWwtZm9vdGVyJywgLT5cbiAgICAgICAgdGMudWwgJy5saXN0LWlubGluZScsIC0+XG4gICAgICAgICAgYnRuY2xhc3MgPSAnYnRuLmJ0bi1kZWZhdWx0LmJ0bi1zbSdcbiAgICAgICAgICB0Yy5saSBcIiNjb25maXJtLWRlbGV0ZS1idXR0b25cIiwgLT5cbiAgICAgICAgICAgIG1vZGFsX2Nsb3NlX2J1dHRvbiAnT0snLCAnY2hlY2snXG4gICAgICAgICAgdGMubGkgXCIjY2FuY2VsLWRlbGV0ZS1idXR0b25cIiwgLT5cbiAgICAgICAgICAgIG1vZGFsX2Nsb3NlX2J1dHRvbiAnQ2FuY2VsJ1xuICAgIFxuXG5jbGFzcyBDb25maXJtRGVsZXRlTW9kYWwgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLlZpZXdcbiAgdGVtcGxhdGU6IENvbmZpcm1EZWxldGVUZW1wbGF0ZVxuICB0ZW1wbGF0ZUNvbnRleHQ6IC0+XG4gICAgIyBGSVhNRSB0aGlzIGlzIHVuZGVyc2NvcmVkIHRvIGhvcGVmdWxseVxuICAgICMga2VlcCBmcm9tIHBvdGVudGlhbGx5IGNsb2JiZXJpbmcgZ2VuZXJpYyBtb2RlbCBhdHRyaWJ1dGUuXG4gICAgIyBGaW5kIGEgYmV0dGVyIHdheSB0byBkbyB0aGlzLlxuICAgIF9odW1hbklkZW50aWZpZXI6IEBnZXRPcHRpb24oJ21vZGVsSHVtYW5JZGVudGlmaWVyJykgb3IgJ25hbWUnXG4gIHVpOlxuICAgIGNvbmZpcm1fZGVsZXRlOiAnI2NvbmZpcm0tZGVsZXRlLWJ1dHRvbidcbiAgICBjYW5jZWxfYnV0dG9uOiAnI2NhbmNlbC1kZWxldGUtYnV0dG9uJ1xuICAgIFxuICBldmVudHM6IC0+XG4gICAgJ2NsaWNrIEB1aS5jb25maXJtX2RlbGV0ZSc6ICdjb25maXJtX2RlbGV0ZSdcblxuICBjb25maXJtX2RlbGV0ZTogLT5cbiAgICBuYW1lID0gQG1vZGVsLmdldCAnbmFtZSdcbiAgICByZXNwb25zZSA9IEBtb2RlbC5kZXN0cm95KClcbiAgICByZXNwb25zZS5kb25lIC0+XG4gICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICdzdWNjZXNzJywgXCIje25hbWV9IGRlbGV0ZWQuXCIsXG4gICAgcmVzcG9uc2UuZmFpbCAtPlxuICAgICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnZGFuZ2VyJywgXCIje25hbWV9IE5PVCBkZWxldGVkLlwiXG4gICAgICBcbm1vZHVsZS5leHBvcnRzID0gQ29uZmlybURlbGV0ZU1vZGFsXG5cbiJdfQ==
