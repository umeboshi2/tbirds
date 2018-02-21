var $, Backbone, IsEscapeModal, Marionette,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

$ = require('jquery');

Backbone = require('backbone');

Marionette = require('backbone.marionette');

IsEscapeModal = (function() {
  class IsEscapeModal extends Marionette.Behavior {
    constructor() {
      super(...arguments);
      this.keydownHandler = this.keydownHandler.bind(this);
    }

    keydownHandler(event_object) {
      var keyCode;
      boundMethodCheck(this, IsEscapeModal);
      keyCode = event_object.keyCode;
      // handle escape('esc') key
      if (keyCode === 27) {
        // NOTE sending click to the children
        // since @ui.close_btn may just be a
        // container for the modal_close_button
        this.ui.close_btn.children().click();
        // NOTE
        // we make sure that we unbind the keydownHandler
        // @onBeforeDestroy seems to be skipped on keypress
        return $('html').unbind('keydown', this.keydownHandler);
      }
    }

    onDomRefresh() {
      return $('html').keydown(this.keydownHandler);
    }

    onBeforeDestroy() {
      return $('html').unbind('keydown', this.keydownHandler);
    }

  };

  IsEscapeModal.prototype.events = {
    'click @ui.close_btn': 'onBeforeDestroy'
  };

  return IsEscapeModal;

}).call(this);

module.exports = IsEscapeModal;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVoYXZpb3JzL2lzLWVzY2FwZS1tb2RhbC5qcyIsInNvdXJjZXMiOlsiYmVoYXZpb3JzL2lzLWVzY2FwZS1tb2RhbC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxDQUFBLEVBQUEsUUFBQSxFQUFBLGFBQUEsRUFBQSxVQUFBO0VBQUE7O0FBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxRQUFSOztBQUNKLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFDWCxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUVQO0VBQU4sTUFBQSxjQUFBLFFBQTRCLFVBQVUsQ0FBQyxTQUF2Qzs7O1VBR0UsQ0FBQSxxQkFBQSxDQUFBOzs7SUFBQSxjQUFnQixDQUFDLFlBQUQsQ0FBQTtBQUNkLFVBQUE7NkJBSkU7TUFJRixPQUFBLEdBQVUsWUFBWSxDQUFDLFFBQXZCOztNQUVBLElBQUcsT0FBQSxLQUFXLEVBQWQ7Ozs7UUFJRSxJQUFDLENBQUEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFkLENBQUEsQ0FBd0IsQ0FBQyxLQUF6QixDQUFBLEVBQUE7Ozs7ZUFJQSxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsTUFBVixDQUFpQixTQUFqQixFQUE0QixJQUFDLENBQUEsY0FBN0IsRUFSRjs7SUFIYzs7SUFZaEIsWUFBYyxDQUFBLENBQUE7YUFDWixDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsT0FBVixDQUFrQixJQUFDLENBQUEsY0FBbkI7SUFEWTs7SUFFZCxlQUFpQixDQUFBLENBQUE7YUFDZixDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsTUFBVixDQUFpQixTQUFqQixFQUE0QixJQUFDLENBQUEsY0FBN0I7SUFEZTs7RUFqQm5COzswQkFDRSxNQUFBLEdBQ0U7SUFBQSxxQkFBQSxFQUF1QjtFQUF2Qjs7Ozs7O0FBa0JKLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiJCA9IHJlcXVpcmUgJ2pxdWVyeSdcbkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5NYXJpb25ldHRlID0gcmVxdWlyZSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuY2xhc3MgSXNFc2NhcGVNb2RhbCBleHRlbmRzIE1hcmlvbmV0dGUuQmVoYXZpb3JcbiAgZXZlbnRzOlxuICAgICdjbGljayBAdWkuY2xvc2VfYnRuJzogJ29uQmVmb3JlRGVzdHJveSdcbiAga2V5ZG93bkhhbmRsZXI6IChldmVudF9vYmplY3QpID0+XG4gICAga2V5Q29kZSA9IGV2ZW50X29iamVjdC5rZXlDb2RlXG4gICAgIyBoYW5kbGUgZXNjYXBlKCdlc2MnKSBrZXlcbiAgICBpZiBrZXlDb2RlID09IDI3XG4gICAgICAjIE5PVEUgc2VuZGluZyBjbGljayB0byB0aGUgY2hpbGRyZW5cbiAgICAgICMgc2luY2UgQHVpLmNsb3NlX2J0biBtYXkganVzdCBiZSBhXG4gICAgICAjIGNvbnRhaW5lciBmb3IgdGhlIG1vZGFsX2Nsb3NlX2J1dHRvblxuICAgICAgQHVpLmNsb3NlX2J0bi5jaGlsZHJlbigpLmNsaWNrKClcbiAgICAgICMgTk9URVxuICAgICAgIyB3ZSBtYWtlIHN1cmUgdGhhdCB3ZSB1bmJpbmQgdGhlIGtleWRvd25IYW5kbGVyXG4gICAgICAjIEBvbkJlZm9yZURlc3Ryb3kgc2VlbXMgdG8gYmUgc2tpcHBlZCBvbiBrZXlwcmVzc1xuICAgICAgJCgnaHRtbCcpLnVuYmluZCAna2V5ZG93bicsIEBrZXlkb3duSGFuZGxlclxuICBvbkRvbVJlZnJlc2g6IC0+XG4gICAgJCgnaHRtbCcpLmtleWRvd24gQGtleWRvd25IYW5kbGVyXG4gIG9uQmVmb3JlRGVzdHJveTogLT5cbiAgICAkKCdodG1sJykudW5iaW5kICdrZXlkb3duJywgQGtleWRvd25IYW5kbGVyXG4gICAgXG5tb2R1bGUuZXhwb3J0cyA9IElzRXNjYXBlTW9kYWxcbiJdfQ==
