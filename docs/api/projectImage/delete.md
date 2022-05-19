[Go back](../README.md)

# Delete Project Image

Used to delete a project image.

**URL** : `/api/projectImage/`

**Method** : `DELETE`

**Auth required** : `true`

**Data constraints**

```json
{
	"projectImagesID": "[projectImagesID]"
}
```

**Data example**

```json
{
	"projectImagesID": "xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
	"success": true,
	"error": "",
	"message": "Project image deleted"
}
```

## Error Response

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
