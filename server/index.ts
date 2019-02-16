import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

const dev_db_url = 'mongodb://localhost:27017/scrum_board';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose
  .connect(mongoDB, { useNewUrlParser: true })
  .then(() => {
    console.log('db connected');
  })
  .catch((err) => {
    console.error(err);
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Schema = mongoose.Schema;

const subTaskSchema = new Schema({
  name: { type: String, required: true },
  status: { type: String, required: true }
});

const StorySchema = new Schema({
  name: { type: String, required: true },
  subTasks: [subTaskSchema]
});

const Story = mongoose.model('Story', StorySchema);

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.get('/stories', (req: express.Request, res: express.Response) => {
  Story.find()
    .then((stories) => {
      res.json(stories);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post('/stories', (req: express.Request, res: express.Response) => {
  const story = req.body.story;
  Story.create(story)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.put('/stories/:id', (req: express.Request, res: express.Response) => {
  const story = req.body.story;
  const storyId = req.params.id;
  Story.findByIdAndUpdate(storyId, story)
    .then(() => Story.findById(storyId))
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.delete('/stories/:id', (req: express.Request, res: express.Response) => {
  const storyId = req.params.id;
  Story.deleteOne({ _id: storyId })
    .then((result) => {
      res.status(200).end();
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.listen(3030, () => {
  console.log('app');
});
