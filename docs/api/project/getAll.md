[Go back](../README.md)

# Get all projects

Used to retrieve all projects.

**URL** : `/api/project/`

**Method** : `GET`

**Auth required** : `false`

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
	"success": true,
	"error": "",
	"data": []
}
```

**_Note:_** All projects are returned in the `data` key.

## Error Response

### Unknown error.

**Code** : `500 Internal Server Error`

**Content** :

```json
{
	"success": false,
	"error": ""
}
```

**_Note:_** The error message is not specified in the documentation.
