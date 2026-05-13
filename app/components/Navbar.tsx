export default function Navbar() {
    return(
        <header className="border-b bg-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between p-6">
                <h1 className="text-2xl font-bold">
                    Blog do Cliente 
                </h1>

                <nav className="flex gap-6 text-sm font-medium text-gray-600">
                    <a href="/">Ínicio</a>
                    <a href="#">Artigo</a>
                    <a href="#">Contato</a>
                </nav>
            </div>
        </header>
    )
}