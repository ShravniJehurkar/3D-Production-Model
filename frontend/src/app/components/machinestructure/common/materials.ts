import * as THREE from 'three';

// ===========================
// Metals
// ===========================

export const steel = new THREE.MeshPhysicalMaterial({
    color: 0xd8d8d8,
    metalness: 1,
    roughness: 0.22,
    clearcoat: 0.4
});

export const darkSteel = new THREE.MeshStandardMaterial({
    color: 0x858585,
    metalness: 0.9,
    roughness: 0.35
});
export const fillerFrame = new THREE.MeshPhysicalMaterial({
    color: 0xcfd5db,
    metalness: 0.95,
    roughness: 0.28,
    clearcoat: 0.4
});
export const fillerBody = new THREE.MeshPhysicalMaterial({
    color: 0x555555,      
    metalness: 0.25,
    roughness: 0.45,
    clearcoat: 0.3,
    clearcoatRoughness: 0.15
});
export const lightSteel = new THREE.MeshStandardMaterial({
    color: 0xf2f2f2,
    metalness: 0.9,
    roughness: 0.18
});
export const belt = new THREE.MeshStandardMaterial({
    color: 0x2a2a2a
});
export const wireMaterial = new THREE.MeshStandardMaterial({

            color: 0x8d8d8d,

            roughness: 0.8,

            metalness: 0.7

        });
// ======================================
// SAFETY FENCE POSTS
// ======================================

export const postMat = new THREE.MeshStandardMaterial({
    color: 0xf2d100,
    metalness: 0.7,
    roughness: 0.35
});

export const meshMat = new THREE.MeshStandardMaterial({
    color: 0xbdbdbd,
    wireframe: true
});

// ===========================
// Machine Colors
// ===========================
export const yellow = new THREE.MeshStandardMaterial({
    color: 0xffc107,
    metalness: 0.55,
    roughness: 0.35
});

export const machineBody = new THREE.MeshPhysicalMaterial({
    color: 0xf5f6f7,
    metalness: 0.12,
    roughness: 0.28,
    clearcoat: 0.45,
    clearcoatRoughness: 0.08
});

export const black = new THREE.MeshPhysicalMaterial({
    color: 0x5f5f5f,
    metalness: 0.8,
    roughness: 0.4
});

// ===========================
// Conveyor
// ===========================

export const conveyorBelt = new THREE.MeshStandardMaterial({
    color: 0x515151,
    roughness: 0.95
});

export const conveyorFrame = new THREE.MeshStandardMaterial({
    color: 0xbbbbbb,
    metalness: 0.75,
    roughness: 0.35
});

export const conveyorRoller = new THREE.MeshStandardMaterial({
    color: 0xe0e0e0,
    metalness: 1,
    roughness: 0.12
});

// ===========================
// Plastic
// ===========================

export const blackPlastic = new THREE.MeshStandardMaterial({
    color: 0x555555,
    roughness: 0.9
});
// ===========================
// Glass
// ===========================

export const glass = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.22,
    ior: 1.5,
    transmission: 1,
    roughness: 0,
    thickness: 0.5
});

// ===========================
// LED
// ===========================
export const inspectionLight = new THREE.MeshStandardMaterial({
    color: 0xffffcc,
    emissive: 0xffff88
});
export const scannerBlue = new THREE.MeshStandardMaterial({
    color: 0x0088ff,
    emissive: 0x0044aa
});
export const mirror = new THREE.MeshStandardMaterial({
    color: 0xe8e8e8,
    metalness: 1,
    roughness: 0
});
// ===========================
// Safety
// ===========================

export const safetyGlass = new THREE.MeshPhysicalMaterial({

    color: 0xd8f4ff,

    transparent: true,

    opacity: 0.35,

    transmission: 0.95,

    thickness: 0.5,

    roughness: 0,

    metalness: 0,
    depthWrite: false,

    ior: 1.52,

    clearcoat: 1,

    clearcoatRoughness: 0,

    side: THREE.DoubleSide

});
// ===========================
// Rubber
// ===========================

export const rubber = new THREE.MeshStandardMaterial({
    color: 0x111111,
    roughness: 1
});
export const wood = new THREE.MeshStandardMaterial({
    color: 0xb88450
});
// ===========================
// Displays
// ===========================

export const hmiScreen = new THREE.MeshStandardMaterial({
    color: 0x55ddff,
    emissive: 0x0088aa
});

// ===========================
// Buttons
// ===========================

export const greenButton = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
    emissive: 0x004400
});

export const yellowButton = new THREE.MeshStandardMaterial({
    color: 0xffff00,
    emissive: 0x444400
});

export const redButton = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    emissive: 0x440000
});

// ===========================
// Sensors
// ===========================

export const sensorBlue = new THREE.MeshStandardMaterial({
    color: 0x0066ff,
    emissive: 0x003366
});
// ===========================
// Labels
// ===========================

export const warningLabel = new THREE.MeshBasicMaterial({
    color: 0xffcc00,
    side: THREE.DoubleSide
});

export const namePlate = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
});