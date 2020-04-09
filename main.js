function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var getAllRecords = function() {
  $.getJSON(
    "https://airtable.com/tblNDHP8o9smfQNHk/viwWIaK0laxzxru1Y?blocks=hide",
    function(airtable) {
      var html = [];
      $.each(airtable.records, function(index, record) {
        var id = record.id;
        var image = record.fields["attack"];
        var damage = record.fields["damage"];
        var startup = record.fields["startup frame"];
        html.push(listView(id, image, damage, startup));
      });
      $(".list-view").append(html);
    }
  );
};







var id = getParameterByName("id");
if (id) {
  getOneRecord(id);
} else {
  getAllRecords();
}
