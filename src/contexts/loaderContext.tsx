import React, { createContext, useContext, useState } from "react";

const LoaderContext = createContext({
	loading: false,
	setLoading: (state: boolean) => { },
});

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [loading, setLoading] = useState<boolean>(false);

	return (
		<LoaderContext.Provider value={{ loading, setLoading }}>
			{children}
		</LoaderContext.Provider>
	);
};
