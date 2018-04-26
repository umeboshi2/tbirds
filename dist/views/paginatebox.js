var PaginateBox, navigateTemplate,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

import $ from 'jquery';

import Marionette from 'backbone.marionette';

import tc from 'teacup';

navigateTemplate = tc.renderable(function() {
  return tc.div('.btn-group', function() {
    tc.button('.prev.btn.btn-secondary', {
      type: 'button'
    }, function() {
      return tc.i('.fa.fa-arrow-left');
    });
    return tc.button('.next.btn.btn-secondary', {
      type: 'button'
    }, function() {
      return tc.i('.fa.fa-arrow-right');
    });
  });
});

export default PaginateBox = (function() {
  class PaginateBox extends Marionette.View {
    constructor() {
      super(...arguments);
      this.keydownHandler = this.keydownHandler.bind(this);
    }

    templateContext() {
      return {
        collection: this.collection
      };
    }

    _onFirstPage() {
      var diff, state;
      state = this.collection.state;
      diff = state.currentPage - state.firstPage;
      return diff === 0;
    }

    updateNavButtons() {
      var currentPage;
      if (this._onFirstPage()) {
        this.ui.prevButton.hide();
      } else {
        this.ui.prevButton.show();
      }
      currentPage = this.collection.state.currentPage;
      if (currentPage !== this.collection.state.lastPage) {
        this.ui.nextButton.show();
      } else {
        this.ui.nextButton.hide();
      }
      if (this.collection.state.totalRecords === 0) {
        this.ui.prevButton.hide();
        return this.ui.nextButton.hide();
      }
    }

    handleKeyCommand(command) {
      if (command === 'prev' || command === 'next') {
        return this.getAnotherPage(command);
      }
    }

    keydownHandler(event) {
      var key, ref, results, value;
      boundMethodCheck(this, PaginateBox);
      ref = this.keyCommands;
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

    onRender() {
      this.updateNavButtons();
      this.collection.on('pageable:state:change', () => {
        return this.updateNavButtons();
      });
      return $('html').keydown(this.keydownHandler);
    }

    onBeforeDestroy() {
      this.collection.off("pageable:state:change");
      return $("html").unbind("keydown", this.keydownHandler);
    }

    getAnotherPage(direction) {
      var currentPage, onLastPage, response;
      currentPage = this.collection.state.currentPage;
      onLastPage = currentPage === this.collection.state.lastPage;
      response = void 0;
      if (direction === 'prev' && currentPage) {
        response = this.collection.getPreviousPage();
      } else if (direction === 'next' && !onLastPage) {
        response = this.collection.getNextPage();
      }
      if (__DEV__ && response) {
        return response.done(function() {
          return console.log("Cleanup?");
        });
      }
    }

    getPreviousPage() {
      return this.getAnotherPage('prev');
    }

    getNextPage() {
      return this.getAnotherPage('next');
    }

  };

  PaginateBox.prototype.template = navigateTemplate;

  PaginateBox.prototype.ui = {
    prevButton: '.prev',
    nextButton: '.next'
  };

  PaginateBox.prototype.events = {
    'click @ui.prevButton': 'getPreviousPage',
    'click @ui.nextButton': 'getNextPage'
  };

  PaginateBox.prototype.keyCommands = {
    prev: 37,
    next: 39
  };

  return PaginateBox;

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvcGFnaW5hdGVib3guanMiLCJzb3VyY2VzIjpbInZpZXdzL3BhZ2luYXRlYm94LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFdBQUEsRUFBQSxnQkFBQTtFQUFBOztBQUFBLE9BQU8sQ0FBUCxNQUFBOztBQUNBLE9BQU8sVUFBUCxNQUFBOztBQUNBLE9BQU8sRUFBUCxNQUFBOztBQUdBLGdCQUFBLEdBQW1CLEVBQUUsQ0FBQyxVQUFILENBQWMsUUFBQSxDQUFBLENBQUE7U0FDL0IsRUFBRSxDQUFDLEdBQUgsQ0FBTyxZQUFQLEVBQXFCLFFBQUEsQ0FBQSxDQUFBO0lBQ25CLEVBQUUsQ0FBQyxNQUFILENBQVUseUJBQVYsRUFBcUM7TUFBQSxJQUFBLEVBQUs7SUFBTCxDQUFyQyxFQUFvRCxRQUFBLENBQUEsQ0FBQTthQUNsRCxFQUFFLENBQUMsQ0FBSCxDQUFLLG1CQUFMO0lBRGtELENBQXBEO1dBRUEsRUFBRSxDQUFDLE1BQUgsQ0FBVSx5QkFBVixFQUFxQztNQUFBLElBQUEsRUFBSztJQUFMLENBQXJDLEVBQW9ELFFBQUEsQ0FBQSxDQUFBO2FBQ2xELEVBQUUsQ0FBQyxDQUFILENBQUssb0JBQUw7SUFEa0QsQ0FBcEQ7RUFIbUIsQ0FBckI7QUFEK0IsQ0FBZDs7QUFPbkIsT0FBQSxRQUFxQjtFQUFOLE1BQUEsWUFBQSxRQUEwQixVQUFVLENBQUMsS0FBckM7OztVQW1DYixDQUFBLHFCQUFBLENBQUE7OztJQTNCQSxlQUFpQixDQUFBLENBQUE7YUFDZjtRQUFBLFVBQUEsRUFBWSxJQUFDLENBQUE7TUFBYjtJQURlOztJQUVqQixZQUFjLENBQUEsQ0FBQTtBQUNaLFVBQUEsSUFBQSxFQUFBO01BQUEsS0FBQSxHQUFRLElBQUMsQ0FBQSxVQUFVLENBQUM7TUFDcEIsSUFBQSxHQUFPLEtBQUssQ0FBQyxXQUFOLEdBQW9CLEtBQUssQ0FBQztBQUNqQyxhQUFPLElBQUEsS0FBUTtJQUhIOztJQUtkLGdCQUFrQixDQUFBLENBQUE7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TUFBaEI7SUFEVzs7RUEvREE7O3dCQUNiLFFBQUEsR0FBVTs7d0JBQ1YsRUFBQSxHQUNFO0lBQUEsVUFBQSxFQUFZLE9BQVo7SUFDQSxVQUFBLEVBQVk7RUFEWjs7d0JBRUYsTUFBQSxHQUNFO0lBQUEsc0JBQUEsRUFBd0IsaUJBQXhCO0lBQ0Esc0JBQUEsRUFBd0I7RUFEeEI7O3dCQXVCRixXQUFBLEdBQ0U7SUFBQSxJQUFBLEVBQU0sRUFBTjtJQUNBLElBQUEsRUFBTTtFQUROIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnYmFja2JvbmUubWFyaW9uZXR0ZSdcbmltcG9ydCB0YyBmcm9tICd0ZWFjdXAnXG5cblxubmF2aWdhdGVUZW1wbGF0ZSA9IHRjLnJlbmRlcmFibGUgLT5cbiAgdGMuZGl2ICcuYnRuLWdyb3VwJywgLT5cbiAgICB0Yy5idXR0b24gJy5wcmV2LmJ0bi5idG4tc2Vjb25kYXJ5JywgdHlwZTonYnV0dG9uJywgLT5cbiAgICAgIHRjLmkgJy5mYS5mYS1hcnJvdy1sZWZ0J1xuICAgIHRjLmJ1dHRvbiAnLm5leHQuYnRuLmJ0bi1zZWNvbmRhcnknLCB0eXBlOididXR0b24nLCAtPlxuICAgICAgdGMuaSAnLmZhLmZhLWFycm93LXJpZ2h0J1xuICAgIFxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFnaW5hdGVCb3ggZXh0ZW5kcyBNYXJpb25ldHRlLlZpZXdcbiAgdGVtcGxhdGU6IG5hdmlnYXRlVGVtcGxhdGVcbiAgdWk6XG4gICAgcHJldkJ1dHRvbjogJy5wcmV2J1xuICAgIG5leHRCdXR0b246ICcubmV4dCdcbiAgZXZlbnRzOlxuICAgICdjbGljayBAdWkucHJldkJ1dHRvbic6ICdnZXRQcmV2aW91c1BhZ2UnXG4gICAgJ2NsaWNrIEB1aS5uZXh0QnV0dG9uJzogJ2dldE5leHRQYWdlJ1xuICB0ZW1wbGF0ZUNvbnRleHQ6IC0+XG4gICAgY29sbGVjdGlvbjogQGNvbGxlY3Rpb25cbiAgX29uRmlyc3RQYWdlOiAtPlxuICAgIHN0YXRlID0gQGNvbGxlY3Rpb24uc3RhdGVcbiAgICBkaWZmID0gc3RhdGUuY3VycmVudFBhZ2UgLSBzdGF0ZS5maXJzdFBhZ2VcbiAgICByZXR1cm4gZGlmZiBpcyAwXG4gICAgXG4gIHVwZGF0ZU5hdkJ1dHRvbnM6IC0+XG4gICAgaWYgQF9vbkZpcnN0UGFnZSgpXG4gICAgICBAdWkucHJldkJ1dHRvbi5oaWRlKClcbiAgICBlbHNlXG4gICAgICBAdWkucHJldkJ1dHRvbi5zaG93KClcbiAgICBjdXJyZW50UGFnZSA9IEBjb2xsZWN0aW9uLnN0YXRlLmN1cnJlbnRQYWdlXG4gICAgaWYgY3VycmVudFBhZ2UgIT0gQGNvbGxlY3Rpb24uc3RhdGUubGFzdFBhZ2VcbiAgICAgIEB1aS5uZXh0QnV0dG9uLnNob3coKVxuICAgIGVsc2VcbiAgICAgIEB1aS5uZXh0QnV0dG9uLmhpZGUoKVxuICAgIGlmIEBjb2xsZWN0aW9uLnN0YXRlLnRvdGFsUmVjb3JkcyBpcyAwXG4gICAgICBAdWkucHJldkJ1dHRvbi5oaWRlKClcbiAgICAgIEB1aS5uZXh0QnV0dG9uLmhpZGUoKVxuXG4gIGtleUNvbW1hbmRzOlxuICAgIHByZXY6IDM3XG4gICAgbmV4dDogMzlcbiAgaGFuZGxlS2V5Q29tbWFuZDogKGNvbW1hbmQpIC0+XG4gICAgaWYgY29tbWFuZCBpbiBbJ3ByZXYnLCAnbmV4dCddXG4gICAgICBAZ2V0QW5vdGhlclBhZ2UgY29tbWFuZFxuICBrZXlkb3duSGFuZGxlcjogKGV2ZW50KSA9PlxuICAgIGZvciBrZXksIHZhbHVlIG9mIEBrZXlDb21tYW5kc1xuICAgICAgaWYgZXZlbnQua2V5Q29kZSBpcyB2YWx1ZVxuICAgICAgICBAaGFuZGxlS2V5Q29tbWFuZCBrZXlcblxuICBvblJlbmRlcjogLT5cbiAgICBAdXBkYXRlTmF2QnV0dG9ucygpXG4gICAgQGNvbGxlY3Rpb24ub24gJ3BhZ2VhYmxlOnN0YXRlOmNoYW5nZScsID0+XG4gICAgICBAdXBkYXRlTmF2QnV0dG9ucygpXG4gICAgJCgnaHRtbCcpLmtleWRvd24gQGtleWRvd25IYW5kbGVyXG5cbiAgb25CZWZvcmVEZXN0cm95OiAtPlxuICAgIEBjb2xsZWN0aW9uLm9mZiBcInBhZ2VhYmxlOnN0YXRlOmNoYW5nZVwiXG4gICAgJChcImh0bWxcIikudW5iaW5kIFwia2V5ZG93blwiLCBAa2V5ZG93bkhhbmRsZXJcblxuICBnZXRBbm90aGVyUGFnZTogKGRpcmVjdGlvbikgLT5cbiAgICBjdXJyZW50UGFnZSA9IEBjb2xsZWN0aW9uLnN0YXRlLmN1cnJlbnRQYWdlXG4gICAgb25MYXN0UGFnZSA9IGN1cnJlbnRQYWdlIGlzIEBjb2xsZWN0aW9uLnN0YXRlLmxhc3RQYWdlXG4gICAgcmVzcG9uc2UgPSB1bmRlZmluZWRcbiAgICBpZiBkaXJlY3Rpb24gaXMgJ3ByZXYnIGFuZCBjdXJyZW50UGFnZVxuICAgICAgcmVzcG9uc2UgPSBAY29sbGVjdGlvbi5nZXRQcmV2aW91c1BhZ2UoKVxuICAgIGVsc2UgaWYgZGlyZWN0aW9uIGlzICduZXh0JyBhbmQgbm90IG9uTGFzdFBhZ2VcbiAgICAgIHJlc3BvbnNlID0gQGNvbGxlY3Rpb24uZ2V0TmV4dFBhZ2UoKVxuICAgIGlmIF9fREVWX18gYW5kIHJlc3BvbnNlXG4gICAgICByZXNwb25zZS5kb25lIC0+XG4gICAgICAgIGNvbnNvbGUubG9nIFwiQ2xlYW51cD9cIlxuICBnZXRQcmV2aW91c1BhZ2U6IC0+XG4gICAgQGdldEFub3RoZXJQYWdlICdwcmV2J1xuICBnZXROZXh0UGFnZTogLT5cbiAgICBAZ2V0QW5vdGhlclBhZ2UgJ25leHQnXG4iXX0=
