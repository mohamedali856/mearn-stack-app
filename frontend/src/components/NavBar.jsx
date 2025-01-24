import { Link } from "react-router-dom"

export default function NavBar(){
    return(
        <div className="h-20 flex justify-around items-center">
            <Link to="/"><h1 className="font-thin text-xl">Product Store</h1></Link>
        <div className="font-thin text-xl">
            <Link to="/create"><button>Create</button></Link>
        </div>
        </div>
    )
}