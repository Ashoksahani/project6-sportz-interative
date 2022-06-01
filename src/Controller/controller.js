const CountryModel = require("../Model/countryModel");
//const ObjectId = require('mongoose').Types.ObjectId
const mongoose = require('mongoose')


const isValidIdType = function(objectId){
    return mongoose.Types.ObjectId.isValid(objectId)
    }


const isValid = function (value) {
    if (typeof value == undefined || value === null) return false
    if (typeof value == 'string' && value.trim().length === 0) return false
    return true
}

const isValidImageType = function(value) {
    const regexForMimeTypes = /image\/png|image\/jpeg|image\/jpg/;
    return regexForMimeTypes.test(value)
}




const aws = require ("aws-sdk")

aws.config.update(
    {
        accessKeyId: "AKIAY3L35MCRVFM24Q7U",
        secretAccessKey: "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",
        region: "ap-south-1"
    }
  )
  
  //uploading An Image File to AWS
  let uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {
  
        let s3 = new aws.S3({ apiVersion: "2006-03-01" })
  
        var uploadParams = {
            ACL: "public-read",
            Bucket: "classroom-training-bucket",
            Key: "ashok/" + file.originalname,
            Body: file.buffer
        }
        console.log(uploadFile)
        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ "error": err })
            }
  
            return resolve(data.Location)
        }
        )
  
    }
    )
  }






const createcountry = async function (req, res) {
    try{
        const countrydata=req.body;
        //const images=req.files;

        const { CountryName,  CountryRank } =countrydata ;

        if(Object.keys(countrydata)==0){
            return res.status(400).send({status:false, msg:"data is missing please the data to create"})
         }
    
         if(!isValid(CountryName)){
            return res.status(400).send({status : false, message: "CountryName is required"})

        }
        if(CountryName.length<3 || CountryName.length >20){
            return res.status(400).send({status : false, message: "CountryName is max-3 under min-20 characters"})

        }

        const names = await CountryModel.findOne({CountryName : CountryName})

        if(names){
        return res.status(400).send({status: false, message: "CountryName is already exist"})
        }

         
        if(!isValid(CountryRank)){
            return res.status(400).send({status : false, message: "CountryRank is required"})
        }

        if(!/^[0-9]+$/.test(CountryRank)){
            return res.status(400).send({status : false, message: "CountryRank should be a numbers"})
        }

        const countrynamesrank = await CountryModel.findOne({CountryRank : CountryRank})

        if(countrynamesrank){
        return res.status(400).send({status: false, message: "country rank is already exist"})
        }
        


        const image=req.files;

        if (!image || image.length === 0) {
            return res.status(400)
                .send({ status: false, message: " image is required" });
        }

        if (!isValidImageType(image[0].mimetype)) {
            return res.status(400).send({status: false,message: "Only images can be uploaded (jpeg/jpg/png)"});
        }
        // uploading image to AWS server and creating url
        //const countryImageUrl = await aws.uploadFile(image[0]);
         
        var  profileImagessweetselfie = await uploadFile(image[0]);

    const dataes={
        CountryName: CountryName,
        CountryRank:CountryRank,
        CountryImage:profileImagessweetselfie
}
console.log(dataes)

const newcountry = await CountryModel.create(dataes);

res.status(201).send({status: true,message: "new country added successfully",data: newcountry,});


    }catch (error) {
        return res.status(500).send({ status: false, message: error.message });
      }
};

//module.exports = {createcountry };

const getcountryid = async function (req, res) {
    try{
        const countryId = req.params.countryId

        if(!isValid(countryId)){
            return res.status(400).send({status : false, message: "countryId is required"})
        }
    
        if(! isValidIdType(countryId)){
           return res.status(400).send({status: false,message: "invalid id"});
        }


     
        const countryById = await CountryModel.findOne({_id: countryId});

        if (!countryById) {
            return res
                .status(404)
                .send({status: false,message: "No product found by this Product id"});
        }

       res.status(200).send({ status: true, message: "success", data: countryById });



    }catch (error) {
        return res.status(500).send({ status: false, message: error.message });
      }

}

const getcountry=async function(req,res){
    try{
       //const  getcountry=req.params.countries

       const getcountrycount= await CountryModel.find().select({CountryName:1})//.

      
       res.status(200).send({ status: true, message: "success", data: getcountrycount });


    }catch(error){
        return res.status(500).send({satus:false,message:error.message})

    }

}

module.exports = {createcountry,getcountryid,getcountry };


