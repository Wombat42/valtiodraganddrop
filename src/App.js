import React from "react";
import "./styles.css";
import { ObjectPanel } from "./objectpanel";
import { StatusPanel } from "./statuspanel";

export default function App() {
  return (
    <div className="App">
      <h1>Valtio Example: Drag-and-Drop </h1>
      <p>
        Click and hold on a rectanlge on the left to move it around. The right
        hand side will hightlight the item you are moving and update with its
        new location. You can add new rectanlges and reset it back to the
        original state when you are done.
      </p>
      <p>
        This was implemented using valtio. The globalcontext.js file has all the
        state information and creates the proxy object that the rest of the code
        shares. The objectpanel.js and statuspanel.js call the valtio.useProxy
        method to listen for changes. Updating the global valtio object causes
        any listening React objects to update. Selecting and moving a rectangle
        will causes one of these updates.
      </p>
      <div className="main">
        <ObjectPanel />
        <StatusPanel />
      </div>
    </div>
  );
}
