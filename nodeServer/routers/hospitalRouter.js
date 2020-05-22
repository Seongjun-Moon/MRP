// 병원 라우터
const express=require('express');
const router=express.Router();

// 의약품 유통이력 조회
router.post('/search', (res,req)=>{

})

// 업체 정보 조회
router.post("/companyInfo", async(req, res)=>{
    try{
        const companyInfo=await company.findAll({

        })

        console.log(companyInfo);
        res.json(companyInfo);
    }catch(err){
        console.log(err);
        res.json({message:false})
    }
})

module.exports=router;
