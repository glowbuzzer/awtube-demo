import { Box } from "@react-three/drei"
import { useDigitalOutputState } from "@glowbuzzer/store"

const size = 1800

export const LightCurtain = () => {
    const [{ effectiveValue }, activate] = useDigitalOutputState(7)

    function enter() {
        activate(true, true)
    }

    function exit() {
        activate(false, true)
    }

    return (
        <Box
            args={[size, size, size]}
            position={[0, 0, size / 2]}
            onPointerEnter={enter}
            onPointerLeave={exit}
        >
            <meshStandardMaterial
                color="red"
                transparent={true}
                opacity={effectiveValue ? 0.3 : 0.1}
            />
        </Box>
    )
}
