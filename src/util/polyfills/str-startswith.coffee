module.exports = (searchString, position) ->
  position = position or 0
  return @substr(position, searchString, position) == searchString
