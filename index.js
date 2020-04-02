var padManager = require('ep_etherpad-lite/node/db/PadManager');
exports.eejsBlock_indexWrapper = function(hook_name, args, cb) {
    args.content += '<div id="small_list_select"></div><script src="./static/js/jquery.js"></script><script>$(function () { $("#small_list_select").load("./small_list_select"); });</script>';
};

exports.registerRoute = function(hook_name, args, cb) {
    args.app.get("/small_list_select", function(req, res) {
      var pads = padManager.listAllPads(function(err, data){
        if(err){
          return res.send("<div> Error:" + err + "</div>");
        }
        return res.send(createListSelect(data));
      });
      if(pads){
        pads.then(function(data){
          res.send(createListSelect(data));
        }).catch(function(err){
            res.send("<div> Error:" + err + "</div>");
        })
      }
    });
};

function createListSelect(data){
  //I probably want the list of names, not IDs
  console.info(data);
  //use the exact same form as above
  r = "<form action="#" onsubmit="go2Name();return false;"><select name="padname">";
  if(data && data.padIDs){
    for (var i = 0; i < data.padIDs.length; i++) {
        r += '<option value="' + data.padIDs[i] + '">' + data.padIDs[i] + '</option>';
    }
  }
  r += "</select><button type="submit">OK</button></form>";
  return r;
}
