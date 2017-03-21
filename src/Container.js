import React, { Component } from 'react'
import ImageSquare from './ImageSquare'
import UploadSquare from './UploadSquare'

export default class Container extends Component {
  constructor () {
    super()
    this.state = {
      imgArray: []
    }
  }

  render () {
    return (
      <div>
        {
          this.state.imgArray.map((img, index) => {
            return <ImageSquare/>
          })
        }
        <UploadSquare/>
      </div>
    )
  }
}