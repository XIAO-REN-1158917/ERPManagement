
// There should be two parameters, one of them is the authority current account has and the other is the authority button needs
function withPermissions(requiredPermissions: string[], userPermissions: string[]): (Component: React.FC) => React.FC {
    // HOC (Higher-Oder Component) - Receives a component as a parameter and returns a component. 
    return function (Component: React.FC) {
        return function (props: any): React.ReactElement | null {
            // Check whether every required permission exists in the user's permissions.
            const hasPermission: boolean = requiredPermissions.every(item => userPermissions.includes(item))
            if (!hasPermission) {
                return null
            }
            return <Component {...props} />
        }
    }
}

export default withPermissions

