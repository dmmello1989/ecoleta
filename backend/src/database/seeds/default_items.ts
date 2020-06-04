import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('items').insert([
    { title: 'Lamps', image: 'lampadas.svg' },
    { title: 'Batteries', image: 'baterias.svg' },
    { title: 'Papers and Cardboards', image: 'papeis-papelao.svg' },
    { title: 'Electronic Waste', image: 'eletronicos.svg' },
    { title: 'Organic Waste', image: 'organicos.svg' },
    { title: 'Cooking Oil', image: 'oleo.svg' },
  ]);
}