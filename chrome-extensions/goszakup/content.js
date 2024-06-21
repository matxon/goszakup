console.log("I am in goszakup.kz");

var references = [];


if ($(location).attr('href').includes("https://v3bl.goszakup.gov.kz/ru/contract/supplier")) {

    // егер localStorage-де осы келісім шарттың нөмірі тізімде болса 
    list = localStorage.getItem('finish') ? JSON.parse(localStorage.getItem('finish')) : [];
    slist = localStorage.getItem('start') ? JSON.parse(localStorage.getItem('start')) : [];

    // for Мои договоры
    var pagetable = $('#page_table').DataTable({
        select: {
            style: 'api'
        },
        stateSave: true,
        paging: false,
        columns: [
            { visible: false }, //null,                                 // 0. checkbox
            { visible: false }, //null,                                 // 1. Id
            //null,                                             // 2. Номер договора
            { render: function(data, type, row) {
                
                if (list.includes($(data).text().trim())) {
                    $('#'+row.DT_RowId).addClass('finished');
                }

                if (slist.includes($(data).text().trim())) {
                    $('#'+row.DT_RowId).addClass('start');
                }
                
                return data.replace('edit', 'units');
            }},

            { visible: false }, //null,                                 // 3. Непрочитанные сообщения
            null, //{ visible: false },                                 // 4. Номер закупки
            
            { visible: false }, //null,                                 // 5. Тип договора

            //     { render: function(data, type, row) {
            //         if (data.includes('Исполнен') ) {
            //             $('#' + row.DT_RowId).addClass('displaynone');
            //             return "Скрыть";
            //         }
            //         return data;
            //     } 
            // }
            null,                                               // 6. Статус договора

            null, //{ visible: false },                                 // 7. Способ закупки
            { visible: false }, //null,                                 // 8. Финансовый год
            null,                                                       // 9. Сумма без НДС
            { visible: false },                                         // 10. Сумма с НДС

            { render: function(data, type, row) {
                if ( $('#'+row.DT_RowId).hasClass('complaint-red')) {
                    $('#'+row.DT_RowId).addClass('complaint-red');
                }
                return '<a title="Открыть Договор" href="https://v3bl.goszakup.gov.kz/ru/egzcontract/supcontract/contract/' + row.DT_RowId.slice(12) + '">' + data + '</a>';
            }},
            //null,                                                     // 11. Заказчик

            { visible: false} , // null,                                // 12. Статус

            { visible: false }, // null,                                // 13. Автор договора

            { visible: false }, // null,                                // 14. Дата создания
            null
        ]
    });

    

    $('.page-filter-actions:first').append(
        '<div class="row">\
            <div class="col-md-12">\
            <a class="toggle-vis btn btn-sm btn-primary mybtn" data-column="0">1</a>\
            <a class="toggle-vis btn btn-sm btn-primary mybtn" data-column="1">ИД</a>\
            <a class="toggle-vis btn btn-sm btn-primary mybtn" data-column="2">№ Договора</a>\
            <a class="toggle-vis btn btn-sm btn-primary mybtn" data-column="3">Сообщение</a>\
            <a class="toggle-vis btn btn-sm btn-primary mybtn" data-column="4">№ Закупки</a>\
            <a class="toggle-vis btn btn-sm btn-primary mybtn" data-column="5">Тип договора</a>\
            <a class="toggle-vis btn btn-sm btn-primary mybtn" data-column="6">Статус договора</a>\
            <a class="toggle-vis btn btn-sm btn-primary mybtn" data-column="7">Способ закупки</a>\
            <a class="toggle-vis btn btn-sm btn-primary mybtn" data-column="8">Финансовый год</a>\
            <a class="toggle-vis btn btn-sm btn-primary mybtn" data-column="9">Сумма без НДС</a>\
            <a class="toggle-vis btn btn-sm btn-primary mybtn" data-column="10">Сумма с НДС</a>\
            <a class="toggle-vis btn btn-sm btn-primary mybtn" data-column="11">Заказчик</a>\
            <a class="toggle-vis btn btn-sm btn-primary mybtn" data-column="12">Статус</a>\
            <a class="toggle-vis btn btn-sm btn-primary mybtn" data-column="13">Автор</a>\
            <a class="toggle-vis btn btn-sm btn-primary mybtn" data-column="14">Дата создания</a>\
            <a class="toggle-vis btn btn-sm btn-primary mybtn" data-column="15">Действие</a>\
        </div>\
    </div>');

    $('a.toggle-vis').on('click', function (e) {
        e.preventDefault();
    
        // Get the column API object
        var column = pagetable.column($(this).attr('data-column'));
    
        // Toggle the visibility
        column.visible(!column.visible());
        // $(this).toggleClass('btn-primary');
    });

        

}
        
