/**
* Todo App Demo for Tungsten.js
*/
'use strict';

var TungstenBackboneBase = require('tungstenjs');
var View = TungstenBackboneBase.View;
var ENTER_KEY = 13;
var ESC_KEY = 27;
var TodoItemView = View.extend({
  events: {
    'blur .js-todo-edit': 'handleBlurTodoEdit',
    'change .js-toggle': 'handleChangeToggle',
    'click .js-destroy': 'handleClickDestroy',
    'dblclick .js-todo-title': 'handleDblClickTodoTitle',
    'keydown .js-todo-edit': 'handleKeyDownTodoEdit',
    'keypress .js-todo-edit': 'handleKeyPressTodoEdit'
  },
  handleBlurTodoEdit: function(e) {
    if (!this.model.get('editing')) {
      return;
    }
    this.clear(e.currentTarget);
  },
  handleClickDestroy: function() {
    this.model.destroy();
  },
  handleChangeToggle: function() {
    this.model.set('completed', !this.model.get('completed'));
  },
  handleDblClickTodoTitle: function(e) {
    this.model.set('editing', true);
    this.listenToOnce(this, 'rendered', function() {
      this.el.querySelector('.js-todo-edit').focus();
    });
  },
  handleKeyDownTodoEdit: function(e) {
    if (e.which === ESC_KEY) {
      this.model.set('editing', false);
      this.model.set('title', this.model.get('title'));
    }
  },
  handleKeyPressTodoEdit: function(e) {
    if (e.which === ENTER_KEY) {
      this.clear(e.currentTarget);
    }
  },
  clear: function(input) {
    var value = input.value;

    var trimmedValue = value.trim();

    if (trimmedValue) {
      this.model.set({ title: trimmedValue });
      this.model.set('editing', false);
    } else {
      this.handleClickDestroy();
    }
  }
}, {
  debugName: 'TodoItemView'
});
module.exports = TodoItemView;
