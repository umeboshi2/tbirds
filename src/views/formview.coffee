import $ from 'jquery'
import _ from 'lodash'
import { View } from 'backbone.marionette'
import Validation from 'backbone.validation'

class FormView extends View
  constructor: ->
    super arguments...

    @listenTo this, 'render', @hideActivityIndicator
    @listenTo this, 'render', @prepareModel
    @listenTo this, 'save:form:success', @success
    @listenTo this, 'save:form:failure', @failure

  delegateEvents: (events)->
    @ui = _.extend @_baseUI(), _.result(this, 'ui')
    @events = _.extend @_baseEvents(), _.result(this, 'events')
    super events

  tagName: 'form'
  className: 'needs-validation'

  _baseUI: ->
    submit: 'input[type="submit"]'
    activityIndicator: '.spinner'

  _baseEvents: ->
    eventHash =
      'change [data-validation]': @validateField
      'blur [data-validation]':   @validateField
      'keyup [data-validation]':  @validateField

    eventHash["click #{@ui.submit}"] = @processForm
    eventHash

  createModel: ->
    throw new Error 'implement #createModel in your FormView subclass to return a Backbone model' # noqa 

  prepareModel: ->
    @model = @createModel()
    @setupValidation()

  validateInput: (element) ->
    validation = element.attr('data-validation')
    value = element.val()
    invalidMessage = @model.preValidate validation, value
    if invalidMessage
      formGroup = element.parent()
      formGroup.children('.invalid-feedback').text invalidMessage
      @invalid @, validation
    else
      @valid @, validation

  validateField: (event) ->
    element = $(event.target)
    @validateInput element

  processForm: (event) ->
    event.preventDefault()
    @showActivityIndicator()
    el = $('[data-validation]')
    @validateInput el
    @updateModel()
    @saveModel()

  updateModel: ->
    throw new Error 'implement #updateModel in your FormView subclass to update the attributes of @model' # noqa

  saveModel: ->
    callbacks =
      success: => @trigger 'save:form:success', @model
      error: => @trigger 'save:form:failure', @model

    @model.save {}, callbacks

  success: (model) ->
    @render()
    @onSuccess(model)

  onSuccess: -> null

  failure: (model) ->
    @hideActivityIndicator()
    @onFailure(model)

  onFailure: -> null

  showActivityIndicator: ->
    @ui.activityIndicator.show()
    @ui.submit.hide()

  hideActivityIndicator: ->
    @ui.activityIndicator.hide()
    @ui.submit.show()

  setupValidation: ->
    Validation.unbind this
    Validation.bind this,
      valid: @valid
      invalid: @invalid

  valid: (view, attr) =>
    @$("[data-validation=#{attr}]")
      .removeClass('invalid')
      .addClass('valid')

  #invalid: (view, attr, error, selector) =>
  invalid: (view, attr) =>
    @failure(@model)
    @$("[data-validation=#{attr}]")
      .removeClass('valid')
      .addClass('invalid')

export default FormView
