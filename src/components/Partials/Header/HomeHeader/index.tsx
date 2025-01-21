import Navigation from "@/components/Globals/Navigation/Navigation";
import LightBox from "@/components/Templates/Section/LightBox";

const HomeHeader = async () => {
    return (
        <div className="header-gradient">
            <div className="container mx-auto py-5">
                <Navigation />
                <header>
                    <LightBox />
                </header>
            </div>
        </div>
    );
};

export default HomeHeader;