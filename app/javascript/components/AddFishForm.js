import React, { Component, createRef } from 'react'


class AddFishForm extends Component {

  nameRef = createRef();
  priceRef = createRef();
  statusRef = createRef();
  descRef = createRef();
  imageRef = createRef();

  createFish = e => {
    e.preventDefault()
    console.log('Gonna add a fish')

    const formatMoney = (num) => {
      const [dollars, cents] = num.split('.')
      return cents ? parseInt(dollars + cents, 10) : parseInt(dollars, 10) * 100
    }

    const fish = {
      store_id: this.props.storeId,
      name: this.nameRef.current.value,
      price: formatMoney(this.priceRef.current.value),
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value,
    }
    this.props.addFish(fish)
    e.currentTarget.reset()
  }

  render() {
    return (
      <form className="fish-edit" onSubmit={(e) => this.createFish(e)}>
        <input ref={this.nameRef} type="text" placeholder="Fish Name"/>
        <input ref={this.priceRef} type="text" placeholder="Fish Price"/>
        <select ref={this.statusRef}>
          <option value="available">Fresh</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea ref={this.descRef} type="text" placeholder="Fish Desc"></textarea>
        <input ref={this.imageRef} type="text" placeholder="Fish Image"/>
        <button type="submit">+ Add Item</button>
      </form>
    )
  }
}

export default AddFishForm

