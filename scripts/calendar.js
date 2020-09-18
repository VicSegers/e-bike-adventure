new niceDatePicker({
  dom: document.getElementById('calendar'),
  mode: 'nl',
  onClickDate: function(date) {
    document.querySelector('#calendar-msg').innerHTML = `
    <div class="my-2 row pr-0">
      <div class="form-group required my-2 col-12 col-sm-6 col-md-6">
      <label for="timeSelect">Vertrekuur</label>
      <select class="form-control id="timeSelect" name="time">
        <option>10:00</option>
        <option>10:30</option>
        <option>11:00</option>
        <option>11:30</option>
        <option>12:00</option>
        <option>14:00</option>
        <option>14:30</option>
        </select>
      </div>
    </div>
    <div class="form-group my-2 col-12 col-sm-6 col-md-6">
      <label for="vespa50ccSelect">Vespa 50cc</label>
      <select class="form-control id="vespa50ccSelect" name="vespa50cc">
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
      </select>
    </div>
    <div class="form-group my-2 col-12 col-sm-6 col-md-6">
      <label for="vespa125ccSelect">Vespa 125cc</label>
      <select class="form-control id="vespa125ccSelect" name="vespa125cc">
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </select>
    </div>
    <div class="form-group my-2 col-12 col-sm-6 col-md-6">
      <label for="vespaGTS125Select">Vespa GTS 125</label>
      <select class="form-control id="vespaGTS125Select" name="vespaGTS125">
        <option>Geen beschikbaar</option>
      </select>
    </div>
    <div class="form-group my-2 col-12 col-sm-6 col-md-6">
      <label for="mokeSelect">Moke</label>
      <select class="form-control id="mokeSelect" name="moke">
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </select>
    </div>`
  }
});
