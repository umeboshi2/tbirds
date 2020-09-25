var IsEscapeModal, MainChannel,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

import $ from 'jquery';

import {
  Radio
} from 'backbone';

import {
  Behavior
} from 'backbone.marionette';

MainChannel = Radio.channel('global');

IsEscapeModal = class IsEscapeModal extends Behavior {
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
      // we don't need to listen anymore
      $('html').unbind('keydown', this.keydownHandler);
      return this.emptyModal();
    }
  }

  onDomRefresh() {
    return $('html').keydown(this.keydownHandler);
  }

  onBeforeDestroy() {
    return $('html').unbind('keydown', this.keydownHandler);
  }

  emptyModal() {
    var region;
    region = MainChannel.request('main:app:modal-region');
    return region.empty();
  }

};

export default IsEscapeModal;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVoYXZpb3JzL2lzLWVzY2FwZS1tb2RhbC5qcyIsInNvdXJjZXMiOlsiYmVoYXZpb3JzL2lzLWVzY2FwZS1tb2RhbC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxhQUFBLEVBQUEsV0FBQTtFQUFBOztBQUFBLE9BQU8sQ0FBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxLQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsUUFBVDtDQUFBLE1BQUE7O0FBRUEsV0FBQSxHQUFjLEtBQUssQ0FBQyxPQUFOLENBQWMsUUFBZDs7QUFFUixnQkFBTixNQUFBLGNBQUEsUUFBNEIsU0FBNUI7OztRQUNFLENBQUEscUJBQUEsQ0FBQTs7O0VBQUEsY0FBZ0IsQ0FBQyxZQUFELENBQUE7QUFDZCxRQUFBOzJCQUZFO0lBRUYsT0FBQSxHQUFVLFlBQVksQ0FBQyxRQUF2Qjs7SUFFQSxJQUFHLE9BQUEsS0FBVyxFQUFkOztNQUVFLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxNQUFWLENBQWlCLFNBQWpCLEVBQTRCLElBQUMsQ0FBQSxjQUE3QjthQUNBLElBQUMsQ0FBQSxVQUFELENBQUEsRUFIRjs7RUFIYzs7RUFPaEIsWUFBYyxDQUFBLENBQUE7V0FDWixDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsT0FBVixDQUFrQixJQUFDLENBQUEsY0FBbkI7RUFEWTs7RUFFZCxlQUFpQixDQUFBLENBQUE7V0FDZixDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsTUFBVixDQUFpQixTQUFqQixFQUE0QixJQUFDLENBQUEsY0FBN0I7RUFEZTs7RUFFakIsVUFBWSxDQUFBLENBQUE7QUFDVixRQUFBO0lBQUEsTUFBQSxHQUFTLFdBQVcsQ0FBQyxPQUFaLENBQW9CLHVCQUFwQjtXQUNULE1BQU0sQ0FBQyxLQUFQLENBQUE7RUFGVTs7QUFaZDs7QUFnQkEsT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuaW1wb3J0IHsgUmFkaW8gfSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCB7IEJlaGF2aW9yIH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcblxuTWFpbkNoYW5uZWwgPSBSYWRpby5jaGFubmVsICdnbG9iYWwnXG5cbmNsYXNzIElzRXNjYXBlTW9kYWwgZXh0ZW5kcyBCZWhhdmlvclxuICBrZXlkb3duSGFuZGxlcjogKGV2ZW50X29iamVjdCkgPT5cbiAgICBrZXlDb2RlID0gZXZlbnRfb2JqZWN0LmtleUNvZGVcbiAgICAjIGhhbmRsZSBlc2NhcGUoJ2VzYycpIGtleVxuICAgIGlmIGtleUNvZGUgPT0gMjdcbiAgICAgICMgd2UgZG9uJ3QgbmVlZCB0byBsaXN0ZW4gYW55bW9yZVxuICAgICAgJCgnaHRtbCcpLnVuYmluZCAna2V5ZG93bicsIEBrZXlkb3duSGFuZGxlclxuICAgICAgQGVtcHR5TW9kYWwoKVxuICBvbkRvbVJlZnJlc2g6IC0+XG4gICAgJCgnaHRtbCcpLmtleWRvd24gQGtleWRvd25IYW5kbGVyXG4gIG9uQmVmb3JlRGVzdHJveTogLT5cbiAgICAkKCdodG1sJykudW5iaW5kICdrZXlkb3duJywgQGtleWRvd25IYW5kbGVyXG4gIGVtcHR5TW9kYWw6IC0+XG4gICAgcmVnaW9uID0gTWFpbkNoYW5uZWwucmVxdWVzdCAnbWFpbjphcHA6bW9kYWwtcmVnaW9uJ1xuICAgIHJlZ2lvbi5lbXB0eSgpXG5cbmV4cG9ydCBkZWZhdWx0IElzRXNjYXBlTW9kYWxcbiJdfQ==
