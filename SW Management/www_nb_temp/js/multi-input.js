/* 
 Created on : 26 Jun 2020, 13.59.58
 Author     : Jarno Matarmaa <Tampereen Yliopisto>
 */

console.log("Greetings from multi-input.js");


class MultiInput extends HTMLElement {
    constructor() {
        super();
        // This is a hack :^(.
        // ::slotted(input)::-webkit-calendar-picker-indicator doesn't work in any browser.
        // ::slotted() with ::after doesn't work in Safari.
        this.innerHTML +=
                `<style>
                multi-input input::-webkit-calendar-picker-indicator {
                  display: none;
                }
                /* NB use of pointer-events to only allow events from the × icon */
                multi-input div.item::after {
                  color: black;
                  content: '×';
                  cursor: pointer;
                  font-size: 18px;
                  pointer-events: auto;
                  position: absolute;
                  right: 5px;
                  top: 0px;
                }
            </style>`;
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.innerHTML =
                `<style>
                :host {
                  display: block;
                  white-space: initial;
                  padding: 0px;
                }
                /* NB use of pointer-events to only allow events from the × icon */
                ::slotted(div.item) {
                  background-color: var(--multi-input-item-bg-color, #dedede);
                  border: var(--multi-input-item-border, 1px solid #ccc);
                  border-radius: 2px;
                  color: #222;
                  display: inline-block;
                  font-size: var(--multi-input-item-font-size, 14px);
                  margin: 5px;
                  padding: 2px 25px 2px 5px;
                  pointer-events: none;
                  position: relative;
                  top: -1px;
                }
                /* NB pointer-events: none above */
                ::slotted(div.item:hover) {
                  background-color: #eee;
                  border-color: red;
                  color: black;
                }
                ::slotted(input) {
                  border: none;
                  font-size: var(--multi-input-input-font-size, 14px);
                  outline: none;
                  padding: 10px 10px 10px 5px; 
                }
            </style>
            <slot></slot>`;
        
        this.style.maxWidth = "400px";
        this._datalist = document.getElementById("class_names");
        this._validInput = /^[a-zA-Z0-9_\-\ ]{4,12}$/;
        this._allowedValues = [];
        for (const option of this._datalist.options) {
            this._allowedValues.push(option.value);
        }
        console.log(this._allowedValues);
        this._input = document.querySelector('#class_select');
        this._input.onblur = this._handleBlur.bind(this);
        this._input.oninput = this._handleInput.bind(this);
        this._input.onkeydown = (event) => {
            this._handleKeydown(event);
        };

        this._allowDuplicates = false; // this.hasAttribute('allow-duplicates');
    }

    // Called by _handleKeydown() when the value of the input is an allowed value.
    _addItem(value) {
        this.style.border = "var(--multi-input-border, 1px solid blueviolet)";
        this._input.value = '';
        const item = document.createElement('div');
        item.classList.add('item');
        item.textContent = value;
        this.insertBefore(item, null);
        item.onclick = () => {
            this._deleteItem(item);
        };

        // Remove value from datalist options and from _allowedValues array.
        // Value is added back if an item is deleted (see _deleteItem()).
        if (!this._allowDuplicates) {
            for (const option of this._datalist.options) {
                if (option.value === value) {
                    option.remove();
                }
                ;
            }
            this._allowedValues = this._allowedValues.filter((item) => item !== value);
        }
    }

    // Called when the × icon is tapped/clicked or
    // by _handleKeydown() when Backspace is entered.
    _deleteItem(item) {
        const value = item.textContent;
        item.remove();
        // If duplicates aren't allowed, value is removed (in _addItem())
        // as a datalist option and from the _allowedValues array.
        // So — need to add it back here.
        if (!this._allowDuplicates) {
            const option = document.createElement('option');
            option.value = value;
            // Insert as first option seems reasonable...
            this._datalist.insertBefore(option, this._datalist.firstChild);
            this._allowedValues.push(value);
        }
        
        const items = this.querySelectorAll('.item');
        if (items.length < 1) {
            this.style.border = "";
        } 
    }

    // Avoid stray text remaining in the input element that's not in a div.item.
    _handleBlur() {
        this._input.value = '';
    }

    // Called when input text changes,
    // either by entering text or selecting a datalist option.

    _handleInput() {
        // Add a div.item, but only if the current value
        // of the input is an allowed value
        const value = this._input.value;
        if (this._allowedValues.includes(value) || class_map.includes(value)) {
            this._addItem(value);
        }

    }

    // Called when text is entered or keys pressed in the input element.

    _handleKeydown(event) {
        const itemToDelete = event.target.previousElementSibling;
        const value = this._input.value;
        // On Backspace, delete the div.item to the left of the input
        if (value === '' && event.key === 'Backspace' && itemToDelete) {
            this._deleteItem(itemToDelete);
            // Add a div.item, but only if the current value
            // of the input is an allowed value
        } else if (this._allowedValues.includes(value)) { // <= 
            this._addItem(value);
        }
    }

    // Public method for getting item values as an array.
    getValues() {
        const values = [];
        const items = this.querySelectorAll('.item');
        for (const item of items) {
            values.push(item.textContent);
        }
        return values;
    }
    
}


// document.querySelector('#class_select').addEventListener('keypress', MultiInput.enterListener());

window.customElements.define('multi-input', MultiInput);


