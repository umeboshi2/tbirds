#https://github.com/goodeggs/teacup-camel-to-kebab
export default (str) ->
  str.replace(/([A-Z])/g, ($1) -> "-#{$1.toLowerCase()}")
