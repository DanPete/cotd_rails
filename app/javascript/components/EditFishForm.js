import React, { Component } from 'react'

import { formatPrice } from '../utils/helpers'


class EditFishForm extends Component {

  handleChange = (e, key) => {
    const fish = this.props.fishes[key]
    const updateFish = { ...fish }
    if (e.target.name === 'price') {
      console.log(e.target.value)
      const removeSymbol = e.target.value.replace(/\$/, '')
      const [dollars, cents] = removeSymbol.split('.')
      // console.log(dollars, cents)
      const formatMoney = parseInt(dollars + cents, 10)
      console.log(formatMoney)
      updateFish[e.target.name] = formatMoney
      // updateFish[e.target.name] = e.target.value
    } else {
      updateFish[e.target.name] = e.target.value
    }
    // OR
    /*
      const updateFish = {...fish}
      updateFish[e.target.name] = e.target.value

      const updateFish = {
        ...fish,
        [e.target.name]: e.target.value
      }
    */
    // console.log(this.props.fishes[key][e.target.name])
    // console.log(e.target.value)
    this.props.updateFish(key, updateFish)
  }

  render() {
    const fish = this.props.fishes[this.props.index]
    const key = this.props.index
    return (
      <div className="fish-edit" key={key}>
        <input type="text" name="name" value={fish.name} placeholder="Fish Name" onChange={(e) => this.handleChange(e, key)} />
        <input type="text" name="price" value={formatPrice(fish.price)} placeholder="Fish Price" onChange={(e) => this.handleChange(e, key)} />
        <select name="status" value={fish.status} onChange={(e) => this.handleChange(e, key)}>
          <option value="available">Fresh</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" name="desc" value={fish.desc} placeholder="Fish Desc" onChange={(e) => this.handleChange(e, key)}></textarea>
        <input type="text" name="image" value={fish.image} placeholder="Fish Image" onChange={(e) => this.handleChange(e, key)} />
        <button onClick={() => this.props.removeFish(key, this.props.fishes[key])}>Remove Fish</button>
      </div>
    )
  }
}

export default EditFishForm

