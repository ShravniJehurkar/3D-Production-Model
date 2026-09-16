import * as THREE from 'three';
import {
    steel,
    darkSteel,
    yellow,
    black
} from './materials';

export function createIndustrialRobot(): THREE.Group {

    const robot = new THREE.Group();

    // ======================================
    // WAIST
    // ======================================

    const waist = new THREE.Mesh(
        new THREE.CylinderGeometry(1.4, 1.7, 2, 32),
        yellow
    );

    waist.position.set(0, 0, 0);

    robot.add(waist);

    // ======================================
    // LOWER COLUMN
    // ======================================

    const column = new THREE.Mesh(
        new THREE.CylinderGeometry(0.9, 1.1, 5, 32),
        yellow
    );

    column.position.set(0, 3.5, 0);

    robot.add(column);

    // ======================================
    // SHOULDER
    // ======================================

    const shoulderHousing = new THREE.Mesh(
        new THREE.CylinderGeometry(1.7, 1.7, 2.8, 32),
        yellow
    );

    shoulderHousing.rotation.x = Math.PI / 2;
    shoulderHousing.position.set(0, 6.8, 0);

    robot.add(shoulderHousing);

    const shoulderJoint = new THREE.Mesh(
        new THREE.CylinderGeometry(1.05, 1.05, 3.4, 32),
        steel
    );

    shoulderJoint.rotation.x = Math.PI / 2;
    shoulderJoint.position.set(0, 6.8, 0);

    robot.add(shoulderJoint);

    const shoulderLeft = new THREE.Mesh(
        new THREE.CylinderGeometry(1.15, 1.15, 0.4, 32),
        darkSteel
    );

    shoulderLeft.rotation.x = Math.PI / 2;
    shoulderLeft.position.set(0, 6.8, -1.8);

    robot.add(shoulderLeft);

    const shoulderRight = shoulderLeft.clone();
    shoulderRight.position.z = 1.8;

    robot.add(shoulderRight);

    const shoulderMotor = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, 2.4, 32),
        black
    );

    shoulderMotor.rotation.x = Math.PI / 2;
    shoulderMotor.position.set(0, 6.5, 0);

    robot.add(shoulderMotor);

    // ======================================
    // UPPER ARM
    // ======================================

    const upperArm = new THREE.Mesh(
        new THREE.BoxGeometry(6.8, 2.7, 2.7),
        yellow
    );

    upperArm.rotation.z = -0.45;
    upperArm.position.set(3.1, 9.2, 0);

    robot.add(upperArm);

    const upperTop = new THREE.Mesh(
        new THREE.BoxGeometry(6.2, 0.45, 3),
        steel
    );

    upperTop.rotation.z = -0.45;
    upperTop.position.set(3.1, 10.35, 0);

    robot.add(upperTop);

    const upperBottom = upperTop.clone();
    upperBottom.position.y = 8.05;

    robot.add(upperBottom);

    const upperLeft = new THREE.Mesh(
        new THREE.BoxGeometry(6.2, 2.1, 0.28),
        steel
    );

    upperLeft.rotation.z = -0.45;
    upperLeft.position.set(3.1, 9.2, -1.5);

    robot.add(upperLeft);

    const upperRight = upperLeft.clone();
    upperRight.position.z = 1.5;

    robot.add(upperRight);

    // ======================================
    // ELBOW
    // ======================================

    const elbowHousing = new THREE.Mesh(
        new THREE.CylinderGeometry(1.4, 1.4, 2.4, 32),
        yellow
    );

    elbowHousing.rotation.x = Math.PI / 2;
    elbowHousing.position.set(6.2, 12.4, 0);

    robot.add(elbowHousing);

    const elbowJoint = new THREE.Mesh(
        new THREE.CylinderGeometry(0.95, 0.95, 3.1, 32),
        steel
    );

    elbowJoint.rotation.x = Math.PI / 2;
    elbowJoint.position.set(6.2, 12.4, 0);

    robot.add(elbowJoint);

    const elbowLeft = new THREE.Mesh(
        new THREE.CylinderGeometry(1.05, 1.05, 0.35, 32),
        darkSteel
    );

    elbowLeft.rotation.x = Math.PI / 2;
    elbowLeft.position.set(6.2, 12.4, -1.6);

    robot.add(elbowLeft);

    const elbowRight = elbowLeft.clone();
    elbowRight.position.z = 1.6;

    robot.add(elbowRight);

    const elbowGear = new THREE.Mesh(
        new THREE.BoxGeometry(1.6, 1.8, 1.8),
        yellow
    );

    elbowGear.position.set(5.1, 12.6, 0);

    robot.add(elbowGear);

    // ======================================
    // FOREARM
    // ======================================

    const foreArm = new THREE.Group();

    const mainBody = new THREE.Mesh(
        new THREE.BoxGeometry(6.8, 1.8, 1.8),
        yellow
    );

    foreArm.add(mainBody);

    const nose = new THREE.Mesh(
        new THREE.CylinderGeometry(0.9, 0.9, 2.2, 24),
        yellow
    );

    nose.rotation.z = Math.PI / 2;
    nose.position.x = 3.6;

    foreArm.add(nose);

    const cover = new THREE.Mesh(
        new THREE.BoxGeometry(1, 0.8, 0.05),
        darkSteel
    );

    cover.position.set(0.8, 0, 0.95);

    foreArm.add(cover);

    foreArm.rotation.z = 0.8;
    foreArm.position.set(9, 9.9, 0);

    robot.add(foreArm);

    // ======================================
    // WRIST
    // ======================================

    const wristHousing = new THREE.Mesh(
        new THREE.BoxGeometry(2.2, 2.2, 2.2),
        yellow
    );

    wristHousing.rotation.z = 0.25;
    wristHousing.position.set(11.4, 7.2, 0);

    robot.add(wristHousing);

    const wristJoint = new THREE.Mesh(
        new THREE.CylinderGeometry(0.7, 0.7, 2.5, 24),
        steel
    );

    wristJoint.rotation.x = Math.PI / 2;
    wristJoint.position.set(11.4, 7.2, 0);

    robot.add(wristJoint);

    const wristCap1 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.82, 0.82, 0.3, 24),
        darkSteel
    );

    wristCap1.rotation.x = Math.PI / 2;
    wristCap1.position.set(11.4, 7.2, -1.3);

    robot.add(wristCap1);

    const wristCap2 = wristCap1.clone();
    wristCap2.position.z = 1.3;

    robot.add(wristCap2);

    const flange = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 0.5, 0.8, 20),
        steel
    );

    flange.rotation.z = Math.PI / 2;
    flange.position.set(12.8, 6.5, 0);

    robot.add(flange);
    //======================================
    // VACUUM GRIPPER FRAME
    //======================================

    const gripperFrame = new THREE.Mesh(

        new THREE.BoxGeometry(2.8, 0.35, 2.8),

        darkSteel

    );

    gripperFrame.position.set(
        14.1,
        5.8,
        0
    );

    robot.add(gripperFrame);


    //======================================
    // VACUUM CUPS
    //======================================

    for (let x of [-0.9, 0, 0.9]) {

        for (let z of [-0.9, 0, 0.9]) {

            const cup = new THREE.Mesh(

                new THREE.CylinderGeometry(
                    0.12,
                    0.18,
                    0.45,
                    12
                ),

                black

            );

            cup.position.set(

                14.1 + x,

                5.35,

                z

            );

            robot.add(cup);

        }

    }


    //======================================
    // AIR MANIFOLD
    //======================================

    const manifold = new THREE.Mesh(

        new THREE.BoxGeometry(
            1.4,
            0.45,
            0.45
        ),

        steel

    );

    manifold.position.set(
        13.2,
        6.4,
        0
    );

    robot.add(manifold);


    //======================================
    // VACUUM GENERATOR
    //======================================

    const vacuumUnit = new THREE.Mesh(

        new THREE.BoxGeometry(
            1.4,
            1,
            0.9
        ),

        darkSteel

    );

    vacuumUnit.position.set(
        12,
        7,
        0
    );

    robot.add(vacuumUnit);
    return robot;

}