import { AuthProvider } from "./authContext"
import { FormsProvider } from "./formsContext"
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
            <FormsProvider>
              {children}
            </FormsProvider>
          </UsersProvider>
        </AuthProvider>
      </LoaderProvider>
    </>
  )
}