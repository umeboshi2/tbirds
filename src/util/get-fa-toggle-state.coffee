# FIXME: this may remain unused
getFAtoggleState = (el) ->
  if el.hasClass 'fa-toggle-off'
    return false
  else if el.hasClass 'fa-toggle-on'
    return true
  else
    throw Error("bad el", el)
    
export default getFAtoggleState
