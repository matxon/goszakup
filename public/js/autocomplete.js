$('#counteragents').on('input', (e) => {
    var s = e.target.value;
    var result = $('div.result-box:first');
    var tbody = $('div.result-box:first tbody');

    if (s.length > 2) {
        $.post('/counteragent', {"name": s.trim() }, 
            function(data) {
                console.log(data);
                // data: объекттерден тұратын массив
                s = "";
            
                data.forEach(element => {
                    // s = s + "<tr><td>" + element.id + '</td><td>' + element.Short_name + "</td></tr>";
                    s = s + "<tr><td>" + element.BIN + '</td><td>' + element.Name + "</td></tr>";
                });

                //s = s + "</ul>"

                result.removeClass('d-none')
                tbody.html(s);
            }
          );
    } else {
        result.addClass('d-none');
    }
}) 

$('#counteragents').on('focus', function() {
    // автовыделение текста
    $(this).select();
})

$('.counter>table').on('click', 'tr', function() {
    console.log($(this).find('td')[0].innerText);
    console.log($(this).find('td')[1].innerText);

    // $('#counteragents_bin').val($(this).find('td')[0].innerText)
    $('#counteragents').val($(this).find('td')[1].innerText)
    $(this).find('td').each(function(cell){
		// console.log(' ячейка ' + cell + ', значение: ' + $(this).text());
	});
    $('.result-box.astable:first').addClass('d-none');
})