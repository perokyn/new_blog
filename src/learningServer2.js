import express from 'express'
import bodyParser from 'body-parser'
import {MongoClient} from 'mongodb'
const app =express()



app.use(bodyParser.json())
//dry the code DRY: dont repeat yourself
///refractor code so we dont reapat connecting and finding and close client all the time
const withDB=()=>{


}

app.get('/api/articles/:name', async (req, res)=>{
   
    try{
        const articleName=req.params.name
        const client= await MongoClient.connect('mongodb://127.0.0.1:27017', 
        { useNewUrlParser: true,
        useUnifiedTopology: true })

        const db =client.db('my-blog')
        const articleInfo=await db.collection('articles').findOne({name:articleName})
        res.status(200).json(articleInfo)
      client.close()
    }catch(error){
        res.status(500).json({message: "Error :~/", error})
      }    
})



app.post('/api/articles/:name/upvote', async (req, res)=>{


  try{
  const articleName=req.params.name
  const client= await MongoClient.connect('mongodb://127.0.0.1:27017', {
     useNewUrlParser: true,
  useUnifiedTopology: true})
  const db =client.db('my-blog')
  
  const articleInfo=await db.collection('articles').findOne({name:articleName})
  await db.collection('articles').updateOne({name: articleName}, 
   { '$set':{
       upvotes: articleInfo.upvotes +1
      }
    })

    const updatedArticleInfo= await db.collection('articles').findOne({name:articleName})
    res.status(200).json(updatedArticleInfo)
    client.close()

  } catch(error){
    res.status(500).json({message: "Error :~/", error})
  }    
})






app.listen(8000, ()=> console.log("listetning on port 8000!")) 