export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Avisos = {
  aviso?: Maybe<Scalars["Int"]>;
  cliente?: Maybe<Scalars["String"]>;
  contacto?: Maybe<Contacto>;
  tecnico?: Maybe<Array<Maybe<Scalars["String"]>>>;
  fecha?: Maybe<Scalars["Int"]>;
  f_apertura?: Maybe<Scalars["Int"]>;
  f_cierre?: Maybe<Scalars["Int"]>;
  estado?: Maybe<Scalars["String"]>;
  prioridad?: Maybe<Scalars["Int"]>;
  descripcion?: Maybe<Scalars["String"]>;
  observaciones?: Maybe<Scalars["String"]>;
  tp?: Maybe<Scalars["String"]>;
  desplazamiento?: Maybe<Scalars["Int"]>;
  partes?: Maybe<Array<Maybe<Parte>>>;
};

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE"
}

export type Componente = {
  componente?: Maybe<Scalars["String"]>;
  cantidad?: Maybe<Scalars["Int"]>;
};

export type Contacto = {
  nombre?: Maybe<Scalars["String"]>;
  correo?: Maybe<Scalars["String"]>;
  numero?: Maybe<Scalars["String"]>;
};

export type Incidencia = {
  aviso?: Maybe<Avisos>;
  parte?: Maybe<Array<Maybe<Parte>>>;
};

export type Parte = {
  parte?: Maybe<Scalars["Int"]>;
  aviso?: Maybe<Scalars["Int"]>;
  descripcion?: Maybe<Scalars["String"]>;
  reparacion?: Maybe<Scalars["String"]>;
  horas?: Maybe<Scalars["Int"]>;
  f_apertura?: Maybe<Scalars["String"]>;
  f_cierre?: Maybe<Scalars["String"]>;
  estado?: Maybe<Scalars["String"]>;
  prestamo?: Maybe<Array<Maybe<Componente>>>;
  componentes?: Maybe<Array<Maybe<Componente>>>;
};

export type Query = {
  allAvisos?: Maybe<Array<Maybe<Avisos>>>;
  allFullAvisos?: Maybe<Array<Maybe<Incidencia>>>;
};

export type Unnamed_1_QueryVariables = {};

export type Unnamed_1_Query = { __typename?: "Query" } & {
  allFullAvisos: Maybe<
    Array<
      Maybe<
        { __typename?: "incidencia" } & {
          aviso: Maybe<
            { __typename?: "avisos" } & Pick<
              Avisos,
              | "aviso"
              | "cliente"
              | "descripcion"
              | "prioridad"
              | "desplazamiento"
              | "tp"
            >
          >;
          parte: Maybe<
            Array<
              Maybe<
                { __typename?: "parte" } & Pick<
                  Parte,
                  "aviso" | "parte" | "descripcion" | "reparacion"
                > & {
                    prestamo: Maybe<
                      Array<
                        Maybe<
                          { __typename?: "componente" } & Pick<
                            Componente,
                            "componente" | "cantidad"
                          >
                        >
                      >
                    >;
                    componentes: Maybe<
                      Array<
                        Maybe<
                          { __typename?: "componente" } & Pick<
                            Componente,
                            "componente" | "cantidad"
                          >
                        >
                      >
                    >;
                  }
              >
            >
          >;
        }
      >
    >
  >;
};

import gql from "graphql-tag";
import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";
