const mongoose = require('mongoose');

const countrySchema  = new mongoose.Schema( {
        
    CountryName:{
            type:String,
            unique:true,
            required:true,
            minlength:[3,'plese enter eight no of password'],
            maxlength:[20,'only enter the password less than fifteen'],
            trim:true,
        },
        CountryImage:{
            type:String,
            //unique:true,
           required:[true,"please enter the CountryImage"],
            trim:true,
        },
        CountryRank:{
            type:Number,
            unique:true,
            required:[true,"please enter the countryrank"],
            trim:true,
        },
        // DetailsCountry:{
        //     type:String,
        //     default:"country details is not there",
        // },
        // isdeleted:{
        //     type:Boolean,
        //     default:false,
        // },
    },{timestamps:true});
    
    module.exports = mongoose.model('countries',countrySchema)