import { Router, Response, Request } from 'express';

const exampleRouter: Router = Router();

exampleRouter.get('/', (req: Request, res: Response) => {
    res.send('ok');
});


export { exampleRouter };
