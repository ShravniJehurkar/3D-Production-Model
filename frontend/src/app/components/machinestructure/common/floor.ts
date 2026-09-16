import * as THREE from 'three';

export function createFactoryBase(): {

    ground: THREE.Group;

    platform: THREE.Group;

} {

    const ground = new THREE.Group();

    const platform = new THREE.Group();

    // ==========================================
    // WORLD GROUND
    // ==========================================

    const groundMat = new THREE.MeshStandardMaterial({

        color: 0x7d7d7d,

    });

    const worldGround = new THREE.Mesh(

        new THREE.PlaneGeometry(260, 200),

        groundMat

    );

    worldGround.rotation.x = -Math.PI / 2;

    worldGround.position.y = -0.05;

    worldGround.receiveShadow = true;

    ground.add(worldGround);

    // ==========================================
    // FACTORY PLATFORM
    // ==========================================

    const platformMat = new THREE.MeshStandardMaterial({

        color: 0xe3e3e3,

        roughness: 0.9,

        metalness: 0

    });

    const factoryPlatform = new THREE.Mesh(

        new THREE.BoxGeometry(

            240,

            0.25,

            160

        ),

        platformMat

    );

    factoryPlatform.position.y = 0.125;

    factoryPlatform.receiveShadow = true;

    platform.add(factoryPlatform);
    // ==========================================
    // EXPANSION JOINTS
    // ==========================================

    const jointMat = new THREE.LineBasicMaterial({
        color: 0xb8b8b8
    });

    // Vertical joints
    for (let x = -120; x <= 120; x += 20) {

        const geo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(x, 0.26, -80),
            new THREE.Vector3(x, 0.26, 80)
        ]);

        platform.add(new THREE.Line(geo, jointMat));
    }

    // Horizontal joints
    for (let z = -80; z <= 80; z += 20) {

        const geo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-120, 0.26, z),
            new THREE.Vector3(120, 0.26, z)
        ]);

        platform.add(new THREE.Line(geo, jointMat));
    }
    // ==========================================
    // PLATFORM BORDER
    // ==========================================

    const borderMat = new THREE.MeshStandardMaterial({

        color: 0x9c9c9c,

        roughness: 0.9

    });

    const borderThickness = 1;

    const borderHeight = 0.35;

    // Front

    const front = new THREE.Mesh(

        new THREE.BoxGeometry(240, borderHeight, borderThickness),

        borderMat

    );

    front.position.set(0, 0.175, 80.5);

    platform.add(front);

    // Back

    const back = front.clone();

    back.position.z = -80.5;

    platform.add(back);

    // Left

    const left = new THREE.Mesh(

        new THREE.BoxGeometry(borderThickness, borderHeight, 160),

        borderMat

    );

    left.position.set(-120.5, 0.175, 0);

    platform.add(left);

    // Right

    const right = left.clone();

    right.position.x = 120.5;

    platform.add(right);

    return {

        ground,

        platform

    };
}