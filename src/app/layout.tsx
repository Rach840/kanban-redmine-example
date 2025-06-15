import {Header} from "../widgets";

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header/>
            <main className='container mx-auto'>
                {children}
            </main>
        </>

)
}
