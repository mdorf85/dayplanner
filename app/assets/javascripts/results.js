$(function(){

  $('.random').hide();
  $('.google').on('click', function(){
    $('.random').show();
  });

  var eventDate = $('.event-date').text()

  $('#calendar').fullCalendar({
    defaultView: 'agendaDay',
    defaultDate: $('.event-date').text(),
    header: {
      left:   '',
      center: 'title',
      right:  ''
    },
    snapDuration: '01:00:00',
    scrollTime: '06:00:00',
    slotEventOverlap: false,
    droppable: true,
    drop: function(date, jsEvent, ui){
      var name = $(this).find('b').text();
      var shortname = name.replace(" ", '').substr(0,5).toLowerCase();
      
      $('<input id="' + shortname + '" name="' + shortname + '" type="hidden" value="' + name + '">').insertBefore($('.google'));

      // alert('Dropped on ' + date.format());
    },
    eventSources: [
      {
        events: [
          {
            title: $('.event-name').text(),
            start: $('.event-time').text(),
            eventStartEditable: false
            // durationEditable: true
          }
        ],
        color: '#0099FF',
        textColor: '#FFFFFF',
        // editable: true
      }
    ],
    editable: true,
    eventClick: function(calEvent, jsEvent, view){
      alert('Event: ' + calEvent.title);
    }

  });

  $('.activity').draggable({
    revert: false,
    revertDuration: 0,
  });

  $('.activity').data('duration', '01:00');

});
  