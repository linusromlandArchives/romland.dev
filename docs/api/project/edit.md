[Go back](../README.md)

# Create project

Used to edit a project.

**URL** : `/api/project/`

**Method** : `PUT`

**Auth required** : `true`

**Data constraints**

```json
{
	"projectID": "[projectID]",
	"projectName": "[projectName]",
	"projectDescription": "[projectDescription]",
	"projectSourceCodeURL": "[projectSourceCodeURL]",
	"projectURL": "[projectURL]",
	"languageIDs": ["[languageID]"]
}
```

**_Note:_** All fields are optional except for `projectID`.

**Data example**

```json
{
	"projectID": "xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx",
	"projectDescription": "Romland.dev is a good project!"
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
		"projectDescription": "Romland.dev is a good project!",
		"projectSourceCodeURL": "https://github.com/linusromland/romland.dev",
		"projectURL": "https://romland.dev/",
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
	"error": "Project not found."
}
```

### If no fields are included in the body.

**Code** : `400 Bad Request`

**Content** :

```json
{
	"success": false,
	"error": "Please provide a valid projectName, projectDescription, projectSourceCodeURL, projectURL or languageIDs."
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
