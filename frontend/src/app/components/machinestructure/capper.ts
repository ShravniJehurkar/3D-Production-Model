import * as THREE from 'three';
import {steel,darkSteel,blackPlastic,glass,hmiScreen,greenButton,yellowButton,redButton,sensorBlue,namePlate} from './common/materials';
import { createConveyorSection } from './common/conveyor';
export function createCapper(showInternalConveyor = false): THREE.Group {

    const g = new THREE.Group();
    const insideLight = new THREE.PointLight(
        0xffffff,
        1.5,
        20
    );

    insideLight.position.set(
        0,
        7,
        0
    );

    g.add(insideLight);
    const leftDoor = new THREE.Mesh(
        new THREE.BoxGeometry(10.3, 10, 0.12),
        glass
    );

    leftDoor.position.set(
        -4.3,
        5,
        6.25
    );

    g.add(leftDoor);

    const rightDoor = leftDoor.clone();

    rightDoor.position.x = 4.3;

    g.add(rightDoor);
    const leftWall = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 9, 12),
        steel
    );

    leftWall.position.set(-10, 4.5, 0);

    g.add(leftWall);
    const rightWall = leftWall.clone();

    rightWall.position.x = 10;

    g.add(rightWall);
    const rearWall = new THREE.Mesh(
        new THREE.BoxGeometry(20, 9, 0.4),
        steel
    );

    rearWall.position.set(0, 4.5, -6);

    g.add(rearWall);
    // TOP COVER

    const top = new THREE.Mesh(
        new THREE.BoxGeometry(20.5, 0.5, 12.5),
        darkSteel
    );

    top.position.y = 9.4;

    g.add(top);
    const postGeo = new THREE.BoxGeometry(0.3, 9, 0.3);

    const p1 = new THREE.Mesh(postGeo, darkSteel);
    p1.position.set(-9.8, 4.5, 5.8);

    const p2 = p1.clone();
    p2.position.x = 9.8;

    const p3 = p1.clone();
    p3.position.z = -5.8;

    const p4 = p2.clone();
    p4.position.z = -5.8;

    g.add(p1, p2, p3, p4);
    const beam = new THREE.Mesh(
        new THREE.BoxGeometry(20, 0.2, 0.2),
        darkSteel
    );

    beam.position.set(
        0,
        8.9,
        5.8
    );

    g.add(beam);

    const beam2 = beam.clone();

    beam2.position.z = -5.8;

    g.add(beam2);
    // =======================================
    // INDUSTRIAL CONVEYOR
    // =======================================
    if (showInternalConveyor) {
        const conveyor = createConveyorSection(24, 4);

        conveyor.position.set(0, 0, 0);

        g.add(conveyor);
    }
    // Center Hub

    const hub = new THREE.Mesh(
        new THREE.CylinderGeometry(1.2, 1.2, 2, 32),
        darkSteel
    );

    hub.position.set(0, 3.3, 0);

    g.add(hub);

    // =======================================
    // MAIN CAPPING TURRET
    // =======================================

    const turret = new THREE.Mesh(
        new THREE.CylinderGeometry(4, 4, 4.5, 40),
        steel
    );

    turret.position.set(0, 8.7, 0);

    g.add(turret);

    // Top Cover

    const turretTop = new THREE.Mesh(
        new THREE.CylinderGeometry(4.2, 4.2, 0.35, 40),
        darkSteel
    );

    turretTop.position.set(0, 11.2, 0);

    g.add(turretTop);

    // =======================================
    // CAPPING HEADS
    // =======================================

    const radius = 3.1;

    for (let i = 0; i < 12; i++) {

        const angle = i * Math.PI * 2 / 12;

        const head = new THREE.Mesh(

            new THREE.CylinderGeometry(0.35, 0.35, 2.8, 20),

            steel

        );

        head.position.set(

            Math.cos(angle) * radius,

            7,

            Math.sin(angle) * radius

        );

        g.add(head);

        const chuck = new THREE.Mesh(

            new THREE.CylinderGeometry(0.22, 0.22, 0.7, 16),

            darkSteel

        );

        chuck.position.set(

            Math.cos(angle) * radius,

            5.2,

            Math.sin(angle) * radius

        );

        g.add(chuck);

    }

    // =======================================
    // BOTTLE HOLDERS
    // =======================================

    for (let i = 0; i < 12; i++) {

        const angle = i * Math.PI * 2 / 12;

        const holder = new THREE.Mesh(

            new THREE.CylinderGeometry(0.45, 0.45, 0.35, 20),

            blackPlastic

        );

        holder.position.set(

            Math.cos(angle) * 4,

            2.9,

            Math.sin(angle) * 4

        );

        g.add(holder);

    }

    // =======================================
    // CAP BOWL
    // =======================================

    const bowl = new THREE.Mesh(

        new THREE.CylinderGeometry(2.2, 3.4, 2.4, 32),

        steel

    );

    bowl.position.set(7.5, 10.5, 0);

    g.add(bowl);

    // Bowl Lip

    const lip = new THREE.Mesh(

        new THREE.TorusGeometry(3.2, 0.12, 12, 40),

        darkSteel

    );

    lip.rotation.x = Math.PI / 2;

    lip.position.set(7.5, 11.7, 0);

    g.add(lip);

    // =======================================
    // CAP CHUTE
    // =======================================

    const chute = new THREE.Mesh(

        new THREE.BoxGeometry(6, 0.6, 0.8),

        steel

    );

    chute.rotation.z = -0.35;

    chute.position.set(4.2, 9.8, 0);

    g.add(chute);

    // =======================================
    // STAR WHEELS
    // =======================================

    const entryStar = new THREE.Mesh(

        new THREE.CylinderGeometry(1.5, 1.5, 0.45, 8),

        darkSteel

    );

    entryStar.position.set(-6.3, 2.5, 0);

    entryStar.rotation.y = Math.PI / 8;

    g.add(entryStar);

    const exitStar = entryStar.clone();

    exitStar.position.x = 6.3;

    g.add(exitStar);

    // =======================================
    // CENTER SHAFT
    // =======================================

    const shaft = new THREE.Mesh(

        new THREE.CylinderGeometry(0.3, 0.3, 7, 20),

        darkSteel

    );

    shaft.position.set(0, 7, 0);

    g.add(shaft);

    // =======================================
    // SUPPORT ARMS
    // =======================================

    for (let i = 0; i < 6; i++) {

        const angle = i * Math.PI / 3;

        const arm = new THREE.Mesh(

            new THREE.BoxGeometry(3.5, 0.18, 0.25),

            steel

        );

        arm.rotation.y = angle;

        arm.position.set(0, 9.8, 0);

        g.add(arm);

    }

    // =======================================
    // HMI SUPPORT
    // =======================================

    const hmiPole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, 5, 16),
        steel
    );

    hmiPole.position.set(11.5, 5.5, 5);

    g.add(hmiPole);

    // =======================================
    // HMI PANEL
    // =======================================

    const hmi = new THREE.Mesh(
        new THREE.BoxGeometry(3.2, 2.2, 0.4),
        blackPlastic
    );

    hmi.position.set(11.5, 8.4, 6);

    g.add(hmi);

    const display = new THREE.Mesh(
        new THREE.BoxGeometry(2.6, 1.6, 0.05),
        hmiScreen
    );

    display.position.set(11.5, 8.4, 6.23);

    g.add(display);

    // =======================================
    // PUSH BUTTONS
    // =======================================

    const greenBtn = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, 0.1, 16),
        greenButton
    );

    greenBtn.rotation.x = Math.PI / 2;
    greenBtn.position.set(8.7, 7.2, 6.22);

    const yellowBtn = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, 0.1, 16),
        yellowButton
    );
    yellowBtn.rotation.x = Math.PI / 2;
    yellowBtn.position.set(9.0, 7.2, 6.22);
    yellowBtn.position.x = 9.0;

    const redBtn = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, 0.1, 16),
        redButton
    );

    redBtn.rotation.x = Math.PI / 2;
    redBtn.position.set(9.3, 7.2, 6.22);
    redBtn.position.x = 9.3;

    g.add(greenBtn, yellowBtn, redBtn);
    // =======================================
    // CONTROL CABINET
    // =======================================

    const cabinet = new THREE.Mesh(
        new THREE.BoxGeometry(4, 7, 4),
        steel
    );

    cabinet.position.set(-9, 3.8, -4);

    g.add(cabinet);

    // Door

    const cabinetDoor = new THREE.Mesh(
        new THREE.BoxGeometry(3.8, 6.8, 0.12),
        darkSteel
    );

    cabinetDoor.position.set(-7, 3.8, -4);

    g.add(cabinetDoor);

    // Handle

    const handle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 0.8, 8),
        steel
    );

    handle.rotation.z = Math.PI / 2;
    handle.position.set(-5.1, 3.8, -3);

    g.add(handle);

    // =======================================
    // MAIN DRIVE MOTOR
    // =======================================

    const motor = new THREE.Mesh(
        new THREE.CylinderGeometry(0.8, 0.8, 3, 24),
        darkSteel
    );

    motor.rotation.z = Math.PI / 2;
    motor.position.set(-8, 2, -5);

    g.add(motor);

    // Gearbox

    const gearbox = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 1.5, 1.5),
        steel
    );

    gearbox.position.set(-6.2, 2, -5);

    g.add(gearbox);

    // =======================================
    // CAP FEED MOTOR
    // =======================================

    const capMotor = new THREE.Mesh(
        new THREE.CylinderGeometry(0.6, 0.6, 2.5, 20),
        darkSteel
    );

    capMotor.rotation.x = Math.PI / 2;
    capMotor.position.set(7.5, 13, 0);

    g.add(capMotor);

    // =======================================
    // PHOTO SENSOR
    // =======================================

    const sensorPole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 2, 12),
        steel
    );

    sensorPole.position.set(-8, 3, 2.3);

    g.add(sensorPole);

    const sensor = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.4, 0.4),
        sensorBlue
    );

    sensor.position.set(-8, 4.2, 2.3);

    g.add(sensor);

    // =======================================
    // TOWER LIGHT
    // =======================================

    const towerPole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 4, 12),
        steel
    );

    towerPole.position.set(-9, 11, 5);

    g.add(towerPole);

    const green = new THREE.Mesh(
        new THREE.SphereGeometry(0.22),
        greenButton
    );

    green.position.set(-9, 13.2, 5);

    const amber = new THREE.Mesh(
        new THREE.SphereGeometry(0.22),
        yellowButton
    );

    amber.position.set(-9, 12.8, 5);

    const red = new THREE.Mesh(
        new THREE.SphereGeometry(0.22),
        redButton
    );

    red.position.set(-9, 12.4, 5);

    g.add(green, amber, red);

    // =======================================
    // PNEUMATIC CYLINDERS
    // =======================================

    for (let i = 0; i < 4; i++) {

        const cylinder = new THREE.Mesh(

            new THREE.CylinderGeometry(0.2, 0.2, 2.5, 16),

            steel

        );

        cylinder.position.set(

            -2 + i * 1.4,

            9.5,

            4.5

        );

        g.add(cylinder);

    }

    // =======================================
    // INTERNAL FRAME
    // =======================================

    for (let x of [-5, 5]) {

        for (let z of [-4, 4]) {

            const frame = new THREE.Mesh(

                new THREE.BoxGeometry(0.3, 8, 0.3),

                darkSteel

            );

            frame.position.set(x, 4, z);

            g.add(frame);

        }

    }

    // =======================================
    // CABLE TRAY
    // =======================================

    const tray = new THREE.Mesh(

        new THREE.BoxGeometry(14, 0.3, 0.6),

        darkSteel

    );

    tray.position.set(0, 9, -5.4);

    g.add(tray);

    // =======================================
    // POWER CABLES
    // =======================================

    for (let i = 0; i < 18; i++) {

        const wire = new THREE.Mesh(

            new THREE.CylinderGeometry(0.03, 0.03, 0.9, 8),
            blackPlastic

        );

        wire.rotation.z = 0.2;

        wire.position.set(

            -6 + i * 0.7,

            9.2,

            -5.1

        );

        g.add(wire);

    }
    // =======================================
    // STAINLESS CAP GUIDE
    // =======================================

    const capGuide = new THREE.Mesh(
        new THREE.TorusGeometry(2.6, 0.08, 12, 40),
        steel
    );

    capGuide.rotation.x = Math.PI / 2;
    capGuide.position.set(0, 11.3, 0);

    g.add(capGuide);


    // =======================================
    // CAP DELIVERY PIPE
    // =======================================

    const capPipe = new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.15, 7, 16),
        steel
    );

    capPipe.rotation.z = -0.55;
    capPipe.position.set(4.8, 11.4, 0);

    g.add(capPipe);
    // =======================================
    // CAPPING SPRINGS
    // =======================================

    for (let i = 0; i < 12; i++) {

        const angle = i * Math.PI * 2 / 12;

        const spring = new THREE.Mesh(

            new THREE.TorusGeometry(0.18, 0.04, 8, 16),

            darkSteel

        );

        spring.rotation.x = Math.PI / 2;

        spring.position.set(

            Math.cos(angle) * 3.1,

            6,

            Math.sin(angle) * 3.1

        );

        g.add(spring);

    }
    // =======================================
    // MACHINE VENTS
    // =======================================

    for (let i = 0; i < 8; i++) {

        const vent = new THREE.Mesh(

            new THREE.BoxGeometry(1.5, 0.05, 0.05),

            darkSteel

        );

        vent.rotation.z = Math.PI / 2;

        vent.position.set(

            -9.9,

            2.8 + i * 0.45,

            -3

        );

        g.add(vent);

    }


    // =======================================
    // MACHINE BOLTS
    // =======================================

    const boltGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.08, 8);

    for (let x of [-9, 9]) {

        for (let z of [-5, 5]) {

            const bolt = new THREE.Mesh(

                boltGeo,

                darkSteel

            );

            bolt.position.set(x, 8.4, z);

            g.add(bolt);

        }

    }


    // =======================================
    // RUBBER FEET
    // =======================================

    for (let x of [-8, 8]) {

        for (let z of [-5, 5]) {

            const foot = new THREE.Mesh(

                new THREE.CylinderGeometry(0.35, 0.35, 0.3, 20),

                blackPlastic

            );

            foot.position.set(x, -3.8, z);

            g.add(foot);

        }

    }

    // =======================================
    // NAME PLATE
    // =======================================

    const plate = new THREE.Mesh(

        new THREE.PlaneGeometry(3, 0.8),
        namePlate

    );

    plate.position.set(7, 6.5, 6.15);

    g.add(plate);
    const rearGlass = new THREE.Mesh(
        new THREE.BoxGeometry(17, 8, 0.12),
        glass
    );

    rearGlass.position.set(
        0,
        5,
        -6.25
    );

    g.add(rearGlass);
    return g;
}