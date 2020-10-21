import { expect } from 'chai'
import '../../src/routers/filtered-router'
import AppRouter from '../../src/routers/approuter.coffee'
describe 'app router', ->
  'use strict'
  afterEach ->
    window.location.hash = ''
    return
  describe 'when a route is configured with a method that does not exist on the controller', -> # noqa
    beforeEach ->
      suite = this
      @controller = {}
      @Router = AppRouter.extend(appRoutes: 'foo-route': 'doesNotExist')

      @run = ->
        suite.router = new (suite.Router)(controller: suite.controller)
        return

      return
    it 'should throw an error saying the method does not exist', ->
      expect(@run).to.throw 'Method doesNotExist was not found on the controller'# noqa
      return
    return
  describe 'when a controller is passed through the constructor and a route fires', -> # noqa
    beforeEach ->
      @controller = foo: @sinon.stub()
      @Router = AppRouter.extend(appRoutes: 'foo-route': 'foo')
      @router = new (@Router)(controller: @controller)
      Backbone.history.start()
      @router.navigate 'foo-route', true
      return
    it 'should call the configured method on the controller passed in the constructor', -> # noqa
      expect(@controller.foo).to.have.been.calledOnce
      return
    it 'should execute the controller method with the context of the controller', -> # noqa
      expect(@controller.foo).to.have.been.calledOnce.and.calledOn @controller
      return
    return
  describe 'when a controller is provided in the router definition and a route fires', -> # noqa
    beforeEach ->
      @controller = foo: @sinon.stub()
      @Router = AppRouter.extend(
        appRoutes: 'foo-route': 'foo'
        controller: @controller)
      @router = new (@Router)
      Backbone.history.start()
      @router.navigate 'foo-route', true
      return
    it 'should execute the controller method with the context of the controller', -> # noqa
      expect(@controller.foo).to.have.been.calledOnce.and.calledOn @controller
      return
    return
  describe 'when a second route fires from a controller instance', ->
    beforeEach ->
      @controller =
        foo: @sinon.stub()
        bar: @sinon.stub()
      @Router = AppRouter.extend(appRoutes:
        'foo-route': 'foo'
        'bar-route': 'bar')
      @router = new (@Router)(controller: @controller)
      Backbone.history.start()
      @router.navigate 'foo-route', true
      @router.navigate 'bar-route', true
      return
    it 'should execute the controller method with the context of the controller', -> # noqa
      expect(@controller.bar).to.have.been.calledOnce.and.calledOn @controller
      return
    return
  describe 'when a route fires with parameters', ->
    beforeEach ->
      @fooParam = 'bar'
      @controller = foo: @sinon.stub()
      @Router = AppRouter.extend(
        onRoute: @sinon.stub()
        appRoutes: 'foo-route/:id': 'foo')
      @router = new (@Router)(controller: @controller)
      Backbone.history.start()
      @router.navigate 'foo-route/' + @fooParam, true
      return
    it 'should call the configured method with parameters', ->
      expect(@controller.foo).to.have.always.been.calledWith @fooParam
      return
    it 'should call the onShow method for the route, passing the name of the route, the matched route, and the params', -> # noqa
      expect(@router.onRoute).to.have.been.calledOnce
      # Needs to be written this way as Backbone > 1.0 will pass an
      # additional null param # noqa
      expect(@router.onRoute.lastCall.args[0]).to.equal 'foo'
      expect(@router.onRoute.lastCall.args[1]).to.equal 'foo-route/:id'
      expect(@router.onRoute.lastCall.args[2][0]).to.equal @fooParam
      return
    return
  describe 'when a standard route is defined and fired', ->
    beforeEach ->
      @fooStub = @sinon.stub()
      @Router = AppRouter.extend(
        routes: 'foo-route': 'foo'
        foo: @fooStub)
      @router = new (@Router)
      Backbone.history.start()
      @router.navigate 'foo-route', true
      return
    it 'should fire the route callback', ->
      expect(@fooStub).to.have.been.calledOnce
      return
    return
  describe 'when router configured with ambiguous routes', ->
    beforeEach ->
      @controller =
        fooBar: @sinon.stub()
        fooId: @sinon.stub()
      @Router = AppRouter.extend(appRoutes:
        'foo/bar': 'fooBar'
        'foo/:id': 'fooId')
      Backbone.history.start()
      @router = new (@Router)(controller: @controller)
      @router.navigate 'foo/bar', true
      return
    it 'should take routes order into account', ->
      expect(@controller.fooBar).to.have.been.calledOnce
      expect(@controller.fooId).not.to.have.been.calledOnce
      return
    return
  describe 'when routes are in the wrong order', ->
    beforeEach ->
      @controller =
        fooBar: @sinon.stub()
        fooId: @sinon.stub()
      @Router = AppRouter.extend(appRoutes:
        'foo/:id': 'fooId'
        'foo/bar': 'fooBar')
      Backbone.history.start()
      @router = new (@Router)(controller: @controller)
      @router.navigate 'foo/bar', true
      return
    it 'should fire the wrong route', ->
      expect(@controller.fooBar).not.to.have.been.calledOnce
      expect(@controller.fooId).to.have.been.calledOnce
      return
    return
  describe 'when an app route is added manually', ->
    beforeEach ->
      @controller = foo: @sinon.stub()
      @Router = AppRouter.extend()
      @router = new (@Router)(controller: @controller)
      Backbone.history.start()
      @router.appRoute 'foo-route', 'foo'
      @router.navigate 'foo-route', true
      return
    it 'should fire the route', ->
      expect(@controller.foo).to.have.been.calledOnce
      return
    return
  describe 'when app routes are provided in the constructor', ->
    beforeEach ->
      @controller =
        foo: @sinon.stub()
        bar: @sinon.stub()
      @AppRouter = AppRouter.extend(appRoutes: 'foo-route': 'foo')
      @appRouter = new (@AppRouter)(
        controller: @controller
        appRoutes: 'bar-route': 'bar')
      Backbone.history.start()
      @appRouter.navigate 'foo-route', true
      @appRouter.navigate 'bar-route', true
      return
    it 'should override the configured routes and use the constructor param', ->
      expect(@controller.foo).not.to.have.been.calledOnce
      expect(@controller.bar).to.have.been.calledOnce
      return
    return
  describe 'when a route fires with parameters and app routes are provided exclusively in the constructor', -> # noqa
    beforeEach ->
      @fooParam = 'bar'
      @controller = foo: @sinon.stub()
      @AppRouter = AppRouter.extend(onRoute: @sinon.stub())
      @appRouter = new (@AppRouter)(
        controller: @controller
        appRoutes: 'foo-route/:id': 'foo')
      Backbone.history.start()
      @appRouter.navigate 'foo-route/' + @fooParam, true
      return
    it 'should call the configured method with parameters', ->
      expect(@controller.foo).to.have.always.been.calledWith @fooParam
      return
    it 'should call the onRoute method for the route, passing the name of the route, the matched route, and the params', -> # noqa
      expect(@appRouter.onRoute).to.have.been.calledOnce
      # Needs to be written this way as Backbone > 1.0 will pass an
      # additional null param
      expect(@appRouter.onRoute.lastCall.args[0]).to.equal 'foo'
      expect(@appRouter.onRoute.lastCall.args[1]).to.equal 'foo-route/:id'
      expect(@appRouter.onRoute.lastCall.args[2][0]).to.equal @fooParam
      return
    it 'should support getOption inside initialize', ->
      fooParam = ''
      @AppRouter = AppRouter.extend(initialize: ->
        fooParam = @getOption('fooParam')
        return
      )
      @appRouter = new (@AppRouter)(fooParam: 'bar')
      expect(fooParam).to.equal 'bar'
      return
    return
  return
