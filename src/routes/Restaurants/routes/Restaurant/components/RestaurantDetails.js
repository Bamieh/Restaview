import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper'

import s from './RestaurantDetails.scss'

import { Link } from 'react-router'

export const RestaurantDetails = ({ restaurant }) => {
  return (
    <article className={s.container}>
      <Paper className={s.imageContainer} zDepth={5} circle={true}>
        <img src={restaurant.photograph} className={s.image}/>
      </Paper>
      <div className={s.detailsContainer}>
        <h1>{restaurant.name}</h1>
        <address>
          {restaurant.address}
        </address>
        <p>opening hours: {restaurant.openTime} - {restaurant.closeTime} {restaurant.operatingDays}</p>
      </div>
    </article>
  );
}

RestaurantDetails.propTypes = {
  restaurant: PropTypes.object.isRequired,
}

export default RestaurantDetails
