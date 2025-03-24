import { LoaderProvider } from "./loaderContext"


export const AppProvider = ({ 
  children 
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      <LoaderProvider>
        {children}
      </LoaderProvider>
    </>
  )
}