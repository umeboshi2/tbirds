var BaseLocalStorageModel;

import {
  size
} from 'lodash';

import $ from 'jquery';

import {
  Model
} from 'backbone';

console.warn("Use a better model");

BaseLocalStorageModel = class BaseLocalStorageModel extends Model {
  initialize() {
    this.fetch();
    return this.on('change', this.save, this);
  }

  fetch() {
    return this.set(JSON.parse(localStorage.getItem(this.id)));
  }

  save(attributes, options) {
    localStorage.setItem(this.id, JSON.stringify(this.toJSON()));
    return $.ajax({
      success: options.success,
      error: options.error
    });
  }

  destroy() {
    return localStorage.removeItem(this.id);
  }

  isEmpty() {
    return size(this.attributes <= 1);
  }

};

export default BaseLocalStorageModel;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1sb2NhbHN0b3JhZ2UtbW9kZWwuanMiLCJzb3VyY2VzIjpbImJhc2UtbG9jYWxzdG9yYWdlLW1vZGVsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE9BQUE7RUFBUyxJQUFUO0NBQUEsTUFBQTs7QUFDQSxPQUFPLENBQVAsTUFBQTs7QUFDQSxPQUFBO0VBQVMsS0FBVDtDQUFBLE1BQUE7O0FBRUEsT0FBTyxDQUFDLElBQVIsQ0FBYSxvQkFBYjs7QUFFTSx3QkFBTixNQUFBLHNCQUFBLFFBQW9DLE1BQXBDO0VBQ0UsVUFBWSxDQUFBLENBQUE7SUFDVixJQUFDLENBQUEsS0FBRCxDQUFBO1dBQ0EsSUFBQyxDQUFBLEVBQUQsQ0FBSSxRQUFKLEVBQWMsSUFBQyxDQUFBLElBQWYsRUFBcUIsSUFBckI7RUFGVTs7RUFHWixLQUFPLENBQUEsQ0FBQTtXQUNMLElBQUMsQ0FBQSxHQUFELENBQUssSUFBSSxDQUFDLEtBQUwsQ0FBVyxZQUFZLENBQUMsT0FBYixDQUFxQixJQUFDLENBQUEsRUFBdEIsQ0FBWCxDQUFMO0VBREs7O0VBRVAsSUFBTSxDQUFDLFVBQUQsRUFBYSxPQUFiLENBQUE7SUFDSixZQUFZLENBQUMsT0FBYixDQUFxQixJQUFDLENBQUEsRUFBdEIsRUFBMEIsSUFBSSxDQUFDLFNBQUwsQ0FBZSxJQUFDLENBQUEsTUFBRCxDQUFBLENBQWYsQ0FBMUI7QUFDQSxXQUFPLENBQUMsQ0FBQyxJQUFGLENBQ0w7TUFBQSxPQUFBLEVBQVMsT0FBTyxDQUFDLE9BQWpCO01BQ0EsS0FBQSxFQUFPLE9BQU8sQ0FBQztJQURmLENBREs7RUFGSDs7RUFLTixPQUFVLENBQUEsQ0FBQTtBQUNSLFdBQU8sWUFBWSxDQUFDLFVBQWIsQ0FBd0IsSUFBQyxDQUFBLEVBQXpCO0VBREM7O0VBRVYsT0FBUyxDQUFBLENBQUE7QUFDUCxXQUFPLElBQUEsQ0FBSyxJQUFDLENBQUEsVUFBRCxJQUFlLENBQXBCO0VBREE7O0FBYlg7O0FBZ0JBLE9BQUEsUUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNpemUgfSBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJ2JhY2tib25lJ1xuXG5jb25zb2xlLndhcm4gXCJVc2UgYSBiZXR0ZXIgbW9kZWxcIlxuXG5jbGFzcyBCYXNlTG9jYWxTdG9yYWdlTW9kZWwgZXh0ZW5kcyBNb2RlbFxuICBpbml0aWFsaXplOiAtPlxuICAgIEBmZXRjaCgpXG4gICAgQG9uICdjaGFuZ2UnLCBAc2F2ZSwgQFxuICBmZXRjaDogKCkgLT5cbiAgICBAc2V0IEpTT04ucGFyc2UgbG9jYWxTdG9yYWdlLmdldEl0ZW0gQGlkXG4gIHNhdmU6IChhdHRyaWJ1dGVzLCBvcHRpb25zKSAtPlxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKEBpZCwgSlNPTi5zdHJpbmdpZnkoQHRvSlNPTigpKSlcbiAgICByZXR1cm4gJC5hamF4XG4gICAgICBzdWNjZXNzOiBvcHRpb25zLnN1Y2Nlc3NcbiAgICAgIGVycm9yOiBvcHRpb25zLmVycm9yXG4gIGRlc3Ryb3k6ICAtPlxuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSBAaWRcbiAgaXNFbXB0eTogKCkgLT5cbiAgICByZXR1cm4gc2l6ZSBAYXR0cmlidXRlcyA8PSAxXG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VMb2NhbFN0b3JhZ2VNb2RlbFxuICAgIFxuIl19
