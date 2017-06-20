#https://github.com/goodeggs/teacup-camel-to-kebab
camel_to_kebab = (str) ->
  str.replace(/([A-Z])/g, ($1) -> "-#{$1.toLowerCase()}")


module.exports = camel_to_kebab
