import * as THREE from 'three';
import { postMat, wireMaterial } from './materials';
export function createFence(
    width: number = 220,
    depth: number = 160
): THREE.Group {

    const g = new THREE.Group();

    const postHeight = 8;
    const postRadius = 0.12;
    const postGeometry = new THREE.CylinderGeometry(
        postRadius,
        postRadius,
        postHeight,
        8
    );
    function createPost(x: number, z: number) {

        const post = new THREE.Mesh(

            postGeometry,

            postMat

        );

        post.position.set(
            x,
            postHeight / 2,
            z
        );

        g.add(post);

    }
    const postsX = 19;
    const postsZ = 14;
    const spacingX = width / postsX;
    const spacingZ = depth / postsZ;

    // Front & Back

    for (let x = -width / 2; x <= width / 2; x += spacingX) {

        createPost(x, -depth / 2);

        createPost(x, depth / 2);

    }

    // Left & Right

    for (let z = -depth / 2; z <= depth / 2; z += spacingZ) {

        createPost(-width / 2, z);

        createPost(width / 2, z);

    }
    function createRail(

        x: number,

        y: number,

        z: number,

        length: number,

        horizontal: boolean

    ) {

        const rail = new THREE.Mesh(

            new THREE.BoxGeometry(

                horizontal ? length : 0.08,

                0.08,

                horizontal ? 0.08 : length

            ),

            postMat

        );

        rail.position.set(

            x,

            y,

            z

        );

        g.add(rail);

    }
    function createWirePanel(

        x: number,
        z: number,
        width: number,
        height: number,
        horizontal: boolean

    ) {

        const panel = new THREE.Group();

        // ==========================
        // Vertical Wires
        // ==========================

        const wireSpacing = 0.5;

        if (horizontal) {

            for (let i = -width / 2; i <= width / 2; i += wireSpacing) {

                const wire = new THREE.Mesh(

                    new THREE.CylinderGeometry(0.015, 0.015, height, 6),

                    wireMaterial

                );

                wire.position.set(i, height / 2, 0);

                panel.add(wire);

            }

            // Horizontal Wires

            for (let y = 0.3; y <= height; y += wireSpacing) {

                const wire = new THREE.Mesh(

                    new THREE.CylinderGeometry(0.015, 0.015, width, 6),

                    wireMaterial

                );

                wire.rotation.z = Math.PI / 2;

                wire.position.set(0, y, 0);

                panel.add(wire);

            }

        } else {

            for (let i = -width / 2; i <= width / 2; i += wireSpacing) {

                const wire = new THREE.Mesh(

                    new THREE.CylinderGeometry(0.015, 0.015, height, 6),

                    wireMaterial

                );

                wire.position.set(0, height / 2, i);

                panel.add(wire);

            }

            for (let y = 0.3; y <= height; y += wireSpacing) {

                const wire = new THREE.Mesh(

                    new THREE.CylinderGeometry(0.015, 0.015, width, 6),

                    wireMaterial

                );

                wire.rotation.x = Math.PI / 2;

                wire.position.set(0, y, 0);

                panel.add(wire);

            }

        }

        panel.position.set(x, 0, z);

        g.add(panel);

    }
    // =======================================
    // FRONT & BACK RAILS
    // =======================================

    for (let i = 0; i < postsX; i++) {

        const x = -width / 2 + spacingX / 2 + i * spacingX;

        createRail(x, 2, -depth / 2, spacingX, true);
        createRail(x, 6, -depth / 2, spacingX, true);

        createRail(x, 2, depth / 2, spacingX, true);
        createRail(x, 6, depth / 2, spacingX, true);
    }
    const gateStart = -10;
    const gateEnd = 10
    for (let i = 0; i < postsZ; i++) {
        const z = -depth / 2 + spacingZ / 2 + i * spacingZ;
        if (!(z > gateStart && z < gateEnd)) {

            createRail(
                -width / 2,
                2,
                z,
                spacingZ,
                false
            );

            createRail(
                -width / 2,
                6,
                z,
                spacingZ,
                false
            );
        }

        // Right fence stays complete

        createRail(width / 2, 2, z, spacingZ, false);

        createRail(
            width / 2,
            6,
            z,
            spacingZ,
            false
        );
    }
    for (let i = 0; i < postsX; i++) {

        const x = -width / 2 + spacingX / 2 + i * spacingX;

        createWirePanel(
            x,
            -depth / 2,
            spacingX,
            6,
            true
        );

        createWirePanel(
            x,
            depth / 2,
            spacingX,
            6,
            true
        );
    }

    for (let i = 0; i < postsZ; i++) {
        const z = -depth / 2 + spacingZ / 2 + i * spacingZ;

        if (!(z > gateStart && z < gateEnd)) {

            createWirePanel(
                -width / 2,
                z,
                spacingZ,
                6,
                false
            );
        }

        createWirePanel(
            width / 2,
            z,
            spacingZ,
            6,
            false
        );
    }
    return g;

}