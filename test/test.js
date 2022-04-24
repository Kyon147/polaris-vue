(function() {
    function init() {

        Vue.use(PolarisVue);

        var root = new Vue({
            el: '#app',
            methods: {
               testAlert: function() {
                   alert('test');
               },
                sort(index, direction){
                   console.log( 'sort' );
                    this.rows = this.sortCurrency(this.rows, index, direction)
                },
                sortCurrency(rows, index, direction) {
                    return [...rows].sort((rowA, rowB) => {
                        const amountA = parseFloat(rowA[index].substring(1));
                        const amountB = parseFloat(rowB[index].substring(1));

                        return direction === 'descending' ? amountB - amountA : amountA - amountB;
                    });
                }
            },
            data: {
                value0: null,
                value1: null,
                value2: null,
                value3: null,
                value4: null,
                value5: null,
                value6: null,
                value7: null,
                value8: null,
                value9: null,
                value10: null,


                test0: false,
                test1: false,
                test2: false,

                popover2: false,
                popover2Select: 'tagged',
                popover3: false,
                popoverColor: false,
                popoverColorValue: {
                    hue: 0,
                    saturation: 1,
                    brightness: 1,
                    alpha: 1,
                },

                modalToggle: false,

                pickerMonth: 4,
                pickerYear: 2017,

                colorValue: {
                    hue: 0,
                    saturation: 1,
                    brightness: 1,
                    alpha: 1,
                },
                testDateRange: {
                    start: new Date(2017, 4, 2),
                    end: new Date(2017, 4, 12),
                },
                testDate: new Date(2017, 4, 12),

                accounts: 'disabled',

                rows: [
                    ['Navy Merino Wool Blazer with khaki chinos and yellow belt with some other long text',
                        '$445.00', 123545, 21, '$14,1000'
                    ],
                    ['Emerald Silk Gown', '$875.00', 124689, 140, '$122,500.00'],
                    ['Mauve Cashmere Scarf', '$230.00', 124533, 83, '$19,090.00']
                ]
            },
            computed: {
                accountsAreDisabled: {
                    get() {
                        return this.accounts == 'disabled';
                    },
                    set(value) {
                        if (value) {
                            this.accounts = 'disabled';
                        } else if (this.accounts == 'disabled') {
                            this.accounts = null;
                        }
                    }
                },
                accountsAreEnabled: {
                    get() {
                        return this.accounts == 'enabled';
                    },
                    set(value) {
                        if (value) {
                            this.accounts = 'enabled';
                        } else if (this.accounts == 'enabled') {
                            this.accounts = null;
                        }
                    }
                }
            }
        });
    }


    if (document.readyState !== 'loading') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }

})();
