module.exports.nextWeek = function(date){

  try{
        if(date && !isNaN(Date.parse(date))){

          var day = 8 - date.getDay();
          return new Date(date.getTime() + (86400000 * day));

        }
        else{

              throw TypeError('Invalid Date');
        }
  }
  catch(err){

      return 'date.nextWeek:'+err;
  }
}
