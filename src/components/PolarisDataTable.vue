<template>
    <div class="Polaris-DataTable">
        <div class="Polaris-DataTable__ScrollContainer">
            <table class="Polaris-DataTable__Table">
                <thead>
                    <tr v-if="headings && headings.length > 0">
                        <th v-for="(heading, index) in headings"
                            :key="index"
                            :class="[
                                index === 0 ? 'Polaris-DataTable__Cell--firstColumn' : '',
                                cellContentTypeClass(index),
                                cellAlignment()
                            ]"
                            class="Polaris-DataTable__Cell Polaris-DataTable__Cell--header"
                            scope="col"
                        >
                            {{ heading }}
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
                    <template v-if="rows && rows.length > 0">
                        <tr v-for="(row, index) in rows" :key="index"
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
export default {
    name: "PolarisDataTable",

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
        truncate:{
            type: Boolean,
            default: false
        },
        verticalAlign: {
            type: String,
            default: "middle",
            validator(val){
                return [
                    'top',
                    'middle',
                    'bottom'
                ].includes(val.toLowerCase())
            }
        },
        hideScrollIndicator:{
            type: Boolean,
            default: false
        },
        showTotalsInFooter:{
            type: Boolean,
            default: false
        },
        hoverable:{
            type: Boolean,
            default: false
        }
    },

    methods: {
        cellAlignment() {
            return 'Polaris-DataTable__Cell--verticalAlign' + this.verticalAlign[0].toUpperCase() + this.verticalAlign.substring(1)
        },
        cellContentTypeClass(index) {
            return this.columnContentTypes && this.columnContentTypes[index] ? 'Polaris-DataTable__Cell--' + this.columnContentTypes[index] : ''
        },
    },

    computed: {
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

        &--truncated{
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
        &--total{
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
