# Express

Use TypeScript decorators to register express restful service. Node Express module: less code to run a server.

## Requirements

-   express 4.19.2
-   node 20
-   typescript 5
-   typedoc

## Install

```bash
npm install decor-express --save
```

## Usage

### Connecting Server

in your **server.ts** file.

```typescript
import { Server, Database } from 'express';
//LOAD YOUR CONTROLLERS
import './controllers';

try {
    const database = new Database(process.env.DATABASE as string, process.env.NODE_ENV as string);
    database.connect();
    console.log('Database connected.');
} catch (error) {
    console.log(error);
    process.abort();
}

export = Server.create({
    views: 'views',
    public: 'public',
    enableSession: true,
    sessionSecret: process.env.DATABASE as string
});
```

Options `Server.create(options)`

1. views - Template directory for hbs files
2. public - public assets folder
3. enableSession - Enable or disable session
4. sessionSecret - unique secret key for session
5. beforeRouteInjection (optional) - a callback function that runs before Route mounting
6. afterRouteInjection (optional) - a callback function that runs after Route mounting

### Controller

file **controllers/UsersController.ts**

```typescript
import { Request, Response } from 'express';
import { Controller, Get, Post, Put, Delete, Patch, Middleware } from 'express';

@Controller('/users', middlewareExample)
export class UsersController {
    static children: Array<IRouteParams> = []; /// required

    @Middleware(anyMiddleware) /// single middleware
    @Get('/')
    index(req: Request, res: Response) {
        res.json({
            _id: '830493kdiei033-303939kfkdk',
            name: 'User',
            address: 'Siliguri'
        });
    }

    @Middleware(anyMiddleware)
    @Middleware(anotherMiddleware)
    @Post('/')
    oneUser(req: Request, res: Response) {
        res.send('You are User');
    }
}
```

More Decorators are described below

### Route Decorators

#### @Controller

This is Class decorator

```typescript
// without middleware
@Controller('/users')
class User {...}

// with one middleware
@Controller('/users', myMiddleware)
class User {...}

// with many middlewares
@Controller('/users', [myMiddleware, anotherMiddleware])
class User {...}
```

#### @Middleware

Method Decorator

```typescript
// without middleware
@Controller('/users')
class User {
    @Middleware(myMiddleware)
    @Post('/')
    create(req, res, next){...}
}
```

#### @Post

Method Decorator

```typescript
// without middleware
@Controller('/users')
class User {
    @Post('/')
    create(req, res, next){...}
}
```

#### @Get

Method Decorator

```typescript
// without middleware
@Controller('/users')
class User {
    @Get('/')
    create(req, res, next){...}
}
```

#### @Put

Method Decorator

```typescript
// without middleware
@Controller('/users')
class User {
    @Put('/')
    create(req, res, next){...}
}
```

#### @Patch

Method Decorator

```typescript
// without middleware
@Controller('/users')
class User {
    @Patch('/')
    create(req, res, next){...}
}
```

#### @Delete

Method Decorator

```typescript
// without middleware
@Controller('/users')
class User {
    @Delete('/')
    create(req, res, next){...}
}
```

## License

[MIT](http://vjpr.mit-license.org)
