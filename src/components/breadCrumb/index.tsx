import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { Breadcrumb } from "antd"

interface MenuItem {
    key: string,
    label: string,
    children?: MenuItem[]
}



// fetch label based on pathname, for breadcrumb navbar
function findBreadcrumbPath(path: string, menuItems: MenuItem[]): string[] {
    const pathSegments: string[] = []

    //Defining a function this way is for recursive operations to find
    // the lables of all child routes.
    function findPath(currentPath: string, items: MenuItem[]) {
        for (let item of items) {
            if (currentPath.startsWith(item.key)) {
                pathSegments.push(item.label)

                //If there are child routes, then recurse.
                if (item.children) {
                    findPath(currentPath, item.children)
                }
                break
            }
        }
        return pathSegments
    }
    return findPath(path, menuItems)
}

function MyBreadCrumb() {
    const location = useLocation()
    const { menuList } = useSelector((state: any) => state.authSlice)
    const breadcrumbList = findBreadcrumbPath(location.pathname, menuList).map(item => ({ title: item }))

    return <Breadcrumb items={breadcrumbList} className="mt mb" />
}

export default MyBreadCrumb