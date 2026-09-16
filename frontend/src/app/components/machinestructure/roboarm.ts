import * as THREE from 'three';
import { createIndustrialRobot } from './common/industrialrobo';
import { steel, darkSteel, meshMat, postMat, lightSteel } from './common/materials';
import { create } from 'domain';
export function createRoBoArm(): THREE.Group {
    const g = new THREE.Group();

    //======================================
    // FLOOR PEDESTAL
    //======================================

    const pedestal = new THREE.Mesh(

        new THREE.BoxGeometry(7, 8, 7),

        darkSteel

    );

    pedestal.position.set(0, 4, 0);

    g.add(pedestal);


    //======================================
    // TOP PLATE
    //======================================

    const topPlate = new THREE.Mesh(

        new THREE.BoxGeometry(7.5, 0.45, 7.5),

        steel

    );

    topPlate.position.set(0, 8.25, 0);

    g.add(topPlate);
    const robot = createIndustrialRobot();
    robot.position.set(0, 9, 0);
    g.add(robot);

    //======================================
    // ROBOT CONTROLLER CABINET
    //======================================

    const controllerCabinet = new THREE.Mesh(

        new THREE.BoxGeometry(4, 7, 3),

        steel

    );

    controllerCabinet.position.set(-8, 3.5, -5);

    g.add(controllerCabinet);


    // Controller Door

    const controllerDoor = new THREE.Mesh(

        new THREE.BoxGeometry(3.85, 6.8, 0.08),

        lightSteel

    );

    controllerDoor.position.set(-10.02, 3.5, -5);

    g.add(controllerDoor);


    // Controller Handle

    const controllerHandle = new THREE.Mesh(

        new THREE.CylinderGeometry(0.05, 0.05, 0.8, 10),

        darkSteel

    );

    controllerHandle.rotation.z = Math.PI / 2;

    controllerHandle.position.set(-10.15, 3.5, -3.8);

    g.add(controllerHandle);
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

    gateHandle.position.set(1.2, 4, 8.2);

    g.add(gateHandle);

    //======================================
    // FLOOR WORKING ENVELOPE
    //======================================

    // const ring = new THREE.Mesh(

    //     new THREE.RingGeometry(7.5, 8, 64),

    //     new THREE.MeshBasicMaterial({

    //         color: 0xffc107,

    //         side: THREE.DoubleSide

    //     })

    // );

    // ring.rotation.x = -Math.PI / 2;

    // ring.position.y = 0.02;

    // g.add(ring);


    //======================================
    // ROBOT PEDESTAL ANCHOR PLATE
    //======================================

    const anchorPlate = new THREE.Mesh(

        new THREE.BoxGeometry(8.5, 0.15, 8.5),

        steel

    );

    anchorPlate.position.set(

        0,

        8.35,

        0

    );

    g.add(anchorPlate);
    //======================================
    // FINAL SCALE
    //======================================


    return g;
}