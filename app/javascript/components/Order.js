import React, { Component } from 'react'

import { formatPrice } from '../utils/helpers'

class Order extends Component {

  renderOrder = (key) => {
    const fish = Object.values(this.props.fishes).find(fish => fish.id === Number(key))
    // const fish = this.props.fishes[key]
    const count = this.props.order[key]
    const removeButton = <button onClick={() => this.props.removeFromOrder(fish)}>&times;</button>
    const incrementButton = <button onClick={() => this.props.changeOrderQty(fish, true)}>⬆️</button>
    const decrementButton = <button onClick={() => this.props.changeOrderQty(fish, false)}>⬇️</button>

    if(!fish) return null;

    if (fish.status === 'unavailable') {
      return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available! {removeButton }</li>
    }

    return (
      <li key={key}>
        <span>{count}lbs {fish.name} {removeButton } {incrementButton} {decrementButton} </span>
        <span className="price">{formatPrice(count * fish.price)}</span>
      </li>
    )
  }

  render() {
    const orderIds = Object.keys(this.props.order)
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = Object.values(this.props.fishes).find(fish => fish.id === Number(key))
      const count = this.props.order[key]
      const isAvailable = fish && fish.status == 'available'
      if(isAvailable) {
        return prevTotal + (count * fish.price || 0)
      }
      return prevTotal
    }, 0)
    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <ul className="order">
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total: </strong>
            {formatPrice(total)}
          </li>
        </ul>
        <button onClick={this.props.checkout}>Check out</button>
      </div>
    )
  }
}

export default Order
