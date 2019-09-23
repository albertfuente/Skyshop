const logic=require('../../logic')

module.exports=async(req,res)=>{
    const{params:{productId}}=req
    try{
        await logic.product.unregister(productId)
        res.json({message:'Product removed successfully'})
    }catch({message}){
        res.status(404).json({error:message})
    }
}