import {NavLink} from "react-router-dom";
import LOGO from "../assets/imgs/LOGO.png";

export const Sidebar = () => {

    const pagesRoute = [
        { name: 'Dashboard', path: '/' },

    ];

    return (
        <div className='flex flex-col h-screen items-start  bg-gray-bg w-56'>
            <div className='pl-5 py-10 text-light-gray flex'>
                 <img src={LOGO} width={70} height={50}/>
                <label>Kelompok D-Gen</label>
            </div>
            <div className='w-full flex flex-col p-4 gap-10 justify-around items-center'>
                <div>
                    Menu
                </div>
                <div className='w-full'>
                    <ul className="flex-grow p-2 space-y-3 text-center">
                        {pagesRoute.map((item) => (
                            <li key={item.name}>
                                <NavLink
                                    to={item.path}
                                    className={({isActive}) =>
                                        isActive
                                            ? 'block py-3 px-4 backdrop-brightness-50 rounded-lg text-white bg-active-link font-semibold'
                                            : 'block py-3 px-4 hover:bg-active-link rounded-lg text-light-gray hover:text-white'
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    )
}