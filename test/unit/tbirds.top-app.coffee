import { expect } from 'chai'
import '../../src/routers/filtered-router'
import createMainApp from '../../src/start-main-app'
import appConfig from '../../src/app-config'
describe 'Create Main App', ->
  'use strict'
  afterEach ->
    window.location.hash = ''
    return
  describe 'when top app is initialized with generic config', -> # noqa
    beforeEach ->
      suite = this
      cfg = _.clone appConfig
      @app = createMainApp cfg
      #@app.start()
      return
    it 'has options property', ->
      expect(@app).to.have.property('options')
    it 'has appConfig', ->
      cfg = @app.getState('appConfig')
      expect(cfg).to.be.an('object')
      describe 'App config must have all required keys', ->
        allKeys = ['appRegion', 'layout', 'layoutOptions', 'useMessages',
          'useNavbar', 'brand', 'frontdoorApplet', 'hasUser', 'userMenuApp',
          'needLogin', 'loginUrl', 'guestUserName', 'navbarEntries',
          'appletRoutes', 'authToken']
        allKeys.forEach (key) ->
          it "should have #{key} property", ->
            expect(cfg).to.have.property(key)
      cfg.foobar = 'foobar'
    it 'should have a refreshed config', ->
      cfg = @app.getState('appConfig')
      expect(cfg).not.have.property('foobar')
      @app.setState('startHistory', false)
      expect(@app.getState('startHistory')).to.equal(false)
    it 'should have some child apps', ->
      app = @app
      describe "three included child apps", ->
        childApps = ['messages', 'navbar', 'router']
        childApps.forEach (name) ->
          it "should be named #{name}", ->
            child = app.getChildApp name
            expect(child.getName()).to.equal(name)
            #console.log "child", child
          it "#{name} should have proper parent", ->
            child = app.getChildApp name
            expect(child.getOption('parentApp')).to.equal(app)
    it 'should have set radio replies', ->
      channel = Backbone.Radio.channel 'global'
      #console.log "channel", channel
      app = channel.request('main:app:object')
      expect(app).to.equal(@app)
      cfg = channel.request("main:app:config")
      expect(cfg).to.eql(appConfig)
            
