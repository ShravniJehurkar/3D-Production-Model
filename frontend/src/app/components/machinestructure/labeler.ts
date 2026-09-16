import * as THREE from 'three';

import { steel, darkSteel, black, glass} from './common/materials';
export function createLabeler(): THREE.Group {
    const g = new THREE.Group();

    const leftColumn = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 8, 0.4),
        darkSteel
    );

    leftColumn.position.set(-9, 4, 5);

    g.add(leftColumn);
    const rightColumn = leftColumn.clone();

    rightColumn.position.x = 9;

    g.add(rightColumn);
    const rearLeft = leftColumn.clone();
    rearLeft.position.z = -5;

    g.add(rearLeft);

    const rearRight = rightColumn.clone();
    rearRight.position.z = -5;

    g.add(rearRight);
    const roof = new THREE.Mesh(

        new THREE.BoxGeometry(18, 0.4, 10),

        darkSteel

    );

    roof.position.y = 8.2;

    g.add(roof);
    const inspectionWindow = new THREE.Mesh(

        new THREE.BoxGeometry(

            20,

            8,

            0.12

        ),

       glass

    );

    inspectionWindow.position.set(

        2,

        5,

        4.1

    );

    g.add(inspectionWindow);
    // ================= LEGS =================

    const legGeo = new THREE.BoxGeometry(0.8, 6, 0.8);

    const legPos = [
        [-8, -4],
        [8, -4],
        [-8, 4],
        [8, 4]
    ];

    legPos.forEach(p => {

        const leg = new THREE.Mesh(
            legGeo,
            darkSteel
        );

        leg.position.set(p[0], -0.5, p[1]);

        g.add(leg);

    });

    // ================= LEVELING FEET =================

    legPos.forEach(p => {

        const foot = new THREE.Mesh(

            new THREE.CylinderGeometry(0.45, 0.45, 0.2, 16),

            steel

        );

        foot.position.set(p[0], -3.6, p[1]);

        g.add(foot);

    });
    // ================= MACHINE BASE =================

    const base = new THREE.Mesh(

        new THREE.BoxGeometry(18, 1, 8),

        new THREE.MeshStandardMaterial({
            color: 0x666666,
            metalness: 0.8
        })

    );

    base.position.y = 0;

    g.add(base);

    // ===========================
    // LABEL ROLL STAND
    // ===========================

    const stand = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.3, 8, 16),
        darkSteel
    );
    stand.position.set(0, 10, 4);

    g.add(stand);

    // Top Arm
    const topArm = new THREE.Mesh(
        new THREE.BoxGeometry(5, 0.5, 0.5),
        darkSteel
    );

    topArm.position.set(2.5, 13, 4);

    g.add(topArm);

    // ===========================
    // LABEL ROLL
    // ===========================

    const rollOuter = new THREE.Mesh(
        new THREE.CylinderGeometry(2.2, 2.2, 1.2, 40),
        new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.5
        })
    );

    rollOuter.rotation.z = Math.PI / 2;
    rollOuter.position.set(5, 9.5, 4);

    g.add(rollOuter);

    const rollInner = new THREE.Mesh(
        new THREE.CylinderGeometry(0.6, 0.6, 1.3, 32),
        darkSteel
    );

    rollInner.rotation.z = Math.PI / 2;
    rollInner.position.set(5, 9.5, 4);

    g.add(rollInner);

    // ===========================
    // GUIDE ROLLERS
    // ===========================

    const guideGeo = new THREE.CylinderGeometry(0.4, 0.4, 1, 20);

    const guidePos = [
        [2, 11, 4],
        [5, 10, 4],
        [8, 9, 4],
        [5, 8, 4]
    ];

    guidePos.forEach(p => {

        const roller = new THREE.Mesh(
            guideGeo,
            steel
        );

        roller.rotation.z = Math.PI / 2;

        roller.position.set(
            p[0],
            p[1],
            p[2]
        );

        g.add(roller);

    });

    // ===========================
    // LABEL APPLICATOR
    // ===========================

    const applicator = new THREE.Mesh(

        new THREE.BoxGeometry(3, 4, 3),

        darkSteel

    );

    applicator.position.set(5, 9, 2.5);

    g.add(applicator);

    // Applicator Nozzle

    const nozzle = new THREE.Mesh(

        new THREE.BoxGeometry(1.5, 1.5, 2),

        steel

    );

    nozzle.position.set(5, 7.8, 1.5);

    g.add(nozzle);

    // ===========================
    // SENSOR
    // ===========================

    const sensor = new THREE.Mesh(

        new THREE.BoxGeometry(0.5, 1, 0.5),

        new THREE.MeshStandardMaterial({
            color: 0x0066ff
        })

    );

    sensor.position.set(6.5, 6, 2.2);

    g.add(sensor);

    // ===========================
    // MOTOR
    // ===========================

    const motor = new THREE.Mesh(

        new THREE.CylinderGeometry(1, 1, 4, 24),

        new THREE.MeshStandardMaterial({

            color: 0x666666,

            metalness: 0.9

        })

    );

    motor.rotation.z = Math.PI / 2;

    motor.position.set(-9, 2, -3);

    g.add(motor);

    // ===========================
    // GEARBOX
    // ===========================

    const gearBox = new THREE.Mesh(

        new THREE.BoxGeometry(2, 2, 2),

        steel

    );

    gearBox.position.set(-7, 2, -3);

    g.add(gearBox);

    // ===========================
    // DRIVE SHAFT
    // ===========================

    const shaft = new THREE.Mesh(

        new THREE.CylinderGeometry(0.15, 0.15, 6, 12),

        steel

    );

    shaft.rotation.z = Math.PI / 2;

    shaft.position.set(-3.5, 2, -3);

    g.add(shaft);

    // ===========================
    // SIDE ELECTRICAL CABINET
    // ===========================

    const cabinet = new THREE.Mesh(

        new THREE.BoxGeometry(4, 7, 4),

        steel

    );

    cabinet.position.set(-8.5, 4.5, 0);

    g.add(cabinet);

    // Cabinet Door

    const cabinetDoor = new THREE.Mesh(

        new THREE.BoxGeometry(3.8, 6.8, 0.15),

        darkSteel

    );

    cabinetDoor.position.set(-9.05, 4.5, 0);

    g.add(cabinetDoor);

    // Door Handle

    const handle = new THREE.Mesh(

        new THREE.CylinderGeometry(0.08, 0.08, 1, 8),

        steel

    );

    handle.rotation.z = Math.PI / 2;

    handle.position.set(-8.8, 4.5, 1);

    g.add(handle);

    // ===========================
    // CABLE TRAY
    // ===========================

    const cableTray = new THREE.Mesh(

        new THREE.BoxGeometry(8, 0.4, 0.8),

        darkSteel

    );

    cableTray.position.set(0, 14, -4.8);

    g.add(cableTray);
    // ===========================
    // HMI SUPPORT
    // ===========================

    const hmiPole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.15, 7, 16),
        darkSteel
    );

    hmiPole.position.set(11, 4, 4);

    g.add(hmiPole);

    // ===========================
    // HMI SCREEN
    // ===========================

    const hmi = new THREE.Mesh(
        new THREE.BoxGeometry(3.2, 2.6, 0.4),
        new THREE.MeshStandardMaterial({
            color: 0x222222
        })
    );

    hmi.position.set(11, 7.5, 4);

    g.add(hmi);

    // Display

    const display = new THREE.Mesh(
        new THREE.BoxGeometry(2.7, 2, 0.05),
        new THREE.MeshStandardMaterial({
            color: 0x3ad7ff,
            emissive: 0x0066aa
        })
    );

    display.position.set(11, 8, 4.23);

    g.add(display);

    // ===========================
    // HMI BUTTONS
    // ===========================

    for (let i = -1; i <= 1; i++) {

        const btn = new THREE.Mesh(

            new THREE.CylinderGeometry(0.08, 0.08, 0.1, 12),

            new THREE.MeshStandardMaterial({
                color: 0x00cc00
            })

        );

        btn.rotation.x = Math.PI / 2;

        btn.position.set(
            10.3 + i * 0.35,
            6.8,
            4.25
        );

        g.add(btn);

    }

    // ===========================
    // TOWER LIGHT
    // ===========================

    const towerPole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 4, 12),
        steel
    );

    towerPole.position.set(-7, 8.5, 5);

    g.add(towerPole);

    const red = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 16, 16),
        new THREE.MeshStandardMaterial({
            color: 0xff0000,
            emissive: 0x440000
        })
    );

    red.position.set(-7, 10, 5);

    const yellow = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 16, 16),
        new THREE.MeshStandardMaterial({
            color: 0xffff00,
            emissive: 0x444400
        })
    );

    yellow.position.set(-7, 9.6, 5);

    const green = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 16, 16),
        new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            emissive: 0x004400
        })
    );

    green.position.set(-7, 9.2, 5);

    g.add(red, yellow, green);

    // ===========================
    // PHOTOELECTRIC SENSOR
    // ===========================

    const sensorPole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 2, 12),
        darkSteel
    );

    sensorPole.position.set(4, 4, 2.4);

    g.add(sensorPole);

    const sensorHead = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.4, 0.4),
        new THREE.MeshStandardMaterial({
            color: 0x0055ff
        })
    );

    sensorHead.position.set(4, 5.2, 2.4);

    g.add(sensorHead);

    // ===========================
    // MACHINE VENTS
    // ===========================

    for (let i = 0; i < 6; i++) {

        const vent = new THREE.Mesh(

            new THREE.BoxGeometry(2, 0.08, 0.08),

            darkSteel

        );

        vent.position.set(
            -10.3,
            5 + i * 0.5,
            0
        );

        vent.rotation.z = Math.PI / 2;

        g.add(vent);

    }
    // ===========================
    // CABLES
    // ===========================

    const cableMat = new THREE.MeshStandardMaterial({
        color: 0x111111
    });

    const cable1 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 6, 10),
        cableMat
    );

    cable1.rotation.z = Math.PI / 4;
    cable1.position.set(3, 16, 4);

    g.add(cable1);

    const cable2 = cable1.clone();
    cable2.rotation.z = -Math.PI / 6;
    cable2.position.set(-2, 13, -4);

    g.add(cable2);
    // ===========================
    // LABEL WEB (Paper)
    // ===========================

    const labelStrip = new THREE.Mesh(

        new THREE.BoxGeometry(0.1, 8, 0.8),

        new THREE.MeshStandardMaterial({
            color: 0xffffff
        })

    );

    labelStrip.rotation.z = 0.5;
    labelStrip.position.set(5, 10.8, 4);

    g.add(labelStrip);

    // ===========================
    // LABELS
    // ===========================

    for (let i = 0; i < 6; i++) {

        const label = new THREE.Mesh(

            new THREE.PlaneGeometry(0.6, 0.45),

            new THREE.MeshBasicMaterial({
                color: 0xf5f5f5,
                side: THREE.DoubleSide
            })

        );

        label.rotation.y = Math.PI / 2;

        label.position.set(
            5,
            8.5 + i * 0.45,
            4.45
        );

        g.add(label);

    }

    // ===========================
    // MACHINE BOLTS
    // ===========================

    const boltGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.1, 10);

    for (let x of [-9, 9]) {

        for (let z of [-4, 4]) {

            const bolt = new THREE.Mesh(
                boltGeo,
                darkSteel
            );

            bolt.position.set(x, 12.4, z);

            g.add(bolt);

        }

    }

    // ===========================
    // RUBBER FEET
    // ===========================

    for (let x of [-8, 8]) {

        for (let z of [-4, 4]) {

            const foot = new THREE.Mesh(

                new THREE.CylinderGeometry(0.35, 0.35, 0.25, 20),

                black

            );

            foot.position.set(x, -3.8, z);

            g.add(foot);

        }

    }
    return g;
}