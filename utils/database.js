import mongoose from "mongoose";

const database = () => {
    mongoose.connect(process.env.MONGODB_URL).then(res => console.log('Database connected')).catch(err => console.log('Err in connecting database'))
}

export default database