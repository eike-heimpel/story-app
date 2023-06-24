migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1pvts58uhlwqe73")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z6a52gzo",
    "name": "plot_name",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1pvts58uhlwqe73")

  // remove
  collection.schema.removeField("z6a52gzo")

  return dao.saveCollection(collection)
})
