var PaginationView,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

import $ from 'jquery';

import {
  Collection
} from 'backbone';

import {
  View
} from 'backbone.marionette';

import tc from 'teacup';

PaginationView = (function() {
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
      cp = $(`[data-pagenumber=\"${state.currentPage}\"]`);
      cpp = cp.parent();
      return cpp.addClass('active');
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
    var ellipsis, ellipsisDrawn, firstPage, i, lastPage, p, ref, ref1, resumeAt, state, stopAt;
    if (model instanceof Collection) {
      state = model.state;
    } else {
      state = model.collection.state;
    }
    firstPage = state.firstPage;
    lastPage = state.lastPage;
    ellipsis = false;
    if (lastPage > model.barLength) {
      ellipsis = true;
      stopAt = model.barStopAt;
      resumeAt = lastPage - model.barStopAt;
    }
    tc.li('.page-item', function() {
      return tc.a('.prev.page-link', function() {
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
              return tc.a('.ellipsis-page.page-link', '...');
            });
          }
          continue;
        }
      }
      tc.li('.page-item', function() {
        return tc.a('.numbered-page.page-link', {
          href: '#',
          data: {
            pageNumber: p
          }
        }, p);
      });
    }
    return tc.li('.page-item', function() {
      return tc.a('.next.page-link', function() {
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

export default PaginationView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvcGFnaW5hdGUtYmFyLmpzIiwic291cmNlcyI6WyJ2aWV3cy9wYWdpbmF0ZS1iYXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsY0FBQTtFQUFBOztBQUFBLE9BQU8sQ0FBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxVQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsSUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxFQUFQLE1BQUE7O0FBR007O0VBQU4sTUFBQSxlQUFBLFFBQTZCLEtBQTdCOzs7VUF1SEUsQ0FBQSxxQkFBQSxDQUFBOzs7SUF0SEEsT0FBUyxDQUFBLENBQUE7YUFDUDtRQUFBLGFBQUEsRUFBZSxLQUFmO1FBQ0EsU0FBQSxFQUFXLEVBRFg7UUFFQSxTQUFBLEVBQVc7TUFGWDtJQURPOztJQU1ULGVBQWlCLENBQUEsQ0FBQTthQUNmO1FBQUEsVUFBQSxFQUFZLElBQUMsQ0FBQSxVQUFiO1FBQ0EsU0FBQSxFQUFXLElBQUMsQ0FBQSxTQUFELENBQVcsV0FBWCxDQURYO1FBRUEsU0FBQSxFQUFXLElBQUMsQ0FBQSxTQUFELENBQVcsV0FBWDtNQUZYO0lBRGU7O0lBMkNqQixZQUFjLENBQUEsQ0FBQTthQUNaLElBQUMsQ0FBQSxnQkFBRCxDQUFBO0lBRFk7O0lBRWQsUUFBVSxDQUFDLEtBQUQsQ0FBQTtBQUNaLFVBQUEsRUFBQSxFQUFBO01BQUksS0FBSyxDQUFDLGNBQU4sQ0FBQTtNQUNBLEVBQUEsR0FBSyxDQUFBLENBQUUsS0FBSyxDQUFDLE1BQVI7TUFDTCxVQUFBLEdBQWEsRUFBRSxDQUFDLElBQUgsQ0FBUSxpQkFBUjtNQUNiLElBQUMsQ0FBQSxVQUFVLENBQUMsT0FBWixDQUFvQixNQUFBLENBQU8sVUFBUCxDQUFwQjthQUNBLElBQUMsQ0FBQSxnQkFBRCxDQUFBO0lBTFE7O0lBT1YsZ0JBQWtCLENBQUEsQ0FBQTtBQUNwQixVQUFBLEVBQUEsRUFBQSxHQUFBLEVBQUEsUUFBQSxFQUFBLFFBQUEsRUFB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QlYsRUFBQSxHQUNFO0lBQUEsWUFBQSxFQUFjLGdCQUFkO0lBQ0EsVUFBQSxFQUFZLE9BRFo7SUFFQSxVQUFBLEVBQVk7RUFGWjs7MkJBR0YsTUFBQSxHQUNFO0lBQUEsd0JBQUEsRUFBMEIsVUFBMUI7SUFDQSxzQkFBQSxFQUF3QixpQkFEeEI7SUFFQSxzQkFBQSxFQUF3QjtFQUZ4Qjs7MkJBa0VGLFdBQUEsR0FDRTtJQUFBLElBQUEsRUFBTSxFQUFOO0lBQ0EsSUFBQSxFQUFNO0VBRE47Ozs7OztBQWdCSixPQUFBLFFBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgeyBDb2xsZWN0aW9uIH0gZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5cbiMgdGhpcyBuZWVkcyB0byBiZSBjb250YWluZWQgaW4gYSAnbmF2JyByZWdpb25cbmNsYXNzIFBhZ2luYXRpb25WaWV3IGV4dGVuZHMgVmlld1xuICBvcHRpb25zOiAtPlxuICAgIHNldEtleUhhbmRsZXI6IGZhbHNlXG4gICAgYmFyTGVuZ3RoOiAxNVxuICAgIGJhclN0b3BBdDogN1xuICB0YWdOYW1lOiAndWwnXG4gIGNsYXNzTmFtZTogJ3BhZ2luYXRpb24nXG4gIHRlbXBsYXRlQ29udGV4dDogLT5cbiAgICBjb2xsZWN0aW9uOiBAY29sbGVjdGlvblxuICAgIGJhckxlbmd0aDogQGdldE9wdGlvbiAnYmFyTGVuZ3RoJ1xuICAgIGJhclN0b3BBdDogQGdldE9wdGlvbiAnYmFyU3RvcEF0J1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgaWYgbW9kZWwgaW5zdGFuY2VvZiBDb2xsZWN0aW9uXG4gICAgICBzdGF0ZSA9IG1vZGVsLnN0YXRlXG4gICAgZWxzZVxuICAgICAgc3RhdGUgPSBtb2RlbC5jb2xsZWN0aW9uLnN0YXRlXG4gICAgZmlyc3RQYWdlID0gc3RhdGUuZmlyc3RQYWdlXG4gICAgbGFzdFBhZ2UgPSBzdGF0ZS5sYXN0UGFnZVxuICAgIGVsbGlwc2lzID0gZmFsc2VcbiAgICBpZiBsYXN0UGFnZSA+IG1vZGVsLmJhckxlbmd0aFxuICAgICAgZWxsaXBzaXMgPSB0cnVlXG4gICAgICBzdG9wQXQgPSBtb2RlbC5iYXJTdG9wQXRcbiAgICAgIHJlc3VtZUF0ID0gbGFzdFBhZ2UgLSBtb2RlbC5iYXJTdG9wQXRcbiAgICB0Yy5saSAnLnBhZ2UtaXRlbScsIC0+XG4gICAgICB0Yy5hICcucHJldi5wYWdlLWxpbmsnLCAtPlxuICAgICAgICB0Yy5pICcuZmEuZmEtYXJyb3ctbGVmdCdcbiAgICBlbGxpcHNpc0RyYXduID0gZmFsc2VcbiAgICBmb3IgcCBpbiBbZmlyc3RQYWdlLi5sYXN0UGFnZV1cbiAgICAgIGlmIGVsbGlwc2lzXG4gICAgICAgIGlmIHAgPj0gc3RvcEF0IGFuZCBwIDw9IHJlc3VtZUF0XG4gICAgICAgICAgaWYgbm90IGVsbGlwc2lzRHJhd25cbiAgICAgICAgICAgIGVsbGlwc2lzRHJhd24gPSB0cnVlXG4gICAgICAgICAgICB0Yy5saSAnLnBhZ2UtaXRlbScsIC0+XG4gICAgICAgICAgICAgIHRjLmEgJy5lbGxpcHNpcy1wYWdlLnBhZ2UtbGluaycsXG4gICAgICAgICAgICAgICcuLi4nXG4gICAgICAgICAgY29udGludWVcbiAgICAgIHRjLmxpICcucGFnZS1pdGVtJywgLT5cbiAgICAgICAgdGMuYSAnLm51bWJlcmVkLXBhZ2UucGFnZS1saW5rJyxcbiAgICAgICAgaHJlZjonIycsIGRhdGE6IHBhZ2VOdW1iZXI6IHAsIHBcbiAgICB0Yy5saSAnLnBhZ2UtaXRlbScsIC0+XG4gICAgICB0Yy5hICcubmV4dC5wYWdlLWxpbmsnLCAtPlxuICAgICAgICB0Yy5pICcuZmEuZmEtYXJyb3ctcmlnaHQnXG4gIHVpOlxuICAgIG51bWJlcmVkUGFnZTogJy5udW1iZXJlZC1wYWdlJ1xuICAgIHByZXZCdXR0b246ICcucHJldidcbiAgICBuZXh0QnV0dG9uOiAnLm5leHQnXG4gIGV2ZW50czpcbiAgICAnY2xpY2sgQHVpLm51bWJlcmVkUGFnZSc6ICd0dXJuUGFnZSdcbiAgICAnY2xpY2sgQHVpLnByZXZCdXR0b24nOiAnZ2V0UHJldmlvdXNQYWdlJ1xuICAgICdjbGljayBAdWkubmV4dEJ1dHRvbic6ICdnZXROZXh0UGFnZSdcbiAgb25Eb21SZWZyZXNoOiAtPlxuICAgIEB1cGRhdGVOYXZCdXR0b25zKClcbiAgdHVyblBhZ2U6IChldmVudCkgLT5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgZWwgPSAkKGV2ZW50LnRhcmdldClcbiAgICBwYWdlTnVtYmVyID0gZWwuYXR0ciAnZGF0YS1wYWdlbnVtYmVyJ1xuICAgIEBjb2xsZWN0aW9uLmdldFBhZ2UgTnVtYmVyIHBhZ2VOdW1iZXJcbiAgICBAdXBkYXRlTmF2QnV0dG9ucygpXG5cbiAgdXBkYXRlTmF2QnV0dG9uczogLT5cbiAgICBzdGF0ZSA9IEBjb2xsZWN0aW9uLnN0YXRlXG4gICAgcHJldkl0ZW0gPSBAdWkucHJldkJ1dHRvbi5wYXJlbnQoKVxuICAgIGlmIHN0YXRlLmN1cnJlbnRQYWdlID09IHN0YXRlLmZpcnN0UGFnZVxuICAgICAgdW5sZXNzIHByZXZJdGVtLmhhc0NsYXNzICdkaXNhYmxlZCdcbiAgICAgICAgcHJldkl0ZW0uYWRkQ2xhc3MgJ2Rpc2FibGVkJ1xuICAgIGVsc2VcbiAgICAgIGlmIHByZXZJdGVtLmhhc0NsYXNzICdkaXNhYmxlZCdcbiAgICAgICAgcHJldkl0ZW0ucmVtb3ZlQ2xhc3MgJ2Rpc2FibGVkJ1xuICAgIG5leHRJdGVtID0gQHVpLm5leHRCdXR0b24ucGFyZW50KClcbiAgICBpZiBzdGF0ZS5jdXJyZW50UGFnZSA9PSBzdGF0ZS5sYXN0UGFnZVxuICAgICAgdW5sZXNzIG5leHRJdGVtLmhhc0NsYXNzICdkaXNhYmxlZCdcbiAgICAgICAgbmV4dEl0ZW0uYWRkQ2xhc3MgJ2Rpc2FibGVkJ1xuICAgIGVsc2VcbiAgICAgIGlmIG5leHRJdGVtLmFkZENsYXNzICdkaXNhYmxlZCdcbiAgICAgICAgbmV4dEl0ZW0ucmVtb3ZlQ2xhc3MgJ2Rpc2FibGVkJ1xuICAgIEB1aS5udW1iZXJlZFBhZ2UucGFyZW50KCkucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICBjcCA9ICQoXCJbZGF0YS1wYWdlbnVtYmVyPVxcXCIje3N0YXRlLmN1cnJlbnRQYWdlfVxcXCJdXCIpXG4gICAgY3BwID0gY3AucGFyZW50KClcbiAgICBjcHAuYWRkQ2xhc3MgJ2FjdGl2ZSdcblxuICBnZXRBbm90aGVyUGFnZTogKGRpcmVjdGlvbikgLT5cbiAgICBzdGF0ZSA9IEBjb2xsZWN0aW9uLnN0YXRlXG4gICAgb25MYXN0UGFnZSA9IHN0YXRlLmN1cnJlbnRQYWdlID09IHN0YXRlLmxhc3RQYWdlXG4gICAgIyB3ZSBuZWVkIHRoaXMgaW4gY2FzZSB0aGUgcGFnZXMgc3RhcnQgYXQgemVyb1xuICAgIG9uRmlyc3RQYWdlID0gc3RhdGUuY3VycmVudFBhZ2UgPT0gc3RhdGUuZmlyc3RQYWdlXG4gICAgaWYgZGlyZWN0aW9uIGlzICdwcmV2JyBhbmQgbm90IG9uRmlyc3RQYWdlXG4gICAgICBpZiBzdGF0ZS5jdXJyZW50UGFnZSAhPSBzdGF0ZS5maXJzdFBhZ2VcbiAgICAgICAgcmVzcCA9IEBjb2xsZWN0aW9uLmdldFByZXZpb3VzUGFnZSgpXG4gICAgZWxzZSBpZiBkaXJlY3Rpb24gaXMgJ25leHQnIGFuZCBub3Qgb25MYXN0UGFnZVxuICAgICAgcmVzcCA9IEBjb2xsZWN0aW9uLmdldE5leHRQYWdlKClcbiAgICBlbHNlIGlmIG9uTGFzdFBhZ2VcbiAgICAgIHJldHVyblxuICAgIGVsc2VcbiAgICAgIHRocm93IG5ldyBFcnJvciBcImJhZCBkaXJlY3Rpb24gJyN7ZGlyZWN0aW9ufSdcIlxuICAgIEB1cGRhdGVOYXZCdXR0b25zKClcbiAgICByZXR1cm4gcmVzcFxuICAgIFxuICBnZXRQcmV2aW91c1BhZ2U6IC0+XG4gICAgcmV0dXJuIEBnZXRBbm90aGVyUGFnZSAncHJldidcbiAgICAgIFxuICBnZXROZXh0UGFnZTogLT5cbiAgICByZXR1cm4gQGdldEFub3RoZXJQYWdlICduZXh0J1xuICAgICAgXG4gIG9uUmVuZGVyOiAtPlxuICAgIHNldEtleUhhbmRsZXIgPSBAZ2V0T3B0aW9uICdzZXRLZXlIYW5kbGVyJ1xuICAgIGlmIHNldEtleUhhbmRsZXJcbiAgICAgIEBvblJlbmRlckhhbmRsZUtleXMoKVxuICAgICAgXG4gIG9uQmVmb3JlRGVzdHJveTogLT5cbiAgICBzZXRLZXlIYW5kbGVyID0gQGdldE9wdGlvbiAnc2V0S2V5SGFuZGxlcidcbiAgICBpZiBzZXRLZXlIYW5kbGVyXG4gICAgICBAb25CZWZvcmVEZXN0cm95SGFuZGxlS2V5cygpXG4gICAgXG4gIGtleWNvbW1hbmRzOlxuICAgIHByZXY6IDM3XG4gICAgbmV4dDogMzlcbiAgaGFuZGxlS2V5Q29tbWFuZDogKGNvbW1hbmQpIC0+XG4gICAgaWYgY29tbWFuZCBpbiBbJ3ByZXYnLCAnbmV4dCddXG4gICAgICBAZ2V0QW5vdGhlclBhZ2UgY29tbWFuZFxuICBrZXlkb3duSGFuZGxlcjogKGV2ZW50KSA9PlxuICAgIGZvciBrZXksIHZhbHVlIG9mIEBrZXljb21tYW5kc1xuICAgICAgaWYgZXZlbnQua2V5Q29kZSA9PSB2YWx1ZVxuICAgICAgICBAaGFuZGxlS2V5Q29tbWFuZCBrZXlcblxuICBvblJlbmRlckhhbmRsZUtleXM6IC0+XG4gICAgJChcImh0bWxcIikua2V5ZG93biBAa2V5ZG93bkhhbmRsZXJcblxuICBvbkJlZm9yZURlc3Ryb3lIYW5kbGVLZXlzOiAtPlxuICAgICQoXCJodG1sXCIpLnVuYmluZCAna2V5ZG93bicsIEBrZXlkb3duSGFuZGxlclxuICAgIFxuZXhwb3J0IGRlZmF1bHQgUGFnaW5hdGlvblZpZXdcbiJdfQ==
