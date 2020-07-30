import React, { createContext } from "react";

export const BucketContext = createContext();

export default class BucketContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bucket: [
        {name: 'meia', url: 'site'},
        {name: 'meia', url: 'site'},
        {name: 'meia', url: 'site'},
        {name: 'meia', url: 'site'},
        {name: 'meia', url: 'site'},
        {name: 'meia', url: 'site'},
        {name: 'meia', url: 'site'},
      ],
    };
  }

  createItem() {}
  fetchItem() {}
  updateItem() {}
  deleteItem() {}

  render() {
    return (
      <BucketContext.Provider
        value={{
          ...this.state,
          createItem: this.createItem.bind(this),
          updateItem: this.updateItem.bind(this),
          deleteItem: this.deleteItem.bind(this),
        }}
      >
        {this.props.children}
      </BucketContext.Provider>
    );
  }
}
