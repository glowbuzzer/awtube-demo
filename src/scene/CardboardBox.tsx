import { useMemo } from "react"
import { useGLTF } from "@react-three/drei"

export const CardboardBox = ({ position, rotated = false }) => {
    const object = useMemo(() => {
        return useGLTF("/assets/box.glb").scene.clone()
    }, [])

    return (
        <group
            scale={500}
            position={position}
            rotation={[Math.PI / 2, rotated ? Math.PI / 2 : 0, 0]}
        >
            <primitive object={object} />
        </group>
    )
}
