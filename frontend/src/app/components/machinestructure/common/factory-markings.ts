import * as THREE from 'three';

const yellow = new THREE.MeshStandardMaterial({
    color: 0xffd400
});

const walkwayMat = new THREE.MeshStandardMaterial({
    color: 0xcfcfcf,
    roughness: 1
});

export function createHorizontalWalkway(
    length: number,
    width: number = 10
): THREE.Group {

    const g = new THREE.Group();

    // ===============================
    // Walkway Floor
    // ===============================

    const floor = new THREE.Mesh(

        new THREE.PlaneGeometry(length, width),

        walkwayMat

    );

    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0.27;

    g.add(floor);

    // ===============================
    // Left Yellow Border
    // ===============================

    const left = new THREE.Mesh(

        new THREE.BoxGeometry(length, 0.03, 0.45),

        yellow

    );

    left.position.set(
        0,
        0.29,
        width / 2
    );

    g.add(left);

    // ===============================
    // Right Yellow Border
    // ===============================

    const right = left.clone();

    right.position.z = -width / 2;

    g.add(right);

    // ===============================
    // Centre Dashed Line
    // ===============================

    const white = new THREE.MeshStandardMaterial({
        color: 0xffffff
    });

    for (let i = -length / 2 + 3; i < length / 2; i += 8) {

        const dash = new THREE.Mesh(

            new THREE.BoxGeometry(3, 0.02, 0.18),

            white

        );

        dash.position.set(
            i,
            0.291,
            0
        );

        g.add(dash);

    }

    return g;
}
export function createVerticalWalkway(
    length: number,
    width: number = 10
): THREE.Group {

    const g = createHorizontalWalkway(
        length,
        width
    );

    g.rotation.y = Math.PI / 2;

    return g;

}
export function createTJunction(
    size: number = 10
): THREE.Group {

    const g = new THREE.Group();

    const h = createHorizontalWalkway(size, size);

    g.add(h);

    const v = createVerticalWalkway(size, size);

    v.position.z = size / 2;

    g.add(v);

    return g;

}