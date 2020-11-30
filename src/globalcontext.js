import { proxy } from "valtio";
import random from "random";
import seedrandom from "seedrandom";
import { v4 as uuidv4 } from "uuid";

class ShapeModel {
  maxDimension = 200;
  objects = [];
  seed = "1";
  defaultObjects = 10;

  constructor(opts) {
    this.seed = opts?.seed ?? this.seed;
    this.defaultObjects = opts?.defaultObjects ?? this.defaultObjects;
    random.use(seedrandom("" + this.seed));
  }

  setDimensions(maxX, maxY) {
    this.maxX = maxX;
    this.maxY = maxY;
  }

  createRandomObjects(count, reset) {
    if (reset) {
      random.use(seedrandom("" + this.seed));
    }
    const objectCount = count ?? this.defaultObjects;
    this.objects = [];
    for (let counter = 0; counter < objectCount; counter++) {
      this.addRandomShape();
    }
  }

  addRandomShape() {
    this.addShape(
      random.int(1, this.maxX),
      random.int(1, this.maxY),
      random.int(10, this.maxDimension),
      random.int(this.maxDimension)
    );
  }

  addShape(x, y, width, height) {
    const id = uuidv4();
    const shape = { id, x, y, width, height };
    this.objects.push(shape);
  }
}

export const globalValtioState = proxy(new ShapeModel());
