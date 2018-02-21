var Backbone, ConfirmDeleteModal, ConfirmDeleteTemplate, MainChannel, Marionette, MessageChannel, modal_close_button, tc;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

tc = require('teacup');

({modal_close_button} = require('./templates/buttons'));

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

// FIXME, this depends on the model having a "name" attribute
ConfirmDeleteTemplate = tc.renderable(function(model) {
  return tc.div('.modal-dialog', function() {
    return tc.div('.modal-content', function() {
      tc.h3(`Do you really want to delete ${model._humanIdentifier}?`);
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
  class ConfirmDeleteModal extends Backbone.Marionette.View {
    templateContext() {
      return {
        // FIXME this is underscored to hopefully
        // keep from potentially clobbering generic model attribute.
        // Find a better way to do this.
        _humanIdentifier: this.getOption('modelHumanIdentifier') || 'name'
      };
    }

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

module.exports = ConfirmDeleteModal;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLW5hbWVkLW1vZGVsLmpzIiwic291cmNlcyI6WyJkZWxldGUtbmFtZWQtbW9kZWwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsUUFBQSxFQUFBLGtCQUFBLEVBQUEscUJBQUEsRUFBQSxXQUFBLEVBQUEsVUFBQSxFQUFBLGNBQUEsRUFBQSxrQkFBQSxFQUFBOztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFDWCxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUNiLEVBQUEsR0FBSyxPQUFBLENBQVEsUUFBUjs7QUFFTCxDQUFBLENBQUUsa0JBQUYsQ0FBQSxHQUF5QixPQUFBLENBQVEscUJBQVIsQ0FBekI7O0FBRUEsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDZCxjQUFBLEdBQWlCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixVQUF2QixFQVBqQjs7O0FBVUEscUJBQUEsR0FBd0IsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO1NBQ3BDLEVBQUUsQ0FBQyxHQUFILENBQU8sZUFBUCxFQUF3QixRQUFBLENBQUEsQ0FBQTtXQUN0QixFQUFFLENBQUMsR0FBSCxDQUFPLGdCQUFQLEVBQXlCLFFBQUEsQ0FBQSxDQUFBO01BQ3ZCLEVBQUUsQ0FBQyxFQUFILENBQU0sQ0FBQSw2QkFBQSxDQUFBLENBQWdDLEtBQUssQ0FBQyxnQkFBdEMsQ0FBdUQsQ0FBdkQsQ0FBTjtNQUNBLEVBQUUsQ0FBQyxHQUFILENBQU8sYUFBUCxFQUFzQixRQUFBLENBQUEsQ0FBQTtlQUNwQixFQUFFLENBQUMsR0FBSCxDQUFPLG9CQUFQO01BRG9CLENBQXRCO2FBRUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyxlQUFQLEVBQXdCLFFBQUEsQ0FBQSxDQUFBO2VBQ3RCLEVBQUUsQ0FBQyxFQUFILENBQU0sY0FBTixFQUFzQixRQUFBLENBQUEsQ0FBQTtBQUNwQixjQUFBO1VBQUEsUUFBQSxHQUFXO1VBQ1gsRUFBRSxDQUFDLEVBQUgsQ0FBTSx3QkFBTixFQUFnQyxRQUFBLENBQUEsQ0FBQTttQkFDOUIsa0JBQUEsQ0FBbUIsSUFBbkIsRUFBeUIsT0FBekI7VUFEOEIsQ0FBaEM7aUJBRUEsRUFBRSxDQUFDLEVBQUgsQ0FBTSx1QkFBTixFQUErQixRQUFBLENBQUEsQ0FBQTttQkFDN0Isa0JBQUEsQ0FBbUIsUUFBbkI7VUFENkIsQ0FBL0I7UUFKb0IsQ0FBdEI7TUFEc0IsQ0FBeEI7SUFKdUIsQ0FBekI7RUFEc0IsQ0FBeEI7QUFEb0MsQ0FBZDs7QUFlbEI7RUFBTixNQUFBLG1CQUFBLFFBQWlDLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBckQ7SUFFRSxlQUFpQixDQUFBLENBQUE7YUFJZixDQUFBOzs7O1FBQUEsZ0JBQUEsRUFBa0IsSUFBQyxDQUFBLFNBQUQsQ0FBVyxzQkFBWCxDQUFBLElBQXNDO01BQXhEO0lBSmU7O0lBU2pCLE1BQVEsQ0FBQSxDQUFBO2FBQ047UUFBQSwwQkFBQSxFQUE0QjtNQUE1QjtJQURNOztJQUdSLGNBQWdCLENBQUEsQ0FBQTtBQUNkLFVBQUEsSUFBQSxFQUFBO01BQUEsSUFBQSxHQUFPLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLE1BQVg7TUFDUCxRQUFBLEdBQVcsSUFBQyxDQUFBLEtBQUssQ0FBQyxPQUFQLENBQUE7TUFDWCxRQUFRLENBQUMsSUFBVCxDQUFjLFFBQUEsQ0FBQSxDQUFBO2VBQ1osY0FBYyxDQUFDLE9BQWYsQ0FBdUIsU0FBdkIsRUFBa0MsQ0FBQSxDQUFBLENBQUcsSUFBSCxDQUFRLFNBQVIsQ0FBbEM7TUFEWSxDQUFkO2FBRUEsUUFBUSxDQUFDLElBQVQsQ0FBYyxRQUFBLENBQUEsQ0FBQTtlQUNaLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFFBQXZCLEVBQWlDLENBQUEsQ0FBQSxDQUFHLElBQUgsQ0FBUSxhQUFSLENBQWpDO01BRFksQ0FBZDtJQUxjOztFQWRsQjs7K0JBQ0UsUUFBQSxHQUFVOzsrQkFNVixFQUFBLEdBQ0U7SUFBQSxjQUFBLEVBQWdCLHdCQUFoQjtJQUNBLGFBQUEsRUFBZTtFQURmOzs7Ozs7QUFjSixNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5NYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbnRjID0gcmVxdWlyZSAndGVhY3VwJ1xuXG57IG1vZGFsX2Nsb3NlX2J1dHRvbiB9ID0gcmVxdWlyZSAnLi90ZW1wbGF0ZXMvYnV0dG9ucydcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5NZXNzYWdlQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG4jIEZJWE1FLCB0aGlzIGRlcGVuZHMgb24gdGhlIG1vZGVsIGhhdmluZyBhIFwibmFtZVwiIGF0dHJpYnV0ZVxuQ29uZmlybURlbGV0ZVRlbXBsYXRlID0gdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gIHRjLmRpdiAnLm1vZGFsLWRpYWxvZycsIC0+XG4gICAgdGMuZGl2ICcubW9kYWwtY29udGVudCcsIC0+XG4gICAgICB0Yy5oMyBcIkRvIHlvdSByZWFsbHkgd2FudCB0byBkZWxldGUgI3ttb2RlbC5faHVtYW5JZGVudGlmaWVyfT9cIlxuICAgICAgdGMuZGl2ICcubW9kYWwtYm9keScsIC0+XG4gICAgICAgIHRjLmRpdiAnI3NlbGVjdGVkLWNoaWxkcmVuJ1xuICAgICAgdGMuZGl2ICcubW9kYWwtZm9vdGVyJywgLT5cbiAgICAgICAgdGMudWwgJy5saXN0LWlubGluZScsIC0+XG4gICAgICAgICAgYnRuY2xhc3MgPSAnYnRuLmJ0bi1kZWZhdWx0LmJ0bi1zbSdcbiAgICAgICAgICB0Yy5saSBcIiNjb25maXJtLWRlbGV0ZS1idXR0b25cIiwgLT5cbiAgICAgICAgICAgIG1vZGFsX2Nsb3NlX2J1dHRvbiAnT0snLCAnY2hlY2snXG4gICAgICAgICAgdGMubGkgXCIjY2FuY2VsLWRlbGV0ZS1idXR0b25cIiwgLT5cbiAgICAgICAgICAgIG1vZGFsX2Nsb3NlX2J1dHRvbiAnQ2FuY2VsJ1xuICAgIFxuXG5jbGFzcyBDb25maXJtRGVsZXRlTW9kYWwgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLlZpZXdcbiAgdGVtcGxhdGU6IENvbmZpcm1EZWxldGVUZW1wbGF0ZVxuICB0ZW1wbGF0ZUNvbnRleHQ6IC0+XG4gICAgIyBGSVhNRSB0aGlzIGlzIHVuZGVyc2NvcmVkIHRvIGhvcGVmdWxseVxuICAgICMga2VlcCBmcm9tIHBvdGVudGlhbGx5IGNsb2JiZXJpbmcgZ2VuZXJpYyBtb2RlbCBhdHRyaWJ1dGUuXG4gICAgIyBGaW5kIGEgYmV0dGVyIHdheSB0byBkbyB0aGlzLlxuICAgIF9odW1hbklkZW50aWZpZXI6IEBnZXRPcHRpb24oJ21vZGVsSHVtYW5JZGVudGlmaWVyJykgb3IgJ25hbWUnXG4gIHVpOlxuICAgIGNvbmZpcm1fZGVsZXRlOiAnI2NvbmZpcm0tZGVsZXRlLWJ1dHRvbidcbiAgICBjYW5jZWxfYnV0dG9uOiAnI2NhbmNlbC1kZWxldGUtYnV0dG9uJ1xuICAgIFxuICBldmVudHM6IC0+XG4gICAgJ2NsaWNrIEB1aS5jb25maXJtX2RlbGV0ZSc6ICdjb25maXJtX2RlbGV0ZSdcblxuICBjb25maXJtX2RlbGV0ZTogLT5cbiAgICBuYW1lID0gQG1vZGVsLmdldCAnbmFtZSdcbiAgICByZXNwb25zZSA9IEBtb2RlbC5kZXN0cm95KClcbiAgICByZXNwb25zZS5kb25lIC0+XG4gICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICdzdWNjZXNzJywgXCIje25hbWV9IGRlbGV0ZWQuXCIsXG4gICAgcmVzcG9uc2UuZmFpbCAtPlxuICAgICAgTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnZGFuZ2VyJywgXCIje25hbWV9IE5PVCBkZWxldGVkLlwiXG4gICAgICBcbm1vZHVsZS5leHBvcnRzID0gQ29uZmlybURlbGV0ZU1vZGFsXG5cbiJdfQ==
