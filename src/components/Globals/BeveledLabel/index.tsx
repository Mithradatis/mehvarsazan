const BeveledLabel = ({label, fontSize = 3}: {label: string, fontSize?: number}) => {
    return (
        <div 
            className="
                mx-auto 
                cursor-default 
                select-none 
                text-[${fontSize.toString()}rem]
                font-bold 
                text-blue-900 
                relative 
                group 
                text-center 
                flex 
                justify-center
            "
            style={{ 
                fontSize: `${fontSize}rem` 
            }}
        >
            <div className="
                absolute 
                top-[5px] 
                text-neutral-400 
                transition 
                duration-300 
                drop-shadow-lg 
                group-hover:drop-shadow-md 
                group-active:drop-shadow-none
            ">
                { label }
            </div>
            <div className="
                absolute 
                top-[4px] 
                text-neutral-300
            ">
                { label }
            </div>
            <div className="
                absolute 
                transition 
                duration-300 
                transform 
                group-hover:translate-y-1 
                group-active:translate-y-1.5
            ">
                { label }
            </div>
            <div className="dont-mind-me opacity-0">
                { label }
            </div>
        </div>
    )
}

export default BeveledLabel
