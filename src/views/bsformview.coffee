import FormView from './formview'

class BootstrapFormView extends FormView
  valid: (view, attr, selector) =>
    element = @$("[data-validation=#{attr}]")
    # parent is form-group div
    parent = element.parent()
    parent
      .removeClass('has-danger')
      .addClass('has-success')
    element
      .removeClass('is-invalid')
      .addClass('is-valid')

  invalid: (view, attr, error, selector) =>
    @failure(@model)
    element = @$("[data-validation=#{attr}]")
    # parent is form-group div
    parent = element.parent()
    parent
      .removeClass('has-success')
      .addClass('has-danger')
    element
      .removeClass('is-valid')
      .addClass('is-invalid')

export default BootstrapFormView
