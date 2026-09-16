import * as THREE from 'three';
import { steel, darkSteel } from './materials';

export interface MachineFrameOptions {

    length: number;

    width: number;

    height: number;

    glassFront?: boolean;

    glassBack?: boolean;

    glassSides?: boolean;

}
import { createGlassPanel } from './glass';

export function createMachineFrame(
    options: MachineFrameOptions
): THREE.Group {

    const g = new THREE.Group();

    const {

        length,

        width,

        height,

        glassFront = true,

        glassBack = false,

        glassSides = true

    } = options;

    const floor = new THREE.Mesh(

        new THREE.BoxGeometry(
            length,
            0.4,
            width
        ),

        steel

    );

    floor.position.y = 0.2;

    g.add(floor);

    // Roof
    const roof = new THREE.Mesh(

        new THREE.BoxGeometry(
            length,
            0.4,
            width
        ),

        darkSteel

    );

    roof.position.y = height;

    g.add(roof);

    // Left wall
    const leftWall = new THREE.Mesh(

        new THREE.BoxGeometry(
            0.4,
            height,
            width
        ),

        steel

    );

    leftWall.position.set(
        -length / 2,
        height / 2,
        0
    );

    g.add(leftWall);

    // Right wall
    const rightWall = leftWall.clone();

    rightWall.position.x = length / 2;

    g.add(rightWall);

    // Rear wall
    const rearWall = new THREE.Mesh(

        new THREE.BoxGeometry(
            length,
            height,
            0.4
        ),

        steel

    );

    rearWall.position.set(
        0,
        height / 2,
        -width / 2
    );

    g.add(rearWall);
    if (glassFront) {

        const leftDoor = createGlassPanel(
            length / 2 - 0.3,
            height - 0.4
        );

        leftDoor.position.set(
            -length / 4,
            height / 2,
            width / 2 + 0.12
        );

        g.add(leftDoor);

        const rightDoor = leftDoor.clone();

        rightDoor.position.x = length / 4;

        g.add(rightDoor);

    }
    if (glassSides) {

        const sideGlass = createGlassPanel(
            width - 1,
            height - 0.4
        );

        sideGlass.rotation.y = Math.PI / 2;

        sideGlass.position.set(
            -length / 2 - 0.12,
            height / 2,
            0
        );

        g.add(sideGlass);

        const sideGlass2 = sideGlass.clone();

        sideGlass2.position.x = length / 2 + 0.12;

        g.add(sideGlass2);

    }
    return g;

}