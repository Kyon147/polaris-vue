<template>
<dynamic-tag :tag="tag" class="Polaris-Subheading">
    <slot></slot>
</dynamic-tag>
</template>


<script>
import DynamicTag from './DynamicTag.vue';

export default {
    name: 'PolarisSubheading',
    props: {
        tag: {
            type: String,
            default: 'h3'
        }
    },
    components: {
        DynamicTag
    }
}
</script>
