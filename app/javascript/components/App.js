import React, { Component } from 'react'
import axios from 'axios'
import { passCsrfToken } from '../utils/helpers'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../utils/sampleFishes'
import Fish from './Fish'

class App extends Component {
  state = {
    fishes: {},
    order: {},
    storeId: {},
  }

  async componentDidMount(){
    const localStorageRef = localStorage.getItem(`order-${this.props.match.params.storeId}`)
    console.log(localStorageRef)
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      })
    }

    passCsrfToken(document, axios)

    await axios.get('/v1/stores.json')
      .then((response) => {
        const store = response.data.filter(store => store.name === this.props.match.params.storeId)
        const storeId = store[0].id
        console.log(store)
        console.log(storeId)
        this.setState({ storeId })
      })
    await axios.get('/v1/fishes.json')
      .then((response) => {
        console.log(response)
        const fishes = { ...response.data.filter(fish => fish.store_id === this.state.storeId) }
        console.log(fishes)
        this.setState({ fishes })
      })


    // async function fetchFish() {
    //   const res = await fetch(`/v1/fishes`)
    //   const fishes = await res.json()
    //   console.log(fishes)
    //   // return fishes
    // }
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.match.params.storeId}`, JSON.stringify(nextState.order))
  }

  addFish = fish => {
    axios.post('/v1/fishes', {fish})
      .then(response => {
        console.log(response)
        console.log(response.data)
        const addedFish = response.data
        const fishes = { ...this.state.fishes, addedFish }
        this.setState({ fishes })
      })
  }

  updateFish = (key, updatedFish) => {
    console.log(key, updatedFish)
    const fishes = { ...this.state.fishes }
    fishes[key] = updatedFish;
    this.setState({ fishes })
    axios.put(`/v1/fishes/${updatedFish.id}`, updatedFish)
    .then(response => {
      console.log(response)
    })
  }

  removeFish = (key, removedFish) => {
    console.log(key)
    console.log(removedFish)
    axios.delete(`/v1/fishes/${removedFish.id}`)
      .then(response =>{
        console.log(response)
        const fishes = { ...this.state.fishes }
        delete fishes[key];
        this.setState({ fishes })
      })
  }

  loadSamples = () => {
    console.log(sampleFishes)
    const fishes = {...this.state.fishes, ...sampleFishes}
    this.setState({ fishes })
  }

  addToOrder = (fish) => {
    console.log(fish.id)
    const order = { ...this.state.order };
    order[fish.id] = order[fish.id] + 1 || 1;
    this.setState({ order })
  }

  removeFromOrder = (fish) => {
    const order = {...this.state.order}
    delete order[fish.id]
    this.setState({ order })
  }

  changeOrderQty = (fish, increment) => {
    const order = { ...this.state.order }
    if (increment) {
      order[fish.id]++
    } else {
      order[fish.id]--
      if (order[fish.id] === 0) {
        console.log(order[fish.id])
        delete order[fish.id]
      }
    }
    this.setState({ order })
  }

  checkout = () => {
    const order = Object.entries(this.state.order)
    const fishes = Object.values(this.state.fishes)
    const runningOrder = []
    order.forEach(item => {
      const [ orderId, orderQty ] = item
      const availableFish = fishes.find(fish => fish.id === Number(orderId) && fish.status === 'available')
      if (!availableFish) { return; }
      const { id, name, price } = availableFish
      const totalPrice = orderQty * Number(price)
      runningOrder.push({ id, name, price, orderQty, totalPrice })
    })
    const orderTotal = runningOrder.reduce((prevTotal, item) => {
      return prevTotal + item.totalPrice
    }, 0)
    console.log(runningOrder)
    console.log(orderTotal)
  }
  
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="list-of-fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key} 
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          params={this.state.params}
          removeFromOrder={this.removeFromOrder}
          changeOrderQty={this.changeOrderQty}
          checkout={this.checkout}
        />
        <Inventory 
          addFish={this.addFish}
          removeFish={this.removeFish}
          updateFish={this.updateFish}
          loadSamples={this.loadSamples}
          fishes={this.state.fishes}
          storeId={this.state.storeId}
        />
      </div>

    )
  }
}

export default App
