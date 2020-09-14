
exports.seed = async function(knex) {
      // Deletes ALL existing entries
      // await knex("users_table").turncate()
      await  knex("users_table").insert([
        {name: "Kadeem"},
        {name: "Jailene"},
        {name: "Leisha"},
        {name: "Junior"},
      ]) 
}
