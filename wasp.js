//  WASP (Wasp: A Style Processor)

var varTag = "$";

function parseVar(str) {
  
  if(!str.trim()) return false;
  
  var a = str.split(";")[0].split("=");
  return [a[0], a[1]];
}


function deleteVars(data) {
  var lines = data.split(';');
  for(var i=0; i<lines.length; i++) {
    var a = lines[i] + ";";
    
    //  If the line is a variable assignment, remove it
    data = a.indexOf("=") > -1 ? data.replace(a, '') : data;
  }  
  return data.trim();
}


function getVars(data) {
  var lines = data.replace(/\"/g, "").split(varTag);
  
  for(var i=0; i<lines.length; i++) {
    var a = parseVar(lines[i]);
    var kr = new RegExp("\\" + varTag + a[0], "g");
    data = a[1] ? data.replace(kr, a[1]) : data;
  }
  
  return deleteVars(data);
}


function readStyles(elem) {
  $.get(elem.href, function(data) {
    $(elem).remove();
    $(".wasp-styles").append(getVars(data));
  });
}


var Wasp = {};

Wasp.init = function(tag) {
  varTag = tag ? tag : varTag;
  $("head").append($("<style>").addClass("wasp-styles"));
  $('link[rel="stylesheet"]').each(function(styleTag) {
    readStyles(this);
  });  
}


