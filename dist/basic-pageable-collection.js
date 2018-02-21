var Backbone, BasicPageableCollection, MainChannel, PageableCollection, pageSize;

Backbone = require('backbone');

PageableCollection = require('backbone.paginator');

MainChannel = Backbone.Radio.channel('global');

pageSize = MainChannel.request('main:app:get-pagesize' || 10);

BasicPageableCollection = (function() {
  class BasicPageableCollection extends PageableCollection {
    parse(response) {
      var total;
      // FIXME it seems we have to set
      // totalPages and lastPage each time
      total = response.total_count;
      this.state.totalRecords = total;
      this.state.totalPages = Math.ceil(total / this.state.pageSize);
      // we start at page zero
      this.state.lastPage = this.state.totalPages - 1;
      return super.parse(response.items);
    }

  };

  BasicPageableCollection.prototype.queryParams = {
    sort: function() {
      return this.state.sortColumn;
    },
    direction: function() {
      return this.state.sortDirection;
    },
    pageSize: 'limit',
    currentPage: '',
    offset: function() {
      return this.state.currentPage * this.state.pageSize;
    }
  };

  BasicPageableCollection.prototype.state = {
    firstPage: 0,
    pageSize: parseInt(pageSize),
    sortColumn: 'id',
    sortDirection: 'asc'
  };

  return BasicPageableCollection;

}).call(this);

module.exports = BasicPageableCollection;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMtcGFnZWFibGUtY29sbGVjdGlvbi5qcyIsInNvdXJjZXMiOlsiYmFzaWMtcGFnZWFibGUtY29sbGVjdGlvbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxRQUFBLEVBQUEsdUJBQUEsRUFBQSxXQUFBLEVBQUEsa0JBQUEsRUFBQTs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsa0JBQUEsR0FBcUIsT0FBQSxDQUFRLG9CQUFSOztBQUVyQixXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUVkLFFBQUEsR0FBVyxXQUFXLENBQUMsT0FBWixDQUFvQix1QkFBQSxJQUEyQixFQUEvQzs7QUFFTDtFQUFOLE1BQUEsd0JBQUEsUUFBc0MsbUJBQXRDO0lBZUUsS0FBTyxDQUFDLFFBQUQsQ0FBQTtBQUdMLFVBQUEsS0FBQTs7O01BQUEsS0FBQSxHQUFRLFFBQVEsQ0FBQztNQUNqQixJQUFDLENBQUEsS0FBSyxDQUFDLFlBQVAsR0FBc0I7TUFDdEIsSUFBQyxDQUFBLEtBQUssQ0FBQyxVQUFQLEdBQW9CLElBQUksQ0FBQyxJQUFMLENBQVUsS0FBQSxHQUFRLElBQUMsQ0FBQSxLQUFLLENBQUMsUUFBekIsRUFGcEI7O01BSUEsSUFBQyxDQUFBLEtBQUssQ0FBQyxRQUFQLEdBQWtCLElBQUMsQ0FBQSxLQUFLLENBQUMsVUFBUCxHQUFvQjtrQkFQeEMsQ0FBQSxLQVFFLENBQU0sUUFBUSxDQUFDLEtBQWY7SUFSSzs7RUFmVDs7b0NBQ0UsV0FBQSxHQUNFO0lBQUEsSUFBQSxFQUFNLFFBQUEsQ0FBQSxDQUFBO2FBQ0osSUFBQyxDQUFBLEtBQUssQ0FBQztJQURILENBQU47SUFFQSxTQUFBLEVBQVcsUUFBQSxDQUFBLENBQUE7YUFDVCxJQUFDLENBQUEsS0FBSyxDQUFDO0lBREUsQ0FGWDtJQUlBLFFBQUEsRUFBVSxPQUpWO0lBS0EsV0FBQSxFQUFhLEVBTGI7SUFNQSxNQUFBLEVBQVEsUUFBQSxDQUFBLENBQUE7YUFDTixJQUFDLENBQUEsS0FBSyxDQUFDLFdBQVAsR0FBcUIsSUFBQyxDQUFBLEtBQUssQ0FBQztJQUR0QjtFQU5SOztvQ0FRRixLQUFBLEdBQ0U7SUFBQSxTQUFBLEVBQVcsQ0FBWDtJQUNBLFFBQUEsRUFBVSxRQUFBLENBQVMsUUFBVCxDQURWO0lBRUEsVUFBQSxFQUFZLElBRlo7SUFHQSxhQUFBLEVBQWU7RUFIZjs7Ozs7O0FBY0osTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJCYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuUGFnZWFibGVDb2xsZWN0aW9uID0gcmVxdWlyZSAnYmFja2JvbmUucGFnaW5hdG9yJ1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcblxucGFnZVNpemUgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpnZXQtcGFnZXNpemUnIG9yIDEwXG5cbmNsYXNzIEJhc2ljUGFnZWFibGVDb2xsZWN0aW9uIGV4dGVuZHMgUGFnZWFibGVDb2xsZWN0aW9uXG4gIHF1ZXJ5UGFyYW1zOlxuICAgIHNvcnQ6IC0+XG4gICAgICBAc3RhdGUuc29ydENvbHVtblxuICAgIGRpcmVjdGlvbjogLT5cbiAgICAgIEBzdGF0ZS5zb3J0RGlyZWN0aW9uXG4gICAgcGFnZVNpemU6ICdsaW1pdCdcbiAgICBjdXJyZW50UGFnZTogJydcbiAgICBvZmZzZXQ6IC0+XG4gICAgICBAc3RhdGUuY3VycmVudFBhZ2UgKiBAc3RhdGUucGFnZVNpemVcbiAgc3RhdGU6XG4gICAgZmlyc3RQYWdlOiAwXG4gICAgcGFnZVNpemU6IHBhcnNlSW50IHBhZ2VTaXplXG4gICAgc29ydENvbHVtbjogJ2lkJ1xuICAgIHNvcnREaXJlY3Rpb246ICdhc2MnXG4gIHBhcnNlOiAocmVzcG9uc2UpIC0+XG4gICAgIyBGSVhNRSBpdCBzZWVtcyB3ZSBoYXZlIHRvIHNldFxuICAgICMgdG90YWxQYWdlcyBhbmQgbGFzdFBhZ2UgZWFjaCB0aW1lXG4gICAgdG90YWwgPSByZXNwb25zZS50b3RhbF9jb3VudFxuICAgIEBzdGF0ZS50b3RhbFJlY29yZHMgPSB0b3RhbFxuICAgIEBzdGF0ZS50b3RhbFBhZ2VzID0gTWF0aC5jZWlsIHRvdGFsIC8gQHN0YXRlLnBhZ2VTaXplXG4gICAgIyB3ZSBzdGFydCBhdCBwYWdlIHplcm9cbiAgICBAc3RhdGUubGFzdFBhZ2UgPSBAc3RhdGUudG90YWxQYWdlcyAtIDFcbiAgICBzdXBlciByZXNwb25zZS5pdGVtc1xuICAgIFxubW9kdWxlLmV4cG9ydHMgPSBCYXNpY1BhZ2VhYmxlQ29sbGVjdGlvblxuXG4gIFxuIl19
