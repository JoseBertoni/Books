export const GENEROS = [
  'Ficción',
  'No Ficción',
  'Ciencia Ficción',
  'Fantasía',
  'Horror',
  'Misterio',
  'Romance',
  'Thriller',
  'Biografía',
  'Historia',
  'Tecnología',
  'Otro',
] as const;

export const GENEROS_CON_TODOS = ['Todos', ...GENEROS] as const;

export type Genero = typeof GENEROS[number];
export type GeneroConTodos = typeof GENEROS_CON_TODOS[number];
