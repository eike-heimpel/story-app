migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1pvts58uhlwqe73")

  collection.indexes = [
    "CREATE INDEX `idx_eQTqJXy` ON `plots` (`name`)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z6a52gzo",
    "name": "name",
    "type": "text",
    "required": true,
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

  collection.indexes = [
    "CREATE INDEX `idx_eQTqJXy` ON `plots` (`plot_name`)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z6a52gzo",
    "name": "plot_name",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
