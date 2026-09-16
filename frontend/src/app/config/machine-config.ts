export interface MachinePort {
    x: number;
    z: number;
}
export interface MachineConfig {

    bodyLength: number;

    bodyWidth: number;

    bodyHeight: number;

    conveyorOffset: number;
    inputPort: MachinePort;

    outputPort: MachinePort;

    safetyLength: number;

    safetyWidth: number;
    hasInternalConveyor: boolean;
    conveyorCenter: MachinePort;

}

export const MACHINE_CONFIG: Record<string, MachineConfig> = {

    Capper: {

        bodyLength: 18,

        bodyWidth: 14,

        bodyHeight: 9,
        conveyorOffset: 7,
        inputPort: {
            x: -13.5,
            z: 0
        },
        outputPort: {
            x: 13.5,
            z: 0
        },
        safetyLength: 30,

        safetyWidth: 20,
        hasInternalConveyor: true,
        conveyorCenter: {
            x: 0,
            z: 0
        }


    },

    Filler: {

        bodyLength: 30,

        bodyWidth: 14,

        bodyHeight: 9,

        conveyorOffset: 8,
        inputPort: {
            x: -15,
            z: 0
        },
        outputPort: {
            x: 15,
            z: 0
        },
        safetyLength: 18,

        safetyWidth: 24,
        hasInternalConveyor: true,
        conveyorCenter: {
            x: 0,
            z: 0
        }


    },

    Labeler: {

        bodyLength: 22,

        bodyWidth: 14,

        bodyHeight: 9,

        conveyorOffset: 7,
        inputPort: {
            x: -11,
            z: 0
        },
        outputPort: {
            x: 11,
            z: 0
        },
        safetyLength: 28,

        safetyWidth: 18,
        hasInternalConveyor: true,
        conveyorCenter: {
            x: 0,
            z: 0
        }


    },

    CheckWeigher: {

        bodyLength: 7,

        bodyWidth: 12,

        bodyHeight: 8,

        conveyorOffset: 6,
        inputPort: {
            x: -3.5,
            z: 0
        },
        outputPort: {
            x: 3.5,
            z: 0
        },
        safetyLength: 24,

        safetyWidth: 16,
        hasInternalConveyor: true,
        conveyorCenter: {
            x: 0,
            z: 0
        }


    },

    TorqueStation: {

        bodyLength: 18,

        bodyWidth: 12,

        bodyHeight: 8,

        conveyorOffset: 6,
        inputPort: {
            x: -6,
            z: 0
        },
        outputPort: {
            x: 6,
            z: 0
        },
        safetyLength: 24,

        safetyWidth: 16,
        hasInternalConveyor: false,
        conveyorCenter: {
            x: 0,
            z: 0
        }


    },

    QualityStation: {

        bodyLength: 24,

        bodyWidth: 16,

        bodyHeight: 10,

        conveyorOffset: 8,
        inputPort: {
            x: -3,
            z: 0
        },
        outputPort: {
            x: 13,
            z: 0
        },
        safetyLength: 30,

        safetyWidth: 20,
        hasInternalConveyor: false,
        conveyorCenter: {
            x: 0,
            z: 0
        }


    },

    RoBoArm: {

        bodyLength: 18,

        bodyWidth: 18,

        bodyHeight: 12,

        conveyorOffset: 10,
        inputPort: {
            x: -10,
            z: 0
        },
        outputPort: {
            x: 10,
            z: 0
        },
        safetyLength: 24,

        safetyWidth: 24,
        hasInternalConveyor: false,
        conveyorCenter: {
            x: 0,
            z: 0
        }


    },

    Palletizer: {

        bodyLength: 30,

        bodyWidth: 24,

        bodyHeight: 16,

        conveyorOffset: 12,
        inputPort: {
            x: -16,
            z: 0
        },
        outputPort: {
            x: 16,
            z: 0
        },
        safetyLength: 40,

        safetyWidth: 30,
        hasInternalConveyor: false,
        conveyorCenter: {
            x: 0,
            z: 0
        }


    },

    Depalletizer: {

        bodyLength: 30,

        bodyWidth: 24,

        bodyHeight: 16,

        conveyorOffset: 12,
        inputPort: {
            x: -16,
            z: 0
        },
        outputPort: {
            x: 16,
            z: 0
        },
        safetyLength: 40,

        safetyWidth: 30,
        hasInternalConveyor: false,
        conveyorCenter: {
            x: 0,
            z: 0
        }


    },
    Stack: {

        bodyLength: 10,

        bodyWidth: 10,

        bodyHeight: 8,

        conveyorOffset: 5,

        inputPort: {
            x: -5,
            z: 0
        },

        outputPort: {
            x: 5,
            z: 0
        },

        safetyLength: 16,

        safetyWidth: 16,
        hasInternalConveyor: false,
        conveyorCenter: {
            x: 0,
            z: 0
        }


    },

};