import React from "react";
import { useProxy } from "valtio";
import { globalValtioState } from "./globalcontext";

const ObjectRow = React.memo(function ObjectRow({ index }) {
  const snapshot = useProxy(globalValtioState.objects[index]);
  const shapeRef = React.useRef();
  React.useEffect(() => {
    if (snapshot.selected === true && shapeRef.current) {
      shapeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  }, [snapshot.selected]);
  return (
    <div
      ref={shapeRef}
      className={
        "objecttable-row" +
        (snapshot.selected ? " objecttable-row--selected" : "")
      }
    >
      <div className="objecttable-row-id" title={snapshot.id}>
        {snapshot.id}
      </div>
      <div>{snapshot.x}</div>
      <div>{snapshot.y}</div>
      <div>{snapshot.width}</div>
      <div>{snapshot.height}</div>
    </div>
  );
});

function ObjectTable({ label, objects }) {
  return (
    <div className="objecttable">
      <div className="objecttable-row objecttable-heading">
        <div>ID</div>
        <div>X</div>
        <div>Y</div>
        <div>width</div>
        <div>height</div>
      </div>
      <div className="objecttable-body">
        {objects.map((object, index) => (
          <ObjectRow key={object.id} index={index} />
        ))}
      </div>
    </div>
  );
}

export function StatusPanel() {
  const snapshot = useProxy(globalValtioState);

  function handleAddShape() {
    globalValtioState.addRandomShape();
  }

  function handleReset() {
    globalValtioState.createRandomObjects(null, true);
  }

  return (
    <div className="statuspanel">
      <ObjectTable {...snapshot} label="Shapes" />
      <div className="statuspanel-buttons">
        <button onClick={handleAddShape}>Add Shape</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
