var methodOverride = require("method-override"),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose")
    express        = require("express"),
    app            = express();

mongoose.connect("mongodb://localhost/movie_review_app",{useNewUrlParser: true,useUnifiedTopology: true});
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride.("_method"));
app.use(express.static("public"))

//MONGOOSE, MODEL CONFIG
var movieSchema  = new mongoose.Schema({
    title: String;
    rating: Number;
    body: String;
    created: 
            {
                type:Date,
                default:Date.now
            }
});

var Movie = mongoose.model("Movie",movieSchema)