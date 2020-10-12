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
      selector = `[data-pagenumber=\"${state.currentPage}\"]`;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvbmV4dC1wYWdpbmF0ZS1iYXIuanMiLCJzb3VyY2VzIjpbInZpZXdzL25leHQtcGFnaW5hdGUtYmFyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLGNBQUEsRUFBQSxlQUFBO0VBQUE7O0FBQUEsT0FBTyxDQUFQLE1BQUE7O0FBRUEsT0FBQTs7RUFBUyxJQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLEVBQVAsTUFBQTs7QUFFQSxlQUFBLEdBQ0U7RUFBQSxTQUFBLEVBQVcsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUEsQ0FBQTtXQUN2QixFQUFFLENBQUMsRUFBSCxDQUFNLFlBQU4sRUFBb0IsUUFBQSxDQUFBLENBQUE7YUFDbEIsRUFBRSxDQUFDLENBQUgsQ0FBSyw0QkFBTCxFQUFtQyxRQUFBLENBQUEsQ0FBQTtlQUNqQyxFQUFFLENBQUMsQ0FBSCxDQUFLLG1CQUFMO01BRGlDLENBQW5DO0lBRGtCLENBQXBCO0VBRHVCLENBQWQsQ0FBWDtFQUlBLFVBQUEsRUFBWSxFQUFFLENBQUMsVUFBSCxDQUFjLFFBQUEsQ0FBQSxDQUFBO1dBQ3hCLEVBQUUsQ0FBQyxFQUFILENBQU0sWUFBTixFQUFvQixRQUFBLENBQUEsQ0FBQTthQUNsQixFQUFFLENBQUMsQ0FBSCxDQUFLLDRCQUFMLEVBQW1DLFFBQUEsQ0FBQSxDQUFBO2VBQ2pDLEVBQUUsQ0FBQyxDQUFILENBQUssb0JBQUw7TUFEaUMsQ0FBbkM7SUFEa0IsQ0FBcEI7RUFEd0IsQ0FBZCxDQUpaO0VBUUEsUUFBQSxFQUFVLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFDLEtBQUQsQ0FBQTtXQUN0QixFQUFFLENBQUMsRUFBSCxDQUFNLFlBQU4sRUFBb0IsUUFBQSxDQUFBLENBQUE7YUFDbEIsRUFBRSxDQUFDLENBQUgsQ0FBSywrQ0FBTCxFQUNBO1FBQUEsSUFBQSxFQUFLLEdBQUw7UUFBVSxJQUFBLEVBQU07VUFBQSxVQUFBLEVBQVk7UUFBWjtNQUFoQixDQURB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QUE7K0JBQUE7O01BREYsQ0FBQTs7SUFEYzs7SUFLaEIsa0JBQW9CLENBQUEsQ0FBQTtNQUNsQixLQUFPLElBQUMsQ0FBQSxPQUFPLENBQUMsV0FBaEI7UUFDRSxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsT0FBVixDQUFrQixJQUFDLENBQUEsY0FBbkI7ZUFDQSxJQUFDLENBQUEsT0FBTyxDQUFDLFdBQVQsR0FBdUIsS0FGekI7O0lBRGtCOztJQUtwQix5QkFBMkIsQ0FBQSxDQUFBO2FBQ3pCLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxNQUFWLENBQWlCLFNBQWpCLEVBQTRCLElBQUMsQ0FBQSxjQUE3QjtJQUR5Qjs7RUFoSTdCOzsyQkFNRSxPQUFBLEdBQVM7OzJCQUNULFNBQUEsR0FBVzs7MkJBQ1gsUUFBQSxHQUFVLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFBLENBQUE7QUFDMUIsUUFBQTtJQUFJLEVBQUEsR0FBSztJQUNMLEVBQUUsQ0FBQyxTQUFILENBQUEsRUFESjs7O1dBSUksRUFBRSxDQUFDLFVBQUgsQ0FBQTtFQUxzQixDQUFkOzsyQkFXVixFQUFBLEdBQ0U7SUFBQSxZQUFBLEVBQWMsZ0JBQWQ7SUFDQSxVQUFBLEVBQVksT0FEWjtJQUVBLFVBQUEsRUFBWTtFQUZaOzsyQkFHRixNQUFBLEdBQ0U7SUFBQSx3QkFBQSxFQUEwQixVQUExQjtJQUNBLHNCQUFBLEVBQXdCLGlCQUR4QjtJQUVBLHNCQUFBLEVBQXdCO0VBRnhCOzsyQkF1RkYsV0FBQSxHQUNFO0lBQUEsSUFBQSxFQUFNLEVBQU47SUFDQSxJQUFBLEVBQU07RUFETjs7Ozs7O0FBbUJKLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSdcbiNpbXBvcnQgeyBDb2xsZWN0aW9uIH0gZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5cbnBhZ2luYXRlQnV0dG9ucyA9XG4gIGxlZnRBcnJvdzogdGMucmVuZGVyYWJsZSAtPlxuICAgIHRjLmxpICcucGFnZS1pdGVtJywgLT5cbiAgICAgIHRjLmEgJy5wcmV2LnBhZ2UtbGluay5iZy1ib2R5LWQ1JywgLT5cbiAgICAgICAgdGMuaSAnLmZhLmZhLWFycm93LWxlZnQnXG4gIHJpZ2h0QXJyb3c6IHRjLnJlbmRlcmFibGUgLT5cbiAgICB0Yy5saSAnLnBhZ2UtaXRlbScsIC0+XG4gICAgICB0Yy5hICcubmV4dC5wYWdlLWxpbmsuYmctYm9keS1kNScsIC0+XG4gICAgICAgIHRjLmkgJy5mYS5mYS1hcnJvdy1yaWdodCdcbiAgcGFnZUl0ZW06IHRjLnJlbmRlcmFibGUgKGluZGV4KSAtPlxuICAgIHRjLmxpICcucGFnZS1pdGVtJywgLT5cbiAgICAgIHRjLmEgJy5udW1iZXJlZC1wYWdlLnBhZ2UtbGluay5iZy1ib2R5LWQ1LnRleHQtZGFyaycsXG4gICAgICBocmVmOicjJywgZGF0YTogcGFnZU51bWJlcjogaW5kZXgsIFwiI3tpbmRleCsxfVwiXG4gIGVsbGlwc2lzSXRlbTogdGMucmVuZGVyYWJsZSAtPlxuICAgIHRjLmxpICcucGFnZS1pdGVtJywgLT5cbiAgICAgIHRjLmEgJy5lbGxpcHNpcy1wYWdlLnBhZ2UtbGluay5iZy1ib2R5LWQ1LnRleHQtZGFyaycsXG4gICAgICAnLi4uJ1xuIyMjXG5zdGF0ZUl0ZW1zID0gdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gIGlmIG1vZGVsIGluc3RhbmNlb2YgQ29sbGVjdGlvblxuICAgIHN0YXRlID0gbW9kZWwuc3RhdGVcbiAgZWxzZVxuICAgIHN0YXRlID0gbW9kZWwuY29sbGVjdGlvbi5zdGF0ZVxuICB0b3RhbFBhZ2VzID0gc3RhdGUudG90YWxQYWdlc1xuICBmaXJzdFBhZ2UgPSBzdGF0ZS5maXJzdFBhZ2VcbiAgbGFzdFBhZ2UgPSBzdGF0ZS5sYXN0UGFnZVxuICBjdXJyZW50UGFnZSA9IHN0YXRlLmN1cnJlbnRQYWdlXG4gIGVsbGlwc2lzID0gZmFsc2VcbiAgaWYgbGFzdFBhZ2UgPiBtb2RlbC5iYXJMZW5ndGhcbiAgICBlbGxpcHNpcyA9IHRydWVcbiAgICBzdG9wQXQgPSBtb2RlbC5iYXJTdG9wQXRcbiAgICByZXN1bWVBdCA9IGxhc3RQYWdlIC0gbW9kZWwuYmFyU3RvcEF0XG4gIGVsbGlwc2lzRHJhd24gPSBmYWxzZVxuICBmb3IgcCBpbiBbZmlyc3RQYWdlLi5sYXN0UGFnZV1cbiAgICBpZiBlbGxpcHNpc1xuICAgICAgaWYgcCA+PSBzdG9wQXQgYW5kIHAgPD0gcmVzdW1lQXRcbiAgICAgICAgaWYgbm90IGVsbGlwc2lzRHJhd25cbiAgICAgICAgICBlbGxpcHNpc0RyYXduID0gdHJ1ZVxuICAgICAgICAgIHRjLmxpICcucGFnZS1pdGVtJywgLT5cbiAgICAgICAgICAgIHRjLmEgJy5lbGxpcHNpcy1wYWdlLnBhZ2UtbGluay5iZy1ib2R5LWQ1LnRleHQtZGFyaycsXG4gICAgICAgICAgICAnLi4uJ1xuICAgICAgICBjb250aW51ZVxuICAgIHBhZ2luYXRlQnV0dG9ucy5wYWdlSXRlbSBwXG4jICUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlXG5cbm1ha2VQYWdlSXRlbSA9IHRjLnJlbmRlcmFibGUgKG1vZGVsLCBjdXJyZW50SW5kZXgpIC0+XG4gIHN0YXRlID0gbW9kZWwuc3RhdGVcbiAgcGIgPSBwYWdpbmF0ZUJ1dHRvbnNcbiAgaWYgY3VycmVudEluZGV4ID09IG1vZGVsLmJhckxlbmd0aCAtIDJcbiAgICBwYi5lbGxpcHNpc0l0ZW0oKVxuICBlbHNlXG4gICAgcGIucGFnZUl0ZW0gY3VycmVudEluZGV4XG4gIGN1cnJlbnRJbmRleCArPSAxXG4jIyNcblxuIyMjXG5cbnN0YXRlSXRlbXNOZXcgPSB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgaWYgbW9kZWwgaW5zdGFuY2VvZiBDb2xsZWN0aW9uXG4gICAgc3RhdGUgPSBtb2RlbC5zdGF0ZVxuICBlbHNlXG4gICAgc3RhdGUgPSBtb2RlbC5jb2xsZWN0aW9uLnN0YXRlXG4gICN0b3RhbFBhZ2VzID0gc3RhdGUudG90YWxQYWdlc1xuICAjZmlyc3RQYWdlID0gc3RhdGUuZmlyc3RQYWdlXG4gICNsYXN0UGFnZSA9IHN0YXRlLmxhc3RQYWdlXG4gICNjdXJyZW50UGFnZSA9IHN0YXRlLmN1cnJlbnRQYWdlXG4gIHMgPSBzdGF0ZVxuICBjdXJyZW50SW5kZXggPSAwXG4gICN0b3RhbEl0ZW1zID0gbW9kZWwuYmFyTGVuZ3RoXG4gIHBiID0gcGFnaW5hdGVCdXR0b25zXG4gIFxuICBlbGxpcHNpcyA9IGZhbHNlXG4gIGlmIHMudG90YWxQYWdlcyA+IG1vZGVsLmJhckxlbmd0aFxuICAgIGVsbGlwc2lzID0gdHJ1ZVxuICAgIGlmIF9fREVWX18gYW5kIERFQlVHXG4gICAgICBjb25zb2xlLmxvZyBcImVsbGlwc2lzXCIsIGVsbGlwc2lzXG4gICNtYWtlUGFnZUl0ZW0obW9kZWwsIGN1cnJlbnRJbmRleCkgd2hpbGUgY3VycmVudEluZGV4IDwgbW9kZWwuYmFyTGVuZ3RoXG4gIGxvb3BcbiAgICBhbG1vc3RUaGVyZSA9IG1vZGVsLmJhckxlbmd0aCAtIDJcbiAgICBsYXN0SW5kZXggPSBtb2RlbC5iYXJMZW5ndGggLSAxXG4gICAgbGVmdEVsbGlwc2lzQnJlYWsgPSBhbG1vc3RUaGVyZSAtIDNcbiAgICBsZWZ0RWxsaXBzaXMgPSBhbG1vc3RUaGVyZSAtIDRcbiAgICBpZiBjdXJyZW50SW5kZXggPT0gbGVmdEVsbGlwc2lzXG4gICAgICBpZiBzdGF0ZS5jdXJyZW50UGFnZSA+IGxlZnRFbGxpcHNpc0JyZWFrXG4gICAgICAgIHBiLmVsbGlwc2lzSXRlbSgpXG4gICAgaWYgY3VycmVudEluZGV4ID09IGFsbW9zdFRoZXJlXG4gICAgICBwYi5lbGxpcHNpc0l0ZW0oKVxuICAgIGVsc2UgaWYgY3VycmVudEluZGV4ID09IGxhc3RJbmRleFxuICAgICAgcGIucGFnZUl0ZW0gc3RhdGUubGFzdFBhZ2VcbiAgICBlbHNlXG4gICAgICBwYi5wYWdlSXRlbSBjdXJyZW50SW5kZXhcbiAgICBjdXJyZW50SW5kZXggKz0gMVxuICAgIGlmIGN1cnJlbnRJbmRleCA9PSBtb2RlbC5iYXJMZW5ndGhcbiAgICAgIGJyZWFrXG4gICMjI1xuICBcbiMgdGhpcyBuZWVkcyB0byBiZSBjb250YWluZWQgaW4gYSAnbmF2JyByZWdpb25cbmNsYXNzIFBhZ2luYXRpb25WaWV3IGV4dGVuZHMgVmlld1xuICBvcHRpb25zOiAtPlxuICAgIHNldEtleUhhbmRsZXI6IGZhbHNlXG4gICAgYmFyTGVuZ3RoOiAxMFxuICAgIGJhclN0b3BBdDogN1xuICAgIF9rZXlzQmluZGVkOiBmYWxzZVxuICB0YWdOYW1lOiAndWwnXG4gIGNsYXNzTmFtZTogJ3BhZ2luYXRpb24nXG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIC0+XG4gICAgcGIgPSBwYWdpbmF0ZUJ1dHRvbnNcbiAgICBwYi5sZWZ0QXJyb3coKVxuICAgICNzdGF0ZUl0ZW1zIG1vZGVsXG4gICAgI3N0YXRlSXRlbXNOZXcgbW9kZWxcbiAgICBwYi5yaWdodEFycm93KClcbiAgICBcbiAgdGVtcGxhdGVDb250ZXh0OiAtPlxuICAgIGNvbGxlY3Rpb246IEBjb2xsZWN0aW9uXG4gICAgYmFyTGVuZ3RoOiBAZ2V0T3B0aW9uICdiYXJMZW5ndGgnXG4gICAgYmFyU3RvcEF0OiBAZ2V0T3B0aW9uICdiYXJTdG9wQXQnXG4gIHVpOlxuICAgIG51bWJlcmVkUGFnZTogJy5udW1iZXJlZC1wYWdlJ1xuICAgIHByZXZCdXR0b246ICcucHJldidcbiAgICBuZXh0QnV0dG9uOiAnLm5leHQnXG4gIGV2ZW50czpcbiAgICAnY2xpY2sgQHVpLm51bWJlcmVkUGFnZSc6ICd0dXJuUGFnZSdcbiAgICAnY2xpY2sgQHVpLnByZXZCdXR0b24nOiAnZ2V0UHJldmlvdXNQYWdlJ1xuICAgICdjbGljayBAdWkubmV4dEJ1dHRvbic6ICdnZXROZXh0UGFnZSdcbiAgdHVyblBhZ2U6IChldmVudCkgLT5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgZWwgPSAkKGV2ZW50LnRhcmdldClcbiAgICBwYWdlTnVtYmVyID0gZWwuYXR0ciAnZGF0YS1wYWdlbnVtYmVyJ1xuICAgIEBjb2xsZWN0aW9uLmdldFBhZ2UgTnVtYmVyIHBhZ2VOdW1iZXJcbiAgICBAcmVuZGVyKClcbiAgICBAdXBkYXRlTmF2QnV0dG9ucygpXG5cbiAgdXBkYXRlRW5kQXJyb3dzOiAoc3RhdGUpIC0+XG4gICAgcHJldkl0ZW0gPSBAdWkucHJldkJ1dHRvbi5wYXJlbnQoKVxuICAgIGlmIHN0YXRlLmN1cnJlbnRQYWdlID09IHN0YXRlLmZpcnN0UGFnZVxuICAgICAgdW5sZXNzIHByZXZJdGVtLmhhc0NsYXNzICdkaXNhYmxlZCdcbiAgICAgICAgcHJldkl0ZW0uYWRkQ2xhc3MgJ2Rpc2FibGVkJ1xuICAgIGVsc2VcbiAgICAgIGlmIHByZXZJdGVtLmhhc0NsYXNzICdkaXNhYmxlZCdcbiAgICAgICAgcHJldkl0ZW0ucmVtb3ZlQ2xhc3MgJ2Rpc2FibGVkJ1xuICAgIG5leHRJdGVtID0gQHVpLm5leHRCdXR0b24ucGFyZW50KClcbiAgICBpZiBzdGF0ZS5jdXJyZW50UGFnZSA9PSBzdGF0ZS5sYXN0UGFnZVxuICAgICAgdW5sZXNzIG5leHRJdGVtLmhhc0NsYXNzICdkaXNhYmxlZCdcbiAgICAgICAgbmV4dEl0ZW0uYWRkQ2xhc3MgJ2Rpc2FibGVkJ1xuICAgIGVsc2VcbiAgICAgIGlmIG5leHRJdGVtLmFkZENsYXNzICdkaXNhYmxlZCdcbiAgICAgICAgbmV4dEl0ZW0ucmVtb3ZlQ2xhc3MgJ2Rpc2FibGVkJ1xuXG4gIGRlYWN0aXZhdGVQYWdlczogLT5cbiAgICBAdWkubnVtYmVyZWRQYWdlLnBhcmVudCgpLnJlbW92ZUNsYXNzICdhY3RpdmUnXG4gICAgQHVpLm51bWJlcmVkUGFnZS5yZW1vdmVDbGFzcyAndGV4dC13aGl0ZSdcbiAgICBAdWkubnVtYmVyZWRQYWdlLmFkZENsYXNzICd0ZXh0LWRhcmsnXG4gICAgXG4gIHVwZGF0ZU5hdkJ1dHRvbnM6IC0+XG4gICAgc3RhdGUgPSBAY29sbGVjdGlvbi5zdGF0ZVxuICAgIEB1cGRhdGVFbmRBcnJvd3Mgc3RhdGVcbiAgICBAZGVhY3RpdmF0ZVBhZ2VzKClcbiAgICBAc2V0QWN0aXZlUGFnZSgpXG5cblxuICBzZXRBY3RpdmVQYWdlOiAtPlxuICAgIHN0YXRlID0gQGNvbGxlY3Rpb24uc3RhdGVcbiAgICBzZWxlY3RvciA9IFwiW2RhdGEtcGFnZW51bWJlcj1cXFwiI3tzdGF0ZS5jdXJyZW50UGFnZX1cXFwiXVwiXG4gICAgY3AgPSAkKHNlbGVjdG9yKVxuICAgIFxuICAgIGNwcCA9IGNwLnBhcmVudCgpXG4gICAgY3BwLmFkZENsYXNzICdhY3RpdmUnXG4gICAgY3AucmVtb3ZlQ2xhc3MgJ3RleHQtZGFyaydcbiAgICBjcC5hZGRDbGFzcyAndGV4dC13aGl0ZSdcbiAgICBcbiAgZ2V0QW5vdGhlclBhZ2U6IChkaXJlY3Rpb24pIC0+XG4gICAgc3RhdGUgPSBAY29sbGVjdGlvbi5zdGF0ZVxuICAgIG9uTGFzdFBhZ2UgPSBzdGF0ZS5jdXJyZW50UGFnZSA9PSBzdGF0ZS5sYXN0UGFnZVxuICAgICMgd2UgbmVlZCB0aGlzIGluIGNhc2UgdGhlIHBhZ2VzIHN0YXJ0IGF0IHplcm9cbiAgICBvbkZpcnN0UGFnZSA9IHN0YXRlLmN1cnJlbnRQYWdlID09IHN0YXRlLmZpcnN0UGFnZVxuICAgIGlmIGRpcmVjdGlvbiBpcyAncHJldicgYW5kIG5vdCBvbkZpcnN0UGFnZVxuICAgICAgaWYgc3RhdGUuY3VycmVudFBhZ2UgIT0gc3RhdGUuZmlyc3RQYWdlXG4gICAgICAgIHJlc3AgPSBAY29sbGVjdGlvbi5nZXRQcmV2aW91c1BhZ2UoKVxuICAgIGVsc2UgaWYgZGlyZWN0aW9uIGlzICduZXh0JyBhbmQgbm90IG9uTGFzdFBhZ2VcbiAgICAgIHJlc3AgPSBAY29sbGVjdGlvbi5nZXROZXh0UGFnZSgpXG4gICAgZWxzZSBpZiBvbkxhc3RQYWdlXG4gICAgICByZXR1cm5cbiAgICBlbHNlIGlmIG9uRmlyc3RQYWdlIGFuZCBkaXJlY3Rpb24gaXMgJ3ByZXYnXG4gICAgICByZXR1cm5cbiAgICBlbHNlXG4gICAgICB0aHJvdyBuZXcgRXJyb3IgXCJiYWQgZGlyZWN0aW9uICcje2RpcmVjdGlvbn0nXCJcbiAgICBAcmVuZGVyKClcbiAgICByZXR1cm4gcmVzcFxuICAgIFxuICBnZXRQcmV2aW91c1BhZ2U6IC0+XG4gICAgcmV0dXJuIEBnZXRBbm90aGVyUGFnZSAncHJldidcbiAgICAgIFxuICBnZXROZXh0UGFnZTogLT5cbiAgICByZXR1cm4gQGdldEFub3RoZXJQYWdlICduZXh0J1xuICAgICAgXG4gIG9uUmVuZGVyOiAtPlxuICAgIHNldEtleUhhbmRsZXIgPSBAZ2V0T3B0aW9uICdzZXRLZXlIYW5kbGVyJ1xuICAgIGlmIHNldEtleUhhbmRsZXJcbiAgICAgIEBvblJlbmRlckhhbmRsZUtleXMoKVxuXG4gIG9uRG9tUmVmcmVzaDogLT5cbiAgICBAc2V0QWN0aXZlUGFnZSgpXG4gICAgXG4gIG9uQmVmb3JlRGVzdHJveTogLT5cbiAgICBzZXRLZXlIYW5kbGVyID0gQGdldE9wdGlvbiAnc2V0S2V5SGFuZGxlcidcbiAgICBpZiBzZXRLZXlIYW5kbGVyXG4gICAgICBAb25CZWZvcmVEZXN0cm95SGFuZGxlS2V5cygpXG4gICAgXG4gIGtleWNvbW1hbmRzOlxuICAgIHByZXY6IDM3XG4gICAgbmV4dDogMzlcbiAgaGFuZGxlS2V5Q29tbWFuZDogKGNvbW1hbmQpIC0+XG4gICAgaWYgY29tbWFuZCBpbiBbJ3ByZXYnLCAnbmV4dCddXG4gICAgICBAZ2V0QW5vdGhlclBhZ2UgY29tbWFuZFxuXG4gIGtleWRvd25IYW5kbGVyOiAoZXZlbnQpID0+XG4gICAgZm9yIGtleSwgdmFsdWUgb2YgQGtleWNvbW1hbmRzXG4gICAgICBpZiBldmVudC5rZXlDb2RlID09IHZhbHVlXG4gICAgICAgIEBoYW5kbGVLZXlDb21tYW5kIGtleVxuXG4gIG9uUmVuZGVySGFuZGxlS2V5czogLT5cbiAgICB1bmxlc3MgQG9wdGlvbnMuX2tleXNCaW5kZWRcbiAgICAgICQoXCJodG1sXCIpLmtleWRvd24gQGtleWRvd25IYW5kbGVyXG4gICAgICBAb3B0aW9ucy5fa2V5c0JpbmRlZCA9IHRydWVcbiAgICAgIFxuICBvbkJlZm9yZURlc3Ryb3lIYW5kbGVLZXlzOiAtPlxuICAgICQoXCJodG1sXCIpLnVuYmluZCAna2V5ZG93bicsIEBrZXlkb3duSGFuZGxlclxuICAgIFxuZXhwb3J0IGRlZmF1bHQgUGFnaW5hdGlvblZpZXdcbiJdfQ==
