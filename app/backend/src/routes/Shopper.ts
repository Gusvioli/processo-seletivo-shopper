import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
    res.send('Oi Shopper, obrigado por essa oportunidade!')
})

export default router