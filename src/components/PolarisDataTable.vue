<template>
    <div class="Polaris-DataTable">
        <div class="Polaris-DataTable__ScrollContainer">
            <table :class="[
                'Polaris-DataTable__Table',
            ]">
                <thead>
                    <tr v-if="headings && headings.length > 0">
                        <th v-for="(heading, index) in headings"
                            :key="index"
                            :class="[
                                index === 0 ? 'Polaris-DataTable__Cell--firstColumn' : '',
                                cellContentTypeClass(index),
                                cellAlignment(),
                                sortedIndex === index ? 'Polaris-DataTable--sorted' : ''
                            ]"
                            class="Polaris-DataTable__Cell Polaris-DataTable__Cell--header"
                            scope="col"
                            @click="handleOnSort(index, defaultSortDirection)"
                        >
                            <div class="Polaris-DataTable__Heading">
                                <span class="Polaris-DataTable__Icon">
                                <PolarisIcon
                                    :source=" sortedDirection === 'ascending' ? 'caretUp' : 'caretDown'"
                                />
                                </span>
                                {{ heading }}
                            </div>
                        </th>
                    </tr>
                    <tr v-if="totals && totals.length > 0 && !showTotalsInFooter">
                        <th v-for="(total, index) in totals"
                            :key="index"
                            :class="[
                                'Polaris-DataTable__Cell',
                                'Polaris-DataTable__Cell--total',
                                cellContentTypeClass(index),
                                cellAlignment()
                            ]">
                            {{ index === 0 ? 'Totals' : total }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="chosenRows && chosenRows.length > 0">
                        <tr v-for="(row, index) in chosenRows" :key="index"
                            :class="[
                            'Polaris-DataTable__TableRow',
                            hoverable ? 'Polaris-DataTable--hoverable' : ''
                        ]"
                        >
                            <template v-for="(rowData, dataIndex) in row">
                                <th v-if="dataIndex === 0"
                                    :class="[
                                        'Polaris-DataTable__Cell',
                                        cellAlignment(),
                                        dataIndex === 0 ? 'Polaris-DataTable__Cell--firstColumn' : '',
                                         truncate ? 'Polaris-DataTable__Cell--truncated' : ''
                                    ]"
                                    scope="row"
                                    :title="rowData"
                                >
                                    {{ rowData }}
                                </th>
                                <td v-else
                                    :class="[
                                        cellContentTypeClass(dataIndex),
                                        cellAlignment(),
                                        truncate ? 'Polaris-DataTable__Cell--truncated' : ''
                                    ]"
                                    class="Polaris-DataTable__Cell"
                                >
                                    {{ rowData }}
                                </td>
                            </template>
                        </tr>
                    </template>
                </tbody>
                <tfoot v-if="showTotalsInFooter">
                    <tr v-if="totals && totals.length > 0">
                        <th v-for="(total, index) in totals"
                            :key="index"
                            :class="[
                                'Polaris-DataTable__Cell',
                                'Polaris-DataTable__Cell--total',
                                'Polaris-DataTable--cellTotalFooter',
                                cellContentTypeClass(index),
                                cellAlignment()
                            ]">
                            {{ index === 0 ? 'Totals' : total }}
                        </th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>

<script>
import PolarisIcon from "@/components/PolarisIcon"

