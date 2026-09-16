import * as THREE from 'three';
import { createIndustrialRobot } from './common/industrialrobo';
import { steel, wood, darkSteel, yellow, black, meshMat, postMat } from './common/materials';
export function createPalletizer(): THREE.Group {

    const g = new THREE.Group();

    // ==================================
    // ROBOT TRACK
    // ==================================

    const track = new THREE.Mesh(
        new THREE.BoxGeometry(34, 1.2, 6),
        black
    );

    track.position.y = 0.8;

    g.add(track);


    // side rails

    const rail1 = new THREE.Mesh(
        new THREE.BoxGeometry(34, 0.4, 0.4),
        steel
    );

    rail1.position.set(0, 1.5, 2.6);

    const rail2 = rail1.clone();

    rail2.position.z = -2.6;

    g.add(rail1, rail2);

    // ==================================
    // ROBOT BASE
    // ==================================

    const base = new THREE.Mesh(

        new THREE.BoxGeometry(6, 3, 5),

        yellow

    );

    base.position.set(11, 2.5, 0);

    g.add(base);

    const robot = createIndustrialRobot();

    robot.position.set(
        11,
        6,
        0
    );

    g.add(robot);
    // ==================================
    // PALLET
    // ==================================

    const pallet = new THREE.Group();

    for (let i = -2; i <= 2; i += 2) {

        const plank = new THREE.Mesh(

            new THREE.BoxGeometry(6, 0.4, 1),

            wood

        );

        plank.position.set(0, 0, i);

        pallet.add(plank);

    }

    const supportGeo = new THREE.BoxGeometry(1, 0.8, 1);

    for (let x = -2; x <= 2; x += 2) {

        for (let z = -2; z <= 2; z += 2) {

            const block = new THREE.Mesh(

                supportGeo,

                wood

            );

            block.position.set(x, -0.6, z);

            pallet.add(block);

        }

    }

    pallet.position.set(-5, 2.1, 0);

    g.add(pallet);


    // ==================================
    // BOXES
    // ==================================

    for (let y = 0; y < 2; y++) {

        for (let x = -1; x <= 1; x++) {

            const box = new THREE.Mesh(

                new THREE.BoxGeometry(2, 2, 2),

                new THREE.MeshStandardMaterial({

                    color: 0xd7b98c

                })

            );

            box.position.set(

                -5 + x * 2.1,

                3.3 + y * 2,

                0

            );

            g.add(box);

        }

    }
    // Gearbox

    const gearBox = new THREE.Mesh(

        new THREE.BoxGeometry(1.6, 1.6, 1.6),

        darkSteel

    );

    gearBox.position.set(13.7, 2, 0);

    g.add(gearBox);

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


    //======================================
    // GATE HANDLE
    //======================================

    const gateHandle = new THREE.Mesh(

        new THREE.CylinderGeometry(0.05, 0.05, 0.8, 10),

        darkSteel

    );

    gateHandle.rotation.z = Math.PI / 2;

    gateHandle.position.set(1.2, 4, 10.2);

    g.add(gateHandle);
    // ======================================
    // CONTROL CABINET
    // ======================================

    const cabinet = new THREE.Mesh(

        new THREE.BoxGeometry(4, 8, 4),

        steel

    );

    cabinet.position.set(-14, 4, -6);

    g.add(cabinet);


    // Door

    const door = new THREE.Mesh(

        new THREE.BoxGeometry(3.8, 7.5, 0.12),

        darkSteel

    );

    door.position.set(-12.02, 4, -6);

    g.add(door);

    // ======================================
    // FINAL SCALE
    // ======================================

    return g;
}