import { RouteObject } from "react-router-dom"
import { componentMap } from "../../router/routerMap"

interface MenuType {
    icon: string,
    key: string,
    label: string,
    children?: MenuType[]
}

//Here, the routing table is generated based on the retrieved menu item data.
//This ensures routes are precisely created according to user permissions,
// preventing unauthorised access.

export function generateRouters(menu: MenuType[]): RouteObject[] {
    return menu.map((item: MenuType) => {
        const hasChildren = item.children
        let routerObj: RouteObject = {
            path: item.key,
            //if the item has children, render nothing itself, only the children will render the page
            element: hasChildren ? null : <>{componentMap[item.key]}</>
        }
        if (item.children) {
            routerObj.children = generateRouters(item.children)
        }
        return routerObj
    })
}