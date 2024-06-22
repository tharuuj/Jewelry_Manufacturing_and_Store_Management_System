const mongoose=require("mongoose");

//show Configuration massege


const DBconnect=async()=>{

        try{

            await mongoose.connect(process.env.MongoDB_URL);
            console.log("Succsessfully Connected to MongoDB");


        }
        catch (Error) {
            console.error(`ERROR: ${Error.message}`);
            process.exit(1);
          }
        };


module.exports= DBconnect;

