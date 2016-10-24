import React, { Component, PropTypes } from 'react'
import { toArray } from 'lodash'

// Components
import ProjectTile from '../components/ProjectTile/ProjectTile'
import CircularProgress from 'material-ui/CircularProgress'

import classes from './restaurantsContainer.scss'

// redux/firebase
import { connect } from 'react-redux'
import { firebase, helpers } from 'react-redux-firebase'
const { dataToJS, isLoaded, isEmpty } = helpers

// Decorators
@firebase(
  ({ params }) =>
    ([
      `restaurants`
      // TODO: Use population instead of loading whole usernames list
      // `restaurants/${params.username}#populate=collaborators:users`,
    ])
)
@connect(
  ({ firebase }, { params }) => ({
    restaurants: dataToJS(firebase, `restaurants`)
  })
)
export default class restaurants extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static propTypes = {
    restaurants: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    firebase: PropTypes.object,
    children: PropTypes.object,
    params: PropTypes.object
  }

  render () {
    // Project Route is being loaded
    if (this.props.children) return this.props.children

    const { restaurants } = this.props

    if (!isLoaded(restaurants)) {
      return (
        <div className={classes['progress']}>
          <CircularProgress />
        </div>
      )
    }

    if (isEmpty(restaurants)) {
      return (
        <div className={classes['container']}>
          <h1>Restaurants</h1>
          <div>This user has no restaurants1</div>
        </div>
      )
    }

    const restaurantsList = restaurants.map((restaurant, i) => (
      <ProjectTile
        key={`RestaurantTile-${i}`}
        index={i}
        restaurant={restaurant}
      />
    ))

    return (
      <div className={classes['container']}>
        <div className={classes['tiles']}>
          {restaurantsList}
        </div>
      </div>
    )
  }
}
