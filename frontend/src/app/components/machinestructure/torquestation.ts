import * as THREE from 'three';
import { steel, darkSteel, black, hmiScreen, lightSteel } from './common/materials';
export function createTorqueStation(): THREE.Group {

    const g = new THREE.Group();

    // =======================================
    // MAIN CABINET
    // =======================================

    const cabinet = new THREE.Mesh(

        new THREE.BoxGeometry(9, 11, 8),

        steel

    );

    cabinet.position.set(0, 5.5, 0);

    g.add(cabinet);


    // Front Door

    const frontDoor = new THREE.Mesh(

        new THREE.BoxGeometry(7.7, 10.6, 0.08),

        lightSteel

    );

    frontDoor.position.set(0, 6, 4.04);

    g.add(frontDoor);
    // =======================================
    // TORQUE HEAD SUPPORT
    // =======================================

    const column = new THREE.Mesh(

        new THREE.BoxGeometry(1.2, 8, 1.2),

        steel

    );

    column.position.set(0, 10, 0);

    g.add(column);

    // =======================================
    // TORQUE SPINDLE
    // =======================================

    const spindle = new THREE.Mesh(

        new THREE.CylinderGeometry(0.22, 0.22, 3.8, 20),

        darkSteel

    );

    spindle.position.set(0, 8.2, 0);

    g.add(spindle);


    // =======================================
    // TORQUE CHUCK
    // =======================================

    const chuck = new THREE.Mesh(

        new THREE.CylinderGeometry(0.45, 0.45, 0.7, 20),

        black

    );

    chuck.position.set(0, 6.2, 0);

    g.add(chuck);
    // =======================================
    // HMI SUPPORT
    // =======================================

    const hmiPole = new THREE.Mesh(

        new THREE.CylinderGeometry(0.12, 0.12, 5, 16),

        steel

    );

    hmiPole.position.set(6.5, 8.5, 3);

    g.add(hmiPole);


    // =======================================
    // HMI
    // =======================================

    const hmi = new THREE.Mesh(

        new THREE.BoxGeometry(3.5, 2.4, 0.45),

        black

    );

    hmi.position.set(6.5, 11.2, 3);

    g.add(hmi);

    const screen = new THREE.Mesh(

        new THREE.BoxGeometry(2.7, 1.7, 0.05),

        hmiScreen

    );

    screen.position.set(6.5, 11.2, 3.25);

    g.add(screen);
    // =======================================
    // TOWER LIGHT
    // =======================================

    const towerPole = new THREE.Mesh(

        new THREE.CylinderGeometry(0.08, 0.08, 4, 12),

        steel

    );

    towerPole.position.set(-3, 12, 3);

    g.add(towerPole);

    const green = new THREE.Mesh(

        new THREE.SphereGeometry(0.22),

        new THREE.MeshStandardMaterial({

            color: 0x00ff00,

            emissive: 0x004400

        })

    );

    green.position.set(-3, 14.2, 3);

    const amber = new THREE.Mesh(

        new THREE.SphereGeometry(0.22),

        new THREE.MeshStandardMaterial({

            color: 0xffff00,

            emissive: 0x444400

        })

    );

    amber.position.set(-3, 13.8, 3);

    const red = new THREE.Mesh(

        new THREE.SphereGeometry(0.22),

        new THREE.MeshStandardMaterial({

            color: 0xff0000,

            emissive: 0x440000

        })

    );

    red.position.set(-3, 13.4, 3);

    g.add(green, amber, red);
    // =======================================
    // ELECTRICAL CABINET
    // =======================================

    const controlcabinet = new THREE.Mesh(

        new THREE.BoxGeometry(4.5, 10, 4.5),

        steel

    );

    controlcabinet.position.set(11, 5, -3);

    g.add(controlcabinet);


    // Front Door

    const controlcabinetDoor = new THREE.Mesh(

        new THREE.BoxGeometry(4.35, 9.8, 0.08),

        lightSteel

    );

    controlcabinetDoor.position.set(8.76, 5, -3);

    g.add(controlcabinetDoor);


    // Handle

    const handle = new THREE.Mesh(

        new THREE.CylinderGeometry(0.05, 0.05, 0.8, 8),

        darkSteel

    );

    handle.rotation.z = Math.PI / 2;

    handle.position.set(8.55, 5, -1.5);

    g.add(handle);

    // =======================================
    // SERVO MOTOR
    // =======================================

    const servoMotor = new THREE.Mesh(

        new THREE.CylinderGeometry(0.8, 0.8, 3.5, 24),

        darkSteel

    );

    servoMotor.rotation.z = Math.PI / 2;

    servoMotor.position.set(-5, 3, -2);

    g.add(servoMotor);


    // Gearbox

    const gearbox = new THREE.Mesh(

        new THREE.BoxGeometry(1.6, 1.6, 1.6),

        steel

    );

    gearbox.position.set(-6.4, 5, -3);

    g.add(gearbox);
    // =======================================
    // INTERNAL FRAME
    // =======================================

    for (let x of [-3, 3]) {

        for (let z of [-2.5, 2.5]) {

            const frame = new THREE.Mesh(

                new THREE.BoxGeometry(0.22, 4, 0.22),

                steel

            );

            frame.position.set(

                x,

                1,

                z

            );

            g.add(frame);

        }

    }


    // =======================================
    // MACHINE NAME PLATE
    // =======================================

    const plate = new THREE.Mesh(

        new THREE.PlaneGeometry(2.6, 0.8),

        new THREE.MeshBasicMaterial({

            color: 0xffffff,

            side: THREE.DoubleSide

        })

    );

    plate.position.set(

        0,

        7.5,

        4.08

    );

    g.add(plate);
    // =======================================
    // BARCODE SCANNER
    // =======================================

    const scannerBody = new THREE.Mesh(

        new THREE.BoxGeometry(1.2, 0.9, 0.9),

        black

    );

    scannerBody.position.set(6.8, 6.8, 2.3);

    g.add(scannerBody);

    const scannerLens = new THREE.Mesh(

        new THREE.CylinderGeometry(0.18, 0.18, 0.4, 16),

        new THREE.MeshStandardMaterial({

            color: 0x0099ff,

            emissive: 0x004488

        })

    );

    scannerLens.rotation.x = Math.PI / 2;

    scannerLens.position.set(6.8, 6.8, 2.82);

    g.add(scannerLens);

    // =======================================
    // DOOR HANDLE
    // =======================================

    const doorHandle = new THREE.Mesh(

        new THREE.CylinderGeometry(0.05, 0.05, 1.2, 10),

        darkSteel

    );

    doorHandle.rotation.z = Math.PI / 2;

    doorHandle.position.set(

        3.2,

        8,

        4.15

    );

    g.add(doorHandle);

    // =======================================
    // FINAL SCALE
    // =======================================
    return g;
}