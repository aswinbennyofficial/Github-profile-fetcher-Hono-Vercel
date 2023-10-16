import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const config = {
  runtime: 'edge',
}

const app = new Hono().basePath('/api')

app.get('/', (c) => c.json({ message: 'Hello Hono!' }))

app.get('/github/:id', async (c) =>{
  const id=c.req.param("id");
  const ProfileUrl='https://api.github.com/users/'+id;
  const repoUrl='https://api.github.com/users/'+id+'/repos';
  

  // for profile info
  const Profilefetched = await fetch(ProfileUrl);
  const profileJson = await Profilefetched.json();

  //for repo info
  const repofetched = await fetch(repoUrl);
  const repoJson = await repofetched.json();

  const repoarray : string[]=[]; //explicitly type the array;

  for( var i in repoJson){
      repoarray.push(repoJson[i].name);
  }

 // merging array and json
  const final = { ...profileJson, repolist: repoarray };

  return c.json(final);

  
} 
);

export default handle(app)