var data = [];
var links;
var page;
var api = "http://localhost:8080/employees?page="+page+"&size=20";

  $(document).ready(function(){
    get();
    
    $("#next-button").on("click", function() {
      api = links['next']['href'];
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
      api = links['prev']['href'];
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
            page = msg['page']['number'];
            displayEmployeeList();
            displayPagination();
        });
    }
      
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
        rows = rows + '<button class="btn btn-secondary btn-sm edit-employee" data-toggle="modal" data-target="#edit-employee"><i class="fa-solid fa-pen"></i></button>';
        rows = rows + '&nbsp&nbsp';
        rows = rows + '<button class="btn btn-danger btn-sm delete-employee"><i class="fa-solid fa-trash-can"></i></button>';
        rows = rows + '</td>';
        rows = rows + '</tr>';
      });
      $("tbody").html(rows);
    }
    
    //creare un nuovo impiegato
    $('#create-employee-form').on('submit', function(e){
      e.preventDefault();
      var date = $("#date").val();
      var name = $("#name").val();
      var surname = $("#surname").val();
      var sex = $("#sex").val();

        $.ajax({
          url: "http://localhost:8080/employees/",
          method: "POST",
          contentType: "application/json",
          data: JSON.stringify({
                "birthDate": date,
                 "firstName": name,
                 "gender": sex,
                 "id": 0,
                 "lastName": surname
                })
        })
          .done(function(){
            get();
        })
          .fail(function() {
            alert("Errore durante l'inserimento dell'impiegato!");
        });
        $("#create-employee-form")[0].reset();
        $("#create-employee").modal('hide');
    });

    //modificare un impiegato
    $("body").on("click",".edit-employee",function(){
      var id = $(this).parent("td").data('id');
      var sex = $(this).parent("td").prev("td").text();
      var surname = $(this).parent("td").prev("td").prev("td").text();
      var name = $(this).parent("td").prev("td").prev("td").prev("td").text();
      var date = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").text();

      $("#date_edit").val(date);
      $("#name_edit").val(name);
      $("#surname_edit").val(surname);
      $("#sex_edit").val(sex);
      $("#edit-employee-form").find(".edit-id").val(id);
    
    });

    //continuo del modificare un impiegato
    $('#edit-employee-form').on('submit', function(e){
      e.preventDefault();
      var idE = $("#id_edit").val();
      var dateE = $("#date_edit").val();
      var nameE = $("#name_edit").val();
      var surnameE = $("#surname_edit").val();
      var sexE = $("#sex_edit").val();

      $.ajax({
        url: 'http://localhost:8080/employees/'+idE,
        method: "PUT",
        contentType: 'application/json',
        data: JSON.stringify({
          "birthDate": dateE,
           "firstName": nameE,
           "gender": sexE,
           "id": idE,
           "lastName": surnameE
          })
      })
        .done(function(){
          get();
      })
        .fail(function() {
          alert("Errore durante la modifica dell'impiegato!");
      });
      $("#edit-employee").modal('hide');
      });

    //eliminare un impiegato
    $("body").on("click",".delete-employee",function(){
      var id = $(this).parent("td").data('id');
      $.ajax({
        method: "DELETE",
        url: 'http://localhost:8080/employees/'+id
      })
        .done(function( msg ){
          get();
      });
    });

    //visualizzare l'impaginazione
    function displayPagination(){

      var code = '';
      code += '<button class="btn btn-outline-dark" disabled>'+page+'</button>';
      $('pagination').html(code);
    }
    
  });