//심평원 라우터
const express=require('express');
const router=express.Router();
const medicine=require('../models').Medicine;
const company=require('../models').Company;

// 의약품 유통이력 조회
router.post('/search', (res,req)=>{

})

// 의약품 정보 등록
router.post("/mediEnroll", async(req,res)=>{
    const mediCode=req.body.mediCode
    const companyCode=req.body.companyCode
    const mediName=req.body.mediName
    const mediType=req.body.mediType
    const count=req.body.count
    const permissionDate=req.body.permissionDate
    const cancelDate=req.body.cancelDate

    
    try{
        const mediEnroll=await medicine.create({
            mediCode,
            companyCode,
            mediName,
            mediType,
            count,
            permissionDate,
            cancelDate
        });

        console.log(mediEnroll);
        res.json({message:true});

    }catch(err){
        console.log(err);
        res.json({message:false});
    }
})

// 의약품 정보 조회
router.post("/mediInfo", async(req, res)=>{
    try{
        const mediInfo=await medicine.findAll({
            
            
            order: [['permissionDate', 'DESC']]
        });

        console.log(mediInfo);
        res.json(mediInfo);
    }catch(err){
        console.log(err);
        res.json({message:false})
    }
})

// 업체 정보 조회
router.post("/companyInfo", async(req, res)=>{
    try{
        const companyInfo=await company.findAll({
            
            order: [['companyCode', 'ASC']]
        })

        console.log(companyInfo);
        res.json(companyInfo);
    }catch(err){
        console.log(err);
        res.json({message:false})
    }
})

module.exports=router;
