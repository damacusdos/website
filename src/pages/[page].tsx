import Header from "components/Header/index";
import Footer from "components/Footer";
import Content from 'components/pages/page/Content';
import { NextSeo } from 'next-seo';
import GetPageData from 'scripts/GetPageData';

const slugToTitle: {[key: string]: any} = {
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    disclosure: "Responsible Disclosure Policy",
    subprocessors: "Data Subprocessors"
};

export async function getServerSideProps(context: any) {
    const { params } = context;
    const { page } = params;
    const pageDetails = await GetPageData({slug: page});
    return {
        props: {pageDetails}
    }
}

const GeneratedPage = ({pageDetails}: {pageDetails: any}) => {
    if(!pageDetails) return <p></p>;
    const { slug, content, title } = pageDetails;

    return (
        <>
            <NextSeo
                title={`${slugToTitle[slug]} | Courier`}
                description=""
                canonical={`https://www.courier.com/${slug}`}
            />
            <Header headerPlain />
            <Content content={content.json.content} title={title} />
            <Footer noBanner />
        </>            
    )
};

export default GeneratedPage;