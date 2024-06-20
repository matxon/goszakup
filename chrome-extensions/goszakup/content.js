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
            null, //{ visible: false },                                 // 0. checkbox
            null, //{ visible: false },                                 // 1. Id
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

            null, //{ visible: false },                                 // 3. Непрочитанные сообщения
            null, //{ visible: false },                                 // 4. Номер закупки
            
            null, //{ visible: false },                                 // 5. Тип договора

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
            null, //{ visible: true },                                  // 8. Финансовый год
            null,                                               // 9. Сумма без НДС
            null,                                               // 10. Сумма с НДС

            { render: function(data, type, row) {
                if ( $('#'+row.DT_RowId).hasClass('complaint-red')) {
                    $('#'+row.DT_RowId).addClass('complaint-red');
                }
                return '<a title="Открыть Договор" href="https://v3bl.goszakup.gov.kz/ru/egzcontract/supcontract/contract/' + row.DT_RowId.slice(12) + '">' + data + '</a>';
            }},
            //null,                                             // 11. Заказчик

            null,                                               // 12. Статус

            null, //{ visible: false },                                 // 13. Автор договора

            null, //{ visible: false },                                 // 14. Дата создания
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