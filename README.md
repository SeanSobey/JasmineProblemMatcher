# Jasmine Problem Matcher

A problem matcher to show [Jasmine](https://jasmine.github.io/) spec errors when running tests in the terminal.

## Usage

You can enable this problem matcher by using its name "$jasmine".

The following example shows how to add problem matchers to your project:

```json
{
	"version": "2.0.0",
	"type": "shell",
	"tasks": [
		{
			"taskName": "test",
			"command": "jasmine",
			"group": "test",
			"args": [],
			"problemMatcher": "$jasmine"
		}
	]
}
```
