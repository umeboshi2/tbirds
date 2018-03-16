# use polyfill for String.endsWith if needed
#if not String.prototype?.endsWith
#  String.prototype.endsWith = string_endswith
export default (searchString, position) ->
  subjectString = @toString()
  if typeof position != 'number' or !isFinite(position) or Math.floor(position) != position or position > subjectString.length # noqa
    position = subjectString.length
  position -= searchString.length
  lastIndex = subjectString.indexOf(searchString, position)
  lastIndex != -1 and lastIndex == position
