import * as THREE from 'three';
import { steel, darkSteel, black, glass, hmiScreen, scannerBlue } from './common/materials';
import { machineBody } from './common/materials';
import { createConveyorSection } from './common/conveyor';

export function createCheckWeigher(): THREE.Group {
    const g = new THREE.Group();
    // ======================================
    // INSPECTION HEAD / TUNNEL
    // ======================================

    const head = new THREE.Mesh(
        new THREE.BoxGeometry(7, 7, 6),
        steel
    );

    head.position.set(0, 8.5, 0);

    g.add(head);

    // Front Door

    const frontDoor = new THREE.Mesh(
        new THREE.BoxGeometry(5.5, 5.5, 0.15),
        glass
    );

    frontDoor.position.set(0, 8.5, 3.08);

    g.add(frontDoor);

    // Side Covers

    const sideCover1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 5.5, 5),
        glass
    );

    sideCover1.position.set(-3.1, 8.5, 0);

    const sideCover2 = sideCover1.clone();
    sideCover2.position.x = 3.1;

    g.add(sideCover1, sideCover2);

    // Roof

    const roof = new THREE.Mesh(
        new THREE.BoxGeometry(6.3, 0.35, 6.3),
        glass
    );

    roof.position.set(0, 12.1, 0);

    g.add(roof);


    // ======================================
    // HMI SUPPORT
    // ======================================

    const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, 3.8, 16),
        steel
    );

    pole.position.set(5, 7.2, 2);

    g.add(pole);


    // ======================================
    // HMI
    // ======================================

    const hmi = new THREE.Mesh(
        new THREE.BoxGeometry(3, 2.2, 0.4),
        black
    );

    hmi.position.set(5, 9.6, 2);

    g.add(hmi);

    const screen = new THREE.Mesh(
        new THREE.BoxGeometry(2.4, 1.6, 0.05),
        hmiScreen
    );

    screen.position.set(5, 9.6, 2.23);

    g.add(screen);
    // ======================================
    // ELECTRICAL CABINET
    // ======================================

    const cabinet = new THREE.Mesh(
        new THREE.BoxGeometry(3.5, 4.5, 3),
        darkSteel
    );

    cabinet.position.set(0, 0, -3.8);

    g.add(cabinet);


    // Cabinet Door

    const cabinetDoor = new THREE.Mesh(
        new THREE.BoxGeometry(3.3, 4.3, 0.08),
        darkSteel
    );

    cabinetDoor.position.set(1.76, 0, -3.8);

    g.add(cabinetDoor);


    // Cabinet Handle

    const handle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.6, 8),
        steel
    );

    handle.rotation.z = Math.PI / 2;
    handle.position.set(1.5, 0, -2.3);

    g.add(handle);
    // ======================================
    // INTERNAL FRAME
    // ======================================

    for (let x of [-3, 3]) {

        for (let z of [-2, 2]) {

            const frame = new THREE.Mesh(

                new THREE.BoxGeometry(0.25, 6, 0.25),

                steel

            );

            frame.position.set(x, 4, z);

            g.add(frame);

        }

    }
    // ======================================
    // BARCODE SCANNER
    // ======================================

    const scannerBody = new THREE.Mesh(

        new THREE.BoxGeometry(1, 0.8, 0.8),

        scannerBlue

    );

    scannerBody.position.set(5.5, 6.5, 2);

    g.add(scannerBody);

    const scannerLens = new THREE.Mesh(

        new THREE.CylinderGeometry(0.18, 0.18, 0.4, 16),

        new THREE.MeshStandardMaterial({

            color: 0x0066ff,

            emissive: 0x0033aa

        })

    );

    scannerLens.rotation.x = Math.PI / 2;

    scannerLens.position.set(5.5, 6.5, 2.55);

    g.add(scannerLens);

    // ======================================
    // FINAL SCALE
    // ======================================

    return g;
}