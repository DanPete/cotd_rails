import React, { Component } from "react";
import axios from 'axios'

import { getFunName } from '../../helpers/helper.js'
import { passCsrfToken } from '../utils/helpers'


class StorePicker extends Component {
  componentDidMount() {
    passCsrfToken(document, axios)
  }

  myInput = React.createRef()

  goToStore(e) {
    e.preventDefault()
    const storeId = this.myInput.current.value
    console.log(`Going to ${storeId}`)
    this.props.history.push(`/store/${storeId}`)
    axios.post('/v1/stores', { store: {name: storeId} })
      .then(response => {
        console.log(response)
        console.log(response.data)
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
        <h2>Please Enter a Store</h2>
        <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={this.myInput} />
        <button type="submit">Visit Store</button>
      </form>
    )
  }
}


export default StorePicker; 