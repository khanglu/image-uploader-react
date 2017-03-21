import React, { Component } from 'react'
import getDataTransferItems from './getDataTransferItems'

export default class UploadSquare extends Component {
  constructor(props, context) {
    super(props, context)
    // Bind methods
    this.onClick = this.onClick.bind(this)
    this.open = this.open.bind(this)
    this.fileMatchSize = this.fileMatchSize.bind(this)

    this.isFileDialogActive = false
    this.state = {
      isDragActive: false,
      acceptedFiles: [],
      rejectedFiles: []
    }
  }

  onClick(e) {
    const { onClick, disableClick } = this.props
    if (!disableClick) {
      e.stopPropagation()
      this.open()
      if (onClick) {
        onClick.call(this, e)
      }
    }
  }

  onDrop(e) {
    const { onDrop, onDropAccepted, onDropRejected } = this.props
    // multiple = true
    const fileList = getDataTransferItems(e, true)
    const acceptedFiles = []
    const rejectedFiles = []

    // Stop default browser behavior
    e.preventDefault()

    // Reset the counter along with the drag on a drop.
    this.dragTargets = []
    this.isFileDialogActive = false

    fileList.forEach((file) => {
      if (this.fileAccepted(file) && this.fileMatchSize(file)) {
        acceptedFiles.push(file)
      } else {
        rejectedFiles.push(file)
      }
    });

    if (onDrop) {
      onDrop.call(this, acceptedFiles, rejectedFiles, e);
    }

    if (rejectedFiles.length > 0 && onDropRejected) {
      onDropRejected.call(this, rejectedFiles, e);
    }

    if (acceptedFiles.length > 0 && onDropAccepted) {
      onDropAccepted.call(this, acceptedFiles, e);
    }

    // Reset drag state
    this.setState({
      isDragActive: false,
      isDragReject: false,
      acceptedFiles,
      rejectedFiles
    });
  }


  fileAccepted(file) {
    // Firefox versions prior to 53 return a bogus MIME type for every file drag, so dragovers with
    // that MIME type will always be accepted
    return file.type === 'application/x-moz-file' || accepts(file, this.props.accept);
  }

  fileMatchSize(file) {
    return file.size <= this.props.maxSize && file.size >= this.props.minSize;
  }

  open() {
    this.isFileDialogActive = true
    this.fileInputEl.value = null
    this.fileInputEl.click()
  }

  render() {
    const inputAttributes = {
      accept: 'image/*',
      type: 'file',
      style: { display: 'none' },
      multiple: true,
      ref: el => this.fileInputEl = el
    }
    return (
      <div
        onClick={this.onClick}
        style={squareStyle.default}
      >
        <input
          {...inputAttributes}
        />
      </div>
    )
  }
}

const squareStyle = {
  default: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#666',
    borderStyle: 'dashed',
    borderRadius: 5
  }
}