import { isEmpty } from 'lodash'
# https://stackoverflow.com/a/32108184
#export default (obj) ->
#  (Object.keys(obj).length == 0 && obj.constructor == Object)
console.warn "DEPRECATED: Use _.isEmpty instead"
export default isEmpty
