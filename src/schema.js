import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type Usuario {
    id: ID!
    nombre: String!
    email: String!
    password: String!
  }

  input UsuarioInput {
    nombre: String!
    email: String!
    password: String!
  }

  type Empleo {
    id: ID!
    titulo: String!
    empresa: String!
    descripcion: String!
    ubicacion: String!
    salario: String!
  }

  input EmpleoInput {
    titulo: String!
    empresa: String!
    descripcion: String!
    ubicacion: String!
    salario: String!
  }

  type Seleccionado {
    id: ID!
    empleoId: ID!
    titulo: String!
    empresa: String!
    descripcion: String!
    ubicacion: String!
    salario: String!
  }

  type Query {
    usuarios: [Usuario!]!
    empleos: [Empleo!]!
    seleccionados: [Seleccionado!]!
    login(email: String!, password: String!): Boolean!
  }

  type Mutation {
    crearUsuario(input: UsuarioInput!): Usuario!
    borrarUsuario(email: String!): Boolean!

    crearEmpleo(input: EmpleoInput!): Empleo!
    borrarEmpleo(id: ID!): Boolean!

    guardarSeleccion(empleoId: ID!): Seleccionado!
  }
`);
