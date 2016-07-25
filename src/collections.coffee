Backbone = require 'backbone'


class BaseCollection extends Backbone.Collection
  # wrap the parsing to retrieve the
  # 'data' attribute from the json response
  parse: (response) ->
    return response.data

  
module.exports =
  BaseCollection: BaseCollection
