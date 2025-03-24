interface Elderly {
  id: string;
  cpf: string;
  name: string;
  dateOfBirth: Date;
  phone: string;
  contacts: ElderlyContact[];
  address: Address;
  addressId: string;
  sex: string;
  weight: number;
  height: number;
  imc: number;
  user: User;
  userId: string;
  created: Date;
  updated: Date;
}

interface Address {
  id: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  Elderly: Elderly[];
  Contact: Contact[];
  created: Date;
  updated: Date;
}

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  cpf: string;
  address: Address;
  addressId: string;
  elderly: ElderlyContact[];
  created: Date;
  updated: Date;
}

interface ElderlyContact {
  elderlyId: string;
  contactId: string;
  elderly: Elderly;
  contact: Contact;
}

interface Professional {
  id: string;
  cpf: string;
  name: string;
  phone: string;
  email: string;
  user: User;
  userId: string;
  created: Date;
  updated: Date;
}

enum UserType {
  USER = "USER",
  ADMIN = "ADMIN",
}

interface User {
  id: string;
  login: string;
  password: string;
  userType: UserType;
  created: Date;
  updated: Date;
  elderly?: Elderly;
  professional?: Professional;
}
