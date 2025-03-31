'use client'
import { api } from "@/utils/lib/axios";
import React, { createContext, useContext, useState } from "react";
import { useLoader } from "./loaderContext";
import toastSuccess from "@/utils/toast/toastSuccess";
import toastError from "@/utils/toast/toastError";
import { useRouter } from "next/navigation";

type UsersContextType = {
  fetchElderly: () => Promise<void>
	createElderly: (elderly: ElderlyCreate) => Promise<void>
	getElderlyById: (id: string) => Promise<void>
	editElderly: (elderly: ElderlyCreate, id: string) => Promise<void>
	elderly: Elderly[]
	elderlyInfo: ElderlyInfo
}

const UsersContext = createContext({} as UsersContextType);

export const useUsers = () => useContext(UsersContext);

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const router = useRouter();
	const {
		setLoading
	} = useLoader()

	const [elderly, setElderly] = useState<Elderly[]>([]);
	const [elderlyInfo, setElderlyInfo] = useState<ElderlyInfo>({} as ElderlyInfo);

	const fetchElderly = async () => {
		setLoading(true);
		await api.get("/elderly").then((response) => {
			setElderly(response.data);
		}).finally(() => {
			setLoading(false);
		})
	}

	const getElderlyById = async (id : string) => {
		setLoading(true);
		await api.get(`elderly/${id}`).then((response) => {
			setElderlyInfo(response.data);
		}).finally(() => {
			setLoading(false);
		})
	}

	const createElderly = async (elderly: ElderlyCreate) => {
		setLoading(true);
		await api.post("/elderly", elderly).then(() => {
			fetchElderly();
			toastSuccess("Idoso cadastrado com sucesso", 5000);
			router.push("/pacientes");
		}).catch((error) => {
			toastError("Ocorreu um erro ao cadastrar o idoso", 5000);
		}).finally(() => {
			setLoading(false);
		})
	}
	const editElderly = async (elderly: ElderlyCreate, id: string) => {
		setLoading(true);
		await api.patch(`elderly/${id}`, elderly).then(() => {
			fetchElderly();
			toastSuccess("Idoso editado com sucesso", 5000);
			router.push("/pacientes");
		}).catch((error) => {
			toastError("Ocorreu um erro ao editar o idoso", 5000);
		}).finally(() => {
			setLoading(false);
		})
	}

	return (
		<UsersContext.Provider value={{ 
			fetchElderly,
			elderly,
			createElderly,
			getElderlyById,
			elderlyInfo,
			editElderly
		}}>
			{children}
		</UsersContext.Provider>
	);
};
