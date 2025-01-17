csv = $.ajax({type: "GET", url: "stipend-us.csv", async: false}).responseText
data = $.csv.toArrays(csv)
for (i = 0; i < data.length; i++) {
    data[i][1] = Number(data[i][1])
    data[i][2] = Number(data[i][2])
    data[i][3] = Number(data[i][3])
}

function sort_and_display(subtract_living) {
    $("#ranking").find("tbody").html("")

    data.sort(function(a, b) {
        if (subtract_living)
            return (b[1] - b[2] - b[3]) - (a[1] - a[2] - a[3])
        else
            return b[1] - a[1]
    })

    console.log(data)

    for (i = 0; i < data.length; i++) {
	style = ""
	if (data[i][1] < data[i][2])
	    style = "color:red"
	namefix = ""
	if (i == 0)
	    namefix = " &#129351;"
	else if (i == 1)
	    namefix = " &#129352;"
	else if (i == 2)
	    namefix = " &#129353;"
        $("#ranking").find("tbody").append(
            $("<tr>")
                .append($("<td>").text(i+1))
                .append($("<td>").text(data[i][0]).append(namefix))
                .append($("<td>").text(data[i][1].toLocaleString("en-US")).attr("align", "right"))
                .append($("<td>").text(data[i][3].toLocaleString("en-US")).attr("align", "right"))
                .append($("<td>").text(data[i][2].toLocaleString("en-US")).attr("align", "right"))
                .append($("<td>").text((data[i][1] - data[i][2] - data[i][3]).toLocaleString("en-US")).attr("align", "right").attr("style", style))
        )
    }
}

$("#overlay-loading").hide()

sort_and_display(false)

$("#living-wage").on("click", function() {
    sort_and_display($("#living-wage").is(":checked"))
})
