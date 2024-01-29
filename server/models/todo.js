const mongoose=require('mongoose')

const TodoSchema=new mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    done:{
        type:Boolean,
        default:false
    }
})

const todoModel=mongoose.model("todos",TodoSchema)
module.exports=todoModel