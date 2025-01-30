import FooterNavigation from "@/components/Partials/Footer/FooterNavigation";
import FooterContact from "@/components/Partials/Footer/FooterContact";

const Footer = async () => {
    return <footer>
        <div className="footer-gradient md:py-20 py-8 px-4">
            <div className="2xl:container mx-auto">
                <div className="flex flex-wrap w-full md:w-4/5 mx-auto">
                    <div className="flex flex-wrap items-center justify-start w-full lg:w-3/4 m-auto">
                        <FooterNavigation />
                    </div>
                    <div className="w-full md:w-1/4 md:pt-0 pt-8">
                        <FooterContact />
                    </div>
                </div>
            </div>
        </div>
    </footer>
}

export default Footer;