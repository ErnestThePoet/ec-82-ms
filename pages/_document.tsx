import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext
} from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                {/*This Head element affects all pages.*/}
                <Head>
                    {/* The viewport meta lives in _app.tsx so it overrides
                        Next.js' built-in default viewport. */}
                    <meta name="theme-color" content="#eaecf3" />
                    <meta name="description" content="EC-82MS Online Scientific Calculator" />
                    <link rel="icon" href="/ec-82-ms/favicon.ico" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap"
                        rel="stylesheet"></link>
                </Head>
                <body
                    style={{
                        margin: 0,
                        backgroundColor: "#eaecf3",
                        overscrollBehavior: "none"
                    }}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
