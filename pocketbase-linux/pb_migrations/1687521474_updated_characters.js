migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2r37hjunza3tj97")

  // add
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

  // add
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "woocxnry",
    "name": "long_description",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 1000,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2r37hjunza3tj97")

  // remove
  collection.schema.removeField("pea2zphb")

  // remove
  collection.schema.removeField("n2xplrnq")

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
})
