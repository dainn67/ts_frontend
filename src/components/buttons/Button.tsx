import { ReactNode } from "react"

interface MainButtonProps {
    onClick: () => void,
    children: ReactNode,
}

const MainButton = ({ onClick, children }: MainButtonProps) => {
    return (
        <button onClick={onClick}>
            {children}
        </button>
    )
}

export default MainButton