require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

function searchByItemName(searchTerm) {
  knexInstance
    .select('*')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {console.log(result)})
}

function paginateItems(page) {
  const itemsPerPage = 6;
  const offset = itemsPerPage * (page - 1)

  knexInstance
    .select('*')
    .from('shopping_list')
    .limit(itemsPerPage)
    .offset(offset)
    .then(result => {console.log(result)})
}

function addedAfterDate(daysAgo) {
  knexInstance
    .select('*')
    .from('shopping_list')
    .where(
      'date_added',
      '>',
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    )
    .then(result => {console.log(result)})
}

function totalCostOfCategory() {
  knexInstance
    .select('category')
    .from('shopping_list')
    .count('price as total')
    .groupBy('category')
    .then(result => {console.log(result)})
}

