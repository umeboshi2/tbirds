Backbone = require 'backbone'

MainChannel = Backbone.Radio.channel 'global'
#MessageChannel = Backbone.Radio.channel 'messages'

class User extends Backbone.Model

class CurrentUser extends User

make_current_user_model = (url) ->
  new CurrentUser
    url: url


currentuser = new CurrentUser
MainChannel.reply 'current-user', ->
  currentuser

MainChannel.reply 'create-current-user-object', (url) ->
  currentuser = make_current_user_model url
  # create current-user request
  MainChannel.reply 'current-user', ->
    currentuser
    

module.exports =
  User: User
  CurrentUser: CurrentUser
  

