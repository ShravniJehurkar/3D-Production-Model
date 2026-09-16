import * as THREE from 'three';

import {
    createHorizontalWalkway,
    createVerticalWalkway
} from './factory-markings';

export function createFactoryFloorLayout(): THREE.Group {

    const g = new THREE.Group();

    // ==========================
    // LEFT AISLE
    // ==========================

    // const left = createVerticalWalkway(95, 12);

    // left.position.set(
    //     -58,
    //     0,
    //     0
    // );

    // g.add(left);

    // ==========================
    // RIGHT AISLE
    // ==========================

    const right = createVerticalWalkway(50, 12);

    right.position.set(
        68,
        0,
        0
    );

    g.add(right);

    // ==========================
    // TOP AISLE
    // ==========================

    const top = createHorizontalWalkway(170, 12);

    top.position.set(
        -12,
        0,
        -22
    );

    g.add(top);

    // ==========================
    // BOTTOM AISLE
    // ==========================

    const bottom = createHorizontalWalkway(170, 12);

    bottom.position.set(
        -12,
        0,
        19
    );

    g.add(bottom);

    return g;
}