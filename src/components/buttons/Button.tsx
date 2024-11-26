import { ReactNode } from "react"

interface MainButtonProps {
    children: ReactNode,
    className?: string
}

const MainButton = ({ children, className }: MainButtonProps) => {
    return (
        <button 
            className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 
                transition-colors duration-200 font-medium shadow-sm ${className || ''}`}
        >
            {children}
        </button>
    )
}

export default MainButton