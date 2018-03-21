var BasicPageableCollection, MainChannel, pageSize;

import Backbone from 'backbone';

import PageableCollection from 'backbone.paginator';

MainChannel = Backbone.Radio.channel('global');

pageSize = MainChannel.request('main:app:get-pagesize');

if (!pageSize) {
  pageSize = 10;
}

export default BasicPageableCollection = (function() {
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
    currentPage: 0,
    pageSize: parseInt(pageSize),
    sortColumn: 'id',
    sortDirection: 'asc'
  };

  return BasicPageableCollection;

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMtcGFnZWFibGUtY29sbGVjdGlvbi5qcyIsInNvdXJjZXMiOlsiYmFzaWMtcGFnZWFibGUtY29sbGVjdGlvbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSx1QkFBQSxFQUFBLFdBQUEsRUFBQTs7QUFBQSxPQUFPLFFBQVAsTUFBQTs7QUFDQSxPQUFPLGtCQUFQLE1BQUE7O0FBRUEsV0FBQSxHQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBZixDQUF1QixRQUF2Qjs7QUFFZCxRQUFBLEdBQVcsV0FBVyxDQUFDLE9BQVosQ0FBb0IsdUJBQXBCOztBQUNYLElBQUcsQ0FBSSxRQUFQO0VBQ0UsUUFBQSxHQUFXLEdBRGI7OztBQUdBLE9BQUEsUUFBcUI7RUFBTixNQUFBLHdCQUFBLFFBQXNDLG1CQUF0QztJQWdCYixLQUFPLENBQUMsUUFBRCxDQUFBO0FBR0wsVUFBQSxLQUFBOzs7TUFBQSxLQUFBLEdBQVEsUUFBUSxDQUFDO01BQ2pCLElBQUMsQ0FBQSxLQUFLLENBQUMsWUFBUCxHQUFzQjtNQUN0QixJQUFDLENBQUEsS0FBSyxDQUFDLFVBQVAsR0FBb0IsSUFBSSxDQUFDLElBQUwsQ0FBVSxLQUFBLEdBQVEsSUFBQyxDQUFBLEtBQUssQ0FBQyxRQUF6QixFQUZwQjs7TUFJQSxJQUFDLENBQUEsS0FBSyxDQUFDLFFBQVAsR0FBa0IsSUFBQyxDQUFBLEtBQUssQ0FBQyxVQUFQLEdBQW9CO2tCQVB4QyxDQUFBLEtBUUUsQ0FBTSxRQUFRLENBQUMsS0FBZjtJQVJLOztFQWhCTTs7b0NBQ2IsV0FBQSxHQUNFO0lBQUEsSUFBQSxFQUFNLFFBQUEsQ0FBQSxDQUFBO2FBQ0osSUFBQyxDQUFBLEtBQUssQ0FBQztJQURILENBQU47SUFFQSxTQUFBLEVBQVcsUUFBQSxDQUFBLENBQUE7YUFDVCxJQUFDLENBQUEsS0FBSyxDQUFDO0lBREUsQ0FGWDtJQUlBLFFBQUEsRUFBVSxPQUpWO0lBS0EsV0FBQSxFQUFhLEVBTGI7SUFNQSxNQUFBLEVBQVEsUUFBQSxDQUFBLENBQUE7YUFDTixJQUFDLENBQUEsS0FBSyxDQUFDLFdBQVAsR0FBcUIsSUFBQyxDQUFBLEtBQUssQ0FBQztJQUR0QjtFQU5SOztvQ0FRRixLQUFBLEdBQ0U7SUFBQSxTQUFBLEVBQVcsQ0FBWDtJQUNBLFdBQUEsRUFBYSxDQURiO0lBRUEsUUFBQSxFQUFVLFFBQUEsQ0FBUyxRQUFULENBRlY7SUFHQSxVQUFBLEVBQVksSUFIWjtJQUlBLGFBQUEsRUFBZTtFQUpmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IFBhZ2VhYmxlQ29sbGVjdGlvbiBmcm9tICAnYmFja2JvbmUucGFnaW5hdG9yJ1xuXG5NYWluQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2dsb2JhbCdcblxucGFnZVNpemUgPSBNYWluQ2hhbm5lbC5yZXF1ZXN0ICdtYWluOmFwcDpnZXQtcGFnZXNpemUnXG5pZiBub3QgcGFnZVNpemVcbiAgcGFnZVNpemUgPSAxMFxuICBcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2ljUGFnZWFibGVDb2xsZWN0aW9uIGV4dGVuZHMgUGFnZWFibGVDb2xsZWN0aW9uXG4gIHF1ZXJ5UGFyYW1zOlxuICAgIHNvcnQ6IC0+XG4gICAgICBAc3RhdGUuc29ydENvbHVtblxuICAgIGRpcmVjdGlvbjogLT5cbiAgICAgIEBzdGF0ZS5zb3J0RGlyZWN0aW9uXG4gICAgcGFnZVNpemU6ICdsaW1pdCdcbiAgICBjdXJyZW50UGFnZTogJydcbiAgICBvZmZzZXQ6IC0+XG4gICAgICBAc3RhdGUuY3VycmVudFBhZ2UgKiBAc3RhdGUucGFnZVNpemVcbiAgc3RhdGU6XG4gICAgZmlyc3RQYWdlOiAwXG4gICAgY3VycmVudFBhZ2U6IDBcbiAgICBwYWdlU2l6ZTogcGFyc2VJbnQgcGFnZVNpemVcbiAgICBzb3J0Q29sdW1uOiAnaWQnXG4gICAgc29ydERpcmVjdGlvbjogJ2FzYydcbiAgcGFyc2U6IChyZXNwb25zZSkgLT5cbiAgICAjIEZJWE1FIGl0IHNlZW1zIHdlIGhhdmUgdG8gc2V0XG4gICAgIyB0b3RhbFBhZ2VzIGFuZCBsYXN0UGFnZSBlYWNoIHRpbWVcbiAgICB0b3RhbCA9IHJlc3BvbnNlLnRvdGFsX2NvdW50XG4gICAgQHN0YXRlLnRvdGFsUmVjb3JkcyA9IHRvdGFsXG4gICAgQHN0YXRlLnRvdGFsUGFnZXMgPSBNYXRoLmNlaWwgdG90YWwgLyBAc3RhdGUucGFnZVNpemVcbiAgICAjIHdlIHN0YXJ0IGF0IHBhZ2UgemVyb1xuICAgIEBzdGF0ZS5sYXN0UGFnZSA9IEBzdGF0ZS50b3RhbFBhZ2VzIC0gMVxuICAgIHN1cGVyIHJlc3BvbnNlLml0ZW1zXG4iXX0=
