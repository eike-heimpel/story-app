migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1pvts58uhlwqe73")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oucxemop",
    "name": "short_description",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 200,
      "max": 400,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1pvts58uhlwqe73")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oucxemop",
    "name": "short_description",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 150,
      "max": 400,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
