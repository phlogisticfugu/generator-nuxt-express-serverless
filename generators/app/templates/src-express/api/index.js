import { Router } from 'express'
import helloworld_router from './hello-world'

const router = Router()

/*
 * Configure our actual routes here
 */
router.use('/hello-world', helloworld_router)

export default router
