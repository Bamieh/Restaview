export default (store) => ({
  path: 'restaurants',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Projects = require('./containers/RestaurantsContainer').default

      /*  Return getComponent   */
      cb(null, Projects)

    /* Webpack named bundle   */
    }, 'restaurants')
  },
  getChildRoutes (partialNextState, cb) {
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Project = require('./routes/Restaurant/index.js').default

      /*  Return getComponent   */
      cb(null, [ Project(store) ])
    })
  }
})
