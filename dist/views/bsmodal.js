var $, AppChannel, Backbone, BaseModalView, MainChannel, Marionette, MessageChannel,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

$ = require('jquery');

Backbone = require('backbone');

Marionette = require('backbone.marionette');

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

AppChannel = Backbone.Radio.channel('ebcsv');

BaseModalView = (function() {
  class BaseModalView extends Marionette.View {
    constructor() {
      super(...arguments);
      this.keydownHandler = this.keydownHandler.bind(this);
    }

    keydownHandler(event_object) {
      var keyCode;
      boundMethodCheck(this, BaseModalView);
      keyCode = event_object.keyCode;
      //console.log "keyCode", keyCode
      // handle escape('esc') key
      if (keyCode === 27) {
        return this.ui.close_btn.click();
      }
    }

    onDomRefresh() {
      return this.ui.html.keydown(this.keydownHandler);
    }

    onBeforeDestroy() {
      return this.ui.html.unbind('keydown', this.keydownHandler);
    }

  };

  BaseModalView.prototype.ui = {
    html: 'html',
    close_btn: '#close-modal div'
  };

  return BaseModalView;

}).call(this);

module.exports = BaseModalView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvYnNtb2RhbC5qcyIsInNvdXJjZXMiOlsidmlld3MvYnNtb2RhbC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxDQUFBLEVBQUEsVUFBQSxFQUFBLFFBQUEsRUFBQSxhQUFBLEVBQUEsV0FBQSxFQUFBLFVBQUEsRUFBQSxjQUFBO0VBQUE7O0FBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxRQUFSOztBQUNKLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFDWCxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUViLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsY0FBQSxHQUFpQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsVUFBdkI7O0FBQ2pCLFVBQUEsR0FBYSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsT0FBdkI7O0FBRVA7RUFBTixNQUFBLGNBQUEsUUFBNEIsVUFBVSxDQUFDLEtBQXZDOzs7VUFLRSxDQUFBLHFCQUFBLENBQUE7OztJQUFBLGNBQWdCLENBQUMsWUFBRCxDQUFBO0FBQ2QsVUFBQTs2QkFORTtNQU1GLE9BQUEsR0FBVSxZQUFZLENBQUMsUUFBdkI7OztNQUdBLElBQUcsT0FBQSxLQUFXLEVBQWQ7ZUFDRSxJQUFDLENBQUEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxLQUFkLENBQUEsRUFERjs7SUFKYzs7SUFPaEIsWUFBYyxDQUFBLENBQUE7YUFDWixJQUFDLENBQUEsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFULENBQWlCLElBQUMsQ0FBQSxjQUFsQjtJQURZOztJQUdkLGVBQWlCLENBQUEsQ0FBQTthQUNmLElBQUMsQ0FBQSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQVQsQ0FBZ0IsU0FBaEIsRUFBMkIsSUFBQyxDQUFBLGNBQTVCO0lBRGU7O0VBZm5COzswQkFDRSxFQUFBLEdBQ0U7SUFBQSxJQUFBLEVBQU0sTUFBTjtJQUNBLFNBQUEsRUFBVztFQURYOzs7Ozs7QUFnQkosTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIkID0gcmVxdWlyZSAnanF1ZXJ5J1xuQmFja2JvbmUgPSByZXF1aXJlICdiYWNrYm9uZSdcbk1hcmlvbmV0dGUgPSByZXF1aXJlICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5BcHBDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZWJjc3YnXG5cbmNsYXNzIEJhc2VNb2RhbFZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLlZpZXdcbiAgdWk6XG4gICAgaHRtbDogJ2h0bWwnXG4gICAgY2xvc2VfYnRuOiAnI2Nsb3NlLW1vZGFsIGRpdidcbiAgICBcbiAga2V5ZG93bkhhbmRsZXI6IChldmVudF9vYmplY3QpID0+XG4gICAga2V5Q29kZSA9IGV2ZW50X29iamVjdC5rZXlDb2RlXG4gICAgI2NvbnNvbGUubG9nIFwia2V5Q29kZVwiLCBrZXlDb2RlXG4gICAgIyBoYW5kbGUgZXNjYXBlKCdlc2MnKSBrZXlcbiAgICBpZiBrZXlDb2RlID09IDI3XG4gICAgICBAdWkuY2xvc2VfYnRuLmNsaWNrKClcbiAgICAgIFxuICBvbkRvbVJlZnJlc2g6IC0+XG4gICAgQHVpLmh0bWwua2V5ZG93biBAa2V5ZG93bkhhbmRsZXJcblxuICBvbkJlZm9yZURlc3Ryb3k6IC0+XG4gICAgQHVpLmh0bWwudW5iaW5kICdrZXlkb3duJywgQGtleWRvd25IYW5kbGVyXG4gIFxubW9kdWxlLmV4cG9ydHMgPSBCYXNlTW9kYWxWaWV3XG5cblxuIl19
