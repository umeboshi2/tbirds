Backbone = require 'backbone'
Marionette = require 'backbone.marionette'


MenuTemplates = require '../templates/menus'

class UserMenuView extends Backbone.Marionette.View
  template: MenuTemplates.user_menu

module.exports = UserMenuView
