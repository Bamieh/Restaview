import React, { Component, PropTypes } from 'react'
import { toArray } from 'lodash'

import classes from './RestaurantContainer.scss'
import CircularProgress from 'material-ui/CircularProgress'

// redux/firebase
import { connect } from 'react-redux'
import { firebase, helpers } from 'react-redux-firebase'
const { isLoaded, dataToJS } = helpers

import RestaurantDetails from '../components/RestaurantDetails'

import Paper from 'material-ui/Paper';


@firebase(
  // Get paths from firebase
  ({ params }) => ([
    `restaurants/${params.id}`,
    `reviews/${params.id}`
  ])
)
@connect(
  // Map state to props
  ({ firebase }, { params }) => ({
    restaurant: dataToJS(firebase, `restaurants/${params.id}`),
    reviews: dataToJS(firebase, `reviews/${params.id}`),
  })
)
export default class Restaurant extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static propTypes = {
    restaurant: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    reviews: PropTypes.array,
    params: PropTypes.object.isRequired,
    children: PropTypes.object,
    firebase: PropTypes.shape({
      push: PropTypes.func.isRequired
    })
  }

  render () {
    const { restaurant, reviews, firebase, params } = this.props
    // console.log('firebase');
    // firebase.push(`reviews/${params.id}`, {
    //   comment: "This Restaurant has the best seats!",
    //   date: "24-Oct-2016",
    //   reviewer: "Ahmad Bamieh",
    //   stars: 5,
    // }, () => {console.log('done!!')})
    
    if (!isLoaded(restaurant) || !isLoaded(reviews)) {
      return (
        <div className={classes['progress']}>
          <CircularProgress />
        </div>
      )
    }
    const reviewsArray = toArray(reviews);

    return (
      <div className={classes['container']}>
        <RestaurantDetails restaurant={restaurant} />
        <pre>{JSON.stringify(restaurant)}</pre>
        <pre>{JSON.stringify(reviewsArray)}</pre>
      </div>
    )
  }
}
