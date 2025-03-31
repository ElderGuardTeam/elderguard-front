interface Elderly {
  id?: string;
  cpf: string;
  name: string;
  dateOfBirth: Date;
  phone: string;
  contacts: Contact[];
  address: Address;
  sex: string;
  weight: string;
  height: string;
  imc: string;
}

interface ElderlyCreate {
  id?: string;
  cpf: string;
  name: string;
  dateOfBirth: Date;
  phone: string;
  contacts: Contact[];
  address: Address;
  sex: string;
  weight: number;
  height: number;
  imc: number;
}

interface ElderlyInfo {
  id?: string;
  cpf: string;
  name: string;
  dateOfBirth: Date;
  phone: string;
  contacts: Array<{
    contact: Contact;
  }>;
  address: Address;
  sex: string;
  weight: number;
  height: number;
  imc: number;
}

interface Address {
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

interface Contact {
  name: string;
  phone: string;
  email: string;
  cpf: string;
  address: Address;
}

interface Professional {
  cpf: string;
  name: string;
  phone: string;
  email: string;
  created: Date;
  updated: Date;
}

enum UserType {
  USER = "USER",
  ADMIN = "ADMIN",
}

