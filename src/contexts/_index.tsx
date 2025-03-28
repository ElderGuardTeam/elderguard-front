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
        <UsersProvider>
          {children}
        </UsersProvider>
      </LoaderProvider>
    </>
  )
}