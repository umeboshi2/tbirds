var ConfirmDeleteModal, MainChannel, MessageChannel;

import {
  Radio
} from 'backbone';

import {
  View as MnView
} from 'backbone.marionette';

import tc from 'teacup';

MainChannel = Radio.channel('global');

MessageChannel = Radio.channel('messages');

ConfirmDeleteModal = (function() {
  class ConfirmDeleteModal extends MnView {
    events() {
      return {
        'click @ui.submitBtn': 'confirmDelete'
      };
    }

    confirmDelete() {
      var response;
      console.log('delete', this.model);
      response = this.model.destroy();
      response.fail(function() {
        return MessageChannel.request('xhr-error', response);
      });
      return response.done(function() {
        return MainChannel.request('main:app:empty-modal');
      });
    }

  };

  ConfirmDeleteModal.prototype.template = tc.renderable(function(model) {
    var name;
    name = model.name || "this model";
    return tc.div('.modal-dialog', function() {
      return tc.div('.modal-content', function() {
        tc.h3(`Delete ${name}?`);
        tc.div('.modal-body', function() {
          return tc.div('.selected-children');
        });
        return tc.div('.modal-footer', function() {
          tc.button('.btn.btn-warning.fa.fa-close.mr-auto', {
            data: {
              dismiss: 'modal'
            }
          }, 'Cancel');
          return tc.button('.btn.btn-primary.ml-auto.submit-btn', "Delete");
        });
      });
    });
  });

  ConfirmDeleteModal.prototype.ui = {
    submitBtn: '.submit-btn'
  };

  return ConfirmDeleteModal;

}).call(this);

