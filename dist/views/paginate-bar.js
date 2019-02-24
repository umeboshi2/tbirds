var MainChannel, MessageChannel, PaginationView, numberedPageItem,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

import $ from 'jquery';

import Backbone from 'backbone';

import {
  View
} from 'backbone.marionette';

import tc from 'teacup';

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

numberedPageItem = function(p) {
  tc.li('.page-item', function() {});
  return tc.a('.numbered-page.page-link.bg-body-d5.text-dark', {
    href: '#',
    data: {
      pageNumber: p
    }
  }, p);
};

export default PaginationView = (function() {
  // this needs to be contained in a 'nav' region
  class PaginationView extends View {
    constructor() {
      super(...arguments);
      this.keydownHandler = this.keydownHandler.bind(this);
    }

    options() {
      return {
        setKeyHandler: false,
        barLength: 15,
        barStopAt: 7
      };
    }

    templateContext() {
      return {
        collection: this.collection,
        barLength: this.getOption('barLength'),
        barStopAt: this.getOption('barStopAt')
      };
    }

    onDomRefresh() {
      return this.updateNavButtons();
    }

    turnPage(event) {
      var el, pageNumber;
      event.preventDefault();
      el = $(event.target);
      pageNumber = el.attr('data-pagenumber');
      this.collection.getPage(Number(pageNumber));
      return this.updateNavButtons();
    }

    updateNavButtons() {
      var cp, cpp, nextItem, prevItem, state;
      state = this.collection.state;
      prevItem = this.ui.prevButton.parent();
      if (state.currentPage === state.firstPage) {
        if (!prevItem.hasClass('disabled')) {
          prevItem.addClass('disabled');
        }
      } else {
        if (prevItem.hasClass('disabled')) {
          prevItem.removeClass('disabled');
        }
      }
      nextItem = this.ui.nextButton.parent();
      if (state.currentPage === state.lastPage) {
        if (!nextItem.hasClass('disabled')) {
          nextItem.addClass('disabled');
        }
      } else {
        if (nextItem.addClass('disabled')) {
          nextItem.removeClass('disabled');
        }
      }
      this.ui.numberedPage.parent().removeClass('active');
      this.ui.numberedPage.removeClass('text-white');
      this.ui.numberedPage.addClass('text-dark');
      cp = $(`[data-pagenumber="${state.currentPage}"]`);
      cpp = cp.parent();
      cpp.addClass('active');
      cp.removeClass('text-dark');
      return cp.addClass('text-white');
    }

    getAnotherPage(direction) {
      var onFirstPage, onLastPage, resp, state;
      state = this.collection.state;
      onLastPage = state.currentPage === state.lastPage;
      // we need this in case the pages start at zero
      onFirstPage = state.currentPage === state.firstPage;
      if (direction === 'prev' && !onFirstPage) {
        if (state.currentPage !== state.firstPage) {
          resp = this.collection.getPreviousPage();
        }
      } else if (direction === 'next' && !onLastPage) {
        resp = this.collection.getNextPage();
      } else if (onLastPage) {
        return;
      } else {
        throw new Error(`bad direction '${direction}'`);
      }
      this.updateNavButtons();
      return resp;
    }

    getPreviousPage() {
      return this.getAnotherPage('prev');
    }

    getNextPage() {
      return this.getAnotherPage('next');
    }

    onRender() {
      var setKeyHandler;
      setKeyHandler = this.getOption('setKeyHandler');
      if (setKeyHandler) {
        return this.onRenderHandleKeys();
      }
    }

    onBeforeDestroy() {
      var setKeyHandler;
      setKeyHandler = this.getOption('setKeyHandler');
      if (setKeyHandler) {
        return this.onBeforeDestroyHandleKeys();
      }
    }

    handleKeyCommand(command) {
      if (command === 'prev' || command === 'next') {
        return this.getAnotherPage(command);
      }
    }

    keydownHandler(event) {
      var key, ref, results, value;
      boundMethodCheck(this, PaginationView);
      ref = this.keycommands;
      results = [];
      for (key in ref) {
        value = ref[key];
        if (event.keyCode === value) {
          results.push(this.handleKeyCommand(key));
        } else {
          results.push(void 0);
        }
      }
      return results;
    }

    onRenderHandleKeys() {
      return $("html").keydown(this.keydownHandler);
    }

    onBeforeDestroyHandleKeys() {
      return $("html").unbind('keydown', this.keydownHandler);
    }

  };

  PaginationView.prototype.tagName = 'ul';

  PaginationView.prototype.className = 'pagination';

  PaginationView.prototype.template = tc.renderable(function(model) {
    var ellipsis, ellipsisDrawn, firstPage, i, lastPage, p, ref, ref1, resumeAt, state, stopAt, totalPages;
    if (model instanceof Backbone.Collection) {
      state = model.state;
    } else {
      state = model.collection.state;
    }
    totalPages = state.totalPages;
    firstPage = state.firstPage;
    lastPage = state.lastPage;
    ellipsis = false;
    if (lastPage > model.barLength) {
      ellipsis = true;
      stopAt = model.barStopAt;
      resumeAt = lastPage - model.barStopAt;
    }
    tc.li('.page-item', function() {
      return tc.a('.prev.page-link.bg-body-d5', function() {
        return tc.i('.fa.fa-arrow-left');
      });
    });
    ellipsisDrawn = false;
    for (p = i = ref = firstPage, ref1 = lastPage; (ref <= ref1 ? i <= ref1 : i >= ref1); p = ref <= ref1 ? ++i : --i) {
      if (ellipsis) {
        if (p >= stopAt && p <= resumeAt) {
          if (!ellipsisDrawn) {
            ellipsisDrawn = true;
            tc.li('.page-item', function() {
              return tc.a('.ellipsis-page.page-link.bg-body-d5.text-dark', '...');
            });
          }
          continue;
        }
      }
      tc.li('.page-item', function() {
        return tc.a('.numbered-page.page-link.bg-body-d5.text-dark', {
          href: '#',
          data: {
            pageNumber: p
          }
        }, p);
      });
    }
    return tc.li('.page-item', function() {
      return tc.a('.next.page-link.bg-body-d5', function() {
        return tc.i('.fa.fa-arrow-right');
      });
    });
  });

  PaginationView.prototype.ui = {
    numberedPage: '.numbered-page',
    prevButton: '.prev',
    nextButton: '.next'
  };

  PaginationView.prototype.events = {
    'click @ui.numberedPage': 'turnPage',
    'click @ui.prevButton': 'getPreviousPage',
    'click @ui.nextButton': 'getNextPage'
  };

  PaginationView.prototype.keycommands = {
    prev: 37,
    next: 39
  };

  return PaginationView;

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvcGFnaW5hdGUtYmFyLmpzIiwic291cmNlcyI6WyJ2aWV3cy9wYWdpbmF0ZS1iYXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsV0FBQSxFQUFBLGNBQUEsRUFBQSxjQUFBLEVBQUEsZ0JBQUE7RUFBQTs7QUFBQSxPQUFPLENBQVAsTUFBQTs7QUFDQSxPQUFPLFFBQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVMsSUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxFQUFQLE1BQUE7O0FBRUEsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDZCxjQUFBLEdBQWlCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixVQUF2Qjs7QUFFakIsZ0JBQUEsR0FBbUIsUUFBQSxDQUFDLENBQUQsQ0FBQTtFQUNqQixFQUFFLENBQUMsRUFBSCxDQUFNLFlBQU4sRUFBb0IsUUFBQSxDQUFBLENBQUEsRUFBQSxDQUFwQjtTQUNBLEVBQUUsQ0FBQyxDQUFILENBQUssK0NBQUwsRUFDQTtJQUFBLElBQUEsRUFBSyxHQUFMO0lBQVUsSUFBQSxFQUFNO01BQUEsVUFBQSxFQUFZO0lBQVo7RUFBaEIsQ0FEQSxFQUMrQixDQUQvQjtBQUZpQjs7QUFNbkIsT0FBQSxRQUFxQjs7RUFBTixNQUFBLGVBQUEsUUFBNkIsS0FBN0I7OztVQTRIYixDQUFBLHFCQUFBLENBQUE7OztJQTNIQSxPQUFTLENBQUEsQ0FBQTthQUNQO1FBQUEsYUFBQSxFQUFlLEtBQWY7UUFDQSxTQUFBLEVBQVcsRUFEWDtRQUVBLFNBQUEsRUFBVztNQUZYO0lBRE87O0lBTVQsZUFBaUIsQ0FBQSxDQUFBO2FBQ2Y7UUFBQSxVQUFBLEVBQVksSUFBQyxDQUFBLFVBQWI7UUFDQSxTQUFBLEVBQVcsSUFBQyxDQUFBLFNBQUQsQ0FBVyxXQUFYLENBRFg7UUFFQSxTQUFBLEVBQVcsSUFBQyxDQUFBLFNBQUQsQ0FBVyxXQUFYO01BRlg7SUFEZTs7SUE0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QixLQUFTLDRHQUFUO01BQ0UsSUFBRyxRQUFIO1FBQ0UsSUFBRyxDQUFBLElBQUssTUFBTCxJQUFnQixDQUFBLElBQUssUUFBeEI7VUFDRSxJQUFHLENBQUksYUFBUDtZQUNFLGFBQUEsR0FBZ0I7WUFDaEIsRUFBRSxDQUFDLEVBQUgsQ0FBTSxZQUFOLEVBQW9CLFFBQUEsQ0FBQSxDQUFBO3FCQUNsQixFQUFFLENBQUMsQ0FBSCxDQUFLLCtDQUFMLEVBQ0EsS0FEQTtZQURrQixDQUFwQixFQUZGOztBQUtBLG1CQU5GO1NBREY7O01BUUEsRUFBRSxDQUFDLEVBQUgsQ0FBTSxZQUFOLEVBQW9CLFFBQUEsQ0FBQSxDQUFBO2VBQ2xCLEVBQUUsQ0FBQyxDQUFILENBQUssK0NBQUwsRUFDQTtVQUFBLElBQUEsRUFBSyxHQUFMO1VBQVUsSUFBQSxFQUFNO1lBQUEsVUFBQSxFQUFZO1VBQVo7UUFBaEIsQ0FEQSxFQUMrQixDQUQvQjtNQURrQixDQUFwQjtJQVRGO1dBWUEsRUFBRSxDQUFDLEVBQUgsQ0FBTSxZQUFOLEVBQW9CLFFBQUEsQ0FBQSxDQUFBO2FBQ2xCLEVBQUUsQ0FBQyxDQUFILENBQUssNEJBQUwsRUFBbUMsUUFBQSxDQUFBLENBQUE7ZUFDakMsRUFBRSxDQUFDLENBQUgsQ0FBSyxvQkFBTDtNQURpQyxDQUFuQztJQURrQixDQUFwQjtFQTdCc0IsQ0FBZDs7MkJBZ0NWLEVBQUEsR0FDRTtJQUFBLFlBQUEsRUFBYyxnQkFBZDtJQUNBLFVBQUEsRUFBWSxPQURaO0lBRUEsVUFBQSxFQUFZO0VBRlo7OzJCQUdGLE1BQUEsR0FDRTtJQUFBLHdCQUFBLEVBQTBCLFVBQTFCO0lBQ0Esc0JBQUEsRUFBd0IsaUJBRHhCO0lBRUEsc0JBQUEsRUFBd0I7RUFGeEI7OzJCQXNFRixXQUFBLEdBQ0U7SUFBQSxJQUFBLEVBQU0sRUFBTjtJQUNBLElBQUEsRUFBTTtFQUROIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5cbm51bWJlcmVkUGFnZUl0ZW0gPSAocCkgLT5cbiAgdGMubGkgJy5wYWdlLWl0ZW0nLCAtPlxuICB0Yy5hICcubnVtYmVyZWQtcGFnZS5wYWdlLWxpbmsuYmctYm9keS1kNS50ZXh0LWRhcmsnLFxuICBocmVmOicjJywgZGF0YTogcGFnZU51bWJlcjogcCwgcFxuXG4jIHRoaXMgbmVlZHMgdG8gYmUgY29udGFpbmVkIGluIGEgJ25hdicgcmVnaW9uXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWdpbmF0aW9uVmlldyBleHRlbmRzIFZpZXdcbiAgb3B0aW9uczogLT5cbiAgICBzZXRLZXlIYW5kbGVyOiBmYWxzZVxuICAgIGJhckxlbmd0aDogMTVcbiAgICBiYXJTdG9wQXQ6IDdcbiAgdGFnTmFtZTogJ3VsJ1xuICBjbGFzc05hbWU6ICdwYWdpbmF0aW9uJ1xuICB0ZW1wbGF0ZUNvbnRleHQ6IC0+XG4gICAgY29sbGVjdGlvbjogQGNvbGxlY3Rpb25cbiAgICBiYXJMZW5ndGg6IEBnZXRPcHRpb24gJ2Jhckxlbmd0aCdcbiAgICBiYXJTdG9wQXQ6IEBnZXRPcHRpb24gJ2JhclN0b3BBdCdcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICAgIGlmIG1vZGVsIGluc3RhbmNlb2YgQmFja2JvbmUuQ29sbGVjdGlvblxuICAgICAgc3RhdGUgPSBtb2RlbC5zdGF0ZVxuICAgIGVsc2VcbiAgICAgIHN0YXRlID0gbW9kZWwuY29sbGVjdGlvbi5zdGF0ZVxuICAgIHRvdGFsUGFnZXMgPSBzdGF0ZS50b3RhbFBhZ2VzXG4gICAgZmlyc3RQYWdlID0gc3RhdGUuZmlyc3RQYWdlXG4gICAgbGFzdFBhZ2UgPSBzdGF0ZS5sYXN0UGFnZVxuICAgIGVsbGlwc2lzID0gZmFsc2VcbiAgICBpZiBsYXN0UGFnZSA+IG1vZGVsLmJhckxlbmd0aFxuICAgICAgZWxsaXBzaXMgPSB0cnVlXG4gICAgICBzdG9wQXQgPSBtb2RlbC5iYXJTdG9wQXRcbiAgICAgIHJlc3VtZUF0ID0gbGFzdFBhZ2UgLSBtb2RlbC5iYXJTdG9wQXRcbiAgICB0Yy5saSAnLnBhZ2UtaXRlbScsIC0+XG4gICAgICB0Yy5hICcucHJldi5wYWdlLWxpbmsuYmctYm9keS1kNScsIC0+XG4gICAgICAgIHRjLmkgJy5mYS5mYS1hcnJvdy1sZWZ0J1xuICAgIGVsbGlwc2lzRHJhd24gPSBmYWxzZVxuICAgIGZvciBwIGluIFtmaXJzdFBhZ2UuLmxhc3RQYWdlXVxuICAgICAgaWYgZWxsaXBzaXNcbiAgICAgICAgaWYgcCA+PSBzdG9wQXQgYW5kIHAgPD0gcmVzdW1lQXRcbiAgICAgICAgICBpZiBub3QgZWxsaXBzaXNEcmF3blxuICAgICAgICAgICAgZWxsaXBzaXNEcmF3biA9IHRydWVcbiAgICAgICAgICAgIHRjLmxpICcucGFnZS1pdGVtJywgLT5cbiAgICAgICAgICAgICAgdGMuYSAnLmVsbGlwc2lzLXBhZ2UucGFnZS1saW5rLmJnLWJvZHktZDUudGV4dC1kYXJrJyxcbiAgICAgICAgICAgICAgJy4uLidcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgdGMubGkgJy5wYWdlLWl0ZW0nLCAtPlxuICAgICAgICB0Yy5hICcubnVtYmVyZWQtcGFnZS5wYWdlLWxpbmsuYmctYm9keS1kNS50ZXh0LWRhcmsnLFxuICAgICAgICBocmVmOicjJywgZGF0YTogcGFnZU51bWJlcjogcCwgcFxuICAgIHRjLmxpICcucGFnZS1pdGVtJywgLT5cbiAgICAgIHRjLmEgJy5uZXh0LnBhZ2UtbGluay5iZy1ib2R5LWQ1JywgLT5cbiAgICAgICAgdGMuaSAnLmZhLmZhLWFycm93LXJpZ2h0J1xuICB1aTpcbiAgICBudW1iZXJlZFBhZ2U6ICcubnVtYmVyZWQtcGFnZSdcbiAgICBwcmV2QnV0dG9uOiAnLnByZXYnXG4gICAgbmV4dEJ1dHRvbjogJy5uZXh0J1xuICBldmVudHM6XG4gICAgJ2NsaWNrIEB1aS5udW1iZXJlZFBhZ2UnOiAndHVyblBhZ2UnXG4gICAgJ2NsaWNrIEB1aS5wcmV2QnV0dG9uJzogJ2dldFByZXZpb3VzUGFnZSdcbiAgICAnY2xpY2sgQHVpLm5leHRCdXR0b24nOiAnZ2V0TmV4dFBhZ2UnXG4gIG9uRG9tUmVmcmVzaDogLT5cbiAgICBAdXBkYXRlTmF2QnV0dG9ucygpXG4gIHR1cm5QYWdlOiAoZXZlbnQpIC0+XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIGVsID0gJChldmVudC50YXJnZXQpXG4gICAgcGFnZU51bWJlciA9IGVsLmF0dHIgJ2RhdGEtcGFnZW51bWJlcidcbiAgICBAY29sbGVjdGlvbi5nZXRQYWdlIE51bWJlciBwYWdlTnVtYmVyXG4gICAgQHVwZGF0ZU5hdkJ1dHRvbnMoKVxuXG4gIHVwZGF0ZU5hdkJ1dHRvbnM6IC0+XG4gICAgc3RhdGUgPSBAY29sbGVjdGlvbi5zdGF0ZVxuICAgIHByZXZJdGVtID0gQHVpLnByZXZCdXR0b24ucGFyZW50KClcbiAgICBpZiBzdGF0ZS5jdXJyZW50UGFnZSA9PSBzdGF0ZS5maXJzdFBhZ2VcbiAgICAgIHVubGVzcyBwcmV2SXRlbS5oYXNDbGFzcyAnZGlzYWJsZWQnXG4gICAgICAgIHByZXZJdGVtLmFkZENsYXNzICdkaXNhYmxlZCdcbiAgICBlbHNlXG4gICAgICBpZiBwcmV2SXRlbS5oYXNDbGFzcyAnZGlzYWJsZWQnXG4gICAgICAgIHByZXZJdGVtLnJlbW92ZUNsYXNzICdkaXNhYmxlZCdcbiAgICBuZXh0SXRlbSA9IEB1aS5uZXh0QnV0dG9uLnBhcmVudCgpXG4gICAgaWYgc3RhdGUuY3VycmVudFBhZ2UgPT0gc3RhdGUubGFzdFBhZ2VcbiAgICAgIHVubGVzcyBuZXh0SXRlbS5oYXNDbGFzcyAnZGlzYWJsZWQnXG4gICAgICAgIG5leHRJdGVtLmFkZENsYXNzICdkaXNhYmxlZCdcbiAgICBlbHNlXG4gICAgICBpZiBuZXh0SXRlbS5hZGRDbGFzcyAnZGlzYWJsZWQnXG4gICAgICAgIG5leHRJdGVtLnJlbW92ZUNsYXNzICdkaXNhYmxlZCdcbiAgICBAdWkubnVtYmVyZWRQYWdlLnBhcmVudCgpLnJlbW92ZUNsYXNzICdhY3RpdmUnXG4gICAgQHVpLm51bWJlcmVkUGFnZS5yZW1vdmVDbGFzcyAndGV4dC13aGl0ZSdcbiAgICBAdWkubnVtYmVyZWRQYWdlLmFkZENsYXNzICd0ZXh0LWRhcmsnXG4gICAgY3AgPSAkKFwiW2RhdGEtcGFnZW51bWJlcj1cXFwiI3tzdGF0ZS5jdXJyZW50UGFnZX1cXFwiXVwiKVxuICAgIGNwcCA9IGNwLnBhcmVudCgpXG4gICAgY3BwLmFkZENsYXNzICdhY3RpdmUnXG4gICAgY3AucmVtb3ZlQ2xhc3MgJ3RleHQtZGFyaydcbiAgICBjcC5hZGRDbGFzcyAndGV4dC13aGl0ZSdcblxuICBnZXRBbm90aGVyUGFnZTogKGRpcmVjdGlvbikgLT5cbiAgICBzdGF0ZSA9IEBjb2xsZWN0aW9uLnN0YXRlXG4gICAgb25MYXN0UGFnZSA9IHN0YXRlLmN1cnJlbnRQYWdlID09IHN0YXRlLmxhc3RQYWdlXG4gICAgIyB3ZSBuZWVkIHRoaXMgaW4gY2FzZSB0aGUgcGFnZXMgc3RhcnQgYXQgemVyb1xuICAgIG9uRmlyc3RQYWdlID0gc3RhdGUuY3VycmVudFBhZ2UgPT0gc3RhdGUuZmlyc3RQYWdlXG4gICAgaWYgZGlyZWN0aW9uIGlzICdwcmV2JyBhbmQgbm90IG9uRmlyc3RQYWdlXG4gICAgICBpZiBzdGF0ZS5jdXJyZW50UGFnZSAhPSBzdGF0ZS5maXJzdFBhZ2VcbiAgICAgICAgcmVzcCA9IEBjb2xsZWN0aW9uLmdldFByZXZpb3VzUGFnZSgpXG4gICAgZWxzZSBpZiBkaXJlY3Rpb24gaXMgJ25leHQnIGFuZCBub3Qgb25MYXN0UGFnZVxuICAgICAgcmVzcCA9IEBjb2xsZWN0aW9uLmdldE5leHRQYWdlKClcbiAgICBlbHNlIGlmIG9uTGFzdFBhZ2VcbiAgICAgIHJldHVyblxuICAgIGVsc2VcbiAgICAgIHRocm93IG5ldyBFcnJvciBcImJhZCBkaXJlY3Rpb24gJyN7ZGlyZWN0aW9ufSdcIlxuICAgIEB1cGRhdGVOYXZCdXR0b25zKClcbiAgICByZXR1cm4gcmVzcFxuICAgIFxuICBnZXRQcmV2aW91c1BhZ2U6IC0+XG4gICAgcmV0dXJuIEBnZXRBbm90aGVyUGFnZSAncHJldidcbiAgICAgIFxuICBnZXROZXh0UGFnZTogLT5cbiAgICByZXR1cm4gQGdldEFub3RoZXJQYWdlICduZXh0J1xuICAgICAgXG4gIG9uUmVuZGVyOiAtPlxuICAgIHNldEtleUhhbmRsZXIgPSBAZ2V0T3B0aW9uICdzZXRLZXlIYW5kbGVyJ1xuICAgIGlmIHNldEtleUhhbmRsZXJcbiAgICAgIEBvblJlbmRlckhhbmRsZUtleXMoKVxuICAgICAgXG4gIG9uQmVmb3JlRGVzdHJveTogLT5cbiAgICBzZXRLZXlIYW5kbGVyID0gQGdldE9wdGlvbiAnc2V0S2V5SGFuZGxlcidcbiAgICBpZiBzZXRLZXlIYW5kbGVyXG4gICAgICBAb25CZWZvcmVEZXN0cm95SGFuZGxlS2V5cygpXG4gICAgXG4gIGtleWNvbW1hbmRzOlxuICAgIHByZXY6IDM3XG4gICAgbmV4dDogMzlcbiAgaGFuZGxlS2V5Q29tbWFuZDogKGNvbW1hbmQpIC0+XG4gICAgaWYgY29tbWFuZCBpbiBbJ3ByZXYnLCAnbmV4dCddXG4gICAgICBAZ2V0QW5vdGhlclBhZ2UgY29tbWFuZFxuICBrZXlkb3duSGFuZGxlcjogKGV2ZW50KSA9PlxuICAgIGZvciBrZXksIHZhbHVlIG9mIEBrZXljb21tYW5kc1xuICAgICAgaWYgZXZlbnQua2V5Q29kZSA9PSB2YWx1ZVxuICAgICAgICBAaGFuZGxlS2V5Q29tbWFuZCBrZXlcblxuICBvblJlbmRlckhhbmRsZUtleXM6IC0+XG4gICAgJChcImh0bWxcIikua2V5ZG93biBAa2V5ZG93bkhhbmRsZXJcblxuICBvbkJlZm9yZURlc3Ryb3lIYW5kbGVLZXlzOiAtPlxuICAgICQoXCJodG1sXCIpLnVuYmluZCAna2V5ZG93bicsIEBrZXlkb3duSGFuZGxlclxuICAgIFxuIl19
