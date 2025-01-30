import Navigation from "@/components/Globals/Navigation/Navigation";
import LightBox from "@/components/Templates/Section/LightBox";

const PageHeader = async () => {
    return (
        <div className="header-gradient lg:max-h-[6.75rem]">
            <div className="2xl:container mx-auto py-5">
                <Navigation />
                <header>

                </header>
            </div>
        </div>
    );
};

export default PageHeader;