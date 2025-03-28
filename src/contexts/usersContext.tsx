'use client'
import { api } from "@/utils/lib/axios";
import React, { createContext, useContext, useState } from "react";
import { useLoader } from "./loaderContext";

type UsersContextType = {
  fetchElderly: () => Promise<void>,
	elderly: Elderly[]
}

const UsersContext = createContext({} as UsersContextType);

export const useUsers = () => useContext(UsersContext);

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const {
		setLoading
	} = useLoader()
	const [elderly, setElderly] = useState<Elderly[]>([]);

	const fetchElderly = async () => {
		setLoading(true);
		await api.get("/elderly").then((response) => {
			setElderly(response.data);
		}).finally(() => {
			setLoading(false);
		})
	}

	return (
		<UsersContext.Provider value={{ 
			fetchElderly,
			elderly
		 }}>
			{children}
		</UsersContext.Provider>
	);
};
