import * as THREE from 'three';

import {

    conveyorBelt,

    conveyorFrame,

    conveyorRoller

} from './materials';

export function createConveyorSection(

    length:number,

    width:number = 4

):THREE.Group{

    const g = new THREE.Group();

    // ==========================
    // BELT
    // ==========================

    const belt = new THREE.Mesh(

        new THREE.BoxGeometry(

            length,

            0.4,

            width

        ),

        conveyorBelt

    );

    belt.position.y = 1.6;

    g.add(belt);

    // ==========================
    // FRAME
    // ==========================

    const frame = new THREE.Mesh(

        new THREE.BoxGeometry(

            length,

            0.3,

            width+0.6

        ),

        conveyorFrame

    );

    frame.position.y = 1.1;

    g.add(frame);

    // ==========================
    // ROLLERS
    // ==========================

    const spacing = 1;

    // for(

    //     let x = -length/2 + 0.5;

    //     x < length/2;

    //     x += spacing

    // ){

    //     const roller = new THREE.Mesh(

    //         new THREE.CylinderGeometry(

    //             0.15,

    //             0.15,

    //             width,

    //             12

    //         ),

    //         conveyorRoller

    //     );

    //     roller.rotation.z = Math.PI/2;

    //     roller.position.set(

    //         x,

    //         1.8,

    //         0

    //     );

    //     g.add(roller);

    // }

    return g;

}