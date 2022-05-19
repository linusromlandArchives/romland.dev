[Go back](../README.md)

# Get one project image

Used to retrieve one project image.

**URL** : `/api/project/[projectImageID]`

**Method** : `GET`

**Auth required** : `false`

## Success Response

**Code** : `200 OK`

**URL example** : `/api/projectImage/xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx`

**_Note:_** The image will be returned as a file.

## Error Response

### Invalid project image ID

**Code** : `404 Not Found`

**Content** :

```json
{
	"success": false,
	"error": "Project Image not found"
}
```

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
