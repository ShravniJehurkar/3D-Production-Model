import * as THREE from 'three';

const yellow = new THREE.MeshStandardMaterial({
    color: 0xf4c430
});

const grey = new THREE.MeshStandardMaterial({
    color: 0xbdbdbd
});

export function createWalkwaySegment(
    width:number,
    length:number
){

    const g=new THREE.Group();

    const left=new THREE.Mesh(

        new THREE.BoxGeometry(length,0.03,0.15),

        yellow

    );

    left.position.set(
        0,
        0.28,
        width/2
    );

    g.add(left);

    const right=left.clone();

    right.position.z=-width/2;

    g.add(right);

    return g;

}