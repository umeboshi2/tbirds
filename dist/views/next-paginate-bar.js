var MainChannel, MessageChannel, PaginationView, makePageItem, paginateButtons, stateItems, stateItemsNew,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

import $ from 'jquery';

import Backbone from 'backbone';

import {
  View
} from 'backbone.marionette';

import tc from 'teacup';

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

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

stateItems = tc.renderable(function(model) {
  var currentPage, ellipsis, ellipsisDrawn, firstPage, i, lastPage, p, ref, ref1, results, resumeAt, state, stopAt, totalPages;
  if (model instanceof Backbone.Collection) {
    state = model.state;
  } else {
    state = model.collection.state;
  }
  totalPages = state.totalPages;
  firstPage = state.firstPage;
  lastPage = state.lastPage;
  currentPage = state.currentPage;
  ellipsis = false;
  if (lastPage > model.barLength) {
    ellipsis = true;
    stopAt = model.barStopAt;
    resumeAt = lastPage - model.barStopAt;
  }
  ellipsisDrawn = false;
  results = [];
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
    results.push(paginateButtons.pageItem(p));
  }
  return results;
});

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
makePageItem = tc.renderable(function(model, currentIndex) {
  var pb, state;
  state = model.state;
  pb = paginateButtons;
  if (currentIndex === model.barLength - 2) {
    pb.ellipsisItem();
  } else {
    pb.pageItem(currentIndex);
  }
  return currentIndex += 1;
});

