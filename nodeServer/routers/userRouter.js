const express=require("express");
const router=express.Router();

/// 아직 userDB 있긴한데 아직 미완....
const user=require('../models').User;


// 로그인
router.post('/signIn', async(req, res)=>{
    const id=req.body.id
    const pw=req.body.pw
    const companyType=req.body.companyType

    try{
        const signIn=await user.findOne({
            where:{id, pw, companyType}
        })

        res.json({companyType:signIn.companyType})
    }catch(err){
        console.log(err);
        res.json({message:"false"})
    }
})

// 회원가입
router.post('/signUp', async(req, res)=>{
    const id=req.body.id
    const pw=req.body.pw
    const companyCode=req.body.companyCode
    const companyName=req.body.companyName
    const companyType=req.body.companyType
    

    try{
        const signUp=await user.create({
            id,
            pw,
            companyCode,
            companyName,
            companyType
        })
        console.log(signUp);
        res.json({message:companyName});
    }catch(err){
        console.log(err);
        res.json({message:"false"})
    }
})

module.exports=router;