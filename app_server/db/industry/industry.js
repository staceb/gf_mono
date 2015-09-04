﻿
//==========================================================================//
module.exports.find = 
{
     all: require('./find/all.js'),
     byId: require('./find/byId'),
     byName: require('./find/byName')
 
}
//==========================================================================//


//==========================================================================//
module.exports.insert = 
{
    one: require('./insert/one.js'),
    bulk: require('./insert/bulk.js')
}
//==========================================================================//


//==========================================================================//
module.exports.update = 
{
   
}
//==========================================================================//


//==========================================================================//
module.exports.remove = 
{
    byId: require('./remove/byId'),
  //  byExchangeName: require('./remove/byExchangeName'),
    all: require('./remove/all')
}
//==========================================================================//