import * as THREE from 'three';

import { safetyGlass } from './materials';

export function createGlassPanel(

    width: number,

    height: number

): THREE.Mesh {

    return new THREE.Mesh(

        new THREE.BoxGeometry(

            width,

            height,

            0.12

        ),

        safetyGlass

    );

}