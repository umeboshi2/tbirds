module.exports = (fieldlist) ->
  uiobject = {}
  for field in fieldlist
    uiobject[field] = "input[name=\"#{field}\"]"
  return uiobject

