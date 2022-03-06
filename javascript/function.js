var data = [];
var links;
var page = 0;
var api = "http://localhost:8080/employees?page="+page+"&size=20";
var nextId = 500000;

  $(document).ready(function(){


    get();
    

    $("#next-button").on("click", function() {
      api = links['next']['href'];
      page++;
      get();
    });

    $("#last-button").on("click", function() {
      api = links['last']['href'];
      get();
    });
    
    $("#first-button").on("click", function() {
      api = links['first']['href'];
      get();
    });

    $("#previous-button").on("click", function() {
      page--;
      api = "http://localhost:8080/employees?page="+page+"&size=20";
      get();
    });

    function get() {
      $.ajax({
        method: "GET",
        url: api 
      })
        .done(function( msg ){
            console.log(msg['_embedded']['employees']);
            data = msg['_embedded']['employees'];
            links = msg['_links'];
            displayEmployeeList();
        });
  
    }


  /*
      $('#myTable').DataTable( {
        ajax: 'http://localhost:8080/employees'
    } );
  */ 
      
    //creare un nuovo impiegato
    $('#create-employee-form').on('submit', function(e){
      e.preventDefault();

      function put(){

        $.ajax({
          url: 'http://localhost:8080/employees?page=15001&size=20',
          type: 'PUT',
          data: "id="+nextId+"&birthDate="+date+"&firstName="+name+"&lastName="+surname+"&gender="+sex,
          success: function(data) {
            alert('Dati caricati correttamente');
          }
        });

      }

      //var form_action = $("#create-employee-form").attr("action");
      var date = $("#date").val();
      var name = $("#name").val();
      var surname = $("#surname").val();
      var sex = $("#sex").val();
      display = "create";

      if(name != '' && surname != '' && date != '' && sex != ''){
        //data.push({id: nextId, birthDate: date, firstName: name, lastName: surname, gender: sex});
        //$.post('http://localhost:8080/employees?page=15001&size=20', {id: nextId, birthDate: date, firstName: name, lastName: surname, gender: sex});
        put();
        nextId++;
        displayEmployeeList();
        $("#create-employee-form")[0].reset();
        $("#create-employee").modal('hide');
        //toastr.success('Impiegato Creato Correttamente.', 'Successo', {timeOut: 5000});

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
        rows = rows + '<button class="btn btn-secondary btn-sm edit-employee" data-toggle="modal" data-target="#edit-employee">Modifica</button>';
        rows = rows + '&nbsp&nbsp';
        rows = rows + '<button class="btn btn-danger btn-sm delete-employee">Elimina</button>';
        rows = rows + '</td>';
        rows = rows + '</tr>';
      });
      $("tbody").html(rows);
    }

    //modificare un impiegato
    $("body").on("click",".edit-employee",function(){
      var id = $(this).parent("td").data('id');
      var sex = $(this).parent("td").prev("td").text();
      var name = $(this).parent("td").prev("td").prev("td").prev("td").text();
      var surname = $(this).parent("td").prev("td").prev("td").text();
      var date = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").text();
      //display = "edit";

      $("#date_edit").val(date);
      $("#name_edit").val(name);
      $("#surname_edit").val(surname);
      $("#sex_edit").val(sex);
      $("#edit-employee-form").find(".edit-id").val(id);
      
      $('#edit-employee-form').on('submit', function(e){
        e.preventDefault();
        //var form_action = $("#edit-employee-form").attr("action");
        var idE = $("#id_edit").val();
        var dateE = $("#date_edit").val();
        var nameE = $("#name_edit").val();
        var surnameE = $("#surname_edit").val();
        var sexE = $("#sex_edit").val();
        //display = "create";
  
        if(name != '' && surname != '' && date != '' && sex != ''){
          
          for(let i = 0 ; i < data.length; i++){
            if(data[i].id == idE){
              data[i].firstName =  nameE;
              data[i].lastName = surnameE;
              data[i].birthDate = dateE;
              data[i].gender = sexE;
              break;
            }
          }
  
          displayEmployeeList();
  
          $("#edit-employee").modal('hide');
          //toastr.success('Modifiche Accettate', 'Successo', {timeOut: 5000});
  
        }else{
          alert('Tutti i campi sono obbligatori. Assicurati di compilare tutti i campi correttamente.')
        }
      });

    });

    //eliminare un impiegato
    $("body").on("click",".delete-employee",function(){
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