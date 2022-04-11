'use strict';

const calculateBtn = document.querySelector('#calculate')
const burgers = document.querySelector('#burgers')
const burgersArr = []

calculateBtn.addEventListener('click', addBurger)

/**
 * Функция добавляет результаты расчёта бургера
 */
function addBurger() {
  const burger = new Burger()
  burgersArr.push(burger)
}

class Burger {
  constructor(
    size = 'size', stuffings = 'stuffings', additions = 'additions', target = burgers
  ) {
    this.size = this._check(size)
    this.stuffings = this._check(stuffings)
    this.additions = this._getArray(additions)
    this.calories = this._getCalories()
    this.cost = this._getCost()
    this.template = ''
    this.target = target // куда добавлять бургеры
    this._init()
  }

  _init() {
    this.template = `<div><span class="cost">${this.cost}</span> ₽</div>
                     <div><span class="calories">${this.calories}</span> каллорий</div>`
    this.target.insertAdjacentHTML('afterbegin', this.template) // новые бургеры добавляются вверху
  }

  _check(attrName) {
    const obj = document.querySelector(`input[name=${attrName}]:checked`)
    return {
      name: obj.value,
      cost: +obj.dataset.cost,
      calories: +obj.dataset.calory
    }
  }

  _getArray(attrName) {
    const objArr = [...document.querySelectorAll(`input[name=${attrName}]:checked`)]
    const arr = []
    objArr.forEach(el => {
      arr.push({
        name: el.value,
        cost: +el.dataset.cost,
        calories: +el.dataset.calory
      })
    })
    return arr
  }

  getPrice(objects) {
    return objects.reduce((a, b) => +a + +b["cost"], 0)
  }

  getCalories(objects) {
    return objects.reduce((a, b) => +a + +b["calories"], 0)
  }

  _getCost() {
    return this.size.cost + this.stuffings.cost + (this.additions.length ? this.getPrice(this.additions) : 0)
  }

  _getCalories() {
    return this.size.calories + this.stuffings.calories + (this.additions.length ? this.getCalories(this.additions) : 0)
  }
}
