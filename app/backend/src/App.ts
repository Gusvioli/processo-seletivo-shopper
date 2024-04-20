import express from 'express';
import Shopper from './routes/Shopper';
import Products from './routes/Products';
import CreateDatabaseAll from './models/db/CreateDatabaseAll';
import UpdateProducts from './routes/UpdateProducts';

class App {
  public app: express.Express

  constructor() {
    this.app = express()
    this.config()

    this.app.get('/', Shopper);
    this.app.post('/products', Products);
    this.app.put('/updateproducts', UpdateProducts);

  }

  private config(): void {
    CreateDatabaseAll.createDatabase();
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header(
        'Access-Control-Allow-Methods',
        'GET,POST,DELETE,OPTIONS,PUT,PATCH',
      )
      res.header('Access-Control-Allow-Headers', '*')
      next()
    }

    this.app.use(express.json())
    this.app.use(accessControl)
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`))
  }
}

export default App
