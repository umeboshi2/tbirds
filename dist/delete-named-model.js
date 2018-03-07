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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLW5hbWVkLW1vZGVsLmpzIiwic291cmNlcyI6WyJkZWxldGUtbmFtZWQtbW9kZWwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsUUFBQSxFQUFBLGtCQUFBLEVBQUEscUJBQUEsRUFBQSxXQUFBLEVBQUEsVUFBQSxFQUFBLGNBQUEsRUFBQSxrQkFBQSxFQUFBOztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFDWCxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUNiLEVBQUEsR0FBSyxPQUFBLENBQVEsUUFBUjs7QUFFTCxDQUFBLENBQUUsa0JBQUYsQ0FBQSxHQUF5QixPQUFBLENBQVEscUJBQVIsQ0FBekI7O0FBRUEsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDZCxjQUFBLEdBQWlCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixVQUF2QixFQVBqQjs7O0FBVUEscUJBQUEsR0FBd0IsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO1NBQ3BDLEVBQUUsQ0FBQyxHQUFILENBQU8sZUFBUCxFQUF3QixRQUFBLENBQUEsQ0FBQTtXQUN0QixFQUFFLENBQUMsR0FBSCxDQUFPLGdCQUFQLEVBQXlCLFFBQUEsQ0FBQSxDQUFBO01BQ3ZCLEVBQUUsQ0FBQyxFQUFILENBQU0sQ0FBQSw2QkFBQSxDQUFBLENBQWdDLEtBQUssQ0FBQyxnQkFBdEMsQ0FBdUQsQ0FBdkQsQ0FBTjtNQUNBLEVBQUUsQ0FBQyxHQUFILENBQU8sYUFBUCxFQUFzQixRQUFBLENBQUEsQ0FBQTtlQUNwQixFQUFFLENBQUMsR0FBSCxDQUFPLG9CQUFQO01BRG9CLENBQXRCO2FBRUEsRUFBRSxDQUFDLEdBQUgsQ0FBTyxlQUFQLEVBQXdCLFFBQUEsQ0FBQSxDQUFBO2VBQ3RCLEVBQUUsQ0FBQyxFQUFILENBQU0sY0FBTixFQUFzQixRQUFBLENBQUEsQ0FBQTtBQUNwQixjQUFBO1VBQUEsUUFBQSxHQUFXO1VBQ1gsRUFBRSxDQUFDLEVBQUgsQ0FBTSx3QkFBTixFQUFnQyxRQUFBLENBQUEsQ0FBQTttQkFDOUIsa0JBQUEsQ0FBbUIsSUFBbkIsRUFBeUIsT0FBekI7VUFEOEIsQ0FBaEM7aUJBRUEsRUFBRSxDQUFDLEVBQUgsQ0FBTSx1QkFBTixFQUErQixRQUFBLENBQUEsQ0FBQTttQkFDN0Isa0JBQUEsQ0FBbUIsUUFBbkI7VUFENkIsQ0FBL0I7UUFKb0IsQ0FBdEI7TUFEc0IsQ0FBeEI7SUFKdUIsQ0FBekI7RUFEc0IsQ0FBeEI7QUFEb0MsQ0FBZDs7QUFlbEI7RUFBTixNQUFBLG1CQUFBLFFBQWlDLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBckQ7SUFFRSxlQUFpQixDQUFBLENBQUE7YUFJZixDQUFBOzs7O1FBQUEsZ0JBQUEsRUFBa0IsSUFBQyxDQUFBLFNBQUQsQ0FBVyxzQkFBWCxDQUFBLElBQXNDO01BQXhEO0lBSmU7O0lBU2pCLE1BQVEsQ0FBQSxDQUFBO2FBQ047UUFBQSwwQkFBQSxFQUE0QjtNQUE1QjtJQURNOztJQUdSLGNBQWdCLENBQUEsQ0FBQTtBQUNkLFVBQUEsSUFBQSxFQUFBO01BQUEsSUFBQSxHQUFPLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLE1BQVg7TUFDUCxRQUFBLEdBQVcsSUFBQyxDQUFBLEtBQUssQ0FBQyxPQUFQLENBQUE7TUFDWCxRQUFRLENBQUMsSUFBVCxDQUFjLFFBQUEsQ0FBQSxDQUFBO2VBQ1osY0FBYyxDQUFDLE9BQWYsQ0FBdUIsU0FBdkIsRUFBa0MsQ0FBQSxDQUFBLENBQUcsSUFBSCxDQUFRLFNBQVIsQ0FBbEM7TUFEWSxDQUFkO2FBRUEsUUFBUSxDQUFDLElBQVQsQ0FBYyxRQUFBLENBQUEsQ0FBQTtlQUNaLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFFBQXZCLEVBQWlDLENBQUEsQ0FBQSxDQUFHLElBQUgsQ0FBUSxhQUFSLENBQWpDO01BRFksQ0FBZDtJQUxjOztFQWRsQjs7K0JBQ0UsUUFBQSxHQUFVOzsrQkFNVixFQUFBLEdBQ0U7SUFBQSxjQUFBLEVBQWdCLHdCQUFoQjtJQUNBLGFBQUEsRUFBZTtFQURmOzs7Ozs7QUFjSixNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5NYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbnRjID0gcmVxdWlyZSAndGVhY3VwJ1xuXG57IG1vZGFsX2Nsb3NlX2J1dHRvbiB9ID0gcmVxdWlyZSAnLi90ZW1wbGF0ZXMvYnV0dG9ucydcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5NZXNzYWdlQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuXG4jIEZJWE1FLCB0aGlzIGRlcGVuZHMgb24gdGhlIG1vZGVsIGhhdmluZyBhIFwibmFtZVwiIGF0dHJpYnV0ZVxuQ29uZmlybURlbGV0ZVRlbXBsYXRlID0gdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gIHRjLmRpdiAnLm1vZGFsLWRpYWxvZycsIC0+XG4gICAgdGMuZGl2ICcubW9kYWwtY29udGVudCcsIC0+XG4gICAgICB0Yy5oMyBcIkRvIHlvdSByZWFsbHkgd2FudCB0byBkZWxldGUgI3ttb2RlbC5faHVtYW5JZGVudGlmaWVyfT9cIlxuICAgICAgdGMuZGl2ICcubW9kYWwtYm9keScsIC0+XG4gICAgICAgIHRjLmRpdiAnI3NlbGVjdGVkLWNoaWxkcmVuJ1xuICAgICAgdGMuZGl2ICcubW9kYWwtZm9vdGVyJywgLT5cbiAgICAgICAgdGMudWwgJy5saXN0LWlubGluZScsIC0+XG4gICAgICAgICAgYnRuY2xhc3MgPSAnYnRuLmJ0bi1zZWNvbmRhcnkuYnRuLXNtJ1xuICAgICAgICAgIHRjLmxpIFwiI2NvbmZpcm0tZGVsZXRlLWJ1dHRvblwiLCAtPlxuICAgICAgICAgICAgbW9kYWxfY2xvc2VfYnV0dG9uICdPSycsICdjaGVjaydcbiAgICAgICAgICB0Yy5saSBcIiNjYW5jZWwtZGVsZXRlLWJ1dHRvblwiLCAtPlxuICAgICAgICAgICAgbW9kYWxfY2xvc2VfYnV0dG9uICdDYW5jZWwnXG4gICAgXG5cbmNsYXNzIENvbmZpcm1EZWxldGVNb2RhbCBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogQ29uZmlybURlbGV0ZVRlbXBsYXRlXG4gIHRlbXBsYXRlQ29udGV4dDogLT5cbiAgICAjIEZJWE1FIHRoaXMgaXMgdW5kZXJzY29yZWQgdG8gaG9wZWZ1bGx5XG4gICAgIyBrZWVwIGZyb20gcG90ZW50aWFsbHkgY2xvYmJlcmluZyBnZW5lcmljIG1vZGVsIGF0dHJpYnV0ZS5cbiAgICAjIEZpbmQgYSBiZXR0ZXIgd2F5IHRvIGRvIHRoaXMuXG4gICAgX2h1bWFuSWRlbnRpZmllcjogQGdldE9wdGlvbignbW9kZWxIdW1hbklkZW50aWZpZXInKSBvciAnbmFtZSdcbiAgdWk6XG4gICAgY29uZmlybV9kZWxldGU6ICcjY29uZmlybS1kZWxldGUtYnV0dG9uJ1xuICAgIGNhbmNlbF9idXR0b246ICcjY2FuY2VsLWRlbGV0ZS1idXR0b24nXG4gICAgXG4gIGV2ZW50czogLT5cbiAgICAnY2xpY2sgQHVpLmNvbmZpcm1fZGVsZXRlJzogJ2NvbmZpcm1fZGVsZXRlJ1xuXG4gIGNvbmZpcm1fZGVsZXRlOiAtPlxuICAgIG5hbWUgPSBAbW9kZWwuZ2V0ICduYW1lJ1xuICAgIHJlc3BvbnNlID0gQG1vZGVsLmRlc3Ryb3koKVxuICAgIHJlc3BvbnNlLmRvbmUgLT5cbiAgICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ3N1Y2Nlc3MnLCBcIiN7bmFtZX0gZGVsZXRlZC5cIixcbiAgICByZXNwb25zZS5mYWlsIC0+XG4gICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICdkYW5nZXInLCBcIiN7bmFtZX0gTk9UIGRlbGV0ZWQuXCJcbiAgICAgIFxubW9kdWxlLmV4cG9ydHMgPSBDb25maXJtRGVsZXRlTW9kYWxcblxuIl19
