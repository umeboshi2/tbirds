# https://stackoverflow.com/a/32108184
export default (obj) ->
  (Object.keys(obj).length == 0 && obj.constructor == Object)
