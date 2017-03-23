apputil = require './apputil'
router = require './bootstrap_router'
controllers = require './controllers'
regions = require './regions'
views = require './views'
users = require './users'
messages = require './messages'
templates = require './templates/main'

module.exports =
  util: apputil
  router: router
  controllers: controllers
  regions: regions
  views: views
  users: users
  messages: messages
  templates: templates
