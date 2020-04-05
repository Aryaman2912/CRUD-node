var methodOverride = require("method-override"),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose")
    express        = require("express"),
    app            = express();

mongoose.connect("mongodb://localhost/movie_review_app",{useNewUrlParser: true,useUnifiedTopology: true});
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static("public"))

//MONGOOSE, MODEL CONFIG
var movieSchema  = new mongoose.Schema({
    title: String,
    rating: Number,
    description: String,
    created: 
            {
                type:Date,
                default:Date.now
            }
});

var Movie = mongoose.model("Movie",movieSchema)

//ROUTES

app.get("/",function(req,res){
    res.redirect("/movies");
});

//INDEX ROUTE
app.get("/movies",function(req,res){
    Movie.find({},function(err,movies){
        if(err){
            res.send("Something went wrong!");
        }
        else{
            res.render("index",{movies:movies})
        }
    });
});

app.listen(8000,function(){
    console.log("Server Started")
})