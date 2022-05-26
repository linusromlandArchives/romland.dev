[Go back](../README.md)

# Delete project

Used to delete a project.

**URL** : `/api/project/`

**Method** : `DELETE`

**Auth required** : `true`

**Data constraints**

```json
{
	"projectID": "[projectID]"
}
```

**Data example**

```json
{
	"projectID": "xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
	"success": true,
	"error": "",
	"message": "Project deleted"
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
