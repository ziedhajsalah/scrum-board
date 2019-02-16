import * as express from 'express';
import * as bodyParser from 'body-parser';
import { MongoClient, Db } from 'mongodb';

let db: Db;

MongoClient.connect('mongodb://localhost:27017/scrum_board', {
  useNewUrlParser: true
}).then((client) => {
  db = client.db();
});

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(bodyParser.json());

app.get('/stories', (req: express.Request, res: express.Response) => {
  db.collection('stories')
    .find()
    .toArray()
    .then((stories) => {
      res.json(stories);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post('/stories', (req: express.Request, res: express.Response) => {
  const stories = req.body.stories;
  if (stories.length < 1) {
    res.end();
  } else {
    db.collection('stories')
      .deleteMany({})
      .then(() => {
        db.collection('stories')
          .insertMany(stories)
          .then(() => {
            res.send(stories);
          });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
});

app.listen(3030, () => {
  console.log('app');
});
