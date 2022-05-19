[Go back](../README.md)

# Get all projects

Used to retrieve all projects.

**URL** : `/api/project/`

**Method** : `GET`

**Auth required** : `false`

## Available parameters

All parameters are sent as query string parameters.
You can use multible parameters in one request, then only projects that match all parameters are returned.

-   `ids` - Will only return projects with the given ids.
-   `languageIDs` - Will only return projects with the given programming languages ids.
-   `projectName` - Will only return projects that contain the given string in their name.

**_Note:_** The `ids` parameter is a comma separated list of unique ids.

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
