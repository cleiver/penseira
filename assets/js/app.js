import React from "react";
import ReactDOM from "react-dom";
import BucketContextProvider from "./contexts/BucketContext";
import BucketList from "./components/BucketList";

export default class App extends React.Component {
  render() {
    return (
      <BucketContextProvider>
        <BucketList></BucketList>
      </BucketContextProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
