Backbone = require 'backbone'

MainChannel = Backbone.Radio.channel 'global'
#MessageChannel = Backbone.Radio.channel 'messages'

class User extends Backbone.Model

class CurrentUser extends User

make_current_user_model = (url) ->
  user= new CurrentUser
  user.url = url
  return user
  
MainChannel.reply 'create-current-user-object', (url) ->
  currentuser = make_current_user_model url
  # create current-user request
  MainChannel.reply 'current-user', ->
    currentuser
  currentuser
  

module.exports =
  User: User
  CurrentUser: CurrentUser
  

