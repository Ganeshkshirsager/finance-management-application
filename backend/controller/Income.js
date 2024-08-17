const IncomeSchema = require("../models/IncomeModel")

exports.addIncome = async (req, res) =>{
    const {title, amount, category, description, date}  = req.body
    
    const income = IncomeSchema({
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
        await income.save()
        res.status(200).json({msg:"Income Added"})
    }catch(error){
        res.status(500).json({msg: "server error"})
    }

    console.log(income)
}

exports.getIncome = async (req, res) =>{
    try{
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    }catch(error){
        res.status(500).json({msg: "server error"})
    }
}


exports.deleteIncome = async (req, res) =>{
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
    .then((income) =>{
        res.status(200).json({msg: "income deleted"})
    })
    .catch((error) =>{
        res.status(500).json({msg: "server error"})
    })
}