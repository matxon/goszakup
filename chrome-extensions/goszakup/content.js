console.log("I am in goszakup.kz");

var references = [];


if ($(location).attr('href').includes("https://v3bl.goszakup.gov.kz/ru/contract/supplier")) {

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
        $(this).toggleClass('btn-primary');
    });

    
    // console.log(pagetable.columns(4).data()[0])
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

if ($(location).attr('href').includes("https://v3bl.goszakup.gov.kz/ru/egzcontract/supcontract/contract/")) {
    
    $('<input type="checkbox" id="checkbox_contract" checked /><span> Скрыть содержание договора</span>').prependTo($('.tab-content>.tab-pane:first'));

    $('#econtract_data').toggleClass('displaynone');

    $('#checkbox_contract').click(function() {
        $('#econtract_data').toggleClass('displaynone');
    });
}

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

    
    $('.table:first').on('click', cp(text));

    async function cp(text) {

        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.log(err.message);
        }

        history.back();
    };

}