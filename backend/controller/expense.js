const ExpenseSchema = require("../models/ExpenseModel")

exports.addExpense = async (req, res) =>{
    const {title, amount, category, description, date}  = req.body
    
    const Expense = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try{
        if(!title || !category || !description || !date){
            return res.status(400).json({msg: "all fields required"})
        }
        if(amount <=0 || !amount === 'number'){
            return res.status(400).json({msg: "amount must be a number"})
        }
        await Expense.save()
        res.status(200).json({msg:"Expense Added"})
    }catch(error){
        res.status(500).json({msg: "server error"})
    }

    console.log(Expense)
}

exports.getExpense = async (req, res) =>{
    try{
        const Expense = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(Expense)
    }catch(error){
        res.status(500).json({msg: "server error"})
    }
}


exports.deleteExpense = async (req, res) =>{
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
    .then((Expense) =>{
        res.status(200).json({msg: "Expense deleted"})
    })
    .catch((error) =>{
        res.status(500).json({msg: "server error"})
    })
}