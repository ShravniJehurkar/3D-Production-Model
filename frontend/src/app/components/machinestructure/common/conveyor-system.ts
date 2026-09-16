import * as THREE from 'three';

import {
    conveyorBelt,
    conveyorFrame,
    conveyorRoller
} from './materials';
import { FACTORY_CONFIG } from '../../../config/factory-config';
export function createConveyorSegment(
    length: number,
    width: number = 4
): THREE.Group {

    const g = new THREE.Group();

    //----------------------------------
    // Belt
    //----------------------------------

    const belt = new THREE.Mesh(

        new THREE.BoxGeometry(
            length,
            0.25,
            width
        ),

        conveyorBelt

    );

    belt.position.y = FACTORY_CONFIG.CONVEYOR_HEIGHT;

    g.add(belt);

    //----------------------------------
    // Side Frames
    //----------------------------------

    const frameGeo = new THREE.BoxGeometry(
        length,
        0.35,
        0.25
    );

    const left = new THREE.Mesh(
        frameGeo,
        conveyorFrame
    );

    left.position.set(
        0,
        FACTORY_CONFIG.CONVEYOR_HEIGHT-0.20,
        width / 2
    );

    g.add(left);

    const right = left.clone();

    right.position.z = -width / 2;

    g.add(right);

    //----------------------------------
    // Legs
    //----------------------------------

    const legGeo = new THREE.BoxGeometry(
        0.2,
        1.3,
        0.2
    );

    for (
        let x = -length/2+2;
        x <= length/2-2;
        x += 6
    ){

        const l1 = new THREE.Mesh(
            legGeo,
            conveyorFrame
        );

        l1.position.set(
            x,
            FACTORY_CONFIG.CONVEYOR_HEIGHT/2-0.1,
            width/2-0.2
        );

        g.add(l1);

        const l2 = l1.clone();

        l2.position.z = -width/2+0.2;

        g.add(l2);

    }

    //----------------------------------
    // Rollers
    //----------------------------------

    for(
        let x=-length/2+0.5;
        x<length/2-0.5;
        x+=1
    ){

        const roller = new THREE.Mesh(

            new THREE.CylinderGeometry(
                0.08,
                0.08,
                width-0.2,
                10
            ),

            conveyorRoller

        );

        roller.rotation.z=Math.PI/2;

        roller.position.set(
            x,
            FACTORY_CONFIG.CONVEYOR_HEIGHT+0.13,
            0
        );

        g.add(roller);

    }

    return g;

}
