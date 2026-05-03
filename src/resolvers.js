import { ObjectId } from "mongodb";
import { connectDB } from "./db.js";

function mapDocument(document) {
  if (!document) {
    return null;
  }

  return {
    ...document,
    id: document._id.toString()
  };
}

function toObjectId(id) {
  if (!ObjectId.isValid(id)) {
    throw new Error("El id indicado no tiene un formato valido");
  }

  return new ObjectId(id);
}

export const root = {
  usuarios: async () => {
    const db = await connectDB();
    const usuarios = await db.collection("usuarios").find().toArray();
    return usuarios.map(mapDocument);
  },

  crearUsuario: async ({ input }) => {
    const db = await connectDB();

    const usuarioExistente = await db.collection("usuarios").findOne({
      email: input.email
    });

    if (usuarioExistente) {
      throw new Error("El email ya esta registrado");
    }

    const result = await db.collection("usuarios").insertOne(input);

    return {
      id: result.insertedId.toString(),
      ...input
    };
  },

  borrarUsuario: async ({ email }) => {
    const db = await connectDB();
    const result = await db.collection("usuarios").deleteOne({ email });
    return result.deletedCount === 1;
  },

  login: async ({ email, password }) => {
    const db = await connectDB();

    const usuario = await db.collection("usuarios").findOne({
      email,
      password
    });

    return Boolean(usuario);
  },

  empleos: async () => {
    const db = await connectDB();
    const empleos = await db.collection("empleos").find().toArray();
    return empleos.map(mapDocument);
  },

  crearEmpleo: async ({ input }) => {
    const db = await connectDB();
    const result = await db.collection("empleos").insertOne(input);

    return {
      id: result.insertedId.toString(),
      ...input
    };
  },

  borrarEmpleo: async ({ id }) => {
    const db = await connectDB();

    const result = await db.collection("empleos").deleteOne({
      _id: toObjectId(id)
    });

    return result.deletedCount === 1;
  },

  seleccionados: async () => {
    const db = await connectDB();
    const seleccionados = await db.collection("seleccionados").find().toArray();
    return seleccionados.map(mapDocument);
  },

  guardarSeleccion: async ({ empleoId }) => {
    const db = await connectDB();

    const empleo = await db.collection("empleos").findOne({
      _id: toObjectId(empleoId)
    });

    if (!empleo) {
      throw new Error("No existe ningun empleo con ese id");
    }

    const seleccionado = {
      empleoId,
      titulo: empleo.titulo,
      empresa: empleo.empresa,
      descripcion: empleo.descripcion,
      ubicacion: empleo.ubicacion,
      salario: empleo.salario
    };

    await db.collection("seleccionados").updateOne(
      { empleoId },
      { $set: seleccionado },
      { upsert: true }
    );

    const guardado = await db.collection("seleccionados").findOne({ empleoId });
    return mapDocument(guardado);
  }
};
