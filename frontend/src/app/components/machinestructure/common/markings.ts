import * as THREE from 'three';
import { MACHINE_CONFIG } from '../../../config/machine-config';
export function createRectangleMarking(

    length: number,

    width: number,

    color: number = 0xf4c430

): THREE.Group {

    const g = new THREE.Group();

    const material = new THREE.MeshStandardMaterial({

        color,

        roughness:1

    });

    const thickness = 0.12;

    // Top

    const top = new THREE.Mesh(

        new THREE.PlaneGeometry(length, thickness),

        material

    );

    top.rotation.x = -Math.PI/2;

    top.position.z = width/2;

    top.position.y = 0.002;

    g.add(top);

    // Bottom

    const bottom = top.clone();

    bottom.position.z = -width/2;

    g.add(bottom);

    // Left

    const left = new THREE.Mesh(

        new THREE.PlaneGeometry(thickness,width),

        material

    );

    left.rotation.x = -Math.PI/2;

    left.position.x = -length/2;

    left.position.y = 0.002;

    g.add(left);

    // Right

    const right = left.clone();

    right.position.x = length/2;

    g.add(right);

    return g;
    
}
// =======================================
// PALLET ZONE
// =======================================

export function createPalletZone():THREE.Group{

    return createRectangleMarking(

        14,

        14,

        0xffffff

    );

}