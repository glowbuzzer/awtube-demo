import { Cylinder } from "@react-three/drei"
import { useTheme } from "styled-components"

const height = 400

export const Pillar = ({ children }) => {
    const theme = useTheme()

    return (
        <group>
            <Cylinder
                args={[110, 110, height, 32]}
                rotation={[Math.PI / 2, 0, 0]}
                position={[0, 0, height / 2]}
            >
                <meshPhysicalMaterial
                    color={theme.colorPrimaryBg}
                    envMapIntensity={1}
                    metalness={0.05}
                    roughness={0.1}
                />
            </Cylinder>
            {children}
        </group>
    )
}
