import * as THREE from 'three';

export function createWalkway(length: number = 200,
    width: number = 6,
    x: number = 0,
    z: number = -55
): THREE.Group {

    const g = new THREE.Group();

    // =====================================
    // WALKWAY
    // =====================================

    const walkway = new THREE.Mesh(

        new THREE.PlaneGeometry(length, width),

        new THREE.MeshStandardMaterial({

            color: 0xbdbdbd,

            roughness: 1

        })

    );

    walkway.rotation.x = -Math.PI / 2;

    walkway.position.set(x, 0.31, z);

    walkway.receiveShadow = true;

    g.add(walkway);
    // =====================================
    // LEFT SAFETY BORDER
    // =====================================

    const borderMaterial = new THREE.MeshStandardMaterial({

        color: 0xf4c430,

        roughness: 0.8

    });

    const leftBorder = new THREE.Mesh(

        new THREE.PlaneGeometry(length, 0.25),

        borderMaterial

    );

    leftBorder.rotation.x = -Math.PI / 2;

    leftBorder.position.set(

        x,

        0.315,

        z + width / 2

    );

    g.add(leftBorder);

    // =====================================
    // RIGHT SAFETY BORDER
    // =====================================

    const rightBorder = leftBorder.clone();

    rightBorder.position.z = z - width / 2;

    g.add(rightBorder);
    // =====================================
    // CENTER DASHES
    // =====================================

    const dashMaterial = new THREE.MeshStandardMaterial({

        color: 0xffffff

    });

    for (let x = -105; x <= 105; x += 8) {

        const dash = new THREE.Mesh(

            new THREE.PlaneGeometry(

                3,

                0.18

            ),

            dashMaterial

        );

        dash.rotation.x = -Math.PI / 2;

        dash.position.set(x, 0.316, z);

        g.add(dash);

    }
    // =====================================
    // WALKWAY JOINTS
    // =====================================

    const jointMaterial = new THREE.MeshStandardMaterial({

        color: 0x9a9a9a

    });

    for (let x = -100; x <= 100; x += 20) {

        const joint = new THREE.Mesh(

            new THREE.PlaneGeometry(

                0.15,

                6

            ),

            jointMaterial

        );

        joint.rotation.x = -Math.PI / 2;

        joint.position.set(x, 0.314, z);

        g.add(joint);

    }
    return g;
}