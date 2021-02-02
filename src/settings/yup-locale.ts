import { setLocale } from "yup";
import * as Locale from "yup/lib/locale";

type Translation = {
  mixed: Locale.MixedLocale;
  string: Locale.StringLocale;
  number: Locale.NumberLocale;
  date: Locale.DateLocale;
  array: Locale.ArrayLocale;
};

const translation: Translation = {
  mixed: {
    default: (params) => `${params.label} é inválido`,
    required: (params) => `${params.label} é um campo obrigatório`,
    oneOf: (params) =>
      `${params.label} deve ser um dos seguintes valores: ${params.values}`,
    notOneOf: (params) =>
      `${params.label} não pode ser um dos seguintes valores: ${params.values}`,
  },
  string: {
    length: (params) =>
      `${params.label} deve ter exatamente ${params.length} caracteres`,
    min: (params) =>
      `${params.label} deve ter pelo menos ${params.min} caracteres`,
    max: (params) =>
      `${params.label} deve ter no máximo ${params.max} caracteres`,
    email: (params) => `${params.label} tem o formato de e-mail inválido`,
    url: (params) => `${params.label} deve ter um formato de URL válida`,
    trim: (params) =>
      `${params.label} não deve conter espaços no início ou no fim.`,
    lowercase: (params) => `${params.label} deve estar em maiúsculo`,
    uppercase: (params) => `${params.label} deve estar em minúsculo`,
  },
  number: {
    min: (params) => `${params.label} deve ser no mínimo ${params.min}`,
    max: (params) => `${params.label} deve ser no máximo ${params.max}`,
    lessThan: (params) => `${params.label} deve ser menor que ${params.less}`,
    moreThan: (params) => `${params.label} deve ser maior que ${params.more}`,
    positive: (params) => `${params.label} deve ser um número positivo`,
    negative: (params) => `${params.label} deve ser um número negativo`,
    integer: (params) => `${params.label} deve ser um número inteiro`,
  },
  date: {
    min: (params) => `${params.label} deve ser maior que a data ${params.min}`,
    max: (params) => `${params.label} deve ser menor que a data ${params.max}`,
  },
  array: {
    min: (params) => `${params.label} deve ter no mínimo ${params.min} itens`,
    max: (params) => `${params.label} deve ter no máximo ${params.max} itens`,
  },
};

setLocale(translation);
