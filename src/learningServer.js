import express from 'express'
import bodyParser from 'body-parser'
const app =express()
//objects of dummy data
//can be found as articleInfo['learn-react'].upvotes
const articleInfo= {
'learn-react': {
    upvotes: 0,
    comments:[],
},
'learn-node':{
    upvotes:0,
    comments:[],
},
'learn-life':{
    upvotes:0,
    comments:[],
}


}


app.use(bodyParser.json())
//app.get('/hello', (req, res)=> res.send('hello'))
//app.get('/hello/:name', (req, res)=>res.send(`Hello ${req.params.name}!`))
///app.post('/hello', (req, res)=>res.send(`Hello ${req.body.name}!`))

app.post('/api/articles/:name/upvote', (req, res)=>{
    const articleName=req.params.name //this gets the string inside the url where :name is
                                                                //for exmple: /api/articles/awesome/upvote 
                                                                //the articleName would be = awesome'

    articleInfo[articleName].upvotes +=1 //articleInfo[articleName] is  an opbject in articleInfo
                                                                  // which is here equals to the req.params.name (see above it would be awesome)
    res.status(200).send(`${articleName} now has ${articleInfo[articleName].upvotes} upvotes!`)

})

app.post('/api/articles/:name/add-comment',(req, res)=>{
     const {username, text}=req.body


    const articleName=req.params.name
  articleInfo[articleName].comments.push({username, text} ) //Remember push is to add items to array to conent .see the above articleInfo object keys
    res.status(200).send(articleInfo[articleName])


})


app.listen(8000, ()=> console.log("listetning on port 800"))