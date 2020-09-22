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
  //tc.a '.numbered-page.page-link.bg-body-d5.text-dark',
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvcGFnaW5hdGUtYmFyLmpzIiwic291cmNlcyI6WyJ2aWV3cy9wYWdpbmF0ZS1iYXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsV0FBQSxFQUFBLGNBQUEsRUFBQSxjQUFBLEVBQUEsZ0JBQUE7RUFBQTs7QUFBQSxPQUFPLENBQVAsTUFBQTs7QUFDQSxPQUFPLFFBQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVMsSUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxFQUFQLE1BQUE7O0FBRUEsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDZCxjQUFBLEdBQWlCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixVQUF2Qjs7QUFFakIsZ0JBQUEsR0FBbUIsUUFBQSxDQUFDLENBQUQsQ0FBQTtFQUNqQixFQUFFLENBQUMsRUFBSCxDQUFNLFlBQU4sRUFBb0IsUUFBQSxDQUFBLENBQUEsRUFBQSxDQUFwQixFQUFBOztTQUVBLEVBQUUsQ0FBQyxDQUFILENBQUssMEJBQUwsRUFDQTtJQUFBLElBQUEsRUFBSyxHQUFMO0lBQVUsSUFBQSxFQUFNO01BQUEsVUFBQSxFQUFZO0lBQVo7RUFBaEIsQ0FEQSxFQUMrQixDQUQvQjtBQUhpQjs7QUFPbkIsT0FBQSxRQUFxQjs7RUFBTixNQUFBLGVBQUEsUUFBNkIsS0FBN0I7OztVQTRIYixDQUFBLHFCQUFBLENBQUE7OztJQTNIQSxPQUFTLENBQUEsQ0FBQTthQUNQO1FBQUEsYUFBQSxFQUFlLEtBQWY7UUFDQSxTQUFBLEVBQVcsRUFEWDtRQUVBLFNBQUEsRUFBVztNQUZYO0lBRE87O0lBTVQsZUFBaUIsQ0FBQSxDQUFBO2FBQ2Y7UUFBQSxVQUFBLEVBQVksSUFBQyxDQUFBLFVBQWI7UUFDQSxTQUFBLEVBQVcsSUFBQyxDQUFBLFNBQUQsQ0FBVyxXQUFYLENBRFg7UUFFQSxTQUFBLEVBQVcsSUFBQyxDQUFBLFNBQUQsQ0FBVyxXQUFYO01BRlg7SUFE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QjtJQUNoQixLQUFTLDRHQUFUO01BQ0UsSUFBRyxRQUFIO1FBQ0UsSUFBRyxDQUFBLElBQUssTUFBTCxJQUFnQixDQUFBLElBQUssUUFBeEI7VUFDRSxJQUFHLENBQUksYUFBUDtZQUNFLGFBQUEsR0FBZ0I7WUFDaEIsRUFBRSxDQUFDLEVBQUgsQ0FBTSxZQUFOLEVBQW9CLFFBQUEsQ0FBQSxDQUFBO3FCQUNsQixFQUFFLENBQUMsQ0FBSCxDQUFLLCtDQUFMLEVBQ0EsS0FEQTtZQURrQixDQUFwQixFQUZGOztBQUtBLG1CQU5GO1NBREY7O01BUUEsRUFBRSxDQUFDLEVBQUgsQ0FBTSxZQUFOLEVBQW9CLFFBQUEsQ0FBQSxDQUFBO2VBQ2xCLEVBQUUsQ0FBQyxDQUFILENBQUssK0NBQUwsRUFDQTtVQUFBLElBQUEsRUFBSyxHQUFMO1VBQVUsSUFBQSxFQUFNO1lBQUEsVUFBQSxFQUFZO1VBQVo7UUFBaEIsQ0FEQSxFQUMrQixDQUQvQjtNQURrQixDQUFwQjtJQVRGO1dBWUEsRUFBRSxDQUFDLEVBQUgsQ0FBTSxZQUFOLEVBQW9CLFFBQUEsQ0FBQSxDQUFBO2FBQ2xCLEVBQUUsQ0FBQyxDQUFILENBQUssNEJBQUwsRUFBbUMsUUFBQSxDQUFBLENBQUE7ZUFDakMsRUFBRSxDQUFDLENBQUgsQ0FBSyxvQkFBTDtNQURpQyxDQUFuQztJQURrQixDQUFwQjtFQTdCc0IsQ0FBZDs7MkJBZ0NWLEVBQUEsR0FDRTtJQUFBLFlBQUEsRUFBYyxnQkFBZDtJQUNBLFVBQUEsRUFBWSxPQURaO0lBRUEsVUFBQSxFQUFZO0VBRlo7OzJCQUdGLE1BQUEsR0FDRTtJQUFBLHdCQUFBLEVBQTBCLFVBQTFCO0lBQ0Esc0JBQUEsRUFBd0IsaUJBRHhCO0lBRUEsc0JBQUEsRUFBd0I7RUFGeEI7OzJCQXNFRixXQUFBLEdBQ0U7SUFBQSxJQUFBLEVBQU0sRUFBTjtJQUNBLElBQUEsRUFBTTtFQUROIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5cbm51bWJlcmVkUGFnZUl0ZW0gPSAocCkgLT5cbiAgdGMubGkgJy5wYWdlLWl0ZW0nLCAtPlxuICAjdGMuYSAnLm51bWJlcmVkLXBhZ2UucGFnZS1saW5rLmJnLWJvZHktZDUudGV4dC1kYXJrJyxcbiAgdGMuYSAnLm51bWJlcmVkLXBhZ2UucGFnZS1saW5rJyxcbiAgaHJlZjonIycsIGRhdGE6IHBhZ2VOdW1iZXI6IHAsIHBcblxuIyB0aGlzIG5lZWRzIHRvIGJlIGNvbnRhaW5lZCBpbiBhICduYXYnIHJlZ2lvblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFnaW5hdGlvblZpZXcgZXh0ZW5kcyBWaWV3XG4gIG9wdGlvbnM6IC0+XG4gICAgc2V0S2V5SGFuZGxlcjogZmFsc2VcbiAgICBiYXJMZW5ndGg6IDE1XG4gICAgYmFyU3RvcEF0OiA3XG4gIHRhZ05hbWU6ICd1bCdcbiAgY2xhc3NOYW1lOiAncGFnaW5hdGlvbidcbiAgdGVtcGxhdGVDb250ZXh0OiAtPlxuICAgIGNvbGxlY3Rpb246IEBjb2xsZWN0aW9uXG4gICAgYmFyTGVuZ3RoOiBAZ2V0T3B0aW9uICdiYXJMZW5ndGgnXG4gICAgYmFyU3RvcEF0OiBAZ2V0T3B0aW9uICdiYXJTdG9wQXQnXG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICBpZiBtb2RlbCBpbnN0YW5jZW9mIEJhY2tib25lLkNvbGxlY3Rpb25cbiAgICAgIHN0YXRlID0gbW9kZWwuc3RhdGVcbiAgICBlbHNlXG4gICAgICBzdGF0ZSA9IG1vZGVsLmNvbGxlY3Rpb24uc3RhdGVcbiAgICB0b3RhbFBhZ2VzID0gc3RhdGUudG90YWxQYWdlc1xuICAgIGZpcnN0UGFnZSA9IHN0YXRlLmZpcnN0UGFnZVxuICAgIGxhc3RQYWdlID0gc3RhdGUubGFzdFBhZ2VcbiAgICBlbGxpcHNpcyA9IGZhbHNlXG4gICAgaWYgbGFzdFBhZ2UgPiBtb2RlbC5iYXJMZW5ndGhcbiAgICAgIGVsbGlwc2lzID0gdHJ1ZVxuICAgICAgc3RvcEF0ID0gbW9kZWwuYmFyU3RvcEF0XG4gICAgICByZXN1bWVBdCA9IGxhc3RQYWdlIC0gbW9kZWwuYmFyU3RvcEF0XG4gICAgdGMubGkgJy5wYWdlLWl0ZW0nLCAtPlxuICAgICAgdGMuYSAnLnByZXYucGFnZS1saW5rLmJnLWJvZHktZDUnLCAtPlxuICAgICAgICB0Yy5pICcuZmEuZmEtYXJyb3ctbGVmdCdcbiAgICBlbGxpcHNpc0RyYXduID0gZmFsc2VcbiAgICBmb3IgcCBpbiBbZmlyc3RQYWdlLi5sYXN0UGFnZV1cbiAgICAgIGlmIGVsbGlwc2lzXG4gICAgICAgIGlmIHAgPj0gc3RvcEF0IGFuZCBwIDw9IHJlc3VtZUF0XG4gICAgICAgICAgaWYgbm90IGVsbGlwc2lzRHJhd25cbiAgICAgICAgICAgIGVsbGlwc2lzRHJhd24gPSB0cnVlXG4gICAgICAgICAgICB0Yy5saSAnLnBhZ2UtaXRlbScsIC0+XG4gICAgICAgICAgICAgIHRjLmEgJy5lbGxpcHNpcy1wYWdlLnBhZ2UtbGluay5iZy1ib2R5LWQ1LnRleHQtZGFyaycsXG4gICAgICAgICAgICAgICcuLi4nXG4gICAgICAgICAgY29udGludWVcbiAgICAgIHRjLmxpICcucGFnZS1pdGVtJywgLT5cbiAgICAgICAgdGMuYSAnLm51bWJlcmVkLXBhZ2UucGFnZS1saW5rLmJnLWJvZHktZDUudGV4dC1kYXJrJyxcbiAgICAgICAgaHJlZjonIycsIGRhdGE6IHBhZ2VOdW1iZXI6IHAsIHBcbiAgICB0Yy5saSAnLnBhZ2UtaXRlbScsIC0+XG4gICAgICB0Yy5hICcubmV4dC5wYWdlLWxpbmsuYmctYm9keS1kNScsIC0+XG4gICAgICAgIHRjLmkgJy5mYS5mYS1hcnJvdy1yaWdodCdcbiAgdWk6XG4gICAgbnVtYmVyZWRQYWdlOiAnLm51bWJlcmVkLXBhZ2UnXG4gICAgcHJldkJ1dHRvbjogJy5wcmV2J1xuICAgIG5leHRCdXR0b246ICcubmV4dCdcbiAgZXZlbnRzOlxuICAgICdjbGljayBAdWkubnVtYmVyZWRQYWdlJzogJ3R1cm5QYWdlJ1xuICAgICdjbGljayBAdWkucHJldkJ1dHRvbic6ICdnZXRQcmV2aW91c1BhZ2UnXG4gICAgJ2NsaWNrIEB1aS5uZXh0QnV0dG9uJzogJ2dldE5leHRQYWdlJ1xuICBvbkRvbVJlZnJlc2g6IC0+XG4gICAgQHVwZGF0ZU5hdkJ1dHRvbnMoKVxuICB0dXJuUGFnZTogKGV2ZW50KSAtPlxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICBlbCA9ICQoZXZlbnQudGFyZ2V0KVxuICAgIHBhZ2VOdW1iZXIgPSBlbC5hdHRyICdkYXRhLXBhZ2VudW1iZXInXG4gICAgQGNvbGxlY3Rpb24uZ2V0UGFnZSBOdW1iZXIgcGFnZU51bWJlclxuICAgIEB1cGRhdGVOYXZCdXR0b25zKClcblxuICB1cGRhdGVOYXZCdXR0b25zOiAtPlxuICAgIHN0YXRlID0gQGNvbGxlY3Rpb24uc3RhdGVcbiAgICBwcmV2SXRlbSA9IEB1aS5wcmV2QnV0dG9uLnBhcmVudCgpXG4gICAgaWYgc3RhdGUuY3VycmVudFBhZ2UgPT0gc3RhdGUuZmlyc3RQYWdlXG4gICAgICB1bmxlc3MgcHJldkl0ZW0uaGFzQ2xhc3MgJ2Rpc2FibGVkJ1xuICAgICAgICBwcmV2SXRlbS5hZGRDbGFzcyAnZGlzYWJsZWQnXG4gICAgZWxzZVxuICAgICAgaWYgcHJldkl0ZW0uaGFzQ2xhc3MgJ2Rpc2FibGVkJ1xuICAgICAgICBwcmV2SXRlbS5yZW1vdmVDbGFzcyAnZGlzYWJsZWQnXG4gICAgbmV4dEl0ZW0gPSBAdWkubmV4dEJ1dHRvbi5wYXJlbnQoKVxuICAgIGlmIHN0YXRlLmN1cnJlbnRQYWdlID09IHN0YXRlLmxhc3RQYWdlXG4gICAgICB1bmxlc3MgbmV4dEl0ZW0uaGFzQ2xhc3MgJ2Rpc2FibGVkJ1xuICAgICAgICBuZXh0SXRlbS5hZGRDbGFzcyAnZGlzYWJsZWQnXG4gICAgZWxzZVxuICAgICAgaWYgbmV4dEl0ZW0uYWRkQ2xhc3MgJ2Rpc2FibGVkJ1xuICAgICAgICBuZXh0SXRlbS5yZW1vdmVDbGFzcyAnZGlzYWJsZWQnXG4gICAgQHVpLm51bWJlcmVkUGFnZS5wYXJlbnQoKS5yZW1vdmVDbGFzcyAnYWN0aXZlJ1xuICAgIEB1aS5udW1iZXJlZFBhZ2UucmVtb3ZlQ2xhc3MgJ3RleHQtd2hpdGUnXG4gICAgQHVpLm51bWJlcmVkUGFnZS5hZGRDbGFzcyAndGV4dC1kYXJrJ1xuICAgIGNwID0gJChcIltkYXRhLXBhZ2VudW1iZXI9XFxcIiN7c3RhdGUuY3VycmVudFBhZ2V9XFxcIl1cIilcbiAgICBjcHAgPSBjcC5wYXJlbnQoKVxuICAgIGNwcC5hZGRDbGFzcyAnYWN0aXZlJ1xuICAgIGNwLnJlbW92ZUNsYXNzICd0ZXh0LWRhcmsnXG4gICAgY3AuYWRkQ2xhc3MgJ3RleHQtd2hpdGUnXG5cbiAgZ2V0QW5vdGhlclBhZ2U6IChkaXJlY3Rpb24pIC0+XG4gICAgc3RhdGUgPSBAY29sbGVjdGlvbi5zdGF0ZVxuICAgIG9uTGFzdFBhZ2UgPSBzdGF0ZS5jdXJyZW50UGFnZSA9PSBzdGF0ZS5sYXN0UGFnZVxuICAgICMgd2UgbmVlZCB0aGlzIGluIGNhc2UgdGhlIHBhZ2VzIHN0YXJ0IGF0IHplcm9cbiAgICBvbkZpcnN0UGFnZSA9IHN0YXRlLmN1cnJlbnRQYWdlID09IHN0YXRlLmZpcnN0UGFnZVxuICAgIGlmIGRpcmVjdGlvbiBpcyAncHJldicgYW5kIG5vdCBvbkZpcnN0UGFnZVxuICAgICAgaWYgc3RhdGUuY3VycmVudFBhZ2UgIT0gc3RhdGUuZmlyc3RQYWdlXG4gICAgICAgIHJlc3AgPSBAY29sbGVjdGlvbi5nZXRQcmV2aW91c1BhZ2UoKVxuICAgIGVsc2UgaWYgZGlyZWN0aW9uIGlzICduZXh0JyBhbmQgbm90IG9uTGFzdFBhZ2VcbiAgICAgIHJlc3AgPSBAY29sbGVjdGlvbi5nZXROZXh0UGFnZSgpXG4gICAgZWxzZSBpZiBvbkxhc3RQYWdlXG4gICAgICByZXR1cm5cbiAgICBlbHNlXG4gICAgICB0aHJvdyBuZXcgRXJyb3IgXCJiYWQgZGlyZWN0aW9uICcje2RpcmVjdGlvbn0nXCJcbiAgICBAdXBkYXRlTmF2QnV0dG9ucygpXG4gICAgcmV0dXJuIHJlc3BcbiAgICBcbiAgZ2V0UHJldmlvdXNQYWdlOiAtPlxuICAgIHJldHVybiBAZ2V0QW5vdGhlclBhZ2UgJ3ByZXYnXG4gICAgICBcbiAgZ2V0TmV4dFBhZ2U6IC0+XG4gICAgcmV0dXJuIEBnZXRBbm90aGVyUGFnZSAnbmV4dCdcbiAgICAgIFxuICBvblJlbmRlcjogLT5cbiAgICBzZXRLZXlIYW5kbGVyID0gQGdldE9wdGlvbiAnc2V0S2V5SGFuZGxlcidcbiAgICBpZiBzZXRLZXlIYW5kbGVyXG4gICAgICBAb25SZW5kZXJIYW5kbGVLZXlzKClcbiAgICAgIFxuICBvbkJlZm9yZURlc3Ryb3k6IC0+XG4gICAgc2V0S2V5SGFuZGxlciA9IEBnZXRPcHRpb24gJ3NldEtleUhhbmRsZXInXG4gICAgaWYgc2V0S2V5SGFuZGxlclxuICAgICAgQG9uQmVmb3JlRGVzdHJveUhhbmRsZUtleXMoKVxuICAgIFxuICBrZXljb21tYW5kczpcbiAgICBwcmV2OiAzN1xuICAgIG5leHQ6IDM5XG4gIGhhbmRsZUtleUNvbW1hbmQ6IChjb21tYW5kKSAtPlxuICAgIGlmIGNvbW1hbmQgaW4gWydwcmV2JywgJ25leHQnXVxuICAgICAgQGdldEFub3RoZXJQYWdlIGNvbW1hbmRcbiAga2V5ZG93bkhhbmRsZXI6IChldmVudCkgPT5cbiAgICBmb3Iga2V5LCB2YWx1ZSBvZiBAa2V5Y29tbWFuZHNcbiAgICAgIGlmIGV2ZW50LmtleUNvZGUgPT0gdmFsdWVcbiAgICAgICAgQGhhbmRsZUtleUNvbW1hbmQga2V5XG5cbiAgb25SZW5kZXJIYW5kbGVLZXlzOiAtPlxuICAgICQoXCJodG1sXCIpLmtleWRvd24gQGtleWRvd25IYW5kbGVyXG5cbiAgb25CZWZvcmVEZXN0cm95SGFuZGxlS2V5czogLT5cbiAgICAkKFwiaHRtbFwiKS51bmJpbmQgJ2tleWRvd24nLCBAa2V5ZG93bkhhbmRsZXJcbiAgICBcbiJdfQ==
