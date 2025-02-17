import { capitalize } from "@/utils/textTransformer"

const BeveledLabel = (
    {
        label, 
        fontSize = 3,
        extraClasses
    }: {
        label: string; 
        fontSize?: number;
        extraClasses?: any;
    }
) => {
    return (
        <div 
            className={`
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
                ${extraClasses}
            `}
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
                { capitalize(label) }
            </div>
            <div className="
                absolute 
                top-[4px] 
                text-neutral-300
            ">
                { capitalize(label) }
            </div>
            <div className="
                absolute 
                transition 
                duration-300 
                transform 
                group-hover:translate-y-1 
                group-active:translate-y-1.5
            ">
                { capitalize(label) }
            </div>
            <div className="dont-mind-me opacity-0">
                { capitalize(label) }
            </div>
        </div>
    )
}

export default BeveledLabel
