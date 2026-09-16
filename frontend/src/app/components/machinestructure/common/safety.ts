import * as THREE from 'three';

export function createSafetyMarkings(): THREE.Group {

    const g = new THREE.Group();

    // =====================================
    // MATERIALS
    // =====================================

    const yellow = new THREE.MeshStandardMaterial({

        color: 0xf4c430,

        roughness: 1

    });

    const red = new THREE.MeshStandardMaterial({

        color: 0xd32f2f,

        roughness: 1

    });

    // =====================================
    // MACHINE SAFETY BOX
    // =====================================

    const machineBox = new THREE.Mesh(

        new THREE.RingGeometry(

            6,

            6.25,

            4

        ),

        yellow

    );

    machineBox.rotation.x = -Math.PI / 2;

    machineBox.position.y = 0.28;

    g.add(machineBox);

    // =====================================
    // ROBOT DANGER ZONE
    // =====================================

    const robotZone = new THREE.Mesh(

        new THREE.CircleGeometry(

            4,

            40

        ),

        red

    );

    robotZone.rotation.x = -Math.PI / 2;

    robotZone.position.set(

        12,

        0.281,

        0

    );

    g.add(robotZone);

    return g;

}