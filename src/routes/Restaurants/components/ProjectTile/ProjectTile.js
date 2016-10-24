import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import s from './RestaurantTile.scss'

import { Link } from 'react-router'

export const RestaurantTile = ({ restaurant, index }) => {
  const overlay = (
    <Link to={`/restaurants/${index}`} >
      <CardTitle
        title={restaurant.name}
        subtitle="Overlay subtitle"
        style={{backgroundColor: "rgba(0,0,0,0.75)"}}
        titleColor="rgba(255,255,255,0.98)"
        subtitleColor="rgba(255,255,255,0.65)"
      />
    </Link>
  );

  return (
    <Card key={`restaurant-${index}`} className={s.container}>
      <CardMedia className={s.cardMedia} overlay={overlay} >
        <img src={restaurant.photograph} height="200px" className={s.image}/>
      </CardMedia>
    </Card>
  );
}

RestaurantTile.propTypes = {
  restaurant: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}

export default RestaurantTile
