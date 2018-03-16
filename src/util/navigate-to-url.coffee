import Backbone from 'backbone'
export default (url) ->
  if url.split('/')[0] == ''
    window.location = url
  else
    r = new Backbone.Router
    r.navigate url, trigger:true

