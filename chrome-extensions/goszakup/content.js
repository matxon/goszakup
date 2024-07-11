// const { response } = require("express");

console.log("I am in goszakup.kz");

function formatDate(date) {

    date = new Date(Date.parse(date));
    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
  
    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    var yy = date.getFullYear();
    //if (yy < 10) yy = '0' + yy;
  
    return dd + '.' + mm + '.' + yy;
  }

// var references = [];


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
            //null,                                                     // 2. Номер договора
            { render: function(data, type, row) {

                $.ajax({
                    url: 'http://localhost:3000/contract',
                    type: 'post',
                    data: {contract: $(data).text().trim()},
                    success: function(res) {
                        //  осы жерде договордың қай статуста тұрғанын анықтаймын
                        // соған байланысты кесте жолының класын қоямын
                        console.log(res);
                    },
                    error: function(err) {
                        console.log(err.responseText);
                    }
                })
                
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
            null,                                                       // 6. Статус договора

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

    $('<div class="row" id="gospanel"><div class="col-md-2"><input class=" margin-top-15" type="checkbox" id="checkbox_contract" checked /><span> Скрыть содержание договора </span></div><div class="col-md-2"><input class=" margin-top-15" type="checkbox" id="checkbox_start"/><span> Тауарларды сатып алуым керек </span></div><div class="col-md-1"><input class="form-control form-control-sm" id="docdate" type="date"></div><div class="col-md-1"><input class="form-control form-control-sm" id="docnumber" type="text"></div><div class="col-md-2"><input class=" margin-top-15" type="checkbox" id="checkbox_finish"/><span> Договордағы тауарларды апарып бердім </span></div><div class="col-md-2"><button id="copy_contract" class="btn btn-primary margin-top-15" type="button">Скопировать данные Заказчика</button></div></div>').prependTo($('.tab-content>.tab-pane:first'));
    
    // договордың нөмірі
    num = $('h4:first').text().substring($('h4:first').text().indexOf('№')+1).trim();

    // Контрагент туралы мәліметтер
    counteragent = $.map($('#elements_ru').find('td[width]:first'), function( obj, ind ) { return obj.innerText }).toString().trim().split('\n').filter( function(e,i) { return (i == 1 || i==2 || i==3 || i==7 || i==8) });
    counteragent[2] = counteragent[2].trim().substring(4);  // БИН Контрагента
    counteragent[0] = counteragent[0].trim();               // Название контрагента 
    counteragent[1] = counteragent[1].trim();               // адрес контрагента
    counteragent[3] = counteragent[3].trim().substring(6);  // телефон контрагента
    counteragent[4] = counteragent[4].trim();               // Контакт контрагента

    // тауарлардың тізімін бөліп аламыз
    var table = [];     //var table = '';

    trs = $('#econtract_pril_data>div:nth-child(2)>table>tbody>tr'); 
    var col;            // бағандардың саны

    for(i=0; i<trs.length; i++) {
        if (i==0) {
            tds=$(trs[i]).find('th');
            col = $(tds).length;
        } else {
            tds = $(trs[i]).find('td');
        }
        arr = [];       //arr = '';
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


    // Осы келісім-шарттың тіркелген немесе тіркелмегендігін анықтаймыз
    $.ajax({
        url: 'http://localhost:3000/contract',
        type: 'post',
        data: {contract: num},
        success: function(res) {
            // осы жерде договордың қай статуста тұрғанын анықтаймын
            // тіркелмеген болса тіркейміз
            if (res.length == 0) {
                // тауарлардың тізімін жібереміз
                console.log(table);
            }
        },
        error: function(err) {
            console.log(err.responseText);
        }
    })

    // localStorage-дегі запись
    list = localStorage.getItem('finish') ? JSON.parse(localStorage.getItem('finish')) : [];
    slist = localStorage.getItem('start') ? JSON.parse(localStorage.getItem('start')) : [];
    sdocument = localStorage.getItem('document') ? JSON.parse(localStorage.getItem('document')) : {};

    
    
    // егер localStorage-де осы келісім шарттың нөмірі тізімде болса 
    if (list.includes(num)) {
        $('#checkbox_finish').prop('checked', true);
        // console.log(num, list);
    };

    if (num in sdocument) {
        $('#docdate').val(sdocument[num].docdate);
        $('#docnumber').val(sdocument[num].docnumber);
    }

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
            sdocument[num] = {
                docdate: $('#docdate').val(),
                docnumber: $('#docnumber').val()
            }
            
            localStorage.setItem('document', JSON.stringify(sdocument));
        } else {
            nlist = slist.filter((elem) => elem!=num);
            localStorage.setItem('start', JSON.stringify(nlist));
        }
    });

    $('#copy_contract').on('click', copy_contract);
        
    
    async function copy_contract() {

        //data = $.map($('#elements_ru').find('td[width]:first'), function( obj, ind ) { return obj.innerText }).toString().trim().split('\n').filter( function(e,i) { return (i == 1 || i==2 || i==3 || i==7 || i==8) });
        
        text = 
            counteragent[2] + '\t' + 
            counteragent[0] + '\t' + 
            counteragent[1] + '\t' + 
            counteragent[3] + '\t' + 
            counteragent[4];

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
    // console.log(trs);
    var col; // бағандардың саны

    for(i=0; i<trs.length; i++) {

        if (i==0) {
            tds=$(trs[i]).find('th');
            col = $(tds).length;
            continue;
        } else {
            tds = $(trs[i]).find('td');
        }
        arr = [];
        //arr = '';
        index = 0;
        for (j=0; j<tds.length; j++) {
            
            if (tds.length<col) break;
            if (tds.length==col) {
                arr[index] = $(tds[j]).text().replace(/[\r\n\t\b]/g,'');
                //arr += $(tds[j]).text().replace(/[\r\n\t\b]/g,'') + '\t';
                index++;
            }
            // if (tds.length>col) {
            //     if (j==10 || j==12) continue;
                
            //     arr[index] = $(tds[j]).text().trim().replace(/[\r\n\t\b]/g,'');
            //     //arr += $(tds[j]).text().replace(/[\r\n\t\b]/g,'') + '\t';
            //     index++;
            // }
            
        }
        if (index == col)  table.push(arr);
        //if (index == col)  table += arr + '\n';
    }

    // console.log(table);

    products = $('#econtract_pril_data>div');
    products.addClass('displaynone');
    
    products = $('#econtract_pril_data>div:nth-child(2)');
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
                            
                            s = '';
                            qtypro = 0;
                            summpro = 0;


                            for (i = 0; i < table.length; i++) {
                                s += '<tr>';
                                for (j = 0; j < table[i].length; j++) {
                                    // 2. 5. 6. 7. 12.
                                    switch (j) {
                                        case 0:
                                            s += '<td class="center">' + (i+1) + '</td>';
                                            break;
                                        case 2:
                                            s += '<td>' + table[i][j] + '</td><td></td>';
                                            break;
                                        case 5:
                                            s += '<td class="center">' + table[i][j] + '</td>';
                                            break;
                                        case 6:
                                            s += '<td class="right">' + table[i][j] + '</td>';
                                            s += '<td class="right">' + table[i][j] + '</td>';
                                            qtypro += +table[i][j].replace(/[\ ]/g,'');
                                            break;
                                        case 7:
                                            s += '<td class="right">' + table[i][j] + '</td><td></td>';
                                            break;
                                        case 12:
                                            s += '<td class="right">' + table[i][j] + '</td>';
                                            summpro += +table[i][j].replace(/[\ ]/g,'');
                                        default:
                                            break;
                                    }
                                    
                                }
                                s += '</tr>';
                            }

                            text = `<html lang="ru"><head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Накладная на отпуск</title> <style> @media print { @page { size: A4 landscape; margin: 0; } html,body { /* width: 297cm; */ box-sizing: border-box; font-size: 12px; font-family: Arial, Helvetica, sans-serif; } } html, body { font-family: Arial, Helvetica, sans-serif; font-size: 12px; } .pri { font-size: 9px; font-style: italic; width: 160px; position:sticky ; right: 0; float: right; text-align: right; /* border: 1px solid red; */ } .org, .orgname, .bin { /* border: 1px solid red; */ display: inline-block; /* position: relative; */ /* margin-top: 150px ; */ } .orgname { border-bottom: 1px solid; width: 400px; text-align: center; font-weight: bold; } .bin { float: right; } .bin div { display: inline-block; } .bin div:last-child { width: 100px; border: 1px solid; text-align: center; margin-left: 10px; } .dparent { margin-top: 15px; } .docum { width: 200px; border: 1px solid; float: right; display: flex; flex-wrap: wrap} .docum div { text-align: center; width: 100px; display: inline-block; padding: 2px; border: 1px solid; box-sizing: border-box; } .right { text-align: end; } .center { text-align: center; } h3 { padding: 25px; } t1 { margin-top: 70px; } table { border-collapse: collapse; font-size: 12px; } td { padding: 0 5px; border: 1px solid; } .bold { font-weight: bold; } .sign div { display: inline-block; width: 47%; padding: 0 10px; /* border: 1px solid; */ } .sign { width:auto; margin: 10px 0; } .sign div:first { border-right: 1px solid; } .sign p { display: inline-block; margin: 0; } .summ { padding: 15px 0; font-size: 11px; } .summ div { display: inline-block; } #dol { border-bottom: 1px solid; width: 6rem; } #dol::after { content: 'должность'; font-size: 9px; font-style: italic; position: fixed; } #pod { border-bottom: 1px solid; width: 6rem; } #pod::after { content: 'подпись'; font-size: 9px; font-style: italic; position: fixed; } #ras { border-bottom: 1px solid; width: 12rem; } #ras::after { content: 'расшифровка подписи'; font-size: 9px; font-style: italic; position: fixed; } #ras2 { border-bottom: 1px solid; width: 18rem; } #ras2::after { content: 'расшифровка подписи'; font-size: 9px; font-style: italic; position: fixed; } #address {position: absolute; top: 15px; font-style: italic; font-size: 9px} </style></head><body> <div style="padding: 10px 60px; width: 1120px;"><div id="address">${counteragent[1] + "; Тел.:" + counteragent[3] + "; " + counteragent[4]}</div> <div class="pri"> Приложение 26 к приказу Министра финансов Республики Казахстан от 20 декабря 2012 года № 562<br>Форма 3-2 </div> <div style="padding-top: 55px;"> <div class="org">Организация (индивидуальный предприниматель)</div> <div class="orgname">Индивидуальный предприниматель "Толкын"</div> <div class="bin bold"><div>ИИН/БИН</div><div>780810300351</div></div> </div> <div class="dparent"> <div class="docum"> <div>Номер документа</div> <div>Дата составления</div> <div class="bold">${jQuery("#docnumber").val()}</div> <div class="bold">${formatDate(jQuery("#docdate").val())}</div> </div> </div> <h3 class="center">НАКЛАДНАЯ НА ОТПУСК ЗАПАСОВ НА СТОРОНУ</h3> <table class="t1 center"> <tbody><tr> <td width="20%">Организация (индивидуальный предприниматель) - отправитель</td> <td width="30%">Организация (индивидуальный предприниматель) - получатель</td> <td width="15%">Ответственный за поставку (Ф.И.О)</td> <td width="15%">Транспортная накладная</td> <td width="17%">Товарно-транспортная накладная (номер, дата)</td> </tr> <tr class="bold"> <td id="company">Индивидуальный предприниматель "Толкын"</td> <td id="counteragent">${table[0][1]}</td> <td></td> <td></td> <td></td> </tr> </tbody></table> <br> <table width="100%"> <tbody><tr class="center"> <td rowspan="2" width="60px">Номер по порядку</td> <td rowspan="2">Наименование, характеристика</td> <td rowspan="2" width="100px">Номенклатурный номер</td> <td rowspan="2" width="100px">Единица измерения</td> <td colspan="2">Количество</td> <td rowspan="2" width="100px">Цена за единицу, в KZT</td> <td rowspan="2" width="100px">Сумма с НДС</td> <td rowspan="2" width="100px">Сумма без НДС</td> </tr> <tr class="center"> <td width="100px">подлежит отпуску</td> <td width="100px">отпущено</td> </tr> <tr class="center"> <td>1</td> <td>2</td> <td>3</td> <td>4</td> <td>5</td> <td>6</td> <td>7</td> <td>8</td> <td>9</td> </tr> ${s} <tr style="font-weight: bold;"> <td colspan="4" class="right">Итого</td> <td class="right">${qtypro}</td> <td class="right">${qtypro}</td> <td class="center">X</td> <td class="right"></td> <td class="right">${summpro}</td> </tr> </tbody></table> <div class="summ"> <div>Всего отпущено количество запасов (прописью)</div> <div id="qtypro" style="width: 200px; border-bottom: 1px solid;text-align: center; font-weight: bold;font-style: italic;">${num2str(qtypro).prop}</div> <div>на сумму (прописью) в KZT</div> <div id="sumpro" style="width: 500px; border-bottom: 1px solid; text-align: center; font-weight: bold;font-style: italic;">${num2str(summpro).money}</div> </div> <div class="sign"> <div> \x3C!-- <p style="width: 160px;">Отпуск разрешил</p><p>______________/_____________/_____________</p><br> --> <p style="width: 120px;">Отпуск разрешил</p><div id="dol"></div>/<div id="pod"></div>/<div id="ras"></div><br> <p></p><br> </div> <div> <p>По доверенности № ______ от "______" _________________ 20_____года</p> </div> </div> <div class="sign"> <div> <p style="width: 120px;">Главный бухгалтер</p><div id="pod"></div>/<div id="ras2"></div><br> <p></p><br> </div> <div> <p>выданной</p><p>_________________________________________________________</p> <p style="padding-top: 1rem;">_________________________________________________________________</p> </div> </div> <div class="sign"> <div> <p style="font-weight: bold;">М.П.</p><br> </div> <div> </div> </div> <div class="sign"> <div> <p style="width: 120px;">Отпустил</p><div id="pod"></div>/<div id="ras2"></div><p></p> </div> <div> <p style="width: 100px;">Запасы получил</p><div id="pod"></div>/<div id="ras2"></div> </div> </div> </div></body></html>`

                            win.document.write(text);

                            console.log(table);

           
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

    var money;
        var price;
        var rub, kop;
        var litera = sotny = desatky = edinicy = minus = "";
        var k = 0, i, j;
        
        N = ["", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять",
            "", "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать",
            "", "десять", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто",
            "", "сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот", "семьсот", "восемьсот", "девятьсот",
            "тысяч", "тысяча", "тысячи", "тысячи", "тысячи", "тысяч", "тысяч", "тысяч", "тысяч", "тысяч",
            "миллионов", "миллион", "миллиона", "миллиона", "миллиона", "миллионов", "миллионов", "миллионов", "миллионов", "миллионов",
            "миллиардов", "миллиард", "миллиарда", "миллиарда", "миллиарда", "миллиардов", "миллиардов", "миллиардов", "миллиардов", "миллиардов"];
        
        var M = new Array(10);
        for (j = 0; j < 10; ++j)
            M[j] = new Array(N.length);
        
        for (i = 0; i < N.length; i++)
            for (j = 0; j < 10; j++)
                M[j][i] = N[k++];
        
        var R = new Array("тенге", "тенге", "тенге", "тенге", "тенге", "тенге", "тенге", "тенге", "тенге", "тенге");
        // var R = 'тенге';
        var K = new Array("тиын", "тиын", "тиын", "тиын", "тиын", "тиын", "тиын", "тиын", "тиын", "тиын");
        // var K = 'тиын';
        
        function num2str(money /*, target*/) {
            rub = "", kop = "";
            money += '';
            money = money.replace(",", ".");
        
            if (isNaN(money)) {
                // document.getElementById(target).innerHTML = "Не числовое значение";
                return "Не числовое значение";
            }
            if (money.substr(0, 1) == "-") {
                money = money.substr(1);
                minus = "минус ";
            }
            else minus = "";
            money = Math.round(money * 100) / 100 + "";
        
            if (money.indexOf(".") != -1) {
                rub = money.substr(0, money.indexOf("."));
                kop = money.substr(money.indexOf(".") + 1);
                if (kop.length == 1) kop += "0";
            }
            else rub = money;
        
            if (rub.length > 12) {
                // document.getElementById(target).innerHTML = "Слишком большое число";
                return "Слишком большое число";
            }
            ru = propis(price = rub, R);
            kop = kop == '' ? '00': kop; /* propis(price = kop, K);*/
            
            return { money: ru + 'тенге ' + kop + ' тиын', prop: ru };

            ko != "" ? res = ru + " " + ko : res = ru;
            ru == "Ноль " + R[0] && ko != "" ? res = ko : 0;
            kop == 0 ? res += " ноль " + K[0] : 0;
            // document.getElementById(target).innerHTML = (minus + res).substr(0, 1).toUpperCase() + (minus + res).substr(1);
            return (minus + res).substr(0, 1).toUpperCase() + (minus + res).substr(1);
        }
        
        function propis(price /*, D*/) {
            litera = "";
            for (i = 0; i < price.length; i += 3) {
                sotny = desatky = edinicy = "";
                if (n(i + 2, 2) > 10 && n(i + 2, 2) < 20) {
                    edinicy = " " + M[n(i + 1, 1)][1] + " " + M[0][i / 3 + 3];
                    i == 0 ? edinicy += ''/* D[0] */: 0;
                }
                else {
                    edinicy = M[n(i + 1, 1)][0];
                    (edinicy == "один" && (i == 3 /*|| D == K*/)) ? edinicy = "одна" : 0;
                    (edinicy == "два" && (i == 3 /*|| D == K*/)) ? edinicy = "две" : 0;
                    i == 0 && edinicy != "" ? 0 : edinicy += " " + M[n(i + 1, 1)][i / 3 + 3];
                    edinicy == " " ? edinicy = "" : (edinicy == " " + M[n(i + 1, 1)][i / 3 + 3]) ? 0 : edinicy = " " + edinicy;
                    i == 0 ? edinicy += " " /* + D[n(i + 1, 1)] */: 0;
                    (desatky = M[n(i + 2, 1)][2]) != "" ? desatky = " " + desatky : 0;
                }
                (sotny = M[n(i + 3, 1)][3]) != "" ? sotny = " " + sotny : 0;
                if (price.substr(price.length - i - 3, 3) == "000" && edinicy == " " + M[0][i / 3 + 3]) edinicy = "";
                litera = sotny + desatky + edinicy + litera;
            }
            if (litera == " " /* + R[0]*/) return "ноль" + litera;
            else return litera.substr(1);

            function n(start, len) {
                if (start > price.length) return 0;
                else return Number(price.substr(price.length - start, len));
            }
        }

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
