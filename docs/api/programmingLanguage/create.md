[Go back](../README.md)

# Create Programming Language

Used to create a Programming Language.

**URL** : `/api/programmingLanguage/`

**Method** : `POST`

**Auth required** : `true`

**Data constraints**

```json
{
	"programmingLanguageName": "[programmingLanguageName]",
	"programmingLanguageDescription": "[programmingLanguageDescription]",
	"programmingLanguageIcon": "[programmingLanguageIcon]",
	"programmingLanguageURL": "[programmingLanguageURL]"
}
```

**Data example**

```json
{
	"programmingLanguageName": "JavaScript",
	"programmingLanguageDescription": "JavaScript, often abbreviated JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.",
	"programmingLanguageIcon": "https://www.datocms-assets.com/48401/1637694888-javascript-logo.svg",
	"programmingLanguageURL": "https://www.javascript.com/"
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
		"programmingLanguageDescription": "JavaScript, often abbreviated JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.",
		"programmingLanguageIcon": "https://www.datocms-assets.com/48401/1637694888-javascript-logo.svg",
		"programmingLanguageURL": "https://www.javascript.com/",
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
