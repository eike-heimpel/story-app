migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2r37hjunza3tj97")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pea2zphb",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "n2xplrnq",
    "name": "one_line_description",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 30,
      "max": 200,
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
    "id": "pea2zphb",
    "name": "short_description",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "n2xplrnq",
    "name": "one_line_description",
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
})
