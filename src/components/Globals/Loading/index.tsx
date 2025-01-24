const LoadingBox = ({extraStyles}: {extraStyles: any}) => {
    return (
        <div 
            className="relative opacity-0 left-[10px]" 
            style={{...extraStyles}}
        >
            <div className="
                absolute
                bg-[#286cb5]
                w-[19px]
                h-[5px]
                top-[14px]
                left-[10px]
                skew-y-[-25deg]
            "></div>
            <div className="
                absolute
                bg-[#2f85e0]
                w-[19px]
                h-[5px]
                top-[14px]
                left-[-9px]
                skew-y-[25deg]
            "></div>
            <div 
                className="
                    absolute
                    bg-[#5fa8f5]
                    w-[20px]
                    h-[20px]
                    top-0
                    left-0" 
                style={{ 
                    transform: 'rotate(45deg) skew(-20deg, -20deg)' 
                }}
            ></div>
        </div>
    )
}

const Loading = () => {
    const boxes = Array(4).fill(null);

    return (
        <div className="
            bg-gradient-to-bl 
            from-white 
            to-[#f1f1f1] 
            fixed 
            w-full 
            h-full 
            left-0 
            top-0 
            z-50 
            flex 
            items-center 
            justify-center
        ">
            <div className="w-[40px] h-[50px] scale-[3]">
                {boxes.map((_, index) => (
                    <LoadingBox 
                        extraStyles={{ 
                            animation: `from-${ index % 2 !== 0 ? 'right' : 'left' } 4s infinite`, 
                            animationDelay: `${index}s`, 
                        }}
                        key={`loading-box-${index}`} 
                    />
                ))}
            </div>
        </div>
    )
}

export default Loading
