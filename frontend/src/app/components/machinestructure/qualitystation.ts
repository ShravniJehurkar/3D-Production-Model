import * as THREE from 'three';
import { steel, darkSteel, black, mirror, glass, hmiScreen, greenButton, yellowButton, redButton, warningLabel, namePlate, machineBody, scannerBlue, inspectionLight } from './common/materials';
export function createQualityStation(): THREE.Group {

    const g = new THREE.Group();

    const leftWall = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 10, 8),
        machineBody
    );

    leftWall.position.set(-5, 8.5, 0);

    g.add(leftWall);
    const rightWall = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 10, 8),
    );
    rightWall.position.set(5, 8.5, 0);
    const rearWall = new THREE.Mesh(

        new THREE.BoxGeometry(10, 10, 0.4),

        machineBody

    );

    rearWall.position.set(
        0,
        8.5,
        -4
    );

    g.add(rearWall);
    // =======================================
    // TOP HOOD
    // =======================================

    const hood = new THREE.Mesh(

        new THREE.BoxGeometry(10.8, 0.35, 8.8),

        darkSteel

    );

    hood.position.set(0, 13.7, 0);

    g.add(hood);
    // =======================================
    // FRONT LEFT DOOR
    // =======================================

    const leftDoor = new THREE.Mesh(

        new THREE.BoxGeometry(3.8, 7, 0.12),

        glass

    );

    leftDoor.position.set(

        -2.05,

        8.5,

        4.08

    );

    g.add(leftDoor);


    // =======================================
    // FRONT RIGHT DOOR
    // =======================================

    const rightDoor = new THREE.Mesh(

        new THREE.BoxGeometry(3.8, 7, 0.12),

        glass

    );

    rightDoor.position.set(

        2.05,

        8.5,

        4.08

    );

    g.add(rightDoor);
    // =======================================
    // LEFT INSPECTION WINDOW
    // =======================================

    const leftWindow = new THREE.Mesh(

        new THREE.BoxGeometry(0.12, 10, 9),

        glass

    );

    leftWindow.position.set(-5.08,9,0);

    g.add(leftWindow);
    // =======================================
    // RIGHT INSPECTION WINDOW
    // =======================================

    const rightWindow = leftWindow.clone();

    rightWindow.position.x = 5.08;

    g.add(rightWindow);
    const sideFrame = new THREE.Mesh(

        new THREE.BoxGeometry(
            0.08,
            3.2,
            3.2
        ),

        glass

    );

    sideFrame.position.copy(
        leftWindow.position
    );

    sideFrame.position.x += 0.05;

    g.add(sideFrame);
    // =======================================
    // DOOR FRAMES
    // =======================================

    const frameMaterial = darkSteel;

    const leftFrame = new THREE.Mesh(

        new THREE.BoxGeometry(4.05, 7.2, 0.08),

        frameMaterial

    );

    leftFrame.position.set(

        -2.05,

        8.5,

        4.10

    );

    g.add(leftFrame);

    const rightFrame = leftFrame.clone();

    rightFrame.position.x = 2.05;

    g.add(rightFrame);
    const centerFrame = new THREE.Mesh(

        new THREE.BoxGeometry(
            0.08,
            7,
            0.08
        ),

        darkSteel

    );

    centerFrame.position.set(
        0,
        8.5,
        4.05
    );

    g.add(centerFrame);
    const kickPlate = new THREE.Mesh(

        new THREE.BoxGeometry(
            10,
            0.5,
            0.1
        ),

        darkSteel

    );

    kickPlate.position.set(
        0,
        5,
        4.08
    );

    g.add(kickPlate);
    // =======================================
    // DOOR HANDLES
    // =======================================

    const handleGeo = new THREE.CylinderGeometry(
        0.05,
        0.05,
        1,
        10
    );

    const leftHandle = new THREE.Mesh(
        handleGeo,
        steel
    );

    leftHandle.rotation.z = Math.PI / 2;

    leftHandle.position.set(
        -0.8,
        8.5,
        4.15
    );

    g.add(leftHandle);

    const rightHandle = leftHandle.clone();

    rightHandle.position.x = 0.8;

    g.add(rightHandle);
    // =======================================
    // DOOR HINGES
    // =======================================

    const hingeGeo = new THREE.BoxGeometry(
        0.08,
        0.4,
        0.08
    );

    for (const y of [6.2, 8.5, 10.8]) {

        const hingeLeft = new THREE.Mesh(
            hingeGeo,
            darkSteel
        );

        hingeLeft.position.set(
            -3.95,
            y,
            4.05
        );

        g.add(hingeLeft);

        const hingeRight = hingeLeft.clone();

        hingeRight.position.x = 3.95;

        g.add(hingeRight);

    }
       for (let x of [-3, 3]) {
    
            for (let z of [-2, 2]) {
    
                const frame = new THREE.Mesh(
    
                    new THREE.BoxGeometry(0.25, 3, 0.25),
    
                    steel
    
                );
    
                frame.position.set(x, 1, z);
    
                g.add(frame);
    
            }
    
        }
    // =======================================
    // MACHINE BASE
    // =======================================

    const base = new THREE.Mesh(

        new THREE.BoxGeometry(

            10.4,

            0.8,

            8.4

        ),

        darkSteel

    );

    base.position.set(

        0,

        3.2,

        0

    );

    g.add(base);

    // =======================================
    // HMI SUPPORT
    // =======================================

    const hmiPole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, 4.5, 16),
        steel
    );

    hmiPole.position.set(5.3, 8.3, 4.25);

    g.add(hmiPole);


    // =======================================
    // HMI PANEL
    // =======================================

    const hmi = new THREE.Mesh(
        new THREE.BoxGeometry(3.5, 2.4, 0.45),
        black
    );

    hmi.position.set(5.3, 10.9, 4.25);

    g.add(hmi);

    const screen = new THREE.Mesh(
        new THREE.BoxGeometry(2.7, 1.8, 0.05),
        hmiScreen
    );

    screen.position.set(5.3, 10.9, 4.48);

    g.add(screen);


    // =======================================
    // PUSH BUTTONS
    // =======================================

    const greenBtn = new THREE.Mesh(

        new THREE.CylinderGeometry(0.12, 0.12, 0.1, 16),
        greenButton

    );

    greenBtn.rotation.x = Math.PI / 2;
    greenBtn.position.set(6, 9.8, 4.8);
    const yellowBtn = new THREE.Mesh(

        new THREE.CylinderGeometry(0.12, 0.12, 0.1, 16),
        yellowButton

    );

    yellowBtn.position.set(6.4, 9.8, 4.8);

    const redBtn = new THREE.Mesh(

        new THREE.CylinderGeometry(0.12, 0.12, 0.1, 16),
        redButton

    );
    redBtn.position.set(6.8, 9.8, 4.8);

    g.add(greenBtn, yellowBtn, redBtn);


    // =======================================
    // INSPECTION CAMERA
    // =======================================

    const cameraBody = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 1.4, 1.4),
        black
    );

    cameraBody.position.set(0, 11, 0);

    g.add(cameraBody);

    const lens = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.3, 1, 20),
        darkSteel
    );

    lens.rotation.x = Math.PI / 2;
    lens.position.set(0, 11, 0.8);

    g.add(lens);
    const ring = new THREE.Mesh(

        new THREE.TorusGeometry(
            0.6,
            0.06,
            12,
            32
        ),

        inspectionLight

    );

    ring.rotation.x = Math.PI / 2;

    ring.position.copy(lens.position);

    ring.position.z += 0.15;

    g.add(ring);

    // =======================================
    // SECOND CAMERA
    // =======================================

    const camera2 = cameraBody.clone();

    camera2.position.set(0, 5, -2);

    g.add(camera2);

    const lens2 = lens.clone();

    lens2.position.set(0, 5, -1.2);

    g.add(lens2);

    const ring2 = new THREE.Mesh(

        new THREE.TorusGeometry(
            0.6,
            0.06,
            12,
            32
        ),

        inspectionLight

    );

    ring2.rotation.x = Math.PI / 2;

    ring2.position.copy(lens2.position);

    ring2.position.z += 0.15;

    g.add(ring2);
    // =======================================
    // TOP LED LIGHT BAR
    // =======================================

    const ledBar = new THREE.Mesh(
        new THREE.BoxGeometry(5, 0.3, 0.5),
        inspectionLight
    );

    ledBar.position.set(0, 13.5, 0);

    g.add(ledBar);


    // =======================================
    // SIDE LED
    // =======================================

    const sideLED = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 5, 0.4),
        new THREE.MeshStandardMaterial({
            color: 0xffffaa,
            emissive: 0xffff55
        })
    );

    sideLED.position.set(4.2, 10, 2.4);

    g.add(sideLED);
    // =======================================
    // ENCODER
    // =======================================

    const encoder = new THREE.Mesh(
        new THREE.CylinderGeometry(0.35, 0.35, 0.6, 20),
        steel
    );

    encoder.rotation.z = Math.PI / 2;

    encoder.position.set(-8.5, 3.8, -2.5);

    g.add(encoder);


    // =======================================
    // DRIVE MOTOR
    // =======================================

    const motor = new THREE.Mesh(
        new THREE.CylinderGeometry(0.9, 0.9, 3, 24),
        darkSteel
    );

    motor.rotation.z = Math.PI / 2;

    motor.position.set(-7, 3.8, -3);

    g.add(motor);


    // Gearbox

    const gearbox = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 1.5, 1.5),
        steel
    );

    gearbox.position.set(-6, 3.8, -3);

    g.add(gearbox);


    // =======================================
    // ELECTRICAL CABINET
    // =======================================

    const electrical = new THREE.Mesh(
        new THREE.BoxGeometry(2.4, 5, 2.4),
        steel
    );

    electrical.position.set(7, 3, -3.5);

    g.add(electrical);


    // Door

    const door = new THREE.Mesh(
        new THREE.BoxGeometry(3.8, 7.6, 0.08),
        darkSteel
    );

    door.position.set(11.52, 3.5, -4);

    g.add(door);


    // Cabinet Handle

    const handle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 0.8, 8),
        steel
    );

    handle.rotation.z = Math.PI / 2;

    handle.position.set(11.7, 3.5, -2.4);

    g.add(handle);

    // =======================================
    // INTERNAL FRAME
    // =======================================

    for (let x of [4.5, 4.5]) {

        for (let z of [-2.5, 2.5]) {

            const frame = new THREE.Mesh(

                new THREE.BoxGeometry(0.25, 9, 0.25),

                darkSteel

            );

            frame.position.set(x, 8, z);

            g.add(frame);

        }

    }


    // =======================================
    // CAMERA BRACKETS
    // =======================================

    const bracketGeo = new THREE.BoxGeometry(0.2, 1.8, 0.2);

    const bracket1 = new THREE.Mesh(
        bracketGeo,
        darkSteel
    );

    bracket1.position.set(0, 11.2, 2);

    g.add(bracket1);

    const bracket2 = bracket1.clone();

    bracket2.position.z = -2;

    g.add(bracket2);
    // =======================================
    // BARCODE SCANNER
    // =======================================

    const scannerBody = new THREE.Mesh(
        new THREE.BoxGeometry(1.1, 0.8, 0.9),
        black
    );

    scannerBody.position.set(10.8, 5.2, 2.2);

    g.add(scannerBody);

    const scannerLens = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.18, 0.35, 16),
        scannerBlue
    );

    scannerLens.rotation.x = Math.PI / 2;
    scannerLens.position.set(10.8, 5.2, 2.72);

    g.add(scannerLens);


    // =======================================
    // INDUSTRIAL PC CABINET
    // =======================================

    const pcCabinet = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 7, 2.5),
        darkSteel
    );

    pcCabinet.position.set(8.5, 3, -2);

    g.add(pcCabinet);


    // Door

    const pcDoor = new THREE.Mesh(
        new THREE.BoxGeometry(3.3, 8.2, 0.08),
        steel
    );

    pcDoor.position.set(9.2, 4, -2.5);

    g.add(pcDoor);

    // =======================================
    // INSPECTION MIRRORS
    // =======================================

    const mirror1 = new THREE.Mesh(

        new THREE.PlaneGeometry(1.4, 1.4),

        mirror

    );

    mirror1.rotation.y = Math.PI / 4;

    mirror1.position.set(2, 10, 1.7);

    g.add(mirror1);

    const mirror2 = mirror1.clone();

    mirror2.rotation.y = -Math.PI / 4;

    mirror2.position.z = -1.7;

    g.add(mirror2);
    // =======================================
    // FINAL SCALE
    // =======================================
    return g;
}