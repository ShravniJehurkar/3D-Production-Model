import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { MACHINE_CONFIG } from '../config/machine-config';
import { FACTORY_CONFIG } from '../config/factory-config';
import { createConveyorSegment } from '../components/machinestructure/common/conveyor-system';
import { Machine } from '../models/machine';
import { ConveyorRouterService } from './conveyor-router.service';
@Injectable({
  providedIn: 'root'
})


export class ConveyorService {

  constructor(
    private router: ConveyorRouterService
  ) { }
  private getRotationOffset(
    x: number,
    z: number,
    rotation: number = 0
  ): THREE.Vector2 {

    const angle = THREE.MathUtils.degToRad(rotation);

    return new THREE.Vector2(
      x * Math.cos(angle) - z * Math.sin(angle),
      x * Math.sin(angle) + z * Math.cos(angle)
    );

  }

  drawConveyors(

    machines: Machine[],

    conveyorGroup: THREE.Group

  ): THREE.Vector3[] {
    const points: THREE.Vector3[] = [];
    conveyorGroup.clear();

    if (machines.length < 2) return [];

    const sorted = [...machines].sort(

      (a, b) => (a.sequence ?? 0) - (b.sequence ?? 0)

    );

    for (let i = 0; i < sorted.length - 1; i++) {

      const current = sorted[i];
      const next = sorted[i + 1];

      if (
        current.x == null ||
        current.z == null ||
        next.x == null ||
        next.z == null
      ) continue;

      const currentConfig = MACHINE_CONFIG[current.type];
      const nextConfig = MACHINE_CONFIG[next.type];

      const out = this.getRotationOffset(
        currentConfig.outputPort.x,
        currentConfig.outputPort.z,
        current.rotation ?? 0
      );

      const input = this.getRotationOffset(
        nextConfig.inputPort.x,
        nextConfig.inputPort.z,
        next.rotation ?? 0
      );

      const start = new THREE.Vector3(
        current.x + out.x,
        FACTORY_CONFIG.CONVEYOR_HEIGHT,
        current.z + out.y
      );

      const machineEntry = new THREE.Vector3(
        next.x + input.x,
        FACTORY_CONFIG.CONVEYOR_HEIGHT,
        next.z + input.y
      );
      const centerOffset = this.getRotationOffset(
        nextConfig.conveyorCenter.x,
        nextConfig.conveyorCenter.z,
        next.rotation ?? 0
      );

      const machineCenter = new THREE.Vector3(
        next.x + centerOffset.x,
        FACTORY_CONFIG.CONVEYOR_HEIGHT,
        next.z + centerOffset.y
      );
      const route = this.router.createRoute(start, machineEntry);
      for (const segment of route) {
        // if (points.length === 0) {
        //   points.push(segment.start.clone());
        // };
        const direction = new THREE.Vector3()
          .subVectors(segment.end, segment.start);

        const length = direction.length();

        if (length < 0.5) continue;


        const dir = direction.clone().normalize();

        // Pull conveyor slightly away from both machines
        const trim = 0.5;

        const drawStart = segment.start.clone().add(dir.clone().multiplyScalar(trim));
        const drawEnd = segment.end.clone().add(dir.clone().multiplyScalar(-trim));

        const drawDirection = new THREE.Vector3().subVectors(drawEnd, drawStart);
        const drawLength = drawDirection.length();

        // if (drawLength <= 0) continue;

        const conveyor = createConveyorSegment(
          drawLength,
          FACTORY_CONFIG.CONVEYOR_WIDTH
        );

        conveyor.position.copy(
          drawStart.clone()
            .add(drawEnd)
            .multiplyScalar(0.5)
        );

        conveyor.quaternion.setFromUnitVectors(
          new THREE.Vector3(1, 0, 0),
          drawDirection.normalize()
        );

        conveyorGroup.add(conveyor);

        if (points.length === 0) {
          points.push(drawStart.clone());
        }

        points.push(drawEnd.clone());

      }
      if (nextConfig.hasInternalConveyor) {
        const insideDirection = new THREE.Vector3()
          .subVectors(machineCenter, machineEntry);

        const insideLength = insideDirection.length();

        if (insideLength > 0.2) {

          const inside = createConveyorSegment(
            insideLength,
            FACTORY_CONFIG.CONVEYOR_WIDTH
          );

          inside.position.copy(
            machineEntry.clone()
              .add(machineCenter)
              .multiplyScalar(0.5)
          );

          inside.quaternion.setFromUnitVectors(
            new THREE.Vector3(1, 0, 0),
            insideDirection.normalize()
          );

          conveyorGroup.add(inside);
        }

        points.push(machineCenter.clone());

        const output = this.getRotationOffset(
          nextConfig.outputPort.x,
          nextConfig.outputPort.z,
          next.rotation ?? 0
        );

        const machineExit = new THREE.Vector3(
          next.x + output.x,
          FACTORY_CONFIG.CONVEYOR_HEIGHT,
          next.z + output.y
        );

        const exitDirection = new THREE.Vector3()
          .subVectors(machineExit, machineCenter);

        if (exitDirection.length() > 0.2) {

          const exitConveyor = createConveyorSegment(
            exitDirection.length(),
            FACTORY_CONFIG.CONVEYOR_WIDTH
          );

          exitConveyor.position.copy(
            machineCenter.clone()
              .add(machineExit)
              .multiplyScalar(0.5)
          );

          exitConveyor.quaternion.setFromUnitVectors(
            new THREE.Vector3(1, 0, 0),
            exitDirection.clone().normalize()
          );

          conveyorGroup.add(exitConveyor);
        }

        points.push(machineExit.clone());
      }

    }

    return points;
  }
}