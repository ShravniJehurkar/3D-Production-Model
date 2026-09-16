import * as THREE from 'three';

import {

    darkSteel

} from './materials';

export function createFactoryStructure(): THREE.Group {

    const g = new THREE.Group();

    const columnHeight = 30;

    const spacingX = 40;

    const spacingZ = 30;

    // ===========================
    // COLUMNS
    // ===========================

    for (let x = -100; x <= 100; x += spacingX) {

        for (let z = -70; z <= 70; z += spacingZ) {

            const column = new THREE.Mesh(

                new THREE.BoxGeometry(

                    2,

                    columnHeight,

                    2

                ),

                darkSteel

            );

            column.position.set(

                x,

                columnHeight / 2,

                z

            );

            column.castShadow = true;

            column.receiveShadow = true;

            g.add(column);

        }

    // }aaaa
    // // ===========================================
    // // ROOF BEAMS (X Direction)
    // // ===========================================

    // for (let z = -70; z <= 70; z += spacingZ) {

    //     const beam = new THREE.Mesh(

    //         new THREE.BoxGeometry(
    //             200,
    //             0.8,
    //             1
    //         ),

    //         darkSteel

    //     );

    //     beam.position.set(
    //         0,
    //         columnHeight,
    //         z
    //     );

    //     beam.castShadow = true;

    //     g.add(beam);

    // }

    // // ===========================================
    // // ROOF BEAMS (Z Direction)
    // // ===========================================

    // for (let x = -100; x <= 100; x += spacingX) {

    //     const beam = new THREE.Mesh(

    //         new THREE.BoxGeometry(
    //             1,
    //             0.8,
    //             140
    //         ),

    //         darkSteel

    //     );

    //     beam.position.set(
    //         x,
    //         columnHeight,
    //         0
    //     );

    //     beam.castShadow = true;

    //     g.add(beam);

    }
    // ===========================================
    // CEILING
    // ===========================================

    const ceiling = new THREE.Mesh(

        new THREE.BoxGeometry(

            205,

            0.4,

            145

        ),

        new THREE.MeshStandardMaterial({

            color: 0xf0f0f0,

            roughness: 0.9

        })

    );

    ceiling.position.y = columnHeight + 0.5;

    ceiling.receiveShadow = true;

    g.add(ceiling);
    // ===========================================
    // DIAGONAL BRACING
    // ===========================================

    for (let x = -80; x <= 80; x += 40) {

        const brace = new THREE.Mesh(

            new THREE.BoxGeometry(

                1,

                0.3,

                18

            ),

            darkSteel

        );

        brace.position.set(
            x,
            columnHeight - 2,
            0
        );

        brace.rotation.x = Math.PI / 4;

        g.add(brace);

    }
    return g;

}