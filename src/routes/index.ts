import {Router} from 'express';

import messageBoard from './messageBoard';

const router = Router();

router.use('/subscribe', messageBoard);

export default router;