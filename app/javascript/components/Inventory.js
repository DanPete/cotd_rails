import React, { Component } from 'react'

import AddFishForm from './AddFishForm'
import EditFishForm from './EditFishForm'

class Inventory extends Component {
  render() {
    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm 
            key={key}
            index={key}
            fishes={this.props.fishes}
            addFish={this.props.addFish}
            updateFish={this.props.updateFish}
            removeFish={this.props.removeFish}
          />
        ))}
        <AddFishForm 
          addFish={this.props.addFish}
          storeId={this.props.storeId}
        />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
}

export default Inventory
