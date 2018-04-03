<h1>Заявка на участие в турнире "Сябры 2018"</h1>
<p>Вы подали заявку на участие в группах:</p>
<ol>
  @foreach ($player->squads as $squad)
  <li>
    {{$squad->start_date}} {{$squad->start_time}}
    @if ($squad->pivot->waiting_list)
      , лист ожидания
    @endif
  </li>
  @endforeach
</ol>