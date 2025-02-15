import 'dotenv/config';
import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { auth, lessons } from './routes/index.js';
import { checkToken } from './middlewares/authMiddleware.js';
import { corsOptions } from './config/corsConfig.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(helmet({ hsts: false }));
app.use(cors(corsOptions));
app.use(json());

app.use('/auth', auth);
app.use('/lessons', checkToken, lessons);
app.use('/', (req, res) => { res.send('Server is working') })

app.listen(port, async (error) => {
  if (error) console.log(error);

  console.log(`Server running at port: ${port}`);
});
