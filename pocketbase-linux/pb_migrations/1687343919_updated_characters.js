migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2r37hjunza3tj97")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "woocxnry",
    "name": "description",
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
  const collection = dao.findCollectionByNameOrId("2r37hjunza3tj97")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "woocxnry",
    "name": "description",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 50,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
