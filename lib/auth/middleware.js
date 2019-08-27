
function loginRequiredMiddleware(request, response, next){
    if(request.session.hasOwnProperty('userId')){
        next();
    }
    else{
        response.redirect('/login');
    }
}
