The `context` object provides access to a `logger` that you can use for debugging and monitoring.

```javascript
// In local functions
context.logger.log("Processing request");
context.logger.error("An error occurred");
context.logger.warn("Warning message");
```

`context.logger` has the following limitations:

- **Character limit**: Log messages are limited to 100 characters.
- **Local functions only**: The logger is only available in local functions.
- **Log levels**: The logger supports the following log levels: `log`, `error`, `warn`.