<template>
        <ul class="Polaris-ResourceList">
            <li v-for="(item, index) in items" class="Polaris-ResourceList__ItemWrapper"
                :key="`item_${index}`"
            >
                <slot name="item" :item="item" :index="index">
                    <polaris-resource-list-item
                        :url="item.url"
                        :media="item.media"
                        :attribute-one="item.attributeOne"
                        :attribute-two="item.attributeTwo"
                        :attribute-three="item.attributeThree"
                        :badges="item.badges"
                        :exceptions="item.exceptions"
                        :actions="item.actions"
                        :persist-actions="item.persistActions"
                    >
                    </polaris-resource-list-item>
                </slot>
            </li>
        </ul>
</template>

<script>
import PolarisResourceListItem from './PolarisResourceListItem.vue';
export default {
    created: function(){
        console.log( this );
    },
    components: {
        PolarisResourceListItem,
    },
    props: {
        items: {
            type: Array,
            default() {
                return [];
            },
        },
        selectedItems : {
            type: Array,
            default() {
                return [];
            }
        }
    },
    methods: {
        setSelectedItems(index, value){
            console.log( "set selected items happened" );
            console.log( index );
            console.log(value);
            this.value = value;
        }
    },
    computed: {
    }
};
</script>
