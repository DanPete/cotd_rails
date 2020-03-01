import React, { Component } from 'react'

import { formatPrice, imgPath } from '../../helpers/helper'

class Fish extends Component {

  render() {
    const { details, index } = this.props
    const isAvailable = details.status === 'available'
    const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!'
    
    return (
      <li className="menu-fish">
        <img src={imgPath(details.image)} alt={details.name} />
        {/* <img src={`${require(`./static${details.image}`)}`} alt={details.name} /> */}
        <h3 className="fish-name">{details.name}</h3>
        <span className="price">{formatPrice(details.price)}</span>
        <p>{details.desc}</p>
        <button onClick={() => this.props.addToOrder(details)} disabled={!isAvailable}>{buttonText}</button>
      </li>
    )
  }
}

export default Fish