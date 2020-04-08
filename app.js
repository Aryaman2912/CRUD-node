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
    review: String,
    image: String,
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

//INDEX - Home page
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

//NEW - form to render form to add new review 
app.get("/movies/new",function(req,res){
    res.render("new");
});

//CREATE - add review to form
app.post("/movies/",function(req,res){
    Movie.create(req.body.movie,function(err,newmovie){
        if(err){
            res.render("new");
        }
        else{
            res.redirect("/movies/");
        }
    });
});

//SHOW - detailed review for a moview
app.get("/movies/:id",function(req,res){
    Movie.findById(req.params.id,function(err,foundMovie){
        if(err){
            res.send("Oops! Something went wrong!")
        }
        else{
            res.render("show",{Movie:foundMovie})
        }
    });
});

app.get("/movies/:id/edit",function(req,res){
    Movie.findById(req.params.id,function(err,movie){
        if(err){
            res.send("Oops! Something went wrong!")
        }
        else{
            res.render("edit",{movie:movie})
        }
    });
});

app.put("/movies/:id",function(req,res){
    Movie.findByIdAndUpdate(req.params.id,req.body.movie,function(err,movie){
        if(err){
            res.send("Oops! Something went wrong!");
        }
        else{
            res.redirect("/movies/" + req.params.id)
        }
    })
})

app.listen(8000,function(){
    console.log("Server Started")
})

// Harry Potter and the Deathly Hallows – Part 2
// https://upload.wikimedia.org/wikipedia/en/7/74/DeathlyHallowsGame2cover.jpg
//Harry Potter and the Deathly Hallows part 2 was a fitting conclusion to the harry potter franchise. The emotions were brought about brilliantly by the actors and the direction was very good as well. Emma Watson was captivating as always.

