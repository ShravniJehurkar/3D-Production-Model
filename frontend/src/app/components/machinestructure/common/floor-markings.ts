import * as THREE from 'three';

const yellow = new THREE.MeshBasicMaterial({
    color: 0xffd200
});
// export function createSafetyLine(
//     width: number,
//     length: number
// ): THREE.Group {

    // const g = new THREE.Group();

    // const t = 0.15;

    // const top = new THREE.Mesh(

    //     new THREE.BoxGeometry(
    //         width,
    //         0.02,
    //         t
    //     ),

    //     yellow

    // );

    // top.position.z = length / 2;

    // g.add(top);

    // const bottom = top.clone();

    // bottom.position.z = -length / 2;

    // g.add(bottom);

    // const left = new THREE.Mesh(

    //     new THREE.BoxGeometry(
    //         t,
    //         0.02,
    //         length
    //     ),

    //     yellow

    // );

    // left.position.x = -width / 2;

    // g.add(left);

    // const right = left.clone();

    // right.position.x = width / 2;

    // g.add(right);

    // return g;

// }