
  'use strict';

  $(document).ready(init);

  var tasks = localStorage.tasks ? JSON.parse(localStorage.tasks) : [];
  updateList();


  function init() {
    $('#add').click(addTodo);
    $('#list').on('change', 'input', checkboxChanged);
    $('#list').on('click', '.remove', removeTodo);
    $('#list').on('click', '.save', saveInfo);
  }

  function removeTodo(e) {
    var $target = $(e.target);
    var $targetRow = $target.closest('tr');

    var index = $targetRow.index();
    tasks.splice(index, 1);

    updateList();
    saveLocalStorage();
  }

  function checkboxChanged(e) {
    var $target = $(e.target);
    var $targetRow = $target.closest('tr');

    var index = $targetRow.index();
    tasks[index].completed = $target.is(':checked');

    updateList();
    saveLocalStorage();
  }

  function addTodo() {
    var name = $('#name').val();
    var email = $('#email').val();
    var pNumber = $('#pNumber').val();
    var twitter = $('#twitter').val();


    var task = {
      name: name,
      email: email,
      pNumber: pNumber,
      twitter: twitter,
      completed: false
    };

    tasks.push(task);

    updateList();
    saveLocalStorage();
  }

  function updateList() {
    console.log('tasks:', tasks);
    $('#list').empty();

    if(tasks.length){
      $('table.table').show();
    } else {
      $('table.table').hide();
    }

    var taskElements = tasks.map(function(task){
      var $tr = $('#sample').clone();
      $tr.removeAttr('id');
      $tr.children('.name').text(task.name);
      $tr.children('.email').text(task.email);
      $tr.children('.pNumber').text(task.pNumber);
      $tr.children('.twitter').text(task.twitter);

      $tr.find('input').prop('checked', task.completed);
      if(task.completed){
        $tr.children('.textPlace').attr('contentEditable', true);
      }
      $tr.show();
      return $tr;
    });

    $('#list').append(taskElements);
  }
function saveInfo(){
  saveLocalStorage();
  var reName = $('.name').text();
  var reEmail = $('.name').text();
  var reNumber = $('.name').text();
  var reTwitter = $('.name').text();
  //console.log(rename);
  var $tr = $('#sample').clone();
  $tr.removeAttr('id');
  $tr.children('.name').text(reName);
  $tr.children('.email').text(reEmail);
  $tr.children('.pNumber').text(reNumber);
  $tr.children('.twitter').text(reTwitter);
  $tr.show();
  return $tr;
}
  function saveLocalStorage() {
    localStorage.tasks = JSON.stringify(tasks);
  }
