{
    "name": "bootloader",
    "appDir": "../src",
    "baseUrl": "js",
    "include": ["main"],
    "findNestedDependencies": true,
    "removeCombined": true,
    "dir": "../build",
    "optimize": "uglify2",
    "waitSeconds": 0,
    "paths": {
        "glsl": "loaders/glsl",
        "text": "loaders/text",
        "json": "loaders/json",
        "template": "loaders/template"
    },
    "uglify2": {
        "compress": {
            "drop_debugger": true,
            "global_defs": {
                "DEBUG": false,
                "VERSION": "UNKNOWN"
            }
        }
    }
}