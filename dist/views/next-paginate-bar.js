var PaginationView, paginateButtons,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

import $ from 'jquery';

import {
  //import { Collection } from 'backbone'
  View
} from 'backbone.marionette';

import tc from 'teacup';

paginateButtons = {
  leftArrow: tc.renderable(function() {
    return tc.li('.page-item', function() {
      return tc.a('.prev.page-link.bg-body-d5', function() {
        return tc.i('.fa.fa-arrow-left');
      });
    });
  }),
  rightArrow: tc.renderable(function() {
    return tc.li('.page-item', function() {
      return tc.a('.next.page-link.bg-body-d5', function() {
        return tc.i('.fa.fa-arrow-right');
      });
    });
  }),
  pageItem: tc.renderable(function(index) {
    return tc.li('.page-item', function() {
      return tc.a('.numbered-page.page-link.bg-body-d5.text-dark', {
        href: '#',
        data: {
          pageNumber: index
        }
      }, `${index + 1}`);
    });
  }),
  ellipsisItem: tc.renderable(function() {
    return tc.li('.page-item', function() {
      return tc.a('.ellipsis-page.page-link.bg-body-d5.text-dark', '...');
    });
  })
};

PaginationView = (function() {
  /*
  stateItems = tc.renderable (model) ->
    if model instanceof Collection
      state = model.state
    else
      state = model.collection.state
    totalPages = state.totalPages
    firstPage = state.firstPage
    lastPage = state.lastPage
    currentPage = state.currentPage
    ellipsis = false
    if lastPage > model.barLength
      ellipsis = true
      stopAt = model.barStopAt
      resumeAt = lastPage - model.barStopAt
    ellipsisDrawn = false
    for p in [firstPage..lastPage]
      if ellipsis
  if p >= stopAt and p <= resumeAt
    if not ellipsisDrawn
      ellipsisDrawn = true
      tc.li '.page-item', ->
        tc.a '.ellipsis-page.page-link.bg-body-d5.text-dark',
        '...'
    continue
      paginateButtons.pageItem p
   * %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

  makePageItem = tc.renderable (model, currentIndex) ->
    state = model.state
    pb = paginateButtons
    if currentIndex == model.barLength - 2
      pb.ellipsisItem()
    else
      pb.pageItem currentIndex
    currentIndex += 1
   */
  /*

  stateItemsNew = tc.renderable (model) ->
  if model instanceof Collection
    state = model.state
  else
    state = model.collection.state
  #totalPages = state.totalPages
  #firstPage = state.firstPage
  #lastPage = state.lastPage
  #currentPage = state.currentPage
  s = state
  currentIndex = 0
  #totalItems = model.barLength
  pb = paginateButtons

  ellipsis = false
  if s.totalPages > model.barLength
    ellipsis = true
    if __DEV__ and DEBUG
  console.log "ellipsis", ellipsis
  #makePageItem(model, currentIndex) while currentIndex < model.barLength
  loop
    almostThere = model.barLength - 2
    lastIndex = model.barLength - 1
    leftEllipsisBreak = almostThere - 3
    leftEllipsis = almostThere - 4
    if currentIndex == leftEllipsis
  if state.currentPage > leftEllipsisBreak
  pb.ellipsisItem()
    if currentIndex == almostThere
  pb.ellipsisItem()
    else if currentIndex == lastIndex
  pb.pageItem state.lastPage
    else
  pb.pageItem currentIndex
    currentIndex += 1
    if currentIndex == model.barLength
  break
   */

  // this needs to be contained in a 'nav' region
  class PaginationView extends View {
    constructor() {
      super(...arguments);
      this.keydownHandler = this.keydownHandler.bind(this);
    }

    options() {
      return {
        setKeyHandler: false,
        barLength: 10,
        barStopAt: 7,
        _keysBinded: false
      };
    }

    templateContext() {
      return {
        collection: this.collection,
        barLength: this.getOption('barLength'),
        barStopAt: this.getOption('barStopAt')
      };
    }

    turnPage(event) {
      var el, pageNumber;
      event.preventDefault();
      el = $(event.target);
      pageNumber = el.attr('data-pagenumber');
      this.collection.getPage(Number(pageNumber));
      this.render();
      return this.updateNavButtons();
    }

    updateEndArrows(state) {
      var nextItem, prevItem;
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
          return nextItem.addClass('disabled');
        }
      } else {
        if (nextItem.addClass('disabled')) {
          return nextItem.removeClass('disabled');
        }
      }
    }

    deactivatePages() {
      this.ui.numberedPage.parent().removeClass('active');
      this.ui.numberedPage.removeClass('text-white');
      return this.ui.numberedPage.addClass('text-dark');
    }

    updateNavButtons() {
      var state;
      state = this.collection.state;
      this.updateEndArrows(state);
      this.deactivatePages();
      return this.setActivePage();
    }

    setActivePage() {
      var cp, cpp, selector, state;
      state = this.collection.state;
      selector = `[data-pagenumber="${state.currentPage}"]`;
      cp = $(selector);
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
      } else if (onFirstPage && direction === 'prev') {
        return;
      } else {
        throw new Error(`bad direction '${direction}'`);
      }
      this.render();
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

    onDomRefresh() {
      return this.setActivePage();
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
      if (!this.options._keysBinded) {
        $("html").keydown(this.keydownHandler);
        return this.options._keysBinded = true;
      }
    }

    onBeforeDestroyHandleKeys() {
      return $("html").unbind('keydown', this.keydownHandler);
    }

  };

  PaginationView.prototype.tagName = 'ul';

  PaginationView.prototype.className = 'pagination';

  PaginationView.prototype.template = tc.renderable(function() {
    var pb;
    pb = paginateButtons;
    pb.leftArrow();
    //stateItems model
    //stateItemsNew model
    return pb.rightArrow();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvbmV4dC1wYWdpbmF0ZS1iYXIuanMiLCJzb3VyY2VzIjpbInZpZXdzL25leHQtcGFnaW5hdGUtYmFyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLGNBQUEsRUFBQSxlQUFBO0VBQUE7O0FBQUEsT0FBTyxDQUFQLE1BQUE7O0FBRUEsT0FBQTs7RUFBUyxJQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQTs7QUFFQSxlQUFBLEdBQ0U7RUFBQSxTQUFBLEVBQVcsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUEsQ0FBQTtXQUN2QixFQUFFLENBQUMsRUFBSCxDQUFNLFlBQU4sRUFBb0IsUUFBQSxDQUFBLENBQUE7YUFDbEIsRUFBRSxDQUFDLENBQUgsQ0FBSyw0QkFBTCxFQUFtQyxRQUFBLENBQUEsQ0FBQTtlQUNqQyxFQUFFLENBQUMsQ0FBSCxDQUFLLG1CQUFMO01BRGlDLENBQW5DO0lBRGtCLENBQXBCO0VBRHVCLENBQWQsQ0FBWDtFQUlBLFVBQUEsRUFBWSxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQSxDQUFBO1dBQ3hCLEVBQUUsQ0FBQyxFQUFILENBQU0sWUFBTixFQUFvQixRQUFBLENBQUEsQ0FBQTthQUNsQixFQUFFLENBQUMsQ0FBSCxDQUFLLDRCQUFMLEVBQW1DLFFBQUEsQ0FBQSxDQUFBO2VBQ2pDLEVBQUUsQ0FBQyxDQUFILENBQUssb0JBQUw7TUFEaUMsQ0FBbkM7SUFEa0IsQ0FBcEI7RUFEd0IsQ0FBZCxDQUpaO0VBUUEsUUFBQSxFQUFVLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLEtBQUQsQ0FBQTtXQUN0QixFQUFFLENBQUMsRUFBSCxDQUFNLFlBQU4sRUFBb0IsUUFBQSxDQUFBLENBQUE7YUFDbEIsRUFBRSxDQUFDLENBQUgsQ0FBSywrQ0FBTCxFQUNBO1FBQUEsSUFBQSxFQUFLLEdBQUw7UUFBVSxJQUFBLEVBQU07VUFBQSxVQUFBLEVBQVk7UUFBWjtNQUFoQixDQURB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Q0FBa0IsR0FBbEIsR0FERjtTQUFBLE1BQUE7K0JBQUE7O01BREYsQ0FBQTs7SUFEYzs7SUFLaEIsa0JBQW9CLENBQUEsQ0FBQTtNQUNsQixJQUFBLENBQU8sSUFBQyxDQUFBLE9BQU8sQ0FBQyxXQUFoQjtRQUNFLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxPQUFWLENBQWtCLElBQUMsQ0FBQSxjQUFuQjtlQUNBLElBQUMsQ0FBQSxPQUFPLENBQUMsV0FBVCxHQUF1QixLQUZ6Qjs7SUFEa0I7O0lBS3BCLHlCQUEyQixDQUFBLENBQUE7YUFDekIsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLE1BQVYsQ0FBaUIsU0FBakIsRUFBNEIsSUFBQyxDQUFBLGNBQTdCO0lBRHlCOztFQWhJN0I7OzJCQU1FLE9BQUEsR0FBUzs7MkJBQ1QsU0FBQSxHQUFXOzsyQkFDWCxRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUEsQ0FBQTtBQUN0QixRQUFBO0lBQUEsRUFBQSxHQUFLO0lBQ0wsRUFBRSxDQUFDLFNBQUgsQ0FBQSxFQURBOzs7V0FJQSxFQUFFLENBQUMsVUFBSCxDQUFBO0VBTHNCLENBQWQ7OzJCQVdWLEVBQUEsR0FDRTtJQUFBLFlBQUEsRUFBYyxnQkFBZDtJQUNBLFVBQUEsRUFBWSxPQURaO0lBRUEsVUFBQSxFQUFZO0VBRlo7OzJCQUdGLE1BQUEsR0FDRTtJQUFBLHdCQUFBLEVBQTBCLFVBQTFCO0lBQ0Esc0JBQUEsRUFBd0IsaUJBRHhCO0lBRUEsc0JBQUEsRUFBd0I7RUFGeEI7OzJCQXVGRixXQUFBLEdBQ0U7SUFBQSxJQUFBLEVBQU0sRUFBTjtJQUNBLElBQUEsRUFBTTtFQUROOzs7Ozs7QUFtQkosT0FBQSxRQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuI2ltcG9ydCB7IENvbGxlY3Rpb24gfSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCB7IFZpZXcgfSBmcm9tICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuaW1wb3J0IHRjIGZyb20gJ3RlYWN1cCdcblxucGFnaW5hdGVCdXR0b25zID1cbiAgbGVmdEFycm93OiB0Yy5yZW5kZXJhYmxlIC0+XG4gICAgdGMubGkgJy5wYWdlLWl0ZW0nLCAtPlxuICAgICAgdGMuYSAnLnByZXYucGFnZS1saW5rLmJnLWJvZHktZDUnLCAtPlxuICAgICAgICB0Yy5pICcuZmEuZmEtYXJyb3ctbGVmdCdcbiAgcmlnaHRBcnJvdzogdGMucmVuZGVyYWJsZSAtPlxuICAgIHRjLmxpICcucGFnZS1pdGVtJywgLT5cbiAgICAgIHRjLmEgJy5uZXh0LnBhZ2UtbGluay5iZy1ib2R5LWQ1JywgLT5cbiAgICAgICAgdGMuaSAnLmZhLmZhLWFycm93LXJpZ2h0J1xuICBwYWdlSXRlbTogdGMucmVuZGVyYWJsZSAoaW5kZXgpIC0+XG4gICAgdGMubGkgJy5wYWdlLWl0ZW0nLCAtPlxuICAgICAgdGMuYSAnLm51bWJlcmVkLXBhZ2UucGFnZS1saW5rLmJnLWJvZHktZDUudGV4dC1kYXJrJyxcbiAgICAgIGhyZWY6JyMnLCBkYXRhOiBwYWdlTnVtYmVyOiBpbmRleCwgXCIje2luZGV4KzF9XCJcbiAgZWxsaXBzaXNJdGVtOiB0Yy5yZW5kZXJhYmxlIC0+XG4gICAgdGMubGkgJy5wYWdlLWl0ZW0nLCAtPlxuICAgICAgdGMuYSAnLmVsbGlwc2lzLXBhZ2UucGFnZS1saW5rLmJnLWJvZHktZDUudGV4dC1kYXJrJyxcbiAgICAgICcuLi4nXG4jIyNcbnN0YXRlSXRlbXMgPSB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgaWYgbW9kZWwgaW5zdGFuY2VvZiBDb2xsZWN0aW9uXG4gICAgc3RhdGUgPSBtb2RlbC5zdGF0ZVxuICBlbHNlXG4gICAgc3RhdGUgPSBtb2RlbC5jb2xsZWN0aW9uLnN0YXRlXG4gIHRvdGFsUGFnZXMgPSBzdGF0ZS50b3RhbFBhZ2VzXG4gIGZpcnN0UGFnZSA9IHN0YXRlLmZpcnN0UGFnZVxuICBsYXN0UGFnZSA9IHN0YXRlLmxhc3RQYWdlXG4gIGN1cnJlbnRQYWdlID0gc3RhdGUuY3VycmVudFBhZ2VcbiAgZWxsaXBzaXMgPSBmYWxzZVxuICBpZiBsYXN0UGFnZSA+IG1vZGVsLmJhckxlbmd0aFxuICAgIGVsbGlwc2lzID0gdHJ1ZVxuICAgIHN0b3BBdCA9IG1vZGVsLmJhclN0b3BBdFxuICAgIHJlc3VtZUF0ID0gbGFzdFBhZ2UgLSBtb2RlbC5iYXJTdG9wQXRcbiAgZWxsaXBzaXNEcmF3biA9IGZhbHNlXG4gIGZvciBwIGluIFtmaXJzdFBhZ2UuLmxhc3RQYWdlXVxuICAgIGlmIGVsbGlwc2lzXG4gICAgICBpZiBwID49IHN0b3BBdCBhbmQgcCA8PSByZXN1bWVBdFxuICAgICAgICBpZiBub3QgZWxsaXBzaXNEcmF3blxuICAgICAgICAgIGVsbGlwc2lzRHJhd24gPSB0cnVlXG4gICAgICAgICAgdGMubGkgJy5wYWdlLWl0ZW0nLCAtPlxuICAgICAgICAgICAgdGMuYSAnLmVsbGlwc2lzLXBhZ2UucGFnZS1saW5rLmJnLWJvZHktZDUudGV4dC1kYXJrJyxcbiAgICAgICAgICAgICcuLi4nXG4gICAgICAgIGNvbnRpbnVlXG4gICAgcGFnaW5hdGVCdXR0b25zLnBhZ2VJdGVtIHBcbiMgJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSVcblxubWFrZVBhZ2VJdGVtID0gdGMucmVuZGVyYWJsZSAobW9kZWwsIGN1cnJlbnRJbmRleCkgLT5cbiAgc3RhdGUgPSBtb2RlbC5zdGF0ZVxuICBwYiA9IHBhZ2luYXRlQnV0dG9uc1xuICBpZiBjdXJyZW50SW5kZXggPT0gbW9kZWwuYmFyTGVuZ3RoIC0gMlxuICAgIHBiLmVsbGlwc2lzSXRlbSgpXG4gIGVsc2VcbiAgICBwYi5wYWdlSXRlbSBjdXJyZW50SW5kZXhcbiAgY3VycmVudEluZGV4ICs9IDFcbiMjI1xuXG4jIyNcblxuc3RhdGVJdGVtc05ldyA9IHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICBpZiBtb2RlbCBpbnN0YW5jZW9mIENvbGxlY3Rpb25cbiAgICBzdGF0ZSA9IG1vZGVsLnN0YXRlXG4gIGVsc2VcbiAgICBzdGF0ZSA9IG1vZGVsLmNvbGxlY3Rpb24uc3RhdGVcbiAgI3RvdGFsUGFnZXMgPSBzdGF0ZS50b3RhbFBhZ2VzXG4gICNmaXJzdFBhZ2UgPSBzdGF0ZS5maXJzdFBhZ2VcbiAgI2xhc3RQYWdlID0gc3RhdGUubGFzdFBhZ2VcbiAgI2N1cnJlbnRQYWdlID0gc3RhdGUuY3VycmVudFBhZ2VcbiAgcyA9IHN0YXRlXG4gIGN1cnJlbnRJbmRleCA9IDBcbiAgI3RvdGFsSXRlbXMgPSBtb2RlbC5iYXJMZW5ndGhcbiAgcGIgPSBwYWdpbmF0ZUJ1dHRvbnNcbiAgXG4gIGVsbGlwc2lzID0gZmFsc2VcbiAgaWYgcy50b3RhbFBhZ2VzID4gbW9kZWwuYmFyTGVuZ3RoXG4gICAgZWxsaXBzaXMgPSB0cnVlXG4gICAgaWYgX19ERVZfXyBhbmQgREVCVUdcbiAgICAgIGNvbnNvbGUubG9nIFwiZWxsaXBzaXNcIiwgZWxsaXBzaXNcbiAgI21ha2VQYWdlSXRlbShtb2RlbCwgY3VycmVudEluZGV4KSB3aGlsZSBjdXJyZW50SW5kZXggPCBtb2RlbC5iYXJMZW5ndGhcbiAgbG9vcFxuICAgIGFsbW9zdFRoZXJlID0gbW9kZWwuYmFyTGVuZ3RoIC0gMlxuICAgIGxhc3RJbmRleCA9IG1vZGVsLmJhckxlbmd0aCAtIDFcbiAgICBsZWZ0RWxsaXBzaXNCcmVhayA9IGFsbW9zdFRoZXJlIC0gM1xuICAgIGxlZnRFbGxpcHNpcyA9IGFsbW9zdFRoZXJlIC0gNFxuICAgIGlmIGN1cnJlbnRJbmRleCA9PSBsZWZ0RWxsaXBzaXNcbiAgICAgIGlmIHN0YXRlLmN1cnJlbnRQYWdlID4gbGVmdEVsbGlwc2lzQnJlYWtcbiAgICAgICAgcGIuZWxsaXBzaXNJdGVtKClcbiAgICBpZiBjdXJyZW50SW5kZXggPT0gYWxtb3N0VGhlcmVcbiAgICAgIHBiLmVsbGlwc2lzSXRlbSgpXG4gICAgZWxzZSBpZiBjdXJyZW50SW5kZXggPT0gbGFzdEluZGV4XG4gICAgICBwYi5wYWdlSXRlbSBzdGF0ZS5sYXN0UGFnZVxuICAgIGVsc2VcbiAgICAgIHBiLnBhZ2VJdGVtIGN1cnJlbnRJbmRleFxuICAgIGN1cnJlbnRJbmRleCArPSAxXG4gICAgaWYgY3VycmVudEluZGV4ID09IG1vZGVsLmJhckxlbmd0aFxuICAgICAgYnJlYWtcbiAgIyMjXG4gIFxuIyB0aGlzIG5lZWRzIHRvIGJlIGNvbnRhaW5lZCBpbiBhICduYXYnIHJlZ2lvblxuY2xhc3MgUGFnaW5hdGlvblZpZXcgZXh0ZW5kcyBWaWV3XG4gIG9wdGlvbnM6IC0+XG4gICAgc2V0S2V5SGFuZGxlcjogZmFsc2VcbiAgICBiYXJMZW5ndGg6IDEwXG4gICAgYmFyU3RvcEF0OiA3XG4gICAgX2tleXNCaW5kZWQ6IGZhbHNlXG4gIHRhZ05hbWU6ICd1bCdcbiAgY2xhc3NOYW1lOiAncGFnaW5hdGlvbidcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgLT5cbiAgICBwYiA9IHBhZ2luYXRlQnV0dG9uc1xuICAgIHBiLmxlZnRBcnJvdygpXG4gICAgI3N0YXRlSXRlbXMgbW9kZWxcbiAgICAjc3RhdGVJdGVtc05ldyBtb2RlbFxuICAgIHBiLnJpZ2h0QXJyb3coKVxuICAgIFxuICB0ZW1wbGF0ZUNvbnRleHQ6IC0+XG4gICAgY29sbGVjdGlvbjogQGNvbGxlY3Rpb25cbiAgICBiYXJMZW5ndGg6IEBnZXRPcHRpb24gJ2Jhckxlbmd0aCdcbiAgICBiYXJTdG9wQXQ6IEBnZXRPcHRpb24gJ2JhclN0b3BBdCdcbiAgdWk6XG4gICAgbnVtYmVyZWRQYWdlOiAnLm51bWJlcmVkLXBhZ2UnXG4gICAgcHJldkJ1dHRvbjogJy5wcmV2J1xuICAgIG5leHRCdXR0b246ICcubmV4dCdcbiAgZXZlbnRzOlxuICAgICdjbGljayBAdWkubnVtYmVyZWRQYWdlJzogJ3R1cm5QYWdlJ1xuICAgICdjbGljayBAdWkucHJldkJ1dHRvbic6ICdnZXRQcmV2aW91c1BhZ2UnXG4gICAgJ2NsaWNrIEB1aS5uZXh0QnV0dG9uJzogJ2dldE5leHRQYWdlJ1xuICB0dXJuUGFnZTogKGV2ZW50KSAtPlxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICBlbCA9ICQoZXZlbnQudGFyZ2V0KVxuICAgIHBhZ2VOdW1iZXIgPSBlbC5hdHRyICdkYXRhLXBhZ2VudW1iZXInXG4gICAgQGNvbGxlY3Rpb24uZ2V0UGFnZSBOdW1iZXIgcGFnZU51bWJlclxuICAgIEByZW5kZXIoKVxuICAgIEB1cGRhdGVOYXZCdXR0b25zKClcblxuICB1cGRhdGVFbmRBcnJvd3M6IChzdGF0ZSkgLT5cbiAgICBwcmV2SXRlbSA9IEB1aS5wcmV2QnV0dG9uLnBhcmVudCgpXG4gICAgaWYgc3RhdGUuY3VycmVudFBhZ2UgPT0gc3RhdGUuZmlyc3RQYWdlXG4gICAgICB1bmxlc3MgcHJldkl0ZW0uaGFzQ2xhc3MgJ2Rpc2FibGVkJ1xuICAgICAgICBwcmV2SXRlbS5hZGRDbGFzcyAnZGlzYWJsZWQnXG4gICAgZWxzZVxuICAgICAgaWYgcHJldkl0ZW0uaGFzQ2xhc3MgJ2Rpc2FibGVkJ1xuICAgICAgICBwcmV2SXRlbS5yZW1vdmVDbGFzcyAnZGlzYWJsZWQnXG4gICAgbmV4dEl0ZW0gPSBAdWkubmV4dEJ1dHRvbi5wYXJlbnQoKVxuICAgIGlmIHN0YXRlLmN1cnJlbnRQYWdlID09IHN0YXRlLmxhc3RQYWdlXG4gICAgICB1bmxlc3MgbmV4dEl0ZW0uaGFzQ2xhc3MgJ2Rpc2FibGVkJ1xuICAgICAgICBuZXh0SXRlbS5hZGRDbGFzcyAnZGlzYWJsZWQnXG4gICAgZWxzZVxuICAgICAgaWYgbmV4dEl0ZW0uYWRkQ2xhc3MgJ2Rpc2FibGVkJ1xuICAgICAgICBuZXh0SXRlbS5yZW1vdmVDbGFzcyAnZGlzYWJsZWQnXG5cbiAgZGVhY3RpdmF0ZVBhZ2VzOiAtPlxuICAgIEB1aS5udW1iZXJlZFBhZ2UucGFyZW50KCkucmVtb3ZlQ2xhc3MgJ2FjdGl2ZSdcbiAgICBAdWkubnVtYmVyZWRQYWdlLnJlbW92ZUNsYXNzICd0ZXh0LXdoaXRlJ1xuICAgIEB1aS5udW1iZXJlZFBhZ2UuYWRkQ2xhc3MgJ3RleHQtZGFyaydcbiAgICBcbiAgdXBkYXRlTmF2QnV0dG9uczogLT5cbiAgICBzdGF0ZSA9IEBjb2xsZWN0aW9uLnN0YXRlXG4gICAgQHVwZGF0ZUVuZEFycm93cyBzdGF0ZVxuICAgIEBkZWFjdGl2YXRlUGFnZXMoKVxuICAgIEBzZXRBY3RpdmVQYWdlKClcblxuXG4gIHNldEFjdGl2ZVBhZ2U6IC0+XG4gICAgc3RhdGUgPSBAY29sbGVjdGlvbi5zdGF0ZVxuICAgIHNlbGVjdG9yID0gXCJbZGF0YS1wYWdlbnVtYmVyPVxcXCIje3N0YXRlLmN1cnJlbnRQYWdlfVxcXCJdXCJcbiAgICBjcCA9ICQoc2VsZWN0b3IpXG4gICAgXG4gICAgY3BwID0gY3AucGFyZW50KClcbiAgICBjcHAuYWRkQ2xhc3MgJ2FjdGl2ZSdcbiAgICBjcC5yZW1vdmVDbGFzcyAndGV4dC1kYXJrJ1xuICAgIGNwLmFkZENsYXNzICd0ZXh0LXdoaXRlJ1xuICAgIFxuICBnZXRBbm90aGVyUGFnZTogKGRpcmVjdGlvbikgLT5cbiAgICBzdGF0ZSA9IEBjb2xsZWN0aW9uLnN0YXRlXG4gICAgb25MYXN0UGFnZSA9IHN0YXRlLmN1cnJlbnRQYWdlID09IHN0YXRlLmxhc3RQYWdlXG4gICAgIyB3ZSBuZWVkIHRoaXMgaW4gY2FzZSB0aGUgcGFnZXMgc3RhcnQgYXQgemVyb1xuICAgIG9uRmlyc3RQYWdlID0gc3RhdGUuY3VycmVudFBhZ2UgPT0gc3RhdGUuZmlyc3RQYWdlXG4gICAgaWYgZGlyZWN0aW9uIGlzICdwcmV2JyBhbmQgbm90IG9uRmlyc3RQYWdlXG4gICAgICBpZiBzdGF0ZS5jdXJyZW50UGFnZSAhPSBzdGF0ZS5maXJzdFBhZ2VcbiAgICAgICAgcmVzcCA9IEBjb2xsZWN0aW9uLmdldFByZXZpb3VzUGFnZSgpXG4gICAgZWxzZSBpZiBkaXJlY3Rpb24gaXMgJ25leHQnIGFuZCBub3Qgb25MYXN0UGFnZVxuICAgICAgcmVzcCA9IEBjb2xsZWN0aW9uLmdldE5leHRQYWdlKClcbiAgICBlbHNlIGlmIG9uTGFzdFBhZ2VcbiAgICAgIHJldHVyblxuICAgIGVsc2UgaWYgb25GaXJzdFBhZ2UgYW5kIGRpcmVjdGlvbiBpcyAncHJldidcbiAgICAgIHJldHVyblxuICAgIGVsc2VcbiAgICAgIHRocm93IG5ldyBFcnJvciBcImJhZCBkaXJlY3Rpb24gJyN7ZGlyZWN0aW9ufSdcIlxuICAgIEByZW5kZXIoKVxuICAgIHJldHVybiByZXNwXG4gICAgXG4gIGdldFByZXZpb3VzUGFnZTogLT5cbiAgICByZXR1cm4gQGdldEFub3RoZXJQYWdlICdwcmV2J1xuICAgICAgXG4gIGdldE5leHRQYWdlOiAtPlxuICAgIHJldHVybiBAZ2V0QW5vdGhlclBhZ2UgJ25leHQnXG4gICAgICBcbiAgb25SZW5kZXI6IC0+XG4gICAgc2V0S2V5SGFuZGxlciA9IEBnZXRPcHRpb24gJ3NldEtleUhhbmRsZXInXG4gICAgaWYgc2V0S2V5SGFuZGxlclxuICAgICAgQG9uUmVuZGVySGFuZGxlS2V5cygpXG5cbiAgb25Eb21SZWZyZXNoOiAtPlxuICAgIEBzZXRBY3RpdmVQYWdlKClcbiAgICBcbiAgb25CZWZvcmVEZXN0cm95OiAtPlxuICAgIHNldEtleUhhbmRsZXIgPSBAZ2V0T3B0aW9uICdzZXRLZXlIYW5kbGVyJ1xuICAgIGlmIHNldEtleUhhbmRsZXJcbiAgICAgIEBvbkJlZm9yZURlc3Ryb3lIYW5kbGVLZXlzKClcbiAgICBcbiAga2V5Y29tbWFuZHM6XG4gICAgcHJldjogMzdcbiAgICBuZXh0OiAzOVxuICBoYW5kbGVLZXlDb21tYW5kOiAoY29tbWFuZCkgLT5cbiAgICBpZiBjb21tYW5kIGluIFsncHJldicsICduZXh0J11cbiAgICAgIEBnZXRBbm90aGVyUGFnZSBjb21tYW5kXG5cbiAga2V5ZG93bkhhbmRsZXI6IChldmVudCkgPT5cbiAgICBmb3Iga2V5LCB2YWx1ZSBvZiBAa2V5Y29tbWFuZHNcbiAgICAgIGlmIGV2ZW50LmtleUNvZGUgPT0gdmFsdWVcbiAgICAgICAgQGhhbmRsZUtleUNvbW1hbmQga2V5XG5cbiAgb25SZW5kZXJIYW5kbGVLZXlzOiAtPlxuICAgIHVubGVzcyBAb3B0aW9ucy5fa2V5c0JpbmRlZFxuICAgICAgJChcImh0bWxcIikua2V5ZG93biBAa2V5ZG93bkhhbmRsZXJcbiAgICAgIEBvcHRpb25zLl9rZXlzQmluZGVkID0gdHJ1ZVxuICAgICAgXG4gIG9uQmVmb3JlRGVzdHJveUhhbmRsZUtleXM6IC0+XG4gICAgJChcImh0bWxcIikudW5iaW5kICdrZXlkb3duJywgQGtleWRvd25IYW5kbGVyXG4gICAgXG5leHBvcnQgZGVmYXVsdCBQYWdpbmF0aW9uVmlld1xuIl19
