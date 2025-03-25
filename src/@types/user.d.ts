interface Elderly {
  id: string;
  cpf: string;
  name: string;
  dateOfBirth: Date;
  phone: string;
  contacts: Contact[];
  address: Address;
  addressId: string;
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

interface User {
  login: string;
  password: string;
  userType: UserType;
  created: Date;
  updated: Date;
  elderly?: Elderly;
  professional?: Professional;
}
