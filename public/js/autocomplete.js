$('#counteragents').on('input', (event) => {
    var s = event.target.value;

    if (s.length > 2) {
        $.post('/counteragent', {"name": s }, 
            function(data) {
                // data: объекттерден тұратын массив
                s = "<ul>";
            
                data.forEach(element => {
                    s = s + "<li>" + element.Short_name + "</li>";
                });

                s = s + "</ul>"

                $('div.result-box:first').removeClass('d-none').html(s);
            }
          );
    }
}) 
