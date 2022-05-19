[Go back](../README.md)

# Create Project Image

Used to create a project image.

**URL** : `/api/projectImage/[projectID]`

**Method** : `POST`

**Auth required** : `true`

**Data constraints**

> Specify the project ID in the URL.

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

## Error Response

### If project is not found.

**Code** : `400 Bad Request`

**Content** :

```json
{
	"success": false,
	"error": "Project not found"
}
```

### If no file is uploaded.

**Code** : `400 Bad Request`

**Content** :

```json
{
	"success": false,
	"error": "No files were uploaded"
}
```

### If file is not of type image.

**Code** : `400 Bad Request`

**Content** :

```json
{
	"success": false,
	"error": "File is not an image"
}
```

### If file is too large.

**Code** : `400 Bad Request`

**Content** :

```json
{
	"success": false,
	"error": "File is too large"
}
```

### If file that has already been uploaded is uploaded again.

**Code** : `400 Bad Request`

**Content** :

```json
{
	"success": false,
	"error": "The project image fileName already exists"
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
