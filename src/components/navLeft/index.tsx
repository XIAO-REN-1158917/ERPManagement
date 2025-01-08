import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import icons from './iconList';
import logo from "../../assets/logo.png"
import { useSelector } from 'react-redux';
import "./index.scss"
import { useNavigate, useLocation } from 'react-router-dom';

// This is the type we need, where icon is a component. Save this is Redux.
interface MenuItem {
    key: string,
    label: string,
    icon?: React.ReactNode,
    children?: MenuItem[]
}

// This is type returned by the backend, where icon is a string. 
// Needs to be mapped to MenuItem 
interface MenuItemFromData {
    key: string,
    label: string,
    icon: string,
    children?: MenuItemFromData[]
}



function NavLeft() {
    const { menuList } = useSelector((state: any) => state.authSlice)
    const [menuData, setMenuData] = useState<MenuItem[]>([])
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        configMenu()
    }, [menuList])
    async function configMenu() {
        const mappedMenuItems: MenuItem[] = mapMenuItems(menuList)
        setMenuData(mappedMenuItems)
    }

    // format data from backend, because of the icon, we need component, not string
    function mapMenuItems(items: MenuItemFromData[]): any {
        return items.map((item: MenuItemFromData) => ({
            key: item.key,
            label: item.label,
            icon: icons[item.icon],
            // In actual production environments, the use of recursion depends on the situation
            children: item.children ? mapMenuItems(item.children) : null
        }))
    }

    function handlerClick({ key }: { key: string }) {
        navigate(key)
    }

    return <div className='navleft'>
        <div className='logo'>
            <img src={logo} alt="" width={18} />
            <h1>Admin Console</h1>
        </div>
        <Menu
            defaultSelectedKeys={['/dashboard']}
            mode="inline"
            theme="dark"
            items={menuData}
            onClick={handlerClick}
            selectedKeys={[location.pathname]}
        />
    </div>
}

export default NavLeft