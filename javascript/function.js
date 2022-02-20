var data = [
    {
      "id": 10001,
      "birthDate": "1953-09-01",
      "firstName": "Georgi",
      "lastName": "Facello",
      "gender": "M",
    },
    {
      "id": 10002,
      "birthDate": "1964-06-01",
      "firstName": "Bezalel",
      "lastName": "Simmel",
      "gender": "F",
    },
    {
      "id": 10003,
      "birthDate": "1959-12-02",
      "firstName": "Parto",
      "lastName": "Bamford",
      "gender": "M",
    },
    {
      "id": 10004,
      "birthDate": "1954-04-30",
      "firstName": "Chirstian",
      "lastName": "Koblick",
      "gender": "M",
  
    },
    {
      "id": 10005,
      "birthDate": "1955-01-20",
      "firstName": "Kyoichi",
      "lastName": "Maliniak",
      "gender": "M",
  
    }
  ];

  var nextId = 100;

  $(document).ready(function(){

    displayEmployeeList();

    //creare un nuovo impiegato
    $('#create-employee-form').on('submit', function(e){
      e.preventDefault();
      var form_action = $("#create-employee-form").attr("action");
      var date = $("#date").val();
      var name = $("#name").val();
      var surname = $("#surname").val();
      var sex = $("#sex").val();
      display = "create";

      if(name != '' && surname != '' && date != '' && sex != ''){
        data.push({id: nextId, birthDate: date, firstName: name, lastName: surname, gender: sex});
        nextId++;

        displayEmployeeList();

        $("#create-employee").modal('hide');
        toastr.success('Impiegato Creato Correttamente.', 'Successo', {timeOut: 5000});

      }else{
        alert('Tutti i campi sono obbligatori. Assicurati di compilare tutti i campi correttamente.')
      }
    });

    //visualizzare la lista degli impiegati
    function displayEmployeeList(){
      var rows = '';
      $.each(data, function(index, value){
        rows = rows + '<tr>';
        rows = rows + '<td>' + value.id + '</td>';
        rows = rows + '<td>' + value.birthDate + '</td>';
        rows = rows + '<td>' + value.firstName + '</td>';
        rows = rows + '<td>' + value.lastName + '</td>';
        rows = rows + '<td>' + value.gender + '</td>';
        rows = rows + '<td data-id="'+value.id+'">';
        rows = rows + '<button class="btn btn-danger btn-sm delete-employee">Elimina</button>';
        rows = rows + '&nbsp&nbsp';
        rows = rows + '<button class="btn btn-secondary btn-sm edit-employee">Modifica</button>';
        rows = rows + '</td>';
        rows = rows + '</tr>';
      });
      $("tbody").html(rows);
    }

    //modificare un impiegato
    $("body").on("click","edit-employee-form",function(){
      var id = $(this).parent("td").data('id');
      var date = $(this).parent("td").data('id').text();
      var name = $(this).parent("td").data('id').text();
      var surname = $(this).parent("td").data('id').text();
      var sex = $(this).parent("td").data('id').text();
      display = "edit";

      $("#date_edit").val(date);
      $("#name_edit").val(name);
      $("#surname_edit").val(surname);
      $("#sex_edit").val(sex);
      $("#edit-employee-form").find(".edit-id").val(id);
      
    });

    //eliminare un impiegato
    $("boby").on("click",".delete-employee",function(){
      var id = $(this).parent("td").data('id');
      for(let i = 0; i < data.length; i++){
        if(data[i].id == id){
          data.splice(i, 1);
        break;
        }
      }
      displayEmployeeList();
    });

  });