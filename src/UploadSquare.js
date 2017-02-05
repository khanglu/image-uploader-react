import React from 'react'

export default class UploadSquare extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  open() {
    this.isFileDialogActive = true;
    this.fileInputEl.value = null;
    this.fileInputEl.click();
  }

  onClick(e) {
    e.stopPropagation();
    this.open();
  }


  render() {
    const inputAttributes = {
      accept: 'image/*',
      style: { display: 'none' },
      type: 'file',
      multiple: true
    }

    return (
      <div
        onClick={this.onClick}
        onDragStart={this.onDragStart}
        onDragEnter={this.onDragEnter}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
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