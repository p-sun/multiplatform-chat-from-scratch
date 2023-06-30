import { connect } from 'mongoose';
import {
  createNewConvo,
  createNewMessage,
  createNewUser,
  findFirstUserByEmail,
  getMessagesFromConvo,
  getMainConvo,
} from './queries';

export async function connectDB(
  dbUser: String,
  dbPassword: String,
  dbDatabase: string
) {
  const uri = `mongodb+srv://${dbUser}:${dbPassword}@multiplatformchat.${dbDatabase}.mongodb.net/?retryWrites=true&w=majority`;
  await connect(uri);
  console.log(`You're successfully connected to MongoDB!!`);
  await hydrateDatabase();
  console.log('Database hydration complete.');
}

async function hydrateDatabase() {
  const now = Date.now();

  const convoTitle = 'The Golden Trio333';
  const convo =
    (await getMainConvo(convoTitle)) ??
    (await createNewConvo({
      title: 'The Golden Trio333',
    }));

  const [harry, hermione, ron] = await Promise.all([
    (await findFirstUserByEmail('HarryPotter@hogwarts.com')) ??
      (await createNewUser({
        name: 'Harry',
        email: 'HarryPotter@hogwarts.com',
        createdAt: now,
        convos: [convo._id],
      })),
    (await findFirstUserByEmail('HermioneGranger@hogwarts.com')) ??
      (await createNewUser({
        name: 'Hermione',
        email: 'HermioneGranger@hogwarts.com',
        createdAt: now + 1,
        convos: [convo._id],
      })),
    (await findFirstUserByEmail('RonWeasley@hogwarts.com')) ??
      (await createNewUser({
        name: 'Ron',
        email: 'RonWeasley@hogwarts.com',
        createdAt: now + 2,
        convos: [convo._id],
      })),
  ]);

  const messages = await getMessagesFromConvo(convo._id);
  if (messages.length == 0) {
    createNewMessage({
      from: hermione._id,
      conversation: convo._id,
      createdAt: now + 3,
      contents: `Don't you understand how Cho's feeling at the moment?`,
    });
    createNewMessage({
      from: harry._id,
      conversation: convo._id,
      createdAt: now + 40,
      contents: `No`,
    });
    createNewMessage({
      from: ron._id,
      conversation: convo._id,
      createdAt: now + 40,
      contents: `No`,
    });
    createNewMessage({
      from: hermione._id,
      conversation: convo._id,
      createdAt: now + 60,
      contents: `Well, obviously, she's feeling very sad, because of Cedric dying. Then I expect she's feeling confused because she liked Cedric and now she likes Harry, and she can't work out who she likes best. Then she'll be feeling guilty, thinking it's an insult to Cedric's memory to be kissing Harry at all, and she'll be worrying about what everyone else might say about her if she starts going out with Harry. And she probably can't work out what her feelings toward Harry are anyway, because he was the one who was with Cedric when Cedric died, so that's all very mixed up and painful. Oh, and she's afraid she's going to be thrown off the Ravenclaw Quidditch team because she's been flying so badly.`,
    });
    createNewMessage({
      from: ron._id,
      conversation: convo._id,
      createdAt: now + 70,
      contents: `One person can't feel all that at once, they'd explode`,
    });
    createNewMessage({
      from: hermione._id,
      conversation: convo._id,
      createdAt: now + 80,
      contents: `Just because you've got the emotional range of a teaspoon`,
    });
  }

  return 1;
}