export default ConfirmDeleteModal;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvY29uZmlybS1kZWxldGUtbW9kYWwuanMiLCJzb3VyY2VzIjpbInZpZXdzL2NvbmZpcm0tZGVsZXRlLW1vZGFsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLGtCQUFBLEVBQUEsV0FBQSxFQUFBOztBQUFBLE9BQUE7RUFBUyxLQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsSUFBQSxVQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQTs7QUFFQSxXQUFBLEdBQWMsS0FBSyxDQUFDLE9BQU4sQ0FBYyxRQUFkOztBQUNkLGNBQUEsR0FBaUIsS0FBSyxDQUFDLE9BQU4sQ0FBYyxVQUFkOztBQUVYO0VBQU4sTUFBQSxtQkFBQSxRQUFpQyxPQUFqQztJQWNFLE1BQVEsQ0FBQSxDQUFBO2FBQ047UUFBQSxxQkFBQSxFQUF1QjtNQUF2QjtJQURNOztJQUdSLGFBQWUsQ0FBQSxDQUFBO0FBQ2pCLFVBQUE7TUFBSSxPQUFPLENBQUMsR0FBUixDQUFZLFFBQVosRUFBc0IsSUFBQyxDQUFBLEtBQXZCO01BQ0EsUUFBQSxHQUFXLElBQUMsQ0FBQSxLQUFLLENBQUMsT0FBUCxDQUFBO01BQ1gsUUFBUSxDQUFDLElBQVQsQ0FBYyxRQUFBLENBQUEsQ0FBQTtlQUNaLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFdBQXZCLEVBQW9DLFFBQXBDO01BRFksQ0FBZDthQUVBLFFBQVEsQ0FBQyxJQUFULENBQWMsUUFBQSxDQUFBLENBQUE7ZUFDWixXQUFXLENBQUMsT0FBWixDQUFvQixzQkFBcEI7TUFEWSxDQUFkO0lBTGE7O0VBakJqQjs7K0JBQ0UsUUFBQSxHQUFVLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLEtBQUQsQ0FBQTtBQUMxQixRQUFBO0lBQUksSUFBQSxHQUFPLEtBQUssQ0FBQyxJQUFOLElBQWM7V0FDckIsRUFBRSxDQUFDLEdBQUgsQ0FBTyxlQUFQLEVBQXdCLFFBQUEsQ0FBQSxDQUFBO2FBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sZ0JBQVAsRUFBeUIsUUFBQSxDQUFBLENBQUE7UUFDdkIsRUFBRSxDQUFDLEVBQUgsQ0FBTSxDQUFBLE9BQUEsQ0FBQSxDQUFVLElBQVYsQ0FBQSxDQUFBLENBQU47UUFDQSxFQUFFLENBQUMsR0FBSCxDQUFPLGFBQVAsRUFBc0IsUUFBQSxDQUFBLENBQUE7aUJBQ3BCLEVBQUUsQ0FBQyxHQUFILENBQU8sb0JBQVA7UUFEb0IsQ0FBdEI7ZUFFQSxFQUFFLENBQUMsR0FBSCxDQUFPLGVBQVAsRUFBd0IsUUFBQSxDQUFBLENBQUE7VUFDdEIsRUFBRSxDQUFDLE1BQUgsQ0FBVSxzQ0FBVixFQUNBO1lBQUEsSUFBQSxFQUFLO2NBQUEsT0FBQSxFQUFRO1lBQVI7VUFBTCxDQURBLEVBQ3NCLFFBRHRCO2lCQUVBLEVBQUUsQ0FBQyxNQUFILENBQVUscUNBQVYsRUFBaUQsUUFBakQ7UUFIc0IsQ0FBeEI7TUFKdUIsQ0FBekI7SUFEc0IsQ0FBeEI7RUFGc0IsQ0FBZDs7K0JBV1YsRUFBQSxHQUNFO0lBQUEsU0FBQSxFQUFXO0VBQVg7Ozs7OztBQVlKLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJhZGlvIH0gZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgeyBWaWV3IGFzIE1uVmlldyB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuXG5NYWluQ2hhbm5lbCA9IFJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5cbmNsYXNzIENvbmZpcm1EZWxldGVNb2RhbCBleHRlbmRzIE1uVmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgbmFtZSA9IG1vZGVsLm5hbWUgb3IgXCJ0aGlzIG1vZGVsXCJcbiAgICB0Yy5kaXYgJy5tb2RhbC1kaWFsb2cnLCAtPlxuICAgICAgdGMuZGl2ICcubW9kYWwtY29udGVudCcsIC0+XG4gICAgICAgIHRjLmgzIFwiRGVsZXRlICN7bmFtZX0/XCJcbiAgICAgICAgdGMuZGl2ICcubW9kYWwtYm9keScsIC0+XG4gICAgICAgICAgdGMuZGl2ICcuc2VsZWN0ZWQtY2hpbGRyZW4nXG4gICAgICAgIHRjLmRpdiAnLm1vZGFsLWZvb3RlcicsIC0+XG4gICAgICAgICAgdGMuYnV0dG9uICcuYnRuLmJ0bi13YXJuaW5nLmZhLmZhLWNsb3NlLm1yLWF1dG8nLFxuICAgICAgICAgIGRhdGE6ZGlzbWlzczonbW9kYWwnLCAnQ2FuY2VsJ1xuICAgICAgICAgIHRjLmJ1dHRvbiAnLmJ0bi5idG4tcHJpbWFyeS5tbC1hdXRvLnN1Ym1pdC1idG4nLCBcIkRlbGV0ZVwiXG4gIHVpOlxuICAgIHN1Ym1pdEJ0bjogJy5zdWJtaXQtYnRuJ1xuICBldmVudHM6IC0+XG4gICAgJ2NsaWNrIEB1aS5zdWJtaXRCdG4nOiAnY29uZmlybURlbGV0ZSdcblxuICBjb25maXJtRGVsZXRlOiAtPlxuICAgIGNvbnNvbGUubG9nICdkZWxldGUnLCBAbW9kZWxcbiAgICByZXNwb25zZSA9IEBtb2RlbC5kZXN0cm95KClcbiAgICByZXNwb25zZS5mYWlsIC0+XG4gICAgICBNZXNzYWdlQ2hhbm5lbC5yZXF1ZXN0ICd4aHItZXJyb3InLCByZXNwb25zZVxuICAgIHJlc3BvbnNlLmRvbmUgLT5cbiAgICAgIE1haW5DaGFubmVsLnJlcXVlc3QgJ21haW46YXBwOmVtcHR5LW1vZGFsJ1xuICAgICAgXG5leHBvcnQgZGVmYXVsdCBDb25maXJtRGVsZXRlTW9kYWxcbiJdfQ==
