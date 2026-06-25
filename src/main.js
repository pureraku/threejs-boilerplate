import Env from "./core/env.js";
import Physics from "./core/physics.js";
import Cube from "./objects/cube.js";
import Ground from "./objects/ground.js";
import Sphere from "./objects/sphere.js";

(async () => {
  const physics = await Physics.init();
  const env = new Env(physics);

  const ground = new Ground(physics);
  const cube = new Cube(env, physics);
  const sphere = new Sphere(env, physics, 1);

  env.add([ground, cube, sphere]);
})();
