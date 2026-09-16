import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { Machine } from '../models/machine';

import {
  createCapper,
  createCheckWeigher,
  createDepalletizer,
  createFiller,
  createLabeler,
  createPalletizer,
  createQualityStation,
  createRoBoArm,
  createStack,
  createTorqueStation
} from '../components/machinestructure';
@Injectable({
  providedIn: 'root',
})
export class MachineRenderService {
  createMachineShape(machine: Machine): THREE.Object3D {
    // console.log('Creating machine:', machine);
    switch ((machine.type || '').trim()) {
      case 'Palletizer':
        return this.cloneMachineMaterials(createPalletizer());
      case 'Labeler':
        return this.cloneMachineMaterials(createLabeler());
      case 'Filler':
        return this.cloneMachineMaterials(createFiller(false));
      case 'Capper':
        return this.cloneMachineMaterials(createCapper(false));
      case 'CheckWeigher':
        return this.cloneMachineMaterials(createCheckWeigher());
      case 'QualityStation':
        return this.cloneMachineMaterials(createQualityStation());
      case 'TorqueStation':
        return this.cloneMachineMaterials(createTorqueStation());
      case 'Depalletizer':
        return this.cloneMachineMaterials(createDepalletizer());
      case 'RoBoArm':
        return this.cloneMachineMaterials(createRoBoArm());
      case 'Stack':
        return this.cloneMachineMaterials(createStack());
      default:
        return new THREE.Group();
    }
  }
  updateMachineStatus(machines: Machine[], machineMeshes: Map<string, THREE.Object3D>, alarmFocusId: string | null, blink: boolean): void {
    for (const machine of machines) {
      const obj = machineMeshes.get(machine.id);
      if (!obj) continue;
      const isAlarm = machine.id === alarmFocusId;
      obj.traverse(child => {
        if (!(child instanceof THREE.Mesh)) return;
        const mat = child.material;
        if (!mat || Array.isArray(mat)) return;
        if ('emissive' in mat) {
          const material = mat as THREE.MeshStandardMaterial | THREE.MeshPhongMaterial;
          if (isAlarm) {
            material.emissive?.set(blink ? 0xea3c53  : 0x000000);
          } else {
            material.emissive.set(0x000000);
          }
        }
      });
    }
  }
  private cloneMachineMaterials(machine: THREE.Object3D): THREE.Object3D {

    machine.traverse(child => {

      if (!(child instanceof THREE.Mesh)) return;

      if (Array.isArray(child.material)) {

        child.material = child.material.map(m => m.clone());

      } else {

        child.material = child.material.clone();

      }

    });

    return machine;

  }
}
