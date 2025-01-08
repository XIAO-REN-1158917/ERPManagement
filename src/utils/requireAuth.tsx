import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Iprops {
    allowed: boolean,
    redirectTo: string,
    children: React.ReactNode
}

//This component is used to check the login status.

//This is a simplified syntax combining object destructuring and type annotations.
//function RequireAuth(props: Iprops) {
//const allowed = props.allowed;
//const redirectTo = props.redirectTo;
//const children = props.children;
//}
//Writing it this way would be more cumbersome.
function RequireAuth({ allowed, redirectTo, children }: Iprops) {
    const { token } = useSelector((state: any) => state.authSlice)
    const isLogin = token ? true : false
    const navigate = useNavigate()
    useEffect(() => {
        //allowed represents the current route needs login or not, needed - true
        //isLogin represents login or not, 
        if (allowed !== isLogin) {
            navigate(redirectTo)
        }
    }, [allowed, isLogin, redirectTo])

    //This approach ensures the return value is a specific element/component, 
    // complying with JSX syntax and avoiding type inference errors.
    return allowed === isLogin ? <>{children}</> : <></>
}

export default RequireAuth