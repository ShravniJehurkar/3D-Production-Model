import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class ConveyorRouterService {

  createRoute(start: THREE.Vector3, end: THREE.Vector3) {

    const dx = Math.abs(end.x - start.x);
    const dz = Math.abs(end.z - start.z);

    // Straight conveyor if already aligned
    if (dx < 0.1 || dz < 0.1) {
      return [{
        start: start.clone(),
        end: end.clone()
      }];
    }

    const middle =
      dx >= dz
        ? new THREE.Vector3(end.x, start.y, start.z)
        : new THREE.Vector3(start.x, start.y, end.z);

    return [
      {
        start: start.clone(),
        end: middle
      },
      {
        start: middle,
        end: end.clone()
      }
    ];
  }
}