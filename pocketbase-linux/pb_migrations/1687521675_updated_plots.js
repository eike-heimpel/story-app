migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1pvts58uhlwqe73")

  // add
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5l2c42ks",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "n4bmfwot",
    "name": "long_description",
    "type": "text",
    "required": true,
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
    "id": "ook8xnx7",
    "name": "date",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1pvts58uhlwqe73")

  // remove
  collection.schema.removeField("oucxemop")

  // remove
  collection.schema.removeField("5l2c42ks")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "n4bmfwot",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ook8xnx7",
    "name": "field",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
})
