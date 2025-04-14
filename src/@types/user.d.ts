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
  email: string;
  education: string;
  socialeconomic: string;
}

interface ElderlyCreate {
  id?: string;
  cpf: string;
  name: string;
  email: string;
  dateOfBirth: Date;
  phone: string;
  contacts: Contact[];
  address: Address;
  sex: string;
  weight: number;
  height: number;
  imc: number;
  education: string;
  socialeconomic: string;
}

interface ElderlyInfo {
  id?: string;
  cpf: string;
  name: string;
  email: string;
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
  education: string;
  socialeconomic: string;
}

interface Address {
  street: string;
  number: string;
  complement?: string;
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
  id?: string
  cpf: string;
  name: string;
  phone: string;
  email: string;
}

enum UserType {
  USER = "USER",
  ADMIN = "ADMIN",
}

interface User {
  sub: string
  login: string
  userType: string
  name: string
  iat: number
  exp: number
}
