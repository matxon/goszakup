$('#counteragents').on('input', (event) => {
    var s = event.target.value;

    if (s.length > 2) {
        $.post('/counteragent', {"name": s }, 
            function(res) {
                console.log(res);
            }
          );
    }
})
