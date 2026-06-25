import * as THREE from "three";
import { SphereGeometry } from "three";
import registerEntity from "../core/entity";
import { quadSwapX } from "three/src/nodes/TSL.js";

export default class Sphere extends THREE.Mesh {
  constructor(env, physics, size = 1) {
    super(
      new SphereGeometry(size),
      new THREE.MeshStandardMaterial({
        color: 0xff0000,
        wireframe: true,
      }),
    );

    this.position.set(0, 4, 0);

    const RAPIER = physics.RAPIER;

    const q = this.quaternion;

    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(0, 2, 0)
      .setRotation({
        x: q.x,
        y: q.y,
        z: q.z,
        w: q.w,
      })
      .setCanSleep(false);

    this.body = physics.world.createRigidBody(bodyDesc);

    const colliderDesc = RAPIER.ColliderDesc.ball(size)
      .setFriction(1.0)
      .setRestitution(1);

    physics.world.createCollider(colliderDesc, this.body);

    registerEntity(this, env);
  }

  update = () => {
    const pos = this.body.translation();
    const rot = this.body.rotation();

    this.position.set(pos.x, pos.y, pos.z);
    this.quaternion.set(rot.x, rot.y, rot.z, rot.w);
  };
}
