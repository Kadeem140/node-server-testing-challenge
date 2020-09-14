
exports.up = async function(knex) {
    await knex.schema.createTable("users_table", (table) => {
		table.increments()
		table.text("name").notNullable()
	})
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("users_table")
};
