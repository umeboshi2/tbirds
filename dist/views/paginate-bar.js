var MainChannel, MessageChannel, PaginationView,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

import $ from 'jquery';

import Backbone from 'backbone';

import Marionette from 'backbone.marionette';

import tc from 'teacup';

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

export default PaginationView = (function() {
  // this needs to be contained in a 'nav' region
  class PaginationView extends Marionette.View {
    constructor() {
      super(...arguments);
      this.keydownHandler = this.keydownHandler.bind(this);
    }

    templateContext() {
      return {
        collection: this.collection
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
    var firstPage, i, lastPage, p, ref, ref1, state, totalPages;
    if (model instanceof Backbone.Collection) {
      state = model.state;
    } else {
      state = model.collection.state;
    }
    totalPages = state.totalPages;
    firstPage = state.firstPage;
    lastPage = state.lastPage;
    tc.li('.page-item', function() {
      return tc.a('.prev.page-link.bg-body-d5', function() {
        return tc.i('.fa.fa-arrow-left');
      });
    });
    for (p = i = ref = firstPage, ref1 = lastPage; (ref <= ref1 ? i <= ref1 : i >= ref1); p = ref <= ref1 ? ++i : --i) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvcGFnaW5hdGUtYmFyLmpzIiwic291cmNlcyI6WyJ2aWV3cy9wYWdpbmF0ZS1iYXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsV0FBQSxFQUFBLGNBQUEsRUFBQSxjQUFBO0VBQUE7O0FBQUEsT0FBTyxDQUFQLE1BQUE7O0FBQ0EsT0FBTyxRQUFQLE1BQUE7O0FBQ0EsT0FBTyxVQUFQLE1BQUE7O0FBQ0EsT0FBTyxFQUFQLE1BQUE7O0FBRUEsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDZCxjQUFBLEdBQWlCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixVQUF2Qjs7QUFHakIsT0FBQSxRQUFxQjs7RUFBTixNQUFBLGVBQUEsUUFBNkIsVUFBVSxDQUFDLEtBQXhDOzs7VUF3R2IsQ0FBQSxxQkFBQSxDQUFBOzs7SUFuRkEsZUFBaUIsQ0FBQSxDQUFBO2FBQ2Y7UUFBQSxVQUFBLEVBQVksSUFBQyxDQUFBO01BQWI7SUFEZTs7SUFVakIsWUFBYyxDQUFBLENBQUE7YUFDWixJQUFDLENBQUEsZ0JBQUQsQ0FBQTtJQURZOztJQUVkLFFBQVUsQ0FBQyxLQUFELENBQUE7QUFDUixVQUFBLEVBQUEsRUFBQTtNQUFBLEtBQUssQ0FBQyxjQUFOLENBQUE7TUFDQSxFQUFBLEdBQUssQ0FBQSxDQUFFLEtBQUssQ0FBQyxNQUFSO01BQ0wsVUFBQSxHQUFhLEVBQUUsQ0FBQyxJQUFILENBQVEsaUJBQVI7TUFDYixJQUFDLENBQUEsVUFBVSxDQUFDLE9BQVosQ0FBb0IsTUFBQSxDQUFPLFVBQVAsQ0FBcEI7YUFDQSxJQUFDLENBQUEsZ0JBQUQsQ0FBQTtJQUxROztJQU9WLGdCQUFrQixDQUFBLENBQUE7QUFDaEIsVUFBQSxFQUFBLEVBQUEsR0FBQSxFQUFBLFFBQUEsRUFBQSxRQUFBLEVBQUE7TUFBQSxLQUFBLEdBQVEsSUFBQyxDQUFBLFVBQVUsQ0FBQztNQUNwQixRQUFBLEdBQVcs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bnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdtZXNzYWdlcydcblxuIyB0aGlzIG5lZWRzIHRvIGJlIGNvbnRhaW5lZCBpbiBhICduYXYnIHJlZ2lvblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFnaW5hdGlvblZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLlZpZXdcbiAgdGFnTmFtZTogJ3VsJ1xuICBjbGFzc05hbWU6ICdwYWdpbmF0aW9uJ1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gICAgaWYgbW9kZWwgaW5zdGFuY2VvZiBCYWNrYm9uZS5Db2xsZWN0aW9uXG4gICAgICBzdGF0ZSA9IG1vZGVsLnN0YXRlXG4gICAgZWxzZVxuICAgICAgc3RhdGUgPSBtb2RlbC5jb2xsZWN0aW9uLnN0YXRlXG4gICAgdG90YWxQYWdlcyA9IHN0YXRlLnRvdGFsUGFnZXNcbiAgICBmaXJzdFBhZ2UgPSBzdGF0ZS5maXJzdFBhZ2VcbiAgICBsYXN0UGFnZSA9IHN0YXRlLmxhc3RQYWdlXG4gICAgdGMubGkgJy5wYWdlLWl0ZW0nLCAtPlxuICAgICAgdGMuYSAnLnByZXYucGFnZS1saW5rLmJnLWJvZHktZDUnLCAtPlxuICAgICAgICB0Yy5pICcuZmEuZmEtYXJyb3ctbGVmdCdcbiAgICBmb3IgcCBpbiBbZmlyc3RQYWdlLi5sYXN0UGFnZV1cbiAgICAgIHRjLmxpICcucGFnZS1pdGVtJywgLT5cbiAgICAgICAgdGMuYSAnLm51bWJlcmVkLXBhZ2UucGFnZS1saW5rLmJnLWJvZHktZDUudGV4dC1kYXJrJyxcbiAgICAgICAgaHJlZjonIycsIGRhdGE6IHBhZ2VOdW1iZXI6IHAsIHBcbiAgICB0Yy5saSAnLnBhZ2UtaXRlbScsIC0+XG4gICAgICB0Yy5hICcubmV4dC5wYWdlLWxpbmsuYmctYm9keS1kNScsIC0+XG4gICAgICAgIHRjLmkgJy5mYS5mYS1hcnJvdy1yaWdodCdcbiAgdGVtcGxhdGVDb250ZXh0OiAtPlxuICAgIGNvbGxlY3Rpb246IEBjb2xsZWN0aW9uXG4gIHVpOlxuICAgIG51bWJlcmVkUGFnZTogJy5udW1iZXJlZC1wYWdlJ1xuICAgIHByZXZCdXR0b246ICcucHJldidcbiAgICBuZXh0QnV0dG9uOiAnLm5leHQnXG4gIGV2ZW50czpcbiAgICAnY2xpY2sgQHVpLm51bWJlcmVkUGFnZSc6ICd0dXJuUGFnZSdcbiAgICAnY2xpY2sgQHVpLnByZXZCdXR0b24nOiAnZ2V0UHJldmlvdXNQYWdlJ1xuICAgICdjbGljayBAdWkubmV4dEJ1dHRvbic6ICdnZXROZXh0UGFnZSdcbiAgb25Eb21SZWZyZXNoOiAtPlxuICAgIEB1cGRhdGVOYXZCdXR0b25zKClcbiAgdHVyblBhZ2U6IChldmVudCkgLT5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgZWwgPSAkKGV2ZW50LnRhcmdldClcbiAgICBwYWdlTnVtYmVyID0gZWwuYXR0ciAnZGF0YS1wYWdlbnVtYmVyJ1xuICAgIEBjb2xsZWN0aW9uLmdldFBhZ2UgTnVtYmVyIHBhZ2VOdW1iZXJcbiAgICBAdXBkYXRlTmF2QnV0dG9ucygpXG5cbiAgdXBkYXRlTmF2QnV0dG9uczogLT5cbiAgICBzdGF0ZSA9IEBjb2xsZWN0aW9uLnN0YXRlXG4gICAgcHJldkl0ZW0gPSBAdWkucHJldkJ1dHRvbi5wYXJlbnQoKVxuICAgIGlmIHN0YXRlLmN1cnJlbnRQYWdlID09IHN0YXRlLmZpcnN0UGFnZVxuICAgICAgdW5sZXNzIHByZXZJdGVtLmhhc0NsYXNzICdkaXNhYmxlZCdcbiAgICAgICAgcHJldkl0ZW0uYWRkQ2xhc3MgJ2Rpc2FibGVkJ1xuICAgIGVsc2VcbiAgICAgIGlmIHByZXZJdGVtLmhhc0NsYXNzICdkaXNhYmxlZCdcbiAgICAgICAgcHJldkl0ZW0ucmVtb3ZlQ2xhc3MgJ2Rpc2FibGVkJ1xuICAgIG5leHRJdGVtID0gQHVpLm5leHRCdXR0b24ucGFyZW50KClcbiAgICBpZiBzdGF0ZS5jdXJyZW50UGFnZSA9PSBzdGF0ZS5sYXN0UGFnZVxuICAgICAgdW5sZXNzIG5leHRJdGVtLmhhc0NsYXNzICdkaXNhYmxlZCdcbiAgICAgICAgbmV4dEl0ZW0uYWRkQ2xhc3MgJ2Rpc2FibGVkJ1xuICAgIGVsc2VcbiAgICAgIGlmIG5leHRJdGVtLmFkZENsYXNzICdkaXNhYmxlZCdcbiAgICAgICAgbmV4dEl0ZW0ucmVtb3ZlQ2xhc3MgJ2Rpc2FibGVkJ1xuICAgIEB1aS5udW1iZXJlZFBhZ2UucGFyZW50KCkucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICBAdWkubnVtYmVyZWRQYWdlLnJlbW92ZUNsYXNzICd0ZXh0LXdoaXRlJ1xuICAgIEB1aS5udW1iZXJlZFBhZ2UuYWRkQ2xhc3MgJ3RleHQtZGFyaydcbiAgICBjcCA9ICQoXCJbZGF0YS1wYWdlbnVtYmVyPVxcXCIje3N0YXRlLmN1cnJlbnRQYWdlfVxcXCJdXCIpXG4gICAgY3BwID0gY3AucGFyZW50KClcbiAgICBjcHAuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICBjcC5yZW1vdmVDbGFzcyAndGV4dC1kYXJrJ1xuICAgIGNwLmFkZENsYXNzICd0ZXh0LXdoaXRlJ1xuXG4gIGdldEFub3RoZXJQYWdlOiAoZGlyZWN0aW9uKSAtPlxuICAgIHN0YXRlID0gQGNvbGxlY3Rpb24uc3RhdGVcbiAgICBvbkxhc3RQYWdlID0gc3RhdGUuY3VycmVudFBhZ2UgPT0gc3RhdGUubGFzdFBhZ2VcbiAgICAjIHdlIG5lZWQgdGhpcyBpbiBjYXNlIHRoZSBwYWdlcyBzdGFydCBhdCB6ZXJvXG4gICAgb25GaXJzdFBhZ2UgPSBzdGF0ZS5jdXJyZW50UGFnZSA9PSBzdGF0ZS5maXJzdFBhZ2VcbiAgICBpZiBkaXJlY3Rpb24gaXMgJ3ByZXYnIGFuZCBub3Qgb25GaXJzdFBhZ2VcbiAgICAgIGlmIHN0YXRlLmN1cnJlbnRQYWdlICE9IHN0YXRlLmZpcnN0UGFnZVxuICAgICAgICByZXNwID0gQGNvbGxlY3Rpb24uZ2V0UHJldmlvdXNQYWdlKClcbiAgICBlbHNlIGlmIGRpcmVjdGlvbiBpcyAnbmV4dCcgYW5kIG5vdCBvbkxhc3RQYWdlXG4gICAgICByZXNwID0gQGNvbGxlY3Rpb24uZ2V0TmV4dFBhZ2UoKVxuICAgIGVsc2UgaWYgb25MYXN0UGFnZVxuICAgICAgcmV0dXJuXG4gICAgZWxzZVxuICAgICAgdGhyb3cgbmV3IEVycm9yIFwiYmFkIGRpcmVjdGlvbiAnI3tkaXJlY3Rpb259J1wiXG4gICAgQHVwZGF0ZU5hdkJ1dHRvbnMoKVxuICAgIHJldHVybiByZXNwXG4gICAgXG4gIGdldFByZXZpb3VzUGFnZTogLT5cbiAgICByZXR1cm4gQGdldEFub3RoZXJQYWdlICdwcmV2J1xuICAgICAgXG4gIGdldE5leHRQYWdlOiAtPlxuICAgIHJldHVybiBAZ2V0QW5vdGhlclBhZ2UgJ25leHQnXG4gICAgICBcbiAgb25SZW5kZXI6IC0+XG4gICAgc2V0S2V5SGFuZGxlciA9IEBnZXRPcHRpb24gJ3NldEtleUhhbmRsZXInXG4gICAgaWYgc2V0S2V5SGFuZGxlclxuICAgICAgQG9uUmVuZGVySGFuZGxlS2V5cygpXG4gICAgICBcbiAgb25CZWZvcmVEZXN0cm95OiAtPlxuICAgIHNldEtleUhhbmRsZXIgPSBAZ2V0T3B0aW9uICdzZXRLZXlIYW5kbGVyJ1xuICAgIGlmIHNldEtleUhhbmRsZXJcbiAgICAgIEBvbkJlZm9yZURlc3Ryb3lIYW5kbGVLZXlzKClcbiAgICBcbiAga2V5Y29tbWFuZHM6XG4gICAgcHJldjogMzdcbiAgICBuZXh0OiAzOVxuICBoYW5kbGVLZXlDb21tYW5kOiAoY29tbWFuZCkgLT5cbiAgICBpZiBjb21tYW5kIGluIFsncHJldicsICduZXh0J11cbiAgICAgIEBnZXRBbm90aGVyUGFnZSBjb21tYW5kXG4gIGtleWRvd25IYW5kbGVyOiAoZXZlbnQpID0+XG4gICAgZm9yIGtleSwgdmFsdWUgb2YgQGtleWNvbW1hbmRzXG4gICAgICBpZiBldmVudC5rZXlDb2RlID09IHZhbHVlXG4gICAgICAgIEBoYW5kbGVLZXlDb21tYW5kIGtleVxuXG4gIG9uUmVuZGVySGFuZGxlS2V5czogLT5cbiAgICAkKFwiaHRtbFwiKS5rZXlkb3duIEBrZXlkb3duSGFuZGxlclxuXG4gIG9uQmVmb3JlRGVzdHJveUhhbmRsZUtleXM6IC0+XG4gICAgJChcImh0bWxcIikudW5iaW5kICdrZXlkb3duJywgQGtleWRvd25IYW5kbGVyXG4gICAgXG4iXX0=
