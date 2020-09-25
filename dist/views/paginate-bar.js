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
      cp = $(`[data-pagenumber="${state.currentPage}"]`);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvcGFnaW5hdGUtYmFyLmpzIiwic291cmNlcyI6WyJ2aWV3cy9wYWdpbmF0ZS1iYXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsY0FBQTtFQUFBOztBQUFBLE9BQU8sQ0FBUCxNQUFBOztBQUNBLE9BQUE7RUFBUyxVQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFBO0VBQVMsSUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxFQUFQLE1BQUE7O0FBR007O0VBQU4sTUFBQSxlQUFBLFFBQTZCLEtBQTdCOzs7VUF1SEUsQ0FBQSxxQkFBQSxDQUFBOzs7SUF0SEEsT0FBUyxDQUFBLENBQUE7YUFDUDtRQUFBLGFBQUEsRUFBZSxLQUFmO1FBQ0EsU0FBQSxFQUFXLEVBRFg7UUFFQSxTQUFBLEVBQVc7TUFGWDtJQURPOztJQU1ULGVBQWlCLENBQUEsQ0FBQTthQUNmO1FBQUEsVUFBQSxFQUFZLElBQUMsQ0FBQSxVQUFiO1FBQ0EsU0FBQSxFQUFXLElBQUMsQ0FBQSxTQUFELENBQVcsV0FBWCxDQURYO1FBRUEsU0FBQSxFQUFXLElBQUMsQ0FBQSxTQUFELENBQVcsV0FBWDtNQUZYO0lBRGU7O0lBMkNqQixZQUFjLENBQUEsQ0FBQTthQUNaLElBQUMsQ0FBQSxnQkFBRCxDQUFBO0lBRFk7O0lBRWQsUUFBVSxDQUFDLEtBQUQsQ0FBQTtBQUNSLFVBQUEsRUFBQSxFQUFBO01BQUEsS0FBSyxDQUFDLGNBQU4sQ0FBQTtNQUNBLEVBQUEsR0FBSyxDQUFBLENBQUUsS0FBSyxDQUFDLE1BQVI7TUFDTCxVQUFBLEdBQWEsRUFBRSxDQUFDLElBQUgsQ0FBUSxpQkFBUjtNQUNiLElBQUMsQ0FBQSxVQUFVLENBQUMsT0FBWixDQUFvQixNQUFBLENBQU8sVUFBUCxDQUFwQjthQUNBLElBQUMsQ0FBQSxnQkFBRCxDQUFBO0lBTFE7O0lBT1YsZ0JBQWtCLENBQUEsQ0FBQTtBQUNoQixVQUFBLEVBQUEsRUFBQSxHQUFBLEVBQUEsUUFBQSxFQUFBLFFBQUEsRUFB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a0IsQ0FBcEI7RUE1QnNCLENBQWQ7OzJCQStCVixFQUFBLEdBQ0U7SUFBQSxZQUFBLEVBQWMsZ0JBQWQ7SUFDQSxVQUFBLEVBQVksT0FEWjtJQUVBLFVBQUEsRUFBWTtFQUZaOzsyQkFHRixNQUFBLEdBQ0U7SUFBQSx3QkFBQSxFQUEwQixVQUExQjtJQUNBLHNCQUFBLEVBQXdCLGlCQUR4QjtJQUVBLHNCQUFBLEVBQXdCO0VBRnhCOzsyQkFrRUYsV0FBQSxHQUNFO0lBQUEsSUFBQSxFQUFNLEVBQU47SUFDQSxJQUFBLEVBQU07RUFETjs7Ozs7O0FBZ0JKLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSdcbmltcG9ydCB7IENvbGxlY3Rpb24gfSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCB7IFZpZXcgfSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxuIyB0aGlzIG5lZWRzIHRvIGJlIGNvbnRhaW5lZCBpbiBhICduYXYnIHJlZ2lvblxuY2xhc3MgUGFnaW5hdGlvblZpZXcgZXh0ZW5kcyBWaWV3XG4gIG9wdGlvbnM6IC0+XG4gICAgc2V0S2V5SGFuZGxlcjogZmFsc2VcbiAgICBiYXJMZW5ndGg6IDE1XG4gICAgYmFyU3RvcEF0OiA3XG4gIHRhZ05hbWU6ICd1bCdcbiAgY2xhc3NOYW1lOiAncGFnaW5hdGlvbidcbiAgdGVtcGxhdGVDb250ZXh0OiAtPlxuICAgIGNvbGxlY3Rpb246IEBjb2xsZWN0aW9uXG4gICAgYmFyTGVuZ3RoOiBAZ2V0T3B0aW9uICdiYXJMZW5ndGgnXG4gICAgYmFyU3RvcEF0OiBAZ2V0T3B0aW9uICdiYXJTdG9wQXQnXG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICBpZiBtb2RlbCBpbnN0YW5jZW9mIENvbGxlY3Rpb25cbiAgICAgIHN0YXRlID0gbW9kZWwuc3RhdGVcbiAgICBlbHNlXG4gICAgICBzdGF0ZSA9IG1vZGVsLmNvbGxlY3Rpb24uc3RhdGVcbiAgICBmaXJzdFBhZ2UgPSBzdGF0ZS5maXJzdFBhZ2VcbiAgICBsYXN0UGFnZSA9IHN0YXRlLmxhc3RQYWdlXG4gICAgZWxsaXBzaXMgPSBmYWxzZVxuICAgIGlmIGxhc3RQYWdlID4gbW9kZWwuYmFyTGVuZ3RoXG4gICAgICBlbGxpcHNpcyA9IHRydWVcbiAgICAgIHN0b3BBdCA9IG1vZGVsLmJhclN0b3BBdFxuICAgICAgcmVzdW1lQXQgPSBsYXN0UGFnZSAtIG1vZGVsLmJhclN0b3BBdFxuICAgIHRjLmxpICcucGFnZS1pdGVtJywgLT5cbiAgICAgIHRjLmEgJy5wcmV2LnBhZ2UtbGluaycsIC0+XG4gICAgICAgIHRjLmkgJy5mYS5mYS1hcnJvdy1sZWZ0J1xuICAgIGVsbGlwc2lzRHJhd24gPSBmYWxzZVxuICAgIGZvciBwIGluIFtmaXJzdFBhZ2UuLmxhc3RQYWdlXVxuICAgICAgaWYgZWxsaXBzaXNcbiAgICAgICAgaWYgcCA+PSBzdG9wQXQgYW5kIHAgPD0gcmVzdW1lQXRcbiAgICAgICAgICBpZiBub3QgZWxsaXBzaXNEcmF3blxuICAgICAgICAgICAgZWxsaXBzaXNEcmF3biA9IHRydWVcbiAgICAgICAgICAgIHRjLmxpICcucGFnZS1pdGVtJywgLT5cbiAgICAgICAgICAgICAgdGMuYSAnLmVsbGlwc2lzLXBhZ2UucGFnZS1saW5rJyxcbiAgICAgICAgICAgICAgJy4uLidcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgdGMubGkgJy5wYWdlLWl0ZW0nLCAtPlxuICAgICAgICB0Yy5hICcubnVtYmVyZWQtcGFnZS5wYWdlLWxpbmsnLFxuICAgICAgICBocmVmOicjJywgZGF0YTogcGFnZU51bWJlcjogcCwgcFxuICAgIHRjLmxpICcucGFnZS1pdGVtJywgLT5cbiAgICAgIHRjLmEgJy5uZXh0LnBhZ2UtbGluaycsIC0+XG4gICAgICAgIHRjLmkgJy5mYS5mYS1hcnJvdy1yaWdodCdcbiAgdWk6XG4gICAgbnVtYmVyZWRQYWdlOiAnLm51bWJlcmVkLXBhZ2UnXG4gICAgcHJldkJ1dHRvbjogJy5wcmV2J1xuICAgIG5leHRCdXR0b246ICcubmV4dCdcbiAgZXZlbnRzOlxuICAgICdjbGljayBAdWkubnVtYmVyZWRQYWdlJzogJ3R1cm5QYWdlJ1xuICAgICdjbGljayBAdWkucHJldkJ1dHRvbic6ICdnZXRQcmV2aW91c1BhZ2UnXG4gICAgJ2NsaWNrIEB1aS5uZXh0QnV0dG9uJzogJ2dldE5leHRQYWdlJ1xuICBvbkRvbVJlZnJlc2g6IC0+XG4gICAgQHVwZGF0ZU5hdkJ1dHRvbnMoKVxuICB0dXJuUGFnZTogKGV2ZW50KSAtPlxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICBlbCA9ICQoZXZlbnQudGFyZ2V0KVxuICAgIHBhZ2VOdW1iZXIgPSBlbC5hdHRyICdkYXRhLXBhZ2VudW1iZXInXG4gICAgQGNvbGxlY3Rpb24uZ2V0UGFnZSBOdW1iZXIgcGFnZU51bWJlclxuICAgIEB1cGRhdGVOYXZCdXR0b25zKClcblxuICB1cGRhdGVOYXZCdXR0b25zOiAtPlxuICAgIHN0YXRlID0gQGNvbGxlY3Rpb24uc3RhdGVcbiAgICBwcmV2SXRlbSA9IEB1aS5wcmV2QnV0dG9uLnBhcmVudCgpXG4gICAgaWYgc3RhdGUuY3VycmVudFBhZ2UgPT0gc3RhdGUuZmlyc3RQYWdlXG4gICAgICB1bmxlc3MgcHJldkl0ZW0uaGFzQ2xhc3MgJ2Rpc2FibGVkJ1xuICAgICAgICBwcmV2SXRlbS5hZGRDbGFzcyAnZGlzYWJsZWQnXG4gICAgZWxzZVxuICAgICAgaWYgcHJldkl0ZW0uaGFzQ2xhc3MgJ2Rpc2FibGVkJ1xuICAgICAgICBwcmV2SXRlbS5yZW1vdmVDbGFzcyAnZGlzYWJsZWQnXG4gICAgbmV4dEl0ZW0gPSBAdWkubmV4dEJ1dHRvbi5wYXJlbnQoKVxuICAgIGlmIHN0YXRlLmN1cnJlbnRQYWdlID09IHN0YXRlLmxhc3RQYWdlXG4gICAgICB1bmxlc3MgbmV4dEl0ZW0uaGFzQ2xhc3MgJ2Rpc2FibGVkJ1xuICAgICAgICBuZXh0SXRlbS5hZGRDbGFzcyAnZGlzYWJsZWQnXG4gICAgZWxzZVxuICAgICAgaWYgbmV4dEl0ZW0uYWRkQ2xhc3MgJ2Rpc2FibGVkJ1xuICAgICAgICBuZXh0SXRlbS5yZW1vdmVDbGFzcyAnZGlzYWJsZWQnXG4gICAgQHVpLm51bWJlcmVkUGFnZS5wYXJlbnQoKS5yZW1vdmVDbGFzcyAnYWN0aXZlJ1xuICAgIGNwID0gJChcIltkYXRhLXBhZ2VudW1iZXI9XFxcIiN7c3RhdGUuY3VycmVudFBhZ2V9XFxcIl1cIilcbiAgICBjcHAgPSBjcC5wYXJlbnQoKVxuICAgIGNwcC5hZGRDbGFzcyAnYWN0aXZlJ1xuXG4gIGdldEFub3RoZXJQYWdlOiAoZGlyZWN0aW9uKSAtPlxuICAgIHN0YXRlID0gQGNvbGxlY3Rpb24uc3RhdGVcbiAgICBvbkxhc3RQYWdlID0gc3RhdGUuY3VycmVudFBhZ2UgPT0gc3RhdGUubGFzdFBhZ2VcbiAgICAjIHdlIG5lZWQgdGhpcyBpbiBjYXNlIHRoZSBwYWdlcyBzdGFydCBhdCB6ZXJvXG4gICAgb25GaXJzdFBhZ2UgPSBzdGF0ZS5jdXJyZW50UGFnZSA9PSBzdGF0ZS5maXJzdFBhZ2VcbiAgICBpZiBkaXJlY3Rpb24gaXMgJ3ByZXYnIGFuZCBub3Qgb25GaXJzdFBhZ2VcbiAgICAgIGlmIHN0YXRlLmN1cnJlbnRQYWdlICE9IHN0YXRlLmZpcnN0UGFnZVxuICAgICAgICByZXNwID0gQGNvbGxlY3Rpb24uZ2V0UHJldmlvdXNQYWdlKClcbiAgICBlbHNlIGlmIGRpcmVjdGlvbiBpcyAnbmV4dCcgYW5kIG5vdCBvbkxhc3RQYWdlXG4gICAgICByZXNwID0gQGNvbGxlY3Rpb24uZ2V0TmV4dFBhZ2UoKVxuICAgIGVsc2UgaWYgb25MYXN0UGFnZVxuICAgICAgcmV0dXJuXG4gICAgZWxzZVxuICAgICAgdGhyb3cgbmV3IEVycm9yIFwiYmFkIGRpcmVjdGlvbiAnI3tkaXJlY3Rpb259J1wiXG4gICAgQHVwZGF0ZU5hdkJ1dHRvbnMoKVxuICAgIHJldHVybiByZXNwXG4gICAgXG4gIGdldFByZXZpb3VzUGFnZTogLT5cbiAgICByZXR1cm4gQGdldEFub3RoZXJQYWdlICdwcmV2J1xuICAgICAgXG4gIGdldE5leHRQYWdlOiAtPlxuICAgIHJldHVybiBAZ2V0QW5vdGhlclBhZ2UgJ25leHQnXG4gICAgICBcbiAgb25SZW5kZXI6IC0+XG4gICAgc2V0S2V5SGFuZGxlciA9IEBnZXRPcHRpb24gJ3NldEtleUhhbmRsZXInXG4gICAgaWYgc2V0S2V5SGFuZGxlclxuICAgICAgQG9uUmVuZGVySGFuZGxlS2V5cygpXG4gICAgICBcbiAgb25CZWZvcmVEZXN0cm95OiAtPlxuICAgIHNldEtleUhhbmRsZXIgPSBAZ2V0T3B0aW9uICdzZXRLZXlIYW5kbGVyJ1xuICAgIGlmIHNldEtleUhhbmRsZXJcbiAgICAgIEBvbkJlZm9yZURlc3Ryb3lIYW5kbGVLZXlzKClcbiAgICBcbiAga2V5Y29tbWFuZHM6XG4gICAgcHJldjogMzdcbiAgICBuZXh0OiAzOVxuICBoYW5kbGVLZXlDb21tYW5kOiAoY29tbWFuZCkgLT5cbiAgICBpZiBjb21tYW5kIGluIFsncHJldicsICduZXh0J11cbiAgICAgIEBnZXRBbm90aGVyUGFnZSBjb21tYW5kXG4gIGtleWRvd25IYW5kbGVyOiAoZXZlbnQpID0+XG4gICAgZm9yIGtleSwgdmFsdWUgb2YgQGtleWNvbW1hbmRzXG4gICAgICBpZiBldmVudC5rZXlDb2RlID09IHZhbHVlXG4gICAgICAgIEBoYW5kbGVLZXlDb21tYW5kIGtleVxuXG4gIG9uUmVuZGVySGFuZGxlS2V5czogLT5cbiAgICAkKFwiaHRtbFwiKS5rZXlkb3duIEBrZXlkb3duSGFuZGxlclxuXG4gIG9uQmVmb3JlRGVzdHJveUhhbmRsZUtleXM6IC0+XG4gICAgJChcImh0bWxcIikudW5iaW5kICdrZXlkb3duJywgQGtleWRvd25IYW5kbGVyXG4gICAgXG5leHBvcnQgZGVmYXVsdCBQYWdpbmF0aW9uVmlld1xuIl19
