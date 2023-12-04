import {Router} from 'express';

import messageBoard from './messageBoard';

const router = Router();

router.use('/messageBoard', messageBoard);

export default router;