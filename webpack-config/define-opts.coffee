BuildEnvironment = require './buildenv'
#DefinePluginOpts =
module.exports =
  development:
    __DEV__: 'true'
    DEBUG: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
    #__useCssModules__: 'true'
    __useCssModules__: 'false'
  production:
    __DEV__: 'false'
    DEBUG: 'false'
    #__useCssModules__: 'true'
    __useCssModules__: 'false'
    'process.env':
      'NODE_ENV': JSON.stringify 'production'
    
