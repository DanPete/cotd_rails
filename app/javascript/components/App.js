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
  
  componentWillMount(){
    
  }

  async componentDidMount(){
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
        const fishes = response.data.filter(fish => fish.store_id === this.state.storeId)
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

  addFish = fish => {
    console.log(fish)
    // const fishObject = fish[`fish-${Date.now()}`] { fish }
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

  addToOrder = (key) => {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;
    this.setState({ order })
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
        <Order/>
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
