import AppRouter from './routers/approuter'

export class AppletRouter extends AppRouter
  appRoutes:
    'http*remainder': 'directLink'
    ':applet*path': 'routeApplet'
  onRoute: (name, path, args) ->
    if name is 'directLink'
      if args.length == 2
        if args[1] isnt null
          url = "http#{args.join('?')}"
        else
          url = "http#{args[0]}"
        window.open url, '_blank'
      else
        console.warn "unhandled directLink"
    if __DEV__ and DEBUG
      console.log "MainRouter.onRoute", name, path, args

