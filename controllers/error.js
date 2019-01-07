exports.error404 = (req,res, next)=>{
    res.render('404',{docTitle: '404 Error'})
}