export default {
    name: "PolarisDataTable",
    components: {PolarisIcon},
    props: {
        columnContentTypes: {
            type: Array,
            default: () => [],
            required: true
        },
        headings: {
            type: Array,
            default: () => [],
            required: true
        },
        rows: {
            type: Array,
            default: () => [],
            required: true
        },
        totals: {
            type: Array,
            default: () => []
        },
        /* List of booleans, which maps to whether sorting is enabled or not for each column.
         * Defaults to false for all columns.*/
        sortable: {
            type: Array,
            default: () => []
        },
        truncate: {
            type: Boolean,
            default: false
        },
        verticalAlign: {
            type: String,
            default: "middle",
            validator(val) {
                return [
                    'top',
                    'middle',
                    'bottom'
                ].includes(val.toLowerCase())
            }
        },
        hideScrollIndicator: {
            type: Boolean,
            default: false
        },
        showTotalsInFooter: {
            type: Boolean,
            default: false
        },
        hoverable: {
            type: Boolean,
            default: false
        },
        initialSortColumnIndex: {
            type: Number,
            default: 0
        },
        defaultSortDirection: {
            type: String,
            default: "descending",
            validator(val) {
                return [
                    'ascending',
                    'descending',
                ].includes(val.toLowerCase())
            }
        },
        /**
         * @param index
         * @param direction
         * */
        onSort: {
            type: Function,
        }
    },

    data() {
        return {
            sortedRows: [],
            sortedIndex: this.initialSortColumnIndex,
            sortedDirection: this.initialSortDirection
        }
    },

    mounted(){
        this.handleInitialSort()
    },

    methods: {
        cellAlignment() {
            return 'Polaris-DataTable__Cell--verticalAlign' + this.verticalAlign[0].toUpperCase() + this.verticalAlign.substring(1)
        },
        cellContentTypeClass(index) {
            return this.columnContentTypes && this.columnContentTypes[index] ? 'Polaris-DataTable__Cell--' + this.columnContentTypes[index] : ''
        },
        handleOnSort(index) {
            if (typeof index !== 'undefined' && this.sortable[index] === false) {
                return
            }

            // Set the right direction first.
            if (this.sortedIndex === index){
                this.sortedDirection = this.sortedDirection === 'ascending' ? 'descending' : 'ascending'
            } else {
                console.log(' choose sort order' );
                this.sortedDirection = this.defaultSortDirection
            }

            // Update the sorted index.
            this.sortedIndex = index;

            // If there is a custom function then run that one instead.
            if (this.onSort) {
                this.onSort(index, this.sortedDirection)
                return
            }

            // Run the default sort if there is not one set.
            this.sortedRows = [...this.rows].sort((rowA, rowB) => this.sortAlphaNum(rowA, rowB, index))

        },
        sortAlphaNum(a, b, index) {
             const reA = /[^a-zA-Z]/g;
             const reN = /[^0-9]/g;
             const aA = a[index].replace(reA, "");
             const bA = b[index].replace(reA, "");
             if (aA === bA) {
                 const aN = parseInt(a[index].replace(reN, ""), 10);
                 const bN = parseInt(b[index].replace(reN, ""), 10);
                 if (this.sortedDirection === 'ascending') {
                     return aN === bN ? 0 : aN > bN ? 1 : -1;
                 } else {
                     return aN === bN ? 0 : aN < bN ? 1 : -1;
                 }
             } else {
                 if (this.sortedDirection === 'ascending') {
                     return aA > bA ? 1 : -1;
                 } else {
                     return aA < bA ? 1 : -1;
                 }
             }
         },
        handleInitialSort(){
            if(this.sortable && this.sortable.length){
                this.handleOnSort(this.sortedIndex)
            }
        }
    },

    computed: {
        chosenRows() {
            return this.sortedRows && this.sortedRows.length > 0 ? this.sortedRows : this.rows
        }
    }
}
</script>

<style lang="scss" scoped>
.Polaris-DataTable {
    position: relative;
    max-width: 100vw;

    &--cellTotalFooter, &__Footer {
        border-top: var(--p-border-divider);
        border-bottom-left-radius: var(--p-border-radius-1);
        border-bottom-right-radius: var(--p-border-radius-1);
    }

    &__ScrollContainer {
        overflow-x: auto;
    }

    &__Heading{
        -webkit-appearance: none;
        appearance: none;
        background: none;
        border: none;
        font-size: inherit;
        line-height: inherit;
        position: relative;
        display: inline-flex;
        justify-content: flex-end;
        align-items: baseline;
        color: var(--p-text);
        transition: color var(--p-duration-200) var(--p-ease);
        cursor: pointer;
        padding: var(--p-space-2);
        margin: var(--p-space-2);
    }

    &--sorted{
        .Polaris-DataTable__Icon{
            opacity: 1;
        }
    }

    &__Icon {
        display: flex;
        align-self: flex-end;
        opacity: 0;
        transition: opacity var(--p-duration-200) var(--p-ease),fill var(--p-duration-200) var(--p-ease);
    }

    &__Table {
        width: 100%;
        border-spacing: 0;
    }

    &__Cell {
        padding: var(--p-space-6);
        white-space: nowrap;
        text-align: left;
        transition: background-color .2s ease-in-out;

        &--header {
            font-weight: var(--p-font-weight-regular);
            color: var(--p-text);
            border-bottom: var(--p-border-divider);
            border-top: 0;
        }

        &--firstColumn {
            font-weight: var(--p-font-weight-regular);
            color: var(--p-text);
            text-align: left;
            white-space: normal;
        }

        &--truncated {
            white-space: nowrap;
            overflow-x: hidden;
            text-overflow: ellipsis;
            max-width: var(--pc-data-table-first-column-width);
        }

        &--numeric {
            text-align: right;
        }

        &--verticalAlignTop {
            vertical-align: top;
        }

        &--verticalAlignMiddle {
            vertical-align: middle;
        }

        &--verticalAlignBottom {
            vertical-align: bottom;
        }

        &--total {
            font-weight: var(--p-font-weight-semibold);
            background: var(--p-surface-subdued);
            border-bottom: var(--p-border-divider);
        }
    }

    .Polaris-DataTable__TableRow + .Polaris-DataTable__TableRow .Polaris-DataTable__Cell {
        border-top: var(--p-border-divider);
    }

    .Polaris-DataTable--hoverable:hover .Polaris-DataTable__Cell {
        background: var(--p-surface-hovered);
    }
}
</style>
