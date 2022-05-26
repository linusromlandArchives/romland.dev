[Go back](../README.md)

# Create project

Used to create a project.

**URL** : `/api/project/`

**Method** : `POST`

**Auth required** : `true`

**Data constraints**

```json
{
	"projectName": "[projectName]",
	"projectDescription": "[projectDescription]",
	"projectSourceCodeURL": "[projectSourceCodeURL]",
	"projectURL": "[projectURL]",
	"languageIDs": ["[languageID]"]
}
```

**Data example**

```json
{
	"projectName": "romland.dev",
	"projectDescription": "Project for displaying my created projects",
	"projectSourceCodeURL": "https://github.com/linusromland/romland.dev",
	"projectURL": "https://romland.dev/",
	"languageIDs": ["af60d9ae-89f7-4bc9-ab81-9320036ac363"]
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
	"success": true,
	"error": "",
	"data": {
		"projectID": "xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx",
		"projectName": "romland.dev",
		"projectDescription": "Project for displaying my created projects",
		"projectSourceCodeURL": "https://github.com/linusromland/romland.dev",
		"projectURL": "https://romland.dev/",
		"updatedAt": "1970-01-01T00:00:00.000Z",
		"createdAt": "1970-01-01T00:00:00.000Z"
	}
}
```

## Error Response

### If not all fields are included in the body.

**Code** : `400 Bad Request`

**Content** :

```json
{
	"success": false,
	"error": "Missing required fields."
}
```

### If `projectName` already exists.

**Code** : `400 Bad Request`

**Content** :

```json
{
	"success": false,
	"error": "The project romland.dev already exists."
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
