import * as THREE from 'three';
import { createIndustrialRobot } from './common/industrialrobo';
import { steel, wood, darkSteel, meshMat, postMat, lightSteel } from './common/materials';
export function createDepalletizer(): THREE.Group {
    const g = new THREE.Group();

    // ======================================
    // MAIN FLOOR BASE
    // ======================================

    const base = new THREE.Mesh(
        new THREE.BoxGeometry(42, 1, 26),
        lightSteel
    );

    base.position.y = 0.5;

    g.add(base);

    // ======================================
    // ROBOT PEDESTAL
    // ======================================

    const pedestal = new THREE.Mesh(

        new THREE.BoxGeometry(6, 10, 6),

        darkSteel

    );

    pedestal.position.set(10, 5, 0);

    g.add(pedestal);


    // Top Plate

    const topPlate = new THREE.Mesh(

        new THREE.BoxGeometry(6.5, 0.5, 6.5),

        steel

    );

    topPlate.position.set(10, 10.25, 0);

    g.add(topPlate);

    const robot = createIndustrialRobot();

    robot.position.set(10, 10.5, 0);

    g.add(robot);
    // ======================================
    // PALLET
    // ======================================

    const pallet = new THREE.Mesh(

        new THREE.BoxGeometry(8, 0.8, 8),

        wood

    );

    pallet.position.set(-9, 2.5, 0);

    g.add(pallet);


    // Bottom Slats

    for (let z = -2.8; z <= 2.8; z += 2.8) {

        const slat = new THREE.Mesh(

            new THREE.BoxGeometry(8, 0.25, 0.45),

            darkSteel

        );

        slat.position.set(-9, 2.15, z);

        g.add(slat);

    }
    // ======================================
    // PRODUCT STACK
    // ======================================

    for (let y = 0; y < 5; y++) {

        for (let x = -2; x <= 2; x++) {

            for (let z = -2; z <= 2; z++) {

                const bottle = new THREE.Group();

                const body = new THREE.Mesh(

                    new THREE.CylinderGeometry(0.28, 0.34, 1.8, 16),

                    new THREE.MeshPhysicalMaterial({

                        color: 0xd9d9d9,

                        transparent: true,

                        transmission: 0.8

                    })

                );

                body.position.y = 0.9;

                bottle.add(body);

                const cap = new THREE.Mesh(

                    new THREE.CylinderGeometry(0.16, 0.16, 0.18, 16),

                    new THREE.MeshStandardMaterial({

                        color: 0x3399ff

                    })

                );

                cap.position.y = 1.95;

                bottle.add(cap);

                bottle.position.set(

                    -9 + x * 1.2,

                    3.4 + y * 2,

                    z * 1.2

                );

                g.add(bottle);

            }

        }

    }
    // ======================================
    // SAFETY FENCE POSTS
    // ======================================
    const fencePosts = [
        [-20, -8], [-12, -8], [-4, -8], [4, -8], [12, -8], [20, -8],
        [-20, 8], [-12, 8], [-4, 8], [4, 8], [12, 8], [20, 8],
        [-20, -8], [-20, 0], [-20, 8],
        [20, -8], [20, 0], [20, 8]
    ];

    fencePosts.forEach(p => {

        const post = new THREE.Mesh(

            new THREE.BoxGeometry(0.35, 8, 0.35),

            postMat

        );

        post.position.set(

            p[0],

            4,

            p[1]

        );

        g.add(post);

    });


    // ======================================
    // FENCE PANELS
    // ======================================

    const panel1 = new THREE.Mesh(

        new THREE.PlaneGeometry(8, 7),

        meshMat

    );

    panel1.position.set(-16, 4, -8);

    g.add(panel1);

    const panel2 = panel1.clone();
    panel2.position.set(-8, 4, -8);

    g.add(panel2);

    const panel3 = panel1.clone();
    panel3.position.set(0, 4, -8);

    g.add(panel3);

    const panel4 = panel1.clone();
    panel4.position.set(8, 4, -8);

    g.add(panel4);

    const panel5 = panel1.clone();
    panel5.position.set(16, 4, -8);

    g.add(panel5);


    // ======================================
    // FRONT PANELS
    // ======================================

    const front1 = panel1.clone();

    front1.rotation.y = Math.PI;

    front1.position.set(-16, 4, 8);

    g.add(front1);

    const front2 = front1.clone();
    front2.position.set(-8, 4, 8);

    g.add(front2);

    const front3 = front1.clone();
    front3.position.set(8, 4, 8);

    g.add(front3);

    const front4 = front1.clone();
    front4.position.set(16, 4, 8);

    g.add(front4);


    // ======================================
    // SIDE PANELS
    // ======================================

    const sidePanel = new THREE.Mesh(

        new THREE.PlaneGeometry(16, 7),

        meshMat

    );

    sidePanel.rotation.y = Math.PI / 2;

    sidePanel.position.set(-20, 4, 0);

    g.add(sidePanel);

    const sidePanel2 = sidePanel.clone();

    sidePanel2.position.x = 20;

    g.add(sidePanel2);

    // ======================================
    // SAFETY GATE
    // ======================================

    const gateFrame = new THREE.Mesh(

        new THREE.BoxGeometry(4, 7, 0.2),

        postMat

    );

    gateFrame.position.set(0, 4, 8);

    g.add(gateFrame);

    const gateMesh = new THREE.Mesh(

        new THREE.PlaneGeometry(3.6, 6.6),

        meshMat

    );

    gateMesh.position.set(0, 4, 8.15);

    g.add(gateMesh);


    // ======================================
    // ELECTRICAL CABINET
    // ======================================

    const mainCabinet = new THREE.Mesh(

        new THREE.BoxGeometry(3.8, 7, 3),

        steel

    );

    mainCabinet.position.set(15, 3.5, -5);

    g.add(mainCabinet);


    // Cabinet Door

    const cabinetDoor = new THREE.Mesh(

        new THREE.BoxGeometry(3.65, 6.8, 0.08),

        lightSteel

    );

    cabinetDoor.position.set(13.1, 3.5, -5);

    g.add(cabinetDoor);
    // ======================================
    // GATE HANDLE
    // ======================================

    const gateHandle = new THREE.Mesh(

        new THREE.CylinderGeometry(0.05, 0.05, 0.8, 10),

        darkSteel

    );

    gateHandle.rotation.z = Math.PI / 2;

    gateHandle.position.set(

        1.4,

        4,

        8.18

    );

    g.add(gateHandle);


    // ======================================
    // GATE HINGES
    // ======================================

    for (let y of [1.8, 4, 6.2]) {

        const hinge = new THREE.Mesh(

            new THREE.BoxGeometry(0.12, 0.35, 0.18),

            darkSteel

        );

        hinge.position.set(

            -2,

            y,

            8.08

        );

        g.add(hinge);

     }
    // ======================================
    // FINAL SCALE
    // ======================================

    return g;
}