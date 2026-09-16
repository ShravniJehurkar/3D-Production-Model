import * as THREE from 'three';
export function createStack(): THREE.Group {

  const g = new THREE.Group();

  // Floor base
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(22, 1, 18),
    new THREE.MeshPhongMaterial({ color: 0x3a3a3a })
  );
  base.position.y = 0.5;

  // Guide rails
  const railGeo = new THREE.BoxGeometry(0.3, 2, 8);

  const leftRail = new THREE.Mesh(
    railGeo,
    new THREE.MeshPhongMaterial({ color: 0x888888 })
  );
  leftRail.position.set(-10, 2, 0);

  const rightRail = leftRail.clone();
  rightRail.position.set(2, 2, 0);

  // Pallet
  const pallet = new THREE.Mesh(
    new THREE.BoxGeometry(8, 1, 8),
    new THREE.MeshPhongMaterial({ color: 0x8b5a2b })
  );
  pallet.position.set(6, 1.5, 0);

  // Stack of boxes
  for (let y = 0; y < 4; y++) {
    for (let x = -1; x <= 1; x++) {
      for (let z = -1; z <= 1; z++) {

        const box = new THREE.Mesh(
          new THREE.BoxGeometry(1.6, 1.6, 1.6),
          new THREE.MeshPhongMaterial({ color: 0xcccccc })
        );

        box.position.set(
          6 + x * 2,
          2.5 + y * 1.6,
          z * 2
        );

        box.castShadow = true;
        box.receiveShadow = true;

        g.add(box);
      }
    }
  }
  g.add(
    base,
    leftRail,
    rightRail,
    pallet,
  );
 
  return g;
}