stateItemsNew = tc.renderable(function(model) {
  var almostThere, currentIndex, currentPage, ellipsis, firstPage, lastIndex, lastPage, leftEllipsis, leftEllipsisBreak, pb, results, s, state, totalItems, totalPages;
  if (model instanceof Backbone.Collection) {
    state = model.state;
  } else {
    state = model.collection.state;
  }
  totalPages = state.totalPages;
  firstPage = state.firstPage;
  lastPage = state.lastPage;
  currentPage = state.currentPage;
  s = state;
  currentIndex = 0;
  totalItems = model.barLength;
  pb = paginateButtons;
  ellipsis = false;
  if (s.totalPages > model.barLength) {
    ellipsis = true;
  }
  results = [];
  while (true) {
    //makePageItem(model, currentIndex) while currentIndex < model.barLength
    almostThere = model.barLength - 2;
    lastIndex = model.barLength - 1;
    leftEllipsisBreak = almostThere - 3;
    leftEllipsis = almostThere - 4;
    if (currentIndex === leftEllipsis) {
      if (state.currentPage > leftEllipsisBreak) {
        pb.ellipsisItem();
      }
    }
    if (currentIndex === almostThere) {
      pb.ellipsisItem();
    } else if (currentIndex === lastIndex) {
      pb.pageItem(state.lastPage);
    } else {
      pb.pageItem(currentIndex);
    }
    currentIndex += 1;
    if (currentIndex === model.barLength) {
      break;
    } else {
      results.push(void 0);
    }
  }
  return results;
});

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

  PaginationView.prototype.template = tc.renderable(function(model) {
    var pb;
    pb = paginateButtons;
    pb.leftArrow();
    //stateItems model
    stateItemsNew(model);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvbmV4dC1wYWdpbmF0ZS1iYXIuanMiLCJzb3VyY2VzIjpbInZpZXdzL25leHQtcGFnaW5hdGUtYmFyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFdBQUEsRUFBQSxjQUFBLEVBQUEsY0FBQSxFQUFBLFlBQUEsRUFBQSxlQUFBLEVBQUEsVUFBQSxFQUFBLGFBQUE7RUFBQTs7QUFBQSxPQUFPLENBQVAsTUFBQTs7QUFDQSxPQUFPLFFBQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVMsSUFBVDtDQUFBLE1BQUE7O0FBQ0EsT0FBTyxFQUFQLE1BQUE7O0FBRUEsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFDZCxjQUFBLEdBQWlCLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixVQUF2Qjs7QUFFakIsZUFBQSxHQUNFO0VBQUEsU0FBQSxFQUFXLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFBLENBQUE7V0FDdkIsRUFBRSxDQUFDLEVBQUgsQ0FBTSxZQUFOLEVBQW9CLFFBQUEsQ0FBQSxDQUFBO2FBQ2xCLEVBQUUsQ0FBQyxDQUFILENBQUssNEJBQUwsRUFBbUMsUUFBQSxDQUFBLENBQUE7ZUFDakMsRUFBRSxDQUFDLENBQUgsQ0FBSyxtQkFBTDtNQURpQyxDQUFuQztJQURrQixDQUFwQjtFQUR1QixDQUFkLENBQVg7RUFJQSxVQUFBLEVBQVksRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUEsQ0FBQTtXQUN4QixFQUFFLENBQUMsRUFBSCxDQUFNLFlBQU4sRUFBb0IsUUFBQSxDQUFBLENBQUE7YUFDbEIsRUFBRSxDQUFDLENBQUgsQ0FBSyw0QkFBTCxFQUFtQyxRQUFBLENBQUEsQ0FBQTtlQUNqQyxFQUFFLENBQUMsQ0FBSCxDQUFLLG9CQUFMO01BRGlDLENBQW5DO0lBRGtCLENBQXBCO0VBRHdCLENBQWQsQ0FKWjtFQVFBLFFBQUEsRUFBVSxFQUFFLENBQUMsVUFBSCxD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QUMsQ0FBQSxjQUE3QjtJQUR5Qjs7RUFoSWQ7OzJCQU1iLE9BQUEsR0FBUzs7MkJBQ1QsU0FBQSxHQUFXOzsyQkFDWCxRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxRQUFBLENBQUMsS0FBRCxDQUFBO0FBQ3RCLFFBQUE7SUFBQSxFQUFBLEdBQUs7SUFDTCxFQUFFLENBQUMsU0FBSCxDQUFBLEVBREE7O0lBR0EsYUFBQSxDQUFjLEtBQWQ7V0FDQSxFQUFFLENBQUMsVUFBSCxDQUFBO0VBTHNCLENBQWQ7OzJCQVdWLEVBQUEsR0FDRTtJQUFBLFlBQUEsRUFBYyxnQkFBZDtJQUNBLFVBQUEsRUFBWSxPQURaO0lBRUEsVUFBQSxFQUFZO0VBRlo7OzJCQUdGLE1BQUEsR0FDRTtJQUFBLHdCQUFBLEVBQTBCLFVBQTFCO0lBQ0Esc0JBQUEsRUFBd0IsaUJBRHhCO0lBRUEsc0JBQUEsRUFBd0I7RUFGeEI7OzJCQXVGRixXQUFBLEdBQ0U7SUFBQSxJQUFBLEVBQU0sRUFBTjtJQUNBLElBQUEsRUFBTTtFQUROIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5pbXBvcnQgdGMgZnJvbSAndGVhY3VwJ1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcbk1lc3NhZ2VDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnbWVzc2FnZXMnXG5cbnBhZ2luYXRlQnV0dG9ucyA9XG4gIGxlZnRBcnJvdzogdGMucmVuZGVyYWJsZSAtPlxuICAgIHRjLmxpICcucGFnZS1pdGVtJywgLT5cbiAgICAgIHRjLmEgJy5wcmV2LnBhZ2UtbGluay5iZy1ib2R5LWQ1JywgLT5cbiAgICAgICAgdGMuaSAnLmZhLmZhLWFycm93LWxlZnQnXG4gIHJpZ2h0QXJyb3c6IHRjLnJlbmRlcmFibGUgLT5cbiAgICB0Yy5saSAnLnBhZ2UtaXRlbScsIC0+XG4gICAgICB0Yy5hICcubmV4dC5wYWdlLWxpbmsuYmctYm9keS1kNScsIC0+XG4gICAgICAgIHRjLmkgJy5mYS5mYS1hcnJvdy1yaWdodCdcbiAgcGFnZUl0ZW06IHRjLnJlbmRlcmFibGUgKGluZGV4KSAtPlxuICAgIHRjLmxpICcucGFnZS1pdGVtJywgLT5cbiAgICAgIHRjLmEgJy5udW1iZXJlZC1wYWdlLnBhZ2UtbGluay5iZy1ib2R5LWQ1LnRleHQtZGFyaycsXG4gICAgICBocmVmOicjJywgZGF0YTogcGFnZU51bWJlcjogaW5kZXgsIFwiI3tpbmRleCsxfVwiXG4gIGVsbGlwc2lzSXRlbTogdGMucmVuZGVyYWJsZSAtPlxuICAgIHRjLmxpICcucGFnZS1pdGVtJywgLT5cbiAgICAgIHRjLmEgJy5lbGxpcHNpcy1wYWdlLnBhZ2UtbGluay5iZy1ib2R5LWQ1LnRleHQtZGFyaycsXG4gICAgICAnLi4uJ1xuXG5zdGF0ZUl0ZW1zID0gdGMucmVuZGVyYWJsZSAobW9kZWwpIC0+XG4gIGlmIG1vZGVsIGluc3RhbmNlb2YgQmFja2JvbmUuQ29sbGVjdGlvblxuICAgIHN0YXRlID0gbW9kZWwuc3RhdGVcbiAgZWxzZVxuICAgIHN0YXRlID0gbW9kZWwuY29sbGVjdGlvbi5zdGF0ZVxuICB0b3RhbFBhZ2VzID0gc3RhdGUudG90YWxQYWdlc1xuICBmaXJzdFBhZ2UgPSBzdGF0ZS5maXJzdFBhZ2VcbiAgbGFzdFBhZ2UgPSBzdGF0ZS5sYXN0UGFnZVxuICBjdXJyZW50UGFnZSA9IHN0YXRlLmN1cnJlbnRQYWdlXG4gIGVsbGlwc2lzID0gZmFsc2VcbiAgaWYgbGFzdFBhZ2UgPiBtb2RlbC5iYXJMZW5ndGhcbiAgICBlbGxpcHNpcyA9IHRydWVcbiAgICBzdG9wQXQgPSBtb2RlbC5iYXJTdG9wQXRcbiAgICByZXN1bWVBdCA9IGxhc3RQYWdlIC0gbW9kZWwuYmFyU3RvcEF0XG4gIGVsbGlwc2lzRHJhd24gPSBmYWxzZVxuICBmb3IgcCBpbiBbZmlyc3RQYWdlLi5sYXN0UGFnZV1cbiAgICBpZiBlbGxpcHNpc1xuICAgICAgaWYgcCA+PSBzdG9wQXQgYW5kIHAgPD0gcmVzdW1lQXRcbiAgICAgICAgaWYgbm90IGVsbGlwc2lzRHJhd25cbiAgICAgICAgICBlbGxpcHNpc0RyYXduID0gdHJ1ZVxuICAgICAgICAgIHRjLmxpICcucGFnZS1pdGVtJywgLT5cbiAgICAgICAgICAgIHRjLmEgJy5lbGxpcHNpcy1wYWdlLnBhZ2UtbGluay5iZy1ib2R5LWQ1LnRleHQtZGFyaycsXG4gICAgICAgICAgICAnLi4uJ1xuICAgICAgICBjb250aW51ZVxuICAgIHBhZ2luYXRlQnV0dG9ucy5wYWdlSXRlbSBwXG5cbiMgJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSVcblxubWFrZVBhZ2VJdGVtID0gdGMucmVuZGVyYWJsZSAobW9kZWwsIGN1cnJlbnRJbmRleCkgLT5cbiAgc3RhdGUgPSBtb2RlbC5zdGF0ZVxuICBwYiA9IHBhZ2luYXRlQnV0dG9uc1xuICBpZiBjdXJyZW50SW5kZXggPT0gbW9kZWwuYmFyTGVuZ3RoIC0gMlxuICAgIHBiLmVsbGlwc2lzSXRlbSgpXG4gIGVsc2VcbiAgICBwYi5wYWdlSXRlbSBjdXJyZW50SW5kZXhcbiAgY3VycmVudEluZGV4ICs9IDFcblxuc3RhdGVJdGVtc05ldyA9IHRjLnJlbmRlcmFibGUgKG1vZGVsKSAtPlxuICBpZiBtb2RlbCBpbnN0YW5jZW9mIEJhY2tib25lLkNvbGxlY3Rpb25cbiAgICBzdGF0ZSA9IG1vZGVsLnN0YXRlXG4gIGVsc2VcbiAgICBzdGF0ZSA9IG1vZGVsLmNvbGxlY3Rpb24uc3RhdGVcbiAgdG90YWxQYWdlcyA9IHN0YXRlLnRvdGFsUGFnZXNcbiAgZmlyc3RQYWdlID0gc3RhdGUuZmlyc3RQYWdlXG4gIGxhc3RQYWdlID0gc3RhdGUubGFzdFBhZ2VcbiAgY3VycmVudFBhZ2UgPSBzdGF0ZS5jdXJyZW50UGFnZVxuICBzID0gc3RhdGVcbiAgY3VycmVudEluZGV4ID0gMFxuICB0b3RhbEl0ZW1zID0gbW9kZWwuYmFyTGVuZ3RoXG4gIHBiID0gcGFnaW5hdGVCdXR0b25zXG4gIFxuICBlbGxpcHNpcyA9IGZhbHNlXG4gIGlmIHMudG90YWxQYWdlcyA+IG1vZGVsLmJhckxlbmd0aFxuICAgIGVsbGlwc2lzID0gdHJ1ZVxuICAjbWFrZVBhZ2VJdGVtKG1vZGVsLCBjdXJyZW50SW5kZXgpIHdoaWxlIGN1cnJlbnRJbmRleCA8IG1vZGVsLmJhckxlbmd0aFxuICBsb29wXG4gICAgYWxtb3N0VGhlcmUgPSBtb2RlbC5iYXJMZW5ndGggLSAyXG4gICAgbGFzdEluZGV4ID0gbW9kZWwuYmFyTGVuZ3RoIC0gMVxuICAgIGxlZnRFbGxpcHNpc0JyZWFrID0gYWxtb3N0VGhlcmUgLSAzXG4gICAgbGVmdEVsbGlwc2lzID0gYWxtb3N0VGhlcmUgLSA0XG4gICAgaWYgY3VycmVudEluZGV4ID09IGxlZnRFbGxpcHNpc1xuICAgICAgaWYgc3RhdGUuY3VycmVudFBhZ2UgPiBsZWZ0RWxsaXBzaXNCcmVha1xuICAgICAgICBwYi5lbGxpcHNpc0l0ZW0oKVxuICAgIGlmIGN1cnJlbnRJbmRleCA9PSBhbG1vc3RUaGVyZVxuICAgICAgcGIuZWxsaXBzaXNJdGVtKClcbiAgICBlbHNlIGlmIGN1cnJlbnRJbmRleCA9PSBsYXN0SW5kZXhcbiAgICAgIHBiLnBhZ2VJdGVtIHN0YXRlLmxhc3RQYWdlXG4gICAgZWxzZVxuICAgICAgcGIucGFnZUl0ZW0gY3VycmVudEluZGV4XG4gICAgY3VycmVudEluZGV4ICs9IDFcbiAgICBpZiBjdXJyZW50SW5kZXggPT0gbW9kZWwuYmFyTGVuZ3RoXG4gICAgICBicmVha1xuICAgIFxuICBcbiMgdGhpcyBuZWVkcyB0byBiZSBjb250YWluZWQgaW4gYSAnbmF2JyByZWdpb25cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2luYXRpb25WaWV3IGV4dGVuZHMgVmlld1xuICBvcHRpb25zOiAtPlxuICAgIHNldEtleUhhbmRsZXI6IGZhbHNlXG4gICAgYmFyTGVuZ3RoOiAxMFxuICAgIGJhclN0b3BBdDogN1xuICAgIF9rZXlzQmluZGVkOiBmYWxzZVxuICB0YWdOYW1lOiAndWwnXG4gIGNsYXNzTmFtZTogJ3BhZ2luYXRpb24nXG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlIChtb2RlbCkgLT5cbiAgICBwYiA9IHBhZ2luYXRlQnV0dG9uc1xuICAgIHBiLmxlZnRBcnJvdygpXG4gICAgI3N0YXRlSXRlbXMgbW9kZWxcbiAgICBzdGF0ZUl0ZW1zTmV3IG1vZGVsXG4gICAgcGIucmlnaHRBcnJvdygpXG4gICAgXG4gIHRlbXBsYXRlQ29udGV4dDogLT5cbiAgICBjb2xsZWN0aW9uOiBAY29sbGVjdGlvblxuICAgIGJhckxlbmd0aDogQGdldE9wdGlvbiAnYmFyTGVuZ3RoJ1xuICAgIGJhclN0b3BBdDogQGdldE9wdGlvbiAnYmFyU3RvcEF0J1xuICB1aTpcbiAgICBudW1iZXJlZFBhZ2U6ICcubnVtYmVyZWQtcGFnZSdcbiAgICBwcmV2QnV0dG9uOiAnLnByZXYnXG4gICAgbmV4dEJ1dHRvbjogJy5uZXh0J1xuICBldmVudHM6XG4gICAgJ2NsaWNrIEB1aS5udW1iZXJlZFBhZ2UnOiAndHVyblBhZ2UnXG4gICAgJ2NsaWNrIEB1aS5wcmV2QnV0dG9uJzogJ2dldFByZXZpb3VzUGFnZSdcbiAgICAnY2xpY2sgQHVpLm5leHRCdXR0b24nOiAnZ2V0TmV4dFBhZ2UnXG4gIHR1cm5QYWdlOiAoZXZlbnQpIC0+XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIGVsID0gJChldmVudC50YXJnZXQpXG4gICAgcGFnZU51bWJlciA9IGVsLmF0dHIgJ2RhdGEtcGFnZW51bWJlcidcbiAgICBAY29sbGVjdGlvbi5nZXRQYWdlIE51bWJlciBwYWdlTnVtYmVyXG4gICAgQHJlbmRlcigpXG4gICAgQHVwZGF0ZU5hdkJ1dHRvbnMoKVxuXG4gIHVwZGF0ZUVuZEFycm93czogKHN0YXRlKSAtPlxuICAgIHByZXZJdGVtID0gQHVpLnByZXZCdXR0b24ucGFyZW50KClcbiAgICBpZiBzdGF0ZS5jdXJyZW50UGFnZSA9PSBzdGF0ZS5maXJzdFBhZ2VcbiAgICAgIHVubGVzcyBwcmV2SXRlbS5oYXNDbGFzcyAnZGlzYWJsZWQnXG4gICAgICAgIHByZXZJdGVtLmFkZENsYXNzICdkaXNhYmxlZCdcbiAgICBlbHNlXG4gICAgICBpZiBwcmV2SXRlbS5oYXNDbGFzcyAnZGlzYWJsZWQnXG4gICAgICAgIHByZXZJdGVtLnJlbW92ZUNsYXNzICdkaXNhYmxlZCdcbiAgICBuZXh0SXRlbSA9IEB1aS5uZXh0QnV0dG9uLnBhcmVudCgpXG4gICAgaWYgc3RhdGUuY3VycmVudFBhZ2UgPT0gc3RhdGUubGFzdFBhZ2VcbiAgICAgIHVubGVzcyBuZXh0SXRlbS5oYXNDbGFzcyAnZGlzYWJsZWQnXG4gICAgICAgIG5leHRJdGVtLmFkZENsYXNzICdkaXNhYmxlZCdcbiAgICBlbHNlXG4gICAgICBpZiBuZXh0SXRlbS5hZGRDbGFzcyAnZGlzYWJsZWQnXG4gICAgICAgIG5leHRJdGVtLnJlbW92ZUNsYXNzICdkaXNhYmxlZCdcblxuICBkZWFjdGl2YXRlUGFnZXM6IC0+XG4gICAgQHVpLm51bWJlcmVkUGFnZS5wYXJlbnQoKS5yZW1vdmVDbGFzcyAnYWN0aXZlJ1xuICAgIEB1aS5udW1iZXJlZFBhZ2UucmVtb3ZlQ2xhc3MgJ3RleHQtd2hpdGUnXG4gICAgQHVpLm51bWJlcmVkUGFnZS5hZGRDbGFzcyAndGV4dC1kYXJrJ1xuICAgIFxuICB1cGRhdGVOYXZCdXR0b25zOiAtPlxuICAgIHN0YXRlID0gQGNvbGxlY3Rpb24uc3RhdGVcbiAgICBAdXBkYXRlRW5kQXJyb3dzIHN0YXRlXG4gICAgQGRlYWN0aXZhdGVQYWdlcygpXG4gICAgQHNldEFjdGl2ZVBhZ2UoKVxuXG5cbiAgc2V0QWN0aXZlUGFnZTogLT5cbiAgICBzdGF0ZSA9IEBjb2xsZWN0aW9uLnN0YXRlXG4gICAgc2VsZWN0b3IgPSBcIltkYXRhLXBhZ2VudW1iZXI9XFxcIiN7c3RhdGUuY3VycmVudFBhZ2V9XFxcIl1cIlxuICAgIGNwID0gJChzZWxlY3RvcilcbiAgICBcbiAgICBjcHAgPSBjcC5wYXJlbnQoKVxuICAgIGNwcC5hZGRDbGFzcyAnYWN0aXZlJ1xuICAgIGNwLnJlbW92ZUNsYXNzICd0ZXh0LWRhcmsnXG4gICAgY3AuYWRkQ2xhc3MgJ3RleHQtd2hpdGUnXG4gICAgXG4gIGdldEFub3RoZXJQYWdlOiAoZGlyZWN0aW9uKSAtPlxuICAgIHN0YXRlID0gQGNvbGxlY3Rpb24uc3RhdGVcbiAgICBvbkxhc3RQYWdlID0gc3RhdGUuY3VycmVudFBhZ2UgPT0gc3RhdGUubGFzdFBhZ2VcbiAgICAjIHdlIG5lZWQgdGhpcyBpbiBjYXNlIHRoZSBwYWdlcyBzdGFydCBhdCB6ZXJvXG4gICAgb25GaXJzdFBhZ2UgPSBzdGF0ZS5jdXJyZW50UGFnZSA9PSBzdGF0ZS5maXJzdFBhZ2VcbiAgICBpZiBkaXJlY3Rpb24gaXMgJ3ByZXYnIGFuZCBub3Qgb25GaXJzdFBhZ2VcbiAgICAgIGlmIHN0YXRlLmN1cnJlbnRQYWdlICE9IHN0YXRlLmZpcnN0UGFnZVxuICAgICAgICByZXNwID0gQGNvbGxlY3Rpb24uZ2V0UHJldmlvdXNQYWdlKClcbiAgICBlbHNlIGlmIGRpcmVjdGlvbiBpcyAnbmV4dCcgYW5kIG5vdCBvbkxhc3RQYWdlXG4gICAgICByZXNwID0gQGNvbGxlY3Rpb24uZ2V0TmV4dFBhZ2UoKVxuICAgIGVsc2UgaWYgb25MYXN0UGFnZVxuICAgICAgcmV0dXJuXG4gICAgZWxzZSBpZiBvbkZpcnN0UGFnZSBhbmQgZGlyZWN0aW9uIGlzICdwcmV2J1xuICAgICAgcmV0dXJuXG4gICAgZWxzZVxuICAgICAgdGhyb3cgbmV3IEVycm9yIFwiYmFkIGRpcmVjdGlvbiAnI3tkaXJlY3Rpb259J1wiXG4gICAgQHJlbmRlcigpXG4gICAgcmV0dXJuIHJlc3BcbiAgICBcbiAgZ2V0UHJldmlvdXNQYWdlOiAtPlxuICAgIHJldHVybiBAZ2V0QW5vdGhlclBhZ2UgJ3ByZXYnXG4gICAgICBcbiAgZ2V0TmV4dFBhZ2U6IC0+XG4gICAgcmV0dXJuIEBnZXRBbm90aGVyUGFnZSAnbmV4dCdcbiAgICAgIFxuICBvblJlbmRlcjogLT5cbiAgICBzZXRLZXlIYW5kbGVyID0gQGdldE9wdGlvbiAnc2V0S2V5SGFuZGxlcidcbiAgICBpZiBzZXRLZXlIYW5kbGVyXG4gICAgICBAb25SZW5kZXJIYW5kbGVLZXlzKClcblxuICBvbkRvbVJlZnJlc2g6IC0+XG4gICAgQHNldEFjdGl2ZVBhZ2UoKVxuICAgIFxuICBvbkJlZm9yZURlc3Ryb3k6IC0+XG4gICAgc2V0S2V5SGFuZGxlciA9IEBnZXRPcHRpb24gJ3NldEtleUhhbmRsZXInXG4gICAgaWYgc2V0S2V5SGFuZGxlclxuICAgICAgQG9uQmVmb3JlRGVzdHJveUhhbmRsZUtleXMoKVxuICAgIFxuICBrZXljb21tYW5kczpcbiAgICBwcmV2OiAzN1xuICAgIG5leHQ6IDM5XG4gIGhhbmRsZUtleUNvbW1hbmQ6IChjb21tYW5kKSAtPlxuICAgIGlmIGNvbW1hbmQgaW4gWydwcmV2JywgJ25leHQnXVxuICAgICAgQGdldEFub3RoZXJQYWdlIGNvbW1hbmRcblxuICBrZXlkb3duSGFuZGxlcjogKGV2ZW50KSA9PlxuICAgIGZvciBrZXksIHZhbHVlIG9mIEBrZXljb21tYW5kc1xuICAgICAgaWYgZXZlbnQua2V5Q29kZSA9PSB2YWx1ZVxuICAgICAgICBAaGFuZGxlS2V5Q29tbWFuZCBrZXlcblxuICBvblJlbmRlckhhbmRsZUtleXM6IC0+XG4gICAgdW5sZXNzIEBvcHRpb25zLl9rZXlzQmluZGVkXG4gICAgICAkKFwiaHRtbFwiKS5rZXlkb3duIEBrZXlkb3duSGFuZGxlclxuICAgICAgQG9wdGlvbnMuX2tleXNCaW5kZWQgPSB0cnVlXG4gICAgICBcbiAgb25CZWZvcmVEZXN0cm95SGFuZGxlS2V5czogLT5cbiAgICAkKFwiaHRtbFwiKS51bmJpbmQgJ2tleWRvd24nLCBAa2V5ZG93bkhhbmRsZXJcbiAgICBcbiJdfQ==
