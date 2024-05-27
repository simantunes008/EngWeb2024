$(function(){

})

function showImage(fname, ftype){
    if((ftype == 'image/png')||(ftype == 'image/jpeg')) {
        var ficheiro = $('<img src="/fileStore/' + fname + '" width="80%"/>')
        var download = $('<div><a href="/download/' + fname + '">Download</a></div>')
        $("#display").empty()
        $("#display").append(ficheiro, download)
        $("#display").modal()
    }
    else {
        var ficheiro = $('<p>' + fname + '</p>')
        var download = $('<div><a href="/download/' + fname + '">Download</a></div>')
        $("#display").empty()
        $("#display").append(ficheiro, download)
        $("#display").modal() 
    }
}