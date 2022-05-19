[Go back](../README.md)

# Create Project Image

Used to create a project image.

**URL** : `/api/projectImage/[projectImageID]`

**Method** : `POST`

**Auth required** : `true`

**Data constraints**

> Specify the project image ID in the URL.

| Required | Parameter | Description             | Datatype |
| -------- | --------- | ----------------------- | -------- |
| `true`   | file      | The File to be uploaded | File     |

**_Note:_** The project image body is **NOT** a JSON object. Send the body as a `multipart/form-data`.

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
	"success": true,
	"error": "",
	"data": {
		"projectImagesID": "xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx",
		"projectImagesFileName": "1652952412839-image.png",
		"updatedAt": "1970-01-01T00:00:00.000Z",
		"createdAt": "1970-01-01T00:00:00.000Z"
	}
}
```

### If user is not authorized.

**Code** : `401 Unauthorized`

**Content** :

```json
{
	"success": false,
	"error": "Unauthorized",
	"user": null
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
