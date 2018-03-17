import Backbone from 'backbone'
import PageableCollection from  'backbone.paginator'

MainChannel = Backbone.Radio.channel 'global'

pageSize = MainChannel.request 'main:app:get-pagesize'
if not pageSize
  pageSize = 10
  
export default class BasicPageableCollection extends PageableCollection
  queryParams:
    sort: ->
      @state.sortColumn
    direction: ->
      @state.sortDirection
    pageSize: 'limit'
    currentPage: ''
    offset: ->
      @state.currentPage * @state.pageSize
  state:
    firstPage: 0
    currentPage: 0
    pageSize: parseInt pageSize
    sortColumn: 'id'
    sortDirection: 'asc'
  parse: (response) ->
    # FIXME it seems we have to set
    # totalPages and lastPage each time
    total = response.total_count
    @state.totalRecords = total
    @state.totalPages = Math.ceil total / @state.pageSize
    # we start at page zero
    @state.lastPage = @state.totalPages - 1
    super response.items
