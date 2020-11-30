import React, { useEffect } from "react";
import { useProxy } from "valtio";

import { globalValtioState } from "./globalcontext";

const Shape = React.memo(function Shape({ id, index }) {
  const snapshot = useProxy(globalValtioState.objects[index]);
  const style = {
    top: snapshot.y,
    left: snapshot.x,
    width: snapshot.width,
    height: snapshot.height
  };
  return <div index={index} className="shape" style={style}></div>;
});

export function ObjectPanel() {
  const objectSnapshot = useProxy(globalValtioState);
  const targetRef = React.useRef();
  const panelRef = React.useRef();

  function resetObject() {
    if (targetRef.current) {
      const obj = globalValtioState.objects[targetRef.current.index];
      obj.selected = false;
      targetRef.current.el.classList.remove("shape--selected");
      targetRef.current = null;
    }
  }

  function moveObject(index, x = 0, y = 0) {
    const obj = globalValtioState.objects[index];
    obj.selected = true;
    obj.x += x;
    obj.y += y;
    return false;
  }

  function handleMouseDown(e) {
    e.preventDefault();
    if (e.target.hasAttribute("index")) {
      resetObject();
      const index = parseInt(e.target.getAttribute("index"), 10);
      targetRef.current = {
        index,
        el: e.target
      };
      e.target.classList.add("shape--selected");
      moveObject(targetRef.current.index);
    }
  }

  function handleMouseMove(e) {
    e.preventDefault();
    if (targetRef.current) {
      return moveObject(targetRef.current.index, e.movementX, e.movementY);
    }
  }

  function handleMouseUp(e) {
    e.preventDefault();
    if (targetRef.current) {
      moveObject(targetRef.current.index, e.movementX, e.movementY);
      resetObject();
    }
  }

  useEffect(() => {
    const { clientWidth, clientHeight } = panelRef.current;
    globalValtioState.setDimensions(clientWidth - 20, clientHeight - 20);
    globalValtioState.createRandomObjects();
  }, []);

  return (
    <div
      ref={panelRef}
      className="objectpanel"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {objectSnapshot.objects.map((obj, index) => (
        <Shape key={obj.id} index={index} />
      ))}
    </div>
  );
}
