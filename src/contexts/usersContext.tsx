import React, { createContext, useContext, useState } from "react";

const UsersContext = createContext({
	loading: false,
	setLoading: (state: boolean) => { },
});

export const useUsers = () => useContext(UsersContext);

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [loading, setLoading] = useState<boolean>(false);

	return (
		<UsersContext.Provider value={{ loading, setLoading }}>
			{children}
		</UsersContext.Provider>
	);
};
