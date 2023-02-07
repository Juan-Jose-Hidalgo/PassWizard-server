import { Router, Request, Response } from "express";

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send({ data: 'Aqui_van_los_models' });
});

router.post('/', (req: Request, res: Response) => {
    res.send({ data: 'Aqui_van_los_models' });
});

router.put('/', (req: Request, res: Response) => {
    res.send({ data: 'Aqui_van_los_models' });
});

router.delete('/', (req: Request, res: Response) => {
    res.send({ data: 'Aqui_van_los_models' });
});

export { router };