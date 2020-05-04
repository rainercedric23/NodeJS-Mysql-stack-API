## Creating New middleware

You may follow this [link](https://expressjs.com/en/guide/writing-middleware.html) for an extended explanation on how it works.

Basically, you may edit the `expressServer.ts` and add a middleware that you may want before going to the application logic, import your middleware file:

```
import authMiddleware from "@middlewares/yourMiddleware";

```

Then add it on to the `setupMiddleware` method like this:


```
this.app.use(yourMiddleware());

```

Add your middleware class/function to the middlewares directory:

```
import Logger from "@app/logger";


function yourMiddleware() {
    return (req, res, next) => {
        // Your middleware code goes here
        next();
    };
}

export default yourMiddleware;

```