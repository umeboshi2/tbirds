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
  return tc.a('.numbered-page.page-link', {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvcGFnaW5hdGUtYmFyLmpzIiwic291cmNlcyI6WyJ2aWV3cy9wYWdpbmF0ZS1iYXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsV0FBQSxFQUFBLGNBQUEsRUFBQSxjQUFBLEVBQUEsZ0JBQUE7RUFBQTs7QUFBQSxPQUFPLENBQVAsTUFBQTs7QUFDQSxPQUFPLFFBQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVMsSUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxFQUFQLE1BQUE7O0FBRUEsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDZCxjQUFBLEdBQWlCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixVQUF2Qjs7QUFFakIsZ0JBQUEsR0FBbUIsUUFBQSxDQUFDLENBQUQsQ0FBQTtFQUNqQixFQUFFLENBQUMsRUFBSCxDQUFNLFlBQU4sRUFBb0IsUUFBQSxDQUFBLENBQUEsRUFBQSxDQUFwQjtTQUNBLEVBQUUsQ0FBQyxDQUFILENBQUssMEJBQUwsRUFDQTtJQUFBLElBQUEsRUFBSyxHQUFMO0lBQVUsSUFBQSxFQUFNO01BQUEsVUFBQSxFQUFZO0lBQVo7RUFBaEIsQ0FEQSxFQUMrQixDQUQvQjtBQUZpQjs7QUFNbkIsT0FBQSxRQUFxQjs7RUFBTixNQUFBLGVBQUEsUUFBNkIsS0FBN0I7OztVQXdIYixDQUFBLHFCQUFBLENBQUE7OztJQXZIQSxPQUFTLENBQUEsQ0FBQTthQUNQO1FBQUEsYUFBQSxFQUFlLEtBQWY7UUFDQSxTQUFBLEVBQVcsRUFEWDtRQUVBLFNBQUEsRUFBVztNQUZYO0lBRE87O0lBTVQsZUFBaUIsQ0FBQSxDQUFBO2FBQ2Y7UUFBQSxVQUFBLEVBQVksSUFBQyxDQUFBLFVBQWI7UUFDQSxTQUFBLEVBQVcsSUFBQyxDQUFBLFNBQUQsQ0FBVyxXQUFYLENBRFg7UUFFQSxTQUFBLEVBQVcsSUFBQyxDQUFBLFNBQUQsQ0FBVyxXQUFYO01BRlg7SUFEZTs7SUE0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Q2xCLEVBQUUsQ0FBQyxDQUFILENBQUssMEJBQUwsRUFDQSxLQURBO1lBRGtCLENBQXBCLEVBRkY7O0FBS0EsbUJBTkY7U0FERjs7TUFRQSxFQUFFLENBQUMsRUFBSCxDQUFNLFlBQU4sRUFBb0IsUUFBQSxDQUFBLENBQUE7ZUFDbEIsRUFBRSxDQUFDLENBQUgsQ0FBSywwQkFBTCxFQUNBO1VBQUEsSUFBQSxFQUFLLEdBQUw7VUFBVSxJQUFBLEVBQU07WUFBQSxVQUFBLEVBQVk7VUFBWjtRQUFoQixDQURBLEVBQytCLENBRC9CO01BRGtCLENBQXBCO0lBVEY7V0FZQSxFQUFFLENBQUMsRUFBSCxDQUFNLFlBQU4sRUFBb0IsUUFBQSxDQUFBLENBQUE7YUFDbEIsRUFBRSxDQUFDLENBQUgsQ0FBSyxpQkFBTCxFQUF3QixRQUFBLENBQUEsQ0FBQTtlQUN0QixFQUFFLENBQUMsQ0FBSCxDQUFLLG9CQUFMO01BRHNCLENBQXhCO0lBRGtCLENBQXBCO0VBN0JzQixDQUFkOzsyQkFnQ1YsRUFBQSxHQUNFO0lBQUEsWUFBQSxFQUFjLGdCQUFkO0lBQ0EsVUFBQSxFQUFZLE9BRFo7SUFFQSxVQUFBLEVBQVk7RUFGWjs7MkJBR0YsTUFBQSxHQUNFO0lBQUEsd0JBQUEsRUFBMEIsVUFBMUI7SUFDQSxzQkFBQSxFQUF3QixpQkFEeEI7SUFFQSxzQkFBQSxFQUF3QjtFQUZ4Qjs7MkJBa0VGLFdBQUEsR0FDRTtJQUFBLElBQUEsRUFBTSxFQUFOO0lBQ0EsSUFBQSxFQUFNO0VBRE4iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdtZXNzYWdlcydcblxubnVtYmVyZWRQYWdlSXRlbSA9IChwKSAtPlxuICB0Yy5saSAnLnBhZ2UtaXRlbScsIC0+XG4gIHRjLmEgJy5udW1iZXJlZC1wYWdlLnBhZ2UtbGluaycsXG4gIGhyZWY6JyMnLCBkYXRhOiBwYWdlTnVtYmVyOiBwLCBwXG5cbiMgdGhpcyBuZWVkcyB0byBiZSBjb250YWluZWQgaW4gYSAnbmF2JyByZWdpb25cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2luYXRpb25WaWV3IGV4dGVuZHMgVmlld1xuICBvcHRpb25zOiAtPlxuICAgIHNldEtleUhhbmRsZXI6IGZhbHNlXG4gICAgYmFyTGVuZ3RoOiAxNVxuICAgIGJhclN0b3BBdDogN1xuICB0YWdOYW1lOiAndWwnXG4gIGNsYXNzTmFtZTogJ3BhZ2luYXRpb24nXG4gIHRlbXBsYXRlQ29udGV4dDogLT5cbiAgICBjb2xsZWN0aW9uOiBAY29sbGVjdGlvblxuICAgIGJhckxlbmd0aDogQGdldE9wdGlvbiAnYmFyTGVuZ3RoJ1xuICAgIGJhclN0b3BBdDogQGdldE9wdGlvbiAnYmFyU3RvcEF0J1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgaWYgbW9kZWwgaW5zdGFuY2VvZiBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gICAgICBzdGF0ZSA9IG1vZGVsLnN0YXRlXG4gICAgZWxzZVxuICAgICAgc3RhdGUgPSBtb2RlbC5jb2xsZWN0aW9uLnN0YXRlXG4gICAgdG90YWxQYWdlcyA9IHN0YXRlLnRvdGFsUGFnZXNcbiAgICBmaXJzdFBhZ2UgPSBzdGF0ZS5maXJzdFBhZ2VcbiAgICBsYXN0UGFnZSA9IHN0YXRlLmxhc3RQYWdlXG4gICAgZWxsaXBzaXMgPSBmYWxzZVxuICAgIGlmIGxhc3RQYWdlID4gbW9kZWwuYmFyTGVuZ3RoXG4gICAgICBlbGxpcHNpcyA9IHRydWVcbiAgICAgIHN0b3BBdCA9IG1vZGVsLmJhclN0b3BBdFxuICAgICAgcmVzdW1lQXQgPSBsYXN0UGFnZSAtIG1vZGVsLmJhclN0b3BBdFxuICAgIHRjLmxpICcucGFnZS1pdGVtJywgLT5cbiAgICAgIHRjLmEgJy5wcmV2LnBhZ2UtbGluaycsIC0+XG4gICAgICAgIHRjLmkgJy5mYS5mYS1hcnJvdy1sZWZ0J1xuICAgIGVsbGlwc2lzRHJhd24gPSBmYWxzZVxuICAgIGZvciBwIGluIFtmaXJzdFBhZ2UuLmxhc3RQYWdlXVxuICAgICAgaWYgZWxsaXBzaXNcbiAgICAgICAgaWYgcCA+PSBzdG9wQXQgYW5kIHAgPD0gcmVzdW1lQXRcbiAgICAgICAgICBpZiBub3QgZWxsaXBzaXNEcmF3blxuICAgICAgICAgICAgZWxsaXBzaXNEcmF3biA9IHRydWVcbiAgICAgICAgICAgIHRjLmxpICcucGFnZS1pdGVtJywgLT5cbiAgICAgICAgICAgICAgdGMuYSAnLmVsbGlwc2lzLXBhZ2UucGFnZS1saW5rJyxcbiAgICAgICAgICAgICAgJy4uLidcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgdGMubGkgJy5wYWdlLWl0ZW0nLCAtPlxuICAgICAgICB0Yy5hICcubnVtYmVyZWQtcGFnZS5wYWdlLWxpbmsnLFxuICAgICAgICBocmVmOicjJywgZGF0YTogcGFnZU51bWJlcjogcCwgcFxuICAgIHRjLmxpICcucGFnZS1pdGVtJywgLT5cbiAgICAgIHRjLmEgJy5uZXh0LnBhZ2UtbGluaycsIC0+XG4gICAgICAgIHRjLmkgJy5mYS5mYS1hcnJvdy1yaWdodCdcbiAgdWk6XG4gICAgbnVtYmVyZWRQYWdlOiAnLm51bWJlcmVkLXBhZ2UnXG4gICAgcHJldkJ1dHRvbjogJy5wcmV2J1xuICAgIG5leHRCdXR0b246ICcubmV4dCdcbiAgZXZlbnRzOlxuICAgICdjbGljayBAdWkubnVtYmVyZWRQYWdlJzogJ3R1cm5QYWdlJ1xuICAgICdjbGljayBAdWkucHJldkJ1dHRvbic6ICdnZXRQcmV2aW91c1BhZ2UnXG4gICAgJ2NsaWNrIEB1aS5uZXh0QnV0dG9uJzogJ2dldE5leHRQYWdlJ1xuICBvbkRvbVJlZnJlc2g6IC0+XG4gICAgQHVwZGF0ZU5hdkJ1dHRvbnMoKVxuICB0dXJuUGFnZTogKGV2ZW50KSAtPlxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICBlbCA9ICQoZXZlbnQudGFyZ2V0KVxuICAgIHBhZ2VOdW1iZXIgPSBlbC5hdHRyICdkYXRhLXBhZ2VudW1iZXInXG4gICAgQGNvbGxlY3Rpb24uZ2V0UGFnZSBOdW1iZXIgcGFnZU51bWJlclxuICAgIEB1cGRhdGVOYXZCdXR0b25zKClcblxuICB1cGRhdGVOYXZCdXR0b25zOiAtPlxuICAgIHN0YXRlID0gQGNvbGxlY3Rpb24uc3RhdGVcbiAgICBwcmV2SXRlbSA9IEB1aS5wcmV2QnV0dG9uLnBhcmVudCgpXG4gICAgaWYgc3RhdGUuY3VycmVudFBhZ2UgPT0gc3RhdGUuZmlyc3RQYWdlXG4gICAgICB1bmxlc3MgcHJldkl0ZW0uaGFzQ2xhc3MgJ2Rpc2FibGVkJ1xuICAgICAgICBwcmV2SXRlbS5hZGRDbGFzcyAnZGlzYWJsZWQnXG4gICAgZWxzZVxuICAgICAgaWYgcHJldkl0ZW0uaGFzQ2xhc3MgJ2Rpc2FibGVkJ1xuICAgICAgICBwcmV2SXRlbS5yZW1vdmVDbGFzcyAnZGlzYWJsZWQnXG4gICAgbmV4dEl0ZW0gPSBAdWkubmV4dEJ1dHRvbi5wYXJlbnQoKVxuICAgIGlmIHN0YXRlLmN1cnJlbnRQYWdlID09IHN0YXRlLmxhc3RQYWdlXG4gICAgICB1bmxlc3MgbmV4dEl0ZW0uaGFzQ2xhc3MgJ2Rpc2FibGVkJ1xuICAgICAgICBuZXh0SXRlbS5hZGRDbGFzcyAnZGlzYWJsZWQnXG4gICAgZWxzZVxuICAgICAgaWYgbmV4dEl0ZW0uYWRkQ2xhc3MgJ2Rpc2FibGVkJ1xuICAgICAgICBuZXh0SXRlbS5yZW1vdmVDbGFzcyAnZGlzYWJsZWQnXG4gICAgQHVpLm51bWJlcmVkUGFnZS5wYXJlbnQoKS5yZW1vdmVDbGFzcyAnYWN0aXZlJ1xuICAgIGNwID0gJChcIltkYXRhLXBhZ2VudW1iZXI9XFxcIiN7c3RhdGUuY3VycmVudFBhZ2V9XFxcIl1cIilcbiAgICBjcHAgPSBjcC5wYXJlbnQoKVxuICAgIGNwcC5hZGRDbGFzcyAnYWN0aXZlJ1xuXG4gIGdldEFub3RoZXJQYWdlOiAoZGlyZWN0aW9uKSAtPlxuICAgIHN0YXRlID0gQGNvbGxlY3Rpb24uc3RhdGVcbiAgICBvbkxhc3RQYWdlID0gc3RhdGUuY3VycmVudFBhZ2UgPT0gc3RhdGUubGFzdFBhZ2VcbiAgICAjIHdlIG5lZWQgdGhpcyBpbiBjYXNlIHRoZSBwYWdlcyBzdGFydCBhdCB6ZXJvXG4gICAgb25GaXJzdFBhZ2UgPSBzdGF0ZS5jdXJyZW50UGFnZSA9PSBzdGF0ZS5maXJzdFBhZ2VcbiAgICBpZiBkaXJlY3Rpb24gaXMgJ3ByZXYnIGFuZCBub3Qgb25GaXJzdFBhZ2VcbiAgICAgIGlmIHN0YXRlLmN1cnJlbnRQYWdlICE9IHN0YXRlLmZpcnN0UGFnZVxuICAgICAgICByZXNwID0gQGNvbGxlY3Rpb24uZ2V0UHJldmlvdXNQYWdlKClcbiAgICBlbHNlIGlmIGRpcmVjdGlvbiBpcyAnbmV4dCcgYW5kIG5vdCBvbkxhc3RQYWdlXG4gICAgICByZXNwID0gQGNvbGxlY3Rpb24uZ2V0TmV4dFBhZ2UoKVxuICAgIGVsc2UgaWYgb25MYXN0UGFnZVxuICAgICAgcmV0dXJuXG4gICAgZWxzZVxuICAgICAgdGhyb3cgbmV3IEVycm9yIFwiYmFkIGRpcmVjdGlvbiAnI3tkaXJlY3Rpb259J1wiXG4gICAgQHVwZGF0ZU5hdkJ1dHRvbnMoKVxuICAgIHJldHVybiByZXNwXG4gICAgXG4gIGdldFByZXZpb3VzUGFnZTogLT5cbiAgICByZXR1cm4gQGdldEFub3RoZXJQYWdlICdwcmV2J1xuICAgICAgXG4gIGdldE5leHRQYWdlOiAtPlxuICAgIHJldHVybiBAZ2V0QW5vdGhlclBhZ2UgJ25leHQnXG4gICAgICBcbiAgb25SZW5kZXI6IC0+XG4gICAgc2V0S2V5SGFuZGxlciA9IEBnZXRPcHRpb24gJ3NldEtleUhhbmRsZXInXG4gICAgaWYgc2V0S2V5SGFuZGxlclxuICAgICAgQG9uUmVuZGVySGFuZGxlS2V5cygpXG4gICAgICBcbiAgb25CZWZvcmVEZXN0cm95OiAtPlxuICAgIHNldEtleUhhbmRsZXIgPSBAZ2V0T3B0aW9uICdzZXRLZXlIYW5kbGVyJ1xuICAgIGlmIHNldEtleUhhbmRsZXJcbiAgICAgIEBvbkJlZm9yZURlc3Ryb3lIYW5kbGVLZXlzKClcbiAgICBcbiAga2V5Y29tbWFuZHM6XG4gICAgcHJldjogMzdcbiAgICBuZXh0OiAzOVxuICBoYW5kbGVLZXlDb21tYW5kOiAoY29tbWFuZCkgLT5cbiAgICBpZiBjb21tYW5kIGluIFsncHJldicsICduZXh0J11cbiAgICAgIEBnZXRBbm90aGVyUGFnZSBjb21tYW5kXG4gIGtleWRvd25IYW5kbGVyOiAoZXZlbnQpID0+XG4gICAgZm9yIGtleSwgdmFsdWUgb2YgQGtleWNvbW1hbmRzXG4gICAgICBpZiBldmVudC5rZXlDb2RlID09IHZhbHVlXG4gICAgICAgIEBoYW5kbGVLZXlDb21tYW5kIGtleVxuXG4gIG9uUmVuZGVySGFuZGxlS2V5czogLT5cbiAgICAkKFwiaHRtbFwiKS5rZXlkb3duIEBrZXlkb3duSGFuZGxlclxuXG4gIG9uQmVmb3JlRGVzdHJveUhhbmRsZUtleXM6IC0+XG4gICAgJChcImh0bWxcIikudW5iaW5kICdrZXlkb3duJywgQGtleWRvd25IYW5kbGVyXG4gICAgXG4iXX0=
