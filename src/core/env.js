import * as THREE from "three";
import Animate from "./animate.js";

// dev tools
import Controls from "./controls.js";
import { SceneLights, SceneHelpers } from "./sceneSetup.js";
import RapierDebug from "./rapierDebug.js";

export default class Env {
  constructor(physics) {
    this.physics = physics;
    this.animate = new Animate();
    this.clock = new THREE.Clock();

    this.init();
    window.addEventListener("resize", this.onWindowResize);
  }

  add(items) {
    for (const item of items) {
      this.scene.add(item);
    }
  }

  init() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10000,
    );
    this.camera.position.set(0, 2, 3);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.setAnimationLoop(this.loop);

    document.querySelector(".screen").appendChild(this.renderer.domElement);

    this.lights = new SceneLights(this.scene);
    this.helpers = new SceneHelpers(this.scene);

    this.controls = new Controls(this.camera, this.renderer.domElement);
    // this.rapierDebug = new RapierDebug(this.scene, this.physics);
  }

  loop = () => {
    const delta = this.clock.getDelta();

    this.animate.update(delta);
    this.physics.step();

    this.controls?.update();
    this.rapierDebug?.update();

    this.renderer.render(this.scene, this.camera);
  };

  onWindowResize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };
}
