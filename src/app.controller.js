import connectDB from "./DB/connectionDb.js"
import messageRouter from "./modules/messages/message.controller.js"
import userRouter from "./modules/users/user.controller.js"
import morgan from "morgan"
import cors from "cors"
import rateLimit from "express-rate-limit";
import helmet from "helmet";
const bootstrap=(app,express)=>{

const allowedOrigins = ["http://localhost:3000", "http://localhost:4200"];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
})); 

const limiter = rateLimit({
  windowMs:  60 * 1000, // 15 دقيقة
  max: 100, // أقصى عدد requests لكل IP في الفترة دي
  message: "Too many requests from this IP, please try again later."
});
app.use(limiter);
app.use(express.json())
app.use( morgan("dev") )
app.use(helmet());

    
  //  error handling 
  
      
connectDB()
app.use("/users",userRouter)
app.use("/messages",messageRouter)
app.use("/uploads",express.static("uploads"))
app.get('/', (req, res) => res.status(200).json({message:`welcom to my app`}))


app.use("{/*demo}",(req,res,next)=>
{
    return res.status(404).json({message:`Url Notfound ${req.originalurl}`})
})



app.use((err, req, res, next) => {
    
  return res.status(err["cause"]||500).json({
    message: err.message,
    stack: err.stack,
    error: err,
  });
});



}



export default bootstrap