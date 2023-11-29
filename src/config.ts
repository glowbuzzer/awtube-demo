/*
 * Copyright (c) 2023. Glowbuzzer. All rights reserved
 */

import { GlowbuzzerConfig, JOINT_MODEOFOPERATION, JOINT_TORQUE_MODE } from "@glowbuzzer/store"
import {
    AwTubeL2InverseDynamicParams,
    AwTubeL2KinChainParams,
    StandardAwTubeConfiguration
} from "@glowbuzzer/awlib"

const DEFAULT_JOINT_LIMITS = {
    vmax: 1.25,
    amax: 12.5,
    jmax: 125
}

const _config: GlowbuzzerConfig = {
    ...StandardAwTubeConfiguration,
    machine: [
        {
            name: "AWTUBE L2",
            busCycleTime: 4,
            heartbeatTimeout: 10000,
            statusFrequency: 100
        }
    ],
    points: [
        {
            name: "point1",
            frameIndex: 0,
            translation: {
                x: 210,
                y: 210,
                z: 400
            },
            rotation: {
                x: 1,
                y: 0,
                z: 0,
                w: 0
            },
            configuration: 0
        }
    ],
    frames: [
        {
            name: "World",
            translation: {
                x: 0,
                y: 0,
                z: 0
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0,
                w: 1
            }
        },
        {
            name: "Robot",
            translation: {
                x: 0,
                y: 0,
                z: 117
            }
        },
        {
            name: "Pallet",
            translation: {
                x: 400,
                y: 0,
                z: 0
            }
        }
    ],
    joint: [
        {
            name: "0",
            limits: [DEFAULT_JOINT_LIMITS],
            scalePos: 166886,
            scaleVel: 9549,
            scaleTorque: 3.414,
            jointType: 1,
            negLimit: -180,
            posLimit: 180,
            inverted: true,
            supportedModes:
                JOINT_MODEOFOPERATION.JOINT_MODEOFOPERATION_CSP |
                JOINT_MODEOFOPERATION.JOINT_MODEOFOPERATION_CST,
            supportedTorqueModes:
                JOINT_TORQUE_MODE.JOINT_TORQUE_MODE_GRAVITY |
                JOINT_TORQUE_MODE.JOINT_TORQUE_MODE_DIRECT
        },
        {
            name: "1",
            limits: [DEFAULT_JOINT_LIMITS],
            scalePos: 166886,
            scaleVel: 9549,
            scaleTorque: 2.54,
            jointType: 1,
            negLimit: -90,
            posLimit: 90,
            inverted: true,
            supportedModes:
                JOINT_MODEOFOPERATION.JOINT_MODEOFOPERATION_CSP |
                JOINT_MODEOFOPERATION.JOINT_MODEOFOPERATION_CST,
            supportedTorqueModes: JOINT_TORQUE_MODE.JOINT_TORQUE_MODE_GRAVITY
        },
        {
            name: "2",
            limits: [DEFAULT_JOINT_LIMITS],
            scalePos: 166886,
            scaleVel: 9549,
            scaleTorque: 4.3,
            jointType: 1,
            negLimit: -45,
            posLimit: 225,
            inverted: false,
            supportedModes:
                JOINT_MODEOFOPERATION.JOINT_MODEOFOPERATION_CSP |
                JOINT_MODEOFOPERATION.JOINT_MODEOFOPERATION_CST,
            supportedTorqueModes: JOINT_TORQUE_MODE.JOINT_TORQUE_MODE_GRAVITY
        },
        {
            name: "3",
            limits: [DEFAULT_JOINT_LIMITS],
            scalePos: 166886,
            scaleVel: 9549,
            scaleTorque: 4.3,
            jointType: 1,
            negLimit: -170,
            posLimit: 170,
            inverted: true,
            supportedModes:
                JOINT_MODEOFOPERATION.JOINT_MODEOFOPERATION_CSP |
                JOINT_MODEOFOPERATION.JOINT_MODEOFOPERATION_CST,
            supportedTorqueModes: JOINT_TORQUE_MODE.JOINT_TORQUE_MODE_GRAVITY
        },
        {
            name: "4",
            limits: [DEFAULT_JOINT_LIMITS],
            scalePos: 166886,
            scaleVel: 9549,
            scaleTorque: 3.414,
            jointType: 1,
            negLimit: -90,
            posLimit: 270,
            inverted: true,
            supportedModes:
                JOINT_MODEOFOPERATION.JOINT_MODEOFOPERATION_CSP |
                JOINT_MODEOFOPERATION.JOINT_MODEOFOPERATION_CST,
            supportedTorqueModes: JOINT_TORQUE_MODE.JOINT_TORQUE_MODE_GRAVITY
        },
        {
            name: "5",
            limits: [DEFAULT_JOINT_LIMITS],
            scalePos: 166886,
            scaleVel: 9549,
            scaleTorque: 16.07,
            jointType: 1,
            negLimit: -270,
            posLimit: 270,
            inverted: true,
            supportedModes:
                JOINT_MODEOFOPERATION.JOINT_MODEOFOPERATION_CSP |
                JOINT_MODEOFOPERATION.JOINT_MODEOFOPERATION_CST,
            supportedTorqueModes: JOINT_TORQUE_MODE.JOINT_TORQUE_MODE_GRAVITY
        }
    ],
    kinematicsConfiguration: [
        {
            name: "default",
            frameIndex: 1,
            participatingJoints: [0, 1, 2, 3, 4, 5],
            participatingJointsCount: 6,
            kinematicsConfigurationType: 1,
            supportedConfigurationBits: 7,
            extentsX: [-1000, 1000],
            extentsY: [-1000, 1000],
            extentsZ: [-17, 2000],
            linearLimits: [
                {
                    vmax: 300,
                    amax: 6000,
                    jmax: 120000
                }
            ],

            angularLimits: [DEFAULT_JOINT_LIMITS],
            ...AwTubeL2KinChainParams,
            inverseDynamicParams: AwTubeL2InverseDynamicParams
        }
    ],
    iout: [
        {
            name: "led"
        }
    ]
}
/**
 * This is the configuration for the AWTUBE L machine that can be pushed to the control if needed
 * (for example on first start)
 */
export const config = _config
