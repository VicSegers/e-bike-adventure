(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory():
    typeof define === 'function' && define.amd ? define(factory):
      (global.niceDatePicker = factory());
}(this, function() {
  'use strict';

  class niceDatePicker {
    constructor($params) {
      this.$wrapper = null;
      this.monthData = null;
      this.$params = $params;
      this.init(this.$params);
    }

    getMonthData(year, month) {
      let ret = [];

      if (!year || !month) {
        let today = new Date();
        year = today.getFullYear();
        month = today.getMonth() + 1;
      }

      let firstDay = new Date(year, month - 1, 1);
      year = firstDay.getFullYear();
      month = firstDay.getMonth() + 1;
      let lastDayOfLastMonth = new Date(year, month - 1, 0);
      let lastDateOfLastMonth = lastDayOfLastMonth.getDate();
      let preMonthDayCount = (firstDay.getDay() === 0 ? 7 : firstDay.getDay()) - 1;
      let lastDay = new Date(year, month, 0);
      let lastDate = lastDay.getDate();
      let styleCls = '';

      for (let i = 0; i < 7 * 6; i++) {
        let date = i + 1 - preMonthDayCount;
        let showDate = date;
        let thisMonth = month;

        if (date <= 0) {
          thisMonth = month - 1;
          showDate = lastDateOfLastMonth + date;
          styleCls = 'nice-gray';
        } else if (date > lastDate) {
          thisMonth = month + 1;
          showDate = showDate - lastDate;
          styleCls = 'nice-gray';
        } else {
          styleCls = 'nice-normal';

          let today = new Date();
          if (showDate === today.getDate() && thisMonth === today.getMonth() + 1 && year === today.getFullYear()) {
            styleCls += ' nice-current available';
          } else if (year < today.getFullYear() || thisMonth < today.getMonth() + 1 && year === today.getFullYear() || showDate < today.getDate() && thisMonth === today.getMonth() + 1 && year === today.getFullYear()) {
            styleCls += ' cursor-not-allowed';
          } else {
            styleCls += ' available';
          }
        }

        thisMonth = thisMonth === 13 ? 1 : thisMonth;
        thisMonth = thisMonth === 0 ? 12 : thisMonth;

        ret.push({
          year: year,
          month: thisMonth,
          date: date,
          showDate: showDate,
          styleCls: styleCls
        });
      }

      return {
        year: year,
        month: month,
        date: ret
      };
    }

    buildUI(year, month) {
      this.monthData = this.getMonthData(year, month);
      this.enDayWords = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
      this.nlDayWords = ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'];
      this.enMonthsWords = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      this.nlMonthsWords = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];

      let lang = this.$params.mode;

      return `
        <div class="nice-date-picker-wrapper">
          <div class="nice-date-picker-header">
            <span class="nice-date-title">${lang === 'nl' ? this.nlMonthsWords[this.monthData.month - 1] : this.enMonthsWords[this.monthData.month - 1]} ${this.monthData.year}</span>
            <div>
              <button type="button" class="prev-date-btn">&lt;</button>
              <button type="button" class="today-btn">${lang === 'nl' ? 'Vandaag' : 'Today'}</button>
              <button type="button" class="next-date-btn">&gt;</button>
            </div>
          </div>
          <div class="nice-date-picker-body">
            <table>
              <thead>
                <tr>
                  <th>${lang === 'nl' ? this.nlDayWords.join('</th><th>') : this.enDayWords.join('</th><th>')}</th>
                </tr>
              </thead>
              <tbody>
                ${this.getMonthHTML(this.monthData)}
              </tbody>
            </table>
          </div>
        </div>`;
    }

    getMonthHTML(monthData) {
      let html = '';
      monthData.date.forEach(function(date, i) {
        html += `${i % 7 === 0 ? '<tr>' : ''}<td class="${date.styleCls}" data-date="${date.showDate}/${date.month}/${date.year}">${date.showDate}</td>${i % 7 === 6 ? '</tr>' : ''}`
      });
      return html;
    }

    render(direction, $params) {
      let year, month;

      if (this.monthData) {
        year = this.monthData.year;
        month = this.monthData.month;
      } else {
        year = $params.year;
        month = $params.month;
      }

      if (direction === 'prev') {
        month--;
        if (month === 0) {
          month = 12;
          year--;
        }
      } else if (direction === 'next') {
        month++;
      } else if (direction === 'today') {
        month = new Date().month + 1;
      }

      this.$wrapper.innerHTML = this.buildUI(year, month);
    }

    init($params) {
      this.$wrapper = $params.dom;
      this.render('', $params);
      let _this = this;

      this.$wrapper.addEventListener('click', function (e) {
        let classList = e.target.classList;

        if (classList.contains('prev-date-btn')) {
          _this.render('prev');
        } else if (classList.contains('next-date-btn')) {
          _this.render('next');
        } else if (classList.contains('today-btn')) {
          _this.render('today')
        } else if (classList.contains('nice-normal') && classList.contains('available')) {
          document.querySelectorAll('.nice-current').forEach(element => element.classList.remove('nice-current'));
          e.target.classList.add('nice-current');
          $params.onClickDate(e.target.getAttribute('data-date'));
        }
      }, false);

      console.log(document.querySelector('.nice-current').click());
    }
  }

  return niceDatePicker;
}));