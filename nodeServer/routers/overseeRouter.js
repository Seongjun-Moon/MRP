//심평원 라우터
const express=require('express');
const router=express.Router();
const MediInfo=require('../models').MediInfo;

// 의약품 유통이력 조회
router.post('search', (res,req)=>{

})

// 의약품 정보 조회
router.post("mediInfo", async(req, res)=>{
    try{
        const mediInfoAll=await MediInfo.findAll({

        })

        console.log(mediInfoAll);
        res.json(mediInfoAll);
    }catch(err){
        console.log(err);
        res.json({message:false})
    }
})

module.exports=router;
