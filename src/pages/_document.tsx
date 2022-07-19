import Document, { Html, Head, Main, NextScript } from 'next/document'

export default function myDocument() {
    return (
        <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
                <link href="favicon.png" rel='shortcut icon' type='image/png' />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>

        </Html>
    )
}
