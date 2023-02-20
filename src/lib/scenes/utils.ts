import type { Vector3 } from "three";

const cameraFitPosition = (
    planeWidth: number,
    planeHeight: number,
    planePosition: Vector3,
    planeNormal: Vector3,
    fov: number,
    aspect: number
) : [number, number, number]=> {
    const vFov = (fov * Math.PI) / 180;

    const cameraZForFittingPlaneHeightInFrame =
        planeHeight / (2 * Math.tan(0.5 * vFov));
    const cameraZForFittingPlaneWidthInFrame =
        planeWidth / (2 * aspect * Math.tan(0.5 * vFov));

    const offset = Math.min(
        cameraZForFittingPlaneHeightInFrame,
        cameraZForFittingPlaneWidthInFrame
    );

    const point = planePosition
        .clone()
        .addScaledVector(planeNormal, offset);

    return [point.x, point.y, point.z];
    // return new Vector3(0,0,z);
};



export { cameraFitPosition };
