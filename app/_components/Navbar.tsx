import Link from "next/link"

const Navbar = () => {
  return (
    <div className="fixed top-5 left-5 ">
        <Link href="/" className="text-xl p-1 border rounded-md hover:bg-gray-100 select-none" title="Home">
        🏠
        </Link>

    </div>
  )
}

export default Navbar