if ($(location).attr('href').includes("https://v3bl.goszakup.gov.kz/ru/egzcontract/supcontract/units/")) {

    // for Предметы договора
    $('table.table:first').DataTable({
        paging: false,
        searching: false,
        ordering: false,
        columns: [
            { visible: false },                                 // #
            { visible: false },                                 // Id
            { visible: false },                                 // Номер
            { visible: false },                                 // П/П
            { visible: false },                                 // КТРУ
            null,                                               // Наименование
            null,                                               // Доп описание
            null,                                               // Количество
            null,                                               // Ед.изм
            null,                                               // Цена за единицу
            null                                                // Сумма
        ]
    });
}

// Страница просмотра договора
if ($(location).attr('href').includes("https://v3bl.goszakup.gov.kz/ru/egzcontract/supcontract/contract/")) {

    $('<div class="row" id="gospanel"><div class="col-md-2"><input class=" margin-top-15" type="checkbox" id="checkbox_contract" checked /><span> Скрыть содержание договора </span></div><div class="col-md-2"><input class=" margin-top-15" type="checkbox" id="checkbox_start"/><span> Тауарларды сатып алуым керек </span></div><div class="col-md-2"><input class=" margin-top-15" type="checkbox" id="checkbox_finish"/><span> Договордағы тауарларды апарып бердім </span></div><div class="col-md-2"><button id="copy_contract" class="btn btn-primary margin-top-15" type="button">Скопировать данные Заказчика</button></div></div>').prependTo($('.tab-content>.tab-pane:first'));
    
    // localStorage-дегі запись
    list = localStorage.getItem('finish') ? JSON.parse(localStorage.getItem('finish')) : [];
    slist = localStorage.getItem('start') ? JSON.parse(localStorage.getItem('start')) : [];

    // договордың нөмірі
    num = $('h4:first').text().trim().substring(10).trim();
    // егер localStorage-де осы келісім шарттың нөмірі тізімде болса 
    
    
    if (list.includes(num)) {
        $('#checkbox_finish').prop('checked', true);
        // console.log(num, list);
    };

    if (slist.includes(num)) {
        $('#checkbox_start').prop('checked', true);
        // console.log(num, list);
    };


    $('#econtract_data').toggleClass('displaynone');

    $('#checkbox_contract').click(function() {
        $('#econtract_data').toggleClass('displaynone');
    });

    $('#checkbox_finish').on('click', function() {
        // console.log($(this).prop('checked'));
        

        if ($(this).prop('checked')) {
            list = localStorage.getItem('finish') ? JSON.parse(localStorage.getItem('finish')) : [];
            list.push(num);
            localStorage.setItem('finish', JSON.stringify(list));
        } else {
            nlist = list.filter((elem) => elem!=num);
            localStorage.setItem('finish', JSON.stringify(nlist));
        }
    });

    
    $('#checkbox_start').on('click', function() {
        
        if ($(this).prop('checked')) {
            slist = localStorage.getItem('start') ? JSON.parse(localStorage.getItem('start')) : [];
            slist.push(num);
            localStorage.setItem('start', JSON.stringify(slist));
        } else {
            nlist = slist.filter((elem) => elem!=num);
            localStorage.setItem('start', JSON.stringify(nlist));
        }
    });

    $('#copy_contract').on('click', copy_contract);
        
  
    async function copy_contract() {

        data = $.map($('#elements_ru').find('td[width]:first'), function( obj, ind ) { return obj.innerText }).toString().trim().split('\n').filter( function(e,i) { return (i == 1 || i==2 || i==3 || i==7 || i==8) });

        text = 
            data[2].trim().substring(4) + '\t' + 
            data[0].trim() + '\t' + 
            data[1].trim() + '\t' + 
            data[3].trim().substring(6) + '\t' + 
            data[4].trim();

        try {
            await navigator.clipboard.writeText(text);
            alert('Данные скопированы')
        } catch (err) {
            console.log(err.message);
        }
    };

    var table = [];
    //var table = '';
    trs = $('#econtract_pril_data>div:nth-child(2)>table>tbody>tr'); 
    var col; // бағандардың саны

    for(i=0; i<trs.length; i++) {
        if (i==0) {
            tds=$(trs[i]).find('th');
            col = $(tds).length;
        } else {
            tds = $(trs[i]).find('td');
        }
        arr = [];
        //arr = '';
        index = 0;
        for (j=0; j<tds.length; j++) {
             
            if (tds.length<col) break;
            if (tds.length==col) {
                // arr[index] = $(tds[j]).text().replace(/[\r\n\t\b]/g,'');
                //arr += $(tds[j]).text().replace(/[\r\n\t\b]/g,'') + '\t';
                // index++;
            }
            if (tds.length>col) {
                if (j==10 || j==12) continue;
                
                arr[index] = $(tds[j]).text().trim().replace(/[\r\n\t\b]/g,'');
                //arr += $(tds[j]).text().replace(/[\r\n\t\b]/g,'') + '\t';
                index++;
            }
            
        }
        if (index == col)  table.push(arr);
        //if (index == col)  table += arr + '\n';
    }

    //console.log(table);

    products = $('#econtract_pril_data>div');
    products.addClass('displaynone');

    products.after('<div><table id="products" class="display table"></table></div>');

    $('#products').DataTable({
        columns: [
            {title: 'Лот', visible: false},
            {title: 'Заказчик', visible: false},
            {title: 'Наименование'},
            {title: 'Крат. хар-ка'},
            {title: 'Доп. хар-ка'},
            {title: 'Ед.измер.'},
            {title: 'Кол-во'},
            {title: 'Цена за единицу', 
                render: function(data, type, row) {
                    return data.replace(/[\ ]/g,'');
                }
            },
            {title: 'План.срок'},
            {title: 'Срок по Дог.', visible: false},
            {title: 'Место поставки', visible: false},
            {title: 'Аванс,%', visible: false},
            {title: 'Сумма', 
                render: function(data, type, row) {
                    return data.replace(/[\ ]/g,'');
                }
            },
            {title: '14', visible: false}
        ],
        layout: {
            topStart: {
                buttons: [
                    {
                        extend: 'print',
                        exportOptions: {
                            columns: ':visible'
                        },
                        autoPrint: false,
                        // messageTop: table[0][1] + '<br>' + table[0][10],
                        // 'This print was produced using the Print button for DataTables',
                        customize: function (win) {
                            $(win.document.body)
                                .css('font-size', '10pt')
                                .css('padding', '0')
                                .find('table')
                                .css('font-size', '10pt')
                                .css('font-family', 'inherit');
    
                            $(win.document.body)
                                .find('h1')
                                .html(table[0][1])
                                .after('<span><i>' + table[0][10] + '</i></span>');
                        }
                    },
                    'colvis'
                ]
            }
        },
        columnDefs: [
            {
                target: -1,
                visible: false
            }
        ],
        data: table,
        ordering: false,
        paging: false,
        searching: false,
    });

}

// Страница просмотра объявления
if ($(location).attr('href').includes('https://v3bl.goszakup.gov.kz/ru/announce/index/')) {

    array = $('.table tr').text().split('\n');

    index = array.findIndex( function( item, index, arr) {
        return item.includes('Организатор') ? true: false;
    });

    var text = array[index+1].trim().substring(0, 12) + '\t' + array[index+1].trim().substring(13) + '\t';

    index = array.findIndex( function( item, index, arr) {
        return item.includes('адрес организатора') ? true: false;
    });

    var text = text + array[index+1].trim() + '\t';

    index = array.findIndex( function( item, index, arr) {
        return item.includes('Контактный') ? true: false;
    });

    var text = text + array[index+1].trim() + '\t';

    index = array.findIndex( function( item, index, arr) {
        return item.includes('E-Mail') ? true: false;
    });

    var text = text + array[index+1].trim();

    
    $('.table').on('click', cp(text));

    async function cp(text) {

        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.log(err.message);
        }

        // history.back();
    };

}