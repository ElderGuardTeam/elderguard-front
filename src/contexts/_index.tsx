import { AuthProvider } from "./authContext"
import { LoaderProvider } from "./loaderContext"
import { UsersProvider } from "./usersContext"


export const AppProvider = ({ 
  children 
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      <LoaderProvider>
        <AuthProvider>
          <UsersProvider>
            {children}
          </UsersProvider>
        </AuthProvider>
      </LoaderProvider>
    </>
  )
}