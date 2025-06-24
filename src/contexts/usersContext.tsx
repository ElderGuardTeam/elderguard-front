'use client'
import { api } from "@/utils/lib/axios";
import React, { createContext, useContext, useState } from "react";
import { useLoader } from "./loaderContext";
import toastSuccess from "@/utils/toast/toastSuccess";
import toastError from "@/utils/toast/toastError";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";

type UsersContextType = {
  fetchElderly: () => Promise<void>
	createElderly: (elderly: ElderlyCreate) => Promise<void>
	getElderlyById: (id: string) => Promise<void>
	editElderly: (elderly: ElderlyCreate, id: string) => Promise<void>
	fetchProfessional: () => Promise<void>
	createProfessional: (professional: Professional) => Promise<void>
	getProfessionalById: (id: string) => Promise<void>
	editProfessional: (professional: Professional, id: string) => Promise<void>
	searchProfessional: (searchTerm: string) => Promise<void>
	searchElderly: (searchTerm: string) => Promise<void>
	deleteProfessional: (id: string) => Promise<void>
	deleteElderly: (id: string) => Promise<void>
	validadeIdentity: (data: InitiateEvaluation) => Promise<void>
	elderly: Elderly[]
	elderlyInfo: ElderlyInfo
	professional: Professional[]
	professionalInfo: Professional
	elderlyId: string | null
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
	const [professional, setProfessional] = useState<Professional[]>([]);
	const [professionalInfo, setProfessionalInfo] = useState<Professional>({} as Professional);
	const [elderlyId, setElderlyId] = useState<string | null>(null);

	const { 'elderguard.token': token } = parseCookies()

  const headerConfig = {
    headers:{
      Authorization: 'Bearer ' + token,
    },
    }


	const fetchElderly = async () => {
		setLoading(true);
		await api.get("/elderly", headerConfig).then((response) => {
			setElderly(response.data);
		}).finally(() => {
			setLoading(false);
		})
	}

	const getElderlyById = async (id : string) => {
		setLoading(true);
		await api.get(`elderly/${id}`, headerConfig).then((response) => {
			setElderlyInfo(response.data);
		}).finally(() => {
			setLoading(false);
		})
	}

	const createElderly = async (elderly: ElderlyCreate) => {
		setLoading(true);
		await api.post("/elderly", elderly, headerConfig).then(() => {
			fetchElderly();
			toastSuccess("Idoso cadastrado com sucesso", 5000);
			router.push("/pacientes");
		}).catch((error) => {
			toastError(error.response.data.message || "Ocorreu um erro ao cadastrar o idoso", 5000);
		}).finally(() => {
			setLoading(false);
		})
	}

	const editElderly = async (elderly: ElderlyCreate, id: string) => {
		setLoading(true);
		await api.patch(`elderly/${id}`, elderly, headerConfig).then(() => {
			fetchElderly();
			toastSuccess("Idoso editado com sucesso", 5000);
			router.push("/pacientes");
		}).catch((error) => {
			toastError("Ocorreu um erro ao editar o idoso", 5000);
		}).finally(() => {
			setLoading(false);
		})
	}

	const fetchProfessional = async () => {
		setLoading(true);
		await api.get("/professional", headerConfig).then((response) => {
			setProfessional(response.data);
		}).finally(() => {
			setLoading(false);
		})
	}

	const createProfessional = async (professional: Professional) => {
		setLoading(true);
		await api.post("/professional", professional, headerConfig).then(() => {
			fetchElderly();
			toastSuccess("Profissional cadastrado com sucesso", 5000);
			router.push("/profissionais");
		}).catch((error) => {
			toastError(error.response.data.message || "Ocorreu um erro ao cadastrar o idoso", 5000);
		}).finally(() => {
			setLoading(false);
		})
	}

	const getProfessionalById = async (id : string) => {
		setLoading(true);
		await api.get(`professional/${id}`, headerConfig).then((response) => {
			setProfessionalInfo(response.data);
		}).finally(() => {
			setLoading(false);
		})
	}

	const editProfessional = async (professional: Professional, id: string) => {
		setLoading(true);
		await api.patch(`professional/${id}`, professional, headerConfig).then(() => {
			fetchElderly();
			toastSuccess("Profissional editado com sucesso", 5000);
			router.push("/profissionais");
		}).catch((error) => {
			toastError("Ocorreu um erro ao editar o professional", 5000);
		}).finally(() => {
			setLoading(false);
		})
	}

	const searchProfessional = async (searchTerm: string) => {
		setLoading(true);
		await api.get(`professional?search=${searchTerm}`, headerConfig).then((response) => {
			setProfessional(response.data);
		}).finally(() => {
			setLoading(false);
		})
	}

	const searchElderly = async (searchTerm: string) => {
		setLoading(true);
		await api.get(`elderly?search=${searchTerm}`, headerConfig).then((response) => {
			setElderly(response.data);
		}).finally(() => {
			setLoading(false);
		})
	}

	const deleteProfessional = async (id: string) => {
		setLoading(true);
		await api.delete(`professional/${id}`, headerConfig).then(() => {
			fetchProfessional();
			toastSuccess("Profissional excluído com sucesso", 5000);
			router.push("/profissionais");
		}).catch((error) => {
			toastError("Ocorreu um erro ao excluir o profissional", 5000);
		}).finally(() => {
			setLoading(false);
		})
	}

	const deleteElderly = async (id: string) => {
		setLoading(true);
		await api.delete(`elderly/${id}`, headerConfig).then(() => {
			fetchElderly();
			toastSuccess("Idoso excluído com sucesso", 5000);
			router.push("/pacientes");
		}).catch((error) => {
			toastError("Ocorreu um erro ao excluir o idoso", 5000);
		}).finally(() => {
			setLoading(false);
		})
	}

	const validadeIdentity = async (data: InitiateEvaluation) => {
		setLoading(true);
		await api.post("evaluation/start", data, headerConfig).then((res) => {
			toastSuccess("Identidade validada com sucesso", 5000);
			setElderlyId(res.data.elderly.id);
			router.push(`/avaliacoes/${data.evaluationId}/responder`);
		}).catch((error) => {
			toastError("Dados inválidos", 5000);
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
			editElderly,
			fetchProfessional,
			professional,
			createProfessional,
			getProfessionalById,
			professionalInfo,
			editProfessional,
			searchProfessional,
			searchElderly,
			deleteProfessional,
			deleteElderly,
			validadeIdentity,
			elderlyId
		}}>
			{children}
		</UsersContext.Provider>
	);
};
