import * as THREE from 'three';
import {steel,darkSteel,black,fillerFrame, lightSteel, safetyGlass, fillerBody } from './common/materials';
import { createMachineFrame } from './common/machine-frame';
export function createFiller(showInternalConveyor = false): THREE.Group {

    const g = new THREE.Group();

    const insideLight = new THREE.PointLight(
        0xffffff,
        1.5,
        25
    );

    insideLight.position.set(
        0,
        7,
        0
    );

    g.add(insideLight);
    const floor = new THREE.Mesh(

        new THREE.BoxGeometry(30, 0.4, 18),

        steel

    );

    floor.position.y = 0.2;

    g.add(floor);
    const leftWall = new THREE.Mesh(

        new THREE.BoxGeometry(

            0.4,

            11,

            18

        ),

        fillerBody

    );

    leftWall.position.set(

        -15,

        5.5,

        0

    );

    g.add(leftWall);
    const rightWall = leftWall.clone();

    rightWall.position.x = 15;

    g.add(rightWall);
    const rearWall = new THREE.Mesh(

        new THREE.BoxGeometry(

            30,

            11,

            14

        ),

        fillerBody

    );

    rearWall.position.set(

        0,

        5.5,

        -9

    );

    g.add(rearWall);
    // =========================
    // TOP COVER
    // =========================

    const roof = new THREE.Mesh(
        new THREE.BoxGeometry(30.5, 0.5, 18.5),
        lightSteel
    );

    roof.position.y = 11.3;

    g.add(roof);
    const roofBeam = new THREE.Mesh(
        new THREE.BoxGeometry(30, 0.25, 0.25),
        darkSteel
    );

    roofBeam.position.set(0, 10.8, 8.9);

    g.add(roofBeam);

    const roofBeam2 = roofBeam.clone();

    roofBeam2.position.z = -8.9;

    g.add(roofBeam2);
    // =========================
    // SIDE GLASS
    // =========================

    const leftDoor = new THREE.Mesh(

        new THREE.BoxGeometry(16, 10, 0.12),

        safetyGlass

    );

    leftDoor.position.set(

        -7.2,

        6,

        9.2

    );

    g.add(leftDoor);

    const rightDoor = leftDoor.clone();
    const postGeo = new THREE.BoxGeometry(0.3, 8, 0.3);

    const post1 = new THREE.Mesh(postGeo, fillerFrame);
    post1.position.set(-10.5, 4, 5.9);
    g.add(post1);

    const post2 = post1.clone();
    post2.position.x = 10.5;
    g.add(post2);

    const post3 = post1.clone();
    post3.position.z = -5.9;
    g.add(post3);

    const post4 = post2.clone();
    post4.position.z = -5.9;
    g.add(post4);
    rightDoor.position.x = 7;

    g.add(rightDoor);
    const frame = new THREE.Mesh(

        new THREE.BoxGeometry(20.5, 0.3, 0.3),
        fillerFrame

    );

    frame.position.set(

        0,

        9,

        6

    );

    g.add(frame);
    const bottomFrame = frame.clone();

    bottomFrame.position.y = 2;

    g.add(bottomFrame);
    const sideFrameGeo = new THREE.BoxGeometry(
        0.3,
        7.3,
        0.3
    );

    const leftFrame = new THREE.Mesh(
        sideFrameGeo,
        darkSteel
    );

    leftFrame.position.set(
        -10,
        5.5,
        6
    );

    g.add(leftFrame);
    const rightFrame = leftFrame.clone();

    rightFrame.position.x = 10;

    g.add(rightFrame);
    // =========================
    // CONVEYOR
    // =========================
    if (showInternalConveyor) {
        const conveyor = new THREE.Mesh(
            new THREE.BoxGeometry(30, 1, 4),
            black
        );

        conveyor.position.y = 1.5;

        g.add(conveyor);
    }
    // =========================
    // LEGS
    // =========================

    const legGeo = new THREE.BoxGeometry(0.8, 5, 0.8);

    const legPos = [
        [-9, -5],
        [9, -5],
        [-9, 5],
        [9, 5]
    ];

    legPos.forEach(p => {

        const leg = new THREE.Mesh(
            legGeo,
            darkSteel
        );

        leg.position.set(p[0], -1, p[1]);

        g.add(leg);

    });


    // =========================
    // LEVEL FEET
    // =========================

    legPos.forEach(p => {

        const foot = new THREE.Mesh(

            new THREE.CylinderGeometry(0.4, 0.4, 0.2, 16),

            steel

        );

        foot.position.set(p[0], -3.6, p[1]);

        g.add(foot);

    });
    // ======================================
    // ROTARY FILLING TABLE
    // ======================================

    const rotaryTable = new THREE.Mesh(
        new THREE.CylinderGeometry(6.5, 6.5, 0.8, 48),
        steel
    );

    rotaryTable.position.set(0, 2.4, 0);

    g.add(rotaryTable);
    // Center Hub

    const hub = new THREE.Mesh(
        new THREE.CylinderGeometry(1.6, 1.6, 2.5, 32),
        darkSteel
    );

    hub.position.set(0, 3.2, 0);

    g.add(hub);


    // ======================================
    // PRODUCT TANK
    // ======================================

    const tank = new THREE.Mesh(
        new THREE.CylinderGeometry(7, 7, 6, 40),
        steel
    );

    tank.position.set(0, 15, 0);

    g.add(tank);


    // Tank Cover

    const tankTop = new THREE.Mesh(
        new THREE.CylinderGeometry(4.3, 4.3, 0.25, 40),
        darkSteel
    );

    tankTop.position.set(0, 18, 0);

    g.add(tankTop);


    // Inlet Pipe

    const inlet = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.3, 8, 20),
        steel
    );

    inlet.position.set(0, 18, 0);

    g.add(inlet);


    // Horizontal Pipe

    const pipeTop = new THREE.Mesh(
        new THREE.CylinderGeometry(0.25, 0.25, 3, 16),
        steel
    );

    pipeTop.rotation.z = Math.PI / 2;
    pipeTop.position.set(1.5, 15.3, 0);

    g.add(pipeTop);


    // ======================================
    // FILLING HEAD RING
    // ======================================

    const radius = 5;

    for (let i = 0; i < 16; i++) {

        const angle = i * Math.PI * 2 / 16;

        const nozzleHolder = new THREE.Mesh(

            new THREE.BoxGeometry(0.45, 1.2, 0.45),

            steel

        );

        nozzleHolder.position.set(

            Math.cos(angle) * radius,

            10,

            Math.sin(angle) * radius

        );

        g.add(nozzleHolder);


        // Filling Nozzle

        const nozzle = new THREE.Mesh(

            new THREE.CylinderGeometry(0.08, 0.08, 2.8, 10),

            steel

        );

        nozzle.position.set(

            Math.cos(angle) * radius,

            7.5,

            Math.sin(angle) * radius

        );

        g.add(nozzle);

    }


    // ======================================
    // BOTTLE HOLDERS
    // ======================================

    for (let i = 0; i < 16; i++) {

        const angle = i * Math.PI * 2 / 16;

        const holder = new THREE.Mesh(

            new THREE.CylinderGeometry(0.45, 0.45, 0.4, 18),

            black

        );

        holder.position.set(

            Math.cos(angle) * 5.3,

            12,

            Math.sin(angle) * 5.3

        );

        g.add(holder);

    }


    // ======================================
    // STAR WHEEL
    // ======================================

    const starWheel = new THREE.Mesh(

        new THREE.CylinderGeometry(1.4, 1.4, 0.4, 8),

        darkSteel

    );

    starWheel.position.set(-6.3, 2.5, 0);

    starWheel.rotation.y = Math.PI / 8;

    g.add(starWheel);


    // EXIT STAR WHEEL

    const exitWheel = starWheel.clone();

    exitWheel.position.x = 6.3;

    g.add(exitWheel);


    // ======================================
    // CENTER SHAFT
    // ======================================

    const shaft = new THREE.Mesh(

        new THREE.CylinderGeometry(0.3, 0.3, 6, 20),

        steel

    );

    shaft.position.set(0, 5.5, 0);

    g.add(shaft);


    // ======================================
    // SUPPORT ARMS
    // ======================================

    for (let i = 0; i < 8; i++) {

        const angle = i * Math.PI / 4;

        const arm = new THREE.Mesh(

            new THREE.BoxGeometry(3, 0.2, 0.25),

            steel

        );

        arm.rotation.y = angle;

        arm.position.set(0, 7.6, 0);

        g.add(arm);

    }
    // ======================================
    // HMI SUPPORT
    // ======================================

    const hmiPole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, 4.5, 16),
        steel
    );

    hmiPole.position.set(8.5, 5.5, 5.2);
    g.add(hmiPole);

    // ======================================
    // HMI
    // ======================================

    const hmi = new THREE.Mesh(
        new THREE.BoxGeometry(2.8, 2, 0.35),
        black
    );

    hmi.position.set(8.5, 13, 5.2);
    g.add(hmi);

    const screen = new THREE.Mesh(
        new THREE.BoxGeometry(2.2, 1.5, 0.05),
        new THREE.MeshStandardMaterial({
            color: 0x55ddff,
            emissive: 0x0088aa
        })
    );

    screen.position.set(8.5, 8.2, 5.38);
    g.add(screen);


    // ======================================
    // CONTROL CABINET
    // ======================================

    const cabinet = new THREE.Mesh(
        new THREE.BoxGeometry(3.5, 6.5, 3.5),
        lightSteel
    );

    cabinet.position.set(10, 3.5, -4);

    g.add(cabinet);

    // Door

    const door = new THREE.Mesh(
        new THREE.BoxGeometry(3.2, 6.2, 0.1),
        darkSteel
    );

    door.position.set(8.25, 3.5, -4);

    g.add(door);

    // ======================================
    // MAIN DRIVE MOTOR
    // ======================================

    const motor = new THREE.Mesh(
        new THREE.CylinderGeometry(0.8, 0.8, 3, 24),
        darkSteel
    );

    motor.rotation.z = Math.PI / 2;
    motor.position.set(-7, 2, -4.5);

    g.add(motor);

    // Gearbox

    const gearbox = new THREE.Mesh(
        new THREE.BoxGeometry(1.6, 1.6, 1.6),
        steel
    );

    gearbox.position.set(-5.2, 2, -4.5);

    g.add(gearbox);

    // ======================================
    // ROTARY MOTOR
    // ======================================

    const rotaryMotor = new THREE.Mesh(
        new THREE.CylinderGeometry(0.65, 0.65, 2.5, 20),
        darkSteel
    );

    rotaryMotor.rotation.x = Math.PI / 2;
    rotaryMotor.position.set(0, 1.5, -5);

    g.add(rotaryMotor);

    // ======================================
    // PHOTO SENSOR
    // ======================================

    const sensorPole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 2.2, 12),
        steel
    );

    sensorPole.position.set(-8, 3, 2.4);

    g.add(sensorPole);

    const sensor = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.4, 0.4),
        new THREE.MeshStandardMaterial({
            color: 0x0055ff
        })
    );

    sensor.position.set(-8, 4.3, 2.4);

    g.add(sensor);

    // ======================================
    // TOWER LIGHT
    // ======================================

    const towerPole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 7, 20),
        steel
    );

    towerPole.position.set(-9, 15, 5);

    g.add(towerPole);

    const green = new THREE.Mesh(
        new THREE.SphereGeometry(0.25),
        new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            emissive: 0x004400
        })
    );

    green.position.set(-9, 19.3, 5);

    const yellowLight = new THREE.Mesh(
        new THREE.SphereGeometry(0.25),
        new THREE.MeshStandardMaterial({
            color: 0xffff00,
            emissive: 0x444400
        })
    );

    yellowLight.position.set(-9, 18.9, 5);

    const red = new THREE.Mesh(
        new THREE.SphereGeometry(0.25),
        new THREE.MeshStandardMaterial({
            color: 0xff0000,
            emissive: 0x440000
        })
    );

    red.position.set(-9, 18.5, 5);

    g.add(green, yellowLight, red);

    // ======================================
    // PNEUMATIC MANIFOLD
    // ======================================

    const manifold = new THREE.Mesh(
        new THREE.BoxGeometry(3, 0.5, 0.8),
        darkSteel
    );

    manifold.position.set(0, 9.4, -3);

    g.add(manifold);

    // Air Lines

    for (let i = 0; i < 16; i++) {

        const angle = i * Math.PI * 2 / 16;

        const hose = new THREE.Mesh(

            new THREE.CylinderGeometry(0.04, 0.04, 2.3, 8),

            new THREE.MeshStandardMaterial({
                color: 0x2196f3
            })

        );

        hose.position.set(
            Math.cos(angle) * 3.2,
            8.3,
            Math.sin(angle) * 3.2
        );

        hose.lookAt(
            Math.cos(angle) * 3.2,
            5.7,
            Math.sin(angle) * 3.2
        );

        g.add(hose);

    }

    // ======================================
    // INTERNAL SUPPORTS
    // ======================================

    for (let x of [-5, 5]) {

        for (let z of [-4, 4]) {

            const support = new THREE.Mesh(
                new THREE.BoxGeometry(0.3, 7, 0.3),
                darkSteel
            );

            support.position.set(x, 4, z);

            g.add(support);

        }

    }
    const support = new THREE.Mesh(

        new THREE.BoxGeometry(0.2, 7, 0.2),

        steel

    );

    support.position.set(-4, 4, 0);

    g.add(support);

    const support2 = support.clone();

    support2.position.x = 4;

    g.add(support2);

    // ======================================
    // MACHINE HANDLE
    // ======================================

    const handle = new THREE.Mesh(
        new THREE.TorusGeometry(0.3, 0.05, 8, 20),
        darkSteel
    );

    handle.rotation.y = Math.PI / 2;
    handle.position.set(9.6, 4, -2.2);

    g.add(handle);
    // ======================================
    // MAIN STAINLESS PIPE
    // ======================================

    const mainPipe = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.18, 9, 20),
        steel
    );

    mainPipe.position.set(0, 13.5, 0);

    g.add(mainPipe);

    // Horizontal Header

    const header = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.18, 8, 20),
        steel
    );

    header.rotation.z = Math.PI / 2;
    header.position.set(0, 16.8, 0);

    g.add(header);


    // ======================================
    // INDIVIDUAL FILLING PIPES
    // ======================================

    for (let i = 0; i < 16; i++) {

        const angle = i * Math.PI * 2 / 16;

        const pipe = new THREE.Mesh(

            new THREE.CylinderGeometry(0.05, 0.05, 3, 8),

            steel

        );

        pipe.position.set(

            Math.cos(angle) * 3.4,

            10.8,

            Math.sin(angle) * 3.4

        );

        g.add(pipe);

    }


    // ======================================
    // CIP SPRAY RING
    // ======================================

    const cipRing = new THREE.Mesh(

        new THREE.TorusGeometry(3.8, 0.08, 12, 60),

        steel

    );

    cipRing.rotation.x = Math.PI / 2;

    cipRing.position.y = 10.2;

    g.add(cipRing);


    // ======================================
    // MACHINE BOLTS
    // ======================================

    const boltGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.08, 8);

    for (let x of [-10, 10]) {

        for (let z of [-5, 5]) {

            const bolt = new THREE.Mesh(

                boltGeo,

                darkSteel

            );

            bolt.position.set(x, 8.4, z);

            g.add(bolt);

        }

    }


    // ======================================
    // DRAIN PIPE
    // ======================================

    const drain = new THREE.Mesh(

        new THREE.CylinderGeometry(0.12, 0.12, 4, 12),

        steel

    );

    drain.position.set(-6, 0.5, -5);

    g.add(drain);


    // ======================================
    // CABLE TRAY
    // ======================================

    const tray = new THREE.Mesh(

        new THREE.BoxGeometry(16, 0.25, 0.6),

        darkSteel

    );

    tray.position.set(0, 9, -5.5);

    g.add(tray);


    // ======================================
    // ELECTRICAL CABLES
    // ======================================

    for (let i = 0; i < 20; i++) {

        const wire = new THREE.Mesh(

            new THREE.CylinderGeometry(0.03, 0.03, 1, 8),

            black

        );

        wire.rotation.z = 0.2;

        wire.position.set(

            -7 + i * 0.7,

            9.3,

            -5.2

        );

        g.add(wire);

    }
    // ======================================
    // RUBBER FEET
    // ======================================

    for (let x of [-9, 9]) {

        for (let z of [-5, 5]) {

            const foot = new THREE.Mesh(

                new THREE.CylinderGeometry(0.35, 0.35, 0.3, 20),

                black

            );

            foot.position.set(x, -3.9, z);

            g.add(foot);

        }

    }
    const rearGlass = new THREE.Mesh(

        new THREE.BoxGeometry(
            28,
            7.5,
            0.12
        ),

        safetyGlass

    );

    rearGlass.position.set(
        0,
        5.5,
        -9.2
    );

    g.add(rearGlass);

    // ======================================
    // SMALL VENTS
    // ======================================

    for (let i = 0; i < 8; i++) {

        const vent = new THREE.Mesh(

            new THREE.BoxGeometry(1.4, 0.05, 0.05),

            darkSteel

        );

        vent.position.set(

            10.9,

            3 + i * 0.45,

            -3

        );

        vent.rotation.z = Math.PI / 2;

        g.add(vent);

    }
    // ======================================
    // FINAL SCALE
    // ======================================
    return g;
}