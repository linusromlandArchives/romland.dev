[Go back](../README.md)

# Create Programming Language

Used to edit a Programming Language.

**URL** : `/api/programmingLanguage/`

**Method** : `PUT`

**Auth required** : `true`

**Data constraints**

```json
{
	"programmingLanguageID": "[programmingLanguageID]",
	"programmingLanguageName": "[programmingLanguageName]",
	"programmingLanguageDescription": "[programmingLanguageDescription]",
	"programmingLanguageIcon": "[programmingLanguageIcon]",
	"programmingLanguageURL": "[programmingLanguageURL]"
}
```

**_Note:_** All fields are optional except for `projectID`.

**Data example**

```json
{
	"programmingLanguageID": "xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx",
	"programmingLanguageDescription": "JavaScript is a cool language"
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
		"programmingLanguageID": "xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx",
		"programmingLanguageName": "JavaScript",
		"programmingLanguageDescription": "JavaScript is a cool language",
		"programmingLanguageIcon": "https://www.datocms-assets.com/48401/1637694888-javascript-logo.svg",
		"programmingLanguageURL": "https://www.javascript.com/",
		"updatedAt": "1970-01-01T00:00:00.000Z",
		"createdAt": "1970-01-01T00:00:00.000Z"
	}
}
```

## Error Response

### If language is not found.

**Code** : `400 Bad Request`

**Content** :

```json
{
	"success": false,
	"error": "Language not found."
}
```

### If no fields are included in the body.

**Code** : `400 Bad Request`

**Content** :

```json
{
	"success": false,
	"error": "Please provide a valid programmingLanguageName, programmingLanguageIcon, programmingLanguageDescription or programmingLanguageURL."
}
```

### If `programmingLanguageName` already exists.

**Code** : `400 Bad Request`

**Content** :

```json
{
	"success": false,
	"error": "The language JavaScript already exists."
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
