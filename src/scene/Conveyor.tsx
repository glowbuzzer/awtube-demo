import { useAppState } from "../store"
import { CardboardBox } from "./CardboardBox"

export const Conveyor = () => {
    const { available, pick } = useAppState()

    const positions = Array.from({ length: available }).map((_, i) => (
        <CardboardBox key={i} position={[i * -300 + (pick ? 0 : 300), -400, 75]} />
    ))

    return <>{positions}</>
}
