import { expect } from 'chai'
import '../../src/routers/filtered-router'
import createMainApp from '../../src/start-main-app'
import appConfig from '../../src/app-config'
import TkApplet from '../../src/tkapplet'
import AppRouter from '../../src/routers/approuter'
import { MainController } from '../../src/controllers'

describe 'TK Applet', ->
  'use strict'
  afterEach ->
    window.location.hash = ''
    return
  describe 'when applet is initialized with generic objects', -> # noqa
    beforeEach ->
      suite = this
      cfg = _.clone appConfig
      @app = createMainApp cfg
      #@app.start()
      class Applet extends TkApplet
        channelName: 'applet'
        Controller: MainController
        Router: AppRouter
        appletEntries: [
          {
            label: 'test'
            url: '#test'
          }
        ]
      @applet = new Applet
      @applet.start()
      return
    it 'has options property', ->
      expect(@applet).to.have.property('options')
    it 'should not be set to start history', ->
      state = @applet.getState()
      expect(@applet.hasState('startHistory')).to.equal(false)
    it 'should have an empty state', ->
      expect(@applet.getState().toJSON()).to.be.empty
    it 'should be started and running', ->
      expect(@applet.isRunning()).to.equal(true)
    it 'should have set applet entires', ->
      channel = Backbone.Radio.channel 'navbar'
      entries = channel.request 'get-entries', 'applet'
      expect(entries).to.have.lengthOf.above(0)
    it 'should have only one test entry', ->
      channel = Backbone.Radio.channel 'navbar'
      entries = channel.request 'get-entries', 'applet'
      expect(entries).to.have.lengthOf(1)
    it "should be available on it's radio channel", ->
      channel = @applet.getChannel()
      applet = channel.request('get-applet')
      expect(applet).to.deep.equal(@applet)
    it "should have a controller", ->
      controller = @applet.getController()
      expect(controller instanceof MainController).to.be.true
    it "should have an approuter", ->
      router = @applet.router
      expect(router instanceof AppRouter).to.be.true
      
