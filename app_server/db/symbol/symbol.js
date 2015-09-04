
//==========================================================================//
module.exports.find = 
{
    all: require('./find/all.js'),
    bySymbol: require('./find/bySymbol'),
    //bySymbolMany: require('./find/bySymbolMany'),
    //byIndustry: require('./find/byIndustry'),
    //bySector: require('./find/bySector'),
    //byExchange: require('./find/byExchange'),
    like: require('./find/like.js')
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
    //bySymbol: require('./remove/bySymbol')
}
//==========================================================================//