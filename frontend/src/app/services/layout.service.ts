import * as THREE from 'three';
import { MACHINE_CONFIG } from '../config/machine-config';
import { Machine } from '../models/machine';
export class FactoryLayoutManager {

    constructor(

        private walkwayGroup: THREE.Group,

        private markingGroup: THREE.Group,

        private utilityGroup: THREE.Group

    ) { }

    generateLayout(machines: Machine[]) {

        this.markingGroup.clear();


        this.createSafetyZones(machines);

    }

    private createSafetyZones(
        machines: Machine[]
    ): void {
        machines.forEach((machine, index) => {

            if (!machine.type) {
                console.error("Machine has NO TYPE!", machine);
                return;
            }

            const cfg = MACHINE_CONFIG[machine.type];

            if (!cfg) {
                console.error("No MACHINE_CONFIG for:", machine.type, machine);
                return;
            }
        });
    }
}