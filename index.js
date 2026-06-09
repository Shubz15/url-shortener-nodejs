const express=require('express');
const app=express();
const cookieParser=require("cookie-parser")

const path=require("path");

const {connectToMongoDB}=require('./connect');

const URL=require('./models/url');

const urlRoute=require('./routes/url');
const staticRoute=require('./routes/staticRouter');
const userRoute=require('./routes/user');
const {restrictToLoggedinUserOnly,checkAuth}=require('./middlewares/auth');
const { handleVisitHistory } = require('./controllers/url');

app.set("view engine","ejs")
app.set("views", path.resolve("./views"));
const port=8001;

//mongoose Connection
connectToMongoDB('mongodb://localhost:27017/short-url')
	.then(() => console.log("MongoDB connected"))
	.catch(err => console.error("MongoDB connection error:", err));


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//routes
app.use('/url',restrictToLoggedinUserOnly,urlRoute);
app.use('/',checkAuth,staticRoute);
app.use('/user',userRoute);


// Expose short URL redirects at site root: GET /:shortId
//app.get('/:shortId', handleVisitHistory);


// app.get('/urlss/test',async (req,res)=>{
// 	const allUrls= await URL.find({});
// 	return res.render("home",{
// 		urls:allUrls
// 	});
//})
//app.get(
	//'/:shortId', async (req, res {
	// const shortId = req.params.shortId;

	// const entry = await URL.findOneAndUpdate(
	// 	{ shortId },
	// 	{ $push: { visitHistory: { timestamp: Date.now() } } },
	// 	{ new: true }
	// );

	// if (!entry) return res.status(404).json({ error: 'Short URL not found' });

	// return res.redirect(entry.redirectUrl);
//});

app.listen(port, ()=>console.log("Server started"));  