var Backbone, ConfirmDeleteModal, ConfirmDeleteTemplate, MainChannel, Marionette, MessageChannel, modal_close_button, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

tc = require('teacup');

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLW5hbWVkLW1vZGVsLmpzIiwic291cmNlcyI6WyJkZWxldGUtbmFtZWQtbW9kZWwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsb0hBQUE7RUFBQTs7O0FBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxVQUFSOztBQUNYLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBQ2IsRUFBQSxHQUFLLE9BQUEsQ0FBUSxRQUFSOztBQUVILHFCQUF1QixPQUFBLENBQVEscUJBQVI7O0FBRXpCLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsY0FBQSxHQUFpQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsVUFBdkI7O0FBR2pCLHFCQUFBLEdBQXdCLEVBQUUsQ0FBQyxVQUFILENBQWMsU0FBQyxLQUFEO1NBQ3BDLEVBQUUsQ0FBQyxHQUFILENBQU8sZUFBUCxFQUF3QixTQUFBO1dBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sZ0JBQVAsRUFBeUIsU0FBQTtNQUN2QixFQUFFLENBQUMsRUFBSCxDQUFNLCtCQUFBLEdBQWdDLEtBQUssQ0FBQyxnQkFBdEMsR0FBdUQsR0FBN0Q7TUFDQSxFQUFFLENBQUMsR0FBSCxDQUFPLGFBQVAsRUFBc0IsU0FBQTtlQUNwQixFQUFFLENBQUMsR0FBSCxDQUFPLG9CQUFQO01BRG9CLENBQXRCO2FBRUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyxlQUFQLEVBQXdCLFNBQUE7ZUFDdEIsRUFBRSxDQUFDLEVBQUgsQ0FBTSxjQUFOLEVBQXNCLFNBQUE7QUFDcEIsY0FBQTtVQUFBLFFBQUEsR0FBVztVQUNYLEVBQUUsQ0FBQyxFQUFILENBQU0sd0JBQU4sRUFBZ0MsU0FBQTttQkFDOUIsa0JBQUEsQ0FBbUIsSUFBbkIsRUFBeUIsT0FBekI7VUFEOEIsQ0FBaEM7aUJBRUEsRUFBRSxDQUFDLEVBQUgsQ0FBTSx1QkFBTixFQUErQixTQUFBO21CQUM3QixrQkFBQSxDQUFtQixRQUFuQjtVQUQ2QixDQUEvQjtRQUpvQixDQUF0QjtNQURzQixDQUF4QjtJQUp1QixDQUF6QjtFQURzQixDQUF4QjtBQURvQyxDQUFkOztBQWVsQjs7Ozs7OzsrQkFDSixRQUFBLEdBQVU7OytCQUNWLGVBQUEsR0FBaUIsU0FBQTtXQUlmO01BQUEsZ0JBQUEsRUFBa0IsSUFBQyxDQUFBLFNBQUQsQ0FBVyxzQkFBWCxDQUFBLElBQXNDLE1BQXhEOztFQUplOzsrQkFLakIsRUFBQSxHQUNFO0lBQUEsY0FBQSxFQUFnQix3QkFBaEI7SUFDQSxhQUFBLEVBQWUsdUJBRGY7OzsrQkFHRixNQUFBLEdBQVEsU0FBQTtXQUNOO01BQUEsMEJBQUEsRUFBNEIsZ0JBQTVCOztFQURNOzsrQkFHUixjQUFBLEdBQWdCLFNBQUE7QUFDZCxRQUFBO0lBQUEsSUFBQSxHQUFPLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLE1BQVg7SUFDUCxRQUFBLEdBQVcsSUFBQyxDQUFBLEtBQUssQ0FBQyxPQUFQLENBQUE7SUFDWCxRQUFRLENBQUMsSUFBVCxDQUFjLFNBQUE7YUFDWixjQUFjLENBQUMsT0FBZixDQUF1QixTQUF2QixFQUFxQyxJQUFELEdBQU0sV0FBMUM7SUFEWSxDQUFkO1dBRUEsUUFBUSxDQUFDLElBQVQsQ0FBYyxTQUFBO2FBQ1osY0FBYyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkIsRUFBb0MsSUFBRCxHQUFNLGVBQXpDO0lBRFksQ0FBZDtFQUxjOzs7O0dBZGUsUUFBUSxDQUFDLFVBQVUsQ0FBQzs7QUFzQnJELE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiQmFja2JvbmUgPSByZXF1aXJlICdiYWNrYm9uZSdcbk1hcmlvbmV0dGUgPSByZXF1aXJlICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xudGMgPSByZXF1aXJlICd0ZWFjdXAnXG5cbnsgbW9kYWxfY2xvc2VfYnV0dG9uIH0gPSByZXF1aXJlICcuL3RlbXBsYXRlcy9idXR0b25zJ1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5cbiMgRklYTUUsIHRoaXMgZGVwZW5kcyBvbiB0aGUgbW9kZWwgaGF2aW5nIGEgXCJuYW1lXCIgYXR0cmlidXRlXG5Db25maXJtRGVsZXRlVGVtcGxhdGUgPSB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgdGMuZGl2ICcubW9kYWwtZGlhbG9nJywgLT5cbiAgICB0Yy5kaXYgJy5tb2RhbC1jb250ZW50JywgLT5cbiAgICAgIHRjLmgzIFwiRG8geW91IHJlYWxseSB3YW50IHRvIGRlbGV0ZSAje21vZGVsLl9odW1hbklkZW50aWZpZXJ9P1wiXG4gICAgICB0Yy5kaXYgJy5tb2RhbC1ib2R5JywgLT5cbiAgICAgICAgdGMuZGl2ICcjc2VsZWN0ZWQtY2hpbGRyZW4nXG4gICAgICB0Yy5kaXYgJy5tb2RhbC1mb290ZXInLCAtPlxuICAgICAgICB0Yy51bCAnLmxpc3QtaW5saW5lJywgLT5cbiAgICAgICAgICBidG5jbGFzcyA9ICdidG4uYnRuLWRlZmF1bHQuYnRuLXNtJ1xuICAgICAgICAgIHRjLmxpIFwiI2NvbmZpcm0tZGVsZXRlLWJ1dHRvblwiLCAtPlxuICAgICAgICAgICAgbW9kYWxfY2xvc2VfYnV0dG9uICdPSycsICdjaGVjaydcbiAgICAgICAgICB0Yy5saSBcIiNjYW5jZWwtZGVsZXRlLWJ1dHRvblwiLCAtPlxuICAgICAgICAgICAgbW9kYWxfY2xvc2VfYnV0dG9uICdDYW5jZWwnXG4gICAgXG5cbmNsYXNzIENvbmZpcm1EZWxldGVNb2RhbCBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogQ29uZmlybURlbGV0ZVRlbXBsYXRlXG4gIHRlbXBsYXRlQ29udGV4dDogLT5cbiAgICAjIEZJWE1FIHRoaXMgaXMgdW5kZXJzY29yZWQgdG8gaG9wZWZ1bGx5XG4gICAgIyBrZWVwIGZyb20gcG90ZW50aWFsbHkgY2xvYmJlcmluZyBnZW5lcmljIG1vZGVsIGF0dHJpYnV0ZS5cbiAgICAjIEZpbmQgYSBiZXR0ZXIgd2F5IHRvIGRvIHRoaXMuXG4gICAgX2h1bWFuSWRlbnRpZmllcjogQGdldE9wdGlvbignbW9kZWxIdW1hbklkZW50aWZpZXInKSBvciAnbmFtZSdcbiAgdWk6XG4gICAgY29uZmlybV9kZWxldGU6ICcjY29uZmlybS1kZWxldGUtYnV0dG9uJ1xuICAgIGNhbmNlbF9idXR0b246ICcjY2FuY2VsLWRlbGV0ZS1idXR0b24nXG4gICAgXG4gIGV2ZW50czogLT5cbiAgICAnY2xpY2sgQHVpLmNvbmZpcm1fZGVsZXRlJzogJ2NvbmZpcm1fZGVsZXRlJ1xuXG4gIGNvbmZpcm1fZGVsZXRlOiAtPlxuICAgIG5hbWUgPSBAbW9kZWwuZ2V0ICduYW1lJ1xuICAgIHJlc3BvbnNlID0gQG1vZGVsLmRlc3Ryb3koKVxuICAgIHJlc3BvbnNlLmRvbmUgLT5cbiAgICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ3N1Y2Nlc3MnLCBcIiN7bmFtZX0gZGVsZXRlZC5cIixcbiAgICByZXNwb25zZS5mYWlsIC0+XG4gICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICdkYW5nZXInLCBcIiN7bmFtZX0gTk9UIGRlbGV0ZWQuXCJcbiAgICAgIFxubW9kdWxlLmV4cG9ydHMgPSBDb25maXJtRGVsZXRlTW9kYWxcblxuIl19
