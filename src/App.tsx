import { RouterProvider } from "react-router-dom";
import { routersFixed } from "./router";
import { useEffect, useState, Suspense } from "react";
import { generateRouters } from "./utils/http/generatesRouters";
import { createBrowserRouter } from "react-router-dom";
import { getMenu } from "./api/users";
import { useDispatch } from 'react-redux';
import { setMenu } from "./store/login/authSlice";
import { useSelector } from "react-redux";
import { Spin } from "antd"

function App() {
    const [routerTree, setRouterTree] = useState<any>(null)
    const dispatch = useDispatch()
    const { token } = useSelector((state: any) => state.authSlice)
    //setMenu is an async step, so, add a dependence, and ensure can we get the data of menu
    useEffect(() => {
        async function loadData() {
            const { data } = await getMenu()
            if (data.length) {
                dispatch(setMenu(data))
                const routersDynamic = generateRouters(data)//generate router tree dynamicly

                // the router tree is childre of "/"
                //This approach combiens the dynamically generated routes with fixed route "/"/
                // to form a complete route tree.
                const myRouters = [...routersFixed]
                myRouters[0].children = routersDynamic

                // set a default
                myRouters[0].children[0].index = true
                const routerTree = createBrowserRouter(myRouters)

                //send router object to state
                setRouterTree(routerTree)
            } else {
                //If the user is not logged in, provide a route to the login page.
                const routerTree = createBrowserRouter(routersFixed)
                setRouterTree(routerTree)
            }
        }
        loadData()
        //When the user's login status changes, send a new request.
    }, [token])

    if (routerTree) {
        return (
            <div className="App">
                <Suspense fallback={<Spin></Spin>}>
                    <RouterProvider router={routerTree}></RouterProvider>
                </Suspense>

            </div>
        );
    } else {
        return <Spin></Spin>
    }

}

export default App;
